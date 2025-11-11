export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string; // sometimes name instead of title (for TV)
  name?: string; // for TV shows
  original_language: string;
  original_title?: string;
  original_name?: string; // for TV shows
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string; // for TV shows
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TrendingResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}


export interface PopularPeopleResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}

export interface Person {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type?: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string | null;
  known_for: KnownFor[];
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string; // for movies
  name?: string; // for TV shows
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string; // for movies
  first_air_date?: string; // for TV shows
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: string | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type KeywordResult = {
  id: number
  name: string
}

export type KeywordSearchResponse = {
  page: number
  results: KeywordResult[]
  total_pages: number
  total_results: number
}
export type TvDetails = {
  adult: boolean
  backdrop_path: string | null

  created_by: {
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string | null
  }[]

  episode_run_time: number[]
  first_air_date: string
  genres: { id: number; name: string }[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string

  last_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string | null
  } | null

  next_episode_to_air: any | null // sometimes null and sometimes object → you can refine later

  networks: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]

  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null

  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]

  production_countries: {
    iso_3166_1: string
    name: string
  }[]

  seasons: {
    air_date: string | null
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
    vote_average: number
  }[]

  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]

  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export type ReviewResponse = {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
};

export type Review = {
  author: string;
  author_details: {
    name?: string | null;
    username?: string | null;
    avatar_path?: string | null;
    rating?: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};
export type CreditsResponse = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type CrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export type ImagesResponse = {
  backdrops: ImageAsset[];
  logos: ImageAsset[];
  posters: ImageAsset[];
};

export type ImageAsset = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
  id: number;
};




 
