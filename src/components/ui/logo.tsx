"use client";

import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center select-none group ${className}`}
    >
      <div className="relative w-16 h-16 mb-3">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#A51931] via-white to-primary rounded-xl shadow-lg transform rotate-45"></div>

        {/* Inner white square with Thai character */}
        <div className="absolute inset-2 bg-white/90 backdrop-blur-sm rounded-lg transform rotate-45 flex items-center justify-center">
          <span className="text-2xl font-bold transform -rotate-45 bg-gradient-to-br from-primary to-[#A51931] bg-clip-text text-transparent">
            ก
          </span>
        </div>
      </div>

      {/* Title with hover animation */}
      <h1 className="text-xl font-bold text-primary">Thai Practice</h1>

      {/* Single gradient bar that matches the main logo */}
      <div className="mt-2 h-1 w-24 bg-gradient-to-r from-[#A51931] via-white to-primary rounded-full"></div>
    </div>
  );
};
