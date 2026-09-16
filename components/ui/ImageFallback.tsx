"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

interface ImageFallbackProps extends Omit<ImageProps, "onError"> {
  craftName?: string;
  craft?: string;
  region?: string;
  fallbackClassName?: string;
}

export const ImageFallback: React.FC<ImageFallbackProps> = ({
  src,
  alt,
  craftName,
  craft,
  region,
  fallbackClassName = "",
  className,
  ...props
}) => {
  const [error, setError] = useState(false);
  const displayCraft = craft || craftName;

  if (error || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-4 bg-stone-100 text-stone-500 border border-stone-200 rounded-2xl text-center space-y-2 select-none ${fallbackClassName}`}
      >
        <div className="w-10 h-10 rounded-xl bg-stone-200/80 flex items-center justify-center text-stone-400">
          <ImageOff className="w-5 h-5" />
        </div>
        <div className="space-y-0.5 max-w-[180px]">
          <span className="text-[11px] font-semibold text-stone-600 block">
            Image unavailable
          </span>
          {displayCraft && (
            <span className="text-xs font-bold text-stone-800 block truncate font-serif">
              {displayCraft}
            </span>
          )}
          {region && (
            <span className="text-[10px] text-stone-400 block truncate">
              {region}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || displayCraft || "Craft artifact photograph"}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};
