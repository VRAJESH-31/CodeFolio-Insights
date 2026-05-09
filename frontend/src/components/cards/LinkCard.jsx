import { useState, useEffect } from 'react';
import { Globe, Users, Link as LinkIcon, Check, Copy, ExternalLink, Edit3, X, Save, Loader2 } from 'lucide-react';

const LinkCard = ({ platform, index, onSave, isUpdating, isAnyUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localUsername, setLocalUsername] = useState(platform?.username || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLocalUsername(platform?.username || '');
  }, [platform?.username]);

  const handleSave = () => {
    onSave(platform.value, localUsername);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalUsername(platform?.username || '');
    setIsEditing(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Icon = platform.icon || Globe;
  const isImageIcon = typeof Icon === 'string';
  const isConnected = !!platform?.username;
  const displayUrl = isConnected ? platform.profileUrl : 'Not Connected';

  return (
    <div className={`group bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100 transition-all duration-500 transform relative overflow-hidden ${!isUpdating && isAnyUpdating ? 'opacity-70 grayscale-[0.5] pointer-events-none' : 'hover:shadow-2xl hover:-translate-y-2'}`} style={{ animationDelay: `${(index % 6) * 0.1}s` }}>
      {/* Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center animate-pulse">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
          </div>
          <p className="mt-3 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] animate-pulse">Updating ...</p>
        </div>
      )}

      <div className={`transition-all duration-300 ${isUpdating ? 'blur-[1px] opacity-50 grayscale' : ''}`}>
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            {isImageIcon ? <img src={Icon} alt={platform.label} className="h-10 w-10 object-contain" /> : <Icon className="h-10 w-10 text-white" />}
            <span className="font-black text-gray-800 text-lg">{platform.label}</span>
          </div>
        </div>

        <div className="mb-4 relative z-10">
          <p className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest flex items-center gap-1">
            <Users className="h-3 w-3" /> Username
          </p>
          {isEditing ? <input type="text" value={localUsername} onChange={(e) => setLocalUsername(e.target.value)} placeholder={`Enter ${platform.label} username`} className="w-full text-sm font-bold text-gray-700 bg-white border-2 border-blue-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition-colors" autoFocus disabled={isAnyUpdating} /> : <p className={`font-bold truncate p-2.5 rounded-xl border border-gray-100 ${isConnected ? 'text-gray-700 bg-gray-50/50' : 'text-gray-400 bg-gray-50 italic'}`}>{platform?.username || 'Not Connected'}</p>}
        </div>

        <div className="mb-8 relative z-10">
          <p className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest flex items-center gap-1">
            <LinkIcon className="h-3 w-3" /> URL
          </p>
          <div className="flex items-center gap-2 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
            <p className={`text-sm truncate flex-1 font-bold ${isConnected ? 'text-blue-600' : 'text-gray-400'}`}>{displayUrl}</p>
            {isConnected && (
              <button onClick={() => copyToClipboard(displayUrl)} className="p-1.5 text-gray-400 hover:text-blue-500 transition-all" disabled={isAnyUpdating}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2 relative z-10">
          {isEditing ? (
            <>
              <button onClick={handleSave} disabled={isAnyUpdating} className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-600 shadow-lg hover:shadow-green-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <Save className="h-4 w-4" /> Save
              </button>
              <button onClick={handleCancel} disabled={isAnyUpdating} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-3.5 px-4 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              {isConnected ? (
                <a href={platform.profileUrl} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg hover:shadow-blue-200 transition-all ${isAnyUpdating ? 'pointer-events-none opacity-50' : ''}`}>
                  <ExternalLink className="h-4 w-4" /> Visit
                </a>
              ) : (
                <div className="flex-1 bg-gray-100 text-gray-400 py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-center cursor-not-allowed">Not Connected</div>
              )}
              <button onClick={() => setIsEditing(true)} disabled={isAnyUpdating} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-3.5 px-4 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <Edit3 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
