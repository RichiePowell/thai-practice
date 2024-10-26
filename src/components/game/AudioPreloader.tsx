import React, { useEffect, useRef } from "react";

const AudioPreloader = () => {
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and preload success sound
    successAudioRef.current = new Audio("/sounds/success.mp3");
    successAudioRef.current.load();
    successAudioRef.current.preload = "auto";

    // Create and preload error sound
    errorAudioRef.current = new Audio("/sounds/error.mp3");
    errorAudioRef.current.load();
    errorAudioRef.current.preload = "auto";

    // Cleanup function
    return () => {
      if (successAudioRef.current) {
        successAudioRef.current = null;
      }
      if (errorAudioRef.current) {
        errorAudioRef.current = null;
      }
    };
  }, []);

  return null;
};

export default AudioPreloader;
