import React, { useState } from 'react';
import {
    UploadCloud,
    Wand2,
    Loader2,
    Sparkles,
    CheckCircle,
    FileText,
    Calendar
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ResumeAnalysePage = () => {
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
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
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
        console.log('Analyzing:', { jobDescription, experience, fileName });

        setTimeout(() => {
            const mockReview = `
        <div class="space-y-6 text-gray-700">
          <h3 class="text-2xl font-bold text-center text-blue-700">AI Resume Analysis</h3>
          <p class="text-center">Your resume matches 82% of the job description.</p>
          <ul class="list-disc ml-6 space-y-2">
            <li>Strong alignment with React & Node.js.</li>
            <li>Good use of measurable achievements.</li>
            <li>Add more specific project results for better impact.</li>
          </ul>
        </div>
      `;
            setAiReview(mockReview);
            setIsLoading(false);
        }, 2500);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 font-sans">
            {/* ✅ Sidebar component (simple default) */}
            <Sidebar />

            <main className="flex-1 overflow-y-auto transition-all duration-500 ml-80">
                <div className="flex flex-col min-h-screen">
                    <div className="text-center mt-10 mb-8 space-y-4">
                        <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Resume Analysis
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Get AI-powered insights to optimize your resume for specific job opportunities
                        </p>
                    </div>

                    <div className="max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
                        {/* Left Panel */}
                        <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                                    <Wand2 className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-800">Analyze Your Resume</h3>
                            </div>

                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                {/* Job Description */}
                                <div className="space-y-3">
                                    <label className="font-bold text-gray-800">Job Description *</label>
                                    <textarea
                                        rows={6}
                                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500"
                                        placeholder="Paste job description here..."
                                        value={jobDescription}
                                        onChange={(e) => {
                                            setJobDescription(e.target.value);
                                            if (e.target.value.trim()) setError('');
                                        }}
                                    />
                                </div>

                                {/* Experience */}
                                <div className="space-y-3">
                                    <label className="font-bold text-gray-800 flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-blue-500" />
                                        Years of Experience
                                    </label>
                                    <select
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="0-2">0-2 Years (Entry Level)</option>
                                        <option value="3-5">3-5 Years (Mid Level)</option>
                                        <option value="6-9">6-9 Years (Senior Level)</option>
                                        <option value="10+">10+ Years (Expert Level)</option>
                                    </select>
                                </div>

                                {/* Upload */}
                                <div className="space-y-3">
                                    <label className="font-bold text-gray-800 flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-blue-500" />
                                        Upload Resume *
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="block w-full text-gray-600 border border-gray-300 rounded-xl p-2 bg-white"
                                    />
                                    {fileName && (
                                        <p className="text-green-600 text-sm">Uploaded: {fileName}</p>
                                    )}
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700">
                                        {error}
                                    </div>
                                )}

                                {/* Analyze Button */}
                                <button
                                    type="button"
                                    onClick={handleAnalyze}
                                    disabled={isLoading}
                                    className={`w-full flex justify-center items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 ${isLoading ? 'opacity-60 cursor-wait' : 'hover:scale-105'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="h-5 w-5" />
                                            Analyze Resume
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Right Panel */}
                        <div className="xl:col-span-1">
                            <div className="sticky top-8 bg-white/90 p-8 rounded-3xl shadow-2xl border border-white/60 min-h-[600px]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                                        <Sparkles className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">AI Review</h3>
                                </div>

                                <div>
                                    {isLoading ? (
                                        <div className="text-center py-20">
                                            <Loader2 className="h-16 w-16 animate-spin text-blue-500 mx-auto mb-4" />
                                            <p className="text-lg font-semibold text-gray-600">
                                                Analyzing your resume...
                                            </p>
                                        </div>
                                    ) : aiReview ? (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: aiReview }}
                                            className="animate-fade-in"
                                        />
                                    ) : (
                                        <p className="text-gray-500 text-center py-20">
                                            Upload a resume and job description to see AI analysis.
                                        </p>
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
