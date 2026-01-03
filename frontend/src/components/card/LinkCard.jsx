import { Globe, Users, Link as LinkIcon, Check, Copy, ExternalLink, Edit3, Trash2 } from 'lucide-react';

const LinkCard = ({ link, index, platforms, copyToClipboard, copiedId, handleEdit, handleDelete }) => {
    const platformConfig = platforms.find(p => p.value === link.platform);
    const IconComponent = platformConfig?.icon || Globe;

    return (
        <div
            className="group bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
            style={{ animationDelay: `${(index % 6) * 0.1}s` }}
        >
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${link.color} shadow-lg group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-black text-gray-800 text-lg">{link.label}</span>
                </div>
            </div>

            <div className="mb-4 relative z-10">
                <p className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest flex items-center gap-1">
                    <Users className="h-3 w-3" /> Username
                </p>
                <p className="font-bold text-gray-700 truncate bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">{link.username}</p>
            </div>

            <div className="mb-8 relative z-10">
                <p className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" /> URL
                </p>
                <div className="flex items-center gap-2 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                    <p className="text-sm text-blue-600 truncate flex-1 font-bold">{link.url}</p>
                    <button onClick={() => copyToClipboard(link.url, link.id)} className="p-1.5 text-gray-400 hover:text-blue-500 transition-all">
                        {copiedId === link.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <div className="flex gap-2 relative z-10">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg hover:shadow-blue-200 transition-all">
                    <ExternalLink className="h-4 w-4" /> Visit
                </a>
                <button onClick={() => handleEdit(link)} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-3.5 px-4 rounded-xl hover:bg-gray-200 transition-all">
                    <Edit3 className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(link.id)} className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3.5 px-4 rounded-xl hover:bg-red-100 transition-all">
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default LinkCard;
