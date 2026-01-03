import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ErrorContainer, ResumeUploadSection, ResumeAnalysisDisplay } from '../../components/export.js';
import { useResumeAnalysis } from '../../hooks/export.js';
import { ALLOWED_FILE_TYPES } from '../../constants/index.js';

const ResumeAnalyse = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [experience, setExperience] = useState('0 - 2 Years (New Grad)');
    const [resumeFile, setResumeFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState('');

    const resumeAnalysisMutation = useResumeAnalysis();
    const isLoading = resumeAnalysisMutation.isPending;

    const handleFileChange = (e) => {
        setError('');
        const file = e.target.files && e.target.files[0];
        if (file) {
            const allowedTypes = ALLOWED_FILE_TYPES;
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

        setError('');
        setAnalysis(null);

        try {
            const formData = new FormData();
            formData.append('jobDescription', jobDescription);
            formData.append('experienceInYears', experience);
            formData.append('resume', resumeFile);

            const data = await resumeAnalysisMutation.mutateAsync(formData);
            setAnalysis(data?.resumeAnalysis);
            setError('');
        } catch (err) {
            setError(err.message || 'A network or server error occurred. Please try again.');
            console.error(err);
        }
    };

    const handleUploadAgain = () => {
        setAnalysis(null);
        setError('');
        setResumeFile(null);
        setFileName('');
        setJobDescription('');
        setExperience('0 - 2 Years (New Grad)');
    };

    let content;

    if (isLoading) {
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
        content = (
            <ResumeAnalysisDisplay
                resumeAnalysis={analysis}
                onUploadAgain={handleUploadAgain}
            />
        );
    } else {
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            {content}
        </main>
    );
};

export default ResumeAnalyse;