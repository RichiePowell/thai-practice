"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { SettingsPanel } from "./SettingsPanel";
import type { GameSettings } from "@/types/GameSettings";

interface MainMenuProps {
  onStartGame: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Thai Language Game</h1>
        <p className="text-gray-600">
          Learn Thai phrases through an interactive quiz!
        </p>
      </div>

      <Button onClick={onStartGame} className="w-full py-8 text-xl">
        <Play className="w-6 h-6 mr-2" />
        Start Game
      </Button>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Game Settings</h2>
        <SettingsPanel
          settings={settings}
          onSettingsChange={onSettingsChange}
        />
      </div>
    </div>
  );
};
