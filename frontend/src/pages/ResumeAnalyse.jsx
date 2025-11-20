// src/pages/ResumeAnalysis.jsx
import React, { useState, useEffect } from 'react';
import {
    UploadCloud,
    Loader2,
    Sparkles,
    FileText,
    Shield,
    AlertTriangle // Assuming ErrorContainer needs this or it's needed for loading
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ErrorContainer from '../components/ErrorContainer'; // Reusable component
import ResumeUploadSection from '../components/ResumeUploadSection'; // New/refactored component
import ResumeAnalysisDisplay from '../components/ResumeAnalysisDisplay'; // New component
import axiosInstance from '../api/axiosInstance.js';
import conf from '../config/config.js';

const ResumeAnalysis = () => {

    const [jobDescription, setJobDescription] = useState('');
    const [experience, setExperience] = useState('0 - 2 Years (New Grad)');
    const [resumeFile, setResumeFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null); 
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false); // Retaining existing state

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleFileChange = (e) => {
        setError('');
        const file = e.target.files && e.target.files[0];
        if (file) {
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (allowedTypes.includes(file.type)) {
                setResumeFile(file);
                setFileName(file.name);
            } else {
                setResumeFile(null);
                setFileName('');
                setError('Invalid file type. Please upload a PDF or DOCX file.');
            }
        }
    };
    
    const handleAnalyze = async () => {
        if (!resumeFile) {
            setError('Please upload a resume file first.');
            return;
        }

        setIsLoading(true);
        setError('');
        setAnalysis(null); // Clear previous analysis

        try {
            const formData = new FormData();
            formData.append('jobDescription', jobDescription);
            formData.append('experienceInYears', experience);
            formData.append('resume', resumeFile);
            const response = await axiosInstance.post(
                `${conf.SERVER_BASE_URL}/analyze/resume`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setAnalysis(response.data?.resumeAnalysis);
            setError('');
        } catch (err) {
            // Handle catastrophic promise rejection (e.g., network down)
            setError('A network or server error occurred. Please try again.');
            if (err.response?.data?.message) {
                console.log(err.response.data.message);
            } else {
                console.log(err);
            }
            setAnalysis(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadAgain = () => {
        setAnalysis(null);
        setError('');
        setResumeFile(null);
        setFileName('');
        setIsLoading(false);
        setJobDescription('');
        setExperience('0 - 2 Years (New Grad)');
    };

    let content;

    if (isLoading) {
        // 1. Loading State
        content = (
            <div className="min-h-[60vh] flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto" />
                    <h2 className="text-xl font-semibold text-gray-700">Analyzing your resume, please wait...</h2>
                    <p className="text-gray-500">This may take a few moments as our AI evaluates all sections.</p>
                </div>
            </div>
        );
    } else if (error) {
        // 2. Error State (Reuses ErrorContainer)
        content = (
            <ErrorContainer 
                error={error} 
                onRetry={handleAnalyze} 
                isLoading={isLoading}
                errorAdditionalHelp={[
                    "Check your internet connection.",
                    "Ensure the file is a standard PDF or DOCX format.",
                    "The uploaded file size may be too large."
                ]}
            />
        );
    } else if (analysis) {
        // 3. Analysis View (Uses the new ResumeAnalysisDisplay)
        content = (
            <ResumeAnalysisDisplay 
                resumeAnalysis={analysis} 
                onUploadAgain={handleUploadAgain} 
            />
        );
    } else {
        // 4. Initial Upload Form (Uses the new/refactored ResumeUploadSection)
        content = (
            <ResumeUploadSection 
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                experience={experience}
                setExperience={setExperience}
                fileName={fileName}
                handleFileChange={handleFileChange}
                handleAnalyze={handleAnalyze}
                isLoading={isLoading}
            />
        );
    }

    return (
        <div className="h-screen bg-gray-50 flex">
            <Sidebar
                isSidebarCollapsed={false}
                activeMenu="Resume Analysis"
                setActiveMenu={() => {}}
            />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                {content}
            </main>
        </div>
    );
};

export default ResumeAnalysis;