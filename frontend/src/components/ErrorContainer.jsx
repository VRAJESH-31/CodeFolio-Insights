import { AlertTriangle, Server, UserX, WifiOff, RefreshCw } from "lucide-react";
import conf from "../config/config";
import {v4 as uuid} from "uuid"

const ErrorContainer = ({ error, onRetry, isLoading, errorAdditionalHelp }) => {

    const getErrorDetails = () => {
        return {
            icon: <AlertTriangle className="w-16 h-16" />,
            title: "Analysis Failed",
            message: "We encountered an error while analyzing your profile",
            subMessage: "This might be due to LeetCode API limitations or server issues."
        };
    };

    const errorDetails = getErrorDetails();

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 max-w-md w-full text-center animate-float-in">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl border border-red-200">
                        <div className="text-red-500">
                            {errorDetails.icon}
                        </div>
                    </div>
                </div>

                {/* Error Title */}
                <h3 className="text-2xl font-black text-gray-800 mb-3">
                    {errorDetails.title}
                </h3>

                {/* Error Message */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                    {errorDetails.message}
                </p>

                {/* Sub Message */}
                <p className="text-sm text-gray-500 mb-8">
                    {errorDetails.subMessage}
                </p>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <button
                        onClick={onRetry}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                <span>Retrying...</span>
                            </>
                        ) : (
                            <>
                                <RefreshCw className="w-5 h-5" />
                                <span>Try Again</span>
                            </>
                        )}
                    </button>

                    {/* Additional Help */}
                    <div className="text-xs text-gray-400 space-y-1">
                        {errorAdditionalHelp.map((point)=>(
                            <p key={uuid()}>{point}</p>
                        ))}
                    </div>
                </div>

                {/* Debug Info (only in development) */}
                {conf.ENV === 'development' && error && (
                    <details className="mt-6 text-left">
                        <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                            Debug Information
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded-lg text-xs text-gray-600 overflow-auto max-h-32">
                            {JSON.stringify(error, null, 2)}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
};

export default ErrorContainer;