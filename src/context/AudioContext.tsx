"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { loadStoredSettings, saveStoredSettings } from "@/lib/storage";

interface AudioContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: "success" | "error" | "complete" | "failure") => void;
}

const GameAudioContext = createContext<AudioContextType>({
  isSoundEnabled: true,
  toggleSound: () => {},
  playSound: () => {},
});

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);
  const completeAudioRef = useRef<HTMLAudioElement | null>(null);
  const failureAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load sound preference on mount
  useEffect(() => {
    const stored = loadStoredSettings();
    setIsSoundEnabled(stored.sound);
  }, []);

  // Initialize audio files
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Create audio elements
        successAudioRef.current = new Audio("/sounds/success.mp3");
        errorAudioRef.current = new Audio("/sounds/error.mp3");
        completeAudioRef.current = new Audio("/sounds/complete.mp3");
        failureAudioRef.current = new Audio("/sounds/failure.mp3");

        // Preload all audio files
        const audioRefs = [
          successAudioRef,
          errorAudioRef,
          completeAudioRef,
          failureAudioRef,
        ];

        await Promise.all(
          audioRefs.map(async (ref) => {
            if (ref.current) {
              ref.current.preload = "auto";
              try {
                await ref.current.load();
              } catch (error) {
                console.warn("Error preloading audio:", error);
              }
            }
          })
        );

        setIsAudioInitialized(true);
      } catch (error) {
        console.error("Error initializing audio:", error);
        // Still mark as initialized even if there's an error to prevent infinite retries
        setIsAudioInitialized(true);
      }
    };

    initializeAudio();

    // Cleanup
    return () => {
      [
        successAudioRef,
        errorAudioRef,
        completeAudioRef,
        failureAudioRef,
      ].forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current = null;
        }
      });
    };
  }, []);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const newValue = !prev;
      saveStoredSettings({ sound: newValue });
      return newValue;
    });
  };

  const playSound = (type: "success" | "error" | "complete" | "failure") => {
    if (!isSoundEnabled || !isAudioInitialized) return;

    const audioRef = {
      success: successAudioRef,
      error: errorAudioRef,
      complete: completeAudioRef,
      failure: failureAudioRef,
    }[type].current;

    if (audioRef) {
      try {
        audioRef.currentTime = 0;
        const playPromise = audioRef.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn(`Error playing ${type} sound:`, error);
          });
        }
      } catch (error) {
        console.warn(`Error playing ${type} sound:`, error);
      }
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

export const useAudio = () => useContext(GameAudioContext);
