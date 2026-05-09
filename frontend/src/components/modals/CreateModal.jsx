import { useState, useEffect } from 'react';
import { X, Terminal } from 'lucide-react';

const CreateModal = ({ isOpen, onClose, onSubmit, isPending, title, description, inputLabel, inputPlaceholder, submitText = 'Create', loadingText = 'Creating...', cancelText = 'Cancel', icon: Icon, projectName, setProjectName }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      onSubmit(projectName.trim());
      setProjectName('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 overflow-hidden animate-float-in">
        {/* Decorative background element */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl opacity-50" />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 flex-shrink-0">{Icon && <Icon className="w-6 h-6 text-blue-600" />}</div>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{title}</h3>
              </div>
              {description && <p className="text-sm font-medium text-slate-500 italic ml-1">{description}</p>}
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{inputLabel}</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Terminal className="w-4 h-4" />
                </div>
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder={inputPlaceholder} className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-slate-800 placeholder:font-medium placeholder:text-slate-400" autoFocus required />
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button type="button" onClick={onClose} className="flex-1 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200">
                {cancelText}
              </button>
              <button type="submit" disabled={isPending || !projectName.trim()} className="flex-[2] px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100">
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    {loadingText}
                  </div>
                ) : (
                  submitText
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
