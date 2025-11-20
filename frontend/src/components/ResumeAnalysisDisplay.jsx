import { UploadCloud, FileText, TrendingUp, Target, Shield, CheckCircle, Sparkles, AlertCircle, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import {v4 as uuid} from 'uuid';
import { useState } from 'react'; // Import useState hook

import ScoreMeter from './ScoreMeter';
import MemeContainer from './MemeContainer';
import AnalysisCard from './AnalysisCard';
import StatCard from './StatCard';

const getScoreColorName = (score) => {
    if (score >= 80) return "green";
    if (score >= 60) return "blue";
    if (score >= 40) return "yellow";
    return "red";
};

const mapScoreAnalysisToStats = (scoreAnalysis) => {
    const metrics = [
        { key: 'resumeLength', title: 'Length Score', icon: FileText },
        { key: 'impact', title: 'Impact Score', icon: TrendingUp },
        { key: 'professionalism', title: 'Professionalism', icon: Shield },
        { key: 'logicalFlow', title: 'Logical Flow', icon: CheckCircle },
    ];

    return metrics.map((metric, index) => {
        const score = scoreAnalysis[metric.key].score;
        return {
            icon: metric.icon,
            title: metric.title,
            value: `${score}`,
            color: getScoreColorName(score),
            delay: (index + 1) * 150,
        }
    });
};

const ResumeAnalysisDisplay = ({ resumeAnalysis, onUploadAgain }) => {
    const overallScore = resumeAnalysis.score;
    // const stats = mapScoreAnalysisToStats(resumeAnalysis.scoreAnalysis); // Removed unused variable
    
    const getScoreColorClasses = (score) => {
        if (score >= 80) return 'from-green-500 to-emerald-600';
        if (score >= 60) return 'from-blue-500 to-cyan-600';
        return 'from-amber-500 to-orange-600';
    }

    // State to manage the visibility of the Point Analysis sections
    // Keys will be the sectionKey (e.g., 'experience', 'education') and value will be boolean (true = show, false = hide)
    const [pointAnalysisVisibility, setPointAnalysisVisibility] = useState({});

    // Toggle function
    const togglePointAnalysis = (sectionKey) => {
        setPointAnalysisVisibility(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey] // Toggle the current state
        }));
    };

    return (
        <div className="space-y-8">
            {/* Header and Upload Again Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
                    <Sparkles className="h-7 w-7 text-pink-600" />
                    AI Resume Analysis Report
                </h1>
                <button
                    onClick={onUploadAgain}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                    <UploadCloud className="h-5 w-5" />
                    Upload New Resume
                </button>
            </div>

            {/* Score Review and Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Column 1: Score Meter */}
                <div className="lg:col-span-1">
                    <ScoreMeter score={overallScore} />
                </div>
                
                {/* Column 2: Meme Container (Now to the right of the score) */}
                <div className="lg:col-span-1">
                    <MemeContainer score={overallScore} />
                </div>
            </div>

            {/* Strengths and Improvements (using AnalysisContainer) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <AnalysisCard title="Strengths" points={resumeAnalysis?.strengths} Icon={TrendingUp} PointIcon={CheckCircle} className='bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-200' iconBg = "bg-blue-100" iconColor = "text-blue-600" pointIconColor = "text-green-500" pointColor = "text-blue-700"/>

                <AnalysisCard title="Weaknesses" points={resumeAnalysis?.weaknesses} Icon={TrendingDown} PointIcon={CheckCircle} className='bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200' iconBg = "bg-amber-100" iconColor = "text-amber-600" pointIconColor = "text-amber-500" pointColor = "text-amber-700"/>
                
                <AnalysisCard title="Improvement Areas" points={resumeAnalysis?.improvements} Icon={Target} PointIcon={CheckCircle} className='bg-gradient-to-br from-green-50 via-white to-cyan-50 border-green-200 md:col-span-2' iconBg = "bg-green-100" iconColor = "text-blue-600" pointIconColor = "text-green-500" pointColor = "text-green-700"/>
            </div>

            {/* Sectional Analysis - Deep Dive */}
            <div className="pt-4 space-y-6">    
                <h2 className="text-2xl font-black text-gray-800 border-b pb-2">Resume Structure Deep Dive</h2>
                {Object.keys(resumeAnalysis.scoreAnalysis).map((sectionKey) => {
                    const section = resumeAnalysis.scoreAnalysis[sectionKey];
                    
                    if (sectionKey === 'section' || sectionKey === 'jobDescription') return null;

                    return (
                        <div key={sectionKey} className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-gray-200/80 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold capitalize text-gray-700">{sectionKey.replace(/([A-Z])/g, ' $1').trim()}</h3>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getScoreColorClasses(section.score)}`}>
                                    {section.score}%
                                </div>
                            </div>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                {section.analysis.map((line, lineIndex) => (
                                    <li key={lineIndex} className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* Sectional Analysis - Deep Dive - MODIFIED */}
            <div className="pt-4 space-y-6">
                <h2 className="text-2xl font-black text-gray-800 border-b pb-2">Section-wise Deep Dive</h2>
                {Object.keys(resumeAnalysis.scoreAnalysis.section).map((sectionKey) => {
                    const section = resumeAnalysis.scoreAnalysis.section[sectionKey];
                    const isPointAnalysisVisible = pointAnalysisVisibility[sectionKey];

                    return (
                        <div key={sectionKey} className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-gray-200/80 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold capitalize text-gray-700">{sectionKey.replace(/([A-Z])/g, ' $1').trim()}</h3>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getScoreColorClasses(section.score)}`}>
                                    {section.score}%
                                </div>
                            </div>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                {section.analysis.map((line, lineIndex) => (
                                    <li key={lineIndex} className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Detailed Point Analysis - MODIFIED for show/hide */}
                            {section.pointAnalysis && (
                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                                    <button 
                                        onClick={() => togglePointAnalysis(sectionKey)}
                                        className="w-full flex justify-between items-center text-lg font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200 p-2 -m-2 rounded-lg"
                                    >
                                        <h4>Bullet Point Review:</h4>
                                        {isPointAnalysisVisible ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </button>

                                    {/* Content rendered conditionally based on state */}
                                    {isPointAnalysisVisible && (
                                        <div className="space-y-3">
                                            {section.pointAnalysis.map((pointData) => (
                                                <div key={uuid()} className="p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                                                    <div className='flex justify-between items-center mb-2'>
                                                        <p className="text-xs font-medium text-gray-500">Original:</p>
                                                        <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${pointData.score >= 8 ? 'bg-green-100 text-green-700' : pointData.score >= 6 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                                            Score: {pointData.score}/10
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-800 italic mb-3">{pointData.point.original}</p>
                                                    
                                                    <div className="flex flex-col md:flex-row justify-between items-start pt-2 border-t border-gray-100">
                                                        <div className="flex-1 md:pr-4">
                                                            <p className="text-xs font-medium text-purple-600 mb-1">Recommended Refactor:</p>
                                                            <p className="text-sm text-purple-800">{pointData.point.refactored}</p>
                                                        </div>
                                                        <div className="flex-shrink-0 mt-3 md:mt-0 md:pl-4 md:border-l md:border-gray-100">
                                                            <p className="text-xs font-medium text-gray-500 mb-1">Analysis:</p>
                                                            <p className="text-xs text-gray-600 italic max-w-sm">{pointData.analysis}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResumeAnalysisDisplay;