// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaddress, Stripefile } from "./common.js";
import { Stripeissuing_cardholder } from "./issuingCardholders.js";
import { Stripebalance_transaction } from "./transfers.js";

export type Stripeissuing_card = {
  readonly brand: string;
  readonly cancellation_reason?:
    | "design_rejected"
    | "fulfillment_error"
    | "lost"
    | "stolen"
    | null;
  readonly cardholder: Stripeissuing_cardholder;
  readonly created: number;
  readonly currency: string;
  readonly cvc?: string;
  readonly exp_month: number;
  readonly exp_year: number;
  readonly financial_account?: string | null;
  readonly id: string;
  readonly last4: string;
  readonly latest_fraud_warning?: Stripeissuing_card_fraud_warning | null;
  readonly lifecycle_controls?: Stripeissuing_card_lifecycle_controls | null;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly number?: string;
  readonly object: "issuing.card";
  readonly personalization_design?:
    | string
    | Stripeissuing_personalization_design
    | null;
  readonly replaced_by?: string | Stripeissuing_card | null;
  readonly replacement_for?: string | Stripeissuing_card | null;
  readonly replacement_reason?:
    | "damaged"
    | "expired"
    | "fulfillment_error"
    | "lost"
    | "stolen"
    | null;
  readonly second_line?: string | null;
  readonly shipping?: Stripeissuing_card_shipping | null;
  readonly spending_controls: Stripeissuing_card_authorization_controls;
  readonly status: "active" | "canceled" | "inactive";
  readonly type: "physical" | "virtual";
  readonly wallets?: Stripeissuing_card_wallets | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction = {
  readonly amount: number;
  readonly amount_details?: Stripeissuing_transaction_amount_details | null;
  readonly authorization?: string | Stripeissuing_authorization | null;
  readonly balance_transaction?: string | Stripebalance_transaction | null;
  readonly card: string | Stripeissuing_card;
  readonly cardholder?: string | Stripeissuing_cardholder | null;
  readonly created: number;
  readonly currency: string;
  readonly dispute?: string | Stripeissuing_dispute | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly merchant_amount: number;
  readonly merchant_currency: string;
  readonly merchant_data: Stripeissuing_authorization_merchant_data;
  readonly metadata: { readonly [x: string]: string };
  readonly network_data?: Stripeissuing_transaction_network_data | null;
  readonly object: "issuing.transaction";
  readonly purchase_details?: Stripeissuing_transaction_purchase_details | null;
  readonly token?: string | Stripeissuing_token | null;
  readonly treasury?: Stripeissuing_transaction_treasury | null;
  readonly type: "capture" | "refund";
  readonly wallet?: "apple_pay" | "google_pay" | "samsung_pay" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute = {
  readonly amount: number;
  readonly balance_transactions?: ReadonlyArray<Stripebalance_transaction> | null;
  readonly created: number;
  readonly currency: string;
  readonly evidence: Stripeissuing_dispute_evidence;
  readonly id: string;
  readonly livemode: boolean;
  readonly loss_reason?:
    | "cardholder_authentication_issuer_liability"
    | "eci5_token_transaction_with_tavv"
    | "excess_disputes_in_timeframe"
    | "has_not_met_the_minimum_dispute_amount_requirements"
    | "invalid_duplicate_dispute"
    | "invalid_incorrect_amount_dispute"
    | "invalid_no_authorization"
    | "invalid_use_of_disputes"
    | "merchandise_delivered_or_shipped"
    | "merchandise_or_service_as_described"
    | "not_cancelled"
    | "other"
    | "refund_issued"
    | "submitted_beyond_allowable_time_limit"
    | "transaction_3ds_required"
    | "transaction_approved_after_prior_fraud_dispute"
    | "transaction_authorized"
    | "transaction_electronically_read"
    | "transaction_qualifies_for_visa_easy_payment_service"
    | "transaction_unattended";
  readonly metadata: { readonly [x: string]: string };
  readonly object: "issuing.dispute";
  readonly status: "expired" | "lost" | "submitted" | "unsubmitted" | "won";
  readonly transaction: string | Stripeissuing_transaction;
  readonly treasury?: Stripeissuing_dispute_treasury | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization = {
  readonly amount: number;
  readonly amount_details?: Stripeissuing_authorization_amount_details | null;
  readonly approved: boolean;
  readonly authorization_method:
    | "chip"
    | "contactless"
    | "keyed_in"
    | "online"
    | "swipe";
  readonly balance_transactions: ReadonlyArray<Stripebalance_transaction>;
  readonly card: Stripeissuing_card;
  readonly card_presence?: "not_present" | "present" | null;
  readonly cardholder?: string | Stripeissuing_cardholder | null;
  readonly created: number;
  readonly currency: string;
  readonly fleet?: Stripeissuing_authorization_fleet_data | null;
  readonly fraud_challenges?: ReadonlyArray<Stripeissuing_authorization_fraud_challenge> | null;
  readonly fuel?: Stripeissuing_authorization_fuel_data | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly merchant_amount: number;
  readonly merchant_currency: string;
  readonly merchant_data: Stripeissuing_authorization_merchant_data;
  readonly metadata: { readonly [x: string]: string };
  readonly network_data?: Stripeissuing_authorization_network_data | null;
  readonly object: "issuing.authorization";
  readonly pending_request?: Stripeissuing_authorization_pending_request | null;
  readonly request_history: ReadonlyArray<Stripeissuing_authorization_request>;
  readonly status: "closed" | "expired" | "pending" | "reversed";
  readonly token?: string | Stripeissuing_token | null;
  readonly transactions: ReadonlyArray<Stripeissuing_transaction>;
  readonly treasury?: Stripeissuing_authorization_treasury | null;
  readonly verification_data: Stripeissuing_authorization_verification_data;
  readonly verified_by_fraud_challenge?: boolean | null;
  readonly wallet?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_amount_details = {
  readonly atm_fee?: number | null;
  readonly cashback_amount?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_fraud_warning = {
  readonly started_at?: number | null;
  readonly type?:
    | "card_testing_exposure"
    | "fraud_dispute_filed"
    | "third_party_reported"
    | "user_indicated_fraud"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_lifecycle_conditions = {
  readonly payment_count: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_personalization_design_carrier_text = {
  readonly footer_body?: string | null;
  readonly footer_title?: string | null;
  readonly header_body?: string | null;
  readonly header_title?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_physical_bundle_features = {
  readonly card_logo: "optional" | "required" | "unsupported";
  readonly carrier_text: "optional" | "required" | "unsupported";
  readonly second_line: "optional" | "required" | "unsupported";
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_personalization_design_preferences = {
  readonly is_default: boolean;
  readonly is_platform_default?: boolean | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_personalization_design_rejection_reasons = {
  readonly card_logo?: ReadonlyArray<
    | "geographic_location"
    | "inappropriate"
    | "network_name"
    | "non_binary_image"
    | "non_fiat_currency"
    | "other"
    | "other_entity"
    | "promotional_material"
  > | null;
  readonly carrier_text?: ReadonlyArray<
    | "geographic_location"
    | "inappropriate"
    | "network_name"
    | "non_fiat_currency"
    | "other"
    | "other_entity"
    | "promotional_material"
  > | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_shipping_customs = {
  readonly eori_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_spending_limit = {
  readonly amount: number;
  readonly categories?: ReadonlyArray<
    | "ac_refrigeration_repair"
    | "accounting_bookkeeping_services"
    | "advertising_services"
    | "agricultural_cooperative"
    | "airlines_air_carriers"
    | "airports_flying_fields"
    | "ambulance_services"
    | "amusement_parks_carnivals"
    | "antique_reproductions"
    | "antique_shops"
    | "aquariums"
    | "architectural_surveying_services"
    | "art_dealers_and_galleries"
    | "artists_supply_and_craft_shops"
    | "auto_and_home_supply_stores"
    | "auto_body_repair_shops"
    | "auto_paint_shops"
    | "auto_service_shops"
    | "automated_cash_disburse"
    | "automated_fuel_dispensers"
    | "automobile_associations"
    | "automotive_parts_and_accessories_stores"
    | "automotive_tire_stores"
    | "bail_and_bond_payments"
    | "bakeries"
    | "bands_orchestras"
    | "barber_and_beauty_shops"
    | "betting_casino_gambling"
    | "bicycle_shops"
    | "billiard_pool_establishments"
    | "boat_dealers"
    | "boat_rentals_and_leases"
    | "book_stores"
    | "books_periodicals_and_newspapers"
    | "bowling_alleys"
    | "bus_lines"
    | "business_secretarial_schools"
    | "buying_shopping_services"
    | "cable_satellite_and_other_pay_television_and_radio"
    | "camera_and_photographic_supply_stores"
    | "candy_nut_and_confectionery_stores"
    | "car_and_truck_dealers_new_used"
    | "car_and_truck_dealers_used_only"
    | "car_rental_agencies"
    | "car_washes"
    | "carpentry_services"
    | "carpet_upholstery_cleaning"
    | "caterers"
    | "charitable_and_social_service_organizations_fundraising"
    | "chemicals_and_allied_products"
    | "child_care_services"
    | "childrens_and_infants_wear_stores"
    | "chiropodists_podiatrists"
    | "chiropractors"
    | "cigar_stores_and_stands"
    | "civic_social_fraternal_associations"
    | "cleaning_and_maintenance"
    | "clothing_rental"
    | "colleges_universities"
    | "commercial_equipment"
    | "commercial_footwear"
    | "commercial_photography_art_and_graphics"
    | "commuter_transport_and_ferries"
    | "computer_network_services"
    | "computer_programming"
    | "computer_repair"
    | "computer_software_stores"
    | "computers_peripherals_and_software"
    | "concrete_work_services"
    | "construction_materials"
    | "consulting_public_relations"
    | "correspondence_schools"
    | "cosmetic_stores"
    | "counseling_services"
    | "country_clubs"
    | "courier_services"
    | "court_costs"
    | "credit_reporting_agencies"
    | "cruise_lines"
    | "dairy_products_stores"
    | "dance_hall_studios_schools"
    | "dating_escort_services"
    | "dentists_orthodontists"
    | "department_stores"
    | "detective_agencies"
    | "digital_goods_applications"
    | "digital_goods_games"
    | "digital_goods_large_volume"
    | "digital_goods_media"
    | "direct_marketing_catalog_merchant"
    | "direct_marketing_combination_catalog_and_retail_merchant"
    | "direct_marketing_inbound_telemarketing"
    | "direct_marketing_insurance_services"
    | "direct_marketing_other"
    | "direct_marketing_outbound_telemarketing"
    | "direct_marketing_subscription"
    | "direct_marketing_travel"
    | "discount_stores"
    | "doctors"
    | "door_to_door_sales"
    | "drapery_window_covering_and_upholstery_stores"
    | "drinking_places"
    | "drug_stores_and_pharmacies"
    | "drugs_drug_proprietaries_and_druggist_sundries"
    | "dry_cleaners"
    | "durable_goods"
    | "duty_free_stores"
    | "eating_places_restaurants"
    | "educational_services"
    | "electric_razor_stores"
    | "electric_vehicle_charging"
    | "electrical_parts_and_equipment"
    | "electrical_services"
    | "electronics_repair_shops"
    | "electronics_stores"
    | "elementary_secondary_schools"
    | "emergency_services_gcas_visa_use_only"
    | "employment_temp_agencies"
    | "equipment_rental"
    | "exterminating_services"
    | "family_clothing_stores"
    | "fast_food_restaurants"
    | "financial_institutions"
    | "fines_government_administrative_entities"
    | "fireplace_fireplace_screens_and_accessories_stores"
    | "floor_covering_stores"
    | "florists"
    | "florists_supplies_nursery_stock_and_flowers"
    | "freezer_and_locker_meat_provisioners"
    | "fuel_dealers_non_automotive"
    | "funeral_services_crematories"
    | "furniture_home_furnishings_and_equipment_stores_except_appliances"
    | "furniture_repair_refinishing"
    | "furriers_and_fur_shops"
    | "general_services"
    | "gift_card_novelty_and_souvenir_shops"
    | "glass_paint_and_wallpaper_stores"
    | "glassware_crystal_stores"
    | "golf_courses_public"
    | "government_licensed_horse_dog_racing_us_region_only"
    | "government_licensed_online_casions_online_gambling_us_region_only"
    | "government_owned_lotteries_non_us_region"
    | "government_owned_lotteries_us_region_only"
    | "government_services"
    | "grocery_stores_supermarkets"
    | "hardware_equipment_and_supplies"
    | "hardware_stores"
    | "health_and_beauty_spas"
    | "hearing_aids_sales_and_supplies"
    | "heating_plumbing_a_c"
    | "hobby_toy_and_game_shops"
    | "home_supply_warehouse_stores"
    | "hospitals"
    | "hotels_motels_and_resorts"
    | "household_appliance_stores"
    | "industrial_supplies"
    | "information_retrieval_services"
    | "insurance_default"
    | "insurance_underwriting_premiums"
    | "intra_company_purchases"
    | "jewelry_stores_watches_clocks_and_silverware_stores"
    | "landscaping_services"
    | "laundries"
    | "laundry_cleaning_services"
    | "legal_services_attorneys"
    | "luggage_and_leather_goods_stores"
    | "lumber_building_materials_stores"
    | "manual_cash_disburse"
    | "marinas_service_and_supplies"
    | "marketplaces"
    | "masonry_stonework_and_plaster"
    | "massage_parlors"
    | "medical_and_dental_labs"
    | "medical_dental_ophthalmic_and_hospital_equipment_and_supplies"
    | "medical_services"
    | "membership_organizations"
    | "mens_and_boys_clothing_and_accessories_stores"
    | "mens_womens_clothing_stores"
    | "metal_service_centers"
    | "miscellaneous"
    | "miscellaneous_apparel_and_accessory_shops"
    | "miscellaneous_auto_dealers"
    | "miscellaneous_business_services"
    | "miscellaneous_food_stores"
    | "miscellaneous_general_merchandise"
    | "miscellaneous_general_services"
    | "miscellaneous_home_furnishing_specialty_stores"
    | "miscellaneous_publishing_and_printing"
    | "miscellaneous_recreation_services"
    | "miscellaneous_repair_shops"
    | "miscellaneous_specialty_retail"
    | "mobile_home_dealers"
    | "motion_picture_theaters"
    | "motor_freight_carriers_and_trucking"
    | "motor_homes_dealers"
    | "motor_vehicle_supplies_and_new_parts"
    | "motorcycle_shops_and_dealers"
    | "motorcycle_shops_dealers"
    | "music_stores_musical_instruments_pianos_and_sheet_music"
    | "news_dealers_and_newsstands"
    | "non_fi_money_orders"
    | "non_fi_stored_value_card_purchase_load"
    | "nondurable_goods"
    | "nurseries_lawn_and_garden_supply_stores"
    | "nursing_personal_care"
    | "office_and_commercial_furniture"
    | "opticians_eyeglasses"
    | "optometrists_ophthalmologist"
    | "orthopedic_goods_prosthetic_devices"
    | "osteopaths"
    | "package_stores_beer_wine_and_liquor"
    | "paints_varnishes_and_supplies"
    | "parking_lots_garages"
    | "passenger_railways"
    | "pawn_shops"
    | "pet_shops_pet_food_and_supplies"
    | "petroleum_and_petroleum_products"
    | "photo_developing"
    | "photographic_photocopy_microfilm_equipment_and_supplies"
    | "photographic_studios"
    | "picture_video_production"
    | "piece_goods_notions_and_other_dry_goods"
    | "plumbing_heating_equipment_and_supplies"
    | "political_organizations"
    | "postal_services_government_only"
    | "precious_stones_and_metals_watches_and_jewelry"
    | "professional_services"
    | "public_warehousing_and_storage"
    | "quick_copy_repro_and_blueprint"
    | "railroads"
    | "real_estate_agents_and_managers_rentals"
    | "record_stores"
    | "recreational_vehicle_rentals"
    | "religious_goods_stores"
    | "religious_organizations"
    | "roofing_siding_sheet_metal"
    | "secretarial_support_services"
    | "security_brokers_dealers"
    | "service_stations"
    | "sewing_needlework_fabric_and_piece_goods_stores"
    | "shoe_repair_hat_cleaning"
    | "shoe_stores"
    | "small_appliance_repair"
    | "snowmobile_dealers"
    | "special_trade_services"
    | "specialty_cleaning"
    | "sporting_goods_stores"
    | "sporting_recreation_camps"
    | "sports_and_riding_apparel_stores"
    | "sports_clubs_fields"
    | "stamp_and_coin_stores"
    | "stationary_office_supplies_printing_and_writing_paper"
    | "stationery_stores_office_and_school_supply_stores"
    | "swimming_pools_sales"
    | "t_ui_travel_germany"
    | "tailors_alterations"
    | "tax_payments_government_agencies"
    | "tax_preparation_services"
    | "taxicabs_limousines"
    | "telecommunication_equipment_and_telephone_sales"
    | "telecommunication_services"
    | "telegraph_services"
    | "tent_and_awning_shops"
    | "testing_laboratories"
    | "theatrical_ticket_agencies"
    | "timeshares"
    | "tire_retreading_and_repair"
    | "tolls_bridge_fees"
    | "tourist_attractions_and_exhibits"
    | "towing_services"
    | "trailer_parks_campgrounds"
    | "transportation_services"
    | "travel_agencies_tour_operators"
    | "truck_stop_iteration"
    | "truck_utility_trailer_rentals"
    | "typesetting_plate_making_and_related_services"
    | "typewriter_stores"
    | "u_s_federal_government_agencies_or_departments"
    | "uniforms_commercial_clothing"
    | "used_merchandise_and_secondhand_stores"
    | "utilities"
    | "variety_stores"
    | "veterinary_services"
    | "video_amusement_game_supplies"
    | "video_game_arcades"
    | "video_tape_rental_stores"
    | "vocational_trade_schools"
    | "watch_jewelry_repair"
    | "welding_repair"
    | "wholesale_clubs"
    | "wig_and_toupee_stores"
    | "wires_money_orders"
    | "womens_accessory_and_specialty_shops"
    | "womens_ready_to_wear_stores"
    | "wrecking_and_salvage_yards"
  > | null;
  readonly interval:
    | "all_time"
    | "daily"
    | "monthly"
    | "per_authorization"
    | "weekly"
    | "yearly";
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_apple_pay = {
  readonly eligible: boolean;
  readonly ineligible_reason?:
    | "missing_agreement"
    | "missing_cardholder_contact"
    | "unsupported_region"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_google_pay = {
  readonly eligible: boolean;
  readonly ineligible_reason?:
    | "missing_agreement"
    | "missing_cardholder_contact"
    | "unsupported_region"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_fleet_cardholder_prompt_data = {
  readonly alphanumeric_id?: string | null;
  readonly driver_id?: string | null;
  readonly odometer?: number | null;
  readonly unspecified_id?: string | null;
  readonly user_id?: string | null;
  readonly vehicle_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_fleet_fuel_price_data = {
  readonly gross_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_fleet_non_fuel_price_data = {
  readonly gross_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_fleet_tax_data = {
  readonly local_amount_decimal?: string | null;
  readonly national_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_fraud_challenge = {
  readonly channel: "sms";
  readonly status:
    | "expired"
    | "pending"
    | "rejected"
    | "undeliverable"
    | "verified";
  readonly undeliverable_reason?:
    | "no_phone_number"
    | "unsupported_phone_number"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_fuel_data = {
  readonly industry_product_code?: string | null;
  readonly quantity_decimal?: string | null;
  readonly type?:
    | "diesel"
    | "other"
    | "unleaded_plus"
    | "unleaded_regular"
    | "unleaded_super"
    | null;
  readonly unit?:
    | "charging_minute"
    | "imperial_gallon"
    | "kilogram"
    | "kilowatt_hour"
    | "liter"
    | "other"
    | "pound"
    | "us_gallon"
    | null;
  readonly unit_cost_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_merchant_data = {
  readonly category: string;
  readonly category_code: string;
  readonly city?: string | null;
  readonly country?: string | null;
  readonly name?: string | null;
  readonly network_id: string;
  readonly postal_code?: string | null;
  readonly state?: string | null;
  readonly tax_id?: string | null;
  readonly terminal_id?: string | null;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_network_data = {
  readonly acquiring_institution_id?: string | null;
  readonly system_trace_audit_number?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_network_token_device = {
  readonly device_fingerprint?: string;
  readonly ip_address?: string;
  readonly location?: string;
  readonly name?: string;
  readonly phone_number?: string;
  readonly type?: "other" | "phone" | "watch";
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_network_token_mastercard = {
  readonly card_reference_id?: string;
  readonly token_reference_id: string;
  readonly token_requestor_id: string;
  readonly token_requestor_name?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_network_token_visa = {
  readonly card_reference_id?: string | null;
  readonly token_reference_id: string;
  readonly token_requestor_id: string;
  readonly token_risk_score?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_network_token_address = {
  readonly line1: string;
  readonly postal_code: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_amount_details = {
  readonly atm_fee?: number | null;
  readonly cashback_amount?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_canceled_evidence = {
  readonly additional_documentation?: string | Stripefile | null;
  readonly canceled_at?: number | null;
  readonly cancellation_policy_provided?: boolean | null;
  readonly cancellation_reason?: string | null;
  readonly expected_at?: number | null;
  readonly explanation?: string | null;
  readonly product_description?: string | null;
  readonly product_type?: "merchandise" | "service" | null;
  readonly return_status?: "merchant_rejected" | "successful" | null;
  readonly returned_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_duplicate_evidence = {
  readonly additional_documentation?: string | Stripefile | null;
  readonly card_statement?: string | Stripefile | null;
  readonly cash_receipt?: string | Stripefile | null;
  readonly check_image?: string | Stripefile | null;
  readonly explanation?: string | null;
  readonly original_transaction?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_fraudulent_evidence = {
  readonly additional_documentation?: string | Stripefile | null;
  readonly explanation?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_merchandise_not_as_described_evidence = {
  readonly additional_documentation?: string | Stripefile | null;
  readonly explanation?: string | null;
  readonly received_at?: number | null;
  readonly return_description?: string | null;
  readonly return_status?: "merchant_rejected" | "successful" | null;
  readonly returned_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_no_valid_authorization_evidence = {
  readonly additional_documentation?: string | Stripefile | null;
  readonly explanation?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_not_received_evidence = {
  readonly additional_documentation?: string | Stripefile | null;
  readonly expected_at?: number | null;
  readonly explanation?: string | null;
  readonly product_description?: string | null;
  readonly product_type?: "merchandise" | "service" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_other_evidence = {
  readonly additional_documentation?: string | Stripefile | null;
  readonly explanation?: string | null;
  readonly product_description?: string | null;
  readonly product_type?: "merchandise" | "service" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_service_not_as_described_evidence = {
  readonly additional_documentation?: string | Stripefile | null;
  readonly canceled_at?: number | null;
  readonly cancellation_reason?: string | null;
  readonly explanation?: string | null;
  readonly received_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_treasury = {
  readonly debit_reversal?: string | null;
  readonly received_debit: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_network_data = {
  readonly authorization_code?: string | null;
  readonly processing_date?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_fleet_cardholder_prompt_data = {
  readonly driver_id?: string | null;
  readonly odometer?: number | null;
  readonly unspecified_id?: string | null;
  readonly user_id?: string | null;
  readonly vehicle_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_fleet_fuel_price_data = {
  readonly gross_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_fleet_non_fuel_price_data = {
  readonly gross_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_fleet_tax_data = {
  readonly local_amount_decimal?: string | null;
  readonly national_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_flight_data_leg = {
  readonly arrival_airport_code?: string | null;
  readonly carrier?: string | null;
  readonly departure_airport_code?: string | null;
  readonly flight_number?: string | null;
  readonly service_class?: string | null;
  readonly stopover_allowed?: boolean | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_fuel_data = {
  readonly industry_product_code?: string | null;
  readonly quantity_decimal?: string | null;
  readonly type: string;
  readonly unit: string;
  readonly unit_cost_decimal: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_lodging_data = {
  readonly check_in_at?: number | null;
  readonly nights?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_receipt_data = {
  readonly description?: string | null;
  readonly quantity?: number | null;
  readonly total?: number | null;
  readonly unit_cost?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_treasury = {
  readonly received_credit?: string | null;
  readonly received_debit?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_treasury = {
  readonly received_credits: ReadonlyArray<string>;
  readonly received_debits: ReadonlyArray<string>;
  readonly transaction?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_authentication_exemption = {
  readonly claimed_by: "acquirer" | "issuer";
  readonly type:
    | "low_value_transaction"
    | "transaction_risk_analysis"
    | "unknown";
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_three_d_secure = {
  readonly result:
    | "attempt_acknowledged"
    | "authenticated"
    | "failed"
    | "required";
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_shipping_address_validation = {
  readonly mode:
    | "disabled"
    | "normalization_only"
    | "validation_and_normalization";
  readonly normalized_address?: Stripeaddress | null;
  readonly result?:
    | "indeterminate"
    | "likely_deliverable"
    | "likely_undeliverable"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_pending_request = {
  readonly amount: number;
  readonly amount_details?: Stripeissuing_authorization_amount_details | null;
  readonly currency: string;
  readonly is_amount_controllable: boolean;
  readonly merchant_amount: number;
  readonly merchant_currency: string;
  readonly network_risk_score?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_request = {
  readonly amount: number;
  readonly amount_details?: Stripeissuing_authorization_amount_details | null;
  readonly approved: boolean;
  readonly authorization_code?: string | null;
  readonly created: number;
  readonly currency: string;
  readonly merchant_amount: number;
  readonly merchant_currency: string;
  readonly network_risk_score?: number | null;
  readonly reason:
    | "account_disabled"
    | "card_active"
    | "card_canceled"
    | "card_expired"
    | "card_inactive"
    | "cardholder_blocked"
    | "cardholder_inactive"
    | "cardholder_verification_required"
    | "insecure_authorization_method"
    | "insufficient_funds"
    | "network_fallback"
    | "not_allowed"
    | "pin_blocked"
    | "spending_controls"
    | "stripe_internal_error"
    | "suspected_fraud"
    | "verification_failed"
    | "webhook_approved"
    | "webhook_declined"
    | "webhook_error"
    | "webhook_timeout";
  readonly reason_message?: string | null;
  readonly requested_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_lifecycle_controls = {
  readonly cancel_after: Stripeissuing_card_lifecycle_conditions;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_physical_bundle = {
  readonly features: Stripeissuing_physical_bundle_features;
  readonly id: string;
  readonly livemode: boolean;
  readonly name: string;
  readonly object: "issuing.physical_bundle";
  readonly status: "active" | "inactive" | "review";
  readonly type: "custom" | "standard";
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_authorization_controls = {
  readonly allowed_card_presences?: ReadonlyArray<
    "not_present" | "present"
  > | null;
  readonly allowed_categories?: ReadonlyArray<
    | "ac_refrigeration_repair"
    | "accounting_bookkeeping_services"
    | "advertising_services"
    | "agricultural_cooperative"
    | "airlines_air_carriers"
    | "airports_flying_fields"
    | "ambulance_services"
    | "amusement_parks_carnivals"
    | "antique_reproductions"
    | "antique_shops"
    | "aquariums"
    | "architectural_surveying_services"
    | "art_dealers_and_galleries"
    | "artists_supply_and_craft_shops"
    | "auto_and_home_supply_stores"
    | "auto_body_repair_shops"
    | "auto_paint_shops"
    | "auto_service_shops"
    | "automated_cash_disburse"
    | "automated_fuel_dispensers"
    | "automobile_associations"
    | "automotive_parts_and_accessories_stores"
    | "automotive_tire_stores"
    | "bail_and_bond_payments"
    | "bakeries"
    | "bands_orchestras"
    | "barber_and_beauty_shops"
    | "betting_casino_gambling"
    | "bicycle_shops"
    | "billiard_pool_establishments"
    | "boat_dealers"
    | "boat_rentals_and_leases"
    | "book_stores"
    | "books_periodicals_and_newspapers"
    | "bowling_alleys"
    | "bus_lines"
    | "business_secretarial_schools"
    | "buying_shopping_services"
    | "cable_satellite_and_other_pay_television_and_radio"
    | "camera_and_photographic_supply_stores"
    | "candy_nut_and_confectionery_stores"
    | "car_and_truck_dealers_new_used"
    | "car_and_truck_dealers_used_only"
    | "car_rental_agencies"
    | "car_washes"
    | "carpentry_services"
    | "carpet_upholstery_cleaning"
    | "caterers"
    | "charitable_and_social_service_organizations_fundraising"
    | "chemicals_and_allied_products"
    | "child_care_services"
    | "childrens_and_infants_wear_stores"
    | "chiropodists_podiatrists"
    | "chiropractors"
    | "cigar_stores_and_stands"
    | "civic_social_fraternal_associations"
    | "cleaning_and_maintenance"
    | "clothing_rental"
    | "colleges_universities"
    | "commercial_equipment"
    | "commercial_footwear"
    | "commercial_photography_art_and_graphics"
    | "commuter_transport_and_ferries"
    | "computer_network_services"
    | "computer_programming"
    | "computer_repair"
    | "computer_software_stores"
    | "computers_peripherals_and_software"
    | "concrete_work_services"
    | "construction_materials"
    | "consulting_public_relations"
    | "correspondence_schools"
    | "cosmetic_stores"
    | "counseling_services"
    | "country_clubs"
    | "courier_services"
    | "court_costs"
    | "credit_reporting_agencies"
    | "cruise_lines"
    | "dairy_products_stores"
    | "dance_hall_studios_schools"
    | "dating_escort_services"
    | "dentists_orthodontists"
    | "department_stores"
    | "detective_agencies"
    | "digital_goods_applications"
    | "digital_goods_games"
    | "digital_goods_large_volume"
    | "digital_goods_media"
    | "direct_marketing_catalog_merchant"
    | "direct_marketing_combination_catalog_and_retail_merchant"
    | "direct_marketing_inbound_telemarketing"
    | "direct_marketing_insurance_services"
    | "direct_marketing_other"
    | "direct_marketing_outbound_telemarketing"
    | "direct_marketing_subscription"
    | "direct_marketing_travel"
    | "discount_stores"
    | "doctors"
    | "door_to_door_sales"
    | "drapery_window_covering_and_upholstery_stores"
    | "drinking_places"
    | "drug_stores_and_pharmacies"
    | "drugs_drug_proprietaries_and_druggist_sundries"
    | "dry_cleaners"
    | "durable_goods"
    | "duty_free_stores"
    | "eating_places_restaurants"
    | "educational_services"
    | "electric_razor_stores"
    | "electric_vehicle_charging"
    | "electrical_parts_and_equipment"
    | "electrical_services"
    | "electronics_repair_shops"
    | "electronics_stores"
    | "elementary_secondary_schools"
    | "emergency_services_gcas_visa_use_only"
    | "employment_temp_agencies"
    | "equipment_rental"
    | "exterminating_services"
    | "family_clothing_stores"
    | "fast_food_restaurants"
    | "financial_institutions"
    | "fines_government_administrative_entities"
    | "fireplace_fireplace_screens_and_accessories_stores"
    | "floor_covering_stores"
    | "florists"
    | "florists_supplies_nursery_stock_and_flowers"
    | "freezer_and_locker_meat_provisioners"
    | "fuel_dealers_non_automotive"
    | "funeral_services_crematories"
    | "furniture_home_furnishings_and_equipment_stores_except_appliances"
    | "furniture_repair_refinishing"
    | "furriers_and_fur_shops"
    | "general_services"
    | "gift_card_novelty_and_souvenir_shops"
    | "glass_paint_and_wallpaper_stores"
    | "glassware_crystal_stores"
    | "golf_courses_public"
    | "government_licensed_horse_dog_racing_us_region_only"
    | "government_licensed_online_casions_online_gambling_us_region_only"
    | "government_owned_lotteries_non_us_region"
    | "government_owned_lotteries_us_region_only"
    | "government_services"
    | "grocery_stores_supermarkets"
    | "hardware_equipment_and_supplies"
    | "hardware_stores"
    | "health_and_beauty_spas"
    | "hearing_aids_sales_and_supplies"
    | "heating_plumbing_a_c"
    | "hobby_toy_and_game_shops"
    | "home_supply_warehouse_stores"
    | "hospitals"
    | "hotels_motels_and_resorts"
    | "household_appliance_stores"
    | "industrial_supplies"
    | "information_retrieval_services"
    | "insurance_default"
    | "insurance_underwriting_premiums"
    | "intra_company_purchases"
    | "jewelry_stores_watches_clocks_and_silverware_stores"
    | "landscaping_services"
    | "laundries"
    | "laundry_cleaning_services"
    | "legal_services_attorneys"
    | "luggage_and_leather_goods_stores"
    | "lumber_building_materials_stores"
    | "manual_cash_disburse"
    | "marinas_service_and_supplies"
    | "marketplaces"
    | "masonry_stonework_and_plaster"
    | "massage_parlors"
    | "medical_and_dental_labs"
    | "medical_dental_ophthalmic_and_hospital_equipment_and_supplies"
    | "medical_services"
    | "membership_organizations"
    | "mens_and_boys_clothing_and_accessories_stores"
    | "mens_womens_clothing_stores"
    | "metal_service_centers"
    | "miscellaneous"
    | "miscellaneous_apparel_and_accessory_shops"
    | "miscellaneous_auto_dealers"
    | "miscellaneous_business_services"
    | "miscellaneous_food_stores"
    | "miscellaneous_general_merchandise"
    | "miscellaneous_general_services"
    | "miscellaneous_home_furnishing_specialty_stores"
    | "miscellaneous_publishing_and_printing"
    | "miscellaneous_recreation_services"
    | "miscellaneous_repair_shops"
    | "miscellaneous_specialty_retail"
    | "mobile_home_dealers"
    | "motion_picture_theaters"
    | "motor_freight_carriers_and_trucking"
    | "motor_homes_dealers"
    | "motor_vehicle_supplies_and_new_parts"
    | "motorcycle_shops_and_dealers"
    | "motorcycle_shops_dealers"
    | "music_stores_musical_instruments_pianos_and_sheet_music"
    | "news_dealers_and_newsstands"
    | "non_fi_money_orders"
    | "non_fi_stored_value_card_purchase_load"
    | "nondurable_goods"
    | "nurseries_lawn_and_garden_supply_stores"
    | "nursing_personal_care"
    | "office_and_commercial_furniture"
    | "opticians_eyeglasses"
    | "optometrists_ophthalmologist"
    | "orthopedic_goods_prosthetic_devices"
    | "osteopaths"
    | "package_stores_beer_wine_and_liquor"
    | "paints_varnishes_and_supplies"
    | "parking_lots_garages"
    | "passenger_railways"
    | "pawn_shops"
    | "pet_shops_pet_food_and_supplies"
    | "petroleum_and_petroleum_products"
    | "photo_developing"
    | "photographic_photocopy_microfilm_equipment_and_supplies"
    | "photographic_studios"
    | "picture_video_production"
    | "piece_goods_notions_and_other_dry_goods"
    | "plumbing_heating_equipment_and_supplies"
    | "political_organizations"
    | "postal_services_government_only"
    | "precious_stones_and_metals_watches_and_jewelry"
    | "professional_services"
    | "public_warehousing_and_storage"
    | "quick_copy_repro_and_blueprint"
    | "railroads"
    | "real_estate_agents_and_managers_rentals"
    | "record_stores"
    | "recreational_vehicle_rentals"
    | "religious_goods_stores"
    | "religious_organizations"
    | "roofing_siding_sheet_metal"
    | "secretarial_support_services"
    | "security_brokers_dealers"
    | "service_stations"
    | "sewing_needlework_fabric_and_piece_goods_stores"
    | "shoe_repair_hat_cleaning"
    | "shoe_stores"
    | "small_appliance_repair"
    | "snowmobile_dealers"
    | "special_trade_services"
    | "specialty_cleaning"
    | "sporting_goods_stores"
    | "sporting_recreation_camps"
    | "sports_and_riding_apparel_stores"
    | "sports_clubs_fields"
    | "stamp_and_coin_stores"
    | "stationary_office_supplies_printing_and_writing_paper"
    | "stationery_stores_office_and_school_supply_stores"
    | "swimming_pools_sales"
    | "t_ui_travel_germany"
    | "tailors_alterations"
    | "tax_payments_government_agencies"
    | "tax_preparation_services"
    | "taxicabs_limousines"
    | "telecommunication_equipment_and_telephone_sales"
    | "telecommunication_services"
    | "telegraph_services"
    | "tent_and_awning_shops"
    | "testing_laboratories"
    | "theatrical_ticket_agencies"
    | "timeshares"
    | "tire_retreading_and_repair"
    | "tolls_bridge_fees"
    | "tourist_attractions_and_exhibits"
    | "towing_services"
    | "trailer_parks_campgrounds"
    | "transportation_services"
    | "travel_agencies_tour_operators"
    | "truck_stop_iteration"
    | "truck_utility_trailer_rentals"
    | "typesetting_plate_making_and_related_services"
    | "typewriter_stores"
    | "u_s_federal_government_agencies_or_departments"
    | "uniforms_commercial_clothing"
    | "used_merchandise_and_secondhand_stores"
    | "utilities"
    | "variety_stores"
    | "veterinary_services"
    | "video_amusement_game_supplies"
    | "video_game_arcades"
    | "video_tape_rental_stores"
    | "vocational_trade_schools"
    | "watch_jewelry_repair"
    | "welding_repair"
    | "wholesale_clubs"
    | "wig_and_toupee_stores"
    | "wires_money_orders"
    | "womens_accessory_and_specialty_shops"
    | "womens_ready_to_wear_stores"
    | "wrecking_and_salvage_yards"
  > | null;
  readonly allowed_merchant_countries?: ReadonlyArray<string> | null;
  readonly blocked_card_presences?: ReadonlyArray<
    "not_present" | "present"
  > | null;
  readonly blocked_categories?: ReadonlyArray<
    | "ac_refrigeration_repair"
    | "accounting_bookkeeping_services"
    | "advertising_services"
    | "agricultural_cooperative"
    | "airlines_air_carriers"
    | "airports_flying_fields"
    | "ambulance_services"
    | "amusement_parks_carnivals"
    | "antique_reproductions"
    | "antique_shops"
    | "aquariums"
    | "architectural_surveying_services"
    | "art_dealers_and_galleries"
    | "artists_supply_and_craft_shops"
    | "auto_and_home_supply_stores"
    | "auto_body_repair_shops"
    | "auto_paint_shops"
    | "auto_service_shops"
    | "automated_cash_disburse"
    | "automated_fuel_dispensers"
    | "automobile_associations"
    | "automotive_parts_and_accessories_stores"
    | "automotive_tire_stores"
    | "bail_and_bond_payments"
    | "bakeries"
    | "bands_orchestras"
    | "barber_and_beauty_shops"
    | "betting_casino_gambling"
    | "bicycle_shops"
    | "billiard_pool_establishments"
    | "boat_dealers"
    | "boat_rentals_and_leases"
    | "book_stores"
    | "books_periodicals_and_newspapers"
    | "bowling_alleys"
    | "bus_lines"
    | "business_secretarial_schools"
    | "buying_shopping_services"
    | "cable_satellite_and_other_pay_television_and_radio"
    | "camera_and_photographic_supply_stores"
    | "candy_nut_and_confectionery_stores"
    | "car_and_truck_dealers_new_used"
    | "car_and_truck_dealers_used_only"
    | "car_rental_agencies"
    | "car_washes"
    | "carpentry_services"
    | "carpet_upholstery_cleaning"
    | "caterers"
    | "charitable_and_social_service_organizations_fundraising"
    | "chemicals_and_allied_products"
    | "child_care_services"
    | "childrens_and_infants_wear_stores"
    | "chiropodists_podiatrists"
    | "chiropractors"
    | "cigar_stores_and_stands"
    | "civic_social_fraternal_associations"
    | "cleaning_and_maintenance"
    | "clothing_rental"
    | "colleges_universities"
    | "commercial_equipment"
    | "commercial_footwear"
    | "commercial_photography_art_and_graphics"
    | "commuter_transport_and_ferries"
    | "computer_network_services"
    | "computer_programming"
    | "computer_repair"
    | "computer_software_stores"
    | "computers_peripherals_and_software"
    | "concrete_work_services"
    | "construction_materials"
    | "consulting_public_relations"
    | "correspondence_schools"
    | "cosmetic_stores"
    | "counseling_services"
    | "country_clubs"
    | "courier_services"
    | "court_costs"
    | "credit_reporting_agencies"
    | "cruise_lines"
    | "dairy_products_stores"
    | "dance_hall_studios_schools"
    | "dating_escort_services"
    | "dentists_orthodontists"
    | "department_stores"
    | "detective_agencies"
    | "digital_goods_applications"
    | "digital_goods_games"
    | "digital_goods_large_volume"
    | "digital_goods_media"
    | "direct_marketing_catalog_merchant"
    | "direct_marketing_combination_catalog_and_retail_merchant"
    | "direct_marketing_inbound_telemarketing"
    | "direct_marketing_insurance_services"
    | "direct_marketing_other"
    | "direct_marketing_outbound_telemarketing"
    | "direct_marketing_subscription"
    | "direct_marketing_travel"
    | "discount_stores"
    | "doctors"
    | "door_to_door_sales"
    | "drapery_window_covering_and_upholstery_stores"
    | "drinking_places"
    | "drug_stores_and_pharmacies"
    | "drugs_drug_proprietaries_and_druggist_sundries"
    | "dry_cleaners"
    | "durable_goods"
    | "duty_free_stores"
    | "eating_places_restaurants"
    | "educational_services"
    | "electric_razor_stores"
    | "electric_vehicle_charging"
    | "electrical_parts_and_equipment"
    | "electrical_services"
    | "electronics_repair_shops"
    | "electronics_stores"
    | "elementary_secondary_schools"
    | "emergency_services_gcas_visa_use_only"
    | "employment_temp_agencies"
    | "equipment_rental"
    | "exterminating_services"
    | "family_clothing_stores"
    | "fast_food_restaurants"
    | "financial_institutions"
    | "fines_government_administrative_entities"
    | "fireplace_fireplace_screens_and_accessories_stores"
    | "floor_covering_stores"
    | "florists"
    | "florists_supplies_nursery_stock_and_flowers"
    | "freezer_and_locker_meat_provisioners"
    | "fuel_dealers_non_automotive"
    | "funeral_services_crematories"
    | "furniture_home_furnishings_and_equipment_stores_except_appliances"
    | "furniture_repair_refinishing"
    | "furriers_and_fur_shops"
    | "general_services"
    | "gift_card_novelty_and_souvenir_shops"
    | "glass_paint_and_wallpaper_stores"
    | "glassware_crystal_stores"
    | "golf_courses_public"
    | "government_licensed_horse_dog_racing_us_region_only"
    | "government_licensed_online_casions_online_gambling_us_region_only"
    | "government_owned_lotteries_non_us_region"
    | "government_owned_lotteries_us_region_only"
    | "government_services"
    | "grocery_stores_supermarkets"
    | "hardware_equipment_and_supplies"
    | "hardware_stores"
    | "health_and_beauty_spas"
    | "hearing_aids_sales_and_supplies"
    | "heating_plumbing_a_c"
    | "hobby_toy_and_game_shops"
    | "home_supply_warehouse_stores"
    | "hospitals"
    | "hotels_motels_and_resorts"
    | "household_appliance_stores"
    | "industrial_supplies"
    | "information_retrieval_services"
    | "insurance_default"
    | "insurance_underwriting_premiums"
    | "intra_company_purchases"
    | "jewelry_stores_watches_clocks_and_silverware_stores"
    | "landscaping_services"
    | "laundries"
    | "laundry_cleaning_services"
    | "legal_services_attorneys"
    | "luggage_and_leather_goods_stores"
    | "lumber_building_materials_stores"
    | "manual_cash_disburse"
    | "marinas_service_and_supplies"
    | "marketplaces"
    | "masonry_stonework_and_plaster"
    | "massage_parlors"
    | "medical_and_dental_labs"
    | "medical_dental_ophthalmic_and_hospital_equipment_and_supplies"
    | "medical_services"
    | "membership_organizations"
    | "mens_and_boys_clothing_and_accessories_stores"
    | "mens_womens_clothing_stores"
    | "metal_service_centers"
    | "miscellaneous"
    | "miscellaneous_apparel_and_accessory_shops"
    | "miscellaneous_auto_dealers"
    | "miscellaneous_business_services"
    | "miscellaneous_food_stores"
    | "miscellaneous_general_merchandise"
    | "miscellaneous_general_services"
    | "miscellaneous_home_furnishing_specialty_stores"
    | "miscellaneous_publishing_and_printing"
    | "miscellaneous_recreation_services"
    | "miscellaneous_repair_shops"
    | "miscellaneous_specialty_retail"
    | "mobile_home_dealers"
    | "motion_picture_theaters"
    | "motor_freight_carriers_and_trucking"
    | "motor_homes_dealers"
    | "motor_vehicle_supplies_and_new_parts"
    | "motorcycle_shops_and_dealers"
    | "motorcycle_shops_dealers"
    | "music_stores_musical_instruments_pianos_and_sheet_music"
    | "news_dealers_and_newsstands"
    | "non_fi_money_orders"
    | "non_fi_stored_value_card_purchase_load"
    | "nondurable_goods"
    | "nurseries_lawn_and_garden_supply_stores"
    | "nursing_personal_care"
    | "office_and_commercial_furniture"
    | "opticians_eyeglasses"
    | "optometrists_ophthalmologist"
    | "orthopedic_goods_prosthetic_devices"
    | "osteopaths"
    | "package_stores_beer_wine_and_liquor"
    | "paints_varnishes_and_supplies"
    | "parking_lots_garages"
    | "passenger_railways"
    | "pawn_shops"
    | "pet_shops_pet_food_and_supplies"
    | "petroleum_and_petroleum_products"
    | "photo_developing"
    | "photographic_photocopy_microfilm_equipment_and_supplies"
    | "photographic_studios"
    | "picture_video_production"
    | "piece_goods_notions_and_other_dry_goods"
    | "plumbing_heating_equipment_and_supplies"
    | "political_organizations"
    | "postal_services_government_only"
    | "precious_stones_and_metals_watches_and_jewelry"
    | "professional_services"
    | "public_warehousing_and_storage"
    | "quick_copy_repro_and_blueprint"
    | "railroads"
    | "real_estate_agents_and_managers_rentals"
    | "record_stores"
    | "recreational_vehicle_rentals"
    | "religious_goods_stores"
    | "religious_organizations"
    | "roofing_siding_sheet_metal"
    | "secretarial_support_services"
    | "security_brokers_dealers"
    | "service_stations"
    | "sewing_needlework_fabric_and_piece_goods_stores"
    | "shoe_repair_hat_cleaning"
    | "shoe_stores"
    | "small_appliance_repair"
    | "snowmobile_dealers"
    | "special_trade_services"
    | "specialty_cleaning"
    | "sporting_goods_stores"
    | "sporting_recreation_camps"
    | "sports_and_riding_apparel_stores"
    | "sports_clubs_fields"
    | "stamp_and_coin_stores"
    | "stationary_office_supplies_printing_and_writing_paper"
    | "stationery_stores_office_and_school_supply_stores"
    | "swimming_pools_sales"
    | "t_ui_travel_germany"
    | "tailors_alterations"
    | "tax_payments_government_agencies"
    | "tax_preparation_services"
    | "taxicabs_limousines"
    | "telecommunication_equipment_and_telephone_sales"
    | "telecommunication_services"
    | "telegraph_services"
    | "tent_and_awning_shops"
    | "testing_laboratories"
    | "theatrical_ticket_agencies"
    | "timeshares"
    | "tire_retreading_and_repair"
    | "tolls_bridge_fees"
    | "tourist_attractions_and_exhibits"
    | "towing_services"
    | "trailer_parks_campgrounds"
    | "transportation_services"
    | "travel_agencies_tour_operators"
    | "truck_stop_iteration"
    | "truck_utility_trailer_rentals"
    | "typesetting_plate_making_and_related_services"
    | "typewriter_stores"
    | "u_s_federal_government_agencies_or_departments"
    | "uniforms_commercial_clothing"
    | "used_merchandise_and_secondhand_stores"
    | "utilities"
    | "variety_stores"
    | "veterinary_services"
    | "video_amusement_game_supplies"
    | "video_game_arcades"
    | "video_tape_rental_stores"
    | "vocational_trade_schools"
    | "watch_jewelry_repair"
    | "welding_repair"
    | "wholesale_clubs"
    | "wig_and_toupee_stores"
    | "wires_money_orders"
    | "womens_accessory_and_specialty_shops"
    | "womens_ready_to_wear_stores"
    | "wrecking_and_salvage_yards"
  > | null;
  readonly blocked_merchant_countries?: ReadonlyArray<string> | null;
  readonly spending_limits?: ReadonlyArray<Stripeissuing_card_spending_limit> | null;
  readonly spending_limits_currency?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_wallets = {
  readonly apple_pay: Stripeissuing_card_apple_pay;
  readonly google_pay: Stripeissuing_card_google_pay;
  readonly primary_account_identifier?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_fleet_reported_breakdown = {
  readonly fuel?: Stripeissuing_authorization_fleet_fuel_price_data | null;
  readonly non_fuel?: Stripeissuing_authorization_fleet_non_fuel_price_data | null;
  readonly tax?: Stripeissuing_authorization_fleet_tax_data | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_network_token_wallet_provider = {
  readonly account_id?: string;
  readonly account_trust_score?: number;
  readonly card_number_source?: "app" | "manual" | "on_file" | "other";
  readonly cardholder_address?: Stripeissuing_network_token_address;
  readonly cardholder_name?: string;
  readonly device_trust_score?: number;
  readonly hashed_account_email_address?: string;
  readonly reason_codes?: ReadonlyArray<
    | "account_card_too_new"
    | "account_recently_changed"
    | "account_too_new"
    | "account_too_new_since_launch"
    | "additional_device"
    | "data_expired"
    | "defer_id_v_decision"
    | "device_recently_lost"
    | "good_activity_history"
    | "has_suspended_tokens"
    | "high_risk"
    | "inactive_account"
    | "long_account_tenure"
    | "low_account_score"
    | "low_device_score"
    | "low_phone_number_score"
    | "network_service_error"
    | "outside_home_territory"
    | "provisioning_cardholder_mismatch"
    | "provisioning_device_and_cardholder_mismatch"
    | "provisioning_device_mismatch"
    | "same_device_no_prior_authentication"
    | "same_device_successful_prior_authentication"
    | "software_update"
    | "suspicious_activity"
    | "too_many_different_cardholders"
    | "too_many_recent_attempts"
    | "too_many_recent_tokens"
  >;
  readonly suggested_decision?: "approve" | "decline" | "require_auth";
  readonly suggested_decision_version?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_dispute_evidence = {
  readonly canceled?: Stripeissuing_dispute_canceled_evidence;
  readonly duplicate?: Stripeissuing_dispute_duplicate_evidence;
  readonly fraudulent?: Stripeissuing_dispute_fraudulent_evidence;
  readonly merchandise_not_as_described?: Stripeissuing_dispute_merchandise_not_as_described_evidence;
  readonly no_valid_authorization?: Stripeissuing_dispute_no_valid_authorization_evidence;
  readonly not_received?: Stripeissuing_dispute_not_received_evidence;
  readonly other?: Stripeissuing_dispute_other_evidence;
  readonly reason:
    | "canceled"
    | "duplicate"
    | "fraudulent"
    | "merchandise_not_as_described"
    | "no_valid_authorization"
    | "not_received"
    | "other"
    | "service_not_as_described";
  readonly service_not_as_described?: Stripeissuing_dispute_service_not_as_described_evidence;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_fleet_reported_breakdown = {
  readonly fuel?: Stripeissuing_transaction_fleet_fuel_price_data | null;
  readonly non_fuel?: Stripeissuing_transaction_fleet_non_fuel_price_data | null;
  readonly tax?: Stripeissuing_transaction_fleet_tax_data | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_flight_data = {
  readonly departure_at?: number | null;
  readonly passenger_name?: string | null;
  readonly refundable?: boolean | null;
  readonly segments?: ReadonlyArray<Stripeissuing_transaction_flight_data_leg> | null;
  readonly travel_agency?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_verification_data = {
  readonly address_line1_check: "match" | "mismatch" | "not_provided";
  readonly address_postal_code_check: "match" | "mismatch" | "not_provided";
  readonly authentication_exemption?: Stripeissuing_authorization_authentication_exemption | null;
  readonly cvc_check: "match" | "mismatch" | "not_provided";
  readonly expiry_check: "match" | "mismatch" | "not_provided";
  readonly postal_code?: string | null;
  readonly three_d_secure?: Stripeissuing_authorization_three_d_secure | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_card_shipping = {
  readonly address: Stripeaddress;
  readonly address_validation?: Stripeissuing_card_shipping_address_validation | null;
  readonly business_name?: string | null;
  readonly carrier?: "correos" | "dhl" | "fedex" | "royal_mail" | "usps" | null;
  readonly customs?: Stripeissuing_card_shipping_customs | null;
  readonly delivered_at?: number | null;
  readonly eta?: number | null;
  readonly name: string;
  readonly phone_number?: string | null;
  readonly require_signature?: boolean | null;
  readonly service: "express" | "priority" | "standard";
  readonly shipped_at?: number | null;
  readonly status?:
    | "canceled"
    | "delivered"
    | "failure"
    | "pending"
    | "returned"
    | "shipped"
    | "submitted"
    | null;
  readonly tracking_number?: string | null;
  readonly tracking_url?: string | null;
  readonly type: "bulk" | "individual";
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_personalization_design = {
  readonly card_logo?: string | Stripefile | null;
  readonly carrier_text?: Stripeissuing_personalization_design_carrier_text | null;
  readonly created: number;
  readonly id: string;
  readonly livemode: boolean;
  readonly lookup_key?: string | null;
  readonly metadata: { readonly [x: string]: string };
  readonly name?: string | null;
  readonly object: "issuing.personalization_design";
  readonly physical_bundle: string | Stripeissuing_physical_bundle;
  readonly preferences: Stripeissuing_personalization_design_preferences;
  readonly rejection_reasons: Stripeissuing_personalization_design_rejection_reasons;
  readonly status: "active" | "inactive" | "rejected" | "review";
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_authorization_fleet_data = {
  readonly cardholder_prompt_data?: Stripeissuing_authorization_fleet_cardholder_prompt_data | null;
  readonly purchase_type?:
    | "fuel_and_non_fuel_purchase"
    | "fuel_purchase"
    | "non_fuel_purchase"
    | null;
  readonly reported_breakdown?: Stripeissuing_authorization_fleet_reported_breakdown | null;
  readonly service_type?:
    | "full_service"
    | "non_fuel_transaction"
    | "self_service"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_network_token_network_data = {
  readonly device?: Stripeissuing_network_token_device;
  readonly mastercard?: Stripeissuing_network_token_mastercard;
  readonly type: "mastercard" | "visa";
  readonly visa?: Stripeissuing_network_token_visa;
  readonly wallet_provider?: Stripeissuing_network_token_wallet_provider;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_fleet_data = {
  readonly cardholder_prompt_data?: Stripeissuing_transaction_fleet_cardholder_prompt_data | null;
  readonly purchase_type?: string | null;
  readonly reported_breakdown?: Stripeissuing_transaction_fleet_reported_breakdown | null;
  readonly service_type?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_token = {
  readonly card: string | Stripeissuing_card;
  readonly created: number;
  readonly device_fingerprint?: string | null;
  readonly id: string;
  readonly last4?: string;
  readonly livemode: boolean;
  readonly network: "mastercard" | "visa";
  readonly network_data?: Stripeissuing_network_token_network_data;
  readonly network_updated_at: number;
  readonly object: "issuing.token";
  readonly status: "active" | "deleted" | "requested" | "suspended";
  readonly wallet_provider?: "apple_pay" | "google_pay" | "samsung_pay";
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_transaction_purchase_details = {
  readonly fleet?: Stripeissuing_transaction_fleet_data | null;
  readonly flight?: Stripeissuing_transaction_flight_data | null;
  readonly fuel?: Stripeissuing_transaction_fuel_data | null;
  readonly lodging?: Stripeissuing_transaction_lodging_data | null;
  readonly receipt?: ReadonlyArray<Stripeissuing_transaction_receipt_data> | null;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };

export const Stripeissuing_card = Schema.suspend(
  (): Schema.Codec<Stripeissuing_card> =>
    Schema.StructWithRest(
      Schema.Struct({
        brand: Schema.String.annotate({
          description: "The brand of the card.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        cancellation_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "design_rejected",
              "fulfillment_error",
              "lost",
              "stolen",
            ]).annotate({
              description: "The reason why the card was canceled.",
            }),
            Schema.Null,
          ]),
        ),
        cardholder: Stripeissuing_cardholder,
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Supported currencies are `usd` in the US, `eur` in the EU, and `gbp` in the UK.",
          format: "currency",
        }),
        cvc: Schema.optionalKey(
          Schema.String.annotate({
            description:
              'The card\'s CVC. For security reasons, this is only available for virtual cards, and will be omitted unless you explicitly request it with [the `expand` parameter](https://docs.stripe.com/api/expanding_objects). Additionally, it\'s only available via the ["Retrieve a card" endpoint](https://docs.stripe.com/api/issuing/cards/retrieve), not via "List all cards" or any other endpoint.',
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        exp_month: Schema.Number.annotate({
          description: "The expiration month of the card.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        exp_year: Schema.Number.annotate({
          description: "The expiration year of the card.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        financial_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The financial account this card is attached to.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        last4: Schema.String.annotate({
          description: "The last 4 digits of the card number.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        latest_fraud_warning: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_card_fraud_warning]).annotate({
              description:
                "Stripe’s assessment of whether this card’s details have been compromised. If this property isn't null, cancel and reissue the card to prevent fraudulent activity risk.",
            }),
            Schema.Null,
          ]),
        ),
        lifecycle_controls: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_card_lifecycle_controls]).annotate({
              description:
                "Rules that control the lifecycle of this card, such as automatic cancellation. Refer to our [documentation](/issuing/controls/lifecycle-controls) for more details.",
            }),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        number: Schema.optionalKey(
          Schema.String.annotate({
            description:
              'The full unredacted card number. For security reasons, this is only available for virtual cards, and will be omitted unless you explicitly request it with [the `expand` parameter](https://docs.stripe.com/api/expanding_objects). Additionally, it\'s only available via the ["Retrieve a card" endpoint](https://docs.stripe.com/api/issuing/cards/retrieve), not via "List all cards" or any other endpoint.',
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        object: Schema.Literal("issuing.card").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        personalization_design: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeissuing_personalization_design,
            ]).annotate({
              description:
                "The personalization design object belonging to this card.",
            }),
            Schema.Null,
          ]),
        ),
        replaced_by: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripeissuing_card> => Stripeissuing_card,
              ),
            ]).annotate({
              description: "The latest card that replaces this card, if any.",
            }),
            Schema.Null,
          ]),
        ),
        replacement_for: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripeissuing_card> => Stripeissuing_card,
              ),
            ]).annotate({
              description: "The card this card replaces, if any.",
            }),
            Schema.Null,
          ]),
        ),
        replacement_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "damaged",
              "expired",
              "fulfillment_error",
              "lost",
              "stolen",
            ]).annotate({
              description:
                "The reason why the previous card needed to be replaced.",
            }),
            Schema.Null,
          ]),
        ),
        second_line: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Text separate from cardholder name, printed on the card.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        shipping: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_card_shipping]).annotate({
              description: "Where and how the card will be shipped.",
            }),
            Schema.Null,
          ]),
        ),
        spending_controls: Stripeissuing_card_authorization_controls,
        status: Schema.Literals(["active", "canceled", "inactive"]).annotate({
          description:
            "Whether authorizations can be approved on this card. May be blocked from activating cards depending on past-due Cardholder requirements. Defaults to `inactive`.",
        }),
        type: Schema.Literals(["physical", "virtual"]).annotate({
          description: "The type of the card.",
        }),
        wallets: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_card_wallets]).annotate({
              description:
                "Information relating to digital wallets (like Apple Pay and Google Pay).",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Card",
      description:
        "You can [create physical or virtual cards](https://docs.stripe.com/issuing) that are issued to cardholders.",
      identifier: "Stripeissuing.card",
    }),
);
export const Stripeissuing_transaction = Schema.suspend(
  (): Schema.Codec<Stripeissuing_transaction> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The transaction amount, which will be reflected in your balance. This amount is in your currency and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_transaction_amount_details]).annotate({
              description:
                "Detailed breakdown of amount components. These amounts are denominated in `currency` and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
            }),
            Schema.Null,
          ]),
        ),
        authorization: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripeissuing_authorization> =>
                  Stripeissuing_authorization,
              ),
            ]).annotate({
              description:
                "The `Authorization` object that led to this transaction.",
            }),
            Schema.Null,
          ]),
        ),
        balance_transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripebalance_transaction> =>
                  Stripebalance_transaction,
              ),
            ]).annotate({
              description:
                "ID of the [balance transaction](https://docs.stripe.com/api/balance_transactions) associated with this transaction.",
            }),
            Schema.Null,
          ]),
        ),
        card: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripeissuing_card> => Stripeissuing_card,
          ),
        ]).annotate({ description: "The card used to make this transaction." }),
        cardholder: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeissuing_cardholder,
            ]).annotate({
              description: "The cardholder to whom this transaction belongs.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        dispute: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripeissuing_dispute> =>
                  Stripeissuing_dispute,
              ),
            ]).annotate({
              description:
                "If you've disputed the transaction, the ID of the dispute.",
            }),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        merchant_amount: Schema.Number.annotate({
          description:
            "The amount that the merchant will receive, denominated in `merchant_currency` and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). It will be different from `amount` if the merchant is taking payment in a different currency.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        merchant_currency: Schema.String.annotate({
          description:
            "The currency with which the merchant is taking payment.",
          format: "currency",
        }),
        merchant_data: Stripeissuing_authorization_merchant_data,
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        network_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_transaction_network_data]).annotate({
              description:
                "Details about the transaction, such as processing dates, set by the card network.",
            }),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("issuing.transaction").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        purchase_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_transaction_purchase_details]).annotate(
              {
                description:
                  "Additional purchase information that is optionally provided by the merchant.",
              },
            ),
            Schema.Null,
          ]),
        ),
        token: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeissuing_token,
            ]).annotate({
              description:
                "[Token](https://docs.stripe.com/api/issuing/tokens/object) object used for this transaction. If a network token was not used for this transaction, this field will be null.",
            }),
            Schema.Null,
          ]),
        ),
        treasury: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_transaction_treasury]).annotate({
              description:
                "[Treasury](https://docs.stripe.com/api/treasury) details related to this transaction if it was created on a [FinancialAccount](/docs/api/treasury/financial_accounts",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literals(["capture", "refund"]).annotate({
          description: "The nature of the transaction.",
        }),
        wallet: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "apple_pay",
              "google_pay",
              "samsung_pay",
            ]).annotate({
              description:
                "The digital wallet used for this transaction. One of `apple_pay`, `google_pay`, or `samsung_pay`.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Transaction",
      description:
        "Any use of an [issued card](https://docs.stripe.com/issuing) that results in funds entering or leaving\nyour Stripe account, such as a completed purchase or refund, is represented by an Issuing\n`Transaction` object.\n\nRelated guide: [Issued card transactions](https://docs.stripe.com/issuing/purchases/transactions)",
      identifier: "Stripeissuing.transaction",
    }),
);
export const Stripeissuing_dispute = Schema.suspend(
  (): Schema.Codec<Stripeissuing_dispute> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "Disputed amount in the card's currency and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). Usually the amount of the `transaction`, but can differ (usually because of currency fluctuation).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        balance_transactions: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.suspend(
                (): Schema.Codec<Stripebalance_transaction> =>
                  Stripebalance_transaction,
              ),
            ).annotate({
              description:
                "List of balance transactions associated with the dispute.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description: "The currency the `transaction` was made in.",
          format: "currency",
        }),
        evidence: Stripeissuing_dispute_evidence,
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        loss_reason: Schema.optionalKey(
          Schema.Literals([
            "cardholder_authentication_issuer_liability",
            "eci5_token_transaction_with_tavv",
            "excess_disputes_in_timeframe",
            "has_not_met_the_minimum_dispute_amount_requirements",
            "invalid_duplicate_dispute",
            "invalid_incorrect_amount_dispute",
            "invalid_no_authorization",
            "invalid_use_of_disputes",
            "merchandise_delivered_or_shipped",
            "merchandise_or_service_as_described",
            "not_cancelled",
            "other",
            "refund_issued",
            "submitted_beyond_allowable_time_limit",
            "transaction_3ds_required",
            "transaction_approved_after_prior_fraud_dispute",
            "transaction_authorized",
            "transaction_electronically_read",
            "transaction_qualifies_for_visa_easy_payment_service",
            "transaction_unattended",
          ]).annotate({
            description:
              "The enum that describes the dispute loss outcome. If the dispute is not lost, this field will be absent. New enum values may be added in the future, so be sure to handle unknown values.",
          }),
        ),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        object: Schema.Literal("issuing.dispute").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        status: Schema.Literals([
          "expired",
          "lost",
          "submitted",
          "unsubmitted",
          "won",
        ]).annotate({ description: "Current status of the dispute." }),
        transaction: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripeissuing_transaction> =>
              Stripeissuing_transaction,
          ),
        ]).annotate({ description: "The transaction being disputed." }),
        treasury: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_dispute_treasury]).annotate({
              description:
                "[Treasury](https://docs.stripe.com/api/treasury) details related to this dispute if it was created on a [FinancialAccount](https://docs.stripe.com/api/treasury/financial_accounts)",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Dispute",
      description:
        "As a [card issuer](https://docs.stripe.com/issuing), you can dispute transactions that the cardholder does not recognize, suspects to be fraudulent, or has other issues with.\n\nRelated guide: [Issuing disputes](https://docs.stripe.com/issuing/purchases/disputes)",
      identifier: "Stripeissuing.dispute",
    }),
);
export const Stripeissuing_authorization = Schema.suspend(
  (): Schema.Codec<Stripeissuing_authorization> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The total amount that was authorized or rejected. This amount is in `currency` and in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal). `amount` should be the same as `merchant_amount`, unless `currency` and `merchant_currency` are different.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_authorization_amount_details]).annotate(
              {
                description:
                  "Detailed breakdown of amount components. These amounts are denominated in `currency` and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
              },
            ),
            Schema.Null,
          ]),
        ),
        approved: Schema.Boolean.annotate({
          description: "Whether the authorization has been approved.",
        }),
        authorization_method: Schema.Literals([
          "chip",
          "contactless",
          "keyed_in",
          "online",
          "swipe",
        ]).annotate({ description: "How the card details were provided." }),
        balance_transactions: Schema.Array(
          Schema.suspend(
            (): Schema.Codec<Stripebalance_transaction> =>
              Stripebalance_transaction,
          ),
        ).annotate({
          description:
            "List of balance transactions associated with this authorization.",
        }),
        card: Schema.suspend(
          (): Schema.Codec<Stripeissuing_card> => Stripeissuing_card,
        ),
        card_presence: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["not_present", "present"]).annotate({
              description:
                "Whether the card was present at the point of sale for the authorization.",
            }),
            Schema.Null,
          ]),
        ),
        cardholder: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeissuing_cardholder,
            ]).annotate({
              description: "The cardholder to whom this authorization belongs.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "The currency of the cardholder. This currency can be different from the currency presented at authorization and the `merchant_currency` field on this authorization. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        fleet: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_authorization_fleet_data]).annotate({
              description:
                "Fleet-specific information for authorizations using Fleet cards.",
            }),
            Schema.Null,
          ]),
        ),
        fraud_challenges: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeissuing_authorization_fraud_challenge).annotate({
              description:
                "Fraud challenges sent to the cardholder, if this authorization was declined for fraud risk reasons.",
            }),
            Schema.Null,
          ]),
        ),
        fuel: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_authorization_fuel_data]).annotate({
              description:
                "Information about fuel that was purchased with this transaction. Typically this information is received from the merchant after the authorization has been approved and the fuel dispensed.",
            }),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        merchant_amount: Schema.Number.annotate({
          description:
            "The total amount that was authorized or rejected. This amount is in the `merchant_currency` and in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal). `merchant_amount` should be the same as `amount`, unless `merchant_currency` and `currency` are different.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        merchant_currency: Schema.String.annotate({
          description:
            "The local currency that was presented to the cardholder for the authorization. This currency can be different from the cardholder currency and the `currency` field on this authorization. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        merchant_data: Stripeissuing_authorization_merchant_data,
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        network_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_authorization_network_data]).annotate({
              description:
                "Details about the authorization, such as identifiers, set by the card network.",
            }),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("issuing.authorization").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        pending_request: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_authorization_pending_request,
            ]).annotate({
              description:
                "The pending authorization request. This field will only be non-null during an `issuing_authorization.request` webhook.",
            }),
            Schema.Null,
          ]),
        ),
        request_history: Schema.Array(
          Stripeissuing_authorization_request,
        ).annotate({
          description:
            "History of every time a `pending_request` authorization was approved/declined, either by you directly or by Stripe (e.g. based on your spending_controls). If the merchant changes the authorization by performing an incremental authorization, you can look at this field to see the previous requests for the authorization. This field can be helpful in determining why a given authorization was approved/declined.",
        }),
        status: Schema.Literals([
          "closed",
          "expired",
          "pending",
          "reversed",
        ]).annotate({
          description:
            "The current status of the authorization in its lifecycle.",
        }),
        token: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeissuing_token,
            ]).annotate({
              description:
                "[Token](https://docs.stripe.com/api/issuing/tokens/object) object used for this authorization. If a network token was not used for this authorization, this field will be null.",
            }),
            Schema.Null,
          ]),
        ),
        transactions: Schema.Array(
          Schema.suspend(
            (): Schema.Codec<Stripeissuing_transaction> =>
              Stripeissuing_transaction,
          ),
        ).annotate({
          description:
            "List of [transactions](https://docs.stripe.com/api/issuing/transactions) associated with this authorization.",
        }),
        treasury: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_authorization_treasury]).annotate({
              description:
                "[Treasury](https://docs.stripe.com/api/treasury) details related to this authorization if it was created on a [FinancialAccount](https://docs.stripe.com/api/treasury/financial_accounts).",
            }),
            Schema.Null,
          ]),
        ),
        verification_data: Stripeissuing_authorization_verification_data,
        verified_by_fraud_challenge: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Whether the authorization bypassed fraud risk checks because the cardholder has previously completed a fraud challenge on a similar high-risk authorization from the same merchant.",
            }),
            Schema.Null,
          ]),
        ),
        wallet: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The digital wallet used for this transaction. One of `apple_pay`, `google_pay`, or `samsung_pay`. Will populate as `null` when no digital wallet was utilized.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Authorization",
      description:
        "When an [issued card](https://docs.stripe.com/issuing) is used to make a purchase, an Issuing `Authorization`\nobject is created. [Authorizations](https://docs.stripe.com/issuing/purchases/authorizations) must be approved for the\npurchase to be completed successfully.\n\nRelated guide: [Issued card authorizations](https://docs.stripe.com/issuing/purchases/authorizations)",
      identifier: "Stripeissuing.authorization",
    }),
);
export const Stripeissuing_authorization_amount_details = Schema.StructWithRest(
  Schema.Struct({
    atm_fee: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The fee charged by the ATM for the cash withdrawal.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    cashback_amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The amount of cash requested by the cardholder.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingAuthorizationAmountDetails",
  description: "",
  identifier: "Stripeissuing_authorization_amount_details",
});
export const Stripeissuing_card_fraud_warning = Schema.StructWithRest(
  Schema.Struct({
    started_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Timestamp of the most recent fraud warning.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    type: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "card_testing_exposure",
          "fraud_dispute_filed",
          "third_party_reported",
          "user_indicated_fraud",
        ]).annotate({
          description:
            "The type of fraud warning that most recently took place on this card. This field updates with every new fraud warning, so the value changes over time. If populated, cancel and reissue the card.",
        }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingCardFraudWarning",
  description: "",
  identifier: "Stripeissuing_card_fraud_warning",
});
export const Stripeissuing_card_lifecycle_conditions = Schema.StructWithRest(
  Schema.Struct({
    payment_count: Schema.Number.annotate({
      description:
        "The card is automatically cancelled when it makes this number of non-zero payment authorizations and transactions. The count includes penny authorizations, but doesn't include non-payment actions, such as authorization advice.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingCardLifecycleConditions",
  description: "",
  identifier: "Stripeissuing_card_lifecycle_conditions",
});
export const Stripeissuing_personalization_design_carrier_text =
  Schema.StructWithRest(
    Schema.Struct({
      footer_body: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The footer body text of the carrier letter.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      footer_title: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The footer title text of the carrier letter.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      header_body: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The header body text of the carrier letter.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      header_title: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The header title text of the carrier letter.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingPersonalizationDesignCarrierText",
    description: "",
    identifier: "Stripeissuing_personalization_design_carrier_text",
  });
export const Stripeissuing_physical_bundle_features = Schema.StructWithRest(
  Schema.Struct({
    card_logo: Schema.Literals([
      "optional",
      "required",
      "unsupported",
    ]).annotate({
      description:
        "The policy for how to use card logo images in a card design with this physical bundle.",
    }),
    carrier_text: Schema.Literals([
      "optional",
      "required",
      "unsupported",
    ]).annotate({
      description:
        "The policy for how to use carrier letter text in a card design with this physical bundle.",
    }),
    second_line: Schema.Literals([
      "optional",
      "required",
      "unsupported",
    ]).annotate({
      description:
        "The policy for how to use a second line on a card with this physical bundle.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingPhysicalBundleFeatures",
  description: "",
  identifier: "Stripeissuing_physical_bundle_features",
});
export const Stripeissuing_personalization_design_preferences =
  Schema.StructWithRest(
    Schema.Struct({
      is_default: Schema.Boolean.annotate({
        description:
          "Whether we use this personalization design to create cards when one isn't specified. A connected account uses the Connect platform's default design if no personalization design is set as the default design.",
      }),
      is_platform_default: Schema.optionalKey(
        Schema.Union([
          Schema.Boolean.annotate({
            description:
              "Whether this personalization design is used to create cards when one is not specified and a default for this connected account does not exist.",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingPersonalizationDesignPreferences",
    description: "",
    identifier: "Stripeissuing_personalization_design_preferences",
  });
export const Stripeissuing_personalization_design_rejection_reasons =
  Schema.StructWithRest(
    Schema.Struct({
      card_logo: Schema.optionalKey(
        Schema.Union([
          Schema.Array(
            Schema.Literals([
              "geographic_location",
              "inappropriate",
              "network_name",
              "non_binary_image",
              "non_fiat_currency",
              "other",
              "other_entity",
              "promotional_material",
            ]),
          ).annotate({
            description: "The reason(s) the card logo was rejected.",
          }),
          Schema.Null,
        ]),
      ),
      carrier_text: Schema.optionalKey(
        Schema.Union([
          Schema.Array(
            Schema.Literals([
              "geographic_location",
              "inappropriate",
              "network_name",
              "non_fiat_currency",
              "other",
              "other_entity",
              "promotional_material",
            ]),
          ).annotate({
            description: "The reason(s) the carrier text was rejected.",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingPersonalizationDesignRejectionReasons",
    description: "",
    identifier: "Stripeissuing_personalization_design_rejection_reasons",
  });
export const Stripeissuing_card_shipping_customs = Schema.StructWithRest(
  Schema.Struct({
    eori_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A registration number used for customs in Europe. See [https://www.gov.uk/eori](https://www.gov.uk/eori) for the UK and [https://ec.europa.eu/taxation_customs/business/customs-procedures-import-and-export/customs-procedures/economic-operators-registration-and-identification-number-eori_en](https://ec.europa.eu/taxation_customs/business/customs-procedures-import-and-export/customs-procedures/economic-operators-registration-and-identification-number-eori_en) for the EU.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingCardShippingCustoms",
  description: "",
  identifier: "Stripeissuing_card_shipping_customs",
});
export const Stripeissuing_card_spending_limit = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description:
        "Maximum amount allowed to spend per interval. This amount is in the card's currency and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    categories: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          Schema.Literals([
            "ac_refrigeration_repair",
            "accounting_bookkeeping_services",
            "advertising_services",
            "agricultural_cooperative",
            "airlines_air_carriers",
            "airports_flying_fields",
            "ambulance_services",
            "amusement_parks_carnivals",
            "antique_reproductions",
            "antique_shops",
            "aquariums",
            "architectural_surveying_services",
            "art_dealers_and_galleries",
            "artists_supply_and_craft_shops",
            "auto_and_home_supply_stores",
            "auto_body_repair_shops",
            "auto_paint_shops",
            "auto_service_shops",
            "automated_cash_disburse",
            "automated_fuel_dispensers",
            "automobile_associations",
            "automotive_parts_and_accessories_stores",
            "automotive_tire_stores",
            "bail_and_bond_payments",
            "bakeries",
            "bands_orchestras",
            "barber_and_beauty_shops",
            "betting_casino_gambling",
            "bicycle_shops",
            "billiard_pool_establishments",
            "boat_dealers",
            "boat_rentals_and_leases",
            "book_stores",
            "books_periodicals_and_newspapers",
            "bowling_alleys",
            "bus_lines",
            "business_secretarial_schools",
            "buying_shopping_services",
            "cable_satellite_and_other_pay_television_and_radio",
            "camera_and_photographic_supply_stores",
            "candy_nut_and_confectionery_stores",
            "car_and_truck_dealers_new_used",
            "car_and_truck_dealers_used_only",
            "car_rental_agencies",
            "car_washes",
            "carpentry_services",
            "carpet_upholstery_cleaning",
            "caterers",
            "charitable_and_social_service_organizations_fundraising",
            "chemicals_and_allied_products",
            "child_care_services",
            "childrens_and_infants_wear_stores",
            "chiropodists_podiatrists",
            "chiropractors",
            "cigar_stores_and_stands",
            "civic_social_fraternal_associations",
            "cleaning_and_maintenance",
            "clothing_rental",
            "colleges_universities",
            "commercial_equipment",
            "commercial_footwear",
            "commercial_photography_art_and_graphics",
            "commuter_transport_and_ferries",
            "computer_network_services",
            "computer_programming",
            "computer_repair",
            "computer_software_stores",
            "computers_peripherals_and_software",
            "concrete_work_services",
            "construction_materials",
            "consulting_public_relations",
            "correspondence_schools",
            "cosmetic_stores",
            "counseling_services",
            "country_clubs",
            "courier_services",
            "court_costs",
            "credit_reporting_agencies",
            "cruise_lines",
            "dairy_products_stores",
            "dance_hall_studios_schools",
            "dating_escort_services",
            "dentists_orthodontists",
            "department_stores",
            "detective_agencies",
            "digital_goods_applications",
            "digital_goods_games",
            "digital_goods_large_volume",
            "digital_goods_media",
            "direct_marketing_catalog_merchant",
            "direct_marketing_combination_catalog_and_retail_merchant",
            "direct_marketing_inbound_telemarketing",
            "direct_marketing_insurance_services",
            "direct_marketing_other",
            "direct_marketing_outbound_telemarketing",
            "direct_marketing_subscription",
            "direct_marketing_travel",
            "discount_stores",
            "doctors",
            "door_to_door_sales",
            "drapery_window_covering_and_upholstery_stores",
            "drinking_places",
            "drug_stores_and_pharmacies",
            "drugs_drug_proprietaries_and_druggist_sundries",
            "dry_cleaners",
            "durable_goods",
            "duty_free_stores",
            "eating_places_restaurants",
            "educational_services",
            "electric_razor_stores",
            "electric_vehicle_charging",
            "electrical_parts_and_equipment",
            "electrical_services",
            "electronics_repair_shops",
            "electronics_stores",
            "elementary_secondary_schools",
            "emergency_services_gcas_visa_use_only",
            "employment_temp_agencies",
            "equipment_rental",
            "exterminating_services",
            "family_clothing_stores",
            "fast_food_restaurants",
            "financial_institutions",
            "fines_government_administrative_entities",
            "fireplace_fireplace_screens_and_accessories_stores",
            "floor_covering_stores",
            "florists",
            "florists_supplies_nursery_stock_and_flowers",
            "freezer_and_locker_meat_provisioners",
            "fuel_dealers_non_automotive",
            "funeral_services_crematories",
            "furniture_home_furnishings_and_equipment_stores_except_appliances",
            "furniture_repair_refinishing",
            "furriers_and_fur_shops",
            "general_services",
            "gift_card_novelty_and_souvenir_shops",
            "glass_paint_and_wallpaper_stores",
            "glassware_crystal_stores",
            "golf_courses_public",
            "government_licensed_horse_dog_racing_us_region_only",
            "government_licensed_online_casions_online_gambling_us_region_only",
            "government_owned_lotteries_non_us_region",
            "government_owned_lotteries_us_region_only",
            "government_services",
            "grocery_stores_supermarkets",
            "hardware_equipment_and_supplies",
            "hardware_stores",
            "health_and_beauty_spas",
            "hearing_aids_sales_and_supplies",
            "heating_plumbing_a_c",
            "hobby_toy_and_game_shops",
            "home_supply_warehouse_stores",
            "hospitals",
            "hotels_motels_and_resorts",
            "household_appliance_stores",
            "industrial_supplies",
            "information_retrieval_services",
            "insurance_default",
            "insurance_underwriting_premiums",
            "intra_company_purchases",
            "jewelry_stores_watches_clocks_and_silverware_stores",
            "landscaping_services",
            "laundries",
            "laundry_cleaning_services",
            "legal_services_attorneys",
            "luggage_and_leather_goods_stores",
            "lumber_building_materials_stores",
            "manual_cash_disburse",
            "marinas_service_and_supplies",
            "marketplaces",
            "masonry_stonework_and_plaster",
            "massage_parlors",
            "medical_and_dental_labs",
            "medical_dental_ophthalmic_and_hospital_equipment_and_supplies",
            "medical_services",
            "membership_organizations",
            "mens_and_boys_clothing_and_accessories_stores",
            "mens_womens_clothing_stores",
            "metal_service_centers",
            "miscellaneous",
            "miscellaneous_apparel_and_accessory_shops",
            "miscellaneous_auto_dealers",
            "miscellaneous_business_services",
            "miscellaneous_food_stores",
            "miscellaneous_general_merchandise",
            "miscellaneous_general_services",
            "miscellaneous_home_furnishing_specialty_stores",
            "miscellaneous_publishing_and_printing",
            "miscellaneous_recreation_services",
            "miscellaneous_repair_shops",
            "miscellaneous_specialty_retail",
            "mobile_home_dealers",
            "motion_picture_theaters",
            "motor_freight_carriers_and_trucking",
            "motor_homes_dealers",
            "motor_vehicle_supplies_and_new_parts",
            "motorcycle_shops_and_dealers",
            "motorcycle_shops_dealers",
            "music_stores_musical_instruments_pianos_and_sheet_music",
            "news_dealers_and_newsstands",
            "non_fi_money_orders",
            "non_fi_stored_value_card_purchase_load",
            "nondurable_goods",
            "nurseries_lawn_and_garden_supply_stores",
            "nursing_personal_care",
            "office_and_commercial_furniture",
            "opticians_eyeglasses",
            "optometrists_ophthalmologist",
            "orthopedic_goods_prosthetic_devices",
            "osteopaths",
            "package_stores_beer_wine_and_liquor",
            "paints_varnishes_and_supplies",
            "parking_lots_garages",
            "passenger_railways",
            "pawn_shops",
            "pet_shops_pet_food_and_supplies",
            "petroleum_and_petroleum_products",
            "photo_developing",
            "photographic_photocopy_microfilm_equipment_and_supplies",
            "photographic_studios",
            "picture_video_production",
            "piece_goods_notions_and_other_dry_goods",
            "plumbing_heating_equipment_and_supplies",
            "political_organizations",
            "postal_services_government_only",
            "precious_stones_and_metals_watches_and_jewelry",
            "professional_services",
            "public_warehousing_and_storage",
            "quick_copy_repro_and_blueprint",
            "railroads",
            "real_estate_agents_and_managers_rentals",
            "record_stores",
            "recreational_vehicle_rentals",
            "religious_goods_stores",
            "religious_organizations",
            "roofing_siding_sheet_metal",
            "secretarial_support_services",
            "security_brokers_dealers",
            "service_stations",
            "sewing_needlework_fabric_and_piece_goods_stores",
            "shoe_repair_hat_cleaning",
            "shoe_stores",
            "small_appliance_repair",
            "snowmobile_dealers",
            "special_trade_services",
            "specialty_cleaning",
            "sporting_goods_stores",
            "sporting_recreation_camps",
            "sports_and_riding_apparel_stores",
            "sports_clubs_fields",
            "stamp_and_coin_stores",
            "stationary_office_supplies_printing_and_writing_paper",
            "stationery_stores_office_and_school_supply_stores",
            "swimming_pools_sales",
            "t_ui_travel_germany",
            "tailors_alterations",
            "tax_payments_government_agencies",
            "tax_preparation_services",
            "taxicabs_limousines",
            "telecommunication_equipment_and_telephone_sales",
            "telecommunication_services",
            "telegraph_services",
            "tent_and_awning_shops",
            "testing_laboratories",
            "theatrical_ticket_agencies",
            "timeshares",
            "tire_retreading_and_repair",
            "tolls_bridge_fees",
            "tourist_attractions_and_exhibits",
            "towing_services",
            "trailer_parks_campgrounds",
            "transportation_services",
            "travel_agencies_tour_operators",
            "truck_stop_iteration",
            "truck_utility_trailer_rentals",
            "typesetting_plate_making_and_related_services",
            "typewriter_stores",
            "u_s_federal_government_agencies_or_departments",
            "uniforms_commercial_clothing",
            "used_merchandise_and_secondhand_stores",
            "utilities",
            "variety_stores",
            "veterinary_services",
            "video_amusement_game_supplies",
            "video_game_arcades",
            "video_tape_rental_stores",
            "vocational_trade_schools",
            "watch_jewelry_repair",
            "welding_repair",
            "wholesale_clubs",
            "wig_and_toupee_stores",
            "wires_money_orders",
            "womens_accessory_and_specialty_shops",
            "womens_ready_to_wear_stores",
            "wrecking_and_salvage_yards",
          ]),
        ).annotate({
          description:
            "Array of strings containing [categories](https://docs.stripe.com/api#issuing_authorization_object-merchant_data-category) this limit applies to. Omitting this field will apply the limit to all categories.",
        }),
        Schema.Null,
      ]),
    ),
    interval: Schema.Literals([
      "all_time",
      "daily",
      "monthly",
      "per_authorization",
      "weekly",
      "yearly",
    ]).annotate({
      description: "Interval (or event) to which the amount applies.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingCardSpendingLimit",
  description: "",
  identifier: "Stripeissuing_card_spending_limit",
});
export const Stripeissuing_card_apple_pay = Schema.StructWithRest(
  Schema.Struct({
    eligible: Schema.Boolean.annotate({ description: "Apple Pay Eligibility" }),
    ineligible_reason: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "missing_agreement",
          "missing_cardholder_contact",
          "unsupported_region",
        ]).annotate({
          description: "Reason the card is ineligible for Apple Pay",
        }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingCardApplePay",
  description: "",
  identifier: "Stripeissuing_card_apple_pay",
});
export const Stripeissuing_card_google_pay = Schema.StructWithRest(
  Schema.Struct({
    eligible: Schema.Boolean.annotate({
      description: "Google Pay Eligibility",
    }),
    ineligible_reason: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "missing_agreement",
          "missing_cardholder_contact",
          "unsupported_region",
        ]).annotate({
          description: "Reason the card is ineligible for Google Pay",
        }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingCardGooglePay",
  description: "",
  identifier: "Stripeissuing_card_google_pay",
});
export const Stripeissuing_authorization_fleet_cardholder_prompt_data =
  Schema.StructWithRest(
    Schema.Struct({
      alphanumeric_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "[Deprecated] An alphanumeric ID, though typical point of sales only support numeric entry. The card program can be configured to prompt for a vehicle ID, driver ID, or generic ID.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      driver_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Driver ID." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      odometer: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ description: "Odometer reading." }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Null,
        ]),
      ),
      unspecified_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "An alphanumeric ID. This field is used when a vehicle ID, driver ID, or generic ID is entered by the cardholder, but the merchant or card network did not specify the prompt type.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      user_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "User ID." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      vehicle_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Vehicle number." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingAuthorizationFleetCardholderPromptData",
    description: "",
    identifier: "Stripeissuing_authorization_fleet_cardholder_prompt_data",
  });
export const Stripeissuing_authorization_fleet_fuel_price_data =
  Schema.StructWithRest(
    Schema.Struct({
      gross_amount_decimal: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Gross fuel amount that should equal Fuel Quantity multiplied by Fuel Unit Cost, inclusive of taxes.",
            format: "decimal",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingAuthorizationFleetFuelPriceData",
    description: "",
    identifier: "Stripeissuing_authorization_fleet_fuel_price_data",
  });
export const Stripeissuing_authorization_fleet_non_fuel_price_data =
  Schema.StructWithRest(
    Schema.Struct({
      gross_amount_decimal: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Gross non-fuel amount that should equal the sum of the line items, inclusive of taxes.",
            format: "decimal",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingAuthorizationFleetNonFuelPriceData",
    description: "",
    identifier: "Stripeissuing_authorization_fleet_non_fuel_price_data",
  });
export const Stripeissuing_authorization_fleet_tax_data = Schema.StructWithRest(
  Schema.Struct({
    local_amount_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Amount of state or provincial Sales Tax included in the transaction amount. `null` if not reported by merchant or not subject to tax.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
    national_amount_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Amount of national Sales Tax or VAT included in the transaction amount. `null` if not reported by merchant or not subject to tax.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingAuthorizationFleetTaxData",
  description: "",
  identifier: "Stripeissuing_authorization_fleet_tax_data",
});
export const Stripeissuing_authorization_fraud_challenge =
  Schema.StructWithRest(
    Schema.Struct({
      channel: Schema.Literal("sms").annotate({
        description:
          "The method by which the fraud challenge was delivered to the cardholder.",
      }),
      status: Schema.Literals([
        "expired",
        "pending",
        "rejected",
        "undeliverable",
        "verified",
      ]).annotate({ description: "The status of the fraud challenge." }),
      undeliverable_reason: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "no_phone_number",
            "unsupported_phone_number",
          ]).annotate({
            description: "If the challenge is not deliverable, the reason why.",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingAuthorizationFraudChallenge",
    description: "",
    identifier: "Stripeissuing_authorization_fraud_challenge",
  });
export const Stripeissuing_authorization_fuel_data = Schema.StructWithRest(
  Schema.Struct({
    industry_product_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "[Conexxus Payment System Product Code](https://www.conexxus.org/conexxus-payment-system-product-codes) identifying the primary fuel product purchased.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    quantity_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The quantity of `unit`s of fuel that was dispensed, represented as a decimal string with at most 12 decimal places.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
    type: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "diesel",
          "other",
          "unleaded_plus",
          "unleaded_regular",
          "unleaded_super",
        ]).annotate({ description: "The type of fuel that was purchased." }),
        Schema.Null,
      ]),
    ),
    unit: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "charging_minute",
          "imperial_gallon",
          "kilogram",
          "kilowatt_hour",
          "liter",
          "other",
          "pound",
          "us_gallon",
        ]).annotate({ description: "The units for `quantity_decimal`." }),
        Schema.Null,
      ]),
    ),
    unit_cost_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The cost in cents per each unit of fuel, represented as a decimal string with at most 12 decimal places.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingAuthorizationFuelData",
  description: "",
  identifier: "Stripeissuing_authorization_fuel_data",
});
export const Stripeissuing_authorization_merchant_data = Schema.StructWithRest(
  Schema.Struct({
    category: Schema.String.annotate({
      description:
        "A categorization of the seller's type of business. See our [merchant categories guide](https://docs.stripe.com/issuing/merchant-categories) for a list of possible values.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    category_code: Schema.String.annotate({
      description: "The merchant category code for the seller’s business",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    city: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "City where the seller is located",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Country where the seller is located",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "Name of the seller" }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    network_id: Schema.String.annotate({
      description:
        "Identifier assigned to the seller by the card network. Different card networks may assign different network_id fields to the same merchant.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    postal_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Postal code where the seller is located",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    state: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "State where the seller is located",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    tax_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The seller's tax identification number. Currently populated for French merchants only.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    terminal_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "An ID assigned by the seller to the location of the sale.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    url: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "URL provided by the merchant on a 3DS request",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingAuthorizationMerchantData",
  description: "",
  identifier: "Stripeissuing_authorization_merchant_data",
});
export const Stripeissuing_authorization_network_data = Schema.StructWithRest(
  Schema.Struct({
    acquiring_institution_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Identifier assigned to the acquirer by the card network. Sometimes this value is not provided by the network; in this case, the value will be `null`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    system_trace_audit_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The System Trace Audit Number (STAN) is a 6-digit identifier assigned by the acquirer. Prefer `network_data.transaction_id` if present, unless you have special requirements.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Unique identifier for the authorization assigned by the card network used to match subsequent messages, disputes, and transactions.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingAuthorizationNetworkData",
  description: "",
  identifier: "Stripeissuing_authorization_network_data",
});
export const Stripeissuing_network_token_device = Schema.StructWithRest(
  Schema.Struct({
    device_fingerprint: Schema.optionalKey(
      Schema.String.annotate({
        description: "An obfuscated ID derived from the device ID.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    ip_address: Schema.optionalKey(
      Schema.String.annotate({
        description: "The IP address of the device at provisioning time.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    location: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The geographic latitude/longitude coordinates of the device at provisioning time. The format is [+-]decimal/[+-]decimal.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    name: Schema.optionalKey(
      Schema.String.annotate({
        description: "The name of the device used for tokenization.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    phone_number: Schema.optionalKey(
      Schema.String.annotate({
        description: "The phone number of the device used for tokenization.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    type: Schema.optionalKey(
      Schema.Literals(["other", "phone", "watch"]).annotate({
        description: "The type of device used for tokenization.",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingNetworkTokenDevice",
  description: "",
  identifier: "Stripeissuing_network_token_device",
});
export const Stripeissuing_network_token_mastercard = Schema.StructWithRest(
  Schema.Struct({
    card_reference_id: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A unique reference ID from Mastercard to represent the card account number.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    token_reference_id: Schema.String.annotate({
      description: "The network-unique identifier for the token.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    token_requestor_id: Schema.String.annotate({
      description:
        "The ID of the entity requesting tokenization, specific to Mastercard.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    token_requestor_name: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The name of the entity requesting tokenization, if known. This is directly provided from Mastercard.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingNetworkTokenMastercard",
  description: "",
  identifier: "Stripeissuing_network_token_mastercard",
});
export const Stripeissuing_network_token_visa = Schema.StructWithRest(
  Schema.Struct({
    card_reference_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique reference ID from Visa to represent the card account number.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    token_reference_id: Schema.String.annotate({
      description: "The network-unique identifier for the token.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    token_requestor_id: Schema.String.annotate({
      description:
        "The ID of the entity requesting tokenization, specific to Visa.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    token_risk_score: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Degree of risk associated with the token between `01` and `99`, with higher number indicating higher risk. A `00` value indicates the token was not scored by Visa.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingNetworkTokenVisa",
  description: "",
  identifier: "Stripeissuing_network_token_visa",
});
export const Stripeissuing_network_token_address = Schema.StructWithRest(
  Schema.Struct({
    line1: Schema.String.annotate({
      description: "The street address of the cardholder tokenizing the card.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    postal_code: Schema.String.annotate({
      description: "The postal code of the cardholder tokenizing the card.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingNetworkTokenAddress",
  description: "",
  identifier: "Stripeissuing_network_token_address",
});
export const Stripeissuing_transaction_amount_details = Schema.StructWithRest(
  Schema.Struct({
    atm_fee: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The fee charged by the ATM for the cash withdrawal.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    cashback_amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The amount of cash requested by the cardholder.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingTransactionAmountDetails",
  description: "",
  identifier: "Stripeissuing_transaction_amount_details",
});
export const Stripeissuing_dispute_canceled_evidence = Schema.suspend(
  (): Schema.Codec<Stripeissuing_dispute_canceled_evidence> =>
    Schema.StructWithRest(
      Schema.Struct({
        additional_documentation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional documentation supporting the dispute.",
            }),
            Schema.Null,
          ]),
        ),
        canceled_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "Date when order was canceled.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        cancellation_policy_provided: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Whether the cardholder was provided with a cancellation policy.",
            }),
            Schema.Null,
          ]),
        ),
        cancellation_reason: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Reason for canceling the order.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expected_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date when the cardholder expected to receive the product.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        explanation: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Explanation of why the cardholder is disputing this transaction.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        product_description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Description of the merchandise or service that was purchased.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        product_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["merchandise", "service"]).annotate({
              description: "Whether the product was a merchandise or service.",
            }),
            Schema.Null,
          ]),
        ),
        return_status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["merchant_rejected", "successful"]).annotate({
              description:
                "Result of cardholder's attempt to return the product.",
            }),
            Schema.Null,
          ]),
        ),
        returned_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date when the product was returned or attempted to be returned.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingDisputeCanceledEvidence",
      description: "",
      identifier: "Stripeissuing_dispute_canceled_evidence",
    }),
);
export const Stripeissuing_dispute_duplicate_evidence = Schema.suspend(
  (): Schema.Codec<Stripeissuing_dispute_duplicate_evidence> =>
    Schema.StructWithRest(
      Schema.Struct({
        additional_documentation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional documentation supporting the dispute.",
            }),
            Schema.Null,
          ]),
        ),
        card_statement: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Copy of the card statement showing that the product had already been paid for.",
            }),
            Schema.Null,
          ]),
        ),
        cash_receipt: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Copy of the receipt showing that the product had been paid for in cash.",
            }),
            Schema.Null,
          ]),
        ),
        check_image: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Image of the front and back of the check that was used to pay for the product.",
            }),
            Schema.Null,
          ]),
        ),
        explanation: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Explanation of why the cardholder is disputing this transaction.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        original_transaction: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Transaction (e.g., ipi_...) that the disputed transaction is a duplicate of. Of the two or more transactions that are copies of each other, this is original undisputed one.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingDisputeDuplicateEvidence",
      description: "",
      identifier: "Stripeissuing_dispute_duplicate_evidence",
    }),
);
export const Stripeissuing_dispute_fraudulent_evidence = Schema.suspend(
  (): Schema.Codec<Stripeissuing_dispute_fraudulent_evidence> =>
    Schema.StructWithRest(
      Schema.Struct({
        additional_documentation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional documentation supporting the dispute.",
            }),
            Schema.Null,
          ]),
        ),
        explanation: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Explanation of why the cardholder is disputing this transaction.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingDisputeFraudulentEvidence",
      description: "",
      identifier: "Stripeissuing_dispute_fraudulent_evidence",
    }),
);
export const Stripeissuing_dispute_merchandise_not_as_described_evidence =
  Schema.suspend(
    (): Schema.Codec<Stripeissuing_dispute_merchandise_not_as_described_evidence> =>
      Schema.StructWithRest(
        Schema.Struct({
          additional_documentation: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripefile,
              ]).annotate({
                description:
                  "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional documentation supporting the dispute.",
              }),
              Schema.Null,
            ]),
          ),
          explanation: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Explanation of why the cardholder is disputing this transaction.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          received_at: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description: "Date when the product was received.",
                format: "unix-time",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
          return_description: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Description of the cardholder's attempt to return the product.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          return_status: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["merchant_rejected", "successful"]).annotate({
                description:
                  "Result of cardholder's attempt to return the product.",
              }),
              Schema.Null,
            ]),
          ),
          returned_at: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description:
                  "Date when the product was returned or attempted to be returned.",
                format: "unix-time",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "IssuingDisputeMerchandiseNotAsDescribedEvidence",
        description: "",
        identifier:
          "Stripeissuing_dispute_merchandise_not_as_described_evidence",
      }),
  );
export const Stripeissuing_dispute_no_valid_authorization_evidence =
  Schema.suspend(
    (): Schema.Codec<Stripeissuing_dispute_no_valid_authorization_evidence> =>
      Schema.StructWithRest(
        Schema.Struct({
          additional_documentation: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripefile,
              ]).annotate({
                description:
                  "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional documentation supporting the dispute.",
              }),
              Schema.Null,
            ]),
          ),
          explanation: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Explanation of why the cardholder is disputing this transaction.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "IssuingDisputeNoValidAuthorizationEvidence",
        description: "",
        identifier: "Stripeissuing_dispute_no_valid_authorization_evidence",
      }),
  );
export const Stripeissuing_dispute_not_received_evidence = Schema.suspend(
  (): Schema.Codec<Stripeissuing_dispute_not_received_evidence> =>
    Schema.StructWithRest(
      Schema.Struct({
        additional_documentation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional documentation supporting the dispute.",
            }),
            Schema.Null,
          ]),
        ),
        expected_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date when the cardholder expected to receive the product.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        explanation: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Explanation of why the cardholder is disputing this transaction.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        product_description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Description of the merchandise or service that was purchased.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        product_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["merchandise", "service"]).annotate({
              description: "Whether the product was a merchandise or service.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingDisputeNotReceivedEvidence",
      description: "",
      identifier: "Stripeissuing_dispute_not_received_evidence",
    }),
);
export const Stripeissuing_dispute_other_evidence = Schema.suspend(
  (): Schema.Codec<Stripeissuing_dispute_other_evidence> =>
    Schema.StructWithRest(
      Schema.Struct({
        additional_documentation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional documentation supporting the dispute.",
            }),
            Schema.Null,
          ]),
        ),
        explanation: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Explanation of why the cardholder is disputing this transaction.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        product_description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Description of the merchandise or service that was purchased.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        product_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["merchandise", "service"]).annotate({
              description: "Whether the product was a merchandise or service.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingDisputeOtherEvidence",
      description: "",
      identifier: "Stripeissuing_dispute_other_evidence",
    }),
);
export const Stripeissuing_dispute_service_not_as_described_evidence =
  Schema.suspend(
    (): Schema.Codec<Stripeissuing_dispute_service_not_as_described_evidence> =>
      Schema.StructWithRest(
        Schema.Struct({
          additional_documentation: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripefile,
              ]).annotate({
                description:
                  "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional documentation supporting the dispute.",
              }),
              Schema.Null,
            ]),
          ),
          canceled_at: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description: "Date when order was canceled.",
                format: "unix-time",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
          cancellation_reason: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Reason for canceling the order.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          explanation: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Explanation of why the cardholder is disputing this transaction.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          received_at: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description: "Date when the product was received.",
                format: "unix-time",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "IssuingDisputeServiceNotAsDescribedEvidence",
        description: "",
        identifier: "Stripeissuing_dispute_service_not_as_described_evidence",
      }),
  );
export const Stripeissuing_dispute_treasury = Schema.StructWithRest(
  Schema.Struct({
    debit_reversal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Treasury [DebitReversal](https://docs.stripe.com/api/treasury/debit_reversals) representing this Issuing dispute",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    received_debit: Schema.String.annotate({
      description:
        "The Treasury [ReceivedDebit](https://docs.stripe.com/api/treasury/received_debits) that is being disputed.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingDisputeTreasury",
  description: "",
  identifier: "Stripeissuing_dispute_treasury",
});
export const Stripeissuing_transaction_network_data = Schema.StructWithRest(
  Schema.Struct({
    authorization_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            'A code created by Stripe which is shared with the merchant to validate the authorization. This field will be populated if the authorization message was approved. The code typically starts with the letter "S", followed by a six-digit number. For example, "S498162". Please note that the code is not guaranteed to be unique across authorizations.',
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    processing_date: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The date the transaction was processed by the card network. This can be different from the date the seller recorded the transaction depending on when the acquirer submits the transaction to the network.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Unique identifier for the authorization assigned by the card network used to match subsequent messages, disputes, and transactions.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingTransactionNetworkData",
  description: "",
  identifier: "Stripeissuing_transaction_network_data",
});
export const Stripeissuing_transaction_fleet_cardholder_prompt_data =
  Schema.StructWithRest(
    Schema.Struct({
      driver_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Driver ID." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      odometer: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ description: "Odometer reading." }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Null,
        ]),
      ),
      unspecified_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "An alphanumeric ID. This field is used when a vehicle ID, driver ID, or generic ID is entered by the cardholder, but the merchant or card network did not specify the prompt type.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      user_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "User ID." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      vehicle_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Vehicle number." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingTransactionFleetCardholderPromptData",
    description: "",
    identifier: "Stripeissuing_transaction_fleet_cardholder_prompt_data",
  });
export const Stripeissuing_transaction_fleet_fuel_price_data =
  Schema.StructWithRest(
    Schema.Struct({
      gross_amount_decimal: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Gross fuel amount that should equal Fuel Volume multiplied by Fuel Unit Cost, inclusive of taxes.",
            format: "decimal",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingTransactionFleetFuelPriceData",
    description: "",
    identifier: "Stripeissuing_transaction_fleet_fuel_price_data",
  });
export const Stripeissuing_transaction_fleet_non_fuel_price_data =
  Schema.StructWithRest(
    Schema.Struct({
      gross_amount_decimal: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Gross non-fuel amount that should equal the sum of the line items, inclusive of taxes.",
            format: "decimal",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingTransactionFleetNonFuelPriceData",
    description: "",
    identifier: "Stripeissuing_transaction_fleet_non_fuel_price_data",
  });
export const Stripeissuing_transaction_fleet_tax_data = Schema.StructWithRest(
  Schema.Struct({
    local_amount_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Amount of state or provincial Sales Tax included in the transaction amount. Null if not reported by merchant or not subject to tax.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
    national_amount_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Amount of national Sales Tax or VAT included in the transaction amount. Null if not reported by merchant or not subject to tax.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingTransactionFleetTaxData",
  description: "",
  identifier: "Stripeissuing_transaction_fleet_tax_data",
});
export const Stripeissuing_transaction_flight_data_leg = Schema.StructWithRest(
  Schema.Struct({
    arrival_airport_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The three-letter IATA airport code of the flight's destination.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    carrier: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The airline carrier code.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    departure_airport_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The three-letter IATA airport code that the flight departed from.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    flight_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "The flight number." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    service_class: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The flight's service class.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    stopover_allowed: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description: "Whether a stopover is allowed on this flight.",
        }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingTransactionFlightDataLeg",
  description: "",
  identifier: "Stripeissuing_transaction_flight_data_leg",
});
export const Stripeissuing_transaction_fuel_data = Schema.StructWithRest(
  Schema.Struct({
    industry_product_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "[Conexxus Payment System Product Code](https://www.conexxus.org/conexxus-payment-system-product-codes) identifying the primary fuel product purchased.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    quantity_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The quantity of `unit`s of fuel that was dispensed, represented as a decimal string with at most 12 decimal places.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
    type: Schema.String.annotate({
      description:
        "The type of fuel that was purchased. One of `diesel`, `unleaded_plus`, `unleaded_regular`, `unleaded_super`, or `other`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    unit: Schema.String.annotate({
      description:
        "The units for `quantity_decimal`. One of `charging_minute`, `imperial_gallon`, `kilogram`, `kilowatt_hour`, `liter`, `pound`, `us_gallon`, or `other`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    unit_cost_decimal: Schema.String.annotate({
      description:
        "The cost in cents per each unit of fuel, represented as a decimal string with at most 12 decimal places.",
      format: "decimal",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingTransactionFuelData",
  description: "",
  identifier: "Stripeissuing_transaction_fuel_data",
});
export const Stripeissuing_transaction_lodging_data = Schema.StructWithRest(
  Schema.Struct({
    check_in_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The time of checking into the lodging.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    nights: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The number of nights stayed at the lodging.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingTransactionLodgingData",
  description: "",
  identifier: "Stripeissuing_transaction_lodging_data",
});
export const Stripeissuing_transaction_receipt_data = Schema.StructWithRest(
  Schema.Struct({
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The description of the item. The maximum length of this field is 26 characters.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    quantity: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The quantity of the item.",
        }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
    total: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The total for this line item in cents.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    unit_cost: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The unit cost of the item in cents.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingTransactionReceiptData",
  description: "",
  identifier: "Stripeissuing_transaction_receipt_data",
});
export const Stripeissuing_transaction_treasury = Schema.StructWithRest(
  Schema.Struct({
    received_credit: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Treasury [ReceivedCredit](https://docs.stripe.com/api/treasury/received_credits) representing this Issuing transaction if it is a refund",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    received_debit: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Treasury [ReceivedDebit](https://docs.stripe.com/api/treasury/received_debits) representing this Issuing transaction if it is a capture",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingTransactionTreasury",
  description: "",
  identifier: "Stripeissuing_transaction_treasury",
});
export const Stripeissuing_authorization_treasury = Schema.StructWithRest(
  Schema.Struct({
    received_credits: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description:
        "The array of [ReceivedCredits](https://docs.stripe.com/api/treasury/received_credits) associated with this authorization",
    }),
    received_debits: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description:
        "The array of [ReceivedDebits](https://docs.stripe.com/api/treasury/received_debits) associated with this authorization",
    }),
    transaction: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Treasury [Transaction](https://docs.stripe.com/api/treasury/transactions) associated with this authorization",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingAuthorizationTreasury",
  description: "",
  identifier: "Stripeissuing_authorization_treasury",
});
export const Stripeissuing_authorization_authentication_exemption =
  Schema.StructWithRest(
    Schema.Struct({
      claimed_by: Schema.Literals(["acquirer", "issuer"]).annotate({
        description:
          "The entity that requested the exemption, either the acquiring merchant or the Issuing user.",
      }),
      type: Schema.Literals([
        "low_value_transaction",
        "transaction_risk_analysis",
        "unknown",
      ]).annotate({
        description: "The specific exemption claimed for this authorization.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "IssuingAuthorizationAuthenticationExemption",
    description: "",
    identifier: "Stripeissuing_authorization_authentication_exemption",
  });
export const Stripeissuing_authorization_three_d_secure = Schema.StructWithRest(
  Schema.Struct({
    result: Schema.Literals([
      "attempt_acknowledged",
      "authenticated",
      "failed",
      "required",
    ]).annotate({
      description: "The outcome of the 3D Secure authentication request.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingAuthorizationThreeDSecure",
  description: "",
  identifier: "Stripeissuing_authorization_three_d_secure",
});
export const Stripeissuing_card_shipping_address_validation = Schema.suspend(
  (): Schema.Codec<Stripeissuing_card_shipping_address_validation> =>
    Schema.StructWithRest(
      Schema.Struct({
        mode: Schema.Literals([
          "disabled",
          "normalization_only",
          "validation_and_normalization",
        ]).annotate({
          description: "The address validation capabilities to use.",
        }),
        normalized_address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaddress]).annotate({
              description: "The normalized shipping address.",
            }),
            Schema.Null,
          ]),
        ),
        result: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "indeterminate",
              "likely_deliverable",
              "likely_undeliverable",
            ]).annotate({
              description: "The validation result for the shipping address.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingCardShippingAddressValidation",
      description: "",
      identifier: "Stripeissuing_card_shipping_address_validation",
    }),
);
export const Stripeissuing_authorization_pending_request = Schema.suspend(
  (): Schema.Codec<Stripeissuing_authorization_pending_request> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The additional amount Stripe will hold if the authorization is approved, in the card's [currency](https://docs.stripe.com/api#issuing_authorization_object-pending-request-currency) and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_authorization_amount_details]).annotate(
              {
                description:
                  "Detailed breakdown of amount components. These amounts are denominated in `currency` and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
              },
            ),
            Schema.Null,
          ]),
        ),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        is_amount_controllable: Schema.Boolean.annotate({
          description:
            "If set `true`, you may provide [amount](https://docs.stripe.com/api/issuing/authorizations/approve#approve_issuing_authorization-amount) to control how much to hold for the authorization.",
        }),
        merchant_amount: Schema.Number.annotate({
          description:
            "The amount the merchant is requesting to be authorized in the `merchant_currency`. The amount is in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        merchant_currency: Schema.String.annotate({
          description:
            "The local currency the merchant is requesting to authorize.",
          format: "currency",
        }),
        network_risk_score: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The card network's estimate of the likelihood that an authorization is fraudulent. Takes on values between 1 and 99.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingAuthorizationPendingRequest",
      description: "",
      identifier: "Stripeissuing_authorization_pending_request",
    }),
);
export const Stripeissuing_authorization_request = Schema.suspend(
  (): Schema.Codec<Stripeissuing_authorization_request> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The `pending_request.amount` at the time of the request, presented in your card's currency and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). Stripe held this amount from your account to fund the authorization if the request was approved.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_authorization_amount_details]).annotate(
              {
                description:
                  "Detailed breakdown of amount components. These amounts are denominated in `currency` and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
              },
            ),
            Schema.Null,
          ]),
        ),
        approved: Schema.Boolean.annotate({
          description: "Whether this request was approved.",
        }),
        authorization_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                'A code created by Stripe which is shared with the merchant to validate the authorization. This field will be populated if the authorization message was approved. The code typically starts with the letter "S", followed by a six-digit number. For example, "S498162". Please note that the code is not guaranteed to be unique across authorizations.',
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        merchant_amount: Schema.Number.annotate({
          description:
            "The `pending_request.merchant_amount` at the time of the request, presented in the `merchant_currency` and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        merchant_currency: Schema.String.annotate({
          description:
            "The currency that was collected by the merchant and presented to the cardholder for the authorization. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        network_risk_score: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The card network's estimate of the likelihood that an authorization is fraudulent. Takes on values between 1 and 99.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        reason: Schema.Literals([
          "account_disabled",
          "card_active",
          "card_canceled",
          "card_expired",
          "card_inactive",
          "cardholder_blocked",
          "cardholder_inactive",
          "cardholder_verification_required",
          "insecure_authorization_method",
          "insufficient_funds",
          "network_fallback",
          "not_allowed",
          "pin_blocked",
          "spending_controls",
          "stripe_internal_error",
          "suspected_fraud",
          "verification_failed",
          "webhook_approved",
          "webhook_declined",
          "webhook_error",
          "webhook_timeout",
        ]).annotate({
          description:
            "When an authorization is approved or declined by you or by Stripe, this field provides additional detail on the reason for the outcome.",
        }),
        reason_message: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "If the `request_history.reason` is `webhook_error` because the direct webhook response is invalid (for example, parsing errors or missing parameters), we surface a more detailed error message via this field.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        requested_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time when the card network received an authorization request from the acquirer in UTC. Referred to by networks as transmission time.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingAuthorizationRequest",
      description: "",
      identifier: "Stripeissuing_authorization_request",
    }),
);
export const Stripeissuing_card_lifecycle_controls = Schema.suspend(
  (): Schema.Codec<Stripeissuing_card_lifecycle_controls> =>
    Schema.StructWithRest(
      Schema.Struct({ cancel_after: Stripeissuing_card_lifecycle_conditions }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingCardLifecycleControls",
      description: "",
      identifier: "Stripeissuing_card_lifecycle_controls",
    }),
);
export const Stripeissuing_physical_bundle = Schema.suspend(
  (): Schema.Codec<Stripeissuing_physical_bundle> =>
    Schema.StructWithRest(
      Schema.Struct({
        features: Stripeissuing_physical_bundle_features,
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        name: Schema.String.annotate({
          description: "Friendly display name.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("issuing.physical_bundle").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        status: Schema.Literals(["active", "inactive", "review"]).annotate({
          description:
            "Whether this physical bundle can be used to create cards.",
        }),
        type: Schema.Literals(["custom", "standard"]).annotate({
          description:
            "Whether this physical bundle is a standard Stripe offering or custom-made for you.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Physical Bundle",
      description:
        "A Physical Bundle represents the bundle of physical items - card stock, carrier letter, and envelope - that is shipped to a cardholder when you create a physical card.",
      identifier: "Stripeissuing.physical_bundle",
    }),
);
export const Stripeissuing_card_authorization_controls = Schema.suspend(
  (): Schema.Codec<Stripeissuing_card_authorization_controls> =>
    Schema.StructWithRest(
      Schema.Struct({
        allowed_card_presences: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Schema.Literals(["not_present", "present"])).annotate({
              description:
                "Array of card presence statuses from which authorizations will be allowed. Possible options are `present`, `not_present`. All other statuses will be blocked. Cannot be set with `blocked_card_presences`. Provide an empty value to unset this control.",
            }),
            Schema.Null,
          ]),
        ),
        allowed_categories: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "ac_refrigeration_repair",
                "accounting_bookkeeping_services",
                "advertising_services",
                "agricultural_cooperative",
                "airlines_air_carriers",
                "airports_flying_fields",
                "ambulance_services",
                "amusement_parks_carnivals",
                "antique_reproductions",
                "antique_shops",
                "aquariums",
                "architectural_surveying_services",
                "art_dealers_and_galleries",
                "artists_supply_and_craft_shops",
                "auto_and_home_supply_stores",
                "auto_body_repair_shops",
                "auto_paint_shops",
                "auto_service_shops",
                "automated_cash_disburse",
                "automated_fuel_dispensers",
                "automobile_associations",
                "automotive_parts_and_accessories_stores",
                "automotive_tire_stores",
                "bail_and_bond_payments",
                "bakeries",
                "bands_orchestras",
                "barber_and_beauty_shops",
                "betting_casino_gambling",
                "bicycle_shops",
                "billiard_pool_establishments",
                "boat_dealers",
                "boat_rentals_and_leases",
                "book_stores",
                "books_periodicals_and_newspapers",
                "bowling_alleys",
                "bus_lines",
                "business_secretarial_schools",
                "buying_shopping_services",
                "cable_satellite_and_other_pay_television_and_radio",
                "camera_and_photographic_supply_stores",
                "candy_nut_and_confectionery_stores",
                "car_and_truck_dealers_new_used",
                "car_and_truck_dealers_used_only",
                "car_rental_agencies",
                "car_washes",
                "carpentry_services",
                "carpet_upholstery_cleaning",
                "caterers",
                "charitable_and_social_service_organizations_fundraising",
                "chemicals_and_allied_products",
                "child_care_services",
                "childrens_and_infants_wear_stores",
                "chiropodists_podiatrists",
                "chiropractors",
                "cigar_stores_and_stands",
                "civic_social_fraternal_associations",
                "cleaning_and_maintenance",
                "clothing_rental",
                "colleges_universities",
                "commercial_equipment",
                "commercial_footwear",
                "commercial_photography_art_and_graphics",
                "commuter_transport_and_ferries",
                "computer_network_services",
                "computer_programming",
                "computer_repair",
                "computer_software_stores",
                "computers_peripherals_and_software",
                "concrete_work_services",
                "construction_materials",
                "consulting_public_relations",
                "correspondence_schools",
                "cosmetic_stores",
                "counseling_services",
                "country_clubs",
                "courier_services",
                "court_costs",
                "credit_reporting_agencies",
                "cruise_lines",
                "dairy_products_stores",
                "dance_hall_studios_schools",
                "dating_escort_services",
                "dentists_orthodontists",
                "department_stores",
                "detective_agencies",
                "digital_goods_applications",
                "digital_goods_games",
                "digital_goods_large_volume",
                "digital_goods_media",
                "direct_marketing_catalog_merchant",
                "direct_marketing_combination_catalog_and_retail_merchant",
                "direct_marketing_inbound_telemarketing",
                "direct_marketing_insurance_services",
                "direct_marketing_other",
                "direct_marketing_outbound_telemarketing",
                "direct_marketing_subscription",
                "direct_marketing_travel",
                "discount_stores",
                "doctors",
                "door_to_door_sales",
                "drapery_window_covering_and_upholstery_stores",
                "drinking_places",
                "drug_stores_and_pharmacies",
                "drugs_drug_proprietaries_and_druggist_sundries",
                "dry_cleaners",
                "durable_goods",
                "duty_free_stores",
                "eating_places_restaurants",
                "educational_services",
                "electric_razor_stores",
                "electric_vehicle_charging",
                "electrical_parts_and_equipment",
                "electrical_services",
                "electronics_repair_shops",
                "electronics_stores",
                "elementary_secondary_schools",
                "emergency_services_gcas_visa_use_only",
                "employment_temp_agencies",
                "equipment_rental",
                "exterminating_services",
                "family_clothing_stores",
                "fast_food_restaurants",
                "financial_institutions",
                "fines_government_administrative_entities",
                "fireplace_fireplace_screens_and_accessories_stores",
                "floor_covering_stores",
                "florists",
                "florists_supplies_nursery_stock_and_flowers",
                "freezer_and_locker_meat_provisioners",
                "fuel_dealers_non_automotive",
                "funeral_services_crematories",
                "furniture_home_furnishings_and_equipment_stores_except_appliances",
                "furniture_repair_refinishing",
                "furriers_and_fur_shops",
                "general_services",
                "gift_card_novelty_and_souvenir_shops",
                "glass_paint_and_wallpaper_stores",
                "glassware_crystal_stores",
                "golf_courses_public",
                "government_licensed_horse_dog_racing_us_region_only",
                "government_licensed_online_casions_online_gambling_us_region_only",
                "government_owned_lotteries_non_us_region",
                "government_owned_lotteries_us_region_only",
                "government_services",
                "grocery_stores_supermarkets",
                "hardware_equipment_and_supplies",
                "hardware_stores",
                "health_and_beauty_spas",
                "hearing_aids_sales_and_supplies",
                "heating_plumbing_a_c",
                "hobby_toy_and_game_shops",
                "home_supply_warehouse_stores",
                "hospitals",
                "hotels_motels_and_resorts",
                "household_appliance_stores",
                "industrial_supplies",
                "information_retrieval_services",
                "insurance_default",
                "insurance_underwriting_premiums",
                "intra_company_purchases",
                "jewelry_stores_watches_clocks_and_silverware_stores",
                "landscaping_services",
                "laundries",
                "laundry_cleaning_services",
                "legal_services_attorneys",
                "luggage_and_leather_goods_stores",
                "lumber_building_materials_stores",
                "manual_cash_disburse",
                "marinas_service_and_supplies",
                "marketplaces",
                "masonry_stonework_and_plaster",
                "massage_parlors",
                "medical_and_dental_labs",
                "medical_dental_ophthalmic_and_hospital_equipment_and_supplies",
                "medical_services",
                "membership_organizations",
                "mens_and_boys_clothing_and_accessories_stores",
                "mens_womens_clothing_stores",
                "metal_service_centers",
                "miscellaneous",
                "miscellaneous_apparel_and_accessory_shops",
                "miscellaneous_auto_dealers",
                "miscellaneous_business_services",
                "miscellaneous_food_stores",
                "miscellaneous_general_merchandise",
                "miscellaneous_general_services",
                "miscellaneous_home_furnishing_specialty_stores",
                "miscellaneous_publishing_and_printing",
                "miscellaneous_recreation_services",
                "miscellaneous_repair_shops",
                "miscellaneous_specialty_retail",
                "mobile_home_dealers",
                "motion_picture_theaters",
                "motor_freight_carriers_and_trucking",
                "motor_homes_dealers",
                "motor_vehicle_supplies_and_new_parts",
                "motorcycle_shops_and_dealers",
                "motorcycle_shops_dealers",
                "music_stores_musical_instruments_pianos_and_sheet_music",
                "news_dealers_and_newsstands",
                "non_fi_money_orders",
                "non_fi_stored_value_card_purchase_load",
                "nondurable_goods",
                "nurseries_lawn_and_garden_supply_stores",
                "nursing_personal_care",
                "office_and_commercial_furniture",
                "opticians_eyeglasses",
                "optometrists_ophthalmologist",
                "orthopedic_goods_prosthetic_devices",
                "osteopaths",
                "package_stores_beer_wine_and_liquor",
                "paints_varnishes_and_supplies",
                "parking_lots_garages",
                "passenger_railways",
                "pawn_shops",
                "pet_shops_pet_food_and_supplies",
                "petroleum_and_petroleum_products",
                "photo_developing",
                "photographic_photocopy_microfilm_equipment_and_supplies",
                "photographic_studios",
                "picture_video_production",
                "piece_goods_notions_and_other_dry_goods",
                "plumbing_heating_equipment_and_supplies",
                "political_organizations",
                "postal_services_government_only",
                "precious_stones_and_metals_watches_and_jewelry",
                "professional_services",
                "public_warehousing_and_storage",
                "quick_copy_repro_and_blueprint",
                "railroads",
                "real_estate_agents_and_managers_rentals",
                "record_stores",
                "recreational_vehicle_rentals",
                "religious_goods_stores",
                "religious_organizations",
                "roofing_siding_sheet_metal",
                "secretarial_support_services",
                "security_brokers_dealers",
                "service_stations",
                "sewing_needlework_fabric_and_piece_goods_stores",
                "shoe_repair_hat_cleaning",
                "shoe_stores",
                "small_appliance_repair",
                "snowmobile_dealers",
                "special_trade_services",
                "specialty_cleaning",
                "sporting_goods_stores",
                "sporting_recreation_camps",
                "sports_and_riding_apparel_stores",
                "sports_clubs_fields",
                "stamp_and_coin_stores",
                "stationary_office_supplies_printing_and_writing_paper",
                "stationery_stores_office_and_school_supply_stores",
                "swimming_pools_sales",
                "t_ui_travel_germany",
                "tailors_alterations",
                "tax_payments_government_agencies",
                "tax_preparation_services",
                "taxicabs_limousines",
                "telecommunication_equipment_and_telephone_sales",
                "telecommunication_services",
                "telegraph_services",
                "tent_and_awning_shops",
                "testing_laboratories",
                "theatrical_ticket_agencies",
                "timeshares",
                "tire_retreading_and_repair",
                "tolls_bridge_fees",
                "tourist_attractions_and_exhibits",
                "towing_services",
                "trailer_parks_campgrounds",
                "transportation_services",
                "travel_agencies_tour_operators",
                "truck_stop_iteration",
                "truck_utility_trailer_rentals",
                "typesetting_plate_making_and_related_services",
                "typewriter_stores",
                "u_s_federal_government_agencies_or_departments",
                "uniforms_commercial_clothing",
                "used_merchandise_and_secondhand_stores",
                "utilities",
                "variety_stores",
                "veterinary_services",
                "video_amusement_game_supplies",
                "video_game_arcades",
                "video_tape_rental_stores",
                "vocational_trade_schools",
                "watch_jewelry_repair",
                "welding_repair",
                "wholesale_clubs",
                "wig_and_toupee_stores",
                "wires_money_orders",
                "womens_accessory_and_specialty_shops",
                "womens_ready_to_wear_stores",
                "wrecking_and_salvage_yards",
              ]),
            ).annotate({
              description:
                "Array of strings containing [categories](https://docs.stripe.com/api#issuing_authorization_object-merchant_data-category) of authorizations to allow. All other categories will be blocked. Cannot be set with `blocked_categories`.",
            }),
            Schema.Null,
          ]),
        ),
        allowed_merchant_countries: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Array of strings containing representing countries from which authorizations will be allowed. Authorizations from merchants in all other countries will be declined. Country codes should be ISO 3166 alpha-2 country codes (e.g. `US`). Cannot be set with `blocked_merchant_countries`. Provide an empty value to unset this control.",
            }),
            Schema.Null,
          ]),
        ),
        blocked_card_presences: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Schema.Literals(["not_present", "present"])).annotate({
              description:
                "Array of card presence statuses from which authorizations will be declined. Possible options are `present`, `not_present`. Cannot be set with `allowed_card_presences`. Provide an empty value to unset this control.",
            }),
            Schema.Null,
          ]),
        ),
        blocked_categories: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "ac_refrigeration_repair",
                "accounting_bookkeeping_services",
                "advertising_services",
                "agricultural_cooperative",
                "airlines_air_carriers",
                "airports_flying_fields",
                "ambulance_services",
                "amusement_parks_carnivals",
                "antique_reproductions",
                "antique_shops",
                "aquariums",
                "architectural_surveying_services",
                "art_dealers_and_galleries",
                "artists_supply_and_craft_shops",
                "auto_and_home_supply_stores",
                "auto_body_repair_shops",
                "auto_paint_shops",
                "auto_service_shops",
                "automated_cash_disburse",
                "automated_fuel_dispensers",
                "automobile_associations",
                "automotive_parts_and_accessories_stores",
                "automotive_tire_stores",
                "bail_and_bond_payments",
                "bakeries",
                "bands_orchestras",
                "barber_and_beauty_shops",
                "betting_casino_gambling",
                "bicycle_shops",
                "billiard_pool_establishments",
                "boat_dealers",
                "boat_rentals_and_leases",
                "book_stores",
                "books_periodicals_and_newspapers",
                "bowling_alleys",
                "bus_lines",
                "business_secretarial_schools",
                "buying_shopping_services",
                "cable_satellite_and_other_pay_television_and_radio",
                "camera_and_photographic_supply_stores",
                "candy_nut_and_confectionery_stores",
                "car_and_truck_dealers_new_used",
                "car_and_truck_dealers_used_only",
                "car_rental_agencies",
                "car_washes",
                "carpentry_services",
                "carpet_upholstery_cleaning",
                "caterers",
                "charitable_and_social_service_organizations_fundraising",
                "chemicals_and_allied_products",
                "child_care_services",
                "childrens_and_infants_wear_stores",
                "chiropodists_podiatrists",
                "chiropractors",
                "cigar_stores_and_stands",
                "civic_social_fraternal_associations",
                "cleaning_and_maintenance",
                "clothing_rental",
                "colleges_universities",
                "commercial_equipment",
                "commercial_footwear",
                "commercial_photography_art_and_graphics",
                "commuter_transport_and_ferries",
                "computer_network_services",
                "computer_programming",
                "computer_repair",
                "computer_software_stores",
                "computers_peripherals_and_software",
                "concrete_work_services",
                "construction_materials",
                "consulting_public_relations",
                "correspondence_schools",
                "cosmetic_stores",
                "counseling_services",
                "country_clubs",
                "courier_services",
                "court_costs",
                "credit_reporting_agencies",
                "cruise_lines",
                "dairy_products_stores",
                "dance_hall_studios_schools",
                "dating_escort_services",
                "dentists_orthodontists",
                "department_stores",
                "detective_agencies",
                "digital_goods_applications",
                "digital_goods_games",
                "digital_goods_large_volume",
                "digital_goods_media",
                "direct_marketing_catalog_merchant",
                "direct_marketing_combination_catalog_and_retail_merchant",
                "direct_marketing_inbound_telemarketing",
                "direct_marketing_insurance_services",
                "direct_marketing_other",
                "direct_marketing_outbound_telemarketing",
                "direct_marketing_subscription",
                "direct_marketing_travel",
                "discount_stores",
                "doctors",
                "door_to_door_sales",
                "drapery_window_covering_and_upholstery_stores",
                "drinking_places",
                "drug_stores_and_pharmacies",
                "drugs_drug_proprietaries_and_druggist_sundries",
                "dry_cleaners",
                "durable_goods",
                "duty_free_stores",
                "eating_places_restaurants",
                "educational_services",
                "electric_razor_stores",
                "electric_vehicle_charging",
                "electrical_parts_and_equipment",
                "electrical_services",
                "electronics_repair_shops",
                "electronics_stores",
                "elementary_secondary_schools",
                "emergency_services_gcas_visa_use_only",
                "employment_temp_agencies",
                "equipment_rental",
                "exterminating_services",
                "family_clothing_stores",
                "fast_food_restaurants",
                "financial_institutions",
                "fines_government_administrative_entities",
                "fireplace_fireplace_screens_and_accessories_stores",
                "floor_covering_stores",
                "florists",
                "florists_supplies_nursery_stock_and_flowers",
                "freezer_and_locker_meat_provisioners",
                "fuel_dealers_non_automotive",
                "funeral_services_crematories",
                "furniture_home_furnishings_and_equipment_stores_except_appliances",
                "furniture_repair_refinishing",
                "furriers_and_fur_shops",
                "general_services",
                "gift_card_novelty_and_souvenir_shops",
                "glass_paint_and_wallpaper_stores",
                "glassware_crystal_stores",
                "golf_courses_public",
                "government_licensed_horse_dog_racing_us_region_only",
                "government_licensed_online_casions_online_gambling_us_region_only",
                "government_owned_lotteries_non_us_region",
                "government_owned_lotteries_us_region_only",
                "government_services",
                "grocery_stores_supermarkets",
                "hardware_equipment_and_supplies",
                "hardware_stores",
                "health_and_beauty_spas",
                "hearing_aids_sales_and_supplies",
                "heating_plumbing_a_c",
                "hobby_toy_and_game_shops",
                "home_supply_warehouse_stores",
                "hospitals",
                "hotels_motels_and_resorts",
                "household_appliance_stores",
                "industrial_supplies",
                "information_retrieval_services",
                "insurance_default",
                "insurance_underwriting_premiums",
                "intra_company_purchases",
                "jewelry_stores_watches_clocks_and_silverware_stores",
                "landscaping_services",
                "laundries",
                "laundry_cleaning_services",
                "legal_services_attorneys",
                "luggage_and_leather_goods_stores",
                "lumber_building_materials_stores",
                "manual_cash_disburse",
                "marinas_service_and_supplies",
                "marketplaces",
                "masonry_stonework_and_plaster",
                "massage_parlors",
                "medical_and_dental_labs",
                "medical_dental_ophthalmic_and_hospital_equipment_and_supplies",
                "medical_services",
                "membership_organizations",
                "mens_and_boys_clothing_and_accessories_stores",
                "mens_womens_clothing_stores",
                "metal_service_centers",
                "miscellaneous",
                "miscellaneous_apparel_and_accessory_shops",
                "miscellaneous_auto_dealers",
                "miscellaneous_business_services",
                "miscellaneous_food_stores",
                "miscellaneous_general_merchandise",
                "miscellaneous_general_services",
                "miscellaneous_home_furnishing_specialty_stores",
                "miscellaneous_publishing_and_printing",
                "miscellaneous_recreation_services",
                "miscellaneous_repair_shops",
                "miscellaneous_specialty_retail",
                "mobile_home_dealers",
                "motion_picture_theaters",
                "motor_freight_carriers_and_trucking",
                "motor_homes_dealers",
                "motor_vehicle_supplies_and_new_parts",
                "motorcycle_shops_and_dealers",
                "motorcycle_shops_dealers",
                "music_stores_musical_instruments_pianos_and_sheet_music",
                "news_dealers_and_newsstands",
                "non_fi_money_orders",
                "non_fi_stored_value_card_purchase_load",
                "nondurable_goods",
                "nurseries_lawn_and_garden_supply_stores",
                "nursing_personal_care",
                "office_and_commercial_furniture",
                "opticians_eyeglasses",
                "optometrists_ophthalmologist",
                "orthopedic_goods_prosthetic_devices",
                "osteopaths",
                "package_stores_beer_wine_and_liquor",
                "paints_varnishes_and_supplies",
                "parking_lots_garages",
                "passenger_railways",
                "pawn_shops",
                "pet_shops_pet_food_and_supplies",
                "petroleum_and_petroleum_products",
                "photo_developing",
                "photographic_photocopy_microfilm_equipment_and_supplies",
                "photographic_studios",
                "picture_video_production",
                "piece_goods_notions_and_other_dry_goods",
                "plumbing_heating_equipment_and_supplies",
                "political_organizations",
                "postal_services_government_only",
                "precious_stones_and_metals_watches_and_jewelry",
                "professional_services",
                "public_warehousing_and_storage",
                "quick_copy_repro_and_blueprint",
                "railroads",
                "real_estate_agents_and_managers_rentals",
                "record_stores",
                "recreational_vehicle_rentals",
                "religious_goods_stores",
                "religious_organizations",
                "roofing_siding_sheet_metal",
                "secretarial_support_services",
                "security_brokers_dealers",
                "service_stations",
                "sewing_needlework_fabric_and_piece_goods_stores",
                "shoe_repair_hat_cleaning",
                "shoe_stores",
                "small_appliance_repair",
                "snowmobile_dealers",
                "special_trade_services",
                "specialty_cleaning",
                "sporting_goods_stores",
                "sporting_recreation_camps",
                "sports_and_riding_apparel_stores",
                "sports_clubs_fields",
                "stamp_and_coin_stores",
                "stationary_office_supplies_printing_and_writing_paper",
                "stationery_stores_office_and_school_supply_stores",
                "swimming_pools_sales",
                "t_ui_travel_germany",
                "tailors_alterations",
                "tax_payments_government_agencies",
                "tax_preparation_services",
                "taxicabs_limousines",
                "telecommunication_equipment_and_telephone_sales",
                "telecommunication_services",
                "telegraph_services",
                "tent_and_awning_shops",
                "testing_laboratories",
                "theatrical_ticket_agencies",
                "timeshares",
                "tire_retreading_and_repair",
                "tolls_bridge_fees",
                "tourist_attractions_and_exhibits",
                "towing_services",
                "trailer_parks_campgrounds",
                "transportation_services",
                "travel_agencies_tour_operators",
                "truck_stop_iteration",
                "truck_utility_trailer_rentals",
                "typesetting_plate_making_and_related_services",
                "typewriter_stores",
                "u_s_federal_government_agencies_or_departments",
                "uniforms_commercial_clothing",
                "used_merchandise_and_secondhand_stores",
                "utilities",
                "variety_stores",
                "veterinary_services",
                "video_amusement_game_supplies",
                "video_game_arcades",
                "video_tape_rental_stores",
                "vocational_trade_schools",
                "watch_jewelry_repair",
                "welding_repair",
                "wholesale_clubs",
                "wig_and_toupee_stores",
                "wires_money_orders",
                "womens_accessory_and_specialty_shops",
                "womens_ready_to_wear_stores",
                "wrecking_and_salvage_yards",
              ]),
            ).annotate({
              description:
                "Array of strings containing [categories](https://docs.stripe.com/api#issuing_authorization_object-merchant_data-category) of authorizations to decline. All other categories will be allowed. Cannot be set with `allowed_categories`.",
            }),
            Schema.Null,
          ]),
        ),
        blocked_merchant_countries: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Array of strings containing representing countries from which authorizations will be declined. Country codes should be ISO 3166 alpha-2 country codes (e.g. `US`). Cannot be set with `allowed_merchant_countries`. Provide an empty value to unset this control.",
            }),
            Schema.Null,
          ]),
        ),
        spending_limits: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeissuing_card_spending_limit).annotate({
              description:
                "Limit spending with amount-based rules that apply across any cards this card replaced (i.e., its `replacement_for` card and _that_ card's `replacement_for` card, up the chain).",
            }),
            Schema.Null,
          ]),
        ),
        spending_limits_currency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Currency of the amounts within `spending_limits`. Always the same as the currency of the card.",
              format: "currency",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingCardAuthorizationControls",
      description: "",
      identifier: "Stripeissuing_card_authorization_controls",
    }),
);
export const Stripeissuing_card_wallets = Schema.suspend(
  (): Schema.Codec<Stripeissuing_card_wallets> =>
    Schema.StructWithRest(
      Schema.Struct({
        apple_pay: Stripeissuing_card_apple_pay,
        google_pay: Stripeissuing_card_google_pay,
        primary_account_identifier: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Unique identifier for a card used with digital wallets",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingCardWallets",
      description: "",
      identifier: "Stripeissuing_card_wallets",
    }),
);
export const Stripeissuing_authorization_fleet_reported_breakdown =
  Schema.suspend(
    (): Schema.Codec<Stripeissuing_authorization_fleet_reported_breakdown> =>
      Schema.StructWithRest(
        Schema.Struct({
          fuel: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeissuing_authorization_fleet_fuel_price_data,
              ]).annotate({
                description: "Breakdown of fuel portion of the purchase.",
              }),
              Schema.Null,
            ]),
          ),
          non_fuel: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeissuing_authorization_fleet_non_fuel_price_data,
              ]).annotate({
                description: "Breakdown of non-fuel portion of the purchase.",
              }),
              Schema.Null,
            ]),
          ),
          tax: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeissuing_authorization_fleet_tax_data,
              ]).annotate({
                description:
                  "Information about tax included in this transaction.",
              }),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "IssuingAuthorizationFleetReportedBreakdown",
        description: "",
        identifier: "Stripeissuing_authorization_fleet_reported_breakdown",
      }),
  );
export const Stripeissuing_network_token_wallet_provider = Schema.suspend(
  (): Schema.Codec<Stripeissuing_network_token_wallet_provider> =>
    Schema.StructWithRest(
      Schema.Struct({
        account_id: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The wallet provider-given account ID of the digital wallet the token belongs to.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        account_trust_score: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "An evaluation on the trustworthiness of the wallet account between 1 and 5. A higher score indicates more trustworthy.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        card_number_source: Schema.optionalKey(
          Schema.Literals(["app", "manual", "on_file", "other"]).annotate({
            description: "The method used for tokenizing a card.",
          }),
        ),
        cardholder_address: Schema.optionalKey(
          Stripeissuing_network_token_address,
        ),
        cardholder_name: Schema.optionalKey(
          Schema.String.annotate({
            description: "The name of the cardholder tokenizing the card.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        device_trust_score: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "An evaluation on the trustworthiness of the device. A higher score indicates more trustworthy.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        hashed_account_email_address: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The hashed email address of the cardholder's account with the wallet provider.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        reason_codes: Schema.optionalKey(
          Schema.Array(
            Schema.Literals([
              "account_card_too_new",
              "account_recently_changed",
              "account_too_new",
              "account_too_new_since_launch",
              "additional_device",
              "data_expired",
              "defer_id_v_decision",
              "device_recently_lost",
              "good_activity_history",
              "has_suspended_tokens",
              "high_risk",
              "inactive_account",
              "long_account_tenure",
              "low_account_score",
              "low_device_score",
              "low_phone_number_score",
              "network_service_error",
              "outside_home_territory",
              "provisioning_cardholder_mismatch",
              "provisioning_device_and_cardholder_mismatch",
              "provisioning_device_mismatch",
              "same_device_no_prior_authentication",
              "same_device_successful_prior_authentication",
              "software_update",
              "suspicious_activity",
              "too_many_different_cardholders",
              "too_many_recent_attempts",
              "too_many_recent_tokens",
            ]),
          ).annotate({
            description:
              "The reasons for suggested tokenization given by the card network.",
          }),
        ),
        suggested_decision: Schema.optionalKey(
          Schema.Literals(["approve", "decline", "require_auth"]).annotate({
            description:
              "The recommendation on responding to the tokenization request.",
          }),
        ),
        suggested_decision_version: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The version of the standard for mapping reason codes followed by the wallet provider.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingNetworkTokenWalletProvider",
      description: "",
      identifier: "Stripeissuing_network_token_wallet_provider",
    }),
);
export const Stripeissuing_dispute_evidence = Schema.suspend(
  (): Schema.Codec<Stripeissuing_dispute_evidence> =>
    Schema.StructWithRest(
      Schema.Struct({
        canceled: Schema.optionalKey(Stripeissuing_dispute_canceled_evidence),
        duplicate: Schema.optionalKey(Stripeissuing_dispute_duplicate_evidence),
        fraudulent: Schema.optionalKey(
          Stripeissuing_dispute_fraudulent_evidence,
        ),
        merchandise_not_as_described: Schema.optionalKey(
          Stripeissuing_dispute_merchandise_not_as_described_evidence,
        ),
        no_valid_authorization: Schema.optionalKey(
          Stripeissuing_dispute_no_valid_authorization_evidence,
        ),
        not_received: Schema.optionalKey(
          Stripeissuing_dispute_not_received_evidence,
        ),
        other: Schema.optionalKey(Stripeissuing_dispute_other_evidence),
        reason: Schema.Literals([
          "canceled",
          "duplicate",
          "fraudulent",
          "merchandise_not_as_described",
          "no_valid_authorization",
          "not_received",
          "other",
          "service_not_as_described",
        ]).annotate({
          description:
            "The reason for filing the dispute. Its value will match the field containing the evidence.",
        }),
        service_not_as_described: Schema.optionalKey(
          Stripeissuing_dispute_service_not_as_described_evidence,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingDisputeEvidence",
      description: "",
      identifier: "Stripeissuing_dispute_evidence",
    }),
);
export const Stripeissuing_transaction_fleet_reported_breakdown =
  Schema.suspend(
    (): Schema.Codec<Stripeissuing_transaction_fleet_reported_breakdown> =>
      Schema.StructWithRest(
        Schema.Struct({
          fuel: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeissuing_transaction_fleet_fuel_price_data,
              ]).annotate({
                description: "Breakdown of fuel portion of the purchase.",
              }),
              Schema.Null,
            ]),
          ),
          non_fuel: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeissuing_transaction_fleet_non_fuel_price_data,
              ]).annotate({
                description: "Breakdown of non-fuel portion of the purchase.",
              }),
              Schema.Null,
            ]),
          ),
          tax: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeissuing_transaction_fleet_tax_data]).annotate(
                {
                  description:
                    "Information about tax included in this transaction.",
                },
              ),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "IssuingTransactionFleetReportedBreakdown",
        description: "",
        identifier: "Stripeissuing_transaction_fleet_reported_breakdown",
      }),
  );
export const Stripeissuing_transaction_flight_data = Schema.suspend(
  (): Schema.Codec<Stripeissuing_transaction_flight_data> =>
    Schema.StructWithRest(
      Schema.Struct({
        departure_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "The time that the flight departed.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        passenger_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The name of the passenger.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        refundable: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description: "Whether the ticket is refundable.",
            }),
            Schema.Null,
          ]),
        ),
        segments: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeissuing_transaction_flight_data_leg).annotate({
              description: "The legs of the trip.",
            }),
            Schema.Null,
          ]),
        ),
        travel_agency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The travel agency that issued the ticket.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingTransactionFlightData",
      description: "",
      identifier: "Stripeissuing_transaction_flight_data",
    }),
);
export const Stripeissuing_authorization_verification_data = Schema.suspend(
  (): Schema.Codec<Stripeissuing_authorization_verification_data> =>
    Schema.StructWithRest(
      Schema.Struct({
        address_line1_check: Schema.Literals([
          "match",
          "mismatch",
          "not_provided",
        ]).annotate({
          description:
            "Whether the cardholder provided an address first line and if it matched the cardholder’s `billing.address.line1`.",
        }),
        address_postal_code_check: Schema.Literals([
          "match",
          "mismatch",
          "not_provided",
        ]).annotate({
          description:
            "Whether the cardholder provided a postal code and if it matched the cardholder’s `billing.address.postal_code`.",
        }),
        authentication_exemption: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_authorization_authentication_exemption,
            ]).annotate({
              description: "The exemption applied to this authorization.",
            }),
            Schema.Null,
          ]),
        ),
        cvc_check: Schema.Literals([
          "match",
          "mismatch",
          "not_provided",
        ]).annotate({
          description:
            "Whether the cardholder provided a CVC and if it matched Stripe’s record.",
        }),
        expiry_check: Schema.Literals([
          "match",
          "mismatch",
          "not_provided",
        ]).annotate({
          description:
            "Whether the cardholder provided an expiry date and if it matched Stripe’s record.",
        }),
        postal_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The postal code submitted as part of the authorization used for postal code verification.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        three_d_secure: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_authorization_three_d_secure]).annotate(
              { description: "3D Secure details." },
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingAuthorizationVerificationData",
      description: "",
      identifier: "Stripeissuing_authorization_verification_data",
    }),
);
export const Stripeissuing_card_shipping = Schema.suspend(
  (): Schema.Codec<Stripeissuing_card_shipping> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Stripeaddress,
        address_validation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_card_shipping_address_validation,
            ]).annotate({
              description: "Address validation details for the shipment.",
            }),
            Schema.Null,
          ]),
        ),
        business_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The name of the business at the shipping address, used on the shipping label to ensure delivery when the card is shipped to a cardholder's workplace.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        carrier: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "correos",
              "dhl",
              "fedex",
              "royal_mail",
              "usps",
            ]).annotate({
              description: "The delivery company that shipped a card.",
            }),
            Schema.Null,
          ]),
        ),
        customs: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_card_shipping_customs]).annotate({
              description:
                "Additional information that may be required for clearing customs.",
            }),
            Schema.Null,
          ]),
        ),
        delivered_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The time the card was reported as delivered. Null for undelivered or untracked shipments, or if Stripe has not recorded a delivery time.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        eta: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "A unix timestamp representing a best estimate of when the card will be delivered.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        name: Schema.String.annotate({ description: "Recipient name." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        phone_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The phone number of the receiver of the shipment. Our courier partners will use this number to contact you in the event of card delivery issues. For individual shipments to the EU/UK, if this field is empty, we will provide them with the phone number provided when the cardholder was initially created.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        require_signature: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Whether a signature is required for card delivery. This feature is only supported for US users. Standard shipping service does not support signature on delivery. The default value for standard shipping service is false and for express and priority services is true.",
            }),
            Schema.Null,
          ]),
        ),
        service: Schema.Literals(["express", "priority", "standard"]).annotate({
          description: "Shipment service, such as `standard` or `express`.",
        }),
        shipped_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The time the card was reported as shipped. Null if Stripe has not recorded a shipment time.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "canceled",
              "delivered",
              "failure",
              "pending",
              "returned",
              "shipped",
              "submitted",
            ]).annotate({ description: "The delivery status of the card." }),
            Schema.Null,
          ]),
        ),
        tracking_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "A tracking number for a card shipment.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        tracking_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A link to the shipping carrier's site where you can view detailed information about a card shipment.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        type: Schema.Literals(["bulk", "individual"]).annotate({
          description: "Packaging options.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingCardShipping",
      description: "",
      identifier: "Stripeissuing_card_shipping",
    }),
);
export const Stripeissuing_personalization_design = Schema.suspend(
  (): Schema.Codec<Stripeissuing_personalization_design> =>
    Schema.StructWithRest(
      Schema.Struct({
        card_logo: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "The file for the card logo to use with physical bundles that support card logos. Must have a `purpose` value of `issuing_logo`. Image must be in PNG format with dimensions of 1000px by 200px. It must be a binary (black and white) image containing a black logo on a white background. We don't accept grayscale.",
            }),
            Schema.Null,
          ]),
        ),
        carrier_text: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_personalization_design_carrier_text,
            ]).annotate({
              description:
                "Hash containing carrier text, for use with physical bundles that support carrier text.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        lookup_key: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A lookup key used to retrieve personalization designs dynamically from a static string. This may be up to 200 characters.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Friendly display name.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("issuing.personalization_design").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        physical_bundle: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripeissuing_physical_bundle,
        ]).annotate({
          description:
            "The physical bundle object belonging to this personalization design.",
        }),
        preferences: Stripeissuing_personalization_design_preferences,
        rejection_reasons:
          Stripeissuing_personalization_design_rejection_reasons,
        status: Schema.Literals([
          "active",
          "inactive",
          "rejected",
          "review",
        ]).annotate({
          description:
            "Whether this personalization design can be used to create cards.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Personalization Design",
      description:
        "A Personalization Design is a logical grouping of a Physical Bundle, card logo, and carrier text that represents a product line.",
      identifier: "Stripeissuing.personalization_design",
    }),
);
export const Stripeissuing_authorization_fleet_data = Schema.suspend(
  (): Schema.Codec<Stripeissuing_authorization_fleet_data> =>
    Schema.StructWithRest(
      Schema.Struct({
        cardholder_prompt_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_authorization_fleet_cardholder_prompt_data,
            ]).annotate({
              description:
                "Answers to prompts presented to the cardholder at the point of sale. Prompted fields vary depending on the configuration of your physical fleet cards. Typical points of sale support only numeric entry.",
            }),
            Schema.Null,
          ]),
        ),
        purchase_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "fuel_and_non_fuel_purchase",
              "fuel_purchase",
              "non_fuel_purchase",
            ]).annotate({ description: "The type of purchase." }),
            Schema.Null,
          ]),
        ),
        reported_breakdown: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_authorization_fleet_reported_breakdown,
            ]).annotate({
              description:
                "More information about the total amount. Typically this information is received from the merchant after the authorization has been approved and the fuel dispensed. This information is not guaranteed to be accurate as some merchants may provide unreliable data.",
            }),
            Schema.Null,
          ]),
        ),
        service_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "full_service",
              "non_fuel_transaction",
              "self_service",
            ]).annotate({ description: "The type of fuel service." }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingAuthorizationFleetData",
      description: "",
      identifier: "Stripeissuing_authorization_fleet_data",
    }),
);
export const Stripeissuing_network_token_network_data = Schema.suspend(
  (): Schema.Codec<Stripeissuing_network_token_network_data> =>
    Schema.StructWithRest(
      Schema.Struct({
        device: Schema.optionalKey(Stripeissuing_network_token_device),
        mastercard: Schema.optionalKey(Stripeissuing_network_token_mastercard),
        type: Schema.Literals(["mastercard", "visa"]).annotate({
          description:
            "The network that the token is associated with. An additional hash is included with a name matching this value, containing tokenization data specific to the card network.",
        }),
        visa: Schema.optionalKey(Stripeissuing_network_token_visa),
        wallet_provider: Schema.optionalKey(
          Stripeissuing_network_token_wallet_provider,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingNetworkTokenNetworkData",
      description: "",
      identifier: "Stripeissuing_network_token_network_data",
    }),
);
export const Stripeissuing_transaction_fleet_data = Schema.suspend(
  (): Schema.Codec<Stripeissuing_transaction_fleet_data> =>
    Schema.StructWithRest(
      Schema.Struct({
        cardholder_prompt_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_transaction_fleet_cardholder_prompt_data,
            ]).annotate({
              description:
                "Answers to prompts presented to cardholder at point of sale.",
            }),
            Schema.Null,
          ]),
        ),
        purchase_type: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The type of purchase. One of `fuel_purchase`, `non_fuel_purchase`, or `fuel_and_non_fuel_purchase`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        reported_breakdown: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_transaction_fleet_reported_breakdown,
            ]).annotate({
              description:
                "More information about the total amount. This information is not guaranteed to be accurate as some merchants may provide unreliable data.",
            }),
            Schema.Null,
          ]),
        ),
        service_type: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The type of fuel service. One of `non_fuel_transaction`, `full_service`, or `self_service`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingTransactionFleetData",
      description: "",
      identifier: "Stripeissuing_transaction_fleet_data",
    }),
);
export const Stripeissuing_token = Schema.suspend(
  (): Schema.Codec<Stripeissuing_token> =>
    Schema.StructWithRest(
      Schema.Struct({
        card: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripeissuing_card,
        ]).annotate({ description: "Card associated with this token." }),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        device_fingerprint: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The hashed ID derived from the device ID from the card network associated with the token.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        last4: Schema.optionalKey(
          Schema.String.annotate({
            description: "The last four digits of the token.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        network: Schema.Literals(["mastercard", "visa"]).annotate({
          description:
            "The token service provider / card network associated with the token.",
        }),
        network_data: Schema.optionalKey(
          Stripeissuing_network_token_network_data,
        ),
        network_updated_at: Schema.Number.annotate({
          description:
            "Time at which the token was last updated by the card network. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        object: Schema.Literal("issuing.token").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        status: Schema.Literals([
          "active",
          "deleted",
          "requested",
          "suspended",
        ]).annotate({ description: "The usage state of the token." }),
        wallet_provider: Schema.optionalKey(
          Schema.Literals(["apple_pay", "google_pay", "samsung_pay"]).annotate({
            description: "The digital wallet for this token, if one was used.",
          }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Token",
      description:
        "An issuing token object is created when an issued card is added to a digital wallet. As a [card issuer](https://docs.stripe.com/issuing), you can [view and manage these tokens](https://docs.stripe.com/issuing/controls/token-management) through Stripe.",
      identifier: "Stripeissuing.token",
    }),
);
export const Stripeissuing_transaction_purchase_details = Schema.suspend(
  (): Schema.Codec<Stripeissuing_transaction_purchase_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        fleet: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_transaction_fleet_data]).annotate({
              description:
                "Fleet-specific information for transactions using Fleet cards.",
            }),
            Schema.Null,
          ]),
        ),
        flight: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_transaction_flight_data]).annotate({
              description:
                "Information about the flight that was purchased with this transaction.",
            }),
            Schema.Null,
          ]),
        ),
        fuel: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_transaction_fuel_data]).annotate({
              description:
                "Information about fuel that was purchased with this transaction.",
            }),
            Schema.Null,
          ]),
        ),
        lodging: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_transaction_lodging_data]).annotate({
              description:
                "Information about lodging that was purchased with this transaction.",
            }),
            Schema.Null,
          ]),
        ),
        receipt: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeissuing_transaction_receipt_data).annotate({
              description: "The line items in the purchase.",
            }),
            Schema.Null,
          ]),
        ),
        reference: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "A merchant-specific order number.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IssuingTransactionPurchaseDetails",
      description: "",
      identifier: "Stripeissuing_transaction_purchase_details",
    }),
);
