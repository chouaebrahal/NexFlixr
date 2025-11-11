import { memo } from 'react';
import { useModalStore } from "@/store/useModalStore";
import { useMediaStore } from "@/store/useMediaStore";
import { TiPlus } from "react-icons/ti";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { Link } from "react-router-dom";




const CardItem = ({  poster_path, title, id, type, direct }: {  poster_path: string | null, id: number, type: string, direct?: boolean, title?: string }) => {

  const { toggleModal } = useModalStore();
  const closeSearchModal = useModalStore(s => s.closeSearchModal)
  const { setMovieId } = useMediaStore()
  const toggleWatchList = useMediaStore(state => state.toggleWatchList)
  const watchListIds = useMediaStore(state => state.watchListIds)
  const setAlert = useModalStore(state => state.setAlert)
  const setMediaType = useMediaStore(state => state.setMediaType)

  const handleClick = (mediatype: 'movie' | 'tv', id: number) => {
    toggleModal()
    setMovieId(id)
    setMediaType(mediatype)
  }
  const addClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.stopPropagation();
    toggleWatchList(type === 'movie' ? 'movie' : 'tv', id)
    setAlert(watchListIds.map(e => e.id).includes(id) ? "Removed from watch list" : "Added to watch List")
  }

  // Generate a more descriptive alt text for accessibility
  const altText = title
    ? `${title} poster`
    : `${type === 'movie' ? "movie" : type === "tv" ? "serie" : 'media'} poster`;

      if (direct) {
    return (
      <Link onClick={closeSearchModal} to={`media/${type === "movie" ? "movies" : "series"}/${id}`} className="item relative h-[300px] rounded-2xl  shrink-0 snap-x snap-mandatory  cursor-pointer  hover:scale-101 transition-transform duration-300 ease-in-out border-0 " aria-label="View media details">

        <div onClick={(e) => addClick(e, id)} className="item-add absolute top-0 left-0 border-8 border-background w-15 h-15 rounded-2xl  grid place-items-center backdrop-blur-sm" aria-label={watchListIds.map(e => e.id).includes(id) ? "Remove from watchlist" : "Add to watchlist"}>
          {watchListIds.map(e => e.id).includes(id) ? <IoCheckmarkDoneCircle className="w-8 h-8 text-primary" aria-label="In watchlist" /> : <TiPlus className=" w-8 h-8 text-primary" aria-label="Add to watchlist" />}
        </div>
        <img
          className="w-full h-full object-cover rounded-4xl border-0"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={altText}
          loading="lazy" // Add lazy loading for performance
        />

      </Link>
    )


  } else {
    return (
      <button
        type="button"
        
        onClick={() => handleClick(type === 'movie' ? 'movie' : "tv", id)}
        className="item relative h-[300px] rounded-2xl  shrink-0 snap-x snap-mandatory  cursor-pointer  hover:scale-101 transition-transform duration-300 ease-in-out border-0 " aria-label="View media details">

        <div onClick={(e) => addClick(e, id)} className="item-add absolute top-0 left-0 border-8 border-background w-15 h-15 rounded-2xl  grid place-items-center backdrop-blur-sm" aria-label={watchListIds.map(e => e.id).includes(id) ? "Remove from watchlist" : "Add to watchlist"}>
          {watchListIds.map(e => e.id).includes(id) ? <IoCheckmarkDoneCircle className="w-8 h-8 text-primary" aria-label="In watchlist" /> : <TiPlus className=" w-8 h-8 text-primary" aria-label="Add to watchlist" />}
        </div>
        <img
          className="w-full h-full object-cover rounded-4xl border-0"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={altText}
          loading="lazy" // Add lazy loading for performance
        />

      </button>
    )
  }


}

export default memo(CardItem)