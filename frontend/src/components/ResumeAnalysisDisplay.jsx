import { UploadCloud, FileText, TrendingUp, Target, Shield, CheckCircle, Sparkles, AlertCircle, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import {v4 as uuid} from 'uuid';
import { useState } from 'react';

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
    
    const getScoreColorClasses = (score) => {
        if (score >= 80) return 'from-green-500 to-emerald-600 shadow-green-200';
        if (score >= 60) return 'from-blue-500 to-cyan-600 shadow-blue-200';
        if (score >= 40) return 'from-amber-500 to-orange-500 shadow-amber-200';
        return 'from-red-500 to-rose-600 shadow-red-200';
    }

    const getSectionGradient = (score) => {
        if (score >= 80) return 'bg-gradient-to-br from-green-50/80 to-emerald-100/60 border-green-200';
        if (score >= 60) return 'bg-gradient-to-br from-blue-50/80 to-cyan-100/60 border-blue-200';
        if (score >= 40) return 'bg-gradient-to-br from-amber-50/80 to-orange-100/60 border-amber-200';
        return 'bg-gradient-to-br from-rose-50/80 to-red-100/60 border-rose-200';
    }

    const [pointAnalysisVisibility, setPointAnalysisVisibility] = useState({});

    const togglePointAnalysis = (sectionKey) => {
        setPointAnalysisVisibility(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section with Glass Morphism */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-lg">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">
                                AI Resume Analysis
                            </h1>
                            <p className="text-gray-600 font-medium mt-1">Comprehensive Resume Assessment Report</p>
                        </div>
                    </div>
                    <button
                        onClick={onUploadAgain}
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-800 group"
                    >
                        <UploadCloud className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Upload New Resume
                    </button>
                </div>

                {/* Main Score & Meme Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Score Meter Card */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 p-8 hover:shadow-2xl transition-all duration-500">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-black text-gray-800 mb-2">Overall Resume Score</h2>
                            <p className="text-gray-600">Based on comprehensive AI analysis</p>
                        </div>
                        <ScoreMeter score={overallScore} />
                    </div>
                    
                    {/* Meme Container Card */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 p-6 hover:shadow-2xl transition-all duration-500">
                        <MemeContainer score={overallScore} />
                    </div>
                </div>

                {/* Analysis Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnalysisCard 
                        title="Strengths" 
                        points={resumeAnalysis?.strengths} 
                        Icon={TrendingUp} 
                        PointIcon={CheckCircle} 
                        className='bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/80 border-blue-200/60 backdrop-blur-sm'
                        iconBg="bg-blue-100/80"
                        iconColor="text-blue-600"
                        pointIconColor="text-green-500"
                        pointColor="text-blue-800"
                    />

                    <AnalysisCard 
                        title="Weaknesses" 
                        points={resumeAnalysis?.weaknesses} 
                        Icon={TrendingDown} 
                        PointIcon={AlertCircle} 
                        className='bg-gradient-to-br from-amber-50/80 via-white to-orange-50/80 border-amber-200/60 backdrop-blur-sm'
                        iconBg="bg-amber-100/80"
                        iconColor="text-amber-600"
                        pointIconColor="text-amber-500"
                        pointColor="text-amber-800"
                    />
                    
                    <AnalysisCard 
                        title="Improvement Areas" 
                        points={resumeAnalysis?.improvements} 
                        Icon={Target} 
                        PointIcon={CheckCircle} 
                        className='bg-gradient-to-br from-green-50/80 via-white to-cyan-50/80 border-green-200/60 backdrop-blur-sm md:col-span-2'
                        iconBg="bg-green-100/80"
                        iconColor="text-green-600"
                        pointIconColor="text-green-500"
                        pointColor="text-green-800"
                    />
                </div>

                {/* Resume Structure Deep Dive */}
                <div className="pt-4 space-y-6">    
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">
                            Resume Structure Deep Dive
                        </h2>
                        <p className="text-gray-600 mt-2">Detailed analysis of each resume component</p>
                    </div>
                    {Object.keys(resumeAnalysis.scoreAnalysis).map((sectionKey) => {
                        const section = resumeAnalysis.scoreAnalysis[sectionKey];
                        
                        if (sectionKey === 'section' || sectionKey === 'jobDescription') return null;

                        return (
                            <div key={sectionKey} className={`${getSectionGradient(section.score)} backdrop-blur-sm p-6 rounded-3xl shadow-xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold capitalize text-gray-800">
                                        {sectionKey.replace(/([A-Z])/g, ' $1').trim()}
                                    </h3>
                                    <div className={`px-4 py-2 rounded-2xl text-sm font-bold text-white bg-gradient-to-r ${getScoreColorClasses(section.score)} shadow-lg`}>
                                        {section.score}%
                                    </div>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    {section.analysis.map((line, lineIndex) => (
                                        <li key={lineIndex} className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="leading-relaxed">{line}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Section-wise Deep Dive with Enhanced Point Analysis */}
                <div className="pt-4 space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">
                            Section-wise Deep Dive
                        </h2>
                        <p className="text-gray-600 mt-2">Detailed bullet point analysis and recommendations</p>
                    </div>
                    {Object.keys(resumeAnalysis.scoreAnalysis.section).map((sectionKey) => {
                        const section = resumeAnalysis.scoreAnalysis.section[sectionKey];
                        const isPointAnalysisVisible = pointAnalysisVisibility[sectionKey];

                        return (
                            <div key={sectionKey} className={`${getSectionGradient(section.score)} backdrop-blur-sm p-6 rounded-3xl shadow-xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold capitalize text-gray-800">
                                        {sectionKey.replace(/([A-Z])/g, ' $1').trim()}
                                    </h3>
                                    <div className={`px-4 py-2 rounded-2xl text-sm font-bold text-white bg-gradient-to-r ${getScoreColorClasses(section.score)} shadow-lg`}>
                                        {section.score}%
                                    </div>
                                </div>
                                <ul className="space-y-3 text-gray-700 mb-4">
                                    {section.analysis.map((line, lineIndex) => (
                                        <li key={lineIndex} className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="leading-relaxed">{line}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Enhanced Point Analysis Section */}
                                {section.pointAnalysis && (
                                    <div className="mt-6 pt-6 border-t border-white/50 space-y-4">
                                        <button 
                                            onClick={() => togglePointAnalysis(sectionKey)}
                                            className="w-full flex justify-between items-center p-4 bg-white/60 rounded-2xl backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <FileText className="h-5 w-5 text-purple-600" />
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                                                        Bullet Point Review
                                                    </h4>
                                                    <p className="text-sm text-gray-600">Click to {isPointAnalysisVisible ? 'collapse' : 'expand'} detailed analysis</p>
                                                </div>
                                            </div>
                                            <div className="p-2 bg-white rounded-full shadow-lg">
                                                {isPointAnalysisVisible ? 
                                                    <ChevronUp className="h-5 w-5 text-purple-600" /> : 
                                                    <ChevronDown className="h-5 w-5 text-purple-600" />
                                                }
                                            </div>
                                        </button>

                                        {isPointAnalysisVisible && (
                                            <div className="space-y-4 animate-fadeIn">
                                                {section.pointAnalysis.map((pointData) => (
                                                    <div key={uuid()} className="p-5 bg-white/80 rounded-2xl backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
                                                        <div className='flex justify-between items-center mb-3'>
                                                            <p className="text-sm font-semibold text-gray-700">Original Bullet Point:</p>
                                                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${pointData.score >= 8 ? 'bg-green-100 text-green-800 border border-green-200' : pointData.score >= 6 ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-rose-100 text-rose-800 border border-rose-200'}`}>
                                                                Score: {pointData.score}/10
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-800 italic mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-300">
                                                            {pointData.point.original}
                                                        </p>
                                                        
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Target className="h-4 w-4 text-purple-600" />
                                                                    <p className="text-sm font-semibold text-purple-700">Recommended Refactor:</p>
                                                                </div>
                                                                <p className="text-gray-800 bg-gradient-to-r from-purple-50 to-white p-3 rounded-lg border-l-4 border-purple-400">
                                                                    {pointData.point.refactored}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Sparkles className="h-4 w-4 text-amber-600" />
                                                                    <p className="text-sm font-semibold text-amber-700">AI Analysis:</p>
                                                                </div>
                                                                <p className="text-gray-700 text-sm bg-gradient-to-r from-amber-50 to-white p-3 rounded-lg border-l-4 border-amber-400">
                                                                    {pointData.analysis}
                                                                </p>
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

                {/* Footer CTA */}
                <div className="text-center py-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 shadow-2xl">
                        <h3 className="text-2xl font-black text-white mb-3">
                            Ready to Improve Your Resume?
                        </h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Upload a new resume or implement the suggestions above to boost your score and land more interviews.
                        </p>
                        <button
                            onClick={onUploadAgain}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                        >
                            <UploadCloud className="h-5 w-5" />
                            Upload Improved Resume
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalysisDisplay;