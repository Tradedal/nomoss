// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaddress, Stripefile } from "./common.js";

export type Stripeissuing_cardholder_company = {
  readonly tax_id_provided: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder_user_terms_acceptance = {
  readonly date?: number | null;
  readonly ip?: string | null;
  readonly user_agent?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder_individual_dob = {
  readonly day?: number | null;
  readonly month?: number | null;
  readonly year?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder_id_document = {
  readonly back?: string | Stripefile | null;
  readonly front?: string | Stripefile | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder_requirements = {
  readonly disabled_reason?:
    | "listed"
    | "rejected.listed"
    | "requirements.past_due"
    | "under_review"
    | null;
  readonly past_due?: ReadonlyArray<
    | "company.tax_id"
    | "individual.card_issuing.user_terms_acceptance.date"
    | "individual.card_issuing.user_terms_acceptance.ip"
    | "individual.dob.day"
    | "individual.dob.month"
    | "individual.dob.year"
    | "individual.first_name"
    | "individual.last_name"
    | "individual.verification.document"
  > | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder_spending_limit = {
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
export type Stripeissuing_cardholder_address = {
  readonly address: Stripeaddress;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder_card_issuing = {
  readonly user_terms_acceptance?: Stripeissuing_cardholder_user_terms_acceptance | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder_verification = {
  readonly document?: Stripeissuing_cardholder_id_document | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder_authorization_controls = {
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
  readonly spending_limits?: ReadonlyArray<Stripeissuing_cardholder_spending_limit> | null;
  readonly spending_limits_currency?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder_individual = {
  readonly card_issuing?: Stripeissuing_cardholder_card_issuing | null;
  readonly dob?: Stripeissuing_cardholder_individual_dob | null;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly verification?: Stripeissuing_cardholder_verification | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeissuing_cardholder = {
  readonly billing: Stripeissuing_cardholder_address;
  readonly company?: Stripeissuing_cardholder_company | null;
  readonly created: number;
  readonly email?: string | null;
  readonly id: string;
  readonly individual?: Stripeissuing_cardholder_individual | null;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly name: string;
  readonly object: "issuing.cardholder";
  readonly phone_number?: string | null;
  readonly preferred_locales?: ReadonlyArray<
    "de" | "en" | "es" | "fr" | "it"
  > | null;
  readonly requirements: Stripeissuing_cardholder_requirements;
  readonly spending_controls?: Stripeissuing_cardholder_authorization_controls | null;
  readonly status: "active" | "blocked" | "inactive";
  readonly type: "company" | "individual";
} & { readonly [x: string]: Schema.Json };

export const Stripeissuing_cardholder_company = Schema.StructWithRest(
  Schema.Struct({
    tax_id_provided: Schema.Boolean.annotate({
      description: "Whether the company's business ID number was provided.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "IssuingCardholderCompany",
  description: "",
  identifier: "Stripeissuing_cardholder_company",
});
export const Stripeissuing_cardholder_user_terms_acceptance =
  Schema.StructWithRest(
    Schema.Struct({
      date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The Unix timestamp marking when the cardholder accepted the Authorized User Terms.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      ip: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The IP address from which the cardholder accepted the Authorized User Terms.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      user_agent: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The user agent of the browser from which the cardholder accepted the Authorized User Terms.",
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
    title: "IssuingCardholderUserTermsAcceptance",
    description: "",
    identifier: "Stripeissuing_cardholder_user_terms_acceptance",
  });
export const Stripeissuing_cardholder_individual_dob = Schema.StructWithRest(
  Schema.Struct({
    day: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The day of birth, between 1 and 31.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    month: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The month of birth, between 1 and 12.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    year: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The four-digit year of birth.",
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
  title: "IssuingCardholderIndividualDOB",
  description: "",
  identifier: "Stripeissuing_cardholder_individual_dob",
});
export const Stripeissuing_cardholder_id_document = Schema.suspend(
  (): Schema.Codec<Stripeissuing_cardholder_id_document> =>
    Schema.StructWithRest(
      Schema.Struct({
        back: Schema.optionalKey(
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
                "The back of a document returned by a [file upload](https://docs.stripe.com/api#create_file) with a `purpose` value of `identity_document`.",
            }),
            Schema.Null,
          ]),
        ),
        front: Schema.optionalKey(
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
                "The front of a document returned by a [file upload](https://docs.stripe.com/api#create_file) with a `purpose` value of `identity_document`.",
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
      title: "IssuingCardholderIdDocument",
      description: "",
      identifier: "Stripeissuing_cardholder_id_document",
    }),
);
export const Stripeissuing_cardholder_requirements = Schema.StructWithRest(
  Schema.Struct({
    disabled_reason: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "listed",
          "rejected.listed",
          "requirements.past_due",
          "under_review",
        ]).annotate({
          description:
            "If `disabled_reason` is present, all cards will decline authorizations with `cardholder_verification_required` reason.",
        }),
        Schema.Null,
      ]),
    ),
    past_due: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          Schema.Literals([
            "company.tax_id",
            "individual.card_issuing.user_terms_acceptance.date",
            "individual.card_issuing.user_terms_acceptance.ip",
            "individual.dob.day",
            "individual.dob.month",
            "individual.dob.year",
            "individual.first_name",
            "individual.last_name",
            "individual.verification.document",
          ]),
        ).annotate({
          description:
            "Array of fields that need to be collected in order to verify and re-enable the cardholder.",
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
  title: "IssuingCardholderRequirements",
  description: "",
  identifier: "Stripeissuing_cardholder_requirements",
});
export const Stripeissuing_cardholder_spending_limit = Schema.StructWithRest(
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
  title: "IssuingCardholderSpendingLimit",
  description: "",
  identifier: "Stripeissuing_cardholder_spending_limit",
});
export const Stripeissuing_cardholder_address = Schema.suspend(
  (): Schema.Codec<Stripeissuing_cardholder_address> =>
    Schema.StructWithRest(Schema.Struct({ address: Stripeaddress }), [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ]).annotate({
      title: "IssuingCardholderAddress",
      description: "",
      identifier: "Stripeissuing_cardholder_address",
    }),
);
export const Stripeissuing_cardholder_card_issuing = Schema.suspend(
  (): Schema.Codec<Stripeissuing_cardholder_card_issuing> =>
    Schema.StructWithRest(
      Schema.Struct({
        user_terms_acceptance: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_cardholder_user_terms_acceptance,
            ]).annotate({
              description:
                "Information about cardholder acceptance of Celtic [Authorized User Terms](https://docs.stripe.com/issuing/compliance-us#issuing-terms). Required for cards backed by a Celtic program.",
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
      title: "IssuingCardholderCardIssuing",
      description: "",
      identifier: "Stripeissuing_cardholder_card_issuing",
    }),
);
export const Stripeissuing_cardholder_verification = Schema.suspend(
  (): Schema.Codec<Stripeissuing_cardholder_verification> =>
    Schema.StructWithRest(
      Schema.Struct({
        document: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_cardholder_id_document]).annotate({
              description:
                "An identifying document, either a passport or local ID card.",
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
      title: "IssuingCardholderVerification",
      description: "",
      identifier: "Stripeissuing_cardholder_verification",
    }),
);
export const Stripeissuing_cardholder_authorization_controls = Schema.suspend(
  (): Schema.Codec<Stripeissuing_cardholder_authorization_controls> =>
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
            Schema.Array(Stripeissuing_cardholder_spending_limit).annotate({
              description:
                "Limit spending with amount-based rules that apply across this cardholder's cards.",
            }),
            Schema.Null,
          ]),
        ),
        spending_limits_currency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Currency of the amounts within `spending_limits`.",
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
      title: "IssuingCardholderAuthorizationControls",
      description: "",
      identifier: "Stripeissuing_cardholder_authorization_controls",
    }),
);
export const Stripeissuing_cardholder_individual = Schema.suspend(
  (): Schema.Codec<Stripeissuing_cardholder_individual> =>
    Schema.StructWithRest(
      Schema.Struct({
        card_issuing: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_cardholder_card_issuing]).annotate({
              description:
                "Information related to the card_issuing program for this cardholder.",
            }),
            Schema.Null,
          ]),
        ),
        dob: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_cardholder_individual_dob]).annotate({
              description: "The date of birth of this cardholder.",
            }),
            Schema.Null,
          ]),
        ),
        first_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The first name of this cardholder. Required before activating Cards. This field cannot contain any numbers, special characters (except periods, commas, hyphens, spaces and apostrophes) or non-latin letters.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        last_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The last name of this cardholder. Required before activating Cards. This field cannot contain any numbers, special characters (except periods, commas, hyphens, spaces and apostrophes) or non-latin letters.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        verification: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_cardholder_verification]).annotate({
              description: "Government-issued ID document for this cardholder.",
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
      title: "IssuingCardholderIndividual",
      description: "",
      identifier: "Stripeissuing_cardholder_individual",
    }),
);
export const Stripeissuing_cardholder = Schema.suspend(
  (): Schema.Codec<Stripeissuing_cardholder> =>
    Schema.StructWithRest(
      Schema.Struct({
        billing: Stripeissuing_cardholder_address,
        company: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_cardholder_company]).annotate({
              description:
                "Additional information about a `company` cardholder.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The cardholder's email address.",
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
        individual: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeissuing_cardholder_individual]).annotate({
              description:
                "Additional information about an `individual` cardholder.",
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
        name: Schema.String.annotate({
          description:
            "The cardholder's name. This will be printed on cards issued to them.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("issuing.cardholder").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        phone_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The cardholder's phone number. This is required for all cardholders who will be creating EU cards. See the [3D Secure documentation](https://docs.stripe.com/issuing/3d-secure#when-is-3d-secure-applied) for more details.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        preferred_locales: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals(["de", "en", "es", "fr", "it"]),
            ).annotate({
              description:
                "The cardholder’s preferred locales (languages), ordered by preference. Locales can be `de`, `en`, `es`, `fr`, or `it`.\n This changes the language of the [3D Secure flow](https://docs.stripe.com/issuing/3d-secure) and one-time password messages sent to the cardholder.",
            }),
            Schema.Null,
          ]),
        ),
        requirements: Stripeissuing_cardholder_requirements,
        spending_controls: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeissuing_cardholder_authorization_controls,
            ]).annotate({
              description:
                "Rules that control spending across this cardholder's cards. Refer to our [documentation](https://docs.stripe.com/issuing/controls/spending-controls) for more details.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["active", "blocked", "inactive"]).annotate({
          description:
            "Specifies whether to permit authorizations on this cardholder's cards.",
        }),
        type: Schema.Literals(["company", "individual"]).annotate({
          description:
            "One of `individual` or `company`. See [Choose a cardholder type](https://docs.stripe.com/issuing/other/choose-cardholder) for more details.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Cardholder",
      description:
        "An Issuing `Cardholder` object represents an individual or business entity who is [issued](https://docs.stripe.com/issuing) cards.\n\nRelated guide: [How to create a cardholder](https://docs.stripe.com/issuing/cards/virtual/issue-cards#create-cardholder)",
      identifier: "Stripeissuing.cardholder",
    }),
);
