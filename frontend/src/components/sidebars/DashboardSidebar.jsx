import { useState, useEffect } from 'react';
import { ExternalLink, MapPin, Mail, Linkedin, Twitter, Globe, ChevronDown, Plus, FileText, Phone } from 'lucide-react';
import { useAuthStore } from '@/store/export.js';
import { useToggleProfileVisibility } from '@/hooks/useUsers.js';
import { InfoTooltip } from '@/components/export.js';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { URL } from '@/constants/url.js';
import { PLATFORMS_CONFIG } from '@/constants/platform.js';

const DashboardSidebar = ({ userData }) => {
  const { displayName } = useParams();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const [profileVisibility, setProfileVisibility] = useState(userData?.profileVisibility);
  const [isProblemStatsOpen, setIsProblemStatsOpen] = useState(true);
  const [isDevStatsOpen, setIsDevStatsOpen] = useState(true);
  const navigate = useNavigate();

  const setAuthUser = useAuthStore((state) => state.setUser);
  const { mutate: toggleProfileVisibilityMutation } = useToggleProfileVisibility();

  useEffect(() => {
    if (userData) {
      setProfileVisibility(userData.profileVisibility);
    }
  }, [userData]);

  const handleToggleVisibility = () => {
    toggleProfileVisibilityMutation(undefined, {
      onSuccess: (data) => {
        const updatedUser = {
          ...user,
          profileVisibility: data.profileVisibility,
        };
        setAuthUser(updatedUser);
        setProfileVisibility(data.profileVisibility);
      },
    });
  };

  const userLinks = [
    {
      name: 'Email',
      icon: <Mail className={`w-5 h-5 cursor-pointer hover:text-blue-500 transition-all hover:scale-110 ${userData?.email ? 'text-slate-800' : 'text-slate-300'}`} />,
      url: userData?.email ? `mailto:${userData?.email}` : '',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className={`w-5 h-5 cursor-pointer hover:text-blue-500 transition-all hover:scale-110 ${userData?.linkedinUsername ? 'text-slate-800' : 'text-slate-300'}`} />,
      url: userData?.linkedinUsername ? `https://www.linkedin.com/in/${userData?.linkedinUsername}` : '',
    },
    {
      name: 'Twitter',
      icon: <Twitter className={`w-5 h-5 cursor-pointer hover:text-blue-500 transition-all hover:scale-110 ${userData?.twitterUsername ? 'text-slate-800' : 'text-slate-300'}`} />,
      url: userData?.twitterUsername ? `https://x.com/${userData?.twitterUsername}` : '',
    },
    {
      name: 'Portfolio Website',
      icon: <Globe className={`w-5 h-5 cursor-pointer hover:text-blue-500 transition-all hover:scale-110 ${userData?.portfolioWebsiteLink ? 'text-slate-800' : 'text-slate-300'}`} />,
      url: userData?.portfolioWebsiteLink,
    },
    {
      name: 'Resume',
      icon: <FileText className={`w-5 h-5 cursor-pointer hover:text-blue-500 transition-all hover:scale-110 ${userData?.resumeLink ? 'text-slate-800' : 'text-slate-300'}`} />,
      url: userData?.resumeLink,
    },
  ];

  const enrichedPlatforms = PLATFORMS_CONFIG.map((platform) => {
    const username = userData?.profileLinks?.[platform.backendKey];
    return {
      name: platform.label,
      icon: platform.icon,
      category: platform.category,
      url: platform.getProfileUrl(username),
      path: platform.getDashboardUrl(displayName),
      isConnected: !!username,
    };
  }).filter((platform) => platform.isConnected);

  const problemPlatforms = enrichedPlatforms.filter((p) => p.category === 'DSA');
  const devPlatforms = enrichedPlatforms.filter((p) => p.category === 'Development');

  const stats = [
    {
      label: 'Profile Views',
      value: userData?.profileViews || '0',
      color: 'text-slate-500',
    },
    {
      label: 'Last Refresh',
      value: userData?.lastRefresh.toLocaleString().split('T')[0] || '',
      color: 'text-slate-500',
    },
    {
      label: 'Visibility',
      value: userData?.visibility || 'Public',
      color: 'text-slate-500',
    },
  ];

  return (
    <aside className="w-80 h-full bg-white border-r border-slate-100 flex flex-col relative shadow-xl">
      <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <InfoTooltip text="Visible to everyone" direction="right" />
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Public Profile</span>
            <button onClick={handleToggleVisibility} className={`relative w-10 h-5 rounded-full transition-all ${profileVisibility === true ? 'bg-green-500' : 'bg-slate-200'}`}>
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${profileVisibility === true ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-10 animate-pulse-glow" />
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10">
              <img src={userData?.profile || URL.USER_AVATAR_PLACEHOLDER} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-2">{userData?.name || 'User'}</h2>
          {userData?.headline ? <p className="text-xs text-slate-400 leading-relaxed font-bold mb-8 px-4 italic">{userData?.headline}</p> : null}

          <div className="flex items-center justify-between w-full px-4 mt-4 mb-8 text-slate-400">
            {userLinks.map((link) => (
              <button key={link.name} className="flex items-center gap-2" onClick={() => window.open(link.url, '_blank')} disabled={!link.url}>
                {link.icon}
              </button>
            ))}
          </div>

          {userData?.location || userData?.phone ? (
            <div className="w-full space-y-3 text-left bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              {userData?.location ? (
                <div className="flex items-center gap-3 text-slate-600 font-bold text-xs">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{userData?.location}</span>
                </div>
              ) : null}
              {userData?.phone ? (
                <div className="flex items-center gap-3 text-slate-600 font-bold text-xs">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>
                    +{userData?.countryCode} {userData?.phone}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-4 px-4 pb-8 space-y-4">
          {problemPlatforms.length > 0 && (
            <div className="space-y-2">
              <div className="w-full flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl group transition-all">
                <span onClick={() => navigate(`/dashboard/${displayName}/coding-profiles/`)} className="text-xs font-black text-slate-600 uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors">
                  Problem Solving
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProblemStatsOpen(!isProblemStatsOpen);
                  }}
                  className="p-1 hover:bg-slate-200 rounded-lg transition-all"
                >
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-all ${isProblemStatsOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {isProblemStatsOpen && (
                <div className="space-y-1 py-2">
                  {problemPlatforms.map((platform) => {
                    const isActive = location.pathname === platform.path;
                    return (
                      <div key={platform.name} className={`flex items-center justify-between p-3.5 rounded-2xl transition-all group cursor-pointer ${isActive ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50'}`} onClick={() => navigate(platform.path)}>
                        <div className="flex items-center gap-3">
                          <img src={platform.icon} alt={platform.name} className="w-8 h-8 object-contain transition-all" />
                          <span className={`text-sm font-bold ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>{platform.name}</span>
                        </div>
                        <ExternalLink
                          className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-500'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(platform.url, '_blank');
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {devPlatforms.length > 0 && (
            <div className="space-y-2">
              <div className="w-full flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl group transition-all">
                <span onClick={() => navigate(devPlatforms[0].path)} className="text-xs font-black text-slate-600 uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors">
                  Development
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDevStatsOpen(!isDevStatsOpen);
                  }}
                  className="p-1 hover:bg-slate-200 rounded-lg transition-all"
                >
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-all ${isDevStatsOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {isDevStatsOpen && (
                <div className="space-y-1 py-2">
                  {devPlatforms.map((platform) => {
                    const isActive = location.pathname === platform.path;
                    return (
                      <div key={platform.name} className={`flex items-center justify-between p-3.5 rounded-2xl transition-all group cursor-pointer ${isActive ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50'}`} onClick={() => navigate(platform.path)}>
                        <div className="flex items-center gap-3">
                          <img src={platform.icon} alt={platform.name} className="w-8 h-8 object-contain transition-all" />
                          <span className={`text-sm font-bold ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>{platform.name}</span>
                        </div>
                        <ExternalLink
                          className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-500'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(platform.url, '_blank');
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all font-black text-xs uppercase tracking-widest" onClick={() => navigate('/settings/links')}>
            <Plus className="w-4 h-4" /> Add Platform
          </button>

          <div className="px-4 space-y-3 pt-6 border-t border-slate-50 text-slate-500">
            {stats.map((stat) => (
              <div key={stat.label} className="flex justify-between items-center group/stat">
                <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                <span className={`text-xs font-black ${stat.color} group-hover/stat:scale-105 transition-transform`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
