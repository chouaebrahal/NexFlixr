import AdvancedSearch from "../shared/AdvancedSearch"
import { useMediaStore, type Params } from "@/store/useMediaStore";
import { useEffect, useRef, useState } from "react";
import CardItem from "../shared/CardItem";
import Loading from "../shared/Loading";





const Movies = () => {
  const { movie, movieLoading, movieError, fetchMedia ,page,nextPage,loadingMore} = useMediaStore()
 
  const sentinelref = useRef(null)
  const [appliedFilters,setFilters] = useState<Params>({year:0,with_origin_country:"",with_cast:"",with_genres:"",with_keywords:""})
  console.log(`applied filters: ${appliedFilters}`)
  useEffect(() => {
    
      fetchMedia("movie",appliedFilters,true)
   
  
  }, [appliedFilters])

  useEffect(()=>{
   if(!sentinelref.current) return

   const observer = new IntersectionObserver(entries => {
    const first = entries[0]
    if(first.isIntersecting){
      nextPage()
    }

   })

   observer.observe(sentinelref.current)


  },[])

  useEffect(()=>{
    if(page !== 1){
    fetchMedia('movie',appliedFilters,false)
    }
    

  },[page])
 
  return (
    <div className="container mx-auto px-4 h-full flex flex-col justify-between items-start">
      <div className="w-full h-30"></div>
      <div className="w-full text-2xl md:text-3xl lg:text-4xl font-bold">movie</div>
      <AdvancedSearch appliedFilters={appliedFilters} type={"movie"} setFilters={setFilters} />
      {
        movieLoading ? <Loading />
          : movieError ? <div>{movieError}</div>
            : (
              <div className="mt-10 w-full place-items-center grid gap-5 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                {
                  movie.map(movie => {
                    return <CardItem key={movie.id} title={movie.title} type="movie" id={movie.id} poster_path={movie.poster_path} />
                  })
                }
              </div>)
      }
      <div ref={sentinelref}>{loadingMore && <Loading />}</div>
    </div>
  )
}

export default Movies