import type { Params } from "@/store/useMediaStore";
import type { Country, CreditsResponse, Genre,  ImageAsset,  KeywordSearchResponse, MovieDetails, PopularPeopleResponse, Review, TMDBMovie, TrendingResponse, TvDetails } from "../lib/types";
import { apiClient } from "./client";

export const getTrending = async (type:"all" | "movie" | "tv" ) => {
    const response  = await apiClient.get(`/trending/${type}/week`);
    return response.data as TrendingResponse;
}

export const getPopularPeople = async () => {
    const response = await apiClient.get('/trending/person/week');
    return response.data as PopularPeopleResponse;
}

export const getGenresList = async (type:'movie' | 'tv'): Promise<Genre[]> => {
    const response = await apiClient.get(`/genre/${type}/list`);
    return response.data.genres as Genre[];
}

export const getCountriesList = async (): Promise<Country[]> => {
    const response = await apiClient.get('/configuration/countries');
    return response.data as Country[];
}

export const getMovieOrTv = async (type:"movie" | "tv" | "all",page:number = 1,params:Params): Promise<TrendingResponse> => {
    const response = await apiClient.get(`/discover/${type}`,{
        params:{
            include_adult:false,
            page,
            ...params,
        }
    })
    return response.data
}
export const getMovieDetails = async (id:number): Promise<MovieDetails> => {
    const response  = await apiClient.get(`/movie/${id}`)
    return response.data as MovieDetails 
    
}

export const getTvDetails = async (id:number): Promise<TvDetails> => {
    const response  = await apiClient.get(`/tv/${id}`)
    return response.data as TvDetails 
    
}

export const getkeywords = async (query:string) : Promise<KeywordSearchResponse> => {
     const response = await apiClient.get(`/search/keyword`,{
        params:{
            query
        }
     })
     return response.data
}

export const getMoviesOrTvBySearch = async (type : "movie" | "tv",query:string) : Promise<TrendingResponse> =>{
    const response = await apiClient.get(`/search/${type}`,{
        params:{
            query
        }
    })
    return response.data
}

export const getRecommendation = async (type:'movie' | 'tv',id:number) : Promise<TMDBMovie[]> => {
   const response = await apiClient.get(`${type}/${id}/recommendations`)
   return response.data.results
}

export const getReviews = async (type:'movie' | 'tv',id:number) : Promise<Review[]> => {
    const response = await apiClient.get(`${type}/${id}/reviews`)
    return response.data.results
}

export const getSimilair = async (type:'movie' | 'tv',id:number) : Promise<TMDBMovie[]> => {
   const response = await apiClient.get(`${type}/${id}/similar`)
   return response.data.results
}

export const getCredits = async (type:'movie' | 'tv',id:number) : Promise<CreditsResponse> => {
   const response = await apiClient.get(`${type}/${id}/credits`)
   return response.data
}

export const getImages = async (type:'movie' | 'tv',id:number) : Promise<ImageAsset[]> => {
    const response = await apiClient.get(`${type}/${id}/images`)
    return response.data.posters
}



