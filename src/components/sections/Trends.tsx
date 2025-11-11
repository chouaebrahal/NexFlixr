import { useEffect } from 'react';


import SectionRow from '../shared/SectionRow'
import { useMediaStore } from '@/store/useMediaStore';


const Trends = () => {
  const { trending, trendingLoading, trendingError, fetchTrendingMedia } = useMediaStore();
  useEffect(() => {
    fetchTrendingMedia("all");
  }, [])

  return (
    <div className={`pt-8 m-0 w-full`}>

      <SectionRow title='Trending Now' data={trending} loading={trendingLoading} error={trendingError} />
    </div>
  )
}

export default Trends