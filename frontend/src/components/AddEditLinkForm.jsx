import { Zap, Globe, Users, Check, X } from 'lucide-react';

const AddEditLinkForm = ({ isAdding, editingId, formData, setFormData, platforms, handleSave, handleCancel }) => {
    return (
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 mb-8 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-black text-gray-800">
                    {editingId ? 'Edit Platform' : 'Add New Platform'}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-500" /> Platform
                    </label>
                    <select
                        value={formData.platform}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white/80 hover:border-gray-300"
                    >
                        <option value="">Choose a platform...</option>
                        {platforms.map(platform => (
                            <option key={platform.value} value={platform.value}>{platform.label}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-500" /> Username/URL
                    </label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder={platforms.find(p => p.value === formData.platform)?.placeholder || 'Enter username or URL'}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white/80 hover:border-gray-300"
                    />
                </div>
            </div>

            <div className="flex gap-4 mt-8 justify-center">
                <button
                    onClick={handleSave}
                    disabled={!formData.platform || !formData.username}
                    className="group flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50"
                >
                    <Check className="h-5 w-5 transition-transform group-hover:scale-110" />
                    {editingId ? 'Update Platform' : 'Add Platform'}
                </button>
                <button onClick={handleCancel} className="group flex items-center gap-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <X className="h-5 w-5 transition-transform group-hover:scale-110" /> Cancel
                </button>
            </div>
        </div>
    );
};

export default AddEditLinkForm;
