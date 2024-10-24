import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-12 h-12 mb-2">
        <div className="absolute inset-0 bg-primary rounded-lg transform rotate-45"></div>
        <div className="absolute inset-2 bg-background rounded-lg transform rotate-45 flex items-center justify-center">
          <span className="text-xl font-bold text-primary transform -rotate-45">
            ก
          </span>
        </div>
      </div>
      <h1 className="text-xl font-bold text-primary">ThaiPhrases</h1>
      <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full mt-1"></div>
    </div>
  );
};
