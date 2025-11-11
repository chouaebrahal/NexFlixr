import { useEffect } from 'react';
import SectionRow from '../shared/SectionRow'
import { useMediaStore } from '../../store/useMediaStore';


const MoviesSection = () => {

const {trendingMovie,trendingmovieLoading,trendingmovieError,fetchTrendingMedia} = useMediaStore(); 
useEffect(()=>{
    fetchTrendingMedia('movie');
},[])
  return (
    <div className={`pt-8 w-full `}>
       
         <SectionRow title='Movies Now'  data={trendingMovie} loading={trendingmovieLoading} error={trendingmovieError}/>
    </div>
  )
}

export default MoviesSection