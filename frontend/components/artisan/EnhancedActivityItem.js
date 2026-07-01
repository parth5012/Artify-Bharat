import React from "react";

export default function EnhancedActivityItem({ icon, title, time, type }) {
  const typeColors = {
    success: "from-green-500/20 to-emerald-500/20 text-green-700",
    info: "from-blue-500/20 to-cyan-500/20 text-blue-700",
    neutral: "from-gray-500/20 to-slate-500/20 text-gray-700",
    warning: "from-yellow-500/20 to-orange-500/20 text-yellow-700",
  };

  return (
    <div
      className={`flex items-center justify-between p-3 bg-gradient-to-r ${typeColors[type] || typeColors.neutral} rounded-xl border border-white/30 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="font-modern text-sm">{title}</span>
      </div>
      <span className="text-xs opacity-70 font-handwritten">{time}</span>
    </div>
  );
}
