import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareYoutube } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="container mx-auto px-5 py-10">
        <div className="flex items-center justify-center w-full gap-2">
            <FaInstagramSquare size={30} className="mx-2 cursor-pointer hover:text-primary transition-all duration-300"/>
            <FaLinkedin size={30} className="mx-2 cursor-pointer hover:text-primary transition-all duration-300"/>
            <FaSquareYoutube size={30} className="mx-2 cursor-pointer hover:text-primary transition-all duration-300"/>
            <FaTwitterSquare size={30} className="mx-2 cursor-pointer hover:text-primary transition-all duration-300"/>
            <FaFacebookSquare size={30} className="mx-2 cursor-pointer hover:text-primary transition-all duration-300"/>    

        </div>
    </footer>
  )
}

export default Footer