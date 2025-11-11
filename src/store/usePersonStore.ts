
import {create} from "zustand";
import { getPopularPeople } from "../api/tmdbtvmovies";
import type { Person, PopularPeopleResponse } from '../lib/types';


interface TrendingPersonState{
    trendingPerson: Person[];
    personLoading: boolean;
    personError: string | null;
    fetchTrendingPerson: () => Promise<void>
}

export const usePersonStore = create<TrendingPersonState>(

    (set,get) => ({
        trendingPerson: [],
        personLoading: false,
        personError: null,
        fetchTrendingPerson: async () => {
            if(get().trendingPerson.length > 0) return
            set({personLoading: true, personError: null});
            try{
                const data : PopularPeopleResponse = await getPopularPeople();
             
                set({trendingPerson: data.results, personLoading:false});
            }catch (error){
                set({personError: "failed to fetch trending People",personLoading: false})
            }
        }
    })
)