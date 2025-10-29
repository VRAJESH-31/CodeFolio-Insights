import { Clock, Lightbulb, Users } from "lucide-react";

const VideoSuggestion = ({suggestedVideo}) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '600ms'}}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                    <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-800">AI Recommended Content</h3>
            </div>
            <div className="space-y-4">
                <div className="aspect-video bg-gray-900 rounded-2xl mb-4 overflow-hidden shadow-lg">
                    <iframe
                        className="w-full h-full rounded-2xl"
                        src={suggestedVideo.link}
                        title="Dynamic Programming Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <h4 className="text-xl font-black text-gray-800">{suggestedVideo.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                    {suggestedVideo.description}
                </p>
                <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{Math.round(suggestedVideo.time/60)}min watch</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{suggestedVideo.views} views</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoSuggestion;