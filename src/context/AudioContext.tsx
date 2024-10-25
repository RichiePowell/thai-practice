"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AudioContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (url: string) => void;
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

  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev);
  };

  const playSound = (url: string) => {
    if (isSoundEnabled) {
      const audio = new Audio(url);
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
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
