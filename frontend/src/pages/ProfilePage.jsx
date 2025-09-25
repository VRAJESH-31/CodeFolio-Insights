import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState({ name: '', email: '', jobTitle: '', profilePicture: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // If no user data, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:8080/auth/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: user.name, jobTitle: user.jobTitle }),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
            <div className="w-full max-w-lg p-8 space-y-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg">
                <h2 className="text-2xl font-bold text-center">Profile Settings</h2>
                <div className="flex flex-col items-center">
                    <img src={user.profilePicture || "https://placehold.co/100x100/E9D5FF/4F46E5?text=U"} alt="Profile" className="w-24 h-24 rounded-full mb-4 object-cover" />
                    <button className="text-sm text-indigo-400 hover:underline">Change Picture</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                        <input type="text" name="name" id="name" value={user.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input type="email" name="email" id="email" value={user.email} disabled className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-gray-400 cursor-not-allowed" />
                    </div>
                
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;