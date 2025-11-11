import { FaArrowRight } from "react-icons/fa6";

import type { TMDBMovie } from "../../lib/types";

import { useEffect, useRef } from "react";
import CardItem from "./CardItem";
import Loading from "./Loading";
import Error from "./Error";
import { motion, type Variants } from 'framer-motion'

type SectionRowProps = {
  title: string;
  data: TMDBMovie[];
  loading: boolean;
  error: string | null;
  direct?: boolean;
}


const SectionRow = ({ title, data, loading, error, direct }: SectionRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollContainer.scrollBy({
        left: event.deltaY < 0 ? -400 : 400,
        behavior: 'smooth'
      })
    }
    scrollContainer.addEventListener('wheel', handleWheel);
    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    }
  }, [])

  

  const container : Variants = {
    hidden: {opacity:0},
    show: {
      opacity:1,
      transition: {
        duration:1.5,
        staggerChildren: 0.4, // delay between items
      },
    },
  }

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }

  return (
    <section className='container mx-auto p-4'>
      <div className='w-full flex items-center justify-between  text-foreground  mb-10'>
        <h1 className="text-xl font-bold md:text-2xl lg:text-4xl text-secondary ">{title}</h1>
        <a href="#" className="flex items-center gap-2 font-bold text-primary ">See More <FaArrowRight /></a>
      </div>

      <motion.div
        variants={container}
        initial='hidden'
        animate={`${direct && 'show'}`}
        whileInView="show"
        viewport={{ once: true, }}
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide snap-x pb-4 snap-mandatory">


        {loading ? <Loading />
          : error ? <Error error={error} />
            : data.filter(e => e.poster_path !== null).map((item) => {

              return (
                
                <motion.div
                key={item.id}
                variants={itemVariants}
                className="min-w-45"> 
                  
                   <CardItem   title={item.title} id={item.id} type={item.media_type} poster_path={item.poster_path} direct={direct} />
                
                </motion.div>
                
              )
            }
            )}




      </motion.div>

    </section>
  )
}

export default SectionRow