import React from "react";

  const InfoCard = ({ icon: Icon, label, value, colorClass = "bg-indigo-50 text-indigo-600" }) => (
    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className={`p-3 rounded-lg ${colorClass}`}>
        {Icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-gray-900 font-semibold text-base md:text-lg wrap-break-word">{value || "N/A"}</p>
      </div>
    </div>
  );

export default InfoCard;