import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useDebounced } from '@/lib/utils'
import type { TMDBMovie, TrendingResponse } from '@/lib/types'
import { getMoviesOrTvBySearch } from '@/api/tmdbtvmovies'
import { motion } from "framer-motion"

import { useModalStore } from '@/store/useModalStore'

import SectionRow from './SectionRow'


interface MediaState {
  media: TMDBMovie[]
  loading: boolean
  error: string | null
}

const SearchModal = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [{ media, loading, error }, setMedia] = useState<MediaState>({
    media: [],
    loading: false,
    error: null
  })
  const closeSearchModal = useModalStore(state => state.closeSearchModal)
  const debouncedQuery = useDebounced(searchTerm, 600)

  useEffect(() => {

    const fetchMedia = async (search: string) => {
      setMedia(prev => ({ ...prev, loading: true }))
      try {
        const data: TrendingResponse = await getMoviesOrTvBySearch('movie', search)
        const data2: TrendingResponse = await getMoviesOrTvBySearch('tv', search)
        setMedia(prev => ({ ...prev, media: [...data.results.map(e => ({ ...e, media_type: 'movie' })), ...data2.results.map(e => ({ ...e, media_type: 'tv' }))], loading: false }))
      } catch {
        setMedia(prev => ({ ...prev, error: "failed to fetch Data", loading: false }))
      }

    }
    if (searchTerm.length > 0) {

      fetchMedia(searchTerm)
    }

  }, [debouncedQuery])

  console.log('this is the media:' + media)



  function handleXclick() {
    closeSearchModal()
  }







  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}

      className='h-screen w-screen bg-black/30  backdrop-blur-lg z-10000 fixed top-0 left-0  overflow-auto '>
      {


        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='container mx-auto px-4 flex flex-col items-center'>
          <motion.span
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, delay: 0.8, repeat: Infinity, ease: "linear" }}
            whileHover={{
              rotateY: 0,           // stop rotation
              transition: { duration: 0.2 }
            }}
            onClick={handleXclick} className='w-10 h-10 rounded-full bg-primary absolute top-5 right-10 grid place-items-center cursor-pointer'>X</motion.span>
          <Input className='mt-50 mx-auto! w-[80%] max-w-[700px] text-white' type='search' placeholder='search' value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} />

          {
            media.length > 0 && <SectionRow data={media} loading={loading} error={error} title='search Results' direct={true} />
          }
        </motion.div>


      }
    </motion.div>
  )
}

export default SearchModal