import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-xl overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-32"></div>
      
      <div className="p-4 space-y-3">
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-3 w-full rounded"></div>
        <div className="bg-gray-300 h-3 w-2/3 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
