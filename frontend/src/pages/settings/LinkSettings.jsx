import { useAuthStore } from '@/store/export.js';
import { Link as LinkIcon } from 'lucide-react';
import { LinkCard } from '@/components/cards/export.js';
import { useProfileLinks, useUpdateProfileLink } from '@/hooks/useProfiles.js';
import { PLATFORMS_CONFIG } from '@/constants/platform';

const LinkSettings = () => {
  const displayName = useAuthStore((state) => state?.user?.displayName);

  const { data: profile } = useProfileLinks(displayName);
  const { mutate: updateProfileMutation, isPending, variables } = useUpdateProfileLink();

  const handleUpdate = (platformValue, newUsername) => {
    if (!newUsername.trim()) {
      return;
    }

    updateProfileMutation({
      platformName: platformValue,
      platformUsername: newUsername,
    });
  };

  return (
    <div className="animate-float-in">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8">
        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 mb-6">
          <LinkIcon className="w-6 h-6 text-blue-600" />
          Manage Coding Profiles Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
          {PLATFORMS_CONFIG.map((platform, index) => {
            const username = profile?.[platform.backendKey] || '';
            const platformWithData = {
              ...platform,
              username,
              profileUrl: platform.getProfileUrl(username),
            };

            return <LinkCard key={platform.value} platform={platformWithData} index={index} onSave={handleUpdate} isUpdating={isPending && variables?.platformName === platform.value} isAnyUpdating={isPending} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LinkSettings;
