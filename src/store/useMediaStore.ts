import { create } from "zustand";

type MediaType = "all" | "movie" | "tv";
import {
  getMovieOrTv,
  getMovieDetails,
  getTvDetails,
  getTrending,
} from "../api/tmdbtvmovies";
import type { MovieDetails, TMDBMovie, TrendingResponse, TvDetails } from "../lib/types";
export interface Params {
  year?: number;
  with_origin_country?: string;
  with_cast?: string;
  with_genres?: string;
  with_keywords?: string;
}
export interface Watchlist {
    type: 'movie' | 'tv'
    id: number
}

interface TrendingMediaState {
  trending: TMDBMovie[];
  trendingtv: TMDBMovie[];
  trendingMovie: TMDBMovie[];
  movie: TMDBMovie[];
  series: TMDBMovie[];
  currentType:'movie' | 'tv';
  page:number;
  seriesPage:number;
  seriesLoadingMore:boolean;
  watchListIds:Watchlist[];
  

  MovieDetails: MovieDetails | null;
  TvDetails: TvDetails | null;

  currentMovieID: number;

  genresLoading: boolean;
  errorGenres: string | null;

  trendingLoading: boolean;
  trendingError: string | null;

  trendingmovieLoading: boolean;
  trendingmovieError: string | null;

  trendingtvLoading: boolean;
  trendingtvError: string | null;

  loadingMore: boolean;
  error: string | null;

  movieLoading: boolean;
  movieError: string | null;

  serieLoading: boolean;
  serieError: string | null;

  movieDetailsLoading: boolean;
  movieDetailsError: string | null;

  tvDetailsLoading: boolean;
  tvDetailsError: string | null;


  toggleWatchList: (type:"movie" | "tv",id:number) => void;
  hydrate: () => void;
  nextPage: () => void;
  seriesNextPage: ()=> void;
  setMovieId: (id: number) => void;
  setMediaType: (type: 'movie' | 'tv')=> void;
  fetchTrendingMedia: (type?: MediaType) => Promise<void>;
  fetchMedia: (type: MediaType, params: Params,reset:boolean) => Promise<void>;
  fetchMovieDetails: (id:number) => Promise<void>;
  fetchTvDetails: (id:number) => Promise<void>;
}

export const useMediaStore = create<TrendingMediaState>((set, get) => ({
  trending: [],
  trendingMovie: [],
  trendingtv: [],
  movieGenre: [],
  movie: [],
  series: [],
  page:1,
  seriesPage:1,
  seriesLoadingMore:false,
  watchListIds: [],
  currentType:'movie',
  

  MovieDetails: null,
  TvDetails: null,
  currentMovieID: 0,

  loadingMore: false,
  error: null,

  trendingLoading: false,
  trendingError: null,

  trendingmovieLoading: false,
  trendingmovieError: null,

  trendingtvLoading: false,
  trendingtvError: null,

  genresLoading: false,
  errorGenres: null,

  movieLoading: false,
  movieError: null,

  serieLoading: false,
  serieError: null,

  movieDetailsLoading: false,
  movieDetailsError: null,

  tvDetailsLoading: false,
  tvDetailsError: null,

  

  setMovieId: (id) => {
    set({ currentMovieID: id });
  },
  setMediaType: (type) =>{
    set({currentType:type})
  },

  toggleWatchList: (type,id) => {
    if(get().watchListIds.map(e=> e.id).includes(id)){
        set({watchListIds:get().watchListIds.filter(innerid => innerid.id !== id)})
        localStorage.setItem('watchlist',JSON.stringify(get().watchListIds))
    }else{

        set({watchListIds:[...get().watchListIds , {type:type,id:id}]})
        localStorage.setItem('watchlist',JSON.stringify([...get().watchListIds]))
    }

  },

  hydrate: ()=>{
    const storedWatchList = localStorage.getItem('watchlist')
    if(storedWatchList) set({watchListIds:JSON.parse(storedWatchList)})

  },

 
  fetchTrendingMedia: async (type = 'all') => { 
    if (type === "all") {
      set({ trendingLoading: true, trendingError: null });
    } else if (type === "movie") {
      set({ trendingmovieLoading: true, trendingmovieError: null });
    } else if (type === "tv") {
      set({ trendingtvLoading: true, trendingtvError: null });
    }

    try {
      const data: TrendingResponse = await getTrending(type);
      if (type === "all") {
        set({ trending: data.results, trendingLoading: false });
      } else if (type === "movie") {
        set({ trendingmovieLoading: false, trendingMovie: data.results });
      } else if (type === "tv") {
        set({ trendingtvLoading: false, trendingtv: data.results });
      }
    } catch (error) {
      if (type === "all") {
        set({
          trendingError: "Failed to fetch trending movies",
          trendingLoading: false,
        });
      } else if (type === "movie") {
        set({
          trendingmovieError: "Failed to fetch trending movies",
          trendingmovieLoading: false,
        });
      } else if (type === "tv") {
        set({
          trendingtvError: "Failed to fetch trending movies",
          trendingtvLoading: false,
        });
      }
    }
  },
  nextPage: ()=>{
   set({page:get().page + 1})
  } ,
  seriesNextPage:()=>{
   set({seriesPage:get().seriesPage + 1})
  },
 

  fetchMedia: async (type: MediaType, params:Params,reset=true) => {
    if (type === "movie") {
        if(reset){
          set({ movieLoading: true, movieError: null });
        }else{
          set({loadingMore:true})
        }
     
    } else if (type === "tv") {
      
        if(reset){
          set({ serieLoading: true, serieError: null });
        }else{
          set({seriesLoadingMore:true})
        }

      
    }

    try {
      const data: TrendingResponse = await getMovieOrTv(type,type === 'movie' ? get().page : get().seriesPage,params);
      if (type === "movie") {
        set({ movieLoading: false, loadingMore:false,movie: reset ? data.results : [...get().movie,...data.results] });
      } else if (type === "tv") {
        set({ serieLoading: false,seriesLoadingMore:false, series: reset ? data.results : [...get().series,...data.results] });
      }
    } catch (error) {
      if (type === "movie") {
        set({ movieError: "Failed to fetch Movies", movieLoading: false ,loadingMore:false});
      } else if (type === "tv") {
        set({ serieError: "Failed to fetch Movies", serieLoading: false ,seriesLoadingMore:false});
      }
    }
  },

  fetchMovieDetails: async (id) => {
    set({ movieDetailsLoading: true, movieDetailsError: null });
    try {
      const data: MovieDetails  = await getMovieDetails(
        id
      );
      set({ MovieDetails: data, movieDetailsLoading: false });
    } catch (error) {
      set({
        movieDetailsError: "Failed to fetch movie details",
        movieDetailsLoading: false,
      });
    }
  },

  fetchTvDetails: async (id) => {
    set({ tvDetailsLoading: true, tvDetailsError: null });
    try {
      const data: TvDetails  = await getTvDetails(
        id
      );
      set({ TvDetails: data, tvDetailsLoading: false });
    } catch (error) {
      set({
        tvDetailsError: "Failed to fetch tv details",
        tvDetailsLoading: false,
      });
    }
  },



 

}));
