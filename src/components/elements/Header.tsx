import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useThemeStore } from '../../store/useThemeStore';
import { FaListUl } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { CiBookmark } from "react-icons/ci";

import { useEffect, useRef, useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import { useNavStore } from "@/store/useNavStore";

const navItems = [
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'movies', link: "/movies" },
  { id: 3, name: 'series', link: "/series" }
]


const Header = () => {

  const { theme, toggleTheme } = useThemeStore();
  const [sidebar, setSidebar] = useState<boolean>(false);
  const {currentClicked, setCurrentClicked} = useNavStore();
  const mobilebarref = useRef<HTMLDivElement>(null)
  const openSearchModal = useModalStore(state => state.openSearchModal)

  useEffect(() => {
    if (!mobilebarref.current) return
    function handleclick(e:MouseEvent) {
      console.log(e.target)
      console.log(mobilebarref.current)

      if (mobilebarref.current && !mobilebarref.current.contains(e.target as Node)) {
        setSidebar(false)
      }
    }
    document.addEventListener("mousedown", handleclick)
    return () => document.removeEventListener("mousedown", handleclick)
  }, [])



  return (


    <header className="container mx-auto px-4 w-full fixed top-5 left-[50%] transform -translate-x-1/2 z-50 ">
      <nav className=" rounded-2xl  text-foreground  bg-background/20    backdrop-blur-sm border-[0.1px] border-border">
        <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">

            <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap text-primary antialiased tracking-tighter uppercase" style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
            }}>NEXFLIXR</span>
          </a>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="text-xs flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              {
                navItems.map(item => {
                  return (
                    <li onClick={() => setCurrentClicked(item.id)} key={item.id}>
                      <Link to={item.link} className={`block py-2 px-3 text-foreground rounded-sm hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-hover md:p-0 ${currentClicked === item.id ? "text-hover" : ""} `} aria-current="page">{item.name}</Link>
                    </li>
                  )
                })
              }



            </ul>
          </div>
          <div className='flex items-center'>
            <IoSearchOutline onClick={openSearchModal} className='text-xl  mx-2 lg:mx-4  cursor-pointer  text-primary ' />
            <Link to={`/bookmark`}><CiBookmark className="text-xl cursor-pointer text-primary" /></Link>
            {theme === 'dark' ? <MdOutlineLightMode onClick={toggleTheme} className='text-xl  mx-2 lg:mx-4  cursor-pointer hover:w-7 transition-all duration-300 text-primary' /> : <MdOutlineDarkMode onClick={toggleTheme} className='text-xl  mx-2 lg:mx-4  cursor-pointer hover:w-7 transition-all duration-300 text-primary' />}
            <button onClick={() => setSidebar(true)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary rounded-lg md:hidden hover:bg-hover focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <FaListUl className="text-xl" />
            </button>
          </div>
        </div>
      </nav>
      <div ref={mobilebarref} className={`absolute -top-5 z-10000 w-70  h-screen  md:hidden bg-background transition-all duration-300 ${sidebar ? "-right-20" : "-right-80"} `}>
        <ul className="text-xs flex flex-col  md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
          {
            navItems.map(item => {
              return (
                <li key={item.id} onClick={()=> setCurrentClicked(item.id)}>
                  <Link to={item.link} className={`block py-3 px-6 text-hover  rounded-sm md:bg-transparent  md:p-0 after:content-[''] after:h-0.5 after:bg-primary after:w-[30%] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full relative ${currentClicked === item.id ? "text-hover" : ""}`} aria-current="page">{item.name}</Link>
                </li>

              )
            })
          }

        </ul>
      </div>
    </header>





  )
}

export default Header