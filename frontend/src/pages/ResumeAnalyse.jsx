// src/pages/ResumeAnalyse.jsx
import React, { useState } from 'react';
import {
    UploadCloud,
    Wand2,
    Loader2,
    Sparkles,
    Target,
    TrendingUp,
    CheckCircle,
    FileText,
    Calendar
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ResumeAnalysePage = ({
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    activeMenu,
    setActiveMenu,
    user,
    handleLogout
}) => {

    const [jobDescription, setJobDescription] = useState('');
    const [experience, setExperience] = useState('0-2');
    const [resumeFile, setResumeFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [aiReview, setAiReview] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setError('');
        const file = e.target.files && e.target.files[0];
        if (file) {
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const maxSize = 5 * 1024 * 1024;

            if (!allowedTypes.includes(file.type)) {
                setError('Invalid file type. Please upload PDF, DOC, or DOCX.');
                setResumeFile(null);
                setFileName('');
                e.target.value = null;
                return;
            }
            if (file.size > maxSize) {
                setError('File size exceeds 5MB limit.');
                setResumeFile(null);
                setFileName('');
                e.target.value = null;
                return;
            }

            setResumeFile(file);
            setFileName(file.name);
        } else {
            setResumeFile(null);
            setFileName('');
        }
    };

    const handleAnalyze = () => {
        setError('');
        if (!jobDescription.trim()) {
            setError('Please provide the job description.');
            return;
        }
        if (!resumeFile) {
            setError('Please upload your resume file.');
            return;
        }

        setIsLoading(true);
        setAiReview('');
        console.log("Analyzing:", { jobDescription, experience, fileName });

        setTimeout(() => {
            const mockReview = `
                <div class="space-y-6">
                    <div class="text-center pb-6 border-b border-blue-100/50">
                        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <i class="fas fa-sparkles mr-1"></i>
                            AI Resume Analysis
                        </div>
                        <div class="flex justify-center items-baseline gap-2 mb-3">
                            <span class="text-4xl font-black text-gray-800">82</span>
                            <span class="text-lg text-gray-600 font-medium">/100</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 max-w-xs mx-auto">
                            <div class="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-1000" style="width: 82%"></div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="bg-gradient-to-br from-green-50 to-green-25 border border-green-200 rounded-2xl p-5 shadow-sm">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="p-2 bg-green-100 rounded-xl">
                                    <i class="fas fa-check-circle text-green-600 text-lg"></i>
                                </div>
                                <h4 class="font-bold text-green-800 text-lg">Strengths</h4>
                            </div>
                            <ul class="space-y-3 text-sm text-green-700">
                                <li class="flex items-start gap-3">
                                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span class="leading-relaxed">Strong alignment with JD keywords: "React", "Node.js", "Agile"</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span class="leading-relaxed">Clear, quantifiable achievements listed under "Experience"</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span class="leading-relaxed">Good use of action verbs ("Developed", "Led", "Optimized")</span>
                                </li>
                            </ul>
                        </div>

                        <div class="bg-gradient-to-br from-amber-50 to-amber-25 border border-amber-200 rounded-2xl p-5 shadow-sm">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="p-2 bg-amber-100 rounded-xl">
                                    <i class="fas fa-bullseye text-amber-600 text-lg"></i>
                                </div>
                                <h4 class="font-bold text-amber-800 text-lg">Areas for Improvement</h4>
                            </div>
                            <ul class="space-y-3 text-sm text-amber-700">
                                <li class="flex items-start gap-3">
                                    <div class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span class="leading-relaxed">"Skills" section could be categorized (e.g., Languages, Frameworks, Tools)</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span class="leading-relaxed">Consider adding a brief professional summary at the top</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span class="leading-relaxed">Project description for "Project X" is vague. Add specific outcomes/metrics</span>
                                </li>
                            </ul>
                        </div>

                        <div class="bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-200 rounded-2xl p-5 shadow-sm">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="p-2 bg-blue-100 rounded-xl">
                                    <i class="fas fa-chart-line text-blue-600 text-lg"></i>
                                </div>
                                <h4 class="font-bold text-blue-800 text-lg">Next Steps</h4>
                            </div>
                            <ul class="space-y-3 text-sm text-blue-700">
                                <li class="flex items-start gap-3">
                                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span class="leading-relaxed">Quantify achievements further (e.g., "Improved performance by X%")</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span class="leading-relaxed">Tailor summary and skills to better match the specific job description</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
              `;
            setAiReview(mockReview);
            setIsLoading(false);
        }, 2500);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 font-sans">
            <Sidebar
                isSidebarCollapsed={isSidebarCollapsed}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                user={user}
                handleLogout={handleLogout}
            />

            <main className={`flex-1 overflow-y-auto transition-all duration-500 ${isSidebarCollapsed ? 'ml-24' : 'ml-80'}`}>
                <div className="flex flex-col min-h-screen ">
                    {/* Enhanced Header with Better Spacing */}
                    <div className="text-center space-y-4 mt-10 mb-8">
                        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                            Resume Analysis
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                            Get AI-powered insights to optimize your resume for specific job opportunities
                        </p>
                    </div>

                    {/* Main Grid Layout with Better Responsive Behavior */}
                    <div className="max-w-7xl mx-auto w-full px-6 xl:px-12 py-10 grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
                        {/* Input Section - Properly Sized */}
                        <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-2xl border border-white/60">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                                    <Wand2 className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-gray-800">Analyze Your Resume</h3>
                                    <p className="text-gray-500 text-sm mt-1">Get personalized feedback for your target role</p>
                                </div>
                            </div>
                            
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                                {/* Job Description Field - Improved Layout */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="job-description" className="block text-base font-bold text-gray-800">
                                            Job Description <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {jobDescription.length}/5000
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            id="job-description"
                                            rows={6}
                                            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 shadow-sm resize-none text-base bg-white/80 backdrop-blur-sm hover:border-blue-300"
                                            placeholder="Paste the full job description here to get tailored resume feedback..."
                                            value={jobDescription}
                                            onChange={(e) => {
                                                setJobDescription(e.target.value);
                                                if (e.target.value.trim()) setError('');
                                            }}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Experience Level Field - Better Alignment */}
                                <div className="space-y-3">
                                    <label htmlFor="experience" className="block text-base font-bold text-gray-800 flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-blue-500" />
                                        Years of Experience
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="experience"
                                            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white appearance-none pr-12 text-base bg-white/80 backdrop-blur-sm hover:border-blue-300 transition-all duration-300"
                                            style={{ 
                                                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>')`, 
                                                backgroundPosition: 'right 1rem center', 
                                                backgroundSize: '1.25em 1.25em',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                        >
                                            <option value="0-2">0-2 Years (Entry Level)</option>
                                            <option value="3-5">3-5 Years (Mid Level)</option>
                                            <option value="6-9">6-9 Years (Senior Level)</option>
                                            <option value="10+">10+ Years (Expert Level)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Enhanced File Upload Field - Better Structure */}
                                <div className="space-y-3">
                                    <label className="block text-base font-bold text-gray-800 flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-blue-500" />
                                        Upload Resume <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <input 
                                            id="resume-upload" 
                                            name="resume-upload" 
                                            type="file" 
                                            className="sr-only" 
                                            accept=".pdf,.doc,.docx" 
                                            onChange={handleFileChange} 
                                        />
                                        <label htmlFor="resume-upload" className="cursor-pointer block">
                                            <div className="flex flex-col items-center justify-center px-6 pt-12 pb-12 border-3 border-dashed border-blue-200 rounded-3xl bg-blue-50/50 hover:border-blue-400 hover:bg-blue-100/50 transition-all duration-500 group">
                                                <UploadCloud className="h-16 w-16 text-blue-400 group-hover:text-blue-500 transition-colors mb-5 group-hover:scale-110 duration-300" strokeWidth={1.5} />
                                                <div className="text-center space-y-2">
                                                    <div className="flex flex-col items-center text-base text-gray-700">
                                                        <span className="font-bold text-blue-600 group-hover:text-blue-700 transition-colors text-lg">
                                                            Click to upload your resume
                                                        </span>
                                                        <p className="text-gray-500 mt-1">or drag and drop here</p>
                                                    </div>
                                                    <p className="text-sm text-gray-400 bg-white/80 px-3 py-1.5 rounded-full border border-gray-200">
                                                        PDF, DOC, DOCX up to 5MB
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                        {fileName && (
                                            <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-2xl animate-fade-in">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-green-100 rounded-xl">
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-green-800 font-semibold text-sm truncate" title={fileName}>
                                                            {fileName}
                                                        </p>
                                                        <p className="text-green-600 text-xs mt-1">Ready for analysis</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Enhanced Error Message */}
                                {error && (
                                    <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-2xl animate-pulse" role="alert">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                                            <p className="font-bold text-red-800 text-base">Attention Required</p>
                                        </div>
                                        <p className="text-red-700 text-sm mt-2 ml-6">{error}</p>
                                    </div>
                                )}

                                {/* Enhanced Analyze Button */}
                                <button
                                    type="button"
                                    onClick={handleAnalyze}
                                    disabled={isLoading}
                                    className={`w-full flex justify-center items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-black py-5 px-8 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-60 disabled:cursor-not-allowed group ${
                                        isLoading ? 'cursor-wait' : 'hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-2'
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                            <span className="text-lg">Analyzing Resume...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                                            <span className="text-lg">Analyze Resume</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Enhanced AI Review Section - Better Alignment */}
                        <div className="xl:col-span-1">
                            <div className="sticky top-8 bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-2xl border border-white/60 min-h-[600px] max-h-[calc(100vh-4rem)] overflow-y-auto">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                                        <Sparkles className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-black text-gray-800">AI Review</h3>
                                        <p className="text-gray-500 text-sm mt-1">Detailed analysis results</p>
                                    </div>
                                </div>
                                
                                <div className="h-full">
                                    {isLoading && (
                                        <div className="flex  items-center justify-center text-center py-20">
                                            <div className="relative mb-6">
                                                <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-10 blur-lg"></div>
                                            </div>
                                            <p className="text-xl font-bold text-gray-700 mb-2">Generating Insights</p>
                                            <p className="text-gray-500 max-w-xs leading-relaxed">
                                                Analyzing your resume against the job description...
                                            </p>
                                        </div>
                                    )}
                                    {!isLoading && !aiReview && (
                                        <div className="flex flex-col items-center justify-center text-center py-20 rounded-3xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 min-h-[400px] border-3 border-dashed border-blue-200/50">
                                            <div className="p-5 bg-white/80 rounded-3xl shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
                                                <Wand2 className="h-16 w-16 text-blue-400" strokeWidth={1.5} />
                                            </div>
                                            <p className="text-xl font-bold text-gray-600 mb-3">
                                                Ready for Analysis
                                            </p>
                                            <p className="text-gray-500 max-w-xs leading-relaxed text-base">
                                                Fill in the job description, upload your resume, and click analyze to get personalized feedback.
                                            </p>
                                        </div>
                                    )}
                                    {!isLoading && aiReview && (
                                        <div 
                                            dangerouslySetInnerHTML={{ __html: aiReview }} 
                                            className="animate-fade-in space-y-6"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumeAnalysePage;