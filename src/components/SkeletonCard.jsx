import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="animate-shimmer bg-white/5 h-48"></div>
      
      <div className="p-6 space-y-4">
        <div className="animate-shimmer bg-white/10 h-6 w-3/4 rounded"></div>
        <div className="animate-shimmer bg-white/10 h-4 w-full rounded"></div>
        <div className="animate-shimmer bg-white/10 h-4 w-5/6 rounded"></div>
        
        <div className="space-y-2 pt-2">
          <div className="animate-shimmer bg-white/10 h-4 w-2/3 rounded"></div>
          <div className="animate-shimmer bg-white/10 h-4 w-1/2 rounded"></div>
          <div className="animate-shimmer bg-white/10 h-4 w-3/5 rounded"></div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <div className="animate-shimmer bg-white/10 h-6 w-32 rounded"></div>
          <div className="animate-shimmer bg-white/10 h-10 w-24 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
