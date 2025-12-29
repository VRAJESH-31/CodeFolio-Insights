import { Clock, Lightbulb, Users, Play, ExternalLink } from "lucide-react";

const VideoSuggestionCard = ({ suggestedVideo }) => {

    const getEmbedUrl = (url) => {
        if (!url) return "";
        try {
            const cleanUrl = url.trim();
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = cleanUrl.match(regExp);
            if (match && match[2].length === 11) return `https://www.youtube.com/embed/${match[2]}`;
            console.log(cleanUrl);
            return cleanUrl;
        } catch (error) {
            return url;
        }
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-gray-800">AI Recommendation</h3>
                    <p className="text-sm text-gray-500">Boost your skills with this tutorial</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg relative group/video">
                    <iframe
                        className="w-full h-full relative z-10"
                        src={getEmbedUrl(suggestedVideo.link.url)}
                        title="Recommended Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity pointer-events-none z-0">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-lg font-black text-gray-800 leading-tight">{suggestedVideo.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{suggestedVideo.description}</p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span>{Math.round(suggestedVideo.time / 60)}min</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                <Users className="w-4 h-4" />
                                <span>{suggestedVideo.views?.toLocaleString()}</span>
                            </div>
                        </div>

                        <a
                            href={suggestedVideo.link.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-black text-purple-600 hover:text-purple-700 uppercase tracking-widest transition-all"
                        >
                            Watch <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoSuggestionCard;