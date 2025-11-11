import { getMovieDetails, getTvDetails } from '@/api/tmdbtvmovies'
import type { MovieDetails, TvDetails } from '@/lib/types'
import { useMediaStore, type Watchlist } from '@/store/useMediaStore'
import { useEffect, useState } from 'react'
import Loading from '../shared/Loading'
import Error from '../shared/Error'
import CardItem from '../shared/CardItem'

type MediaItem = {
    id: number
    title: string
    genres: {
        id: number;
        name: string;
    }[];
    overview: string;
    backdrop_path: string | null
    media_type: 'movie' | 'tv'
}

type MovieState = {
    movie: MediaItem[],
    loadingMovie: boolean,
    errorMovie: string | null
}
type TvState = {
    tv: MediaItem[],
    loadingTv: boolean,
    errorTv: string | null
}

const BookMark = () => {
    const [currentlyClicked, setCurrentlyClicked] = useState<string>()
    const watchlistIds = useMediaStore(state => state.watchListIds)
    const hydrate = useMediaStore(state => state.hydrate)

    const watchlistMovies : Watchlist[] =  watchlistIds.filter(e => e.type === 'movie')
    const watchlistTv : Watchlist[] = watchlistIds.filter(e => e.type === 'tv')
    console.log('main:' + watchlistIds)
    console.log('tv:' + watchlistTv)
    console.log('movies:' + watchlistMovies)

    const [{movie,loadingMovie,errorMovie},setMovie] = useState<MovieState>({
        movie:[],
        loadingMovie:false,
        errorMovie:null
    })
    const [{tv,loadingTv,errorTv},setTv] = useState<TvState>({
        tv:[],
        loadingTv:false,
        errorTv:null
    })


    function normalizeTv(serie: TvDetails | null): MediaItem | null {
        if (!serie) return null
        return {
            id: serie.id,
            title: serie.original_name,
            genres: [...serie.genres],
            overview: serie.overview,
            backdrop_path: serie.backdrop_path,
            media_type: 'tv'
        }
    }
    function normalizeMovie(movie: MovieDetails | null): MediaItem | null {
        if (!movie) return null
        return {
            id: movie.id,
            title: movie.title,
            genres: [...movie.genres],
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
            media_type: 'movie'
        }
    }

    useEffect(() => {

        async function fetchManySeries (watchlistTv: Watchlist []){
            const tvPromises = watchlistTv.map(e => {
            return getTvDetails(e.id)
        }) 
        setTv(prev => ({...prev,loadingTv:true}))
        try{
            const results = await Promise.all(tvPromises)
            setTv(prev => ({...prev,tv:results.map(e=> normalizeTv(e)).filter(e => e !== null),loadingTv:false}))

        }catch{
            setTv(prev => ({...prev,loadingTv:false,errorTv:'failed to fetch Series'}))
        }
       
        }


        async function fetchManyMovies (watchlistmovie: Watchlist []){
            const moviePromises = watchlistmovie.map(e => {
            return getMovieDetails(e.id)
        }) 

        setMovie(prev => ({...prev,loadingMovie:true}))
        try{

            const results = await Promise.all(moviePromises)
            setMovie(prev => ({...prev,movie:results.map(e=>normalizeMovie(e)).filter(e => e !== null),loadingMovie:false}))
           
        }catch(error){
            setMovie(prev => ({...prev,errorMovie:"Failed to fetch Movies",loadingMovie:false}))
        }
        }

        



        Promise.all([fetchManyMovies(watchlistMovies),fetchManySeries(watchlistTv)])
       
        
       
           
        

        
     

    }, [watchlistIds])

    useEffect(()=>{
     hydrate();
    },[])

    console.log(movie)
    console.log(tv)

    const mainArray = currentlyClicked === 'ALL' ? [...movie,...tv] : currentlyClicked === 'MOVIE' ? movie : tv 
    const loading = currentlyClicked === 'MOVIE' || currentlyClicked === 'ALL' ? loadingMovie : loadingTv
    const error = currentlyClicked === 'MOVIE' || currentlyClicked === 'ALL' ? errorMovie : errorTv

    if(loading) return <Loading />
    if(error) return <Error error={error} />

    return (
        <div className='container mx-auto px-4 mt-40'>
            <div
                className={`h-11 w-fit max-w-[80%]  m-0   mx-auto flex gap-2 items-center justify-between 
                    rounded-full border-primary overflow-hidden toggle-group  cursor-pointer bg-secondary/40 backdrop-blur-md text-white
                    
                   `}
            >
                <button onClick={() => setCurrentlyClicked("ALL")} className={`h-full cursor-pointer w-30  transition-colors duration-400  ${currentlyClicked === "ALL" ? "bg-secondary" : ""}`} value="ALL">All</button>
                <button onClick={() => setCurrentlyClicked("MOVIE")} className={`h-full cursor-pointer w-30 transition-colors duration-400  ${currentlyClicked === "MOVIE" ? "bg-secondary" : ""}`} value="MOVIE">MOVIE</button>
                <button onClick={() => setCurrentlyClicked("SERIE")} className={`h-full cursor-pointer w-30  transition-colors duration-400 ${currentlyClicked === "SERIE" ? "bg-secondary" : ""}`} value="SERIE">SERIE</button>
            </div>
            <div className='w-full min-h-[calc(100vh-355px)] place-items-center grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 mt-10'>
                {
                    mainArray && mainArray.map(media => {
                        return <CardItem type={media.media_type} id={media.id} poster_path={media.backdrop_path} key={media.id} />
                    })
                }
            </div>
        </div>
    )
}

export default BookMark