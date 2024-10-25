import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ThaiCharacterDisplayProps {
  character: string;
  size?: string;
  showFallback?: boolean;
  className?: string;
}

const ThaiCharacterDisplay: React.FC<ThaiCharacterDisplayProps> = ({
  character,
  size = "text-4xl",
  showFallback = true,
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // Create a canvas to test if the character can be rendered
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = "16px Noto Sans Thai, Arial, sans-serif";
      const metrics = context.measureText(character);

      // Check if the character is rendered as a box or missing glyph
      setHasError(
        metrics.width === 0 || metrics.width === context.measureText("□").width
      );
    }
    setIsLoaded(true);
  }, [character]);

  if (!isLoaded) {
    return (
      <div className={`animate-pulse bg-gray-200 ${size} rounded`}>&nbsp;</div>
    );
  }

  if (hasError && showFallback) {
    return (
      <Alert variant="destructive" className="my-2">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Display Error</AlertTitle>
        <AlertDescription className="text-sm">
          The Thai character "{character}" (
          {character.codePointAt(0)?.toString(16)}) could not be rendered.
          Please ensure you have Thai fonts installed.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div
      className={`font-thai transition-all duration-300 ${size} ${className}`}
    >
      {character}
    </div>
  );
};

export default ThaiCharacterDisplay;
