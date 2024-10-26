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
  playSound: (type: "success" | "error" | "complete" | "failure") => void;
}

// Create context with a default value
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
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);
  const completeAudioRef = useRef<HTMLAudioElement | null>(null);
  const failureAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  useEffect(() => {
    // Initialize and preload audio files
    successAudioRef.current = new Audio("/sounds/success.mp3");
    errorAudioRef.current = new Audio("/sounds/error.mp3");
    completeAudioRef.current = new Audio("/sounds/complete.mp3");
    failureAudioRef.current = new Audio("/sounds/failure.mp3");

    // Set up preloading
    const initializeAudio = async () => {
      try {
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
              await ref.current.load();
            }
          })
        );
        setIsAudioInitialized(true);
      } catch (error) {
        console.error("Error preloading audio:", error);
      }
    };

    initializeAudio();

    // Cleanup function
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
    setIsSoundEnabled((prev) => !prev);
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
            console.error(`Error playing ${type} sound:`, error);
          });
        }
      } catch (error) {
        console.error(`Error playing ${type} sound:`, error);
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

// Export the hook after the context and provider are defined
export const useAudio = () => useContext(GameAudioContext);
