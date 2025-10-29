import { getMemeForScore } from "../utils/helper";

const MemeContainer = ({score}) => {

    const review = getMemeForScore(score);

    return (
        <div className={`rounded-3xl p-6 border-2 ${review.border} bg-gradient-to-br ${review.bg} shadow-lg animate-bounce-in`}>
            <div className="rounded-2xl overflow-hidden shadow-lg mx-auto max-w-md">
                <img 
                    src={review.meme} 
                    alt="Performance meme" 
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
            
            <div className="space-y-3">
                <p className="text-2xl font-black text-gray-800 italic leading-tight">
                    "{review.text}"
                </p>
                <p className="text-gray-600 font-medium">
                    {review.comment}
                </p>
            </div>
        </div>
    )
}

export default MemeContainer;