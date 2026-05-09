import { UploadCloud, Wand2, Loader2, Sparkles, Target, TrendingUp, FileText, Dot } from 'lucide-react';
import { InsightCard } from '@/components/cards/export.js';

const ResumeUploadSection = ({ jobDescription, setJobDescription, experience, setExperience, fileName, handleFileChange, handleAnalyze, isLoading }) => {
  const EXPERIENCE_YEAR_OPTIONS = [
    { value: '0-2', label: '0 - 2 Years (New Grad)' },
    { value: '3-5', label: '3 - 5 Years (Mid-Level)' },
    { value: '6-10', label: '6 - 10 Years (Senior)' },
    { value: '10+', label: '10+ Years (Lead/Architect)' },
  ];

  const isReadyToAnalyze = fileName;

  return (
    <div className="p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 space-y-8 animate-float-in">
      <div className="text-center space-y-2">
        <Sparkles className="h-10 w-10 text-blue-600 mx-auto" />
        <h1 className="text-3xl font-black text-gray-800">AI Resume Analyzer</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Analyze your resume against a job description for data-driven insights.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="jobDescription" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-purple-500" /> Job Description (Optional)
          </label>
          <textarea id="jobDescription" rows="5" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here..." className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" /> Experience
            </label>
            <select id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-green-500 outline-none shadow-sm">
              {EXPERIENCE_YEAR_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" /> Resume File
            </label>
            <label htmlFor="resumeFile" className={`flex items-center justify-center p-3 border-2 border-dashed ${fileName ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500'} rounded-xl cursor-pointer transition-all`}>
              <input type="file" id="resumeFile" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
              <div className="flex items-center gap-3">
                <UploadCloud className="h-5 w-5" />
                <span className="font-medium truncate max-w-[200px]">{fileName || 'PDF or DOCX'}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InsightCard title="Key Benefits" points={['Metrics evaluation', 'Achievement analysis', 'Formatting checks']} Icon={Sparkles} iconColor="text-blue-600" iconBg="bg-blue-100" PointIcon={Dot} pointIconColor="text-blue-500" pointColor="text-blue-700" titleColor="text-blue-800" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200" listClass="space-y-0" />

        <InsightCard title="Focus Areas" points={['Skills matching', 'Quantifiable impact', 'Keyword optimization']} Icon={Target} iconColor="text-purple-600" iconBg="bg-purple-100" PointIcon={Dot} pointIconColor="text-purple-500" pointColor="text-purple-700" titleColor="text-purple-800" className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200" listClass="space-y-0" />
      </div>

      <button onClick={handleAnalyze} disabled={!isReadyToAnalyze || isLoading} className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl shadow-lg transition-all transform group ${isReadyToAnalyze && !isLoading ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-xl hover:-translate-y-1' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-lg">Analyzing...</span>
          </>
        ) : (
          <>
            {/* <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" /> */}
            <span className="text-lg">Generate Report</span>
            <FileText className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          </>
        )}
      </button>
    </div>
  );
};

export default ResumeUploadSection;
