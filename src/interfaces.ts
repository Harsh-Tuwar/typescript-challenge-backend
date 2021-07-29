
export interface Review {
	_id?: string;
	comments?: string;
	reviewer_id?: string;
	reviewer_name?: string;
	date?: string;
}

export interface Listing {
	_id?: string;
	listing_url?: string;
	name?: string;
	summary?: string;
	space?: string;
	description?: string;
	neighborhood_overview?: string;
	notes?: string;
	transit?: string;
	access?: string;
	interaction?: string;
	house_rules?: string;
	property_type?: string;
	room_type?: string;
	bed_type?: string;
	minimum_nights?: string;
	maximum_nights?: string;
	cancellation_policy?: string;
	last_scraped?: string;
	calendar_last_scraped?: string;
	first_review?: string;
	last_review?: string;
	accommodates?: number;
	bedrooms?: number;
	beds?: number;
	number_of_reviews?: number;
	amenities?: string[];
	price?: number;
	security_deposit?: number;
	cleaning_fee?: number;
	extra_people?: number;
	guests_included?: number;
	images?: Image;
	host?: Host;
	address?: Address;
	availability?: Availability;
	review_scores?: ReviewScore[];
	reviews: Review[]
}

export interface Image {
	thumbnail_url?: string;
	medium_url?: string;
	picture_url?: string;
	xl_picture_url?: string
}

export interface Host {
	host_id?: string;
	host_url?: string;
	host_name?: string;
	host_location?: string;
	host_about?: string;
	host_response_time?: string;
	host_thumbnail_url?: string;
	host_picture_url?: string;
	host_neighbourhood?: string;
	host_response_rate?: number;
	host_is_superhost?: boolean;
	host_has_profile_pic?: boolean;
	host_identity_verified?: boolean;
	host_listings_count?: number;
	host_total_listings_count?: number;
	host_verifications?: string[];
}

export interface Address {
	street?: string;
	suburb?: string;
	government_area?: string;
	market?: string;
	country?: string;
	country_code?: string;
	location?: Location;
}

export interface Location {
	type?: string;
	coordinates?: number[];
	is_location_exact?: boolean;
}

export interface Availability {
	availability_30?: number;
	availability_60?: number;
	availability_90?: number;
	availability_365?: number;
}

export interface ReviewScore {
	review_scores_accuracy?: number;
	review_scores_cleanliness?: number;
	review_scores_checkin?: number;
	review_scores_communication?: number;
	review_scores_rating?: number;
	review_scores_location?: number;
	review_scores_value?: number;
}


export interface Filters {
	bedrooms?: number;
	beds?: number;
	bathrooms?: number;
	amenities?: string[];
	page?: number;
}