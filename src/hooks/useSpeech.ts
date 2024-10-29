"use client";

import { useState, useCallback, useEffect } from "react";

interface UseSpeechProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const useSpeech = ({ onPlayStateChange }: UseSpeechProps = {}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    const supported =
      "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    setIsSupported(supported);
  }, []);

  const speak = useCallback(
    (text: string, isManualPlay: boolean = false) => {
      if (!isSupported) return false;

      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "th-TH";

        setIsPending(true);
        onPlayStateChange?.(true);

        // Handle speech completion
        utterance.onend = () => {
          setIsPending(false);
          onPlayStateChange?.(false);
        };

        // Handle speech errors
        utterance.onerror = (event) => {
          console.warn("Speech synthesis error:", event);
          setIsPending(false);
          onPlayStateChange?.(false);
        };

        // Some Android browsers need a slight delay to work properly
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 100);

        return true;
      } catch (error) {
        console.warn("Speech synthesis failed:", error);
        setIsPending(false);
        onPlayStateChange?.(false);
        return false;
      }
    },
    [isSupported, onPlayStateChange]
  );

  return {
    speak,
    isSupported,
    isPending,
  };
};
