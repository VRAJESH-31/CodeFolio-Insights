import { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Save, Mail, Info, Edit2, X, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/store/export.js';
import { useChangePassword, useToggle2FA, useUpdateApiKey, useUpdateUser } from '@/hooks/useUsers.js';
import toast from 'react-hot-toast';

const AccountSettings = () => {
  const user = useAuthStore((state) => state.user);
  const { mutate: changePassword, isPending: isLoading } = useChangePassword();
  const { mutate: toggle2FA, isPending: isToggling2FA } = useToggle2FA();
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [apiKeyForm, setApiKeyForm] = useState({
    apiKey: user?.apiKey || '',
  });

  const [displayNameForm, setDisplayNameForm] = useState({
    displayName: user?.displayName || '',
  });

  const [isEditingApiKey, setIsEditingApiKey] = useState(false);
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);

  const { mutate: updateApiKey, isPending: isUpdatingApiKey } = useUpdateApiKey();

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleApiKeyChange = (e) => {
    setApiKeyForm({ [e.target.name]: e.target.value });
  };

  const handleDisplayNameChange = (e) => {
    setDisplayNameForm({ [e.target.name]: e.target.value });
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (!apiKeyForm.apiKey.trim()) {
      return toast.error('API Key cannot be empty!');
    }
    updateApiKey(
      { apiKey: apiKeyForm.apiKey.trim() },
      {
        onSuccess: () => {
          setIsEditingApiKey(false);
        },
      },
    );
  };

  const handleDisplayNameSubmit = (e) => {
    e.preventDefault();
    const newDisplayName = displayNameForm.displayName.trim();
    if (!newDisplayName || newDisplayName.length < 3) {
      return toast.error('Display name must be at least 3 characters long!');
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(newDisplayName)) {
      return toast.error('Display name can only contain letters, numbers, underscores and hyphens!');
    }
    updateUser(
      { displayName: newDisplayName },
      {
        onSuccess: () => {
          setIsEditingDisplayName(false);
        },
      },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      return toast.error('All fields are required!');
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error('New passwords do not match!');
    }

    if (form.newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters long!');
    }

    changePassword(
      {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      },
      {
        onSuccess: () => {
          setForm({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        },
      },
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8 space-y-8 animate-float-in">
      {/* Header section */}
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          Accounts
        </h2>
        <p className="text-slate-500 font-medium">You can manage your accounts here.</p>
      </div>

      {/* Account Information Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-lg font-bold text-slate-700">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 transition-all hover:shadow-md">
          <span className="text-sm font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            Email:
          </span>
          <span className="text-slate-700 font-semibold truncate">{user?.email}</span>
        </div>
      </div>

      {/* Display Name Management Section */}
      <form onSubmit={handleDisplayNameSubmit} className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-700">Display Name</h3>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Info className="w-3 h-3" />
            Unique URL identifier
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
            <label className="text-sm font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-blue-500" />
              Display Name:
            </label>

            {!isEditingDisplayName ? (
              <div className="flex items-center gap-4 p-3.5 bg-slate-50/50 rounded-xl border border-slate-200 group-hover:border-slate-300 transition-all">
                <span className="font-semibold text-slate-700 text-lg flex-1">{user?.displayName || 'Not set'}</span>
                <button
                  type="button"
                  onClick={() => {
                    setDisplayNameForm({
                      displayName: user?.displayName || '',
                    });
                    setIsEditingDisplayName(true);
                  }}
                  className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors text-xs uppercase"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Update
                </button>
              </div>
            ) : (
              <div className="flex gap-2 relative group">
                <input type="text" name="displayName" value={displayNameForm.displayName} onChange={handleDisplayNameChange} placeholder="Enter your unique display name" className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm group-hover:border-slate-300 font-medium" autoFocus />
                <div className="flex gap-2">
                  <button type="submit" disabled={isUpdatingUser || displayNameForm.displayName === user?.displayName} className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black px-6 py-3.5 rounded-xl shadow hover:shadow-indigo-200 transition-all disabled:opacity-50 uppercase tracking-widest text-xs min-w-[100px]">
                    {isUpdatingUser ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    {isUpdatingUser ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={() => setIsEditingDisplayName(false)} className="flex items-center justify-center bg-slate-100 text-slate-600 p-3.5 rounded-xl hover:bg-slate-200 transition-colors" title="Cancel">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* API Key Management Section */}
      <form onSubmit={handleApiKeySubmit} className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-700">API Key Management</h3>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Info className="w-3 h-3" />
            Required for analytics
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
            <label className="text-sm font-black text-slate-500 uppercase tracking-wider">Current API Key:</label>

            {!isEditingApiKey ? (
              <div className="flex items-center gap-4 p-3.5 bg-slate-50/50 rounded-xl border border-slate-200">
                <span className="font-mono text-slate-700 font-medium truncate flex-1">{user?.apiKey || ''}</span>
                <button
                  type="button"
                  onClick={() => {
                    setApiKeyForm({
                      apiKey: user?.apiKey || '',
                    });
                    setIsEditingApiKey(true);
                  }}
                  className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors text-xs uppercase"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Update
                </button>
              </div>
            ) : (
              <div className="flex gap-2 relative group">
                <input type="text" name="apiKey" value={apiKeyForm.apiKey} onChange={handleApiKeyChange} placeholder="Enter API Key from your Projects" className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm group-hover:border-slate-300" autoFocus />
                <div className="flex gap-2">
                  <button type="submit" disabled={isUpdatingApiKey || apiKeyForm.apiKey === user?.apiKey} className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black px-6 py-3.5 rounded-xl shadow hover:shadow-indigo-200 transition-all disabled:opacity-50 uppercase tracking-widest text-xs min-w-[100px]">
                    {isUpdatingApiKey ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    {isUpdatingApiKey ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={() => setIsEditingApiKey(false)} className="flex items-center justify-center bg-slate-100 text-slate-600 p-3.5 rounded-xl hover:bg-slate-200 transition-colors" title="Cancel">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Update Password Section */}
      {user?.provider === 'credential' || user?.provider === 'both' ? (
        <form onSubmit={handleSubmit} className="space-y-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-700">Update Password</h3>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Info className="w-3 h-3" />
              At least 6 characters
            </div>
          </div>

          <div className="space-y-4">
            {/* Old Password */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-sm font-black text-slate-500 uppercase tracking-wider">Original Password:</label>
              <div className="relative group">
                <input type={showPasswords.old ? 'text' : 'password'} name="oldPassword" value={form.oldPassword} onChange={handleChange} placeholder="Old Password" className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm group-hover:border-slate-300 pr-12" />
                <button type="button" onClick={() => togglePasswordVisibility('old')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-slate-50">
                  {showPasswords.old ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-sm font-black text-slate-500 uppercase tracking-wider internal-label">New Password:</label>
              <div className="relative group">
                <input type={showPasswords.new ? 'text' : 'password'} name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="New Password" className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm group-hover:border-slate-300 pr-12" />
                <button type="button" onClick={() => togglePasswordVisibility('new')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-slate-50">
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="text-sm font-black text-slate-500 uppercase tracking-wider internal-label">Confirm Password:</label>
              <div className="relative group">
                <input type={showPasswords.confirm ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm group-hover:border-slate-300 pr-12" />
                <button type="button" onClick={() => togglePasswordVisibility('confirm')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-slate-50">
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black px-10 py-4 rounded-xl shadow-lg hover:shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 uppercase tracking-widest text-xs">
              {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      ) : (
        <div className="pt-4 border-t border-slate-100 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-start gap-4">
          <Info className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">Managed by Google</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Your account is managed via Google Authentication.</p>
          </div>
        </div>
      )}

      {/* Two-Factor Authentication Section */}
      {(user?.provider === 'credential' || user?.provider === 'both') && (
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${user?.enable2FA ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">Two-Factor Authentication</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">Secure your account with an additional verification step. You'll receive a code via email when logging in.</p>
              </div>
            </div>
            <button onClick={() => toggle2FA()} disabled={isToggling2FA} className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${user?.enable2FA ? 'bg-indigo-600' : 'bg-slate-300'}`}>
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${user?.enable2FA ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
