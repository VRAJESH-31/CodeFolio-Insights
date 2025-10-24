import React, { useState } from 'react';
import {
    UploadCloud,
    Wand2,
    Loader2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

// ---------- Resume Analysis Page Component ----------
const ResumeAnalysePage = ({
    isSidebarCollapsed = false,
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

    // Handle resume upload
    const handleFileChange = (e) => {
        setError('');
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    // Simulate AI analysis
    const handleAnalyze = () => {
        setError('');
        if (!jobDescription || !resumeFile) {
            setError('Please provide both a job description and a resume file.');
            return;
        }

        setIsLoading(true);
        setAiReview('');

        // Simulated AI feedback delay
        setTimeout(() => {
            const mockReview = `
        <h3 class="text-lg font-semibold text-gray-800 mb-2">AI Resume Analysis</h3>
        <p class="text-gray-600 mb-4"><strong>Overall Score: 82/100</strong></p>
        <div class="space-y-3">
          <div>
            <h4 class="font-semibold text-green-700">Strengths:</h4>
            <ul class="list-disc list-inside text-gray-600 ml-4">
              <li>Strong alignment with job description keywords: "React", "Node.js", "Agile".</li>
              <li>Clear, quantifiable achievements listed under "Experience".</li>
              <li>Good use of action verbs ("Developed", "Led", "Optimized").</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-orange-700">Areas for Improvement:</h4>
            <ul class="list-disc list-inside text-gray-600 ml-4">
              <li>"Skills" section could be categorized (e.g., Languages, Frameworks, Tools).</li>
              <li>Consider adding a brief professional summary at the top.</li>
              <li>The project description for "Project X" is a bit vague. Try to add specific outcomes.</li>
            </ul>
          </div>
        </div>
      `;
            setAiReview(mockReview);
            setIsLoading(false);
        }, 2500);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* ---------- Sidebar ---------- */}
            <Sidebar
                isSidebarCollapsed={isSidebarCollapsed}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                user={user}
                handleLogout={handleLogout}
            />

            {/* ---------- Main Content ---------- */}
            <main
                className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}
            >
                <div className="p-6 md:p-10 space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800">Resume Analysis</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* --- Input Section --- */}
                        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Analyze Your Resume</h3>
                            <form className="space-y-6">
                                {/* Job Description */}
                                <div>
                                    <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Job Description
                                    </label>
                                    <textarea
                                        id="job-description"
                                        rows="8"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
                                        placeholder="Paste the job description here..."
                                        value={jobDescription}
                                        onChange={(e) => {
                                            setJobDescription(e.target.value);
                                            setError('');
                                        }}
                                    ></textarea>
                                </div>

                                {/* Experience Level */}
                                <div>
                                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                                        Years of Experience
                                    </label>
                                    <select
                                        id="experience"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    >
                                        <option value="0-2">0-2 Years</option>
                                        <option value="3-5">3-5 Years</option>
                                        <option value="6-9">6-9 Years</option>
                                        <option value="10+">10+ Years</option>
                                    </select>
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Resume
                                    </label>
                                    <label
                                        htmlFor="resume-upload"
                                        className="relative flex justify-center items-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-400 transition-colors bg-gray-50 hover:bg-indigo-50"
                                    >
                                        <div className="text-center">
                                            <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">
                                                <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PDF, DOC, DOCX (max 5MB)</p>
                                            {fileName && (
                                                <p className="text-sm text-green-700 font-medium mt-2">{fileName}</p>
                                            )}
                                        </div>
                                        <input
                                            id="resume-upload"
                                            name="resume-upload"
                                            type="file"
                                            className="sr-only"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg">
                                        <p>{error}</p>
                                    </div>
                                )}

                                {/* Analyze Button */}
                                <button
                                    type="button"
                                    onClick={handleAnalyze}
                                    disabled={isLoading}
                                    className={`w-full flex justify-center items-center bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all ${isLoading
                                            ? 'bg-indigo-400 cursor-not-allowed'
                                            : 'hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="mr-2 h-5 w-5" />
                                            Analyze Resume
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* --- AI Review Section --- */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 h-full">
                                <h3 className="text-xl font-semibold text-gray-800 mb-6">AI Review</h3>
                                <div className="h-full min-h-[300px]">
                                    {isLoading && (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                            <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
                                            <p className="mt-4 text-sm">Generating feedback...</p>
                                        </div>
                                    )}
                                    {!isLoading && !aiReview && (
                                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-4 rounded-lg bg-gray-50">
                                            <Wand2 className="h-12 w-12 mb-3" />
                                            <p className="text-sm">
                                                Your resume analysis will appear here after you submit.
                                            </p>
                                        </div>
                                    )}
                                    {!isLoading && aiReview && (
                                        <div
                                            className="prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: aiReview }}
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
