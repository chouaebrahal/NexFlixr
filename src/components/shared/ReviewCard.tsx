import type { Review } from "@/lib/types"
import { FaStar } from "react-icons/fa"
import avatar from '../../assets/istockphoto-2211975502-612x612.webp'



const ReviewCard = ({review}:{review:Review}) => {
  const  rating = Array(5).fill(1)
  function sanitizeText(text: string) {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
  return (
    <div className="p-3 rounded-2xl bg-secondary text-gray-200 w-70 shrink-0">
                  <div className="inline-flex items-center gap-2">
                    <img className="w-8 h-8 rounded-full" src={review.author_details.avatar_path ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` : avatar} alt={`${review.author} avatar`} />
                    <h3>{review.author}</h3>
                   
                  </div>
                   <div className="flex ">
                       {
                       rating.filter((_,i)=> i < ( review.author_details.rating ? review.author_details.rating : 4)).map((_,index) => {
                        return <FaStar key={index} className="text-yellow-300" />
                       })
                       }
                    </div>
                    <p className="lineClamp3 text-xs text-justify mt-3">
                      {sanitizeText(review.content)}
                    </p>
                </div>
  )
}

export default ReviewCard