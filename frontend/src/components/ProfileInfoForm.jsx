import { User, Mail, Briefcase, MapPin, Globe, FileText, Sparkles, Save, EyeOff, Edit3 } from 'lucide-react';

const ProfileInfoForm = ({ user, handleChange, isEditing, setIsEditing, handleSubmit, isLoading }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                    <User className="w-6 h-6 text-blue-600" />
                    Personal Information
                </h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    {isEditing ? <><EyeOff className="w-4 h-4" /> Cancel</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <User className="w-4 h-4 text-blue-500" /> Full Name
                        </label>
                        <input
                            type="text" name="name" value={user.name || ''} onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Mail className="w-4 h-4 text-blue-500" /> Email Address
                        </label>
                        <input
                            type="email" name="email" value={user.email || ''} disabled
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Briefcase className="w-4 h-4 text-blue-500" /> Job Title
                        </label>
                        <input
                            type="text" name="jobTitle" value={user.jobTitle || ''} onChange={handleChange} disabled={!isEditing}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <MapPin className="w-4 h-4 text-blue-500" /> Location
                        </label>
                        <input
                            type="text" name="location" value={user.location || ''} onChange={handleChange} disabled={!isEditing}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Globe className="w-4 h-4 text-blue-500" /> Website
                        </label>
                        <input
                            type="url" name="website" value={user.website || ''} onChange={handleChange} disabled={!isEditing}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <FileText className="w-4 h-4 text-blue-500" /> Phone
                        </label>
                        <input
                            type="tel" name="phone" value={user.phone || ''} onChange={handleChange} disabled={!isEditing}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Sparkles className="w-4 h-4 text-blue-500" /> Bio
                    </label>
                    <textarea
                        name="bio" value={user.bio || ''} onChange={handleChange} disabled={!isEditing} rows="3"
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 resize-none"
                    />
                </div>

                {isEditing && (
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit" disabled={isLoading}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
                        >
                            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileInfoForm;
