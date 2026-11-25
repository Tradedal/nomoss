// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripePaymentMethodConfigurationProps = {
  readonly acss_debit?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly affirm?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly afterpay_clearpay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly alipay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly alma?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly amazon_pay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly apple_pay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly apple_pay_later?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly au_becs_debit?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly bacs_debit?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly bancontact?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly billie?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly bizum?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly blik?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly boleto?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly card?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly cartes_bancaires?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly cashapp?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly crypto?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly customer_balance?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly eps?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly fpx?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly fr_meal_voucher_conecs?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly giropay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly google_pay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly grabpay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly ideal?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly jcb?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly kakao_pay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly klarna?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly konbini?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly kr_card?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly link?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly mb_way?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly mobilepay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly multibanco?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly name?: string;
  readonly naver_pay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly nz_bank_account?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly oxxo?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly p24?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly parent?: string;
  readonly pay_by_bank?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly payco?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly paynow?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly paypal?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly paypay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly payto?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly pix?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly promptpay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly revolut_pay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly samsung_pay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly satispay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly scalapay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly sepa_debit?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly sequra?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly sofort?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly sunbit?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly swish?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly twint?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly upi?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly us_bank_account?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly wechat_pay?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly zip?: {
    readonly display_preference?: {
      readonly preference?: "none" | "off" | "on";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
};

export const StripePaymentMethodConfigurationResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "payment-method-configuration",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PaymentMethodConfigurationId"],
  });
export const StripePaymentMethodConfigurationPropsSchema =
  annotateResourceSchema(
    Schema.Struct({
      acss_debit: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Canadian pre-authorized debit payments, check this [page](https://docs.stripe.com/payments/acss-debit) for more details like country availability.",
        }),
      ),
      affirm: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "[Affirm](https://www.affirm.com/) gives your customers a way to split purchases over a series of payments. Depending on the purchase, they can pay with four interest-free payments (Split Pay) or pay over a longer term (Installments), which might include interest. Check this [page](https://docs.stripe.com/payments/affirm) for more details like country availability.",
        }),
      ),
      afterpay_clearpay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Afterpay gives your customers a way to pay for purchases in installments, check this [page](https://docs.stripe.com/payments/afterpay-clearpay) for more details like country availability. Afterpay is particularly popular among businesses selling fashion, beauty, and sports products.",
        }),
      ),
      alipay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Alipay is a digital wallet in China that has more than a billion active users worldwide. Alipay users can pay on the web or on a mobile device using login credentials or their Alipay app. Alipay has a low dispute rate and reduces fraud by authenticating payments using the customer's login credentials. Check this [page](https://docs.stripe.com/payments/alipay) for more details.",
        }),
      ),
      alma: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Alma is a Buy Now, Pay Later payment method that offers customers the ability to pay in 2, 3, or 4 installments.",
        }),
      ),
      amazon_pay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Amazon Pay is a wallet payment method that lets your customers check out the same way as on Amazon.",
        }),
      ),
      apple_pay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Stripe users can accept [Apple Pay](https://stripe.com/payments/apple-pay) in iOS applications in iOS 9 and later, and on the web in Safari starting with iOS 10 or macOS Sierra. There are no additional fees to process Apple Pay payments, and the [pricing](https://stripe.com/pricing) is the same as other card transactions. Check this [page](https://docs.stripe.com/apple-pay) for more details.",
        }),
      ),
      apple_pay_later: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Apple Pay Later, a payment method for customers to buy now and pay later, gives your customers a way to split purchases into four installments across six weeks.",
        }),
      ),
      au_becs_debit: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Stripe users in Australia can accept Bulk Electronic Clearing System (BECS) direct debit payments from customers with an Australian bank account. Check this [page](https://docs.stripe.com/payments/au-becs-debit) for more details.",
        }),
      ),
      bacs_debit: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Stripe users in the UK can accept Bacs Direct Debit payments from customers with a UK bank account, check this [page](https://docs.stripe.com/payments/payment-methods/bacs-debit) for more details.",
        }),
      ),
      bancontact: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Bancontact is the most popular online payment method in Belgium, with over 15 million cards in circulation. [Customers](https://docs.stripe.com/api/customers) use a Bancontact card or mobile app linked to a Belgian bank account to make online payments that are secure, guaranteed, and confirmed immediately. Check this [page](https://docs.stripe.com/payments/bancontact) for more details.",
        }),
      ),
      billie: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Billie is a [single-use](https://docs.stripe.com/payments/payment-methods#usage) payment method that offers businesses Pay by Invoice where they offer payment terms ranging from 7-120 days. Customers are redirected from your website or app, authorize the payment with Billie, then return to your website or app. You get [immediate notification](/payments/payment-methods#payment-notification) of whether the payment succeeded or failed.",
        }),
      ),
      bizum: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "To enable Bizum, buyers need a Spanish IBAN from a bank connected to Bizum. Within their banking app, they can enable Bizum and link their mobile number to their IBAN.",
        }),
      ),
      blik: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "BLIK is a [single use](https://docs.stripe.com/payments/payment-methods#usage) payment method that requires customers to authenticate their payments. When customers want to pay online using BLIK, they request a six-digit code from their banking application and enter it into the payment collection form. Check this [page](https://docs.stripe.com/payments/blik) for more details.",
        }),
      ),
      boleto: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Boleto is an official (regulated by the Central Bank of Brazil) payment method in Brazil. Check this [page](https://docs.stripe.com/payments/boleto) for more details.",
        }),
      ),
      card: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Cards are a popular way for consumers and businesses to pay online or in person. Stripe supports global and local card networks.",
        }),
      ),
      cartes_bancaires: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Cartes Bancaires is France's local card network. More than 95% of these cards are co-branded with either Visa or Mastercard, meaning you can process these cards over either Cartes Bancaires or the Visa or Mastercard networks. Check this [page](https://docs.stripe.com/payments/cartes-bancaires) for more details.",
        }),
      ),
      cashapp: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Cash App is a popular consumer app in the US that allows customers to bank, invest, send, and receive money using their digital wallet. Check this [page](https://docs.stripe.com/payments/cash-app-pay) for more details.",
        }),
      ),
      crypto: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "[Stablecoin payments](https://docs.stripe.com/payments/stablecoin-payments) enable customers to pay in stablecoins like USDC from 100s of wallets including Phantom and Metamask.",
        }),
      ),
      customer_balance: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Uses a customer’s [cash balance](https://docs.stripe.com/payments/customer-balance) for the payment. The cash balance can be funded via a bank transfer. Check this [page](https://docs.stripe.com/payments/bank-transfers) for more details.",
        }),
      ),
      eps: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "EPS is an Austria-based payment method that allows customers to complete transactions online using their bank credentials. EPS is supported by all Austrian banks and is accepted by over 80% of Austrian online retailers. Check this [page](https://docs.stripe.com/payments/eps) for more details.",
        }),
      ),
      expand: Schema.optionalKey(
        Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Specifies which fields in the response should be expanded.",
        }),
      ),
      fpx: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Financial Process Exchange (FPX) is a Malaysia-based payment method that allows customers to complete transactions online using their bank credentials. Bank Negara Malaysia (BNM), the Central Bank of Malaysia, and eleven other major Malaysian financial institutions are members of the PayNet Group, which owns and operates FPX. It is one of the most popular online payment methods in Malaysia, with nearly 90 million transactions in 2018 according to BNM. Check this [page](https://docs.stripe.com/payments/fpx) for more details.",
        }),
      ),
      fr_meal_voucher_conecs: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Meal vouchers in France, or “titres-restaurant”, is a local benefits program commonly offered by employers for their employees to purchase prepared food and beverages on working days. Check this [page](https://docs.stripe.com/payments/meal-vouchers/fr-meal-vouchers) for more details.",
        }),
      ),
      giropay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "giropay is a German payment method based on online banking, introduced in 2006. It allows customers to complete transactions online using their online banking environment, with funds debited from their bank account. Depending on their bank, customers confirm payments on giropay using a second factor of authentication or a PIN. giropay accounts for 10% of online checkouts in Germany. Check this [page](https://docs.stripe.com/payments/giropay) for more details.",
        }),
      ),
      google_pay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Google Pay allows customers to make payments in your app or website using any credit or debit card saved to their Google Account, including those from Google Play, YouTube, Chrome, or an Android device. Use the Google Pay API to request any credit or debit card stored in your customer's Google account. Check this [page](https://docs.stripe.com/google-pay) for more details.",
        }),
      ),
      grabpay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "GrabPay is a payment method developed by [Grab](https://www.grab.com/sg/consumer/finance/pay/). GrabPay is a digital wallet - customers maintain a balance in their wallets that they pay out with. Check this [page](https://docs.stripe.com/payments/grabpay) for more details.",
        }),
      ),
      ideal: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "iDEAL is a Netherlands-based payment method that allows customers to complete transactions online using their bank credentials. All major Dutch banks are members of Currence, the scheme that operates iDEAL, making it the most popular online payment method in the Netherlands with a share of online transactions close to 55%. Check this [page](https://docs.stripe.com/payments/ideal) for more details.",
        }),
      ),
      jcb: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "JCB is a credit card company based in Japan. JCB is currently available in Japan to businesses approved by JCB, and available to all businesses in Australia, Canada, Hong Kong, Japan, New Zealand, Singapore, Switzerland, United Kingdom, United States, and all countries in the European Economic Area except Iceland. Check this [page](https://support.stripe.com/questions/accepting-japan-credit-bureau-%28jcb%29-payments) for more details.",
        }),
      ),
      kakao_pay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Kakao Pay is a popular local wallet available in South Korea.",
        }),
      ),
      klarna: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Klarna gives customers a range of [payment options](https://docs.stripe.com/payments/klarna#payment-options) during checkout. Available payment options vary depending on the customer's billing address and the transaction amount. These payment options make it convenient for customers to purchase items in all price ranges. Check this [page](https://docs.stripe.com/payments/klarna) for more details.",
        }),
      ),
      konbini: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Konbini allows customers in Japan to pay for bills and online purchases at convenience stores with cash. Check this [page](https://docs.stripe.com/payments/konbini) for more details.",
        }),
      ),
      kr_card: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Korean cards let users pay using locally issued cards from South Korea.",
        }),
      ),
      link: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "[Link](https://docs.stripe.com/payments/link) is a payment method network. With Link, users save their payment details once, then reuse that information to pay with one click for any business on the network.",
        }),
      ),
      mb_way: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "MB WAY is the most popular wallet in Portugal. After entering their phone number in your checkout, customers approve the payment directly in their MB WAY app. Check this [page](https://docs.stripe.com/payments/mb-way) for more details.",
        }),
      ),
      mobilepay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "MobilePay is a [single-use](https://docs.stripe.com/payments/payment-methods#usage) card wallet payment method used in Denmark and Finland. It allows customers to [authenticate and approve](https://docs.stripe.com/payments/payment-methods#customer-actions) payments using the MobilePay app. Check this [page](https://docs.stripe.com/payments/mobilepay) for more details.",
        }),
      ),
      multibanco: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Stripe users in Europe and the United States can accept Multibanco payments from customers in Portugal using [Sources](https://stripe.com/docs/sources)—a single integration path for creating payments using any supported method.",
        }),
      ),
      name: Schema.optionalKey(
        Schema.String.annotate({ description: "Configuration name." }).check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        ),
      ),
      naver_pay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Naver Pay is a popular local wallet available in South Korea.",
        }),
      ),
      nz_bank_account: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Stripe users in New Zealand can accept Bulk Electronic Clearing System (BECS) direct debit payments from customers with a New Zeland bank account. Check this [page](https://docs.stripe.com/payments/nz-bank-account) for more details.",
        }),
      ),
      oxxo: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "OXXO is a Mexican chain of convenience stores with thousands of locations across Latin America and represents nearly 20% of online transactions in Mexico. OXXO allows customers to pay bills and online purchases in-store with cash. Check this [page](https://docs.stripe.com/payments/oxxo) for more details.",
        }),
      ),
      p24: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Przelewy24 is a Poland-based payment method aggregator that allows customers to complete transactions online using bank transfers and other methods. Bank transfers account for 30% of online payments in Poland and Przelewy24 provides a way for customers to pay with over 165 banks. Check this [page](https://docs.stripe.com/payments/p24) for more details.",
        }),
      ),
      parent: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Configuration's parent configuration. Specify to create a child configuration.",
        }).check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        ),
      ),
      pay_by_bank: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Pay by bank is a redirect payment method backed by bank transfers. A customer is redirected to their bank to authorize a bank transfer for a given amount. This removes a lot of the error risks inherent in waiting for the customer to initiate a transfer themselves, and is less expensive than card payments.",
        }),
      ),
      payco: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "PAYCO is a [single-use](https://docs.stripe.com/payments/payment-methods#usage local wallet available in South Korea.",
        }),
      ),
      paynow: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "PayNow is a Singapore-based payment method that allows customers to make a payment using their preferred app from participating banks and participating non-bank financial institutions. Check this [page](https://docs.stripe.com/payments/paynow) for more details.",
        }),
      ),
      paypal: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "PayPal, a digital wallet popular with customers in Europe, allows your customers worldwide to pay using their PayPal account. Check this [page](https://docs.stripe.com/payments/paypal) for more details.",
        }),
      ),
      paypay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Customers can pay with PayPay online or using the PayPay app.",
        }),
      ),
      payto: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "PayTo is a [real-time](https://docs.stripe.com/payments/real-time) payment method that enables customers in Australia to pay by providing their bank account details. Customers must accept a mandate authorizing you to debit their account. Check this [page](https://docs.stripe.com/payments/payto) for more details.",
        }),
      ),
      pix: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Pix is a payment method popular in Brazil. When paying with Pix, customers authenticate and approve payments by scanning a QR code in their preferred banking app. Check this [page](https://docs.stripe.com/payments/pix) for more details.",
        }),
      ),
      promptpay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "PromptPay is a Thailand-based payment method that allows customers to make a payment using their preferred app from participating banks. Check this [page](https://docs.stripe.com/payments/promptpay) for more details.",
        }),
      ),
      revolut_pay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Revolut Pay, developed by Revolut, a global finance app, is a digital wallet payment method. Revolut Pay uses the customer’s stored balance or cards to fund the payment, and offers the option for non-Revolut customers to save their details after their first purchase.",
        }),
      ),
      samsung_pay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Samsung Pay is a [single-use](https://docs.stripe.com/payments/payment-methods#usage local wallet available in South Korea.",
        }),
      ),
      satispay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Satispay is a [single-use](/payments/payment-methods#usage) payment method where customers are required to [authenticate](/payments/payment-methods#customer-actions) their payment. Customers pay by being redirected from your website or app, authorizing the payment with Satispay, then returning to your website or app. You get [immediate notification](/payments/payment-methods#payment-notification) of whether the payment succeeded or failed.",
        }),
      ),
      scalapay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Scalapay is a [single-use](/payments/payment-methods#usage) payment method that lets customers pay in 3 or 4 installments. Customers are redirected from your website or app, authorize the payment with Scalapay, then return to your website or app. You get [immediate notification](/payments/payment-methods#payment-notification) of whether the payment succeeded or failed.",
        }),
      ),
      sepa_debit: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "The [Single Euro Payments Area (SEPA)](https://en.wikipedia.org/wiki/Single_Euro_Payments_Area) is an initiative of the European Union to simplify payments within and across member countries. SEPA established and enforced banking standards to allow for the direct debiting of every EUR-denominated bank account within the SEPA region, check this [page](https://docs.stripe.com/payments/sepa-debit) for more details.",
        }),
      ),
      sequra: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "SeQura is a [single-use](https://docs.stripe.com/payments/payment-methods#usage) payment method that offers customers payment terms ranging from 7-120 days. Customers are redirected from your website or app, authorize the payment with SeQura, then return to your website or app. You get [immediate notification](https://docs.stripe.com/payments/payment-methods#payment-notification) of whether the payment succeeded or failed.",
        }),
      ),
      sofort: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Stripe users in Europe and the United States can use the [Payment Intents API](https://stripe.com/docs/payments/payment-intents)—a single integration path for creating payments using any supported method—to accept [Sofort](https://www.sofort.com/) payments from customers. Check this [page](https://docs.stripe.com/payments/sofort) for more details.",
        }),
      ),
      sunbit: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Sunbit is a [single-use](https://docs.stripe.com/payments/payment-methods#usage) payment method where customers choose to pay in 3, 6, or 12 installments. Customers are redirected from your website or app, authorize the payment with Sunbit, then return to your website or app. You get [immediate notification](https://docs.stripe.com/payments/payment-methods#payment-notification) of whether the payment succeeded or failed.",
        }),
      ),
      swish: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Swish is a [real-time](https://docs.stripe.com/payments/real-time) payment method popular in Sweden. It allows customers to [authenticate and approve](https://docs.stripe.com/payments/payment-methods#customer-actions) payments using the Swish mobile app and the Swedish BankID mobile app. Check this [page](https://docs.stripe.com/payments/swish) for more details.",
        }),
      ),
      twint: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Twint is a payment method popular in Switzerland. It allows customers to pay using their mobile phone. Check this [page](https://docs.stripe.com/payments/twint) for more details.",
        }),
      ),
      upi: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Unified Payment Interface (UPI) is India's leading payment method with exponential growth since it launched in 2016.",
        }),
      ),
      us_bank_account: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Stripe users in the United States can accept ACH direct debit payments from customers with a US bank account using the Automated Clearing House (ACH) payments system operated by Nacha. Check this [page](https://docs.stripe.com/payments/ach-direct-debit) for more details.",
        }),
      ),
      wechat_pay: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "WeChat, owned by Tencent, is China's leading mobile app with over 1 billion monthly active users. Chinese consumers can use WeChat Pay to pay for goods and services inside of businesses' apps and websites. WeChat Pay users buy most frequently in gaming, e-commerce, travel, online education, and food/nutrition. Check this [page](https://docs.stripe.com/payments/wechat-pay) for more details.",
        }),
      ),
      zip: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            display_preference: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preference: Schema.optionalKey(
                    Schema.Literals(["none", "off", "on"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "display_preference_param" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "payment_method_param",
          description:
            "Zip gives your customers a way to split purchases over a series of payments. Check this [page](https://docs.stripe.com/payments/zip) for more details like country availability.",
        }),
      ),
    }),
    StripePaymentMethodConfigurationResourceSchema,
  );
