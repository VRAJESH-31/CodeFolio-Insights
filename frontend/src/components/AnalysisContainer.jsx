import { BarChart3, Target, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import {v4 as uuid} from 'uuid';

const AnalysisContainer = ({profileAnalysis}) => {
    return (
        <div className="space-y-6">
            {/* Main Analysis Card */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="font-semibold text-purple-800 text-lg">Profile Analysis</span>
                </div>
                <p className="text-purple-700 leading-relaxed text-base italic bg-white/50 p-4 rounded-xl border border-purple-100">
                    {profileAnalysis.analysis}
                </p>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths Card */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-5 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-105 transition-transform duration-300">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-semibold text-blue-800 text-base">Strengths</span>
                    </div>
                    <ul className="space-y-3">
                        {profileAnalysis?.strongPoints?.map((point) => (
                            <li key={uuid()} className="flex items-start gap-3">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-blue-700 leading-relaxed italic ">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Improvements Card */}
                <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-amber-100 rounded-lg group-hover:scale-105 transition-transform duration-300">
                            <Target className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="font-semibold text-amber-800 text-base">Areas to Improve</span>
                    </div>
                    <ul className="space-y-3">
                        {profileAnalysis?.improvementAreas?.map((point) => (
                            <li key={uuid()} className="flex items-start gap-3">
                                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-amber-700 leading-relaxed italic">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AnalysisContainer;