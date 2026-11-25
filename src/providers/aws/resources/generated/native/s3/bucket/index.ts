// Generated from the CloudFormation Registry resource schema. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import { Effect, Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceEntity,
  ResourceGraphBuilder,
  type ResourceKey,
  ResourceReferenceSchema,
  ResourceSchemaAnnotationSchema,
} from "nomoss/core";
import { ResourceOutputBinding } from "../../../../../../../core/resource/resourceOutputBinding.js";

interface AccelerateConfiguration {
  readonly AccelerationStatus: "Enabled" | "Suspended";
}

const AccelerateConfiguration = Schema.Struct({
  AccelerationStatus: Schema.Literals(["Enabled", "Suspended"]).annotate({
    description: "Specifies the transfer acceleration status of the bucket.",
  }),
}).annotate({
  description:
    "Configures the transfer acceleration state for an Amazon S3 bucket. For more information, see [Amazon S3 Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) in the *Amazon S3 User Guide*.",
  identifier: "AccelerateConfiguration",
});

interface TagFilter {
  readonly Value: string;
  readonly Key: string;
}

const TagFilter = Schema.Struct({
  Value: Schema.String.annotate({ description: "The tag value." }),
  Key: Schema.String.annotate({ description: "The tag key." }),
}).annotate({
  description:
    "Specifies tags to use to identify a subset of objects for an Amazon S3 bucket. For more information, see [Categorizing your storage using tags](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html) in the *Amazon Simple Storage Service User Guide*.",
  identifier: "TagFilter",
});

interface Destination {
  readonly BucketArn:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "s3";
        readonly resource: "bucket";
      }>
    | string;
  readonly BucketAccountId?: string;
  readonly Format: "CSV" | "ORC" | "Parquet";
  readonly Prefix?: string;
}

const Destination = Schema.Struct({
  BucketArn: Schema.Union([
    Schema.Union([
      ResourceReferenceSchema(
        Schema.Struct({
          provider: Schema.Literal("aws"),
          service: Schema.Literal("s3"),
          resource: Schema.Literal("bucket"),
        }),
        {
          value: null,
          outputs: [
            {
              source: ["Arn"],
              target: [],
            },
          ],
        },
      ).annotate({ expected: "ResourceEntity" }),
    ]),
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) of the bucket to which data is exported.",
    }),
  ]),
  BucketAccountId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The account ID that owns the destination S3 bucket. If no account ID is provided, the owner is not validated before exporting data.\n   Although this value is optional, we strongly recommend that you set it to help prevent problems if the destination bucket ownership changes.",
    }),
  ),
  Format: Schema.Literals(["CSV", "ORC", "Parquet"]).annotate({
    description:
      "Specifies the file format used when exporting data to Amazon S3.\n *Allowed values*: ``CSV`` | ``ORC`` | ``Parquet``",
  }),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The prefix to use when exporting data. The prefix is prepended to all results.",
    }),
  ),
}).annotate({
  description:
    "Specifies information about where to publish analysis or configuration results for an Amazon S3 bucket.",
  identifier: "Destination",
});

interface ServerSideEncryptionByDefault {
  readonly KMSMasterKeyID?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "kms";
        readonly resource: "alias";
      }>
    | string;
  readonly SSEAlgorithm: "aws:kms" | "AES256" | "aws:kms:dsse";
}

const ServerSideEncryptionByDefault = Schema.Struct({
  KMSMasterKeyID: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("aws"),
            service: Schema.Literal("kms"),
            resource: Schema.Literal("alias"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["AliasName"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      Schema.String.annotate({
        description:
          "AWS Key Management Service (KMS) customer managed key ID to use for the default encryption. \n   +  *General purpose buckets* - This parameter is allowed if and only if ``SSEAlgorithm`` is set to ``aws:kms`` or ``aws:kms:dsse``.\n  +  *Directory buckets* - This parameter is allowed if and only if ``SSEAlgorithm`` is set to ``aws:kms``.\n  \n  You can specify the key ID, key alias, or the Amazon Resource Name (ARN) of the KMS key.\n  +  Key ID: ``1234abcd-12ab-34cd-56ef-1234567890ab``\n  +  Key ARN: ``arn:aws:kms:us-east-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab``\n  +  Key Alias: ``alias/alias-name``\n  \n If you are using encryption with cross-account or AWS service operations, you must use a fully qualified KMS key ARN. For more information, see [Using encryption for cross-account operations](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html#bucket-encryption-update-bucket-policy).\n   +  *General purpose buckets* - If you're specifying a customer managed KMS key, we recommend using a fully qualified KMS key ARN. If you use a KMS key alias instead, then KMS resolves the key within the requester’s account. This behavior can result in data that's encrypted with a KMS key that belongs to the requester, and not the bucket owner. Also, if you use a key ID, you can run into a LogDestination undeliverable error when creating a VPC flow log. \n  +  *Directory buckets* - When you specify an [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) for encryption in your directory bucket, only use the key ID or key ARN. The key alias format of the KMS key isn't supported.\n  \n   Amazon S3 only supports symmetric encryption KMS keys. For more information, see [Asymmetric keys in KMS](https://docs.aws.amazon.com//kms/latest/developerguide/symmetric-asymmetric.html) in the *Key Management Service Developer Guide*.",
      }),
    ]),
  ),
  SSEAlgorithm: Schema.Literals(["aws:kms", "AES256", "aws:kms:dsse"]).annotate(
    {
      description:
        "Server-side encryption algorithm to use for the default encryption.\n  For directory buckets, there are only two supported values for server-side encryption: ``AES256`` and ``aws:kms``.",
    },
  ),
}).annotate({
  description:
    "Describes the default server-side encryption to apply to new objects in the bucket. If a PUT Object request doesn't specify any server-side encryption, this default encryption will be applied. For more information, see [PutBucketEncryption](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTencryption.html).\n   +  *General purpose buckets* - If you don't specify a customer managed key at configuration, Amazon S3 automatically creates an AWS KMS key (``aws/s3``) in your AWS account the first time that you add an object encrypted with SSE-KMS to a bucket. By default, Amazon S3 uses this KMS key for SSE-KMS. \n  +  *Directory buckets* - Your SSE-KMS configuration can only support 1 [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) per directory bucket's lifetime. The [managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-cmk) (``aws/s3``) isn't supported. \n  +  *Directory buckets* - For directory buckets, there are only two supported options for server-side encryption: SSE-S3 and SSE-KMS.",
  identifier: "ServerSideEncryptionByDefault",
});

type BlockedEncryptionTypeList = ReadonlyArray<"NONE" | "SSE-C">;

const BlockedEncryptionTypeList = Schema.Array(
  Schema.Literals(["NONE", "SSE-C"]),
)
  .annotate({ description: "List of encryption types." })
  .check(
    Schema.isUnique().annotate({
      expected: "an array with unique items",
      identifier: "BlockedEncryptionTypeList",
    }),
  );

interface CorsRule {
  readonly AllowedHeaders?: ReadonlyArray<string>;
  readonly AllowedMethods: ReadonlyArray<
    "GET" | "PUT" | "HEAD" | "POST" | "DELETE"
  >;
  readonly AllowedOrigins: ReadonlyArray<string>;
  readonly ExposedHeaders?: ReadonlyArray<string>;
  readonly Id?: string;
  readonly MaxAge?: number;
}

const CorsRule = Schema.Struct({
  AllowedHeaders: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "Headers that are specified in the ``Access-Control-Request-Headers`` header. These headers are allowed in a preflight OPTIONS request. In response to any preflight OPTIONS request, Amazon S3 returns any requested headers that are allowed.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  AllowedMethods: Schema.Array(
    Schema.Literals(["GET", "PUT", "HEAD", "POST", "DELETE"]),
  )
    .annotate({
      description:
        "An HTTP method that you allow the origin to run.\n *Allowed values*: ``GET`` | ``PUT`` | ``HEAD`` | ``POST`` | ``DELETE``",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
  AllowedOrigins: Schema.Array(Schema.String)
    .annotate({
      description:
        "One or more origins you want customers to be able to access the bucket from.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
  ExposedHeaders: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "One or more headers in the response that you want customers to be able to access from their applications (for example, from a JavaScript ``XMLHttpRequest`` object).",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  Id: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A unique identifier for this rule. The value must be no more than 255 characters.",
    }).check(
      Schema.isMaxCodePoints(255).annotate({
        expected: "a string with at most 255 code points",
      }),
    ),
  ),
  MaxAge: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The time in seconds that your browser is to cache the preflight response for the specified resource.",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
  ),
}).annotate({
  description: "Specifies a cross-origin access rule for an Amazon S3 bucket.",
  identifier: "CorsRule",
});

interface Tiering {
  readonly AccessTier: "ARCHIVE_ACCESS" | "DEEP_ARCHIVE_ACCESS";
  readonly Days: number;
}

const Tiering = Schema.Struct({
  AccessTier: Schema.Literals([
    "ARCHIVE_ACCESS",
    "DEEP_ARCHIVE_ACCESS",
  ]).annotate({
    description:
      "S3 Intelligent-Tiering access tier. See [Storage class for automatically optimizing frequently and infrequently accessed objects](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html#sc-dynamic-data-access) for a list of access tiers in the S3 Intelligent-Tiering storage class.",
  }),
  Days: Schema.Number.annotate({
    description:
      "The number of consecutive days of no access after which an object will be eligible to be transitioned to the corresponding tier. The minimum number of days specified for Archive Access tier must be at least 90 days and Deep Archive Access tier must be at least 180 days. The maximum can be up to 2 years (730 days).",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({
  description:
    "The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without additional operational overhead.",
  identifier: "Tiering",
});

interface Destination_1 {
  readonly BucketArn:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "s3";
        readonly resource: "bucket";
      }>
    | string;
  readonly BucketAccountId?: string;
  readonly Format: "CSV" | "ORC" | "Parquet";
  readonly Prefix?: string;
}

const Destination_1 = Schema.Struct({
  BucketArn: Schema.Union([
    Schema.Union([
      ResourceReferenceSchema(
        Schema.Struct({
          provider: Schema.Literal("aws"),
          service: Schema.Literal("s3"),
          resource: Schema.Literal("bucket"),
        }),
        {
          value: null,
          outputs: [
            {
              source: ["Arn"],
              target: [],
            },
          ],
        },
      ).annotate({ expected: "ResourceEntity" }),
    ]),
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) of the bucket to which data is exported.",
    }),
  ]),
  BucketAccountId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The account ID that owns the destination S3 bucket. If no account ID is provided, the owner is not validated before exporting data.\n   Although this value is optional, we strongly recommend that you set it to help prevent problems if the destination bucket ownership changes.",
    }),
  ),
  Format: Schema.Literals(["CSV", "ORC", "Parquet"]).annotate({
    description:
      "Specifies the file format used when exporting data to Amazon S3.\n *Allowed values*: ``CSV`` | ``ORC`` | ``Parquet``",
  }),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The prefix to use when exporting data. The prefix is prepended to all results.",
    }),
  ),
}).annotate({
  description:
    "Specifies information about where to publish analysis or configuration results for an Amazon S3 bucket.",
  identifier: "Destination_1",
});

interface AbortIncompleteMultipartUpload {
  readonly DaysAfterInitiation: number;
}

const AbortIncompleteMultipartUpload = Schema.Struct({
  DaysAfterInitiation: Schema.Number.annotate({
    description:
      "Specifies the number of days after which Amazon S3 stops an incomplete multipart upload.",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({
        expected: "a value greater than or equal to 0",
      }),
    ),
}).annotate({
  description:
    "Specifies the days since the initiation of an incomplete multipart upload that Amazon S3 will wait before permanently removing all parts of the upload. For more information, see [Stopping Incomplete Multipart Uploads Using a Bucket Lifecycle Policy](https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html#mpu-abort-incomplete-mpu-lifecycle-config) in the *Amazon S3 User Guide*.",
  identifier: "AbortIncompleteMultipartUpload",
});

type Iso8601UTC = string;

const Iso8601UTC = Schema.String.annotate({
  description:
    "The date value in ISO 8601 format. The timezone is always UTC. (YYYY-MM-DDThh:mm:ssZ)",
}).check(
  Schema.isPattern(
    new globalThis.RegExp(
      "^(\\d{4})-(0[0-9]|1[0-2])-([0-2]\\d|3[01])T([01]\\d|2[0-4]):([0-5]\\d):([0-6]\\d)((\\.\\d{3})?)Z$",
      "u",
    ),
  ).annotate({
    expected:
      "a string matching the RegExp ^(\\d{4})-(0[0-9]|1[0-2])-([0-2]\\d|3[01])T([01]\\d|2[0-4]):([0-5]\\d):([0-6]\\d)((\\.\\d{3})?)Z$",
    identifier: "iso8601UTC",
  }),
);

interface NoncurrentVersionExpiration {
  readonly NoncurrentDays: number;
  readonly NewerNoncurrentVersions?: number;
}

const NoncurrentVersionExpiration = Schema.Struct({
  NoncurrentDays: Schema.Number.annotate({
    description:
      "Specifies the number of days an object is noncurrent before S3 can perform the associated action. For information about the noncurrent days calculations, see [How Amazon S3 Calculates When an Object Became Noncurrent](https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html#non-current-days-calculations) in the *Amazon S3 User Guide*.",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  NewerNoncurrentVersions: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Specifies how many noncurrent versions S3 will retain. If there are this many more recent noncurrent versions, S3 will take the associated action. For more information about noncurrent versions, see [Lifecycle configuration elements](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html) in the *Amazon S3 User Guide*.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
}).annotate({
  description:
    "Specifies when noncurrent object versions expire. Upon expiration, S3 permanently deletes the noncurrent object versions. You set this lifecycle configuration action on a bucket that has versioning enabled (or suspended) to request that S3 delete noncurrent object versions at a specific period in the object's lifetime. For more information about setting a lifecycle rule configuration, see [AWS::S3::Bucket Rule](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html).",
  identifier: "NoncurrentVersionExpiration",
});

interface NoncurrentVersionTransition {
  readonly StorageClass:
    | "DEEP_ARCHIVE"
    | "GLACIER"
    | "Glacier"
    | "GLACIER_IR"
    | "INTELLIGENT_TIERING"
    | "ONEZONE_IA"
    | "STANDARD_IA";
  readonly TransitionInDays: number;
  readonly NewerNoncurrentVersions?: number;
}

const NoncurrentVersionTransition = Schema.Struct({
  StorageClass: Schema.Literals([
    "DEEP_ARCHIVE",
    "GLACIER",
    "Glacier",
    "GLACIER_IR",
    "INTELLIGENT_TIERING",
    "ONEZONE_IA",
    "STANDARD_IA",
  ]).annotate({
    description: "The class of storage used to store the object.",
  }),
  TransitionInDays: Schema.Number.annotate({
    description:
      "Specifies the number of days an object is noncurrent before Amazon S3 can perform the associated action. For information about the noncurrent days calculations, see [How Amazon S3 Calculates How Long an Object Has Been Noncurrent](https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html#non-current-days-calculations) in the *Amazon S3 User Guide*.",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  NewerNoncurrentVersions: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Specifies how many noncurrent versions S3 will retain. If there are this many more recent noncurrent versions, S3 will take the associated action. For more information about noncurrent versions, see [Lifecycle configuration elements](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html) in the *Amazon S3 User Guide*.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
}).annotate({
  description:
    "Container for the transition rule that describes when noncurrent objects transition to the ``STANDARD_IA``, ``ONEZONE_IA``, ``INTELLIGENT_TIERING``, ``GLACIER_IR``, ``GLACIER``, or ``DEEP_ARCHIVE`` storage class. If your bucket is versioning-enabled (or versioning is suspended), you can set this action to request that Amazon S3 transition noncurrent object versions to the ``STANDARD_IA``, ``ONEZONE_IA``, ``INTELLIGENT_TIERING``, ``GLACIER_IR``, ``GLACIER``, or ``DEEP_ARCHIVE`` storage class at a specific period in the object's lifetime. If you specify this property, don't specify the ``NoncurrentVersionTransitions`` property.",
  identifier: "NoncurrentVersionTransition",
});

interface PartitionedPrefix {
  readonly PartitionDateSource?: "EventTime" | "DeliveryTime";
}

const PartitionedPrefix = Schema.Struct({
  PartitionDateSource: Schema.optionalKey(
    Schema.Literals(["EventTime", "DeliveryTime"]).annotate({
      description:
        "Specifies the partition date source for the partitioned prefix. ``PartitionDateSource`` can be ``EventTime`` or ``DeliveryTime``.\n For ``DeliveryTime``, the time in the log file names corresponds to the delivery time for the log files. \n  For ``EventTime``, The logs delivered are for a specific day only. The year, month, and day correspond to the day on which the event occurred, and the hour, minutes and seconds are set to 00 in the key.",
    }),
  ),
}).annotate({
  description:
    "Amazon S3 keys for log objects are partitioned in the following format:\n  ``[DestinationPrefix][SourceAccountId]/[SourceRegion]/[SourceBucket]/[YYYY]/[MM]/[DD]/[YYYY]-[MM]-[DD]-[hh]-[mm]-[ss]-[UniqueString]`` \n PartitionedPrefix defaults to EventTime delivery when server access logs are delivered.",
  identifier: "PartitionedPrefix",
});

interface S3TablesDestination {
  readonly TableBucketArn: string;
  readonly TableName: string;
  readonly TableNamespace?: string;
  readonly TableArn?: string;
}

const S3TablesDestination = Schema.Struct({
  TableBucketArn: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) for the table bucket that's specified as the destination in the metadata table configuration. The destination table bucket must be in the same Region and AWS-account as the general purpose bucket.",
  }),
  TableName: Schema.String.annotate({
    description:
      "The name for the metadata table in your metadata table configuration. The specified metadata table name must be unique within the ``aws_s3_metadata`` namespace in the destination table bucket.",
  }),
  TableNamespace: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The table bucket namespace for the metadata table in your metadata table configuration. This value is always ``aws_s3_metadata``.",
    }),
  ),
  TableArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) for the metadata table in the metadata table configuration. The specified metadata table name must be unique within the ``aws_s3_metadata`` namespace in the destination table bucket.",
    }),
  ),
}).annotate({
  description:
    "The destination information for a V1 S3 Metadata configuration. The destination table bucket must be in the same Region and AWS-account as the general purpose bucket. The specified metadata table name must be unique within the ``aws_s3_metadata`` namespace in the destination table bucket.",
  identifier: "S3TablesDestination",
});

interface MetadataDestination {
  readonly TableBucketType: "aws" | "customer";
  readonly TableBucketArn?: string;
  readonly TableNamespace?: string;
}

const MetadataDestination = Schema.Struct({
  TableBucketType: Schema.Literals(["aws", "customer"]).annotate({
    description:
      "The type of the table bucket where the metadata configuration is stored. The ``aws`` value indicates an AWS managed table bucket, and the ``customer`` value indicates a customer-managed table bucket. V2 metadata configurations are stored in AWS managed table buckets, and V1 metadata configurations are stored in customer-managed table buckets.",
  }),
  TableBucketArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) of the table bucket where the metadata configuration is stored.",
    }),
  ),
  TableNamespace: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The namespace in the table bucket where the metadata tables for a metadata configuration are stored.",
    }),
  ),
}).annotate({
  description: "The destination information for the S3 Metadata configuration.",
  identifier: "MetadataDestination",
});

interface RecordExpiration {
  readonly Expiration: "ENABLED" | "DISABLED";
  readonly Days?: number;
}

const RecordExpiration = Schema.Struct({
  Expiration: Schema.Literals(["ENABLED", "DISABLED"]).annotate({
    description:
      "Specifies whether journal table record expiration is enabled or disabled.",
  }),
  Days: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "If you enable journal table record expiration, you can set the number of days to retain your journal table records. Journal table records must be retained for a minimum of 7 days. To set this value, specify any whole number from ``7`` to ``2147483647``. For example, to retain your journal table records for one year, set this value to ``365``.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
}).annotate({
  description:
    "The journal table record expiration settings for a journal table in an S3 Metadata configuration.",
  identifier: "RecordExpiration",
});

interface MetadataTableEncryptionConfiguration {
  readonly SseAlgorithm: "aws:kms" | "AES256";
  readonly KmsKeyArn?: string;
}

const MetadataTableEncryptionConfiguration = Schema.Struct({
  SseAlgorithm: Schema.Literals(["aws:kms", "AES256"]).annotate({
    description:
      "The encryption type specified for a metadata table. To specify server-side encryption with KMSlong (KMS) keys (SSE-KMS), use the ``aws:kms`` value. To specify server-side encryption with Amazon S3 managed keys (SSE-S3), use the ``AES256`` value.",
  }),
  KmsKeyArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "If server-side encryption with KMSlong (KMS) keys (SSE-KMS) is specified, you must also specify the KMS key Amazon Resource Name (ARN). You must specify a customer-managed KMS key that's located in the same Region as the general purpose bucket that corresponds to the metadata table configuration.",
    }),
  ),
}).annotate({
  description:
    "The encryption settings for an S3 Metadata journal table or inventory table configuration.",
  identifier: "MetadataTableEncryptionConfiguration",
});

interface EventBridgeConfiguration {
  readonly EventBridgeEnabled: boolean;
}

const EventBridgeConfiguration = Schema.Struct({
  EventBridgeEnabled: Schema.Boolean.annotate({
    description: "Enables delivery of events to Amazon EventBridge.",
  }),
}).annotate({
  description:
    "Amazon S3 can send events to Amazon EventBridge whenever certain events happen in your bucket, see [Using EventBridge](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventBridge.html) in the *Amazon S3 User Guide*.\n Unlike other destinations, delivery of events to EventBridge can be either enabled or disabled for a bucket. If enabled, all events will be sent to EventBridge and you can use EventBridge rules to route events to additional targets. For more information, see [What Is Amazon EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html) in the *Amazon EventBridge User Guide*",
  identifier: "EventBridgeConfiguration",
});

interface FilterRule {
  readonly Name: string;
  readonly Value: string;
}

const FilterRule = Schema.Struct({
  Name: Schema.String.annotate({
    description:
      "The object key name prefix or suffix identifying one or more objects to which the filtering rule applies. The maximum length is 1,024 characters. Overlapping prefixes and suffixes are not supported. For more information, see [Configuring Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }).check(
    Schema.isMaxCodePoints(1024).annotate({
      expected: "a string with at most 1024 code points",
    }),
  ),
  Value: Schema.String.annotate({
    description: "The value that the filter searches for in object key names.",
  }),
}).annotate({
  description:
    "Specifies the Amazon S3 object key name to filter on. An object key name is the name assigned to an object in your Amazon S3 bucket. You specify whether to filter on the suffix or prefix of the object key name. A prefix is a specific string of characters at the beginning of an object key name, which you can use to organize objects. For example, you can start the key names of related objects with a prefix, such as ``2023-`` or ``engineering/``. Then, you can use ``FilterRule`` to find objects in a bucket with key names that have the same prefix. A suffix is similar to a prefix, but it is at the end of the object key name instead of at the beginning.",
  identifier: "FilterRule",
});

interface DefaultRetention {
  readonly Years?: number;
  readonly Days?: number;
  readonly Mode?: "COMPLIANCE" | "GOVERNANCE";
}

const DefaultRetention = Schema.Struct({
  Years: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The number of years that you want to specify for the default retention period. If Object Lock is turned on, you must specify ``Mode`` and specify either ``Days`` or ``Years``.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  Days: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The number of days that you want to specify for the default retention period. If Object Lock is turned on, you must specify ``Mode`` and specify either ``Days`` or ``Years``.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  Mode: Schema.optionalKey(
    Schema.Literals(["COMPLIANCE", "GOVERNANCE"]).annotate({
      description:
        "The default Object Lock retention mode you want to apply to new objects placed in the specified bucket. If Object Lock is turned on, you must specify ``Mode`` and specify either ``Days`` or ``Years``.",
    }),
  ),
}).annotate({
  description:
    "The container element for optionally specifying the default Object Lock retention settings for new objects placed in the specified bucket.\n   +  The ``DefaultRetention`` settings require both a mode and a period.\n  +  The ``DefaultRetention`` period can be either ``Days`` or ``Years`` but you must select one. You cannot specify ``Days`` and ``Years`` at the same time.",
  identifier: "DefaultRetention",
});

interface OwnershipControlsRule {
  readonly ObjectOwnership?:
    | "ObjectWriter"
    | "BucketOwnerPreferred"
    | "BucketOwnerEnforced";
}

const OwnershipControlsRule = Schema.Struct({
  ObjectOwnership: Schema.optionalKey(
    Schema.Literals([
      "ObjectWriter",
      "BucketOwnerPreferred",
      "BucketOwnerEnforced",
    ]).annotate({ description: "Specifies an object ownership rule." }),
  ),
}).annotate({
  description:
    "Specifies an Object Ownership rule.\n S3 Object Ownership is an Amazon S3 bucket-level setting that you can use to disable access control lists (ACLs) and take ownership of every object in your bucket, simplifying access management for data stored in Amazon S3. For more information, see [Controlling ownership of objects and disabling ACLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html) in the *Amazon S3 User Guide*.",
  identifier: "OwnershipControlsRule",
});

interface PublicAccessBlockConfiguration {
  readonly BlockPublicAcls?: boolean;
  readonly BlockPublicPolicy?: boolean;
  readonly IgnorePublicAcls?: boolean;
  readonly RestrictPublicBuckets?: boolean;
}

const PublicAccessBlockConfiguration = Schema.Struct({
  BlockPublicAcls: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether Amazon S3 should block public access control lists (ACLs) for this bucket and objects in this bucket. Setting this element to ``TRUE`` causes the following behavior:\n  +  PUT Bucket ACL and PUT Object ACL calls fail if the specified ACL is public.\n  +  PUT Object calls fail if the request includes a public ACL.\n  +  PUT Bucket calls fail if the request includes a public ACL.\n  \n Enabling this setting doesn't affect existing policies or ACLs.",
    }),
  ),
  BlockPublicPolicy: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether Amazon S3 should block public bucket policies for this bucket. Setting this element to ``TRUE`` causes Amazon S3 to reject calls to PUT Bucket policy if the specified bucket policy allows public access. \n Enabling this setting doesn't affect existing bucket policies.",
    }),
  ),
  IgnorePublicAcls: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether Amazon S3 should ignore public ACLs for this bucket and objects in this bucket. Setting this element to ``TRUE`` causes Amazon S3 to ignore all public ACLs on this bucket and objects in this bucket.\n Enabling this setting doesn't affect the persistence of any existing ACLs and doesn't prevent new public ACLs from being set.",
    }),
  ),
  RestrictPublicBuckets: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether Amazon S3 should restrict public bucket policies for this bucket. Setting this element to ``TRUE`` restricts access to this bucket to only AWS-service principals and authorized users within this account if the bucket has a public policy.\n Enabling this setting doesn't affect previously stored bucket policies, except that public and cross-account access within any public bucket policy, including non-public delegation to specific accounts, is blocked.",
    }),
  ),
}).annotate({
  description:
    'The PublicAccessBlock configuration that you want to apply to this Amazon S3 bucket. You can enable the configuration options in any combination. Bucket-level settings work alongside account-level settings (which may inherit from organization-level policies). For more information about when Amazon S3 considers a bucket or object public, see [The Meaning of "Public"](https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html#access-control-block-public-access-policy-status) in the *Amazon S3 User Guide*.',
  identifier: "PublicAccessBlockConfiguration",
});

interface DeleteMarkerReplication {
  readonly Status?: "Disabled" | "Enabled";
}

const DeleteMarkerReplication = Schema.Struct({
  Status: Schema.optionalKey(
    Schema.Literals(["Disabled", "Enabled"]).annotate({
      description: "Indicates whether to replicate delete markers.",
    }),
  ),
}).annotate({
  description:
    "Specifies whether Amazon S3 replicates delete markers. If you specify a ``Filter`` in your replication configuration, you must also include a ``DeleteMarkerReplication`` element. If your ``Filter`` includes a ``Tag`` element, the ``DeleteMarkerReplication````Status`` must be set to Disabled, because Amazon S3 does not support replicating delete markers for tag-based rules. For an example configuration, see [Basic Rule Configuration](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-add-config.html#replication-config-min-rule-config). \n For more information about delete marker replication, see [Basic Rule Configuration](https://docs.aws.amazon.com/AmazonS3/latest/dev/delete-marker-replication.html). \n  If you are using an earlier version of the replication configuration, Amazon S3 handles replication of delete markers differently. For more information, see [Backward Compatibility](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-add-config.html#replication-backward-compat-considerations).",
  identifier: "DeleteMarkerReplication",
});

interface AccessControlTranslation {
  readonly Owner: "Destination";
}

const AccessControlTranslation = Schema.Struct({
  Owner: Schema.Literal("Destination").annotate({
    description:
      "Specifies the replica ownership. For default and valid values, see [PUT bucket replication](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTreplication.html) in the *Amazon S3 API Reference*.",
  }),
}).annotate({
  description:
    "Specify this only in a cross-account scenario (where source and destination bucket owners are not the same), and you want to change replica ownership to the AWS-account that owns the destination bucket. If this is not specified in the replication configuration, the replicas are owned by same AWS-account that owns the source object.",
  identifier: "AccessControlTranslation",
});

interface EncryptionConfiguration {
  readonly ReplicaKmsKeyID:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "kms";
        readonly resource: "key";
      }>
    | string;
}

const EncryptionConfiguration = Schema.Struct({
  ReplicaKmsKeyID: Schema.Union([
    Schema.Union([
      ResourceReferenceSchema(
        Schema.Struct({
          provider: Schema.Literal("aws"),
          service: Schema.Literal("kms"),
          resource: Schema.Literal("key"),
        }),
        {
          value: null,
          outputs: [
            {
              source: ["Arn"],
              target: [],
            },
          ],
        },
      ).annotate({ expected: "ResourceEntity" }),
    ]),
    Schema.String.annotate({
      description:
        "Specifies the ID (Key ARN or Alias ARN) of the customer managed AWS KMS key stored in AWS Key Management Service (KMS) for the destination bucket. Amazon S3 uses this key to encrypt replica objects. Amazon S3 only supports symmetric encryption KMS keys. For more information, see [Asymmetric keys in KMS](https://docs.aws.amazon.com//kms/latest/developerguide/symmetric-asymmetric.html) in the *Key Management Service Developer Guide*.",
    }),
  ]),
}).annotate({
  description:
    "Specifies encryption-related information for an Amazon S3 bucket that is a destination for replicated objects.\n  If you're specifying a customer managed KMS key, we recommend using a fully qualified KMS key ARN. If you use a KMS key alias instead, then KMS resolves the key within the requester’s account. This behavior can result in data that's encrypted with a KMS key that belongs to the requester, and not the bucket owner.",
  identifier: "EncryptionConfiguration",
});

interface ReplicationTimeValue {
  readonly Minutes: number;
}

const ReplicationTimeValue = Schema.Struct({
  Minutes: Schema.Number.annotate({
    description:
      "Contains an integer specifying time in minutes. \n  Valid value: 15",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({
  description:
    "A container specifying the time value for S3 Replication Time Control (S3 RTC) and replication metrics ``EventThreshold``.",
  identifier: "ReplicationTimeValue",
});

interface ReplicaModifications {
  readonly Status: "Enabled" | "Disabled";
}

const ReplicaModifications = Schema.Struct({
  Status: Schema.Literals(["Enabled", "Disabled"]).annotate({
    description:
      "Specifies whether Amazon S3 replicates modifications on replicas.\n *Allowed values*: ``Enabled`` | ``Disabled``",
  }),
}).annotate({
  description:
    "A filter that you can specify for selection for modifications on replicas.",
  identifier: "ReplicaModifications",
});

interface SseKmsEncryptedObjects {
  readonly Status: "Disabled" | "Enabled";
}

const SseKmsEncryptedObjects = Schema.Struct({
  Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
    description:
      "Specifies whether Amazon S3 replicates objects created with server-side encryption using an AWS KMS key stored in AWS Key Management Service.",
  }),
}).annotate({
  description:
    "A container for filter information for the selection of S3 objects encrypted with AWS KMS.",
  identifier: "SseKmsEncryptedObjects",
});

interface Tag {
  readonly Key: string;
  readonly Value: string;
}

const Tag = Schema.Struct({
  Key: Schema.String.annotate({ description: "Name of the object key." })
    .check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
    .check(
      Schema.isMaxCodePoints(128).annotate({
        expected: "a string with at most 128 code points",
      }),
    ),
  Value: Schema.String.annotate({ description: "Value of the tag." }).check(
    Schema.isMaxCodePoints(256).annotate({
      expected: "a string with at most 256 code points",
    }),
  ),
}).annotate({
  description: "A container of a key value name pair.",
  identifier: "Tag",
});

interface VersioningConfiguration {
  readonly Status: "Enabled" | "Suspended";
}

const VersioningConfiguration = Schema.Struct({
  Status: Schema.Literals(["Enabled", "Suspended"]).annotate({
    description: "The versioning state of the bucket.",
  }),
}).annotate({
  description:
    "Describes the versioning state of an Amazon S3 bucket. For more information, see [PUT Bucket versioning](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTVersioningStatus.html) in the *Amazon S3 API Reference*.\n Keep the following timing in mind when enabling, suspending, or transitioning between versioning states:\n  +  *Enabling versioning* - Changes may take up to 15 minutes to propagate across all AWS regions for full consistency.\n  +  *Suspending versioning* - Takes effect immediately with no propagation delay.\n  +  *Transitioning between states* - Any change from Suspended to Enabled has a 15-minute delay.",
  identifier: "VersioningConfiguration",
});

interface RedirectRule {
  readonly HostName?: string;
  readonly HttpRedirectCode?: string;
  readonly Protocol?: "http" | "https";
  readonly ReplaceKeyPrefixWith?: string;
  readonly ReplaceKeyWith?: string;
}

const RedirectRule = Schema.Struct({
  HostName: Schema.optionalKey(
    Schema.String.annotate({
      description: "The host name to use in the redirect request.",
    }),
  ),
  HttpRedirectCode: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The HTTP redirect code to use on the response. Not required if one of the siblings is present.",
    }),
  ),
  Protocol: Schema.optionalKey(
    Schema.Literals(["http", "https"]).annotate({
      description:
        "Protocol to use when redirecting requests. The default is the protocol that is used in the original request.",
    }),
  ),
  ReplaceKeyPrefixWith: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The object key prefix to use in the redirect request. For example, to redirect requests for all pages with prefix ``docs/`` (objects in the ``docs/`` folder) to ``documents/``, you can set a condition block with ``KeyPrefixEquals`` set to ``docs/`` and in the Redirect set ``ReplaceKeyPrefixWith`` to ``/documents``. Not required if one of the siblings is present. Can be present only if ``ReplaceKeyWith`` is not provided.\n  Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see [XML related object key constraints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints).",
    }),
  ),
  ReplaceKeyWith: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The specific object key to use in the redirect request. For example, redirect request to ``error.html``. Not required if one of the siblings is present. Can be present only if ``ReplaceKeyPrefixWith`` is not provided.\n  Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see [XML related object key constraints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints).",
    }),
  ),
}).annotate({
  description:
    "Specifies how requests are redirected. In the event of an error, you can specify a different error code to return.",
  identifier: "RedirectRule",
});

interface RoutingRuleCondition {
  readonly KeyPrefixEquals?: string;
  readonly HttpErrorCodeReturnedEquals?: string;
}

const RoutingRuleCondition = Schema.Struct({
  KeyPrefixEquals: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The object key name prefix when the redirect is applied. For example, to redirect requests for ``ExamplePage.html``, the key prefix will be ``ExamplePage.html``. To redirect request for all pages with the prefix ``docs/``, the key prefix will be ``docs/``, which identifies all objects in the docs/ folder.\n Required when the parent element ``Condition`` is specified and sibling ``HttpErrorCodeReturnedEquals`` is not specified. If both conditions are specified, both must be true for the redirect to be applied.",
    }),
  ),
  HttpErrorCodeReturnedEquals: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The HTTP error code when the redirect is applied. In the event of an error, if the error code equals this value, then the specified redirect is applied.\n Required when parent element ``Condition`` is specified and sibling ``KeyPrefixEquals`` is not specified. If both are specified, then both must be true for the redirect to be applied.",
    }),
  ),
}).annotate({
  description:
    "A container for describing a condition that must be met for the specified redirect to apply. For example, 1. If request is for pages in the ``/docs`` folder, redirect to the ``/documents`` folder. 2. If request results in HTTP error 4xx, redirect request to another host where you might process the error.",
  identifier: "RoutingRuleCondition",
});

interface RedirectAllRequestsTo {
  readonly HostName: string;
  readonly Protocol?: "http" | "https";
}

const RedirectAllRequestsTo = Schema.Struct({
  HostName: Schema.String.annotate({
    description: "Name of the host where requests are redirected.",
  }),
  Protocol: Schema.optionalKey(
    Schema.Literals(["http", "https"]).annotate({
      description:
        "Protocol to use when redirecting requests. The default is the protocol that is used in the original request.",
    }),
  ),
}).annotate({
  description:
    "Specifies the redirect behavior of all requests to a website endpoint of an Amazon S3 bucket.",
  identifier: "RedirectAllRequestsTo",
});

type Arn = string;

const Arn = Schema.String.annotate({
  description: "the Amazon Resource Name (ARN) of the specified bucket.",
  identifier: "Arn",
});

interface Destination_2 {
  readonly BucketArn: string;
  readonly BucketAccountId?: string;
  readonly Format: "CSV" | "ORC" | "Parquet";
  readonly Prefix?: string;
}

const Destination_2 = Schema.Struct({
  BucketArn: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the bucket to which data is exported.",
  }),
  BucketAccountId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The account ID that owns the destination S3 bucket. If no account ID is provided, the owner is not validated before exporting data.\n   Although this value is optional, we strongly recommend that you set it to help prevent problems if the destination bucket ownership changes.",
    }),
  ),
  Format: Schema.Literals(["CSV", "ORC", "Parquet"]).annotate({
    description:
      "Specifies the file format used when exporting data to Amazon S3.\n *Allowed values*: ``CSV`` | ``ORC`` | ``Parquet``",
  }),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The prefix to use when exporting data. The prefix is prepended to all results.",
    }),
  ),
}).annotate({
  description:
    "Specifies information about where to publish analysis or configuration results for an Amazon S3 bucket.",
  identifier: "Destination_2",
});

interface ServerSideEncryptionByDefault_1 {
  readonly KMSMasterKeyID?: string;
  readonly SSEAlgorithm: "aws:kms" | "AES256" | "aws:kms:dsse";
}

const ServerSideEncryptionByDefault_1 = Schema.Struct({
  KMSMasterKeyID: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "AWS Key Management Service (KMS) customer managed key ID to use for the default encryption. \n   +  *General purpose buckets* - This parameter is allowed if and only if ``SSEAlgorithm`` is set to ``aws:kms`` or ``aws:kms:dsse``.\n  +  *Directory buckets* - This parameter is allowed if and only if ``SSEAlgorithm`` is set to ``aws:kms``.\n  \n  You can specify the key ID, key alias, or the Amazon Resource Name (ARN) of the KMS key.\n  +  Key ID: ``1234abcd-12ab-34cd-56ef-1234567890ab``\n  +  Key ARN: ``arn:aws:kms:us-east-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab``\n  +  Key Alias: ``alias/alias-name``\n  \n If you are using encryption with cross-account or AWS service operations, you must use a fully qualified KMS key ARN. For more information, see [Using encryption for cross-account operations](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html#bucket-encryption-update-bucket-policy).\n   +  *General purpose buckets* - If you're specifying a customer managed KMS key, we recommend using a fully qualified KMS key ARN. If you use a KMS key alias instead, then KMS resolves the key within the requester’s account. This behavior can result in data that's encrypted with a KMS key that belongs to the requester, and not the bucket owner. Also, if you use a key ID, you can run into a LogDestination undeliverable error when creating a VPC flow log. \n  +  *Directory buckets* - When you specify an [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) for encryption in your directory bucket, only use the key ID or key ARN. The key alias format of the KMS key isn't supported.\n  \n   Amazon S3 only supports symmetric encryption KMS keys. For more information, see [Asymmetric keys in KMS](https://docs.aws.amazon.com//kms/latest/developerguide/symmetric-asymmetric.html) in the *Key Management Service Developer Guide*.",
    }),
  ),
  SSEAlgorithm: Schema.Literals(["aws:kms", "AES256", "aws:kms:dsse"]).annotate(
    {
      description:
        "Server-side encryption algorithm to use for the default encryption.\n  For directory buckets, there are only two supported values for server-side encryption: ``AES256`` and ``aws:kms``.",
    },
  ),
}).annotate({
  description:
    "Describes the default server-side encryption to apply to new objects in the bucket. If a PUT Object request doesn't specify any server-side encryption, this default encryption will be applied. For more information, see [PutBucketEncryption](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTencryption.html).\n   +  *General purpose buckets* - If you don't specify a customer managed key at configuration, Amazon S3 automatically creates an AWS KMS key (``aws/s3``) in your AWS account the first time that you add an object encrypted with SSE-KMS to a bucket. By default, Amazon S3 uses this KMS key for SSE-KMS. \n  +  *Directory buckets* - Your SSE-KMS configuration can only support 1 [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) per directory bucket's lifetime. The [managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-cmk) (``aws/s3``) isn't supported. \n  +  *Directory buckets* - For directory buckets, there are only two supported options for server-side encryption: SSE-S3 and SSE-KMS.",
  identifier: "ServerSideEncryptionByDefault_1",
});

interface EncryptionConfiguration_1 {
  readonly ReplicaKmsKeyID: string;
}

const EncryptionConfiguration_1 = Schema.Struct({
  ReplicaKmsKeyID: Schema.String.annotate({
    description:
      "Specifies the ID (Key ARN or Alias ARN) of the customer managed AWS KMS key stored in AWS Key Management Service (KMS) for the destination bucket. Amazon S3 uses this key to encrypt replica objects. Amazon S3 only supports symmetric encryption KMS keys. For more information, see [Asymmetric keys in KMS](https://docs.aws.amazon.com//kms/latest/developerguide/symmetric-asymmetric.html) in the *Key Management Service Developer Guide*.",
  }),
}).annotate({
  description:
    "Specifies encryption-related information for an Amazon S3 bucket that is a destination for replicated objects.\n  If you're specifying a customer managed KMS key, we recommend using a fully qualified KMS key ARN. If you use a KMS key alias instead, then KMS resolves the key within the requester’s account. This behavior can result in data that's encrypted with a KMS key that belongs to the requester, and not the bucket owner.",
  identifier: "EncryptionConfiguration_1",
});

interface MetricsConfiguration {
  readonly AccessPointArn?: string;
  readonly Id: string;
  readonly Prefix?: string;
  readonly TagFilters?: ReadonlyArray<TagFilter>;
}

const MetricsConfiguration = Schema.Struct({
  AccessPointArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The access point that was used while performing operations on the object. The metrics configuration only includes objects that meet the filter's criteria.",
    }),
  ),
  Id: Schema.String.annotate({
    description:
      "The ID used to identify the metrics configuration. This can be any value you choose that helps you identify your metrics configuration.",
  }),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The prefix that an object must have to be included in the metrics results.",
    }),
  ),
  TagFilters: Schema.optionalKey(
    Schema.Array(TagFilter)
      .annotate({
        description:
          "Specifies a list of tag filters to use as a metrics configuration filter. The metrics configuration includes only objects that meet the filter's criteria.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
}).annotate({
  description:
    "Specifies a metrics configuration for the CloudWatch request metrics (specified by the metrics configuration ID) from an Amazon S3 bucket. If you're updating an existing metrics configuration, note that this is a full replacement of the existing metrics configuration. If you don't include the elements you want to keep, they are erased. For examples, see [AWS::S3::Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket--examples). For more information, see [PUT Bucket metrics](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTMetricConfiguration.html) in the *Amazon S3 API Reference*.",
  identifier: "MetricsConfiguration",
});

interface ReplicationRuleAndOperator {
  readonly Prefix?: string;
  readonly TagFilters?: ReadonlyArray<TagFilter>;
}

const ReplicationRuleAndOperator = Schema.Struct({
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An object key name prefix that identifies the subset of objects to which the rule applies.",
    }),
  ),
  TagFilters: Schema.optionalKey(
    Schema.Array(TagFilter)
      .annotate({
        description: "An array of tags containing key and value pairs.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
}).annotate({
  description:
    "A container for specifying rule filters. The filters determine the subset of objects to which the rule applies. This element is required only if you specify more than one filter. \n For example:\n  +  If you specify both a ``Prefix`` and a ``TagFilter``, wrap these filters in an ``And`` tag. \n  +  If you specify a filter based on multiple tags, wrap the ``TagFilter`` elements in an ``And`` tag",
  identifier: "ReplicationRuleAndOperator",
});

interface DataExport {
  readonly Destination: Destination;
  readonly OutputSchemaVersion: "V_1";
}

const DataExport = Schema.Struct({
  Destination: Destination,
  OutputSchemaVersion: Schema.Literal("V_1").annotate({
    description:
      "The version of the output schema to use when exporting data. Must be ``V_1``.",
  }),
}).annotate({
  description:
    "Specifies how data related to the storage class analysis for an Amazon S3 bucket should be exported.",
  identifier: "DataExport",
});

interface BlockedEncryptionTypes {
  readonly EncryptionType?: BlockedEncryptionTypeList;
}

const BlockedEncryptionTypes = Schema.Struct({
  EncryptionType: Schema.optionalKey(BlockedEncryptionTypeList),
}).annotate({
  description:
    "A bucket-level setting for Amazon S3 general purpose buckets used to prevent the upload of new objects encrypted with the specified server-side encryption type. For example, blocking an encryption type will block ``PutObject``, ``CopyObject``, ``PostObject``, multipart upload, and replication requests to the bucket for objects with the specified encryption type. However, you can continue to read and list any pre-existing objects already encrypted with the specified encryption type. For more information, see [Blocking or unblocking SSE-C for a general purpose bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/blocking-unblocking-s3-c-encryption-gpb.html).\n This data type is used with the following actions:\n  +   [PutBucketEncryption](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketEncryption.html) \n  +   [GetBucketEncryption](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketEncryption.html) \n  +   [DeleteBucketEncryption](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketEncryption.html) \n  \n  + Permissions You must have the s3:PutEncryptionConfiguration permission to block or unblock an encryption type for a bucket. You must have the s3:GetEncryptionConfiguration permission to view a bucket's encryption type.",
  identifier: "BlockedEncryptionTypes",
});

interface CorsConfiguration {
  readonly CorsRules: ReadonlyArray<CorsRule>;
}

const CorsConfiguration = Schema.Struct({
  CorsRules: Schema.Array(CorsRule)
    .annotate({
      description:
        "A set of origins and methods (cross-origin access that you want to allow). You can add up to 100 rules to the configuration.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
}).annotate({
  description:
    "Describes the cross-origin access configuration for objects in an Amazon S3 bucket. For more information, see [Enabling Cross-Origin Resource Sharing](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html) in the *Amazon S3 User Guide*.",
  identifier: "CorsConfiguration",
});

interface IntelligentTieringConfiguration {
  readonly Id: string;
  readonly Prefix?: string;
  readonly Status: "Disabled" | "Enabled";
  readonly TagFilters?: ReadonlyArray<TagFilter>;
  readonly Tierings: ReadonlyArray<Tiering>;
}

const IntelligentTieringConfiguration = Schema.Struct({
  Id: Schema.String.annotate({
    description:
      "The ID used to identify the S3 Intelligent-Tiering configuration.",
  }),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An object key name prefix that identifies the subset of objects to which the rule applies.",
    }),
  ),
  Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
    description: "Specifies the status of the configuration.",
  }),
  TagFilters: Schema.optionalKey(
    Schema.Array(TagFilter)
      .annotate({ description: "A container for a key-value pair." })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  Tierings: Schema.Array(Tiering)
    .annotate({
      description:
        "Specifies a list of S3 Intelligent-Tiering storage class tiers in the configuration. At least one tier must be defined in the list. At most, you can specify two tiers in the list, one for each available AccessTier: ``ARCHIVE_ACCESS`` and ``DEEP_ARCHIVE_ACCESS``.\n  You only need Intelligent Tiering Configuration enabled on a bucket if you want to automatically move objects stored in the Intelligent-Tiering storage class to Archive Access or Deep Archive Access tiers.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
}).annotate({
  description:
    "Specifies the S3 Intelligent-Tiering configuration for an Amazon S3 bucket.\n For information about the S3 Intelligent-Tiering storage class, see [Storage class for automatically optimizing frequently and infrequently accessed objects](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html#sc-dynamic-data-access).",
  identifier: "IntelligentTieringConfiguration",
});

interface InventoryConfiguration {
  readonly Destination: Destination_1;
  readonly Enabled: boolean;
  readonly Id: string;
  readonly IncludedObjectVersions: "All" | "Current";
  readonly OptionalFields?: ReadonlyArray<
    | "Size"
    | "LastModifiedDate"
    | "StorageClass"
    | "ETag"
    | "IsMultipartUploaded"
    | "ReplicationStatus"
    | "EncryptionStatus"
    | "ObjectLockRetainUntilDate"
    | "ObjectLockMode"
    | "ObjectLockLegalHoldStatus"
    | "IntelligentTieringAccessTier"
    | "BucketKeyStatus"
    | "ChecksumAlgorithm"
    | "ObjectAccessControlList"
    | "ObjectOwner"
    | "LifecycleExpirationDate"
  >;
  readonly Prefix?: string;
  readonly ScheduleFrequency: "Daily" | "Weekly";
}

const InventoryConfiguration = Schema.Struct({
  Destination: Destination_1,
  Enabled: Schema.Boolean.annotate({
    description:
      "Specifies whether the inventory is enabled or disabled. If set to ``True``, an inventory list is generated. If set to ``False``, no inventory list is generated.",
  }),
  Id: Schema.String.annotate({
    description: "The ID used to identify the inventory configuration.",
  }),
  IncludedObjectVersions: Schema.Literals(["All", "Current"]).annotate({
    description:
      "Object versions to include in the inventory list. If set to ``All``, the list includes all the object versions, which adds the version-related fields ``VersionId``, ``IsLatest``, and ``DeleteMarker`` to the list. If set to ``Current``, the list does not contain these version-related fields.",
  }),
  OptionalFields: Schema.optionalKey(
    Schema.Array(
      Schema.Literals([
        "Size",
        "LastModifiedDate",
        "StorageClass",
        "ETag",
        "IsMultipartUploaded",
        "ReplicationStatus",
        "EncryptionStatus",
        "ObjectLockRetainUntilDate",
        "ObjectLockMode",
        "ObjectLockLegalHoldStatus",
        "IntelligentTieringAccessTier",
        "BucketKeyStatus",
        "ChecksumAlgorithm",
        "ObjectAccessControlList",
        "ObjectOwner",
        "LifecycleExpirationDate",
      ]),
    )
      .annotate({
        description:
          "Contains the optional fields that are included in the inventory results.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description: "Specifies the inventory filter prefix.",
    }),
  ),
  ScheduleFrequency: Schema.Literals(["Daily", "Weekly"]).annotate({
    description: "Specifies the schedule for generating inventory results.",
  }),
}).annotate({
  description:
    "Specifies the S3 Inventory configuration for an Amazon S3 bucket. For more information, see [GET Bucket inventory](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGETInventoryConfig.html) in the *Amazon S3 API Reference*.",
  identifier: "InventoryConfiguration",
});

interface Transition {
  readonly StorageClass:
    | "DEEP_ARCHIVE"
    | "GLACIER"
    | "Glacier"
    | "GLACIER_IR"
    | "INTELLIGENT_TIERING"
    | "ONEZONE_IA"
    | "STANDARD_IA";
  readonly TransitionDate?: Iso8601UTC;
  readonly TransitionInDays?: number;
}

const Transition = Schema.Struct({
  StorageClass: Schema.Literals([
    "DEEP_ARCHIVE",
    "GLACIER",
    "Glacier",
    "GLACIER_IR",
    "INTELLIGENT_TIERING",
    "ONEZONE_IA",
    "STANDARD_IA",
  ]).annotate({
    description:
      "The storage class to which you want the object to transition.",
  }),
  TransitionDate: Schema.optionalKey(Iso8601UTC),
  TransitionInDays: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Indicates the number of days after creation when objects are transitioned to the specified storage class. If the specified storage class is ``INTELLIGENT_TIERING``, ``GLACIER_IR``, ``GLACIER``, or ``DEEP_ARCHIVE``, valid values are ``0`` or positive integers. If the specified storage class is ``STANDARD_IA`` or ``ONEZONE_IA``, valid values are positive integers greater than ``30``. Be aware that some storage classes have a minimum storage duration and that you're charged for transitioning objects before their minimum storage duration. For more information, see [Constraints and considerations for transitions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints) in the *Amazon S3 User Guide*.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
}).annotate({
  description:
    "Specifies when an object transitions to a specified storage class. For more information about Amazon S3 lifecycle configuration rules, see [Transitioning Objects Using Amazon S3 Lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-transition-general-considerations.html) in the *Amazon S3 User Guide*.",
  identifier: "Transition",
});

type TargetObjectKeyFormat =
  | {
      readonly SimplePrefix: {
        readonly [x: string]: never;
      };
    }
  | {
      readonly PartitionedPrefix: PartitionedPrefix;
    };

const TargetObjectKeyFormat = Schema.Union(
  [
    Schema.Struct({
      SimplePrefix: Schema.Record(Schema.String, Schema.Never).annotate({
        description:
          "This format defaults the prefix to the given log file prefix for delivering server access log file.",
      }),
    }).annotate({
      description:
        "Describes the key format for server access log file in the target bucket. You can choose between SimplePrefix and PartitionedPrefix.",
    }),
    Schema.Struct({ PartitionedPrefix: PartitionedPrefix }).annotate({
      description:
        "Describes the key format for server access log file in the target bucket. You can choose between SimplePrefix and PartitionedPrefix.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "TargetObjectKeyFormat" });

interface MetadataTableConfiguration {
  readonly S3TablesDestination: S3TablesDestination;
}

const MetadataTableConfiguration = Schema.Struct({
  S3TablesDestination: S3TablesDestination,
}).annotate({
  description:
    "We recommend that you create your S3 Metadata configurations by using the V2 [MetadataConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-s3-bucket-metadataconfiguration.html) resource type. We no longer recommend using the V1 ``MetadataTableConfiguration`` resource type. \n If you created your S3 Metadata configuration before July 15, 2025, we recommend that you delete and re-create your configuration by using the [MetadataConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-s3-bucket-metadataconfiguration.html) resource type so that you can expire journal table records and create a live inventory table.\n  Creates a V1 S3 Metadata configuration for a general purpose bucket. For more information, see [Accelerating data discovery with S3 Metadata](https://docs.aws.amazon.com/AmazonS3/latest/userguide/metadata-tables-overview.html) in the *Amazon S3 User Guide*.",
  identifier: "MetadataTableConfiguration",
});

interface JournalTableConfiguration {
  readonly TableName?: string;
  readonly TableArn?: string;
  readonly RecordExpiration: RecordExpiration;
  readonly EncryptionConfiguration?: MetadataTableEncryptionConfiguration;
}

const JournalTableConfiguration = Schema.Struct({
  TableName: Schema.optionalKey(
    Schema.String.annotate({ description: "The name of the journal table." }),
  ),
  TableArn: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Amazon Resource Name (ARN) for the journal table.",
    }),
  ),
  RecordExpiration: RecordExpiration,
  EncryptionConfiguration: Schema.optionalKey(
    MetadataTableEncryptionConfiguration,
  ),
}).annotate({
  description:
    "The journal table configuration for an S3 Metadata configuration.",
  identifier: "JournalTableConfiguration",
});

interface InventoryTableConfiguration {
  readonly TableName?: string;
  readonly TableArn?: string;
  readonly ConfigurationState: "ENABLED" | "DISABLED";
  readonly EncryptionConfiguration?: MetadataTableEncryptionConfiguration;
}

const InventoryTableConfiguration = Schema.Struct({
  TableName: Schema.optionalKey(
    Schema.String.annotate({ description: "The name of the inventory table." }),
  ),
  TableArn: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Amazon Resource Name (ARN) for the inventory table.",
    }),
  ),
  ConfigurationState: Schema.Literals(["ENABLED", "DISABLED"]).annotate({
    description:
      "The configuration state of the inventory table, indicating whether the inventory table is enabled or disabled.",
  }),
  EncryptionConfiguration: Schema.optionalKey(
    MetadataTableEncryptionConfiguration,
  ),
}).annotate({
  description:
    "The inventory table configuration for an S3 Metadata configuration.",
  identifier: "InventoryTableConfiguration",
});

interface AnnotationTableConfiguration {
  readonly TableName?: string;
  readonly TableArn?: string;
  readonly ConfigurationState: "ENABLED" | "DISABLED";
  readonly EncryptionConfiguration?: MetadataTableEncryptionConfiguration;
  readonly Role?: string;
}

const AnnotationTableConfiguration = Schema.Struct({
  TableName: Schema.optionalKey(
    Schema.String.annotate({
      description: "The name of the annotation table.",
    }),
  ),
  TableArn: Schema.optionalKey(
    Schema.String.annotate({ description: "The ARN of the annotation table." }),
  ),
  ConfigurationState: Schema.Literals(["ENABLED", "DISABLED"]).annotate({
    description:
      "Specifies whether annotation table configuration is enabled or disabled.",
  }),
  EncryptionConfiguration: Schema.optionalKey(
    MetadataTableEncryptionConfiguration,
  ),
  Role: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ARN of the IAM role that grants Amazon S3 Metadata permission to read annotations from your bucket.",
    }),
  ),
}).annotate({ description: "", identifier: "AnnotationTableConfiguration" });

interface S3KeyFilter {
  readonly Rules: ReadonlyArray<FilterRule>;
}

const S3KeyFilter = Schema.Struct({
  Rules: Schema.Array(FilterRule)
    .annotate({
      description:
        "A list of containers for the key-value pair that defines the criteria for the filter rule.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
}).annotate({
  description:
    "A container for object key name prefix and suffix filtering rules. For more information about object key name filtering, see [Configuring event notifications using object key name filtering](https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-filtering.html) in the *Amazon S3 User Guide*.\n  The same type of filter rule cannot be used more than once. For example, you cannot specify two prefix rules.",
  identifier: "S3KeyFilter",
});

interface ObjectLockRule {
  readonly DefaultRetention?: DefaultRetention;
}

const ObjectLockRule = Schema.Struct({
  DefaultRetention: Schema.optionalKey(DefaultRetention),
}).annotate({
  description:
    "Specifies the Object Lock rule for the specified object. Enable the this rule when you apply ``ObjectLockConfiguration`` to a bucket.",
  identifier: "ObjectLockRule",
});

interface OwnershipControls {
  readonly Rules: ReadonlyArray<OwnershipControlsRule>;
}

const OwnershipControls = Schema.Struct({
  Rules: Schema.Array(OwnershipControlsRule)
    .annotate({
      description:
        "Specifies the container element for Object Ownership rules.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
}).annotate({
  description:
    "Specifies the container element for Object Ownership rules.\n S3 Object Ownership is an Amazon S3 bucket-level setting that you can use to disable access control lists (ACLs) and take ownership of every object in your bucket, simplifying access management for data stored in Amazon S3. For more information, see [Controlling ownership of objects and disabling ACLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html) in the *Amazon S3 User Guide*.",
  identifier: "OwnershipControls",
});

interface Metrics {
  readonly EventThreshold?: ReplicationTimeValue;
  readonly Status: "Disabled" | "Enabled";
}

const Metrics = Schema.Struct({
  EventThreshold: Schema.optionalKey(ReplicationTimeValue),
  Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
    description: "Specifies whether the replication metrics are enabled.",
  }),
}).annotate({
  description:
    "A container specifying replication metrics-related settings enabling replication metrics and events.",
  identifier: "Metrics",
});

interface ReplicationTime {
  readonly Status: "Disabled" | "Enabled";
  readonly Time: ReplicationTimeValue;
}

const ReplicationTime = Schema.Struct({
  Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
    description: "Specifies whether the replication time is enabled.",
  }),
  Time: ReplicationTimeValue,
}).annotate({
  description:
    "A container specifying S3 Replication Time Control (S3 RTC) related information, including whether S3 RTC is enabled and the time when all objects and operations on objects must be replicated. Must be specified together with a ``Metrics`` block.",
  identifier: "ReplicationTime",
});

interface SourceSelectionCriteria {
  readonly ReplicaModifications?: ReplicaModifications;
  readonly SseKmsEncryptedObjects?: SseKmsEncryptedObjects;
}

const SourceSelectionCriteria = Schema.Struct({
  ReplicaModifications: Schema.optionalKey(ReplicaModifications),
  SseKmsEncryptedObjects: Schema.optionalKey(SseKmsEncryptedObjects),
}).annotate({
  description:
    "A container that describes additional filters for identifying the source objects that you want to replicate. You can choose to enable or disable the replication of these objects.",
  identifier: "SourceSelectionCriteria",
});

interface RoutingRule {
  readonly RedirectRule: RedirectRule;
  readonly RoutingRuleCondition?: RoutingRuleCondition;
}

const RoutingRule = Schema.Struct({
  RedirectRule: RedirectRule,
  RoutingRuleCondition: Schema.optionalKey(RoutingRuleCondition),
}).annotate({
  description:
    "Specifies the redirect behavior and when a redirect is applied. For more information about routing rules, see [Configuring advanced conditional redirects](https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-page-redirect.html#advanced-conditional-redirects) in the *Amazon S3 User Guide*.",
  identifier: "RoutingRule",
});

interface DataExport_1 {
  readonly Destination: Destination_2;
  readonly OutputSchemaVersion: "V_1";
}

const DataExport_1 = Schema.Struct({
  Destination: Destination_2,
  OutputSchemaVersion: Schema.Literal("V_1").annotate({
    description:
      "The version of the output schema to use when exporting data. Must be ``V_1``.",
  }),
}).annotate({
  description:
    "Specifies how data related to the storage class analysis for an Amazon S3 bucket should be exported.",
  identifier: "DataExport_1",
});

interface InventoryConfiguration_1 {
  readonly Destination: Destination_2;
  readonly Enabled: boolean;
  readonly Id: string;
  readonly IncludedObjectVersions: "All" | "Current";
  readonly OptionalFields?: ReadonlyArray<
    | "Size"
    | "LastModifiedDate"
    | "StorageClass"
    | "ETag"
    | "IsMultipartUploaded"
    | "ReplicationStatus"
    | "EncryptionStatus"
    | "ObjectLockRetainUntilDate"
    | "ObjectLockMode"
    | "ObjectLockLegalHoldStatus"
    | "IntelligentTieringAccessTier"
    | "BucketKeyStatus"
    | "ChecksumAlgorithm"
    | "ObjectAccessControlList"
    | "ObjectOwner"
    | "LifecycleExpirationDate"
  >;
  readonly Prefix?: string;
  readonly ScheduleFrequency: "Daily" | "Weekly";
}

const InventoryConfiguration_1 = Schema.Struct({
  Destination: Destination_2,
  Enabled: Schema.Boolean.annotate({
    description:
      "Specifies whether the inventory is enabled or disabled. If set to ``True``, an inventory list is generated. If set to ``False``, no inventory list is generated.",
  }),
  Id: Schema.String.annotate({
    description: "The ID used to identify the inventory configuration.",
  }),
  IncludedObjectVersions: Schema.Literals(["All", "Current"]).annotate({
    description:
      "Object versions to include in the inventory list. If set to ``All``, the list includes all the object versions, which adds the version-related fields ``VersionId``, ``IsLatest``, and ``DeleteMarker`` to the list. If set to ``Current``, the list does not contain these version-related fields.",
  }),
  OptionalFields: Schema.optionalKey(
    Schema.Array(
      Schema.Literals([
        "Size",
        "LastModifiedDate",
        "StorageClass",
        "ETag",
        "IsMultipartUploaded",
        "ReplicationStatus",
        "EncryptionStatus",
        "ObjectLockRetainUntilDate",
        "ObjectLockMode",
        "ObjectLockLegalHoldStatus",
        "IntelligentTieringAccessTier",
        "BucketKeyStatus",
        "ChecksumAlgorithm",
        "ObjectAccessControlList",
        "ObjectOwner",
        "LifecycleExpirationDate",
      ]),
    )
      .annotate({
        description:
          "Contains the optional fields that are included in the inventory results.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description: "Specifies the inventory filter prefix.",
    }),
  ),
  ScheduleFrequency: Schema.Literals(["Daily", "Weekly"]).annotate({
    description: "Specifies the schedule for generating inventory results.",
  }),
}).annotate({
  description:
    "Specifies the S3 Inventory configuration for an Amazon S3 bucket. For more information, see [GET Bucket inventory](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGETInventoryConfig.html) in the *Amazon S3 API Reference*.",
  identifier: "InventoryConfiguration_1",
});

interface ReplicationRuleFilter {
  readonly And?: ReplicationRuleAndOperator;
  readonly Prefix?: string;
  readonly TagFilter?: TagFilter;
}

const ReplicationRuleFilter = Schema.Struct({
  And: Schema.optionalKey(ReplicationRuleAndOperator),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An object key name prefix that identifies the subset of objects to which the rule applies.\n  Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see [XML related object key constraints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints).",
    }),
  ),
  TagFilter: Schema.optionalKey(TagFilter),
}).annotate({
  description:
    "A filter that identifies the subset of objects to which the replication rule applies. A ``Filter`` must specify exactly one ``Prefix``, ``TagFilter``, or an ``And`` child element.",
  identifier: "ReplicationRuleFilter",
});

interface StorageClassAnalysis {
  readonly DataExport?: DataExport;
}

const StorageClassAnalysis = Schema.Struct({
  DataExport: Schema.optionalKey(DataExport),
}).annotate({
  description:
    "Specifies data related to access patterns to be collected and made available to analyze the tradeoffs between different storage classes for an Amazon S3 bucket.",
  identifier: "StorageClassAnalysis",
});

interface ServerSideEncryptionRule {
  readonly BucketKeyEnabled?: boolean;
  readonly ServerSideEncryptionByDefault?: ServerSideEncryptionByDefault;
  readonly BlockedEncryptionTypes?: BlockedEncryptionTypes;
}

const ServerSideEncryptionRule = Schema.Struct({
  BucketKeyEnabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether Amazon S3 should use an S3 Bucket Key with server-side encryption using KMS (SSE-KMS) for new objects in the bucket. Existing objects are not affected. Setting the ``BucketKeyEnabled`` element to ``true`` causes Amazon S3 to use an S3 Bucket Key. By default, S3 Bucket Key is not enabled.\n For more information, see [Amazon S3 Bucket Keys](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html) in the *Amazon S3 User Guide*.",
    }),
  ),
  ServerSideEncryptionByDefault: Schema.optionalKey(
    ServerSideEncryptionByDefault,
  ),
  BlockedEncryptionTypes: Schema.optionalKey(BlockedEncryptionTypes),
}).annotate({
  description:
    "Specifies the default server-side encryption configuration.\n   +  *General purpose buckets* - If you're specifying a customer managed KMS key, we recommend using a fully qualified KMS key ARN. If you use a KMS key alias instead, then KMS resolves the key within the requester’s account. This behavior can result in data that's encrypted with a KMS key that belongs to the requester, and not the bucket owner.\n  +  *Directory buckets* - When you specify an [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) for encryption in your directory bucket, only use the key ID or key ARN. The key alias format of the KMS key isn't supported.",
  identifier: "ServerSideEncryptionRule",
});

interface ServerSideEncryptionRule_1 {
  readonly BucketKeyEnabled?: boolean;
  readonly ServerSideEncryptionByDefault?: ServerSideEncryptionByDefault_1;
  readonly BlockedEncryptionTypes?: BlockedEncryptionTypes;
}

const ServerSideEncryptionRule_1 = Schema.Struct({
  BucketKeyEnabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether Amazon S3 should use an S3 Bucket Key with server-side encryption using KMS (SSE-KMS) for new objects in the bucket. Existing objects are not affected. Setting the ``BucketKeyEnabled`` element to ``true`` causes Amazon S3 to use an S3 Bucket Key. By default, S3 Bucket Key is not enabled.\n For more information, see [Amazon S3 Bucket Keys](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html) in the *Amazon S3 User Guide*.",
    }),
  ),
  ServerSideEncryptionByDefault: Schema.optionalKey(
    ServerSideEncryptionByDefault_1,
  ),
  BlockedEncryptionTypes: Schema.optionalKey(BlockedEncryptionTypes),
}).annotate({
  description:
    "Specifies the default server-side encryption configuration.\n   +  *General purpose buckets* - If you're specifying a customer managed KMS key, we recommend using a fully qualified KMS key ARN. If you use a KMS key alias instead, then KMS resolves the key within the requester’s account. This behavior can result in data that's encrypted with a KMS key that belongs to the requester, and not the bucket owner.\n  +  *Directory buckets* - When you specify an [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) for encryption in your directory bucket, only use the key ID or key ARN. The key alias format of the KMS key isn't supported.",
  identifier: "ServerSideEncryptionRule_1",
});

interface Rule {
  readonly AbortIncompleteMultipartUpload?: AbortIncompleteMultipartUpload;
  readonly ExpirationDate?: Iso8601UTC;
  readonly ExpirationInDays?: number;
  readonly ExpiredObjectDeleteMarker?: boolean;
  readonly Id?: string;
  readonly NoncurrentVersionExpirationInDays?: number;
  readonly NoncurrentVersionExpiration?: NoncurrentVersionExpiration;
  readonly NoncurrentVersionTransition?: NoncurrentVersionTransition;
  readonly NoncurrentVersionTransitions?: ReadonlyArray<NoncurrentVersionTransition>;
  readonly Prefix?: string;
  readonly Status: "Enabled" | "Disabled";
  readonly TagFilters?: ReadonlyArray<TagFilter>;
  readonly ObjectSizeGreaterThan?: string;
  readonly ObjectSizeLessThan?: string;
  readonly Transition?: Transition;
  readonly Transitions?: ReadonlyArray<Transition>;
}

const Rule = Schema.Struct({
  AbortIncompleteMultipartUpload: Schema.optionalKey(
    AbortIncompleteMultipartUpload,
  ),
  ExpirationDate: Schema.optionalKey(Iso8601UTC),
  ExpirationInDays: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Indicates the number of days after creation when objects are deleted from Amazon S3 and Amazon S3 Glacier. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  ExpiredObjectDeleteMarker: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Indicates whether Amazon S3 will remove a delete marker without any noncurrent versions. If set to true, the delete marker will be removed if there are no noncurrent versions. This cannot be specified with ``ExpirationInDays``, ``ExpirationDate``, or ``TagFilters``.",
    }),
  ),
  Id: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Unique identifier for the rule. The value can't be longer than 255 characters.",
    }).check(
      Schema.isMaxCodePoints(255).annotate({
        expected: "a string with at most 255 code points",
      }),
    ),
  ),
  NoncurrentVersionExpirationInDays: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "(Deprecated.) For buckets with versioning enabled (or suspended), specifies the time, in days, between when a new version of the object is uploaded to the bucket and when old versions of the object expire. When object versions expire, Amazon S3 permanently deletes them. If you specify a transition and expiration time, the expiration time must be later than the transition time.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  NoncurrentVersionExpiration: Schema.optionalKey(NoncurrentVersionExpiration),
  NoncurrentVersionTransition: Schema.optionalKey(NoncurrentVersionTransition),
  NoncurrentVersionTransitions: Schema.optionalKey(
    Schema.Array(NoncurrentVersionTransition)
      .annotate({
        description:
          "For buckets with versioning enabled (or suspended), one or more transition rules that specify when non-current objects transition to a specified storage class. If you specify a transition and expiration time, the expiration time must be later than the transition time. If you specify this property, don't specify the ``NoncurrentVersionTransition`` property.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Object key prefix that identifies one or more objects to which this rule applies.\n  Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see [XML related object key constraints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints).",
    }),
  ),
  Status: Schema.Literals(["Enabled", "Disabled"]).annotate({
    description:
      "If ``Enabled``, the rule is currently being applied. If ``Disabled``, the rule is not currently being applied.",
  }),
  TagFilters: Schema.optionalKey(
    Schema.Array(TagFilter)
      .annotate({
        description:
          "Tags to use to identify a subset of objects to which the lifecycle rule applies.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  ObjectSizeGreaterThan: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Specifies the minimum object size in bytes for this rule to apply to. Objects must be larger than this value in bytes. For more information about size based rules, see [Lifecycle configuration using size-based rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html#lc-size-rules) in the *Amazon S3 User Guide*.",
    })
      .check(
        Schema.isMaxCodePoints(20).annotate({
          expected: "a string with at most 20 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("[0-9]+", "u")).annotate({
          expected: "a string matching the RegExp [0-9]+",
        }),
      ),
  ),
  ObjectSizeLessThan: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Specifies the maximum object size in bytes for this rule to apply to. Objects must be smaller than this value in bytes. For more information about sized based rules, see [Lifecycle configuration using size-based rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html#lc-size-rules) in the *Amazon S3 User Guide*.",
    })
      .check(
        Schema.isMaxCodePoints(20).annotate({
          expected: "a string with at most 20 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("[0-9]+", "u")).annotate({
          expected: "a string matching the RegExp [0-9]+",
        }),
      ),
  ),
  Transition: Schema.optionalKey(Transition),
  Transitions: Schema.optionalKey(
    Schema.Array(Transition)
      .annotate({
        description:
          "One or more transition rules that specify when an object transitions to a specified storage class. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time. If you specify this property, don't specify the ``Transition`` property.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
}).annotate({
  description:
    "Specifies lifecycle rules for an Amazon S3 bucket. For more information, see [Put Bucket Lifecycle Configuration](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTlifecycle.html) in the *Amazon S3 API Reference*.\n You must specify at least one of the following properties: ``AbortIncompleteMultipartUpload``, ``ExpirationDate``, ``ExpirationInDays``, ``NoncurrentVersionExpirationInDays``, ``NoncurrentVersionTransition``, ``NoncurrentVersionTransitions``, ``Transition``, or ``Transitions``.",
  identifier: "Rule",
});

interface LoggingConfiguration {
  readonly DestinationBucketName?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "s3";
        readonly resource: "bucket";
      }>
    | string;
  readonly LogFilePrefix?: string;
  readonly TargetObjectKeyFormat?: TargetObjectKeyFormat;
}

const LoggingConfiguration = Schema.Struct({
  DestinationBucketName: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("aws"),
            service: Schema.Literal("s3"),
            resource: Schema.Literal("bucket"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["BucketName"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      Schema.String.annotate({
        description:
          "The name of the bucket where Amazon S3 should store server access log files. You can store log files in any bucket that you own. By default, logs are stored in the bucket where the ``LoggingConfiguration`` property is defined.",
      }),
    ]),
  ),
  LogFilePrefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A prefix for all log object keys. If you store log files from multiple Amazon S3 buckets in a single bucket, you can use a prefix to distinguish which log files came from which bucket.",
    }),
  ),
  TargetObjectKeyFormat: Schema.optionalKey(TargetObjectKeyFormat),
}).annotate({
  description:
    "Describes where logs are stored and the prefix that Amazon S3 assigns to all log object keys for a bucket. For examples and more information, see [PUT Bucket logging](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTlogging.html) in the *Amazon S3 API Reference*.\n  To successfully complete the ``AWS::S3::Bucket LoggingConfiguration`` request, you must have ``s3:PutObject`` and ``s3:PutObjectAcl`` in your IAM permissions.",
  identifier: "LoggingConfiguration",
});

interface LoggingConfiguration_1 {
  readonly DestinationBucketName?: string;
  readonly LogFilePrefix?: string;
  readonly TargetObjectKeyFormat?: TargetObjectKeyFormat;
}

const LoggingConfiguration_1 = Schema.Struct({
  DestinationBucketName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the bucket where Amazon S3 should store server access log files. You can store log files in any bucket that you own. By default, logs are stored in the bucket where the ``LoggingConfiguration`` property is defined.",
    }),
  ),
  LogFilePrefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A prefix for all log object keys. If you store log files from multiple Amazon S3 buckets in a single bucket, you can use a prefix to distinguish which log files came from which bucket.",
    }),
  ),
  TargetObjectKeyFormat: Schema.optionalKey(TargetObjectKeyFormat),
}).annotate({
  description:
    "Describes where logs are stored and the prefix that Amazon S3 assigns to all log object keys for a bucket. For examples and more information, see [PUT Bucket logging](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTlogging.html) in the *Amazon S3 API Reference*.\n  To successfully complete the ``AWS::S3::Bucket LoggingConfiguration`` request, you must have ``s3:PutObject`` and ``s3:PutObjectAcl`` in your IAM permissions.",
  identifier: "LoggingConfiguration_1",
});

interface MetadataConfiguration {
  readonly Destination?: MetadataDestination;
  readonly JournalTableConfiguration: JournalTableConfiguration;
  readonly InventoryTableConfiguration?: InventoryTableConfiguration;
  readonly AnnotationTableConfiguration?: AnnotationTableConfiguration;
}

const MetadataConfiguration = Schema.Struct({
  Destination: Schema.optionalKey(MetadataDestination),
  JournalTableConfiguration: JournalTableConfiguration,
  InventoryTableConfiguration: Schema.optionalKey(InventoryTableConfiguration),
  AnnotationTableConfiguration: Schema.optionalKey(
    AnnotationTableConfiguration,
  ),
}).annotate({
  description:
    "Creates a V2 S3 Metadata configuration of a general purpose bucket. For more information, see [Accelerating data discovery with S3 Metadata](https://docs.aws.amazon.com/AmazonS3/latest/userguide/metadata-tables-overview.html) in the *Amazon S3 User Guide*.",
  identifier: "MetadataConfiguration",
});

interface NotificationFilter {
  readonly S3Key: S3KeyFilter;
}

const NotificationFilter = Schema.Struct({ S3Key: S3KeyFilter }).annotate({
  description:
    "Specifies object key name filtering rules. For information about key name filtering, see [Configuring event notifications using object key name filtering](https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-filtering.html) in the *Amazon S3 User Guide*.",
  identifier: "NotificationFilter",
});

interface ObjectLockConfiguration {
  readonly ObjectLockEnabled?: "Enabled";
  readonly Rule?: ObjectLockRule;
}

const ObjectLockConfiguration = Schema.Struct({
  ObjectLockEnabled: Schema.optionalKey(
    Schema.Literal("Enabled").annotate({
      description:
        "Indicates whether this bucket has an Object Lock configuration enabled. Enable ``ObjectLockEnabled`` when you apply ``ObjectLockConfiguration`` to a bucket.",
    }),
  ),
  Rule: Schema.optionalKey(ObjectLockRule),
}).annotate({
  description:
    "Places an Object Lock configuration on the specified bucket. The rule specified in the Object Lock configuration will be applied by default to every new object placed in the specified bucket. For more information, see [Locking Objects](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html).",
  identifier: "ObjectLockConfiguration",
});

interface ReplicationDestination {
  readonly AccessControlTranslation?: AccessControlTranslation;
  readonly Account?: string;
  readonly Bucket:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "s3";
        readonly resource: "bucket";
      }>
    | string;
  readonly EncryptionConfiguration?: EncryptionConfiguration;
  readonly Metrics?: Metrics;
  readonly ReplicationTime?: ReplicationTime;
  readonly StorageClass?:
    | "DEEP_ARCHIVE"
    | "GLACIER"
    | "GLACIER_IR"
    | "INTELLIGENT_TIERING"
    | "ONEZONE_IA"
    | "REDUCED_REDUNDANCY"
    | "STANDARD"
    | "STANDARD_IA";
}

const ReplicationDestination = Schema.Struct({
  AccessControlTranslation: Schema.optionalKey(AccessControlTranslation),
  Account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Destination bucket owner account ID. In a cross-account scenario, if you direct Amazon S3 to change replica ownership to the AWS-account that owns the destination bucket by specifying the ``AccessControlTranslation`` property, this is the account ID of the destination bucket owner. For more information, see [Cross-Region Replication Additional Configuration: Change Replica Owner](https://docs.aws.amazon.com/AmazonS3/latest/dev/crr-change-owner.html) in the *Amazon S3 User Guide*.\n If you specify the ``AccessControlTranslation`` property, the ``Account`` property is required.",
    }),
  ),
  Bucket: Schema.Union([
    Schema.Union([
      ResourceReferenceSchema(
        Schema.Struct({
          provider: Schema.Literal("aws"),
          service: Schema.Literal("s3"),
          resource: Schema.Literal("bucket"),
        }),
        {
          value: null,
          outputs: [
            {
              source: ["Arn"],
              target: [],
            },
          ],
        },
      ).annotate({ expected: "ResourceEntity" }),
    ]),
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) of the bucket where you want Amazon S3 to store the results.",
    }),
  ]),
  EncryptionConfiguration: Schema.optionalKey(EncryptionConfiguration),
  Metrics: Schema.optionalKey(Metrics),
  ReplicationTime: Schema.optionalKey(ReplicationTime),
  StorageClass: Schema.optionalKey(
    Schema.Literals([
      "DEEP_ARCHIVE",
      "GLACIER",
      "GLACIER_IR",
      "INTELLIGENT_TIERING",
      "ONEZONE_IA",
      "REDUCED_REDUNDANCY",
      "STANDARD",
      "STANDARD_IA",
    ]).annotate({
      description:
        "The storage class to use when replicating objects, such as S3 Standard or reduced redundancy. By default, Amazon S3 uses the storage class of the source object to create the object replica. \n For valid values, see the ``StorageClass`` element of the [PUT Bucket replication](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTreplication.html) action in the *Amazon S3 API Reference*.\n ``FSX_OPENZFS`` is not an accepted value when replicating objects.",
    }),
  ),
}).annotate({
  description:
    "A container for information about the replication destination and its configurations including enabling the S3 Replication Time Control (S3 RTC).",
  identifier: "ReplicationDestination",
});

interface ReplicationDestination_1 {
  readonly AccessControlTranslation?: AccessControlTranslation;
  readonly Account?: string;
  readonly Bucket: string;
  readonly EncryptionConfiguration?: EncryptionConfiguration_1;
  readonly Metrics?: Metrics;
  readonly ReplicationTime?: ReplicationTime;
  readonly StorageClass?:
    | "DEEP_ARCHIVE"
    | "GLACIER"
    | "GLACIER_IR"
    | "INTELLIGENT_TIERING"
    | "ONEZONE_IA"
    | "REDUCED_REDUNDANCY"
    | "STANDARD"
    | "STANDARD_IA";
}

const ReplicationDestination_1 = Schema.Struct({
  AccessControlTranslation: Schema.optionalKey(AccessControlTranslation),
  Account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Destination bucket owner account ID. In a cross-account scenario, if you direct Amazon S3 to change replica ownership to the AWS-account that owns the destination bucket by specifying the ``AccessControlTranslation`` property, this is the account ID of the destination bucket owner. For more information, see [Cross-Region Replication Additional Configuration: Change Replica Owner](https://docs.aws.amazon.com/AmazonS3/latest/dev/crr-change-owner.html) in the *Amazon S3 User Guide*.\n If you specify the ``AccessControlTranslation`` property, the ``Account`` property is required.",
    }),
  ),
  Bucket: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the bucket where you want Amazon S3 to store the results.",
  }),
  EncryptionConfiguration: Schema.optionalKey(EncryptionConfiguration_1),
  Metrics: Schema.optionalKey(Metrics),
  ReplicationTime: Schema.optionalKey(ReplicationTime),
  StorageClass: Schema.optionalKey(
    Schema.Literals([
      "DEEP_ARCHIVE",
      "GLACIER",
      "GLACIER_IR",
      "INTELLIGENT_TIERING",
      "ONEZONE_IA",
      "REDUCED_REDUNDANCY",
      "STANDARD",
      "STANDARD_IA",
    ]).annotate({
      description:
        "The storage class to use when replicating objects, such as S3 Standard or reduced redundancy. By default, Amazon S3 uses the storage class of the source object to create the object replica. \n For valid values, see the ``StorageClass`` element of the [PUT Bucket replication](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTreplication.html) action in the *Amazon S3 API Reference*.\n ``FSX_OPENZFS`` is not an accepted value when replicating objects.",
    }),
  ),
}).annotate({
  description:
    "A container for information about the replication destination and its configurations including enabling the S3 Replication Time Control (S3 RTC).",
  identifier: "ReplicationDestination_1",
});

interface WebsiteConfiguration {
  readonly ErrorDocument?: string;
  readonly IndexDocument?: string;
  readonly RoutingRules?: ReadonlyArray<RoutingRule>;
  readonly RedirectAllRequestsTo?: RedirectAllRequestsTo;
}

const WebsiteConfiguration = Schema.Struct({
  ErrorDocument: Schema.optionalKey(
    Schema.String.annotate({
      description: "The name of the error document for the website.",
    }),
  ),
  IndexDocument: Schema.optionalKey(
    Schema.String.annotate({
      description: "The name of the index document for the website.",
    }),
  ),
  RoutingRules: Schema.optionalKey(
    Schema.Array(RoutingRule).annotate({
      description:
        "Rules that define when a redirect is applied and the redirect behavior.",
    }),
  ),
  RedirectAllRequestsTo: Schema.optionalKey(RedirectAllRequestsTo),
}).annotate({
  description:
    "Specifies website configuration parameters for an Amazon S3 bucket.",
  identifier: "WebsiteConfiguration",
});

interface StorageClassAnalysis_1 {
  readonly DataExport?: DataExport_1;
}

const StorageClassAnalysis_1 = Schema.Struct({
  DataExport: Schema.optionalKey(DataExport_1),
}).annotate({
  description:
    "Specifies data related to access patterns to be collected and made available to analyze the tradeoffs between different storage classes for an Amazon S3 bucket.",
  identifier: "StorageClassAnalysis_1",
});

interface AnalyticsConfiguration {
  readonly TagFilters?: ReadonlyArray<TagFilter>;
  readonly StorageClassAnalysis: StorageClassAnalysis;
  readonly Id: string;
  readonly Prefix?: string;
}

const AnalyticsConfiguration = Schema.Struct({
  TagFilters: Schema.optionalKey(
    Schema.Array(TagFilter)
      .annotate({
        description:
          "The tags to use when evaluating an analytics filter.\n The analytics only includes objects that meet the filter's criteria. If no filter is specified, all of the contents of the bucket are included in the analysis.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  StorageClassAnalysis: StorageClassAnalysis,
  Id: Schema.String.annotate({
    description: "The ID that identifies the analytics configuration.",
  }),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The prefix that an object must have to be included in the analytics results.",
    }),
  ),
}).annotate({
  description:
    "Specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket.",
  identifier: "AnalyticsConfiguration",
});

interface BucketEncryption {
  readonly ServerSideEncryptionConfiguration: ReadonlyArray<ServerSideEncryptionRule>;
}

const BucketEncryption = Schema.Struct({
  ServerSideEncryptionConfiguration: Schema.Array(ServerSideEncryptionRule)
    .annotate({
      description:
        "Specifies the default server-side-encryption configuration.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
}).annotate({
  description:
    "Specifies default encryption for a bucket using server-side encryption with Amazon S3-managed keys (SSE-S3), AWS KMS-managed keys (SSE-KMS), or dual-layer server-side encryption with KMS-managed keys (DSSE-KMS). For information about the Amazon S3 default encryption feature, see [Amazon S3 Default Encryption for S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html) in the *Amazon S3 User Guide*.",
  identifier: "BucketEncryption",
});

interface BucketEncryption_1 {
  readonly ServerSideEncryptionConfiguration: ReadonlyArray<ServerSideEncryptionRule_1>;
}

const BucketEncryption_1 = Schema.Struct({
  ServerSideEncryptionConfiguration: Schema.Array(ServerSideEncryptionRule_1)
    .annotate({
      description:
        "Specifies the default server-side-encryption configuration.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
}).annotate({
  description:
    "Specifies default encryption for a bucket using server-side encryption with Amazon S3-managed keys (SSE-S3), AWS KMS-managed keys (SSE-KMS), or dual-layer server-side encryption with KMS-managed keys (DSSE-KMS). For information about the Amazon S3 default encryption feature, see [Amazon S3 Default Encryption for S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html) in the *Amazon S3 User Guide*.",
  identifier: "BucketEncryption_1",
});

interface LifecycleConfiguration {
  readonly Rules: ReadonlyArray<Rule>;
  readonly TransitionDefaultMinimumObjectSize?:
    | "varies_by_storage_class"
    | "all_storage_classes_128K";
}

const LifecycleConfiguration = Schema.Struct({
  Rules: Schema.Array(Rule)
    .annotate({
      description:
        "A lifecycle rule for individual objects in an Amazon S3 bucket.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
  TransitionDefaultMinimumObjectSize: Schema.optionalKey(
    Schema.Literals([
      "varies_by_storage_class",
      "all_storage_classes_128K",
    ]).annotate({
      description:
        "Indicates which default minimum object size behavior is applied to the lifecycle configuration.\n  This parameter applies to general purpose buckets only. It isn't supported for directory bucket lifecycle configurations.\n   +  ``all_storage_classes_128K`` - Objects smaller than 128 KB will not transition to any storage class by default.\n  +  ``varies_by_storage_class`` - Objects smaller than 128 KB will transition to Glacier Flexible Retrieval or Glacier Deep Archive storage classes. By default, all other storage classes will prevent transitions smaller than 128 KB. \n  \n To customize the minimum object size for any transition you can add a filter that specifies a custom ``ObjectSizeGreaterThan`` or ``ObjectSizeLessThan`` in the body of your transition rule. Custom filters always take precedence over the default transition behavior.",
    }),
  ),
}).annotate({
  description:
    "Specifies the lifecycle configuration for objects in an Amazon S3 bucket. For more information, see [Object Lifecycle Management](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html) in the *Amazon S3 User Guide*.",
  identifier: "LifecycleConfiguration",
});

interface LambdaConfiguration {
  readonly Event: string;
  readonly Filter?: NotificationFilter;
  readonly Function:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "lambda";
        readonly resource: "function";
      }>
    | string;
}

const LambdaConfiguration = Schema.Struct({
  Event: Schema.String.annotate({
    description:
      "The Amazon S3 bucket event for which to invoke the LAMlong function. For more information, see [Supported Event Types](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }),
  Filter: Schema.optionalKey(NotificationFilter),
  Function: Schema.Union([
    Schema.Union([
      ResourceReferenceSchema(
        Schema.Struct({
          provider: Schema.Literal("aws"),
          service: Schema.Literal("lambda"),
          resource: Schema.Literal("function"),
        }),
        {
          value: null,
          outputs: [
            {
              source: ["Arn"],
              target: [],
            },
          ],
        },
      ).annotate({ expected: "ResourceEntity" }),
    ]),
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) of the LAMlong function that Amazon S3 invokes when the specified event type occurs.",
    }),
  ]),
}).annotate({
  description:
    "Describes the LAMlong functions to invoke and the events for which to invoke them.",
  identifier: "LambdaConfiguration",
});

interface QueueConfiguration {
  readonly Event: string;
  readonly Filter?: NotificationFilter;
  readonly Queue:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "sqs";
        readonly resource: "queue";
      }>
    | string;
}

const QueueConfiguration = Schema.Struct({
  Event: Schema.String.annotate({
    description:
      "The Amazon S3 bucket event about which you want to publish messages to Amazon SQS. For more information, see [Supported Event Types](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }),
  Filter: Schema.optionalKey(NotificationFilter),
  Queue: Schema.Union([
    Schema.Union([
      ResourceReferenceSchema(
        Schema.Struct({
          provider: Schema.Literal("aws"),
          service: Schema.Literal("sqs"),
          resource: Schema.Literal("queue"),
        }),
        {
          value: null,
          outputs: [
            {
              source: ["Arn"],
              target: [],
            },
          ],
        },
      ).annotate({ expected: "ResourceEntity" }),
    ]),
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) of the Amazon SQS queue to which Amazon S3 publishes a message when it detects events of the specified type. FIFO queues are not allowed when enabling an SQS queue as the event notification destination.",
    }),
  ]),
}).annotate({
  description:
    "Specifies the configuration for publishing messages to an Amazon Simple Queue Service (Amazon SQS) queue when Amazon S3 detects specified events.",
  identifier: "QueueConfiguration",
});

interface TopicConfiguration {
  readonly Event: string;
  readonly Filter?: NotificationFilter;
  readonly Topic:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "sns";
        readonly resource: "topic";
      }>
    | string;
}

const TopicConfiguration = Schema.Struct({
  Event: Schema.String.annotate({
    description:
      "The Amazon S3 bucket event about which to send notifications. For more information, see [Supported Event Types](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }),
  Filter: Schema.optionalKey(NotificationFilter),
  Topic: Schema.Union([
    Schema.Union([
      ResourceReferenceSchema(
        Schema.Struct({
          provider: Schema.Literal("aws"),
          service: Schema.Literal("sns"),
          resource: Schema.Literal("topic"),
        }),
        {
          value: null,
          outputs: [
            {
              source: ["TopicArn"],
              target: [],
            },
          ],
        },
      ).annotate({ expected: "ResourceEntity" }),
    ]),
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) of the Amazon SNS topic to which Amazon S3 publishes a message when it detects events of the specified type.",
    }),
  ]),
}).annotate({
  description:
    "A container for specifying the configuration for publication of messages to an Amazon Simple Notification Service (Amazon SNS) topic when Amazon S3 detects specified events.",
  identifier: "TopicConfiguration",
});

interface LambdaConfiguration_1 {
  readonly Event: string;
  readonly Filter?: NotificationFilter;
  readonly Function: string;
}

const LambdaConfiguration_1 = Schema.Struct({
  Event: Schema.String.annotate({
    description:
      "The Amazon S3 bucket event for which to invoke the LAMlong function. For more information, see [Supported Event Types](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }),
  Filter: Schema.optionalKey(NotificationFilter),
  Function: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the LAMlong function that Amazon S3 invokes when the specified event type occurs.",
  }),
}).annotate({
  description:
    "Describes the LAMlong functions to invoke and the events for which to invoke them.",
  identifier: "LambdaConfiguration_1",
});

interface QueueConfiguration_1 {
  readonly Event: string;
  readonly Filter?: NotificationFilter;
  readonly Queue: string;
}

const QueueConfiguration_1 = Schema.Struct({
  Event: Schema.String.annotate({
    description:
      "The Amazon S3 bucket event about which you want to publish messages to Amazon SQS. For more information, see [Supported Event Types](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }),
  Filter: Schema.optionalKey(NotificationFilter),
  Queue: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the Amazon SQS queue to which Amazon S3 publishes a message when it detects events of the specified type. FIFO queues are not allowed when enabling an SQS queue as the event notification destination.",
  }),
}).annotate({
  description:
    "Specifies the configuration for publishing messages to an Amazon Simple Queue Service (Amazon SQS) queue when Amazon S3 detects specified events.",
  identifier: "QueueConfiguration_1",
});

interface TopicConfiguration_1 {
  readonly Event: string;
  readonly Filter?: NotificationFilter;
  readonly Topic: string;
}

const TopicConfiguration_1 = Schema.Struct({
  Event: Schema.String.annotate({
    description:
      "The Amazon S3 bucket event about which to send notifications. For more information, see [Supported Event Types](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }),
  Filter: Schema.optionalKey(NotificationFilter),
  Topic: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the Amazon SNS topic to which Amazon S3 publishes a message when it detects events of the specified type.",
  }),
}).annotate({
  description:
    "A container for specifying the configuration for publication of messages to an Amazon Simple Notification Service (Amazon SNS) topic when Amazon S3 detects specified events.",
  identifier: "TopicConfiguration_1",
});

interface ReplicationRule {
  readonly DeleteMarkerReplication?: DeleteMarkerReplication;
  readonly Destination: ReplicationDestination;
  readonly Filter?: ReplicationRuleFilter;
  readonly Id?: string;
  readonly Prefix?: string;
  readonly Priority?: number;
  readonly SourceSelectionCriteria?: SourceSelectionCriteria;
  readonly Status: "Disabled" | "Enabled";
}

const ReplicationRule = Schema.Struct({
  DeleteMarkerReplication: Schema.optionalKey(DeleteMarkerReplication),
  Destination: ReplicationDestination,
  Filter: Schema.optionalKey(ReplicationRuleFilter),
  Id: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'A unique identifier for the rule. The maximum value is 255 characters. If you don\'t specify a value, AWS CloudFormation generates a random ID. When using a V2 replication configuration this property is capitalized as "ID".',
    }).check(
      Schema.isMaxCodePoints(255).annotate({
        expected: "a string with at most 255 code points",
      }),
    ),
  ),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An object key name prefix that identifies the object or objects to which the rule applies. The maximum prefix length is 1,024 characters. To include all objects in a bucket, specify an empty string. To filter using a V1 replication configuration, add the ``Prefix`` directly as a child element of the ``Rule`` element.\n  Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see [XML related object key constraints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints).",
    }).check(
      Schema.isMaxCodePoints(1024).annotate({
        expected: "a string with at most 1024 code points",
      }),
    ),
  ),
  Priority: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The priority indicates which rule has precedence whenever two or more replication rules conflict. Amazon S3 will attempt to replicate objects according to all replication rules. However, if there are two or more rules with the same destination bucket, then objects will be replicated according to the rule with the highest priority. The higher the number, the higher the priority. \n For more information, see [Replication](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication.html) in the *Amazon S3 User Guide*.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  SourceSelectionCriteria: Schema.optionalKey(SourceSelectionCriteria),
  Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
    description: "Specifies whether the rule is enabled.",
  }),
}).annotate({
  description:
    "Specifies which Amazon S3 objects to replicate and where to store the replicas.",
  identifier: "ReplicationRule",
});

interface ReplicationRule_1 {
  readonly DeleteMarkerReplication?: DeleteMarkerReplication;
  readonly Destination: ReplicationDestination_1;
  readonly Filter?: ReplicationRuleFilter;
  readonly Id?: string;
  readonly Prefix?: string;
  readonly Priority?: number;
  readonly SourceSelectionCriteria?: SourceSelectionCriteria;
  readonly Status: "Disabled" | "Enabled";
}

const ReplicationRule_1 = Schema.Struct({
  DeleteMarkerReplication: Schema.optionalKey(DeleteMarkerReplication),
  Destination: ReplicationDestination_1,
  Filter: Schema.optionalKey(ReplicationRuleFilter),
  Id: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'A unique identifier for the rule. The maximum value is 255 characters. If you don\'t specify a value, AWS CloudFormation generates a random ID. When using a V2 replication configuration this property is capitalized as "ID".',
    }).check(
      Schema.isMaxCodePoints(255).annotate({
        expected: "a string with at most 255 code points",
      }),
    ),
  ),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An object key name prefix that identifies the object or objects to which the rule applies. The maximum prefix length is 1,024 characters. To include all objects in a bucket, specify an empty string. To filter using a V1 replication configuration, add the ``Prefix`` directly as a child element of the ``Rule`` element.\n  Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see [XML related object key constraints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints).",
    }).check(
      Schema.isMaxCodePoints(1024).annotate({
        expected: "a string with at most 1024 code points",
      }),
    ),
  ),
  Priority: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The priority indicates which rule has precedence whenever two or more replication rules conflict. Amazon S3 will attempt to replicate objects according to all replication rules. However, if there are two or more rules with the same destination bucket, then objects will be replicated according to the rule with the highest priority. The higher the number, the higher the priority. \n For more information, see [Replication](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication.html) in the *Amazon S3 User Guide*.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  SourceSelectionCriteria: Schema.optionalKey(SourceSelectionCriteria),
  Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
    description: "Specifies whether the rule is enabled.",
  }),
}).annotate({
  description:
    "Specifies which Amazon S3 objects to replicate and where to store the replicas.",
  identifier: "ReplicationRule_1",
});

interface AnalyticsConfiguration_1 {
  readonly TagFilters?: ReadonlyArray<TagFilter>;
  readonly StorageClassAnalysis: StorageClassAnalysis_1;
  readonly Id: string;
  readonly Prefix?: string;
}

const AnalyticsConfiguration_1 = Schema.Struct({
  TagFilters: Schema.optionalKey(
    Schema.Array(TagFilter)
      .annotate({
        description:
          "The tags to use when evaluating an analytics filter.\n The analytics only includes objects that meet the filter's criteria. If no filter is specified, all of the contents of the bucket are included in the analysis.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  StorageClassAnalysis: StorageClassAnalysis_1,
  Id: Schema.String.annotate({
    description: "The ID that identifies the analytics configuration.",
  }),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The prefix that an object must have to be included in the analytics results.",
    }),
  ),
}).annotate({
  description:
    "Specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket.",
  identifier: "AnalyticsConfiguration_1",
});

interface NotificationConfiguration {
  readonly EventBridgeConfiguration?: EventBridgeConfiguration;
  readonly LambdaConfigurations?: ReadonlyArray<LambdaConfiguration>;
  readonly QueueConfigurations?: ReadonlyArray<QueueConfiguration>;
  readonly TopicConfigurations?: ReadonlyArray<TopicConfiguration>;
}

const NotificationConfiguration = Schema.Struct({
  EventBridgeConfiguration: Schema.optionalKey(EventBridgeConfiguration),
  LambdaConfigurations: Schema.optionalKey(
    Schema.Array(LambdaConfiguration)
      .annotate({
        description:
          "Describes the LAMlong functions to invoke and the events for which to invoke them.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  QueueConfigurations: Schema.optionalKey(
    Schema.Array(QueueConfiguration)
      .annotate({
        description:
          "The Amazon Simple Queue Service queues to publish messages to and the events for which to publish messages.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  TopicConfigurations: Schema.optionalKey(
    Schema.Array(TopicConfiguration)
      .annotate({
        description:
          "The topic to which notifications are sent and the events for which notifications are generated.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
}).annotate({
  description:
    "Describes the notification configuration for an Amazon S3 bucket.\n  If you create the target resource and related permissions in the same template, you might have a circular dependency.\n For example, you might use the ``AWS::Lambda::Permission`` resource to grant the bucket permission to invoke an AWS Lambda function. However, AWS CloudFormation can't create the bucket until the bucket has permission to invoke the function (AWS CloudFormation checks whether the bucket can invoke the function). If you're using Refs to pass the bucket name, this leads to a circular dependency.\n To avoid this dependency, you can create all resources without specifying the notification configuration. Then, update the stack with a notification configuration.\n For more information on permissions, see [AWS::Lambda::Permission](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-permission.html) and [Granting Permissions to Publish Event Notification Messages to a Destination](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html#grant-destinations-permissions-to-s3).",
  identifier: "NotificationConfiguration",
});

interface NotificationConfiguration_1 {
  readonly EventBridgeConfiguration?: EventBridgeConfiguration;
  readonly LambdaConfigurations?: ReadonlyArray<LambdaConfiguration_1>;
  readonly QueueConfigurations?: ReadonlyArray<QueueConfiguration_1>;
  readonly TopicConfigurations?: ReadonlyArray<TopicConfiguration_1>;
}

const NotificationConfiguration_1 = Schema.Struct({
  EventBridgeConfiguration: Schema.optionalKey(EventBridgeConfiguration),
  LambdaConfigurations: Schema.optionalKey(
    Schema.Array(LambdaConfiguration_1)
      .annotate({
        description:
          "Describes the LAMlong functions to invoke and the events for which to invoke them.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  QueueConfigurations: Schema.optionalKey(
    Schema.Array(QueueConfiguration_1)
      .annotate({
        description:
          "The Amazon Simple Queue Service queues to publish messages to and the events for which to publish messages.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  TopicConfigurations: Schema.optionalKey(
    Schema.Array(TopicConfiguration_1)
      .annotate({
        description:
          "The topic to which notifications are sent and the events for which notifications are generated.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
}).annotate({
  description:
    "Describes the notification configuration for an Amazon S3 bucket.\n  If you create the target resource and related permissions in the same template, you might have a circular dependency.\n For example, you might use the ``AWS::Lambda::Permission`` resource to grant the bucket permission to invoke an AWS Lambda function. However, AWS CloudFormation can't create the bucket until the bucket has permission to invoke the function (AWS CloudFormation checks whether the bucket can invoke the function). If you're using Refs to pass the bucket name, this leads to a circular dependency.\n To avoid this dependency, you can create all resources without specifying the notification configuration. Then, update the stack with a notification configuration.\n For more information on permissions, see [AWS::Lambda::Permission](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-permission.html) and [Granting Permissions to Publish Event Notification Messages to a Destination](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html#grant-destinations-permissions-to-s3).",
  identifier: "NotificationConfiguration_1",
});

interface ReplicationConfiguration {
  readonly Role:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "role";
      }>
    | string;
  readonly Rules: ReadonlyArray<ReplicationRule>;
}

const ReplicationConfiguration = Schema.Struct({
  Role: Schema.Union([
    Schema.Union([
      ResourceReferenceSchema(
        Schema.Struct({
          provider: Schema.Literal("aws"),
          service: Schema.Literal("iam"),
          resource: Schema.Literal("role"),
        }),
        {
          value: null,
          outputs: [
            {
              source: ["Arn"],
              target: [],
            },
          ],
        },
      ).annotate({ expected: "ResourceEntity" }),
    ]),
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) of the IAMlong (IAM) role that Amazon S3 assumes when replicating objects. For more information, see [How to Set Up Replication](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-how-setup.html) in the *Amazon S3 User Guide*.",
    }),
  ]),
  Rules: Schema.Array(ReplicationRule)
    .annotate({
      description:
        "A container for one or more replication rules. A replication configuration must have at least one rule and can contain a maximum of 1,000 rules.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
}).annotate({
  description:
    "A container for replication rules. You can add up to 1,000 rules. The maximum size of a replication configuration is 2 MB. The latest version of the replication configuration XML is V2. For more information about XML V2 replication configurations, see [Replication configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-add-config.html) in the *Amazon S3 User Guide*.",
  identifier: "ReplicationConfiguration",
});

interface ReplicationConfiguration_1 {
  readonly Role: string;
  readonly Rules: ReadonlyArray<ReplicationRule_1>;
}

const ReplicationConfiguration_1 = Schema.Struct({
  Role: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the IAMlong (IAM) role that Amazon S3 assumes when replicating objects. For more information, see [How to Set Up Replication](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-how-setup.html) in the *Amazon S3 User Guide*.",
  }),
  Rules: Schema.Array(ReplicationRule_1)
    .annotate({
      description:
        "A container for one or more replication rules. A replication configuration must have at least one rule and can contain a maximum of 1,000 rules.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
}).annotate({
  description:
    "A container for replication rules. You can add up to 1,000 rules. The maximum size of a replication configuration is 2 MB. The latest version of the replication configuration XML is V2. For more information about XML V2 replication configurations, see [Replication configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-add-config.html) in the *Amazon S3 User Guide*.",
  identifier: "ReplicationConfiguration_1",
});

export interface AWSBucketProps {
  readonly AccelerateConfiguration?: AccelerateConfiguration;
  readonly AccessControl?:
    | "AuthenticatedRead"
    | "AwsExecRead"
    | "BucketOwnerFullControl"
    | "BucketOwnerRead"
    | "LogDeliveryWrite"
    | "Private"
    | "PublicRead"
    | "PublicReadWrite";
  readonly AnalyticsConfigurations?: ReadonlyArray<AnalyticsConfiguration>;
  readonly BucketEncryption?: BucketEncryption;
  readonly BucketName?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "s3";
        readonly resource: "bucketpolicy";
      }>
    | string;
  readonly BucketNamePrefix?: string;
  readonly BucketNamespace?: "global" | "account-regional";
  readonly CorsConfiguration?: CorsConfiguration;
  readonly IntelligentTieringConfigurations?: ReadonlyArray<IntelligentTieringConfiguration>;
  readonly InventoryConfigurations?: ReadonlyArray<InventoryConfiguration>;
  readonly LifecycleConfiguration?: LifecycleConfiguration;
  readonly LoggingConfiguration?: LoggingConfiguration;
  readonly MetricsConfigurations?: ReadonlyArray<MetricsConfiguration>;
  readonly MetadataTableConfiguration?: MetadataTableConfiguration;
  readonly MetadataConfiguration?: MetadataConfiguration;
  readonly NotificationConfiguration?: NotificationConfiguration;
  readonly ObjectLockConfiguration?: ObjectLockConfiguration;
  readonly ObjectLockEnabled?: boolean;
  readonly OwnershipControls?: OwnershipControls;
  readonly PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
  readonly ReplicationConfiguration?: ReplicationConfiguration;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly AbacStatus?: "Enabled" | "Disabled";
  readonly VersioningConfiguration?: VersioningConfiguration;
  readonly WebsiteConfiguration?: WebsiteConfiguration;
}

export const AWSBucketResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "s3",
  resource: "bucket",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["BucketName"], ["BucketNamePrefix"], ["BucketNamespace"]],
  },
  primaryIdentifier: ["/properties/BucketName"],
});
export const AWSBucketPropsSchema = annotateResourceSchema(
  Schema.Struct({
    AccelerateConfiguration: Schema.optionalKey(AccelerateConfiguration),
    AccessControl: Schema.optionalKey(
      Schema.Literals([
        "AuthenticatedRead",
        "AwsExecRead",
        "BucketOwnerFullControl",
        "BucketOwnerRead",
        "LogDeliveryWrite",
        "Private",
        "PublicRead",
        "PublicReadWrite",
      ]).annotate({
        description:
          "This is a legacy property, and it is not recommended for most use cases. A majority of modern use cases in Amazon S3 no longer require the use of ACLs, and we recommend that you keep ACLs disabled. For more information, see [Controlling object ownership](https://docs.aws.amazon.com//AmazonS3/latest/userguide/about-object-ownership.html) in the *Amazon S3 User Guide*.\n  A canned access control list (ACL) that grants predefined permissions to the bucket. For more information about canned ACLs, see [Canned ACL](https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl) in the *Amazon S3 User Guide*.\n  S3 buckets are created with ACLs disabled by default. Therefore, unless you explicitly set the [AWS::S3::OwnershipControls](https://docs.aws.amazon.com//AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-ownershipcontrols.html) property to enable ACLs, your resource will fail to deploy with any value other than Private. Use cases requiring ACLs are uncommon.\n  The majority of access control configurations can be successfully and more easily achieved with bucket policies. For more information, see [AWS::S3::BucketPolicy](https://docs.aws.amazon.com//AWSCloudFormation/latest/UserGuide/aws-properties-s3-policy.html). For examples of common policy configurations, including S3 Server Access Logs buckets and more, see [Bucket policy examples](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html) in the *Amazon S3 User Guide*.",
      }),
    ),
    AnalyticsConfigurations: Schema.optionalKey(
      Schema.Array(AnalyticsConfiguration)
        .annotate({
          description:
            "Specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket.",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    BucketEncryption: Schema.optionalKey(BucketEncryption),
    BucketName: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("s3"),
              resource: Schema.Literal("bucketpolicy"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Bucket"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String.annotate({
          description:
            "A name for the bucket. If you don't specify a name, AWS CloudFormation generates a unique ID and uses that ID for the bucket name. The bucket name must contain only lowercase letters, numbers, periods (.), and dashes (-) and must follow [Amazon S3 bucket restrictions and limitations](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html). For more information, see [Rules for naming Amazon S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) in the *Amazon S3 User Guide*. \n  If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you need to replace the resource, specify a new name.",
        }),
      ]),
    ),
    BucketNamePrefix: Schema.optionalKey(
      Schema.String.annotate({ description: "" }),
    ),
    BucketNamespace: Schema.optionalKey(
      Schema.Literals(["global", "account-regional"]).annotate({
        description: "",
      }),
    ),
    CorsConfiguration: Schema.optionalKey(CorsConfiguration),
    IntelligentTieringConfigurations: Schema.optionalKey(
      Schema.Array(IntelligentTieringConfiguration)
        .annotate({
          description:
            "Defines how Amazon S3 handles Intelligent-Tiering storage.",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    InventoryConfigurations: Schema.optionalKey(
      Schema.Array(InventoryConfiguration)
        .annotate({
          description:
            "Specifies the S3 Inventory configuration for an Amazon S3 bucket. For more information, see [GET Bucket inventory](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGETInventoryConfig.html) in the *Amazon S3 API Reference*.",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    LifecycleConfiguration: Schema.optionalKey(LifecycleConfiguration),
    LoggingConfiguration: Schema.optionalKey(LoggingConfiguration),
    MetricsConfigurations: Schema.optionalKey(
      Schema.Array(MetricsConfiguration)
        .annotate({
          description:
            "Specifies a metrics configuration for the CloudWatch request metrics (specified by the metrics configuration ID) from an Amazon S3 bucket. If you're updating an existing metrics configuration, note that this is a full replacement of the existing metrics configuration. If you don't include the elements you want to keep, they are erased. For more information, see [PutBucketMetricsConfiguration](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTMetricConfiguration.html).",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    MetadataTableConfiguration: Schema.optionalKey(MetadataTableConfiguration),
    MetadataConfiguration: Schema.optionalKey(MetadataConfiguration),
    NotificationConfiguration: Schema.optionalKey(NotificationConfiguration),
    ObjectLockConfiguration: Schema.optionalKey(ObjectLockConfiguration),
    ObjectLockEnabled: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Indicates whether this bucket has an Object Lock configuration enabled. Enable ``ObjectLockEnabled`` when you apply ``ObjectLockConfiguration`` to a bucket.",
      }),
    ),
    OwnershipControls: Schema.optionalKey(OwnershipControls),
    PublicAccessBlockConfiguration: Schema.optionalKey(
      PublicAccessBlockConfiguration,
    ),
    ReplicationConfiguration: Schema.optionalKey(ReplicationConfiguration),
    Tags: Schema.optionalKey(
      Schema.Array(Tag).annotate({
        description:
          "An arbitrary set of tags (key-value pairs) for this S3 bucket.",
      }),
    ),
    AbacStatus: Schema.optionalKey(
      Schema.Literals(["Enabled", "Disabled"]).annotate({
        description:
          "The ABAC status of the general purpose bucket. When ABAC is enabled for the general purpose bucket, you can use tags to manage access to the general purpose buckets as well as for cost tracking purposes. When ABAC is disabled for the general purpose buckets, you can only use tags for cost tracking purposes. For more information, see [Using tags with S3 general purpose buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/buckets-tagging.html).",
      }),
    ),
    VersioningConfiguration: Schema.optionalKey(VersioningConfiguration),
    WebsiteConfiguration: Schema.optionalKey(WebsiteConfiguration),
  }),
  AWSBucketResourceSchema,
);

export interface AWSBucketOutputs {
  readonly Arn?: Arn;
  readonly DomainName?: string;
  readonly DualStackDomainName?: string;
  readonly RegionalDomainName?: string;
  readonly WebsiteURL?: string;
  readonly BucketName?: string;
}

export const AWSBucketOutputsSchema = Schema.Struct({
  Arn: Schema.optionalKey(Arn),
  DomainName: Schema.optionalKey(
    Schema.String.annotate({
      description: "",
      examples: ["mystack-mybucket-kdwwxmddtr2g.s3.amazonaws.com"],
    }),
  ),
  DualStackDomainName: Schema.optionalKey(
    Schema.String.annotate({
      description: "",
      examples: [
        "mystack-mybucket-kdwwxmddtr2g.s3.dualstack.us-east-2.amazonaws.com",
      ],
    }),
  ),
  RegionalDomainName: Schema.optionalKey(
    Schema.String.annotate({
      description: "",
      examples: ["mystack-mybucket-kdwwxmddtr2g.s3.us-east-2.amazonaws.com"],
    }),
  ),
  WebsiteURL: Schema.optionalKey(
    Schema.String.annotate({
      description: "",
      examples: [
        "Example (IPv4): http://mystack-mybucket-kdwwxmddtr2g.s3-website-us-east-2.amazonaws.com/",
        "Example (IPv6): http://mystack-mybucket-kdwwxmddtr2g.s3.dualstack.us-east-2.amazonaws.com/",
      ],
      format: "uri",
    }),
  ),
  BucketName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A name for the bucket. If you don't specify a name, AWS CloudFormation generates a unique ID and uses that ID for the bucket name. The bucket name must contain only lowercase letters, numbers, periods (.), and dashes (-) and must follow [Amazon S3 bucket restrictions and limitations](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html). For more information, see [Rules for naming Amazon S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) in the *Amazon S3 User Guide*. \n  If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you need to replace the resource, specify a new name.",
    }),
  ),
});

export interface AWSBucketRequest {
  readonly AccelerateConfiguration?: AccelerateConfiguration;
  readonly AccessControl?:
    | "AuthenticatedRead"
    | "AwsExecRead"
    | "BucketOwnerFullControl"
    | "BucketOwnerRead"
    | "LogDeliveryWrite"
    | "Private"
    | "PublicRead"
    | "PublicReadWrite";
  readonly AnalyticsConfigurations?: ReadonlyArray<AnalyticsConfiguration_1>;
  readonly BucketEncryption?: BucketEncryption_1;
  readonly BucketName?: string;
  readonly BucketNamePrefix?: string;
  readonly BucketNamespace?: "global" | "account-regional";
  readonly CorsConfiguration?: CorsConfiguration;
  readonly IntelligentTieringConfigurations?: ReadonlyArray<IntelligentTieringConfiguration>;
  readonly InventoryConfigurations?: ReadonlyArray<InventoryConfiguration_1>;
  readonly LifecycleConfiguration?: LifecycleConfiguration;
  readonly LoggingConfiguration?: LoggingConfiguration_1;
  readonly MetricsConfigurations?: ReadonlyArray<MetricsConfiguration>;
  readonly MetadataTableConfiguration?: MetadataTableConfiguration;
  readonly MetadataConfiguration?: MetadataConfiguration;
  readonly NotificationConfiguration?: NotificationConfiguration_1;
  readonly ObjectLockConfiguration?: ObjectLockConfiguration;
  readonly ObjectLockEnabled?: boolean;
  readonly OwnershipControls?: OwnershipControls;
  readonly PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
  readonly ReplicationConfiguration?: ReplicationConfiguration_1;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly AbacStatus?: "Enabled" | "Disabled";
  readonly VersioningConfiguration?: VersioningConfiguration;
  readonly WebsiteConfiguration?: WebsiteConfiguration;
}

export const AWSBucketRequestSchema = Schema.Struct({
  AccelerateConfiguration: Schema.optionalKey(AccelerateConfiguration),
  AccessControl: Schema.optionalKey(
    Schema.Literals([
      "AuthenticatedRead",
      "AwsExecRead",
      "BucketOwnerFullControl",
      "BucketOwnerRead",
      "LogDeliveryWrite",
      "Private",
      "PublicRead",
      "PublicReadWrite",
    ]).annotate({
      description:
        "This is a legacy property, and it is not recommended for most use cases. A majority of modern use cases in Amazon S3 no longer require the use of ACLs, and we recommend that you keep ACLs disabled. For more information, see [Controlling object ownership](https://docs.aws.amazon.com//AmazonS3/latest/userguide/about-object-ownership.html) in the *Amazon S3 User Guide*.\n  A canned access control list (ACL) that grants predefined permissions to the bucket. For more information about canned ACLs, see [Canned ACL](https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl) in the *Amazon S3 User Guide*.\n  S3 buckets are created with ACLs disabled by default. Therefore, unless you explicitly set the [AWS::S3::OwnershipControls](https://docs.aws.amazon.com//AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-ownershipcontrols.html) property to enable ACLs, your resource will fail to deploy with any value other than Private. Use cases requiring ACLs are uncommon.\n  The majority of access control configurations can be successfully and more easily achieved with bucket policies. For more information, see [AWS::S3::BucketPolicy](https://docs.aws.amazon.com//AWSCloudFormation/latest/UserGuide/aws-properties-s3-policy.html). For examples of common policy configurations, including S3 Server Access Logs buckets and more, see [Bucket policy examples](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html) in the *Amazon S3 User Guide*.",
    }),
  ),
  AnalyticsConfigurations: Schema.optionalKey(
    Schema.Array(AnalyticsConfiguration_1)
      .annotate({
        description:
          "Specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  BucketEncryption: Schema.optionalKey(BucketEncryption_1),
  BucketName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A name for the bucket. If you don't specify a name, AWS CloudFormation generates a unique ID and uses that ID for the bucket name. The bucket name must contain only lowercase letters, numbers, periods (.), and dashes (-) and must follow [Amazon S3 bucket restrictions and limitations](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html). For more information, see [Rules for naming Amazon S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) in the *Amazon S3 User Guide*. \n  If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you need to replace the resource, specify a new name.",
    }),
  ),
  BucketNamePrefix: Schema.optionalKey(
    Schema.String.annotate({ description: "" }),
  ),
  BucketNamespace: Schema.optionalKey(
    Schema.Literals(["global", "account-regional"]).annotate({
      description: "",
    }),
  ),
  CorsConfiguration: Schema.optionalKey(CorsConfiguration),
  IntelligentTieringConfigurations: Schema.optionalKey(
    Schema.Array(IntelligentTieringConfiguration)
      .annotate({
        description:
          "Defines how Amazon S3 handles Intelligent-Tiering storage.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  InventoryConfigurations: Schema.optionalKey(
    Schema.Array(InventoryConfiguration_1)
      .annotate({
        description:
          "Specifies the S3 Inventory configuration for an Amazon S3 bucket. For more information, see [GET Bucket inventory](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGETInventoryConfig.html) in the *Amazon S3 API Reference*.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  LifecycleConfiguration: Schema.optionalKey(LifecycleConfiguration),
  LoggingConfiguration: Schema.optionalKey(LoggingConfiguration_1),
  MetricsConfigurations: Schema.optionalKey(
    Schema.Array(MetricsConfiguration)
      .annotate({
        description:
          "Specifies a metrics configuration for the CloudWatch request metrics (specified by the metrics configuration ID) from an Amazon S3 bucket. If you're updating an existing metrics configuration, note that this is a full replacement of the existing metrics configuration. If you don't include the elements you want to keep, they are erased. For more information, see [PutBucketMetricsConfiguration](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTMetricConfiguration.html).",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  MetadataTableConfiguration: Schema.optionalKey(MetadataTableConfiguration),
  MetadataConfiguration: Schema.optionalKey(MetadataConfiguration),
  NotificationConfiguration: Schema.optionalKey(NotificationConfiguration_1),
  ObjectLockConfiguration: Schema.optionalKey(ObjectLockConfiguration),
  ObjectLockEnabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Indicates whether this bucket has an Object Lock configuration enabled. Enable ``ObjectLockEnabled`` when you apply ``ObjectLockConfiguration`` to a bucket.",
    }),
  ),
  OwnershipControls: Schema.optionalKey(OwnershipControls),
  PublicAccessBlockConfiguration: Schema.optionalKey(
    PublicAccessBlockConfiguration,
  ),
  ReplicationConfiguration: Schema.optionalKey(ReplicationConfiguration_1),
  Tags: Schema.optionalKey(
    Schema.Array(Tag).annotate({
      description:
        "An arbitrary set of tags (key-value pairs) for this S3 bucket.",
    }),
  ),
  AbacStatus: Schema.optionalKey(
    Schema.Literals(["Enabled", "Disabled"]).annotate({
      description:
        "The ABAC status of the general purpose bucket. When ABAC is enabled for the general purpose bucket, you can use tags to manage access to the general purpose buckets as well as for cost tracking purposes. When ABAC is disabled for the general purpose buckets, you can only use tags for cost tracking purposes. For more information, see [Using tags with S3 general purpose buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/buckets-tagging.html).",
    }),
  ),
  VersioningConfiguration: Schema.optionalKey(VersioningConfiguration),
  WebsiteConfiguration: Schema.optionalKey(WebsiteConfiguration),
});
export const AWSBucketRelationshipIssues = [
  {
    propertyPath: [
      "BucketEncryption",
      "ServerSideEncryptionConfiguration",
      "*",
      "ServerSideEncryptionByDefault",
      "KMSMasterKeyID",
    ],
    sourceType: "AWS::KMS::Key",
    sourceProperties: [["Arn"], ["KeyId"]],
    message:
      "Several source properties are permitted; an entity mapping requires a reviewed selection",
  },
];
export const AWSBucketResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("s3"),
  resource: Schema.Literal("bucket"),
});

/**
 * The AWSBucketResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSBucketResource<Props = AWSBucketProps> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "s3";
  readonly resource: "bucket";
}> {
  constructor(
    key: ResourceKey,
    readonly props: Props,
    private readonly binding?: ResourceOutputBinding,
  ) {
    super({
      key,
      resourceType: {
        provider: "aws",
        service: "s3",
        resource: "bucket",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSBucketOutputs>["Arn"] {
    const value: Required<AWSBucketOutputs>["Arn"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Arn",
        Schema.requiredKey(AWSBucketOutputsSchema.fields.Arn),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get DomainName(): Required<AWSBucketOutputs>["DomainName"] {
    const value: Required<AWSBucketOutputs>["DomainName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "DomainName",
        Schema.requiredKey(AWSBucketOutputsSchema.fields.DomainName),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get DualStackDomainName(): Required<AWSBucketOutputs>["DualStackDomainName"] {
    const value: Required<AWSBucketOutputs>["DualStackDomainName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "DualStackDomainName",
        Schema.requiredKey(AWSBucketOutputsSchema.fields.DualStackDomainName),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RegionalDomainName(): Required<AWSBucketOutputs>["RegionalDomainName"] {
    const value: Required<AWSBucketOutputs>["RegionalDomainName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RegionalDomainName",
        Schema.requiredKey(AWSBucketOutputsSchema.fields.RegionalDomainName),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get WebsiteURL(): Required<AWSBucketOutputs>["WebsiteURL"] {
    const value: Required<AWSBucketOutputs>["WebsiteURL"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "WebsiteURL",
        Schema.requiredKey(AWSBucketOutputsSchema.fields.WebsiteURL),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get BucketName(): Required<AWSBucketOutputs>["BucketName"] {
    const value: Required<AWSBucketOutputs>["BucketName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "BucketName",
        Schema.requiredKey(AWSBucketOutputsSchema.fields.BucketName),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSBucketDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSBucketResource<Props> {
  const resource: AWSBucketResource<Props> = new AWSBucketResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/** The AWSBucket resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource. */
export const AWSBucket = Effect.fn("AWSBucket")(function* (input: {
  logicalId: string;
  props: AWSBucketProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSBucketPropsSchema)(input.props);

  yield* declaration.registerEntity(AWSBucketResourceTypeSchema, {
    propsSchema: AWSBucketPropsSchema,
    requestSchema: AWSBucketRequestSchema,
    outputsSchema: AWSBucketOutputsSchema,
    props,
  });

  const resource: AWSBucketResource = createAWSBucketDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
export const AWSBucketOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-s3-bucket.json",
      format: "CloudFormation",
    },
    typeName: "AWS::S3::Bucket",
    resource: "bucket",
    primaryIdentifier: ["/properties/BucketName"],
    createOnlyProperties: [
      "/properties/BucketName",
      "/properties/BucketNamePrefix",
      "/properties/BucketNamespace",
    ],
    writeOnlyProperties: [
      "/properties/AccessControl",
      "/properties/BucketNamePrefix",
      "/properties/BucketNamespace",
      "/properties/MetadataConfiguration/JournalTableConfiguration/EncryptionConfiguration",
      "/properties/MetadataConfiguration/InventoryTableConfiguration/EncryptionConfiguration",
      "/properties/MetadataConfiguration/AnnotationTableConfiguration/EncryptionConfiguration",
      "/properties/LifecycleConfiguration/Rules/*/NoncurrentVersionExpirationInDays",
      "/properties/LifecycleConfiguration/Rules/*/NoncurrentVersionTransition",
      "/properties/LifecycleConfiguration/Rules/*/Transition",
      "/properties/ReplicationConfiguration/Rules/*/Prefix",
      "/properties/LifecycleConfiguration/Rules/*/ExpiredObjectDeleteMarker",
    ],
    outputs: {
      Arn: {
        schema: {
          $ref: "#/definitions/Arn",
          description: "",
          examples: ["arn:aws:s3:::mybucket"],
        },
        schemaPath: "/properties/Arn",
        valuePath: "/Arn",
        required: false,
      },
      DomainName: {
        schema: {
          description: "",
          examples: ["mystack-mybucket-kdwwxmddtr2g.s3.amazonaws.com"],
          type: "string",
        },
        schemaPath: "/properties/DomainName",
        valuePath: "/DomainName",
        required: false,
      },
      DualStackDomainName: {
        schema: {
          description: "",
          examples: [
            "mystack-mybucket-kdwwxmddtr2g.s3.dualstack.us-east-2.amazonaws.com",
          ],
          type: "string",
        },
        schemaPath: "/properties/DualStackDomainName",
        valuePath: "/DualStackDomainName",
        required: false,
      },
      RegionalDomainName: {
        schema: {
          description: "",
          examples: [
            "mystack-mybucket-kdwwxmddtr2g.s3.us-east-2.amazonaws.com",
          ],
          type: "string",
        },
        schemaPath: "/properties/RegionalDomainName",
        valuePath: "/RegionalDomainName",
        required: false,
      },
      WebsiteURL: {
        schema: {
          description: "",
          examples: [
            "Example (IPv4): http://mystack-mybucket-kdwwxmddtr2g.s3-website-us-east-2.amazonaws.com/",
            "Example (IPv6): http://mystack-mybucket-kdwwxmddtr2g.s3.dualstack.us-east-2.amazonaws.com/",
          ],
          format: "uri",
          type: "string",
        },
        schemaPath: "/properties/WebsiteURL",
        valuePath: "/WebsiteURL",
        required: false,
      },
      BucketName: {
        schema: {
          description:
            "A name for the bucket. If you don't specify a name, AWS CloudFormation generates a unique ID and uses that ID for the bucket name. The bucket name must contain only lowercase letters, numbers, periods (.), and dashes (-) and must follow [Amazon S3 bucket restrictions and limitations](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html). For more information, see [Rules for naming Amazon S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) in the *Amazon S3 User Guide*. \n  If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you need to replace the resource, specify a new name.",
          type: "string",
        },
        schemaPath: "/properties/BucketName",
        valuePath: "/BucketName",
        required: false,
      },
    },
  },
];
