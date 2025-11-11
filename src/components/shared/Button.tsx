import { motion } from "framer-motion";

const Button = ({text,className,handleClick}:{text:string,className?:string,handleClick?:()=>void}) => {
  return (
    <motion.button  whileTap={{ scale: 0.95 }} onClick={handleClick} type="button" className={`text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 
        py-2.5 text-center me-2 mb-2 dark:bg-primary dark:hover:bg-primary/80  cursor-pointer ${className}`}>{text}</motion.button>
  )
}

export default Button