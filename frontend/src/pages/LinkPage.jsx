import { useState } from 'react';
import { useAuthStore } from '../store/export.js';
import { Code, Github, Linkedin, FileText, Globe, Twitter, Link as LinkIcon, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { transformBackendToFrontend, transformFrontendToBackend } from '../utils/linkHelpers.js';
import { LinkCard } from '../components/card/export.js';
import { AddEditLinkForm } from '../components/export.js';
import { useProfileLinks, useUpdateProfileLinks } from '../hooks/useProfiles.js';
import { PLATFORMS_CONFIG } from '../constants/index.js';

const LinkPage = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ platform: '', username: '' });
    const [copiedId, setCopiedId] = useState(null);
    const userId = useAuthStore((state) => state?.user?._id);

    const { data: profile, isLoading, refetch: fetchLinks } = useProfileLinks(userId);
    const updateProfileMutation = useUpdateProfileLinks();

    const iconMap = {
        leetcode: Code, github: Github, linkedin: Linkedin,
        gfg: Code, hackerrank: Code, codechef: Code,
        codeforces: Code, twitter: Twitter, code360: Code,
        interviewbit: Code, portfolio: Globe, resume: FileText
    };

    const platforms = PLATFORMS_CONFIG.map(p => ({ ...p, icon: iconMap[p.value] }));

    const links = profile ? transformBackendToFrontend(profile, platforms) : [];

    const updateLinksOnServer = async (newLinks) => {
        try {
            await updateProfileMutation.mutateAsync(transformFrontendToBackend(newLinks));
            fetchLinks();
        } catch (error) {
            console.error("Failed to update links", error);
        }
    };

    const handleSave = async () => {
        if (!formData.platform || !formData.username) return;
        const linkData = { id: editingId || Date.now().toString(), platform: formData.platform, username: formData.username };
        const formatted = transformBackendToFrontend(transformFrontendToBackend([linkData]), platforms)[0];
        const updatedLinks = editingId ? links.map(l => l.id === editingId ? formatted : l) : [...links, formatted];
        await updateLinksOnServer(updatedLinks);
        handleCancel();
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ platform: '', username: '' });
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-sans relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 animate-slide-in">
                    <div className="inline-flex items-center gap-3 mb-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                            <LinkIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Platforms</h1>
                            <p className="text-gray-600 text-sm">Manage all your coding profiles in one place</p>
                        </div>
                    </div>
                </div>

                {links.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-in">
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60">
                            <div className="flex items-center gap-3"><TrendingUp className="h-5 w-5 text-blue-600" />
                                <div><div className="text-2xl font-black text-gray-800">{links.length}</div><div className="text-sm text-gray-600">Total Links</div></div>
                            </div>
                        </div>
                        <div className="md:block hidden"></div><div className="md:block hidden"></div>
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60">
                            <div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-purple-600" />
                                <div><div className="text-2xl font-black text-gray-800">{platforms.length}</div><div className="text-sm text-gray-600">Platforms</div></div>
                            </div>
                        </div>
                    </div>
                )}

                {!isAdding && !editingId && (
                    <div className="text-center mb-8">
                        <button onClick={() => setIsAdding(true)} className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" /> Add New Platform
                        </button>
                    </div>
                )}

                {(isAdding || editingId) && (
                    <AddEditLinkForm
                        isAdding={isAdding}
                        editingId={editingId}
                        formData={formData}
                        setFormData={setFormData}
                        platforms={platforms}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {links.map((link, index) => (
                        <LinkCard
                            key={link.id}
                            link={link}
                            index={index}
                            platforms={platforms}
                            copyToClipboard={copyToClipboard}
                            copiedId={copiedId}
                            handleEdit={(l) => {
                                setEditingId(l.id);
                                setFormData({ platform: l.platform, username: l.username });
                            }}
                            handleDelete={(id) => updateLinksOnServer(links.filter(l => l.id !== id))}
                        />
                    ))}
                </div>

                {links.length === 0 && !isAdding && !isLoading && (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/60">
                            <LinkIcon className="h-12 w-12 text-blue-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-black text-gray-800 mb-3">No Platforms Added Yet</h3>
                            <button onClick={() => setIsAdding(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl">Add Your First Platform</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinkPage;