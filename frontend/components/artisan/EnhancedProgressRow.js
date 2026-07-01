import React from "react";

export default function EnhancedProgressRow({ label, percent, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-modern text-[#3d3021]">{label}</span>
        <span className="font-bold text-[#8b6f47]">{percent}</span>
      </div>
      <div className="w-full bg-gray-200/60 h-3 rounded-full overflow-hidden">
        <div
          className={`bg-gradient-to-r ${color} h-3 rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: percent }}
        >
          <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}
