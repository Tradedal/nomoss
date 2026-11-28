import { homedir } from "node:os";
import {
  Array as Arr,
  Config,
  Context,
  Effect,
  FileSystem,
  Layer,
  Option,
  Path,
  Record,
  Schema,
} from "effect";

/**
 * The AwsProfile reference lets an application select a shared profile for
 * one runtime without changing AWS_PROFILE for other runtimes.
 */
export const AwsProfile = Context.Reference<Option.Option<string>>(
  "@nomoss/aws/profile",
  { defaultValue: Option.none },
);

const optional = (name: string) => Config.option(Config.NonEmptyString(name));

/**
 * The AwsSharedProfile schema keeps entries from the selected profile
 * separate from its named Identity Center session. Callers can distinguish
 * a legacy profile from one that refers to a session.
 */
export const AwsSharedProfile = Schema.Struct({
  profile: Schema.Record(Schema.String, Schema.String),
  session: Schema.Option(Schema.Record(Schema.String, Schema.String)),
});

/**
 * The sectionHeader pattern captures "profile deploy" from "[profile deploy]".
 * An assignment such as "region = us-east-1" stays in the profile body.
 */
const sectionHeader = /^[ \t]*\[([^\]\r\n]+)\][ \t]*(?:[;#][^\r\n]*)?\r?$/m;
/** The lineBreak pattern separates settings written with LF or CRLF. */
const lineBreak = /\r?\n/;
/**
 * The inlineComment pattern lets the parser remove "# staging" from
 * "region = us-east-1 # staging". A hash inside "key = a#b" stays in the value.
 */
const inlineComment = /(^|\s)[;#]/;
/**
 * The settingAssignment pattern captures "region" and "us-east-1" from
 * "region = us-east-1". An empty assignment such as "region =" supplies no value.
 */
const settingAssignment = /^([\w.-]+)\s*=\s*(.+)$/;
/**
 * The sectionQuote pattern lets a profile named deploy match [profile "deploy"].
 * Unquoted section names stay as written.
 */
const sectionQuote = /['"]/g;

const readSection = (contents: string, name: string) =>
  Record.fromEntries(
    Arr.chunksOf(Arr.drop(contents.split(sectionHeader), 1), 2).flatMap(
      ([section, body = ""]) =>
        body.split(lineBreak).flatMap((line) =>
          Option.fromNullishOr(
            settingAssignment.exec(line.split(inlineComment)[0].trim()),
          ).pipe(
            Option.filter(() => section.replace(sectionQuote, "") === name),
            Option.map(([, key, value]) => [key, value.trim()] as const),
            Option.toArray,
          ),
        ),
    ),
  );

/**
 * The AwsSharedProfiles service gives request settings and credential
 * discovery the same view of a shared profile. Each read sees changes
 * saved by AWS CLI or other programs.
 */
export class AwsSharedProfiles extends Context.Service<AwsSharedProfiles>()(
  "@nomoss/aws/client-core/awsSharedProfiles",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;

      /**
       * The resolveHome service method returns the directory AWS tooling uses
       * for default files and sign-in caches. File overrides do not move the
       * CLI sign-in cache.
       */
      const resolveHome = Effect.fn("AwsSharedProfiles.resolveHome")(
        function* () {
          const locations = yield* Config.all({
            home: optional("HOME"),
            userProfile: optional("USERPROFILE"),
          });

          return locations.home.pipe(
            Option.orElse(() => locations.userProfile),
            Option.getOrElse(homedir),
          );
        },
      );

      /**
       * The read service method combines the selected profile's settings. The
       * credentials file takes precedence for keys present in both files. A
       * missing file contributes no settings. Other file errors fail the read.
       *
       * @see ../../../../refs/smithy-typescript/packages/core/src/submodules/config/shared-ini-file-loader/parseIni.ts (section syntax)
       * @see ../../../../refs/smithy-typescript/packages/core/src/submodules/config/shared-ini-file-loader/mergeConfigFiles.ts (profile precedence)
       * @see ../../../../refs/effect/packages/effect/src/FileSystem.ts (readFileString)
       */
      const read = Effect.fn("AwsSharedProfiles.read")(function* (
        profileName: string,
      ) {
        const configured = yield* Config.all({
          config: optional("AWS_CONFIG_FILE"),
          credentials: optional("AWS_SHARED_CREDENTIALS_FILE"),
        });
        const home = yield* resolveHome();

        /**
         * The readSettingsFile operation accepts a missing file so the
         * other shared file can still supply the requested profile.
         */
        const readSettingsFile = (file: string) =>
          fs
            .readFileString(file)
            .pipe(
              Effect.catchReason("PlatformError", "NotFound", () =>
                Effect.succeed(""),
              ),
            );
        const [configFile, credentialsFile] = yield* Effect.all(
          [
            readSettingsFile(
              Option.getOrElse(configured.config, () =>
                path.join(home, ".aws", "config"),
              ),
            ),
            readSettingsFile(
              Option.getOrElse(configured.credentials, () =>
                path.join(home, ".aws", "credentials"),
              ),
            ),
          ],
          { concurrency: "unbounded" },
        );

        const defaultProfile = Option.liftPredicate(
          profileName,
          (name) => name === "default",
        );
        const profile = Arr.reduce(
          [
            readSection(configFile, `profile ${profileName}`),
            Option.map(defaultProfile, (name) =>
              readSection(configFile, name),
            ).pipe(Option.getOrElse(() => ({}))),
            readSection(credentialsFile, profileName),
          ],
          Record.empty<string, string>(),
          (profile, settings) =>
            Record.union(profile, settings, (_, latest) => latest),
        );

        const sharedProfile: typeof AwsSharedProfile.Type = {
          profile,
          session: Option.fromUndefinedOr(profile.sso_session).pipe(
            Option.map((name) =>
              readSection(configFile, `sso-session ${name}`),
            ),
          ),
        };

        return sharedProfile;
      });

      return { read, resolveHome };
    }),
  },
) {
  static readonly layer = Layer.effect(
    AwsSharedProfiles,
    AwsSharedProfiles.make,
  );
}
