
import React from "react";
import { FaChevronDown } from "react-icons/fa";

const questionsAndAnswers = [
    {question:"What is Omni",answer:"Omni is a platform that allows users to manage multiple blockchain assets in one place."},
    {question:"How do I create an account?",answer:"You can create an account by clicking on the Sign Up button and following the instructions."},
    {question:"Is my data secure?",answer:"Yes, we use industry-standard security measures to protect your data."},
    {question:"Can I link multiple wallets?",answer:"Yes, you can link multiple wallets from different blockchains to your Omni account."},
    {question:"What blockchains are supported?",answer:"Omni supports a variety of blockchains including Ethereum, Binance Smart Chain, and more."},
]
const FaqSection = () => {
  
  const [accordionOpen, setAccordionOpen] = React.useState<number | null>(null);


  const toggleAccordion = (index: number) =>{
    console.log("toggled", index);
    accordionOpen === index ? setAccordionOpen(null) : setAccordionOpen(index);

  }
  
  return (
    <section className="container mx-auto my-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        {
            questionsAndAnswers.map((item, index)=>{
                return (
                    <div key={index} className={`mb-2 w-4/5 mx-auto overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer`}>
                        <button onClick={() => toggleAccordion(index)} className={`w-full  px-5 py-3 ${accordionOpen === index ? "rounded-t-2xl " : "rounded-2xl"} cursor-pointer  transition-all duration-300 flex justify-between items-center border-2 border-primary bg-background`}>
                            <span>{item.question}</span>
                            <FaChevronDown className={`transition-all duration-300 ${accordionOpen !== index ? "" : "rotate-180"}`}/> 
                        </button>
                        {<div className={`w-full p-5 rounded-b-2xl    transition-all duration-300 h-fit overflow-hidden relative z-[-1] border-2 border-primary -mt-px ${accordionOpen === index ? "opacity-100 max-h-fit translate-y-0" : "opacity-0 max-h-0 -translate-y-20"} `}>
                            {item.answer}
                        </div>}
                    </div>
                )
            })
        }
    
    </section>
  )
}

export default FaqSection