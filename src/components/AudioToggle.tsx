"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/context/AudioContext";

export const AudioToggle = () => {
  const { isSoundEnabled, toggleSound } = useAudio();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      className="fixed top-4 right-4 rounded-full"
      title={isSoundEnabled ? "Mute Sound" : "Enable Sound"}
    >
      {isSoundEnabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </Button>
  );
};
