import { useState, useCallback, useEffect } from "react";
import { useAudio } from "@/context/AudioContext";

interface UseSpeechProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const useSpeech = ({ onPlayStateChange }: UseSpeechProps = {}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { isSoundEnabled } = useAudio();

  useEffect(() => {
    // Check if speech synthesis is supported
    const supported =
      "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    setIsSupported(supported);
  }, []);

  const speak = useCallback(
    (text: string, isManualPlay: boolean = false) => {
      // Only check sound enabled for auto-play, not manual play
      if (!isSupported || (!isManualPlay && !isSoundEnabled)) return false;

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
    [isSupported, isSoundEnabled, onPlayStateChange]
  );

  return {
    speak,
    isSupported,
    isPending,
    isSoundEnabled,
  };
};
