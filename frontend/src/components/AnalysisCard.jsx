import React from "react";

function AnalysisCard({
  title,
  points = [],
  Icon = null,
  PointIcon = null,
  className = "",
  iconBg,
  iconColor,
  pointIconColor,
  pointColor,
}) {
  return (
    <div className={`p-5 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group
        ${className}`}>
      {(title || Icon) && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div
              className={`p-2 rounded-lg ${iconBg} group-hover:scale-105 transition-transform duration-300`}
            >
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
          )}

          {title && (
            <span className="font-semibold text-blue-800 text-base">
              {title}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <ul className="space-y-3">
        {points.map((point, idx) => (
        <li key={idx} className="flex items-start gap-3">
            {PointIcon && (
            <PointIcon
                className={`h-4 w-4 ${pointIconColor} mt-0.5 flex-shrink-0`}
            />
            )}
            <span className={`text-sm ${pointColor} leading-relaxed italic`}>
            {point}
            </span>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisCard;