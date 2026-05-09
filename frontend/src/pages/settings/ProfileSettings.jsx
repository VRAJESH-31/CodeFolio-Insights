import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { User, Mail, Briefcase, MapPin, Globe, FileText, Sparkles, Save, EyeOff, Edit3, Linkedin, Twitter, Phone, Quote, Camera } from 'lucide-react';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { useUpdateUser } from '@/hooks/useUsers.js';
import { useAuthStore } from '@/store/export.js';
import toast from 'react-hot-toast';
import { URL } from '@/constants/url.js';

const ProfileSettings = () => {
  const { user, setUser } = useOutletContext();
  const setAuthUser = useAuthStore((state) => state.setUser);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImageViewUrl, setProfileImageViewUrl] = useState(user?.profile || URL.USER_AVATAR_PLACEHOLDER);

  const fileInputRef = useRef(null);

  const { mutate: updateUserMutation, isPending: isLoading } = useUpdateUser();

  // Update profile image view when user changes (e.g. after successful update)
  useEffect(() => {
    if (user?.profile) {
      setProfileImageViewUrl(user.profile);
    }
  }, [user?.profile]);

  const toggleEdit = () => {
    if (isEditing) {
      // Revert changes if cancelling
      setProfileImageViewUrl(user?.profile || URL.USER_AVATAR_PLACEHOLDER);
      setSelectedFile(null);
    }
    setIsEditing(!isEditing);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setProfileImageViewUrl(previewUrl);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cross-field validation for phone and countryCode
    if ((user.phone && !user.countryCode) || (!user.phone && user.countryCode)) {
      toast.error('Both Country Code and Phone Number are required if one is provided!');
      return;
    }

    const formData = new FormData();

    // Append profile image if a new one was selected
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }

    const fields = ['name', 'jobTitle', 'headline', 'bio', 'location', 'countryCode', 'phone', 'linkedinUsername', 'twitterUsername', 'portfolioWebsiteLink', 'resumeLink'];

    fields.forEach((field) => {
      let value = user[field] || '';
      if ((field === 'countryCode' || field === 'phone') && value === '') return;
      if (field === 'countryCode' && value.startsWith('+')) value = value.substring(1);
      formData.append(field, value);
    });

    updateUserMutation(formData, {
      onSuccess: (data) => {
        setUser(data);
        setAuthUser(data);
        setIsEditing(false);
        setSelectedFile(null);
      },
    });
  };

  const displayImage = profileImageViewUrl || user?.profile || URL.USER_AVATAR_PLACEHOLDER;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
          <User className="w-6 h-6 text-blue-600" />
          Personal Information
        </h2>
        <button onClick={toggleEdit} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          {isEditing ? (
            <>
              <EyeOff className="w-4 h-4" /> Cancel
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" /> Edit Profile
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Section */}
        <div className="flex items-center gap-6 mb-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img src={displayImage} alt="Profile" className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
            {isEditing && (
              <>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full border-2 border-white hover:bg-blue-700 transition-all shadow-md transform hover:scale-110">
                  <Camera className="w-4 h-4 text-white" />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Profile Photo</h3>
            <p className="text-sm text-gray-500 max-w-xs">{isEditing ? 'Click the camera icon to upload a new photo. standard format (JPG, PNG) recommended.' : 'Your current profile photo.'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="w-4 h-4 text-blue-500" /> Full Name
            </label>
            <input type="text" name="name" value={user.name || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Mail className="w-4 h-4 text-blue-500" /> Email Address
            </label>
            <input type="email" name="email" value={user.email || ''} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Briefcase className="w-4 h-4 text-blue-500" /> Job Title
            </label>
            <input type="text" name="jobTitle" value={user.jobTitle || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Quote className="w-4 h-4 text-blue-500" /> Headline
            </label>
            <input type="text" name="headline" value={user.headline || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" placeholder="A short punchy headline" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Phone className="w-4 h-4 text-blue-500" /> Country Code
            </label>
            {isEditing ? (
              <select name="countryCode" value={user.countryCode || ''} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                <option value="">Select Code</option>
                {getCountries()
                  .map((country) => {
                    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                    return {
                      code: country,
                      name: regionNames.of(country),
                      callingCode: getCountryCallingCode(country),
                    };
                  })
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(({ code, name, callingCode }) => (
                    <option key={code} value={`+${callingCode}`}>
                      {name} (+{callingCode})
                    </option>
                  ))}
              </select>
            ) : (
              <input type="text" value={user.countryCode ? (user.countryCode.startsWith('+') ? user.countryCode : `+${user.countryCode}`) : ''} disabled className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" />
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Phone className="w-4 h-4 text-blue-500" /> Phone
            </label>
            <input type="tel" name="phone" value={user.phone || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" placeholder="10 digit phone number" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MapPin className="w-4 h-4 text-blue-500" /> Location
            </label>
            <input type="text" name="location" value={user.location || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Linkedin className="w-4 h-4 text-blue-500" /> LinkedIn Username
            </label>
            <input type="text" name="linkedinUsername" value={user.linkedinUsername || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" placeholder="username" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Twitter className="w-4 h-4 text-blue-500" /> Twitter Username
            </label>
            <input type="text" name="twitterUsername" value={user.twitterUsername || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" placeholder="username" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Globe className="w-4 h-4 text-blue-500" /> Portfolio Link
            </label>
            <input type="url" name="portfolioWebsiteLink" value={user.portfolioWebsiteLink || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" placeholder="https://yourportfolio.com" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-blue-500" /> Resume Link
            </label>
            <input type="url" name="resumeLink" value={user.resumeLink || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" placeholder="Link to your resume" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Sparkles className="w-4 h-4 text-blue-500" /> Bio
          </label>
          <textarea name="bio" value={user.bio || ''} onChange={handleChange} disabled={!isEditing} rows="3" className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 resize-none" />
        </div>

        {isEditing && (
          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50">
              {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileSettings;
