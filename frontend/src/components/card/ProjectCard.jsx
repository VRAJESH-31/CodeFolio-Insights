import { useState } from 'react';
import { Copy, Eye, EyeOff, Trash2, CheckCircle2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/export.js';
import { useUpdateApiKey } from '../../hooks/useUsers.js';

const ProjectCard = ({ project, onDeleteRequest, onEditRequest }) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { mutate: updateApiKey, isPending: isUpdatingDefault } =
    useUpdateApiKey();

  const isDefault = project.apiKey === user?.apiKey;

  const handleCopy = () => {
    navigator.clipboard.writeText(project.apiKey);
    toast.success('API Key Copied!');
  };

  const handleSetDefault = () => {
    updateApiKey({ apiKey: project.apiKey });
  };

  const formattedDate = new Date(project.createdAt).toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group relative overflow-hidden">
      {/* Background Accent */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-3xl transition-colors duration-500 ${isDefault ? 'bg-green-500/10' : 'bg-blue-500/5 group-hover:bg-blue-500/10'}`}
      />

      <div className="relative space-y-5">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-800 truncate max-w-[180px]">
                {project.name}
              </h3>
              {isDefault && (
                <span className="flex items-center gap-1 bg-green-50 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-green-100">
                  <CheckCircle2 className="w-3 h-3" />
                  Default
                </span>
              )}
            </div>
            {/* <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            Public Project
                        </p> */}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onEditRequest}
              className="p-2 text-slate-300 rounded-xl transition-all"
              title="Edit Project"
            >
              <Edit2 className="w-6 h-6 text-amber-500" />
            </button>
            {!isDefault && (
              <button
                onClick={onDeleteRequest}
                className="p-2 text-slate-300 rounded-xl transition-all"
                title="Delete Project"
              >
                <Trash2 className="w-6 h-6 text-red-500" />
              </button>
            )}
          </div>
        </div>

        {/* API Key Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            API Key
          </label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl transition-all group-hover:border-slate-200">
            <code className="text-xs font-mono text-slate-600 flex-1 truncate font-medium">
              {showApiKey ? project.apiKey : '••••••••••••••••••••••••'}
            </code>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                title={showApiKey ? 'Hide Key' : 'Show Key'}
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handleCopy}
                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                title="Copy Key"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() =>
                toast.success('Dashboard Coming Soon! ✨', { icon: '🚀' })
              }
              className="flex justify-center items-center px-4 py-2.5 bg-blue-50 text-blue-600 font-black rounded-xl text-[10px] uppercase tracking-widest border border-blue-100 hover:bg-blue-100 transition-all"
            >
              Dashboard
            </button>
            <button
              onClick={handleSetDefault}
              disabled={isDefault || isUpdatingDefault}
              className={`flex justify-center items-center px-4 py-2.5 font-black rounded-xl text-[10px] uppercase tracking-widest transition-all border ${
                isDefault
                  ? 'bg-green-50 text-green-600 border-green-100 cursor-default'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600 shadow-sm'
              }`}
            >
              {isUpdatingDefault
                ? 'Updating...'
                : isDefault
                  ? 'Default Key'
                  : 'Set As Default'}
            </button>
          </div>

          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-tight">
              Daily Limit:{' '}
              <span className="text-slate-600">
                {project.apiPointsDailyLimit}
              </span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-tight">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
