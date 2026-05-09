import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from "lucide-react";
import { HackerrankCertificateCard } from "@/components/cards/export.js";
import { useResponsiveCount } from '@/hooks/useResponsiveCount.js';
import { EmptyState } from '@/components/export.js';

const CertificatesCollection = ({ certificates = [], title = "Certificates", className = "" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);

    // Estimate CertificateCard width as 180px + gap-6 (24px)
    const fitCount = useResponsiveCount(containerRef, 180, 24);
    const displayedCertificates = certificates.slice(0, fitCount || 0);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <>
            <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 font-sans text-gray-800 w-full animate-float-in ${className}`}>
                <div className="flex flex-col mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
                    <span className="text-gray-500 font-bold text-lg">{certificates.length}</span>
                </div>

                {certificates.length > 0 ? (
                    <div className="flex flex-col items-center w-full">
                        <div
                            ref={containerRef}
                            className="flex justify-center gap-6 w-full mb-4 overflow-hidden flex-nowrap"
                        >
                            {displayedCertificates.map((cert, index) => (
                                <div key={cert.id || index} className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[180px]">
                                    <HackerrankCertificateCard
                                        data={cert}
                                    />
                                </div>
                            ))}
                        </div>

                        {certificates.length > displayedCertificates.length && (
                            <button
                                onClick={toggleModal}
                                className="text-blue-500 hover:text-blue-700 font-medium text-sm underline mt-2 focus:outline-none transition-colors"
                            >
                                show more
                            </button>
                        )}
                    </div>
                ) : (
                    <EmptyState 
                        title="No Certificates" 
                        message="No certificates earned yet" 
                        isCard={false} 
                        height="py-8"
                    />
                )}
            </div>

            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden">
                    <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
                        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-slate-50/50">
                            <h3 className="text-3xl font-black text-gray-800 tracking-tight">{title} <span className="text-blue-500 ml-2">({certificates.length})</span></h3>
                            <button
                                onClick={toggleModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {certificates.map((cert, index) => (
                                    <HackerrankCertificateCard
                                        key={`modal-${cert.id || index}`}
                                        data={cert}
                                        isExpanded={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default CertificatesCollection;
