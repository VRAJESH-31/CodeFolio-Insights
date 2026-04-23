import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AnalysisCard = ({
  title,
  points = [],
  Icon = null,
  PointIcon = null,
  className = '',
  iconBg,
  iconColor,
  pointIconColor,
  pointColor,
  titleColor = 'text-blue-800',
}) => {
  return (
    <div
      className={`p-5 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group ${className}`}
    >
      {(title || Icon) && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div
              className={`p-2 rounded-lg ${iconBg} group-hover:scale-105 transition-all`}
            >
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
          )}
          {title && (
            <span className={`font-bold ${titleColor} text-base`}>{title}</span>
          )}
        </div>
      )}

      <ul className="space-y-3">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-3">
            {PointIcon && (
              <PointIcon
                className={`h-4 w-4 ${pointIconColor} mt-0.5 flex-shrink-0`}
              />
            )}
            <div
              className={`text-sm ${pointColor} leading-relaxed font-medium prose-analysis w-full`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{point}</ReactMarkdown>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisCard;
