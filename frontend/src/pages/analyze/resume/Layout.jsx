import { useState } from 'react';
import { ErrorContainer } from '@/components/export.js';
import { useResumeAnalysis } from '@/hooks/useAnalyzer.js';
import LoaderSpinner from '@/components/loaders/LoaderSpinner.jsx';
import UploadSection from '@/pages/analyze/resume/UploadSection.jsx';
import AnalysisDisplay from '@/pages/analyze/resume/AnalysisDisplay.jsx';

const ResumeAnalyzeLayout = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [experience, setExperience] = useState('0 - 2 Years (New Grad)');
  const [resumeFile, setResumeFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const { mutate: resumeAnalysisMutation, isPending: isLoading, data: analysisResult, reset, isError, error: queryError } = useResumeAnalysis();

  const analysis = analysisResult
    ? {
        ...analysisResult.resumeAnalysis,
        scoreComparison: analysisResult.scoreComparison,
      }
    : null;

  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const errorAdditionalHelp = ['Check your internet connection.', 'Ensure the file is a standard PDF or DOCX format.', 'The uploaded file size may be too large.'];

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (allowedTypes.includes(file.type)) {
        setResumeFile(file);
        setFileName(file.name);
        setError('');
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
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('experienceInYears', experience);
    formData.append('resume', resumeFile);

    resumeAnalysisMutation(formData, {
      onError: (err) => {
        setError(err.message || 'A network or server error occurred. Please try again.');
      },
    });
  };

  const handleUploadAgain = () => {
    reset();
    setResumeFile(null);
    setFileName('');
    setJobDescription('');
    setExperience('0 - 2 Years (New Grad)');
    setError('');
  };

  let content;

  if (isLoading) {
    content = <LoaderSpinner text={'Analyzing your resume, please wait...'} className="w-20 h-20" containerClass="h-full" />;
  } else if (isError) {
    content = (
      <ErrorContainer
        error={queryError}
        onRetry={handleAnalyze}
        onBack={() => {
          handleUploadAgain();
        }}
        isLoading={isLoading}
        errorAdditionalHelp={errorAdditionalHelp}
      />
    );
  } else if (analysis) {
    content = <AnalysisDisplay resumeAnalysis={analysis} onUploadAgain={handleUploadAgain} />;
  } else {
    content = <UploadSection jobDescription={jobDescription} setJobDescription={setJobDescription} experience={experience} setExperience={setExperience} fileName={fileName} handleFileChange={handleFileChange} handleAnalyze={handleAnalyze} isLoading={isLoading} />;
  }

  return <div className="flex flex-col flex-1 h-full">{content}</div>;
};

export default ResumeAnalyzeLayout;
