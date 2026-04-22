import { ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

const HackerrankCertificateCard = ({ data, className = "", isExpanded = false }) => {
    if (!data) return null;

    const { certificate, certificate_image, completed_at, kind, score, test_unique_id } = data.attributes;

    const formattedDate = new Date(completed_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className={`bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col h-full group relative ${className}`}>
            {/* Certificate Image Container */}
            <div className={`relative aspect-[4/3] overflow-hidden bg-gray-50 shrink-0 border-b border-gray-100`}>
                <img
                    src={certificate_image}
                    alt={`${certificate?.label} Certificate`}
                    className="w-full h-full object-cover"
                />

                {/* Hover Description Overlay */}
                <div className="absolute inset-0 bg-emerald-900/90 flex flex-col justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className={`text-white ${isExpanded ? 'text-sm' : 'text-[11px]'} font-medium leading-relaxed italic text-center`}>
                        &quot;{certificate?.description}&quot;
                    </p>
                </div>

                {/* Status Badge */}
                <div className={`absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm ${isExpanded ? 'px-3 py-1' : 'px-2 py-0.5'} rounded-full border border-emerald-100 shadow-sm`}>
                    <CheckCircle2 className={`${isExpanded ? 'w-4 h-4' : 'w-3 h-3'} text-emerald-600`} />
                    <span className={`${isExpanded ? 'text-xs' : 'text-[9px]'} font-bold text-gray-700 capitalize`}>{kind}</span>
                </div>
            </div>

            <div className={`${isExpanded ? 'p-4' : 'p-2'} flex flex-col flex-1`}>
                {/* Title and Score */}
                <div className="flex justify-between items-start gap-1 mb-1">
                    <div className="flex-1">
                        <h3 className={`${isExpanded ? 'text-base' : 'text-[10px]'} font-bold text-gray-800 leading-[1.2] truncate-2-lines`}>
                            {certificate?.level ? `${certificate?.label} (${certificate?.level})` : certificate?.label}
                        </h3>
                    </div>
                    <div className={`bg-emerald-50 ${isExpanded ? 'px-2 py-1' : 'px-1 py-0.5'} rounded border border-emerald-100 shrink-0`}>
                        <p className={`text-emerald-700 ${isExpanded ? 'text-xs' : 'text-[7.5px]'} font-black`}>{score}</p>
                    </div>
                </div>

                {/* Footer Info */}
                <div className={`flex items-center justify-between mt-auto ${isExpanded ? 'pt-3' : 'pt-1.5'} border-t border-gray-50`}>
                    <div className="flex items-center gap-1">
                        <Calendar className={`${isExpanded ? 'w-4 h-4' : 'w-2 h-2'} text-gray-400`} />
                        <span className={`${isExpanded ? 'text-sm' : 'text-[8px]'} font-bold text-gray-600`}>{formattedDate}</span>
                    </div>

                    <a
                        href={certificate_image || `https://www.hackerrank.com/certificates/${test_unique_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 ${isExpanded ? 'text-sm' : 'text-[8px]'} font-bold text-blue-600 hover:text-blue-800 transition-colors`}
                    >
                        verify
                        <ExternalLink className={`${isExpanded ? 'w-4 h-4' : 'w-2 h-2'}`} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HackerrankCertificateCard;
