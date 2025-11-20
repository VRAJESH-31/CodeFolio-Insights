import {
    UploadCloud,
    Wand2,
    Loader2,
    Sparkles,
    Target,
    TrendingUp,
    FileText,
    Shield
} from 'lucide-react';

const ResumeUploadSection = ({ 
    jobDescription, 
    setJobDescription, 
    experience, 
    setExperience, 
    fileName, 
    handleFileChange, 
    handleAnalyze, 
    isLoading 
}) => {
    
    // Helper to determine button state
    const isReadyToAnalyze = fileName;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 space-y-8 animate-float-in">
            {/* Header */}
            <div className="text-center space-y-2">
                <Sparkles className="h-10 w-10 text-pink-600 mx-auto animate-pulse-slow" />
                <h1 className="text-3xl font-black text-gray-800">
                    AI Resume Analyzer
                </h1>
                <p className="text-gray-500 max-w-xl mx-auto">
                    Upload your resume (PDF/DOCX) and optionally paste a Job Description for a tailored, data-driven analysis to maximize your interview chances.
                </p>
            </div>

            {/* Input Form */}
            <div className="space-y-6">
                {/* Job Description Input */}
                <div className="space-y-2">
                    <label htmlFor="jobDescription" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Wand2 className="h-4 w-4 text-purple-500" />
                        Job Description (Optional)
                    </label>
                    <textarea
                        id="jobDescription"
                        rows="5"
                        placeholder="Paste the Job Description here for targeted keyword matching and relevance scoring..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-300 shadow-sm resize-none"
                    ></textarea>
                </div>

                {/* Experience and File Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Experience Dropdown */}
                    <div className="space-y-2">
                        <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            Years of Experience
                        </label>
                        <select
                            id="experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-green-500 focus:border-green-500 shadow-sm"
                        >
                            <option value="0-2">0 - 2 Years (New Grad)</option>
                            <option value="3-5">3 - 5 Years (Mid-Level)</option>
                            <option value="6-10">6 - 10 Years (Senior)</option>
                            <option value="10+">10+ Years (Lead/Architect)</option>
                        </select>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <label htmlFor="resumeFile" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            Upload Resume
                        </label>
                        <label 
                            htmlFor="resumeFile"
                            className={`flex items-center justify-center p-3 border-2 ${fileName ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500'} rounded-xl cursor-pointer transition-all duration-300`}
                        >
                            <input 
                                type="file"
                                id="resumeFile"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="flex items-center gap-3">
                                <UploadCloud className="h-5 w-5" />
                                <span className="font-medium truncate max-w-[200px] sm:max-w-full">
                                    {fileName || "Click to choose file (PDF/DOCX)"}
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Analysis Benefits and CTA (copied from original) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Key Benefits</span>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Quantifiable metrics evaluation</li>
                        <li>• Clear achievement statements</li>
                        <li>• Professional formatting</li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-amber-600" />
                        <span className="font-semibold text-amber-800">Focus Areas</span>
                    </div>
                    <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Skills categorization</li>
                        <li>• Quantifiable metrics</li>
                        <li>• Industry keywords</li>
                    </ul>
                </div>
            </div>

            <button 
                onClick={handleAnalyze} 
                disabled={!isReadyToAnalyze || isLoading}
                className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 transform group ${
                    isReadyToAnalyze && !isLoading
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-xl hover:-translate-y-1'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-lg">Analyzing Resume...</span>
                    </>
                ) : (
                    <>
                        <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <span className="text-lg">Get Detailed Resume Report</span>
                        <FileText className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    </>
                )}
            </button>
        </div>
    );
};

export default ResumeUploadSection;