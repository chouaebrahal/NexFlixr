import { useEffect, useRef, useState } from 'react';
import { usePersonStore } from '../../store/usePersonStore';
import Loading from '../shared/Loading';


const Persons = () => {

    const { trendingPerson,personError,personLoading, fetchTrendingPerson } = usePersonStore();
    const [togglePosition, setTogglePosition] = useState<boolean>(false)
    const personRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        fetchTrendingPerson();

    }, [])

    const handleToggleClick = () => {
        setTogglePosition(prev => !prev)
    }
    
    useEffect(() => {
    const scrollContainer = personRef.current;
    if(!scrollContainer) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollContainer.scrollBy({
        left: event.deltaY < 0 ? -400 : 400,
        behavior: 'smooth'
      })
    }
    scrollContainer.addEventListener('wheel', handleWheel);
    return ()=>{
      scrollContainer.removeEventListener('wheel', handleWheel);
    }
  },[])
  
    let type: "ACTORS" | "OTHERS" = togglePosition ? "OTHERS" : "ACTORS";
    let filtredData: typeof trendingPerson = [];
    if (type === "OTHERS") {
        filtredData = trendingPerson.filter(person => person.known_for_department !== "Acting");
    } else {
        filtredData = trendingPerson.filter(person => person.known_for_department === "Acting");
    }

    return (
        <section className='container mx-auto p-4'>
            <div className='w-full flex items-center justify-between  text-foreground  mb-5'>
                <h1 className="text-xl font-bold md:text-2xl lg:text-4xl">Charachters</h1>

                <div
                    onClick={handleToggleClick}
                    className={`h-11 w-34 m-0 border-2 px-3 flex gap-2 items-center justify-between 
                    rounded-full border-primary overflow-hidden toggle-group relative cursor-pointer
                    before:content-[""] before:h-full before:w-[50%] before:rounded-full before:bg-primary 
                    before:absolute before:transition-all before:duration-300 before:ease-in-out before:z-[-1]
                    ${togglePosition ? 'before:left-17' : 'before:left-0'}`}
                >
                    <span >actors</span>
                    <span >others</span>
                </div>


            </div>
            <div className={`pt-8 m-0 w-full `}>
                {personLoading ? <Loading /> : personError ? <div className='text-red-500 text-center'>{personError}</div> :
                    <div ref={personRef}  className='flex gap-5  items-center overflow-x-auto scrollbar-hide'>
                        {filtredData.map((person, index) => {
                            return (
                                <div  key={index} className='w-40 h-40 rounded-full overflow-hidden shrink-0 border-2 border-primary cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                                    <img className='w-full object-contain' src={`https://image.tmdb.org/t/p/original${person.profile_path}`} alt={person.name} />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </section>
    )
}

export default Persons