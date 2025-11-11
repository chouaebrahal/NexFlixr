import { getSimilair } from '@/api/tmdbtvmovies'
import type { TMDBMovie } from '@/lib/types'
import { useEffect, useState } from 'react'
import SectionRow from './SectionRow'

interface similairState {
  similairs: TMDBMovie[],
  similairLoading: boolean,
  similairError: string | null
}

const Similar = ({type,id}:{type:'movie' | 'tv',id:number}) => {
  const [{ similairs, similairLoading, similairError }, setsimilairs] = useState<similairState>({
      similairs: [],
      similairLoading: false,
      similairError: null
    })
  useEffect(()=>{
     const fetchSimilairs = async (type: 'movie' | 'tv', id: number) => {
         setsimilairs(prev => ({ ...prev, similairLoading: true }))
         try {
           const data: TMDBMovie[] = await getSimilair(type, id)
           setsimilairs(prev => ({ ...prev, similairs: data, similairLoading: false }))
         } catch (error) {
           setsimilairs(prev => ({ ...prev, similairError: "failed to fetch similairs", similairLoading: false }))
         }
       }
       fetchSimilairs(type,id)
  },[])  

  return (
   <div className='container mx-auto'>
       {/* similar Section */}
        {similairs.length > 0 && <SectionRow title="Similair" data={similairs} loading={similairLoading} error={similairError} />}
   </div>
  )
}

export default Similar