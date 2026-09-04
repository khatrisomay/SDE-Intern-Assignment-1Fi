import React from 'react';
import { useViewMode } from '../../context/ViewModeContext';

export const ProductSkeleton: React.FC = () => {
  const { isMobileView } = useViewMode();

  return (
    <div
      className={
        isMobileView
          ? 'grid grid-cols-1 gap-2.5'
          : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
      }
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className={`flex ${
            isMobileView ? 'flex-row p-3 gap-3' : 'flex-col p-5 gap-4'
          } animate-pulse rounded-2xl border border-zinc-200/80 bg-white shadow-xs`}
        >
          {/* Product image placeholder */}
          <div
            className={`${
              isMobileView ? 'h-20 w-20' : 'h-52 w-full'
            } shrink-0 rounded-xl bg-zinc-100 animate-fi-shimmer`}
          />

          {/* Details placeholder */}
          <div className="min-w-0 flex-1 py-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-purple-100 animate-fi-shimmer" />
              <div className="h-4 w-4/5 rounded bg-zinc-200 animate-fi-shimmer" />
              <div className="h-3 w-3/5 rounded bg-zinc-100 animate-fi-shimmer" />
            </div>

            <div className="mt-3 flex items-center justify-between pt-1 border-t border-gray-50">
              <div className="h-4 w-20 rounded bg-zinc-200 animate-fi-shimmer" />
              <div className="h-5 w-24 rounded-full bg-purple-100/60 animate-fi-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
