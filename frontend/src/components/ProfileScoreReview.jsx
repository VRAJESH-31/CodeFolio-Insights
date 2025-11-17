import { BarChart3, MessageSquareQuote, Sparkles, Target, TrendingUp } from "lucide-react";
import { getMemeForScore } from "../utils/helper";
import {v4 as uuid} from "uuid";
import MemeContainer from "./MemeContainer";

const ProfileScoreReview = ({ score, profileAnalysis }) => {
    const review = getMemeForScore(score);

    return (
        <></>
        // <div className="space-y-6">
        //     {/* <div className="flex items-center gap-3 mb-2">
        //         <MessageSquareQuote className="h-7 w-7 text-purple-600" />
        //         <h3 className="text-2xl font-black text-gray-800">AI Performance Review</h3>
        //     </div> */}
            
        //     <div className={`rounded-3xl p-6 border-2 ${review.border} bg-gradient-to-br ${review.bg} shadow-lg animate-bounce-in`}>
        //         <div className="text-center space-y-4">
        //             <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border">
        //                 <Sparkles className="h-4 w-4 text-purple-500" />
        //                 <span className="text-sm font-semibold text-gray-700">AI Generated Review</span>
        //             </div>
                    
        //             <MemeContainer score={score}/>
        //         </div>
        //     </div>

        //     {/* Profile Analysis - Full Width */}
        //     {/* {profileAnalysis?.analysis && (
        //         <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200">
        //             <div className="flex items-center gap-2 mb-3">
        //                 <BarChart3 className="h-5 w-5 text-purple-600" />
        //                 <span className="font-semibold text-purple-800 text-lg">Profile Analysis</span>
        //             </div>
        //             <p className="text-purple-700 leading-relaxed">
        //                 {profileAnalysis.analysis}
        //             </p>
        //         </div>
        //     )}

        //     {/* Strengths and Improvements - Half Width Each */}
        //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //         <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
        //             <div className="flex items-center gap-2 mb-2">
        //                 <TrendingUp className="h-4 w-4 text-blue-600" />
        //                 <span className="font-semibold text-blue-800">Strengths</span>
        //             </div>
        //             <ul className="text-sm text-blue-700 space-y-1">
        //                 {profileAnalysis?.strongPoints?.map((point) => (
        //                     <li key={uuid()}>• {point}</li>
        //                 ))}
        //             </ul>
        //         </div>
                
        //         <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
        //             <div className="flex items-center gap-2 mb-2">
        //                 <Target className="h-4 w-4 text-amber-600" />
        //                 <span className="font-semibold text-amber-800">Areas to Improve</span>
        //             </div>
        //             <ul className="text-sm text-amber-700 space-y-1">
        //                 {profileAnalysis?.improvementAreas?.map((point) => (
        //                     <li key={uuid()}>• {point}</li>
        //                 ))}
        //             </ul>
        //         </div>
        //     </div> */}
        // </div>
    );
};

export default ProfileScoreReview;