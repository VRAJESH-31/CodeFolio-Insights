import { getMemeForScore } from "../utils/helper";
import { Sparkles, Quote } from "lucide-react";

const MemeContainer = ({ score }) => {
    const review = getMemeForScore(score);

    return (
        <div className={`relative rounded-2xl p-5 border-2 ${review.border} bg-gradient-to-br ${review.bg} shadow-xl animate-bounce-in group hover:shadow-2xl transition-all duration-300`}>
            {/* Decorative corner accents */}
            <div className="absolute top-3 left-3 w-2 h-2 bg-current opacity-20 rounded-full"></div>
            <div className="absolute top-3 right-3 w-2 h-2 bg-current opacity-20 rounded-full"></div>
            <div className="absolute bottom-3 left-3 w-2 h-2 bg-current opacity-20 rounded-full"></div>
            <div className="absolute bottom-3 right-3 w-2 h-2 bg-current opacity-20 rounded-full"></div>

            {/* Meme Image Container */}
            <div className="relative rounded-xl overflow-hidden shadow-md mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                    src={review.meme}
                    alt="Performance meme"
                    className="w-full max-h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Text Content */}
            <div className="space-y-3 relative">
                {/* Quote icon */}
                <Quote className="absolute -top-2 -left-1 w-4 h-4 text-current opacity-30" />

                <p className="text-lg font-black text-gray-800 italic leading-tight pl-3">
                    {review.text}
                </p>

                <div className="border-t border-current border-opacity-10 pt-3">
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                        {review.comment}
                    </p>
                </div>
            </div>

            {/* Score indicator */}
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-700 border border-white/60">
                {score}/100
            </div>
        </div>
    )
}

export default MemeContainer;