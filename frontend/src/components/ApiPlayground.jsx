import React, { useState, useEffect } from 'react';
import { Play, Copy, RefreshCcw, Loader2, Info, Shield } from "lucide-react";
import toast from 'react-hot-toast';
import { usePublicApiPlayground } from "../hooks/usePublicApi.js";
import { useAuthStore } from "../store/export.js";
import { LoaderSpinner } from "./loaders/export.js";

const ApiPlayground = ({ currentEndpoint }) => {
    const { user } = useAuthStore();
    const [sampleApiRequest, setSampleApiRequest] = useState("");
    const [sampleApiResponse, setSampleApiResponse] = useState("");
    const [paramValues, setParamValues] = useState({});

    const { mutate: runPlayground, isPending: isRunning } = usePublicApiPlayground();

    useEffect(() => {
        const sampleRequest = currentEndpoint?.example?.request;
        const sampleResponse = currentEndpoint?.example?.response;
        setSampleApiResponse(sampleResponse ? JSON.stringify(sampleResponse, null, 2) : "");
        setSampleApiRequest(sampleRequest || "");

        const initialParams = {};
        if (currentEndpoint?.parameters) {
            currentEndpoint.parameters.forEach(param => {
                initialParams[param.name] = "";
            });
        }
        setParamValues(initialParams);
    }, [currentEndpoint]);

    const handleParamChange = (name, value) => {
        setParamValues(prev => ({
            ...prev,
            [name]: value,
        }));

        try {
            const url = new URL(sampleApiRequest);
            const params = new URLSearchParams(url.search);
            params.set(name, value);
            url.search = params.toString();
            setSampleApiRequest(decodeURIComponent(url.toString()));
        } catch {
            // Silently handle invalid URL during typing
        }
    };

    const handleSetDefault = (param, value) => {
        handleParamChange(param.name, value || param.example);
    };

    const runSampleAPI = () => {
        runPlayground(sampleApiRequest, {
            onSuccess: (data) => {
                setSampleApiResponse(JSON.stringify(data, null, 2));
            },
            onError: (error) => {
                const errorData = error?.response?.data;
                setSampleApiResponse(JSON.stringify(errorData || { message: error.message }, null, 2));
            }
        });
    };

    const refreshSampleApiRequest = () => {
        setSampleApiRequest(currentEndpoint.example.request);
        const initialParams = {};
        if (currentEndpoint.parameters) {
            currentEndpoint.parameters.forEach(param => {
                initialParams[param.name] = "";
            });
        }
        setParamValues(initialParams);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(sampleApiRequest);
        toast.success("API Endpoint copied!");
    };

    const handleCopyResponse = () => {
        if (!sampleApiResponse) return;
        navigator.clipboard.writeText(sampleApiResponse);
        toast.success("Response copied to clipboard!");
    };

    if (!currentEndpoint) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-black text-slate-800">API Playground</h3>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6">
                {/* Request Input Area */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-100">
                    <input
                        type="text"
                        value={sampleApiRequest}
                        onChange={(e) => setSampleApiRequest(e.target.value)}
                        className="flex-1 bg-transparent border-none text-blue-600 font-mono text-sm px-4 focus:ring-0"
                    />
                    <div className="flex items-center gap-1.5 pr-2">
                        <button
                            onClick={handleCopy}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Copy URL"
                        >
                            <Copy size={16} />
                        </button>
                        <button
                            onClick={refreshSampleApiRequest}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Reset"
                        >
                            <RefreshCcw size={16} />
                        </button>
                        <button
                            onClick={runSampleAPI}
                            disabled={isRunning}
                            className="ml-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
                        >
                            {isRunning ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Running
                                </>
                            ) : (
                                <>
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                    Send Request
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Parameter Controls */}
                {currentEndpoint.parameters && currentEndpoint.parameters.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                        {currentEndpoint.parameters.map((param, idx) => (
                            <div key={idx} className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 flex items-center justify-between">
                                    {param.name}
                                    {param.status === 'required' && <span className="text-red-500 font-black">*</span>}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={paramValues[param.name] || ""}
                                        onChange={(e) => handleParamChange(param.name, e.target.value)}
                                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                        placeholder={param.example}
                                    />
                                    {param.name === "apiKey" && user ? (
                                        <button
                                            onClick={() => handleSetDefault(param, user.apiKey)}
                                            className="px-4 py-2 bg-green-50 text-green-600 border border-green-100 rounded-xl font-bold text-xs hover:bg-green-100 transition-all flex items-center gap-2"
                                        >
                                            <Shield className="w-3.5 h-3.5" />
                                            Use Mine
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleSetDefault(param)}
                                            className="px-4 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-200 transition-all"
                                        >
                                            Default
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Info Note for API Key */}
                {!user && currentEndpoint.parameters?.some(p => p.name === "apiKey") && (
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 shadow-sm">
                        <Info className="w-5 h-5 text-blue-500 shrink-0" />
                        <p className="text-xs text-blue-700/80 font-medium">
                            <span className="text-blue-600 font-black">PRO TIP:</span> Log in to automatically attach your personal API Keys here.
                        </p>
                    </div>
                )}

                {/* Response Display */}
                <div className="space-y-2 pt-4">
                    <div className="flex items-center justify-between px-1">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Response</h4>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-500' : 'bg-green-500 animate-pulse'}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-wide ${isRunning ? 'text-amber-600' : 'text-green-600'}`}>
                                {isRunning ? "Processing" : "Ready"}
                            </span>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 font-mono text-sm overflow-hidden group relative shadow-inner shadow-slate-50 min-h-[300px] flex items-center justify-center">
                        {/* Loading Overlay */}
                        {isRunning && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[2px] transition-all duration-300">
                                <LoaderSpinner text="Fetching API Data" className="w-12 h-12" />
                            </div>
                        )}

                        <div className="absolute top-0 right-5 p-3 transition-opacity flex items-center gap-2 z-10">
                            <button
                                onClick={handleCopyResponse}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                title="Copy Response"
                                disabled={isRunning}
                            >
                                <Copy size={20} />
                            </button>
                        </div>
                        <pre className={`text-blue-700 custom-scrollbar h-[300px] w-full overflow-auto whitespace-pre-wrap break-all leading-relaxed transition-all duration-300 ${isRunning ? 'blur-sm opacity-50' : 'blur-0 opacity-100'}`}>
                            {sampleApiResponse}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiPlayground;
