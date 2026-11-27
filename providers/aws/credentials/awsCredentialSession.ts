import type { AwsCredentials } from "@tradedal/aws-client-core/config";
import { Option } from "effect";

/**
 * The credentialSessionTtl function leaves time to renew credentials before
 * AWS rejects the session. Short sessions remain reusable for half their
 * remaining lifetime. Static credentials are read again after one minute
 * so a provider can pick up keys rotated outside the application.
 */
export const credentialSessionTtl = (
  credentials: AwsCredentials,
  now: number,
) =>
  Option.fromUndefinedOr(credentials.expiration).pipe(
    Option.map((expiration) => expiration.getTime() - now),
    Option.map((remaining) =>
      Math.max(0, remaining - Math.min(remaining / 2, 300_000)),
    ),
    Option.getOrElse(() => 60_000),
  );
