import { Clock, Lightbulb, Users, Play, ExternalLink } from "lucide-react";

const VideoSuggestion = ({suggestedVideo}) => {

    // --- Helper to convert any YouTube URL to an Embed URL ---
    const getEmbedUrl = (url) => {
        if (!url) return "";
        try {
            const cleanUrl = url.trim();
            // Regex handles: youtube.com/watch?v=ID, m.youtube.com, youtu.be/ID, etc.
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = cleanUrl.match(regExp);
            
            // If a valid video ID (11 chars) is found, return the embed URL
            if (match && match[2].length === 11) {
                return `https://www.youtube.com/embed/${match[2]}`;
            }
            // Return original URL if transformation fails (fallback)
            return cleanUrl;
        } catch (error) {
            return url;
        }
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/80 animate-float-in hover:shadow-2xl transition-all duration-300 group" style={{animationDelay: '600ms'}}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-gray-800">AI Recommended Content</h3>
                    <p className="text-sm text-gray-600 mt-1">Boost your skills with this tutorial</p>
                </div>
            </div>

            {/* Video Content */}
            <div className="space-y-4">
                {/* Video Thumbnail/Player */}
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl mb-4 overflow-hidden shadow-lg relative group/video">
                    <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-all duration-300"></div>
                    <iframe
                        className="w-full h-full rounded-xl relative z-10"
                        src={getEmbedUrl(suggestedVideo.link)}
                        title="Recommended Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                    </div>
                </div>

                {/* Video Info */}
                <div className="space-y-3">
                    <h4 className="text-lg font-black text-gray-800 leading-tight">
                        {suggestedVideo.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {suggestedVideo.description}
                    </p>
                    
                    {/* Video Stats & External Link */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-200/60">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">{Math.round(suggestedVideo.time/60)}min</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Users className="w-4 h-4" />
                                <span className="font-medium">{suggestedVideo.views?.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* New Watch on YouTube Button */}
                        <a 
                            href={suggestedVideo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm font-bold text-purple-600 hover:text-purple-700 hover:underline transition-all"
                        >
                            Watch on YouTube
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoSuggestion;