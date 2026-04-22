import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useUpdateUser } from '../../hooks/useUsers.js';
import { ProfileInfoForm } from '../../components/export.js';
import { useAuthStore } from '../../store/export.js';
import toast from 'react-hot-toast';

const ProfileSettings = () => {
  const { user, setUser } = useOutletContext();
  const setAuthUser = useAuthStore((state) => state.setUser);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImageViewUrl, setProfileImageViewUrl] = useState(
    user?.profile || '/Images/Default/user.png',
  );

  const { mutate: updateUserMutation, isPending: isLoading } = useUpdateUser();

  // Update profile image view when user changes (e.g. after successful update)
  useEffect(() => {
    if (user?.profile) {
      setProfileImageViewUrl(user.profile);
    }
  }, [user?.profile]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setProfileImageViewUrl(previewUrl);
  };

  const updateImage = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('profileImage', selectedFile);
    updateUserMutation(formData, {
      onSuccess: (data) => {
        const updatedUser = { ...user, profile: data.profile };
        setUser(updatedUser);
        setAuthUser(data);
        setSelectedFile(null);
      },
    });
  };

  useEffect(() => {
    if (selectedFile) {
      updateImage();
    }
  }, [selectedFile]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cross-field validation for phone and countryCode
    if (
      (user.phone && !user.countryCode) ||
      (!user.phone && user.countryCode)
    ) {
      toast.error(
        'Both Country Code and Phone Number are required if one is provided!',
      );
      return;
    }

    const formData = new FormData();
    const fields = [
      'name',
      'jobTitle',
      'headline',
      'bio',
      'location',
      'countryCode',
      'phone',
      'linkedinUsername',
      'twitterUsername',
      'portfolioWebsiteLink',
      'resumeLink',
    ];

    fields.forEach((field) => {
      let value = user[field] || '';
      if ((field === 'countryCode' || field === 'phone') && value === '')
        return;
      if (field === 'countryCode' && value.startsWith('+'))
        value = value.substring(1);
      formData.append(field, value);
    });

    updateUserMutation(formData, {
      onSuccess: (data) => {
        setUser(data);
        setAuthUser(data);
        setIsEditing(false);
      },
    });
  };

  return (
    <ProfileInfoForm
      user={user}
      handleChange={handleChange}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      profileImageViewUrl={profileImageViewUrl}
      handleImageUpload={handleImageUpload}
    />
  );
};

export default ProfileSettings;
