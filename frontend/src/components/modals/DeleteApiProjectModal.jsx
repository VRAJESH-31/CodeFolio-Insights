import { X, AlertTriangle, Trash2 } from "lucide-react";

const DeleteApiProjectModal = ({ isOpen, onClose, onDelete, projectName, isPending }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 overflow-hidden animate-float-in">
                {/* Decorative background element */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/5 rounded-full blur-3xl opacity-50" />

                <div className="relative space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100 flex-shrink-0">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                                Delete Project?
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Are you sure you want to delete <span className="text-slate-900 font-bold">&quot;{projectName}&quot;</span>? This action cannot be undone and all associated API access will be revoked.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200"
                        >
                            Keep Project
                        </button>
                        <button
                            onClick={onDelete}
                            disabled={isPending}
                            className="flex-[1.5] px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Delete Forever
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteApiProjectModal;
