"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";

interface AudioContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: "success" | "error") => void;
}

const GameAudioContext = createContext<AudioContextType>({
  isSoundEnabled: true,
  toggleSound: () => {},
  playSound: () => {},
});

export const useAudio = () => useContext(GameAudioContext);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize and preload audio files
    successAudioRef.current = new Audio("/sounds/success.mp3");
    successAudioRef.current.load();
    successAudioRef.current.preload = "auto";

    errorAudioRef.current = new Audio("/sounds/error.mp3");
    errorAudioRef.current.load();
    errorAudioRef.current.preload = "auto";

    return () => {
      successAudioRef.current = null;
      errorAudioRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev);
  };

  const playSound = (type: "success" | "error") => {
    if (!isSoundEnabled) return;

    const audioRef =
      type === "success" ? successAudioRef.current : errorAudioRef.current;

    if (audioRef) {
      // Reset the audio to start if it's already playing
      audioRef.currentTime = 0;
      audioRef.play().catch((error) => {
        console.error(`Error playing ${type} sound:`, error);
      });
    }
  };

  return (
    <GameAudioContext.Provider
      value={{ isSoundEnabled, toggleSound, playSound }}
    >
      {children}
    </GameAudioContext.Provider>
  );
};
