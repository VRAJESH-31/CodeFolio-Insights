// src/pages/ResumeAnalysis.jsx
import React, { useState, useEffect } from 'react';
import {
    UploadCloud,
    Wand2,
    Loader2,
    Sparkles,
    Target,
    TrendingUp,
    CheckCircle,
    FileText,
    Calendar,
    Award,
    Crown,
    Brain,
    Lightbulb,
    Shield,
    User,
    Briefcase,
    Star,
    Zap
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ResumeAnalysis = ({
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
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
        setAnalysis(null);

        setTimeout(() => {
            const mockAnalysis = {
                profileScore: 82,
                strengths: [
                    "Strong alignment with JD keywords: 'React', 'Node.js', 'Agile'",
                    "Clear, quantifiable achievements listed under 'Experience'",
                    "Good use of action verbs ('Developed', 'Led', 'Optimized')",
                    "Well-structured education and certification sections"
                ],
                improvements: [
                    "'Skills' section could be categorized (e.g., Languages, Frameworks, Tools)",
                    "Consider adding a brief professional summary at the top",
                    "Project description for 'Project X' is vague. Add specific outcomes/metrics",
                    "Ensure consistent formatting throughout (dates, bullets)"
                ],
                recommendations: [
                    "Quantify achievements further (e.g., 'Improved performance by X%')",
                    "Tailor summary and skills to better match the specific job description",
                    "Add more industry-specific keywords from the job description",
                    "Include relevant certifications or courses"
                ],
                matchRate: "78%",
                atsScore: "85/100",
                skillsGap: ["Cloud Computing", "Docker", "CI/CD"],
                estimatedSalary: "$85,000 - $105,000"
            };
            setAnalysis(mockAnalysis);
            setIsLoading(false);
        }, 3000);
    };

    const animationStyles = `
        @keyframes floatIn {
            0% { opacity: 0; transform: translateY(30px) scale(0.9); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.4); }
        }
        @keyframes scoreProgress {
            0% { stroke-dashoffset: 283; }
        }
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
        }
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
        .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .animate-score-progress { animation: scoreProgress 2s ease-out forwards; }
        .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            background-size: 200px 100%;
            animation: shimmer 3s infinite;
        }
        .animate-bounce-in { animation: bounceIn 1s ease-out forwards; }
    `;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30 font-sans">
            <style>{animationStyles}</style>
            
            <Sidebar
                isSidebarCollapsed={isSidebarCollapsed}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                user={user}
                handleLogout={handleLogout}
            />

            <main className={`flex-1 overflow-y-auto transition-all duration-500 ${isSidebarCollapsed ? 'ml-24' : 'ml-80'}`}>
                <div className="p-6 md:p-8 space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-4 animate-float-in">
                        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight">
                            Resume Analysis
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Get AI-powered insights to optimize your resume for specific job opportunities
                        </p>
                    </div>

                    {/* Input Section */}
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '100ms'}}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                                <Wand2 className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black text-gray-800">Analyze Your Resume</h3>
                                <p className="text-gray-500 text-sm mt-1">Upload your resume and provide job details for personalized feedback</p>
                            </div>
                        </div>
                        
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                            {/* Job Description Field */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="job-description" className="block text-base font-bold text-gray-800 flex items-center gap-2">
                                        <Briefcase className="h-5 w-5 text-purple-500" />
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
                                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 shadow-sm resize-none text-base bg-white/80 backdrop-blur-sm hover:border-purple-300"
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

                            {/* Experience Level Field */}
                            <div className="space-y-3">
                                <label htmlFor="experience" className="block text-base font-bold text-gray-800 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-purple-500" />
                                    Years of Experience
                                </label>
                                <div className="relative">
                                    <select
                                        id="experience"
                                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white appearance-none pr-12 text-base bg-white/80 backdrop-blur-sm hover:border-purple-300 transition-all duration-300"
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

                            {/* File Upload Field */}
                            <div className="space-y-3">
                                <label className="block text-base font-bold text-gray-800 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-purple-500" />
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
                                        <div className="flex flex-col items-center justify-center px-6 pt-12 pb-12 border-3 border-dashed border-purple-200 rounded-3xl bg-purple-50/50 hover:border-purple-400 hover:bg-purple-100/50 transition-all duration-500 group">
                                            <UploadCloud className="h-16 w-16 text-purple-400 group-hover:text-purple-500 transition-colors mb-5 group-hover:scale-110 duration-300" strokeWidth={1.5} />
                                            <div className="text-center space-y-2">
                                                <div className="flex flex-col items-center text-base text-gray-700">
                                                    <span className="font-bold text-purple-600 group-hover:text-purple-700 transition-colors text-lg">
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
                                className={`w-full flex justify-center items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-black py-5 px-8 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-60 disabled:cursor-not-allowed group ${
                                    isLoading ? 'cursor-wait' : 'hover:from-purple-600 hover:to-pink-700 transform hover:-translate-y-2'
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                        <span className="text-lg">Analyzing Resume...</span>
                                    </>
                                ) : (
                                    <>
                                        <Brain className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                                        <span className="text-lg">Analyze Resume</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results Section */}
                    {analysis && (
                        <div className="space-y-8">
                            {/* Score and Meme Section - Top Position */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                {/* Score Circle - Left Side */}
                                <div className="xl:col-span-1 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in">
                                    <div className="text-center space-y-6">
                                        <div className="flex items-center justify-center gap-3 mb-4">
                                            <Crown className="h-8 w-8 text-yellow-500" />
                                            <h3 className="text-2xl font-black text-gray-800">Resume Score</h3>
                                        </div>
                                        
                                        <div className="relative inline-block">
                                            <div className="w-48 h-48 relative">
                                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                    {/* Background Circle */}
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="45"
                                                        fill="none"
                                                        stroke="#e5e7eb"
                                                        strokeWidth="8"
                                                    />
                                                    {/* Progress Circle */}
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="45"
                                                        fill="none"
                                                        stroke="url(#resumeScoreGradient)"
                                                        strokeWidth="8"
                                                        strokeLinecap="round"
                                                        strokeDasharray="283"
                                                        strokeDashoffset={283 - (283 * analysis.profileScore) / 100}
                                                        className="animate-score-progress"
                                                    />
                                                    <defs>
                                                        <linearGradient id="resumeScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor="#8b5cf6" />
                                                            <stop offset="100%" stopColor="#ec4899" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                        {analysis.profileScore}
                                                    </span>
                                                    <span className="text-lg text-gray-500 font-semibold">/100</span>
                                                    <div className="flex items-center gap-1 mt-2">
                                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                                        <span className="text-sm text-green-600 font-semibold">Good match for role</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center p-3 rounded-2xl bg-blue-50/80 border border-blue-200">
                                                    <div className="text-sm font-semibold text-blue-600">Match Rate</div>
                                                    <div className="text-xl font-black text-blue-800">{analysis.matchRate}</div>
                                                </div>
                                                <div className="text-center p-3 rounded-2xl bg-green-50/80 border border-green-200">
                                                    <div className="text-sm font-semibold text-green-600">ATS Score</div>
                                                    <div className="text-xl font-black text-green-800">{analysis.atsScore}</div>
                                                </div>
                                            </div>
                                            <div className="text-center p-3 rounded-2xl bg-purple-50/80 border border-purple-200">
                                                <div className="text-sm font-semibold text-purple-600">Estimated Salary Range</div>
                                                <div className="text-lg font-black text-purple-800">{analysis.estimatedSalary}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Meme and Review - Right Side */}
                                <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '200ms'}}>
                                    <ResumeScoreReview score={analysis.profileScore} />
                                </div>
                            </div>

                            {/* Analysis Details Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Strengths */}
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '300ms'}}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800">Strengths</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {analysis.strengths.map((strength, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 rounded-2xl bg-green-50/50 border border-green-200">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 leading-relaxed">{strength}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Areas for Improvement */}
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '400ms'}}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                                            <Target className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800">Areas for Improvement</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {analysis.improvements.map((improvement, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/50 border border-amber-200">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 leading-relaxed">{improvement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '500ms'}}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                                            <Lightbulb className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800">Recommendations</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {analysis.recommendations.map((recommendation, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50/50 border border-blue-200">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 leading-relaxed">{recommendation}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Skills Gap Analysis */}
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '600ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Skills Gap Analysis</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {analysis.skillsGap.map((skill, index) => (
                                        <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                                            <div className="text-lg font-black text-purple-800 mb-2">{skill}</div>
                                            <div className="text-sm text-purple-600">Recommended to learn</div>
                                            <div className="mt-3 w-full bg-purple-200 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                                                    style={{ width: '30%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

/* --- Enhanced Resume Score & Meme Review --- */
const ResumeScoreReview = ({ score }) => {
    const getMemeForScore = (score) => {
        if (score <= 10) return { 
            text: "Bro, is this even a resume? 😅", 
            meme: "https://media1.tenor.com/m/5cIs6QvX3uMAAAAC/gajab-bezzati-salman-khan.gif",
            comment: "Let's start from scratch and build something amazing!",
            bg: "from-red-50 to-orange-50",
            border: "border-red-200"
        };
        if (score <= 30) return { 
            text: "We've got work to do! 💪", 
            meme: "https://media1.tenor.com/m/6gB-_c6lVqoAAAAC/baburao-style-hai.gif",
            comment: "Solid foundation, but needs significant improvements.",
            bg: "from-orange-50 to-yellow-50",
            border: "border-orange-200"
        };
        if (score <= 60) return { 
            text: "Not bad! Room for growth 🌱", 
            meme: "https://media1.tenor.com/m/6vEVb2uGj8kAAAAC/50-ruppee-kat-rajkumar-hirani.gif",
            comment: "Good potential with some targeted improvements.",
            bg: "from-yellow-50 to-lime-50",
            border: "border-yellow-200"
        };
        if (score <= 80) return { 
            text: "Impressive! Almost there 🚀", 
            meme: "https://media1.tenor.com/m/9rWnSoV8cU0AAAAC/ab-sale.gif",
            comment: "Strong resume with minor optimization needed.",
            bg: "from-green-50 to-emerald-50",
            border: "border-green-200"
        };
        if (score <= 100) return { 
            text: "Resume GOD! Hire this person! 🏆", 
            meme: "https://media1.tenor.com/m/4zRz1b9W1bAAAAAC/maula-mere-maula.gif",
            comment: "Outstanding resume! Ready for top opportunities.",
            bg: "from-blue-50 to-purple-50",
            border: "border-blue-200"
        };
        return { text: "", meme: "", comment: "", bg: "", border: "" };
    };

    const review = getMemeForScore(score);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-7 w-7 text-pink-600" />
                <h3 className="text-2xl font-black text-gray-800">AI Resume Review</h3>
            </div>
            
            <div className={`rounded-3xl p-6 border-2 ${review.border} bg-gradient-to-br ${review.bg} shadow-lg animate-bounce-in`}>
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border">
                        <User className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-semibold text-gray-700">AI Career Assessment</span>
                    </div>
                    
                    <div className="rounded-2xl overflow-hidden shadow-lg mx-auto max-w-md">
                        <img 
                            src={review.meme} 
                            alt="Resume performance meme" 
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-br from-green-50 to-cyan-50 p-4 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Award className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-800">Key Strengths</span>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                        <li>• Strong keyword optimization</li>
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

            <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Get Detailed Resume Report</span>
                <FileText className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            </button>
        </div>
    );
};

export default ResumeAnalysis;