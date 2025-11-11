import { useMediaStore } from "@/store/useMediaStore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../shared/Loading"
import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { FaArrowRight, FaStar } from "react-icons/fa";
import Button from "../shared/Button"
import type { CastMember, CreditsResponse, CrewMember, ImageAsset, MovieDetails, Review, TMDBMovie, TvDetails } from "@/lib/types"
import { getCredits, getImages, getRecommendation, getReviews, getSimilair } from "@/api/tmdbtvmovies"
import avatar from '../../assets/54b19ada-d53e-4ee9-8882-9dfed1bf1396.jpg'

import ReviewCard from "../shared/ReviewCard"
import SectionRow from "../shared/SectionRow"
import Error from "../shared/Error"



interface recommendationState {
  recommendations: TMDBMovie[],
  loadingRecommendations: boolean,
  errorRecommendations: string | null
}
interface similairState {
  similairs: TMDBMovie[],
  similairLoading: boolean,
  similairError: string | null
}
interface reviewsState {
  reviews: Review[],
  loadingReviews: boolean,
  errorReview: string | null
}
interface imagesState {
  images: ImageAsset[],
  loadingImages: boolean,
  errorImages: string | null
}
interface creditsState {
  castMember: CastMember[],
  crewMember: CrewMember[],
  creditLoading: boolean,
  creditError: string | null
}
interface MediaPageItem {

  id: number
  title: string
  genres: {
    id: number;
    name: string;
  }[];
  overview: string;
  backdrop_path: string | null
  original_language: string;
  release_date: string;
  runtime: number | null;
  vote_average: number;

  media_type: 'movie' | 'tv'
}

const MediaDetailsPage = () => {
  const params = useParams()
  console.log(params)
  const { type, id } = useParams()
  if(!type || !id) return <div>the ID or the Type Not Exist</div>

  const fetchMovieDetails = useMediaStore(state => state.fetchMovieDetails)
  const MovieDetails = useMediaStore(state => state.MovieDetails)
  const movieDetailsLoading = useMediaStore(state => state.movieDetailsLoading)
  const movieDetailsError = useMediaStore(state => state.movieDetailsError)
  const fetchTvDetails = useMediaStore(state => state.fetchTvDetails)
  const TvDetails = useMediaStore(state => state.TvDetails)
  const tvDetailsLoading = useMediaStore(state => state.tvDetailsLoading)
  const tvDetailsError = useMediaStore(state => state.tvDetailsError)
  const toggleWatchList = useMediaStore(s => s.toggleWatchList)
  const watchListIds = useMediaStore(s => s.watchListIds)

  const [{ recommendations, loadingRecommendations, errorRecommendations }, setRecommendations] = useState<recommendationState>({
    recommendations: [],
    loadingRecommendations: false,
    errorRecommendations: null
  })
  const [{ similairs, similairLoading, similairError }, setsimilairs] = useState<similairState>({
    similairs: [],
    similairLoading: false,
    similairError: null
  })
  const [{ castMember, crewMember, creditLoading, creditError }, setCredits] = useState<creditsState>({
    castMember: [],
    crewMember: [],
    creditLoading: false,
    creditError: null
  })
  const [{ reviews, loadingReviews, errorReview }, setReviews] = useState<reviewsState>({
    reviews: [],
    loadingReviews: false,
    errorReview: null
  })
  const [{ images, loadingImages, errorImages }, setImages] = useState<imagesState>({
    images: [],
    loadingImages: false,
    errorImages: null
  })

  function normalizeMovie(movie: MovieDetails | null): MediaPageItem | null {
    if (!movie) return null
    return {
      id: movie.id,
      title: movie.title,
      genres: [...movie.genres],
      overview: movie.overview,
      backdrop_path: movie.backdrop_path,
      original_language: movie.original_language,
      release_date: movie.release_date,
      runtime: movie.runtime,
      vote_average: movie.vote_average,
      media_type: 'movie'
    }
  }
  function normalizeSerie(serie: TvDetails | null): MediaPageItem | null {
    if (!serie) return null
    return {
      id: serie.id,
      title: serie.original_name,
      genres: [...serie.genres],
      overview: serie.overview,
      backdrop_path: serie.backdrop_path,
      original_language: serie.original_language,
      release_date: serie.first_air_date,
      vote_average: serie.vote_average,
      runtime: serie.episode_run_time.reduce((acc, el) => (acc + el), 0) / serie.episode_run_time.length,
      media_type: 'tv'
    }
  }

  const Media = type === 'movies' ? normalizeMovie(MovieDetails) : normalizeSerie(TvDetails)
  const loading = type === 'movies' ? movieDetailsLoading : tvDetailsLoading
  const error = type === 'movie' ? movieDetailsError : tvDetailsError

  const mediatype = type === 'movies' ? 'movie' : "tv"
  const intId = parseInt(id)

  useEffect(() => {

    const fetchRecommendations = async (type: 'movie' | 'tv', id: number) => {
      setRecommendations(prev => ({ ...prev, loadingRecommendations: true }))
      try {
        const data: TMDBMovie[] = await getRecommendation(type, id)
        setRecommendations(prev => ({ ...prev, recommendations: data, loadingRecommendations: false }))
      } catch (error) {
        setRecommendations(prev => ({ ...prev, errorRecommendations: "failed to fetch recommendations", loadingRecommendations: true }))
      }
    }
    const fetchSimilairs = async (type: 'movie' | 'tv', id: number) => {
      setsimilairs(prev => ({ ...prev, similairLoading: true }))
      try {
        const data: TMDBMovie[] = await getSimilair(type, id)
        setsimilairs(prev => ({ ...prev, similairs: data, similairLoading: false }))
      } catch (error) {
        setsimilairs(prev => ({ ...prev, similairError: "failed to fetch similairs", similairLoading: false }))
      }
    }
    const fetchCredits = async (type: 'movie' | 'tv', id: number) => {
      setCredits(prev => ({ ...prev, creditLoading: true }))
      try {
        const data: CreditsResponse = await getCredits(type, id)
        setCredits(prev => ({ ...prev, castMember: data.cast, crewMember: data.crew, creditLoading: false }))
      } catch (error) {
        setCredits(prev => ({ ...prev, creditError: "failed to fetch credits", creditLoading: false }))
      }
    }
    const fetchReviews = async (type: 'movie' | 'tv', id: number) => {
      setReviews(prev => ({ ...prev, loadingReviews: true }))
      try {
        const data: Review[] = await getReviews(type, id)
        setReviews(prev => ({ ...prev, reviews: data, loadingReviews: false }))
      } catch {
        setReviews(prev => ({ ...prev, errorReview: "failed to fetch reviews", loadingReviews: false }))
      }
    }
    const fetchImages = async (type: 'movie' | 'tv', id: number) => {
      setImages(prev => ({ ...prev, loadingImages: true }))
      try {
        const data: ImageAsset[] = await getImages(type, id)
        setImages(prev => ({ ...prev, images: data, loadingImages: false }))
      } catch {
        setImages(prev => ({ ...prev, errorImages: "failed to fetch Images", loadingImages: false }))
      }
    }





    if (id) {
      
      

      Promise.all([fetchRecommendations(mediatype, intId), mediatype === 'movie' ? fetchMovieDetails(intId) : fetchTvDetails(intId), fetchReviews(mediatype, intId), fetchCredits(mediatype, intId), fetchSimilairs(mediatype, intId), fetchImages(mediatype, intId)])

    }




  }, [])



 

  if (!Media) return <div>no data</div>
  if (loading) return <Loading />
  if (error) return <Error error={error} />





  function minutesTohours(minuts: number): string {
    const hours = Math.floor(minuts / 60)
    const minutsleft = minuts % 60
    return `0${hours}h ${minutsleft < 10 ? "0" + minutsleft : minutsleft}m`
  }
  const rating = Array(5).fill(1);
  const ratingElements = rating.filter((_, i) => i < Media.vote_average / 2).map((_, i) => <FaStar key={i} size={20} />)

  // console.log(MovieDetails!.vote_average)
  // console.log(rating.length)
  // console.log(ratingElements.length)



  return (

    <div className="">
      {/* hero Section */}
      <div className="h-180 text-white relative flex items-center lg:items-center pb-5 lg:pb-25 after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-black/40 after:z-[-1]">
        <img className="w-full h-full absolute top-0 left-0 z-[-1]" src={`https://image.tmdb.org/t/p/original${Media?.backdrop_path}`} alt={Media?.title} />
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:justify-between ">
          <div className="w-full lg:w-[45%] flex flex-col gap-3 items-center justify-center lg:items-start ">
            <h3 className="text-4xl md:text-4xl lg:text-6xl font-bold text-center title-stroke1  text-transparent  lg:text-white  lg:text-left">{Media?.title}</h3>
            <p className="text-2xl  font-bold"><span>{Media && minutesTohours(Media.runtime ? Media.runtime : 60)}</span> - <span>{Media?.release_date}</span> - <span>{Media?.original_language.toUpperCase()}</span></p>
            <div className="flex flex-row gap-1 text-yellow-300" >{ratingElements}</div>
            <div className="flex gap-3 mt-5">
              <span className="grid place-items-center p-2 border border-primary bg-black/20 backdrop-blur-sm w-12 h-12 lg:w-12 lg:h-12 rounded-full cursor-pointer">
              
               {watchListIds.map(e=>e.id).includes(intId) 
                ? <FaBookmark  onClick={()=>toggleWatchList(mediatype,intId)} className={`text-primary h-6 w-4 `} /> 
                : <CiBookmark  onClick={()=>toggleWatchList(mediatype,intId)} className={`text-primary h-8 w-6 `} />
                
                }
                
              </span>
              <span className="grid place-items-center p-2 border border-primary bg-black/20 backdrop-blur-sm w-12 h-12 lg:w-12 lg:h-12 rounded-full cursor-pointer">
                <CiHeart className="text-primary h-8 w-6" />
              </span>
            </div>
          </div>
          <div className="hidden w-[45%]  lg:flex flex-col items-end justify-between min-h-50 ">
            <h1 className="lg:text-7xl w-full font-bold title-stroke text-transparent! text-center">
              {Media?.title}
            </h1>
            <div className="w-full flex justify-center">
              <Button text="Watch Now" className="lg:w-40 lg:h-12 bg-secondary/40!" />
              <Button text="Preview" className="w-40 h-12 bg-transparent! border border-primary hover:bg-primary!" />
            </div>
          </div>
        </div>
        <div className="images w-full lg:w-[80%] h-60 lg:h-80 flex justify-between items-center gap-15 absolute -bottom-25 lg:-bottom-35 left-[50%] translate-x-[-50%] py-10 px-20 rounded-2xl backdrop-blur-sm overflow-x-auto scrollbar-hide">
          {
            loadingImages ? <Loading />
              : errorImages ? <Error error={errorImages} />
                : images.slice(0, 5).map((image, index) => {
                  return <div key={index} className={`h-full w-25 lg:w-40 rounded-2xl overflow-hidden shrink-0  cursor-pointer ${index === 2 ? "scale-[1.25] hover:scale-[1.3]" : index === 1 || index === 3 ? "scale-[1.1] hover:scale-[1.15]" : "hover:scale-[1.05]"}   transition-all duration-300`}>
                    <img className="w-full" src={`https://image.tmdb.org/t/p/original${image.file_path}`} alt={`${image.id}`} />
                  </div>
                })
          }
        </div>
      </div>

      <div className={` flex flex-col items-center lg:items-start gap-10 mt-45`}>
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left mb-2">{`About ${Media.title}`}</h1>
          <p className="text-md lg:text-left text-justify text-secondary">{Media.overview}</p>
        </div>


        {/* Genres Section */}
        <div className="container mx-auto px-4 w-full mt-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10">Genres</h1>
          <div className="flex items-start w-full gap-2">
            {Media.genres.map(genre => {
              return <button key={genre.id}
                className={`px-5 py-2 text-xs lg:text-md font-bold  border border-primary rounded-full cursor-pointer bg-pink-600`}>
                {genre.name}
              </button>
            }
            )}
          </div>
        </div>




        {/* similar Section */}
        {similairs.length > 0 && <SectionRow title="Similair" data={similairs} loading={similairLoading} error={similairError} />}
        



        {/* cast Member */}

        <div className="container mx-auto px-4 flex flex-col">
          <div className='w-full flex items-center justify-between  text-foreground  mb-10'>
            <h1 className="text-xl font-bold md:text-2xl lg:text-4xl ">Cast Members</h1>
            <a href="#" className="flex items-center gap-2 font-bold text-primary ">See More <FaArrowRight /></a>
          </div>
          <div className=" flex gap-4 overflow-auto scrollbar-hide">


            {
              creditLoading ? <Loading />
                : creditError ? <Error error={creditError} />
                  : castMember.map(castMember => {
                    return <div key={castMember.id} className="flex flex-col items-center gap-2">
                      <div className="h-30 w-30 overflow-hidden rounded-full">
                        <img className="w-full object-cover" src={castMember.profile_path ? `https://image.tmdb.org/t/p/original${castMember.profile_path}` : avatar} alt={`${castMember.name} profile photo`} />
                      </div>
                      <p className="text-md text-center text-secondary flex items-center justify-center w-30 h-20">{castMember.name}</p>
                    </div>
                  })}
          </div>
        </div>







        {/* Recommendations Section */}
        {recommendations.length > 0 && <SectionRow title={"Recommendations"} data={recommendations} loading={loadingRecommendations} error={errorRecommendations} />}


        {/* Crew Member Section */}

        {crewMember.length > 0 && 
        <div className="container mx-auto px-4 flex flex-col">
          <div className='w-full flex items-center justify-between  text-foreground  mb-10'>
            <h1 className="text-xl font-bold md:text-2xl lg:text-4xl ">Crew Members</h1>
            <a href="#" className="flex items-center gap-2 font-bold text-primary ">See More <FaArrowRight /></a>
          </div>
          <div className=" flex gap-4 overflow-auto scrollbar-hide">

            {
              creditLoading ? <Loading />
                : creditError ? <Error error={creditError} />
                  : crewMember.map(crewMember => {
                    return <div key={`${crewMember.id}${crewMember.job}`} className="flex flex-col items-center gap-2">
                      <div className="h-30 w-30 overflow-hidden rounded-full">
                        <img className="w-full object-cover" src={crewMember.profile_path ? `https://image.tmdb.org/t/p/original${crewMember.profile_path}` : avatar} alt={`${crewMember.name} profile photo`} />
                      </div>
                      <p className="text-md text-center text-secondary flex items-center justify-center w-30 h-20">{crewMember.name}</p>
                    </div>
                  })}
          </div>
        </div>
        }



        {/* Reviews Section */}
        {reviews.length > 0 && <div className="container mx-auto px-4 w-full mt-15">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10">Reviews</h1>
          <div className="flex gap-4 overflow-auto scrollbar-hide">
            {
              loadingReviews ? <Loading />
                : errorReview ? <Error error={errorReview} />
                  : reviews.map(review => {
                    return <ReviewCard key={review.id} review={review} />
                  })
            }
          </div>
        </div>}
      </div>

    </div>


  )
}

export default MediaDetailsPage