import Button from './Button'
import { useEffect, useRef } from 'react'
import { useModalStore } from '@/store/useModalStore'
import { useMediaStore } from '@/store/useMediaStore'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import type { MovieDetails, TvDetails } from '@/lib/types'
import { motion } from "framer-motion"
import Error from './Error'
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

const DetailModal = () => {


    const modalRef = useRef(null)
    const { toggleModal, modalOpen } = useModalStore();
    const { currentMovieID, fetchMovieDetails, fetchTvDetails, TvDetails, tvDetailsLoading, tvDetailsError, movieDetailsError, movieDetailsLoading, MovieDetails } = useMediaStore()
    const currentType = useMediaStore(state => state.currentType)

    console.log(modalOpen)

    useEffect(() => {
        if (currentType === 'movie') {

            fetchMovieDetails(currentMovieID)
        } else {
            fetchTvDetails(currentMovieID)
        }
    }, [currentMovieID])


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
            media_type: 'tv'
        }
    }

    const Media: MediaItem | null = currentType === "movie" ? normalizeMovie(MovieDetails) : normalizeTv(TvDetails)
    const loading: boolean = currentType === 'movie' ? movieDetailsLoading : tvDetailsLoading
    const error: string | null = currentType === 'movie' ? movieDetailsError : tvDetailsError

    if (!Media) return <div>no Data</div>
    if (loading) return <Loading />
    if (error) return <Error error={error} />



    function handleOutModalClick(e: React.MouseEvent<HTMLDivElement>) {
        if (modalRef.current && modalRef.current !== e.currentTarget) {
            toggleModal()
        }
    }
    function handleXclick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation()
        console.log("hello clicked")
        toggleModal()
    }


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={handleOutModalClick}
            className='h-screen w-screen bg-black/30  backdrop-blur-lg z-1000 fixed top-0 left-0 flex items-center justify-center'>
            {


                <div ref={modalRef} className='max-w-150 w-[80%] bg-modal-background relative rounded-2xl overflow-hidden'>
                    <motion.span
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 2, delay: 0.8, repeat: Infinity, ease: "linear" }}
                        whileHover={{
                            rotateY: 0,           // stop rotation
                            transition: { duration: 0.5 }
                        }}
                        onClick={handleXclick} className='w-10 h-10 font-bold rounded-full bg-primary absolute top-3 right-3 grid place-items-center z-10 cursor-pointer'>X</motion.span>

                    <img className='w-full h-50 relative z-0' src={`https://image.tmdb.org/t/p/w780${Media.backdrop_path}`} alt={Media.title} />
                    <div className='flex flex-col gap-3 p-5 relative z-10'>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl relative -top-10 z-50 text-primary! font-bold'>{Media.title}</h1>
                        <div className='flex gap-2 -mt-5'>
                            {Media.genres.map(genre => {
                                return <span key={genre.id} className='px-2 py-1 bg-primary grid place-items-center text-center rounded-lg text-sm md:text-lg'>
                                    {genre.name}
                                </span>
                            })}

                        </div>
                        <p className='text-sm'>
                            {Media.overview}
                        </p>
                        <Link to={`media/${currentType === 'movie' ? "movies" : "series"}/${currentMovieID}`} ><Button text='See Details' className='w-fit bg-primary hover:bg-primary/50' /></Link>
                    </div>
                </div>


            }
        </motion.div>
    )
}

export default DetailModal