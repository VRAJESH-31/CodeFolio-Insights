import { useState } from 'react';
import { Trophy, Crown, Sparkles, X } from "lucide-react";
import BadgeCard from "./BadgeCard";

const BadgeCollection = ({ badges, title = "Awards", defaultBadgesCount = 4, className="" }) => {
    console.log(badges.length, title, defaultBadgesCount);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const displayedBadges = badges.slice(0, defaultBadgesCount);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    return (
        <>
            <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 font-sans text-gray-800 w-full animate-float-in ${className}`}>

                {/* Header */}
                <div className="flex flex-col mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
                    <span className="text-gray-500 font-bold text-lg">{badges.length}</span>
                </div>

                {badges.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <div className="flex flex-wrap justify-center gap-4 mb-4">
                            {displayedBadges.map((badge, index) => (
                                <BadgeCard key={`${badge.id}-${index}`} badge={badge} />
                            ))}
                        </div>

                        {badges.length > defaultBadgesCount && (
                            <button
                                onClick={toggleModal}
                                className="text-blue-500 hover:text-blue-700 font-medium text-sm underline mt-2 focus:outline-none"
                            >
                                show more
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400">No badges earned yet</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-800">{title} ({badges.length})</h3>
                            <button
                                onClick={toggleModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                                {badges.map((badge, index) => (
                                    <BadgeCard key={`modal-${badge.id}-${index}`} badge={badge} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BadgeCollection;