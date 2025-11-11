import AdvancedSearch from "../shared/AdvancedSearch"
import { useMediaStore, type Params } from "@/store/useMediaStore";
import { useEffect, useRef, useState } from "react";
import CardItem from "../shared/CardItem";
import Loading from "../shared/Loading";





const Series = () => {
  const { series, serieLoading, serieError, fetchMedia,seriesPage,seriesNextPage,seriesLoadingMore } = useMediaStore()
  const sentinelseriesref = useRef(null)
    const [appliedFilters,setFilters] = useState<Params>({year:0,with_origin_country:"",with_cast:"",with_genres:"",with_keywords:""})
    console.log(seriesPage)
   
    useEffect(() => {
      
        fetchMedia("tv",appliedFilters,true)
     
    
    }, [appliedFilters])
  
    useEffect(()=>{
     if(!sentinelseriesref.current) return
  
     const observer = new IntersectionObserver(entries => {
      const first = entries[0]
      if(first.isIntersecting){
        seriesNextPage()
      }
  
     })
  
     observer.observe(sentinelseriesref.current)
  
  
    },[])
  
    useEffect(()=>{
      if(seriesPage !== 1){
      fetchMedia('tv',appliedFilters,false)
      }
      
  
    },[seriesPage])
  return (
    <div className="container mx-auto px-4 h-full flex flex-col justify-between items-start">
      <div className="w-full h-30"></div>
      <div className="w-full text-2xl md:text-3xl lg:text-4xl font-bold">Series</div>
      <AdvancedSearch appliedFilters={appliedFilters} type={"tv"} setFilters={setFilters} />
      {
        serieLoading ? <Loading />
          : serieError ? <div>{serieError}</div>
            : (
              <div className="mt-10 w-full grid place-items-center gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                {
                  series.map(serie => {
                    return <CardItem key={serie.id} title={serie.title} type="tv" id={serie.id} poster_path={serie.poster_path} />
                  })
                }
              </div>)
      }
      <div className="flex items-center justify-center" ref={sentinelseriesref}>{seriesLoadingMore && <Loading />}</div>
    </div>
  )
}

export default Series