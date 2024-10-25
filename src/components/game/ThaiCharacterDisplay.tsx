import React, { useState, useEffect } from "react";
import { AlertCircle, Volume2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ThaiCharacterDisplayProps {
  character: string;
  size?: string;
  showFallback?: boolean;
  className?: string;
  onManualSpeak?: (text: string) => void; // Renamed from onSpeak to onManualSpeak
  isPlaying?: boolean;
}

const ThaiCharacterDisplay: React.FC<ThaiCharacterDisplayProps> = ({
  character,
  size = "text-4xl",
  showFallback = true,
  className = "",
  onManualSpeak,
  isPlaying = false,
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
          The Thai character &ldquo;{character}&ldquo; (
          {character.codePointAt(0)?.toString(16)}) could not be rendered.
          Please ensure you have Thai fonts installed.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="relative inline-flex items-center group">
      <div
        className={`font-thai transition-all duration-300 ${size} ${className}`}
      >
        {character}
      </div>
      {onManualSpeak && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onManualSpeak(character)}
          className={`h-6 w-6 absolute -right-7 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors ${
            isPlaying ? "text-primary" : ""
          }`}
        >
          <Volume2 className={`h-3 w-3 ${isPlaying ? "animate-pulse" : ""}`} />
        </Button>
      )}
    </div>
  );
};

export default ThaiCharacterDisplay;
