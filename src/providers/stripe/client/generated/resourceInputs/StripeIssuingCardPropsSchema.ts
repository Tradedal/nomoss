// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeIssuingCardProps = {
  readonly cardholder?: string;
  readonly currency: string;
  readonly exp_month?: number;
  readonly exp_year?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account?: string;
  readonly lifecycle_controls?: {
    readonly cancel_after: { readonly payment_count: number } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly personalization_design?: string;
  readonly pin?: { readonly encrypted_number?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly replacement_for?: string;
  readonly replacement_reason?: "damaged" | "expired" | "lost" | "stolen";
  readonly second_line?: string | "";
  readonly shipping?: {
    readonly address: {
      readonly city: string;
      readonly country: string;
      readonly line1: string;
      readonly line2?: string;
      readonly postal_code: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly address_validation?: {
      readonly mode:
        | "disabled"
        | "normalization_only"
        | "validation_and_normalization";
    } & { readonly [x: string]: Schema.Json };
    readonly business_name?: string;
    readonly customs?: { readonly eori_number?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly name: string;
    readonly phone_number?: string;
    readonly require_signature?: boolean;
    readonly service?: "express" | "priority" | "standard";
    readonly type?: "bulk" | "individual";
  } & { readonly [x: string]: Schema.Json };
  readonly spending_controls?: {
    readonly allowed_card_presences?: ReadonlyArray<"not_present" | "present">;
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
    >;
    readonly allowed_merchant_countries?: ReadonlyArray<string>;
    readonly blocked_card_presences?: ReadonlyArray<"not_present" | "present">;
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
    >;
    readonly blocked_merchant_countries?: ReadonlyArray<string>;
    readonly spending_limits?: ReadonlyArray<
      {
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
        >;
        readonly interval:
          | "all_time"
          | "daily"
          | "monthly"
          | "per_authorization"
          | "weekly"
          | "yearly";
      } & { readonly [x: string]: Schema.Json }
    >;
  } & { readonly [x: string]: Schema.Json };
  readonly status?: "active" | "inactive";
  readonly type: "physical" | "virtual";
};

export const StripeIssuingCardResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "issuing-card",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/IssuingCardId"],
  });
export const StripeIssuingCardPropsSchema = annotateResourceSchema(
  Schema.Struct({
    cardholder: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The [Cardholder](https://docs.stripe.com/api#issuing_cardholder_object) object with which the card will be associated.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    currency: Schema.String.annotate({
      description: "The currency for the card.",
    }),
    exp_month: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The desired expiration month (1-12) for this card if [specifying a custom expiration date](/issuing/cards/virtual/issue-cards?testing-method=with-code#exp-dates).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    exp_year: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The desired 4-digit expiration year for this card if [specifying a custom expiration date](/issuing/cards/virtual/issue-cards?testing-method=with-code#exp-dates).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    financial_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The new financial account ID the card will be associated with. This field allows a card to be reassigned to a different financial account.",
      }),
    ),
    lifecycle_controls: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          cancel_after: Schema.StructWithRest(
            Schema.Struct({ payment_count: Schema.Int }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "lifecycle_conditions_param" }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "lifecycle_controls_param",
        description:
          "Rules that control the lifecycle of this card, such as automatic cancellation. Refer to our [documentation](/issuing/controls/lifecycle-controls) for more details.",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    personalization_design: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The personalization design object belonging to this card.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    pin: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          encrypted_number: Schema.optionalKey(
            Schema.String.check(
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
        title: "encrypted_pin_param",
        description: "The desired PIN for this card.",
      }),
    ),
    replacement_for: Schema.optionalKey(
      Schema.String.annotate({
        description: "The card this is meant to be a replacement for (if any).",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    replacement_reason: Schema.optionalKey(
      Schema.Literals(["damaged", "expired", "lost", "stolen"]).annotate({
        description:
          "If `replacement_for` is specified, this should indicate why that card is being replaced.",
      }),
    ),
    second_line: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Literal(""),
      ]).annotate({
        description:
          "The second line to print on the card. Max length: 24 characters.",
      }),
    ),
    shipping: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          address: Schema.StructWithRest(
            Schema.Struct({
              city: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              country: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              line1: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              line2: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              postal_code: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              state: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "required_address" }),
          address_validation: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                mode: Schema.Literals([
                  "disabled",
                  "normalization_only",
                  "validation_and_normalization",
                ]),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "address_validation_param" }),
          ),
          business_name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(50).annotate({
                expected: "a string with at most 50 code points",
              }),
            ),
          ),
          customs: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                eori_number: Schema.optionalKey(
                  Schema.String.check(
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
            ).annotate({ title: "customs_param" }),
          ),
          name: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          phone_number: Schema.optionalKey(Schema.String),
          require_signature: Schema.optionalKey(Schema.Boolean),
          service: Schema.optionalKey(
            Schema.Literals(["express", "priority", "standard"]),
          ),
          type: Schema.optionalKey(Schema.Literals(["bulk", "individual"])),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "shipping_specs",
        description: "The address where the card will be shipped.",
      }),
    ),
    spending_controls: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          allowed_card_presences: Schema.optionalKey(
            Schema.Array(Schema.Literals(["not_present", "present"])),
          ),
          allowed_categories: Schema.optionalKey(
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
            ),
          ),
          allowed_merchant_countries: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
          ),
          blocked_card_presences: Schema.optionalKey(
            Schema.Array(Schema.Literals(["not_present", "present"])),
          ),
          blocked_categories: Schema.optionalKey(
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
            ),
          ),
          blocked_merchant_countries: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
          ),
          spending_limits: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  amount: Schema.Int,
                  categories: Schema.optionalKey(
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
                    ),
                  ),
                  interval: Schema.Literals([
                    "all_time",
                    "daily",
                    "monthly",
                    "per_authorization",
                    "weekly",
                    "yearly",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "spending_limits_param" }),
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
        title: "authorization_controls_param",
        description:
          "Rules that control spending for this card. Refer to our [documentation](https://docs.stripe.com/issuing/controls/spending-controls) for more details.",
      }),
    ),
    status: Schema.optionalKey(
      Schema.Literals(["active", "inactive"]).annotate({
        description:
          "Whether authorizations can be approved on this card. May be blocked from activating cards depending on past-due Cardholder requirements. Defaults to `inactive`.",
      }),
    ),
    type: Schema.Literals(["physical", "virtual"]).annotate({
      description:
        "The type of card to issue. Possible values are `physical` or `virtual`.",
    }),
  }),
  StripeIssuingCardResourceSchema,
);
