import { useEffect } from 'react';
import SectionRow from '../shared/SectionRow'
import { useMediaStore } from '../../store/useMediaStore';


const TvSection = () => {

const {trendingtv,trendingtvLoading,trendingtvError,fetchTrendingMedia} = useMediaStore(); 
useEffect(()=>{
    fetchTrendingMedia("tv");
},[])
  return (
    <div className={`pt-8 w-full }`}>

         <SectionRow title='Series' data={trendingtv} loading={trendingtvLoading} error={trendingtvError} />
    </div>
  )
}

export default TvSection