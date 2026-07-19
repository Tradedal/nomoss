import type {
  ResourceCommand,
  ResourceCommandPolicy,
  ResourceKey,
} from "@nomoss/core";
import {
  annotateResourceSchema,
  CloudFormationPropertyReferencesAnnotationId,
  ResourceGraphBuilder,
  ResourceOutputRefSchema,
  ResourceSchemaAnnotationSchema,
} from "@nomoss/core";
import { providerCommandPolicyTag } from "@nomoss/providers";
import { Context, Effect, Layer, Schema } from "effect";

const TagFilter = Schema.Struct({
  Value: Schema.String.annotate({ description: "The tag value." }),
  Key: Schema.String.annotate({ description: "The tag key." }),
}).annotate({
  description:
    "Specifies tags to use to identify a subset of objects for an Amazon S3 bucket. For more information, see [Categorizing your storage using tags](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html) in the *Amazon Simple Storage Service User Guide*.",
});

const ServerSideEncryptionRule = Schema.Struct({
  BucketKeyEnabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether Amazon S3 should use an S3 Bucket Key with server-side encryption using KMS (SSE-KMS) for new objects in the bucket. Existing objects are not affected. Setting the ``BucketKeyEnabled`` element to ``true`` causes Amazon S3 to use an S3 Bucket Key. By default, S3 Bucket Key is not enabled.\n For more information, see [Amazon S3 Bucket Keys](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html) in the *Amazon S3 User Guide*.",
    }),
  ),
  ServerSideEncryptionByDefault: Schema.optionalKey(
    Schema.Struct({
      KMSMasterKeyID: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "AWS Key Management Service (KMS) customer managed key ID to use for the default encryption. \n   +  *General purpose buckets* - This parameter is allowed if and only if ``SSEAlgorithm`` is set to ``aws:kms`` or ``aws:kms:dsse``.\n  +  *Directory buckets* - This parameter is allowed if and only if ``SSEAlgorithm`` is set to ``aws:kms``.\n  \n  You can specify the key ID, key alias, or the Amazon Resource Name (ARN) of the KMS key.\n  +  Key ID: ``1234abcd-12ab-34cd-56ef-1234567890ab``\n  +  Key ARN: ``arn:aws:kms:us-east-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab``\n  +  Key Alias: ``alias/alias-name``\n  \n If you are using encryption with cross-account or AWS service operations, you must use a fully qualified KMS key ARN. For more information, see [Using encryption for cross-account operations](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html#bucket-encryption-update-bucket-policy).\n   +  *General purpose buckets* - If you're specifying a customer managed KMS key, we recommend using a fully qualified KMS key ARN. If you use a KMS key alias instead, then KMS resolves the key within the requester\u2019s account. This behavior can result in data that's encrypted with a KMS key that belongs to the requester, and not the bucket owner. Also, if you use a key ID, you can run into a LogDestination undeliverable error when creating a VPC flow log. \n  +  *Directory buckets* - When you specify an [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) for encryption in your directory bucket, only use the key ID or key ARN. The key alias format of the KMS key isn't supported.\n  \n   Amazon S3 only supports symmetric encryption KMS keys. For more information, see [Asymmetric keys in KMS](https://docs.aws.amazon.com//kms/latest/developerguide/symmetric-asymmetric.html) in the *Key Management Service Developer Guide*.",
        }),
      ),
      SSEAlgorithm: Schema.Literals([
        "aws:kms",
        "AES256",
        "aws:kms:dsse",
      ]).annotate({
        description:
          "Server-side encryption algorithm to use for the default encryption.\n  For directory buckets, there are only two supported values for server-side encryption: ``AES256`` and ``aws:kms``.",
      }),
    }).annotate({
      description:
        "Specifies the default server-side encryption to apply to new objects in the bucket. If a PUT Object request doesn't specify any server-side encryption, this default encryption will be applied.",
    }),
  ),
  BlockedEncryptionTypes: Schema.optionalKey(
    Schema.Struct({
      EncryptionType: Schema.optionalKey(
        Schema.Array(Schema.Literals(["NONE", "SSE-C"]))
          .annotate({
            description:
              "The object encryption type that you want to block or unblock for an Amazon S3 general purpose bucket.\n  Currently, this parameter only supports blocking or unblocking server side encryption with customer-provided keys (SSE-C). For more information about SSE-C, see [Using server-side encryption with customer-provided keys (SSE-C)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html).",
          })
          .check(Schema.isUnique()),
      ),
    }).annotate({
      description:
        "A bucket-level setting for Amazon S3 general purpose buckets used to prevent the upload of new objects encrypted with the specified server-side encryption type. For example, blocking an encryption type will block ``PutObject``, ``CopyObject``, ``PostObject``, multipart upload, and replication requests to the bucket for objects with the specified encryption type. However, you can continue to read and list any pre-existing objects already encrypted with the specified encryption type. For more information, see [Blocking or unblocking SSE-C for a general purpose bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/blocking-unblocking-s3-c-encryption-gpb.html).\n  Currently, this parameter only supports blocking or unblocking server-side encryption with customer-provided keys (SSE-C). For more information about SSE-C, see [Using server-side encryption with customer-provided keys (SSE-C)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html).",
    }),
  ),
}).annotate({
  description:
    "Specifies the default server-side encryption configuration.\n   +  *General purpose buckets* - If you're specifying a customer managed KMS key, we recommend using a fully qualified KMS key ARN. If you use a KMS key alias instead, then KMS resolves the key within the requester\u2019s account. This behavior can result in data that's encrypted with a KMS key that belongs to the requester, and not the bucket owner.\n  +  *Directory buckets* - When you specify an [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) for encryption in your directory bucket, only use the key ID or key ARN. The key alias format of the KMS key isn't supported.",
});

const CorsRule = Schema.Struct({
  AllowedHeaders: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "Headers that are specified in the ``Access-Control-Request-Headers`` header. These headers are allowed in a preflight OPTIONS request. In response to any preflight OPTIONS request, Amazon S3 returns any requested headers that are allowed.",
      })
      .check(Schema.isUnique()),
  ),
  AllowedMethods: Schema.Array(
    Schema.Literals(["GET", "PUT", "HEAD", "POST", "DELETE"]),
  )
    .annotate({
      description:
        "An HTTP method that you allow the origin to run.\n *Allowed values*: ``GET`` | ``PUT`` | ``HEAD`` | ``POST`` | ``DELETE``",
    })
    .check(Schema.isUnique()),
  AllowedOrigins: Schema.Array(Schema.String)
    .annotate({
      description:
        "One or more origins you want customers to be able to access the bucket from.",
    })
    .check(Schema.isUnique()),
  ExposedHeaders: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "One or more headers in the response that you want customers to be able to access from their applications (for example, from a JavaScript ``XMLHttpRequest`` object).",
      })
      .check(Schema.isUnique()),
  ),
  Id: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A unique identifier for this rule. The value must be no more than 255 characters.",
    }).check(Schema.isMaxLength(255)),
  ),
  MaxAge: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The time in seconds that your browser is to cache the preflight response for the specified resource.",
    })
      .check(Schema.isInt())
      .check(Schema.isGreaterThanOrEqualTo(0)),
  ),
}).annotate({
  description: "Specifies a cross-origin access rule for an Amazon S3 bucket.",
});

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
  }).check(Schema.isInt()),
}).annotate({
  description:
    "The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without additional operational overhead.",
});

const InventoryConfiguration = Schema.Struct({
  Destination: Schema.Struct({
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
      "Contains information about where to publish the inventory results.",
  }),
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
      .check(Schema.isUnique()),
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
});

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
  }).check(Schema.isInt()),
  NewerNoncurrentVersions: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Specifies how many noncurrent versions S3 will retain. If there are this many more recent noncurrent versions, S3 will take the associated action. For more information about noncurrent versions, see [Lifecycle configuration elements](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html) in the *Amazon S3 User Guide*.",
    }).check(Schema.isInt()),
  ),
}).annotate({
  description:
    "Container for the transition rule that describes when noncurrent objects transition to the ``STANDARD_IA``, ``ONEZONE_IA``, ``INTELLIGENT_TIERING``, ``GLACIER_IR``, ``GLACIER``, or ``DEEP_ARCHIVE`` storage class. If your bucket is versioning-enabled (or versioning is suspended), you can set this action to request that Amazon S3 transition noncurrent object versions to the ``STANDARD_IA``, ``ONEZONE_IA``, ``INTELLIGENT_TIERING``, ``GLACIER_IR``, ``GLACIER``, or ``DEEP_ARCHIVE`` storage class at a specific period in the object's lifetime. If you specify this property, don't specify the ``NoncurrentVersionTransitions`` property.",
});

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
  TransitionDate: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Indicates when objects are transitioned to the specified storage class. The date value must be in ISO 8601 format. The time is always midnight UTC.",
    }).check(
      Schema.isPattern(
        /^(\d{4})-(0[0-9]|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-4]):([0-5]\d):([0-6]\d)((\.\d{3})?)Z$/,
      ),
    ),
  ),
  TransitionInDays: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Indicates the number of days after creation when objects are transitioned to the specified storage class. If the specified storage class is ``INTELLIGENT_TIERING``, ``GLACIER_IR``, ``GLACIER``, or ``DEEP_ARCHIVE``, valid values are ``0`` or positive integers. If the specified storage class is ``STANDARD_IA`` or ``ONEZONE_IA``, valid values are positive integers greater than ``30``. Be aware that some storage classes have a minimum storage duration and that you're charged for transitioning objects before their minimum storage duration. For more information, see [Constraints and considerations for transitions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints) in the *Amazon S3 User Guide*.",
    }).check(Schema.isInt()),
  ),
}).annotate({
  description:
    "Specifies when an object transitions to a specified storage class. For more information about Amazon S3 lifecycle configuration rules, see [Transitioning Objects Using Amazon S3 Lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-transition-general-considerations.html) in the *Amazon S3 User Guide*.",
});

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
});

const FilterRule = Schema.Struct({
  Name: Schema.String.annotate({
    description:
      "The object key name prefix or suffix identifying one or more objects to which the filtering rule applies. The maximum length is 1,024 characters. Overlapping prefixes and suffixes are not supported. For more information, see [Configuring Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }).check(Schema.isMaxLength(1024)),
  Value: Schema.String.annotate({
    description: "The value that the filter searches for in object key names.",
  }),
}).annotate({
  description:
    "Specifies the Amazon S3 object key name to filter on. An object key name is the name assigned to an object in your Amazon S3 bucket. You specify whether to filter on the suffix or prefix of the object key name. A prefix is a specific string of characters at the beginning of an object key name, which you can use to organize objects. For example, you can start the key names of related objects with a prefix, such as ``2023-`` or ``engineering/``. Then, you can use ``FilterRule`` to find objects in a bucket with key names that have the same prefix. A suffix is similar to a prefix, but it is at the end of the object key name instead of at the beginning.",
});

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
});

const Tag = Schema.Struct({
  Key: Schema.String.annotate({ description: "Name of the object key." })
    .check(Schema.isMinLength(1))
    .check(Schema.isMaxLength(128)),
  Value: Schema.String.annotate({ description: "Value of the tag." }).check(
    Schema.isMaxLength(256),
  ),
}).annotate({ description: "A container of a key value name pair." });

const RoutingRule = Schema.Struct({
  RedirectRule: Schema.Struct({
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
      "Container for redirect information. You can redirect requests to another host, to another page, or with another protocol. In the event of an error, you can specify a different error code to return.",
  }),
  RoutingRuleCondition: Schema.optionalKey(
    Schema.Struct({
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
    }),
  ),
}).annotate({
  description:
    "Specifies the redirect behavior and when a redirect is applied. For more information about routing rules, see [Configuring advanced conditional redirects](https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-page-redirect.html#advanced-conditional-redirects) in the *Amazon S3 User Guide*.",
});

const AnalyticsConfiguration = Schema.Struct({
  TagFilters: Schema.optionalKey(
    Schema.Array(TagFilter)
      .annotate({
        description:
          "The tags to use when evaluating an analytics filter.\n The analytics only includes objects that meet the filter's criteria. If no filter is specified, all of the contents of the bucket are included in the analysis.",
      })
      .check(Schema.isUnique()),
  ),
  StorageClassAnalysis: Schema.Struct({
    DataExport: Schema.optionalKey(
      Schema.Struct({
        Destination: Schema.Struct({
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
          description: "The place to store the data for an analysis.",
        }),
        OutputSchemaVersion: Schema.Literal("V_1").annotate({
          description:
            "The version of the output schema to use when exporting data. Must be ``V_1``.",
        }),
      }).annotate({
        description:
          "Specifies how data related to the storage class analysis for an Amazon S3 bucket should be exported.",
      }),
    ),
  }).annotate({
    description:
      "Contains data related to access patterns to be collected and made available to analyze the tradeoffs between different storage classes.",
  }),
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
});

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
      .check(Schema.isUnique()),
  ),
}).annotate({
  description:
    "Specifies a metrics configuration for the CloudWatch request metrics (specified by the metrics configuration ID) from an Amazon S3 bucket. If you're updating an existing metrics configuration, note that this is a full replacement of the existing metrics configuration. If you don't include the elements you want to keep, they are erased. For examples, see [AWS::S3::Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket--examples). For more information, see [PUT Bucket metrics](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTMetricConfiguration.html) in the *Amazon S3 API Reference*.",
});

const ReplicationRule = Schema.Struct({
  DeleteMarkerReplication: Schema.optionalKey(
    Schema.Struct({
      Status: Schema.optionalKey(
        Schema.Literals(["Disabled", "Enabled"]).annotate({
          description: "Indicates whether to replicate delete markers.",
        }),
      ),
    }).annotate({
      description:
        "Specifies whether Amazon S3 replicates delete markers. If you specify a ``Filter`` in your replication configuration, you must also include a ``DeleteMarkerReplication`` element. If your ``Filter`` includes a ``Tag`` element, the ``DeleteMarkerReplication````Status`` must be set to Disabled, because Amazon S3 does not support replicating delete markers for tag-based rules. For an example configuration, see [Basic Rule Configuration](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-add-config.html#replication-config-min-rule-config). \n For more information about delete marker replication, see [Basic Rule Configuration](https://docs.aws.amazon.com/AmazonS3/latest/dev/delete-marker-replication.html). \n  If you are using an earlier version of the replication configuration, Amazon S3 handles replication of delete markers differently. For more information, see [Backward Compatibility](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-add-config.html#replication-backward-compat-considerations).",
    }),
  ),
  Destination: Schema.Struct({
    AccessControlTranslation: Schema.optionalKey(
      Schema.Struct({
        Owner: Schema.Literal("Destination").annotate({
          description:
            "Specifies the replica ownership. For default and valid values, see [PUT bucket replication](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTreplication.html) in the *Amazon S3 API Reference*.",
        }),
      }).annotate({
        description:
          "Specify this only in a cross-account scenario (where source and destination bucket owners are not the same), and you want to change replica ownership to the AWS-account that owns the destination bucket. If this is not specified in the replication configuration, the replicas are owned by same AWS-account that owns the source object.",
      }),
    ),
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
    EncryptionConfiguration: Schema.optionalKey(
      Schema.Struct({
        ReplicaKmsKeyID: Schema.String.annotate({
          description:
            "Specifies the ID (Key ARN or Alias ARN) of the customer managed AWS KMS key stored in AWS Key Management Service (KMS) for the destination bucket. Amazon S3 uses this key to encrypt replica objects. Amazon S3 only supports symmetric encryption KMS keys. For more information, see [Asymmetric keys in KMS](https://docs.aws.amazon.com//kms/latest/developerguide/symmetric-asymmetric.html) in the *Key Management Service Developer Guide*.",
        }),
      }).annotate({ description: "Specifies encryption-related information." }),
    ),
    Metrics: Schema.optionalKey(
      Schema.Struct({
        EventThreshold: Schema.optionalKey(
          Schema.Struct({
            Minutes: Schema.Number.annotate({
              description:
                "Contains an integer specifying time in minutes. \n  Valid value: 15",
            }).check(Schema.isInt()),
          }).annotate({
            description:
              "A container specifying the time threshold for emitting the ``s3:Replication:OperationMissedThreshold`` event.",
          }),
        ),
        Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
          description: "Specifies whether the replication metrics are enabled.",
        }),
      }).annotate({
        description:
          "A container specifying replication metrics-related settings enabling replication metrics and events.",
      }),
    ),
    ReplicationTime: Schema.optionalKey(
      Schema.Struct({
        Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
          description: "Specifies whether the replication time is enabled.",
        }),
        Time: Schema.Struct({
          Minutes: Schema.Number.annotate({
            description:
              "Contains an integer specifying time in minutes. \n  Valid value: 15",
          }).check(Schema.isInt()),
        }).annotate({
          description:
            "A container specifying the time by which replication should be complete for all objects and operations on objects.",
        }),
      }).annotate({
        description:
          "A container specifying S3 Replication Time Control (S3 RTC), including whether S3 RTC is enabled and the time when all objects and operations on objects must be replicated. Must be specified together with a ``Metrics`` block.",
      }),
    ),
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
  }),
  Filter: Schema.optionalKey(
    Schema.Struct({
      And: Schema.optionalKey(
        Schema.Struct({
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
              .check(Schema.isUnique()),
          ),
        }).annotate({
          description:
            "A container for specifying rule filters. The filters determine the subset of objects to which the rule applies. This element is required only if you specify more than one filter. For example: \n  +  If you specify both a ``Prefix`` and a ``TagFilter``, wrap these filters in an ``And`` tag.\n  +  If you specify a filter based on multiple tags, wrap the ``TagFilter`` elements in an ``And`` tag.",
        }),
      ),
      Prefix: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "An object key name prefix that identifies the subset of objects to which the rule applies.\n  Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see [XML related object key constraints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints).",
        }),
      ),
      TagFilter: Schema.optionalKey(
        Schema.Struct({
          Value: Schema.String.annotate({ description: "The tag value." }),
          Key: Schema.String.annotate({ description: "The tag key." }),
        }).annotate({
          description:
            "A container for specifying a tag key and value. \n The rule applies only to objects that have the tag in their tag set.",
        }),
      ),
    }).annotate({
      description:
        "A filter that identifies the subset of objects to which the replication rule applies. A ``Filter`` must specify exactly one ``Prefix``, ``TagFilter``, or an ``And`` child element. The use of the filter field indicates that this is a V2 replication configuration. This field isn't supported in a V1 replication configuration.\n  V1 replication configuration only supports filtering by key prefix. To filter using a V1 replication configuration, add the ``Prefix`` directly as a child element of the ``Rule`` element.",
    }),
  ),
  Id: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'A unique identifier for the rule. The maximum value is 255 characters. If you don\'t specify a value, AWS CloudFormation generates a random ID. When using a V2 replication configuration this property is capitalized as "ID".',
    }).check(Schema.isMaxLength(255)),
  ),
  Prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An object key name prefix that identifies the object or objects to which the rule applies. The maximum prefix length is 1,024 characters. To include all objects in a bucket, specify an empty string. To filter using a V1 replication configuration, add the ``Prefix`` directly as a child element of the ``Rule`` element.\n  Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see [XML related object key constraints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints).",
    }).check(Schema.isMaxLength(1024)),
  ),
  Priority: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The priority indicates which rule has precedence whenever two or more replication rules conflict. Amazon S3 will attempt to replicate objects according to all replication rules. However, if there are two or more rules with the same destination bucket, then objects will be replicated according to the rule with the highest priority. The higher the number, the higher the priority. \n For more information, see [Replication](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication.html) in the *Amazon S3 User Guide*.",
    }).check(Schema.isInt()),
  ),
  SourceSelectionCriteria: Schema.optionalKey(
    Schema.Struct({
      ReplicaModifications: Schema.optionalKey(
        Schema.Struct({
          Status: Schema.Literals(["Enabled", "Disabled"]).annotate({
            description:
              "Specifies whether Amazon S3 replicates modifications on replicas.\n *Allowed values*: ``Enabled`` | ``Disabled``",
          }),
        }).annotate({
          description:
            "A filter that you can specify for selection for modifications on replicas.",
        }),
      ),
      SseKmsEncryptedObjects: Schema.optionalKey(
        Schema.Struct({
          Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
            description:
              "Specifies whether Amazon S3 replicates objects created with server-side encryption using an AWS KMS key stored in AWS Key Management Service.",
          }),
        }).annotate({
          description:
            "A container for filter information for the selection of Amazon S3 objects encrypted with AWS KMS.",
        }),
      ),
    }).annotate({
      description:
        "A container that describes additional filters for identifying the source objects that you want to replicate. You can choose to enable or disable the replication of these objects.",
    }),
  ),
  Status: Schema.Literals(["Disabled", "Enabled"]).annotate({
    description: "Specifies whether the rule is enabled.",
  }),
}).annotate({
  description:
    "Specifies which Amazon S3 objects to replicate and where to store the replicas.",
});

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
      .check(Schema.isUnique()),
  ),
  Tierings: Schema.Array(Tiering)
    .annotate({
      description:
        "Specifies a list of S3 Intelligent-Tiering storage class tiers in the configuration. At least one tier must be defined in the list. At most, you can specify two tiers in the list, one for each available AccessTier: ``ARCHIVE_ACCESS`` and ``DEEP_ARCHIVE_ACCESS``.\n  You only need Intelligent Tiering Configuration enabled on a bucket if you want to automatically move objects stored in the Intelligent-Tiering storage class to Archive Access or Deep Archive Access tiers.",
    })
    .check(Schema.isUnique()),
}).annotate({
  description:
    "Specifies the S3 Intelligent-Tiering configuration for an Amazon S3 bucket.\n For information about the S3 Intelligent-Tiering storage class, see [Storage class for automatically optimizing frequently and infrequently accessed objects](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html#sc-dynamic-data-access).",
});

const Rule = Schema.Struct({
  AbortIncompleteMultipartUpload: Schema.optionalKey(
    Schema.Struct({
      DaysAfterInitiation: Schema.Number.annotate({
        description:
          "Specifies the number of days after which Amazon S3 stops an incomplete multipart upload.",
      })
        .check(Schema.isInt())
        .check(Schema.isGreaterThanOrEqualTo(0)),
    }).annotate({
      description:
        "Specifies a lifecycle rule that stops incomplete multipart uploads to an Amazon S3 bucket.",
    }),
  ),
  ExpirationDate: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Indicates when objects are deleted from Amazon S3 and Amazon S3 Glacier. The date value must be in ISO 8601 format. The time is always midnight UTC. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time.",
    }).check(
      Schema.isPattern(
        /^(\d{4})-(0[0-9]|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-4]):([0-5]\d):([0-6]\d)((\.\d{3})?)Z$/,
      ),
    ),
  ),
  ExpirationInDays: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Indicates the number of days after creation when objects are deleted from Amazon S3 and Amazon S3 Glacier. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time.",
    }).check(Schema.isInt()),
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
    }).check(Schema.isMaxLength(255)),
  ),
  NoncurrentVersionExpirationInDays: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "(Deprecated.) For buckets with versioning enabled (or suspended), specifies the time, in days, between when a new version of the object is uploaded to the bucket and when old versions of the object expire. When object versions expire, Amazon S3 permanently deletes them. If you specify a transition and expiration time, the expiration time must be later than the transition time.",
    }).check(Schema.isInt()),
  ),
  NoncurrentVersionExpiration: Schema.optionalKey(
    Schema.Struct({
      NoncurrentDays: Schema.Number.annotate({
        description:
          "Specifies the number of days an object is noncurrent before S3 can perform the associated action. For information about the noncurrent days calculations, see [How Amazon S3 Calculates When an Object Became Noncurrent](https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html#non-current-days-calculations) in the *Amazon S3 User Guide*.",
      }).check(Schema.isInt()),
      NewerNoncurrentVersions: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Specifies how many noncurrent versions S3 will retain. If there are this many more recent noncurrent versions, S3 will take the associated action. For more information about noncurrent versions, see [Lifecycle configuration elements](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html) in the *Amazon S3 User Guide*.",
        }).check(Schema.isInt()),
      ),
    }).annotate({
      description:
        "Specifies when noncurrent object versions expire. Upon expiration, S3 permanently deletes the noncurrent object versions. You set this lifecycle configuration action on a bucket that has versioning enabled (or suspended) to request that S3 delete noncurrent object versions at a specific period in the object's lifetime.",
    }),
  ),
  NoncurrentVersionTransition: Schema.optionalKey(
    Schema.Struct({
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
      }).check(Schema.isInt()),
      NewerNoncurrentVersions: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Specifies how many noncurrent versions S3 will retain. If there are this many more recent noncurrent versions, S3 will take the associated action. For more information about noncurrent versions, see [Lifecycle configuration elements](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html) in the *Amazon S3 User Guide*.",
        }).check(Schema.isInt()),
      ),
    }).annotate({
      description:
        "(Deprecated.) For buckets with versioning enabled (or suspended), specifies when non-current objects transition to a specified storage class. If you specify a transition and expiration time, the expiration time must be later than the transition time. If you specify this property, don't specify the ``NoncurrentVersionTransitions`` property.",
    }),
  ),
  NoncurrentVersionTransitions: Schema.optionalKey(
    Schema.Array(NoncurrentVersionTransition)
      .annotate({
        description:
          "For buckets with versioning enabled (or suspended), one or more transition rules that specify when non-current objects transition to a specified storage class. If you specify a transition and expiration time, the expiration time must be later than the transition time. If you specify this property, don't specify the ``NoncurrentVersionTransition`` property.",
      })
      .check(Schema.isUnique()),
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
      .check(Schema.isUnique()),
  ),
  ObjectSizeGreaterThan: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Specifies the minimum object size in bytes for this rule to apply to. Objects must be larger than this value in bytes. For more information about size based rules, see [Lifecycle configuration using size-based rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html#lc-size-rules) in the *Amazon S3 User Guide*.",
    })
      .check(Schema.isMaxLength(20))
      .check(Schema.isPattern(/[0-9]+/)),
  ),
  ObjectSizeLessThan: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Specifies the maximum object size in bytes for this rule to apply to. Objects must be smaller than this value in bytes. For more information about sized based rules, see [Lifecycle configuration using size-based rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html#lc-size-rules) in the *Amazon S3 User Guide*.",
    })
      .check(Schema.isMaxLength(20))
      .check(Schema.isPattern(/[0-9]+/)),
  ),
  Transition: Schema.optionalKey(
    Schema.Struct({
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
      TransitionDate: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Indicates when objects are transitioned to the specified storage class. The date value must be in ISO 8601 format. The time is always midnight UTC.",
        }).check(
          Schema.isPattern(
            /^(\d{4})-(0[0-9]|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-4]):([0-5]\d):([0-6]\d)((\.\d{3})?)Z$/,
          ),
        ),
      ),
      TransitionInDays: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Indicates the number of days after creation when objects are transitioned to the specified storage class. If the specified storage class is ``INTELLIGENT_TIERING``, ``GLACIER_IR``, ``GLACIER``, or ``DEEP_ARCHIVE``, valid values are ``0`` or positive integers. If the specified storage class is ``STANDARD_IA`` or ``ONEZONE_IA``, valid values are positive integers greater than ``30``. Be aware that some storage classes have a minimum storage duration and that you're charged for transitioning objects before their minimum storage duration. For more information, see [Constraints and considerations for transitions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints) in the *Amazon S3 User Guide*.",
        }).check(Schema.isInt()),
      ),
    }).annotate({
      description:
        "(Deprecated.) Specifies when an object transitions to a specified storage class. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time. If you specify this property, don't specify the ``Transitions`` property.",
    }),
  ),
  Transitions: Schema.optionalKey(
    Schema.Array(Transition)
      .annotate({
        description:
          "One or more transition rules that specify when an object transitions to a specified storage class. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time. If you specify this property, don't specify the ``Transition`` property.",
      })
      .check(Schema.isUnique()),
  ),
}).annotate({
  description:
    "Specifies lifecycle rules for an Amazon S3 bucket. For more information, see [Put Bucket Lifecycle Configuration](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTlifecycle.html) in the *Amazon S3 API Reference*.\n You must specify at least one of the following properties: ``AbortIncompleteMultipartUpload``, ``ExpirationDate``, ``ExpirationInDays``, ``NoncurrentVersionExpirationInDays``, ``NoncurrentVersionTransition``, ``NoncurrentVersionTransitions``, ``Transition``, or ``Transitions``.",
});

const LambdaConfiguration = Schema.Struct({
  Event: Schema.String.annotate({
    description:
      "The Amazon S3 bucket event for which to invoke the LAMlong function. For more information, see [Supported Event Types](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }),
  Filter: Schema.optionalKey(
    Schema.Struct({
      S3Key: Schema.Struct({
        Rules: Schema.Array(FilterRule)
          .annotate({
            description:
              "A list of containers for the key-value pair that defines the criteria for the filter rule.",
          })
          .check(Schema.isUnique()),
      }).annotate({
        description:
          "A container for object key name prefix and suffix filtering rules.",
      }),
    }).annotate({
      description:
        "The filtering rules that determine which objects invoke the AWS Lambda function. For example, you can create a filter so that only image files with a ``.jpg`` extension invoke the function when they are added to the Amazon S3 bucket.",
    }),
  ),
  Function: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the LAMlong function that Amazon S3 invokes when the specified event type occurs.",
  }),
}).annotate({
  description:
    "Describes the LAMlong functions to invoke and the events for which to invoke them.",
});

const QueueConfiguration = Schema.Struct({
  Event: Schema.String.annotate({
    description:
      "The Amazon S3 bucket event about which you want to publish messages to Amazon SQS. For more information, see [Supported Event Types](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }),
  Filter: Schema.optionalKey(
    Schema.Struct({
      S3Key: Schema.Struct({
        Rules: Schema.Array(FilterRule)
          .annotate({
            description:
              "A list of containers for the key-value pair that defines the criteria for the filter rule.",
          })
          .check(Schema.isUnique()),
      }).annotate({
        description:
          "A container for object key name prefix and suffix filtering rules.",
      }),
    }).annotate({
      description:
        "The filtering rules that determine which objects trigger notifications. For example, you can create a filter so that Amazon S3 sends notifications only when image files with a ``.jpg`` extension are added to the bucket. For more information, see [Configuring event notifications using object key name filtering](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/notification-how-to-filtering.html) in the *Amazon S3 User Guide*.",
    }),
  ),
  Queue: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the Amazon SQS queue to which Amazon S3 publishes a message when it detects events of the specified type. FIFO queues are not allowed when enabling an SQS queue as the event notification destination.",
  }),
}).annotate({
  description:
    "Specifies the configuration for publishing messages to an Amazon Simple Queue Service (Amazon SQS) queue when Amazon S3 detects specified events.",
});

const TopicConfiguration = Schema.Struct({
  Event: Schema.String.annotate({
    description:
      "The Amazon S3 bucket event about which to send notifications. For more information, see [Supported Event Types](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) in the *Amazon S3 User Guide*.",
  }),
  Filter: Schema.optionalKey(
    Schema.Struct({
      S3Key: Schema.Struct({
        Rules: Schema.Array(FilterRule)
          .annotate({
            description:
              "A list of containers for the key-value pair that defines the criteria for the filter rule.",
          })
          .check(Schema.isUnique()),
      }).annotate({
        description:
          "A container for object key name prefix and suffix filtering rules.",
      }),
    }).annotate({
      description:
        "The filtering rules that determine for which objects to send notifications. For example, you can create a filter so that Amazon S3 sends notifications only when image files with a ``.jpg`` extension are added to the bucket.",
    }),
  ),
  Topic: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the Amazon SNS topic to which Amazon S3 publishes a message when it detects events of the specified type.",
  }),
}).annotate({
  description:
    "A container for specifying the configuration for publication of messages to an Amazon Simple Notification Service (Amazon SNS) topic when Amazon S3 detects specified events.",
});

const BucketPropsSource = Schema.Struct({
  AccelerateConfiguration: Schema.optionalKey(
    Schema.Struct({
      AccelerationStatus: Schema.Literals(["Enabled", "Suspended"]).annotate({
        description:
          "Specifies the transfer acceleration status of the bucket.",
      }),
    }).annotate({
      description:
        "Configures the transfer acceleration state for an Amazon S3 bucket. For more information, see [Amazon S3 Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) in the *Amazon S3 User Guide*.",
    }),
  ),
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
      .check(Schema.isUnique()),
  ),
  BucketEncryption: Schema.optionalKey(
    Schema.Struct({
      ServerSideEncryptionConfiguration: Schema.Array(ServerSideEncryptionRule)
        .annotate({
          description:
            "Specifies the default server-side-encryption configuration.",
        })
        .check(Schema.isUnique()),
    }).annotate({
      description:
        "Specifies default encryption for a bucket using server-side encryption with Amazon S3-managed keys (SSE-S3), AWS KMS-managed keys (SSE-KMS), or dual-layer server-side encryption with KMS-managed keys (DSSE-KMS). For information about the Amazon S3 default encryption feature, see [Amazon S3 Default Encryption for S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html) in the *Amazon S3 User Guide*.",
    }),
  ),
  BucketName: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "A name for the bucket. If you don't specify a name, AWS CloudFormation generates a unique ID and uses that ID for the bucket name. The bucket name must contain only lowercase letters, numbers, periods (.), and dashes (-) and must follow [Amazon S3 bucket restrictions and limitations](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html). For more information, see [Rules for naming Amazon S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) in the *Amazon S3 User Guide*. \n  If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you need to replace the resource, specify a new name.",
      }),
      ResourceOutputRefSchema,
    ]),
  ).annotate({
    [CloudFormationPropertyReferencesAnnotationId]: [
      {
        targetCloudFormationType: "AWS::S3::BucketPolicy",
        targetPropertyPath: "/properties/Bucket",
      },
    ],
  }),
  BucketNamePrefix: Schema.optionalKey(
    Schema.String.annotate({ description: "" }),
  ),
  BucketNamespace: Schema.optionalKey(
    Schema.Literals(["global", "account-regional"]).annotate({
      description: "",
    }),
  ),
  CorsConfiguration: Schema.optionalKey(
    Schema.Struct({
      CorsRules: Schema.Array(CorsRule)
        .annotate({
          description:
            "A set of origins and methods (cross-origin access that you want to allow). You can add up to 100 rules to the configuration.",
        })
        .check(Schema.isUnique()),
    }).annotate({
      description:
        "Describes the cross-origin access configuration for objects in an Amazon S3 bucket. For more information, see [Enabling Cross-Origin Resource Sharing](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html) in the *Amazon S3 User Guide*.",
    }),
  ),
  IntelligentTieringConfigurations: Schema.optionalKey(
    Schema.Array(IntelligentTieringConfiguration)
      .annotate({
        description:
          "Defines how Amazon S3 handles Intelligent-Tiering storage.",
      })
      .check(Schema.isUnique()),
  ),
  InventoryConfigurations: Schema.optionalKey(
    Schema.Array(InventoryConfiguration)
      .annotate({
        description:
          "Specifies the S3 Inventory configuration for an Amazon S3 bucket. For more information, see [GET Bucket inventory](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGETInventoryConfig.html) in the *Amazon S3 API Reference*.",
      })
      .check(Schema.isUnique()),
  ),
  LifecycleConfiguration: Schema.optionalKey(
    Schema.Struct({
      Rules: Schema.Array(Rule)
        .annotate({
          description:
            "A lifecycle rule for individual objects in an Amazon S3 bucket.",
        })
        .check(Schema.isUnique()),
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
    }),
  ),
  LoggingConfiguration: Schema.optionalKey(
    Schema.Struct({
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
      TargetObjectKeyFormat: Schema.optionalKey(
        Schema.Union(
          [
            Schema.Struct({
              SimplePrefix: Schema.Struct({}).annotate({
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
        ).annotate({
          description:
            "Amazon S3 key format for log objects. Only one format, either PartitionedPrefix or SimplePrefix, is allowed.",
        }),
      ),
    }).annotate({ description: "Settings that define where logs are stored." }),
  ),
  MetricsConfigurations: Schema.optionalKey(
    Schema.Array(MetricsConfiguration)
      .annotate({
        description:
          "Specifies a metrics configuration for the CloudWatch request metrics (specified by the metrics configuration ID) from an Amazon S3 bucket. If you're updating an existing metrics configuration, note that this is a full replacement of the existing metrics configuration. If you don't include the elements you want to keep, they are erased. For more information, see [PutBucketMetricsConfiguration](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTMetricConfiguration.html).",
      })
      .check(Schema.isUnique()),
  ),
  MetadataTableConfiguration: Schema.optionalKey(
    Schema.Struct({
      S3TablesDestination: Schema.Struct({
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
          "The destination information for the metadata table configuration. The destination table bucket must be in the same Region and AWS-account as the general purpose bucket. The specified metadata table name must be unique within the ``aws_s3_metadata`` namespace in the destination table bucket.",
      }),
    }).annotate({
      description:
        "The metadata table configuration of an S3 general purpose bucket.",
    }),
  ),
  MetadataConfiguration: Schema.optionalKey(
    Schema.Struct({
      Destination: Schema.optionalKey(
        Schema.Struct({
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
          description:
            "The destination information for the S3 Metadata configuration.",
        }),
      ),
      JournalTableConfiguration: Schema.Struct({
        TableName: Schema.optionalKey(
          Schema.String.annotate({
            description: "The name of the journal table.",
          }),
        ),
        TableArn: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The Amazon Resource Name (ARN) for the journal table.",
          }),
        ),
        RecordExpiration: Schema.Struct({
          Expiration: Schema.Literals(["ENABLED", "DISABLED"]).annotate({
            description:
              "Specifies whether journal table record expiration is enabled or disabled.",
          }),
          Days: Schema.optionalKey(
            Schema.Number.annotate({
              description:
                "If you enable journal table record expiration, you can set the number of days to retain your journal table records. Journal table records must be retained for a minimum of 7 days. To set this value, specify any whole number from ``7`` to ``2147483647``. For example, to retain your journal table records for one year, set this value to ``365``.",
            }).check(Schema.isInt()),
          ),
        }).annotate({
          description:
            "The journal table record expiration settings for the journal table.",
        }),
        EncryptionConfiguration: Schema.optionalKey(
          Schema.Struct({
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
            description: "The encryption configuration for the journal table.",
          }),
        ),
      }).annotate({
        description:
          "The journal table configuration for a metadata configuration.",
      }),
      InventoryTableConfiguration: Schema.optionalKey(
        Schema.Struct({
          TableName: Schema.optionalKey(
            Schema.String.annotate({
              description: "The name of the inventory table.",
            }),
          ),
          TableArn: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The Amazon Resource Name (ARN) for the inventory table.",
            }),
          ),
          ConfigurationState: Schema.Literals(["ENABLED", "DISABLED"]).annotate(
            {
              description:
                "The configuration state of the inventory table, indicating whether the inventory table is enabled or disabled.",
            },
          ),
          EncryptionConfiguration: Schema.optionalKey(
            Schema.Struct({
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
                "The encryption configuration for the inventory table.",
            }),
          ),
        }).annotate({
          description:
            "The inventory table configuration for a metadata configuration.",
        }),
      ),
      AnnotationTableConfiguration: Schema.optionalKey(
        Schema.Struct({
          TableName: Schema.optionalKey(
            Schema.String.annotate({
              description: "The name of the annotation table.",
            }),
          ),
          TableArn: Schema.optionalKey(
            Schema.String.annotate({
              description: "The ARN of the annotation table.",
            }),
          ),
          ConfigurationState: Schema.Literals(["ENABLED", "DISABLED"]).annotate(
            {
              description:
                "Specifies whether annotation table configuration is enabled or disabled.",
            },
          ),
          EncryptionConfiguration: Schema.optionalKey(
            Schema.Struct({
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
                "The encryption configuration for the annotation table.",
            }),
          ),
          Role: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The ARN of the IAM role that grants Amazon S3 Metadata permission to read annotations from your bucket.",
            }),
          ),
        }).annotate({ description: "" }),
      ),
    }).annotate({
      description:
        "The S3 Metadata configuration for a general purpose bucket.",
    }),
  ),
  NotificationConfiguration: Schema.optionalKey(
    Schema.Struct({
      EventBridgeConfiguration: Schema.optionalKey(
        Schema.Struct({
          EventBridgeEnabled: Schema.Boolean.annotate({
            description: "Enables delivery of events to Amazon EventBridge.",
            default: "true",
          }),
        }).annotate({
          description: "Enables delivery of events to Amazon EventBridge.",
        }),
      ),
      LambdaConfigurations: Schema.optionalKey(
        Schema.Array(LambdaConfiguration)
          .annotate({
            description:
              "Describes the LAMlong functions to invoke and the events for which to invoke them.",
          })
          .check(Schema.isUnique()),
      ),
      QueueConfigurations: Schema.optionalKey(
        Schema.Array(QueueConfiguration)
          .annotate({
            description:
              "The Amazon Simple Queue Service queues to publish messages to and the events for which to publish messages.",
          })
          .check(Schema.isUnique()),
      ),
      TopicConfigurations: Schema.optionalKey(
        Schema.Array(TopicConfiguration)
          .annotate({
            description:
              "The topic to which notifications are sent and the events for which notifications are generated.",
          })
          .check(Schema.isUnique()),
      ),
    }).annotate({
      description:
        "Configuration that defines how Amazon S3 handles bucket notifications.",
    }),
  ),
  ObjectLockConfiguration: Schema.optionalKey(
    Schema.Struct({
      ObjectLockEnabled: Schema.optionalKey(
        Schema.Literal("Enabled").annotate({
          description:
            "Indicates whether this bucket has an Object Lock configuration enabled. Enable ``ObjectLockEnabled`` when you apply ``ObjectLockConfiguration`` to a bucket.",
        }),
      ),
      Rule: Schema.optionalKey(
        Schema.Struct({
          DefaultRetention: Schema.optionalKey(
            Schema.Struct({
              Years: Schema.optionalKey(
                Schema.Number.annotate({
                  description:
                    "The number of years that you want to specify for the default retention period. If Object Lock is turned on, you must specify ``Mode`` and specify either ``Days`` or ``Years``.",
                }).check(Schema.isInt()),
              ),
              Days: Schema.optionalKey(
                Schema.Number.annotate({
                  description:
                    "The number of days that you want to specify for the default retention period. If Object Lock is turned on, you must specify ``Mode`` and specify either ``Days`` or ``Years``.",
                }).check(Schema.isInt()),
              ),
              Mode: Schema.optionalKey(
                Schema.Literals(["COMPLIANCE", "GOVERNANCE"]).annotate({
                  description:
                    "The default Object Lock retention mode you want to apply to new objects placed in the specified bucket. If Object Lock is turned on, you must specify ``Mode`` and specify either ``Days`` or ``Years``.",
                }),
              ),
            }).annotate({
              description:
                "The default Object Lock retention mode and period that you want to apply to new objects placed in the specified bucket. If Object Lock is turned on, bucket settings require both ``Mode`` and a period of either ``Days`` or ``Years``. You cannot specify ``Days`` and ``Years`` at the same time. For more information about allowable values for mode and period, see [DefaultRetention](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-defaultretention.html).",
            }),
          ),
        }).annotate({
          description:
            "Specifies the Object Lock rule for the specified object. Enable this rule when you apply ``ObjectLockConfiguration`` to a bucket. If Object Lock is turned on, bucket settings require both ``Mode`` and a period of either ``Days`` or ``Years``. You cannot specify ``Days`` and ``Years`` at the same time. For more information, see [ObjectLockRule](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-objectlockrule.html) and [DefaultRetention](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-defaultretention.html).",
        }),
      ),
    }).annotate({
      description:
        "This operation is not supported for directory buckets.\n  Places an Object Lock configuration on the specified bucket. The rule specified in the Object Lock configuration will be applied by default to every new object placed in the specified bucket. For more information, see [Locking Objects](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html). \n   +  The ``DefaultRetention`` settings require both a mode and a period.\n  +  The ``DefaultRetention`` period can be either ``Days`` or ``Years`` but you must select one. You cannot specify ``Days`` and ``Years`` at the same time.\n  +  You can enable Object Lock for new or existing buckets. For more information, see [Configuring Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-configure.html).\n  \n   You must URL encode any signed header values that contain spaces. For example, if your header value is ``my file.txt``, containing two spaces after ``my``, you must URL encode this value to ``my%20%20file.txt``.",
    }),
  ),
  ObjectLockEnabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Indicates whether this bucket has an Object Lock configuration enabled. Enable ``ObjectLockEnabled`` when you apply ``ObjectLockConfiguration`` to a bucket.",
    }),
  ),
  OwnershipControls: Schema.optionalKey(
    Schema.Struct({
      Rules: Schema.Array(OwnershipControlsRule)
        .annotate({
          description:
            "Specifies the container element for Object Ownership rules.",
        })
        .check(Schema.isUnique()),
    }).annotate({
      description:
        "Configuration that defines how Amazon S3 handles Object Ownership rules.",
    }),
  ),
  PublicAccessBlockConfiguration: Schema.optionalKey(
    Schema.Struct({
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
        "Configuration that defines how Amazon S3 handles public access.",
    }),
  ),
  ReplicationConfiguration: Schema.optionalKey(
    Schema.Struct({
      Role: Schema.String.annotate({
        description:
          "The Amazon Resource Name (ARN) of the IAMlong (IAM) role that Amazon S3 assumes when replicating objects. For more information, see [How to Set Up Replication](https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-how-setup.html) in the *Amazon S3 User Guide*.",
      }),
      Rules: Schema.Array(ReplicationRule)
        .annotate({
          description:
            "A container for one or more replication rules. A replication configuration must have at least one rule and can contain a maximum of 1,000 rules.",
        })
        .check(Schema.isUnique()),
    }).annotate({
      description:
        "Configuration for replicating objects in an S3 bucket. To enable replication, you must also enable versioning by using the ``VersioningConfiguration`` property.\n Amazon S3 can store replicated objects in a single destination bucket or multiple destination buckets. The destination bucket or buckets must already exist.",
    }),
  ),
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
  VersioningConfiguration: Schema.optionalKey(
    Schema.Struct({
      Status: Schema.Literals(["Enabled", "Suspended"]).annotate({
        description: "The versioning state of the bucket.",
        default: "Suspended",
      }),
    }).annotate({
      description:
        "Enables multiple versions of all objects in this bucket. You might enable versioning to prevent objects from being deleted or overwritten by mistake or to archive objects so that you can retrieve previous versions of them.\n  When you enable versioning on a bucket for the first time, it might take a short amount of time for the change to be fully propagated. We recommend that you wait for 15 minutes after enabling versioning before issuing write operations (``PUT`` or ``DELETE``) on objects in the bucket.",
    }),
  ),
  WebsiteConfiguration: Schema.optionalKey(
    Schema.Struct({
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
      RedirectAllRequestsTo: Schema.optionalKey(
        Schema.Struct({
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
            "The redirect behavior for every request to this bucket's website endpoint.\n  If you specify this property, you can't specify any other property.",
        }),
      ),
    }).annotate({
      description:
        "Information used to configure the bucket as a static website. For more information, see [Hosting Websites on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).",
    }),
  ),
});

const BucketOutputsSource = Schema.Struct({
  Arn: Schema.optionalKey(
    Schema.String.annotate({
      description: "",
      examples: ["arn:aws:s3:::mybucket"],
    }),
  ),
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
});

export const BucketResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "s3",
  resource: "bucket",
  operation: "create",
  stateSecretOutputKeys: [],
});

export const BucketPropsSchema = annotateResourceSchema(
  BucketPropsSource,
  BucketResourceSchema,
);

export const BucketOutputsSchema = BucketOutputsSource;

export type BucketProps = Schema.Schema.Type<typeof BucketPropsSchema>;

export type BucketOutputs = Schema.Schema.Type<typeof BucketOutputsSchema>;

export type BucketLifecycle = {
  readonly resolvePendingOutputs: (input: {
    readonly key: ResourceKey;
    readonly props: BucketProps;
  }) => ReturnType<(typeof BucketOutputsSchema)["makeEffect"]>;
  readonly execute: (
    command: ResourceCommand,
  ) => ReturnType<(typeof ResourceCommandPolicy)["Service"]["execute"]>;
};

export const BucketLifecycleService = Context.Service<
  BucketLifecycle,
  BucketLifecycle
>("nomoss/providers/aws/generated/s3/bucket/lifecycle");

export const registerBucket = Effect.fn("Bucket.register")(function* (input: {
  readonly key: ResourceKey;
  readonly props: BucketProps;
}) {
  const graphResource = yield* (yield* ResourceGraphBuilder).resource(
    input.key,
  );
  const resourceProps = yield* BucketPropsSchema.makeEffect(input.props);
  const resourceOutputs =
    yield* (yield* BucketLifecycleService).resolvePendingOutputs({
      key: input.key,
      props: resourceProps,
    });
  yield* graphResource.register({
    propsSchema: BucketPropsSchema,
    outputsSchema: BucketOutputsSchema,
    props: resourceProps,
    outputs: resourceOutputs,
  });
  return { key: input.key, props: resourceProps, outputs: resourceOutputs };
});

export const BucketResourceCommandPolicyLayer = Layer.unwrap(
  Effect.map(BucketLifecycleService, (lifecycle) =>
    Layer.succeed(providerCommandPolicyTag(BucketResourceSchema), {
      execute: lifecycle.execute,
    }),
  ),
);
