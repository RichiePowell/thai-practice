"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Settings } from "lucide-react";
import { SettingsPanel } from "./SettingsPanel";
import type { GameSettings } from "@/types/GameSettings";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Thai Language Game
        </h1>
        <p className="text-muted-foreground">
          Learn Thai phrases through an interactive quiz!
        </p>
      </div>

      <Button
        onClick={onStartGame}
        className="w-full py-8 text-xl bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Play className="w-6 h-6 mr-2" />
        Start Game
      </Button>

      <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <div className="bg-card rounded-lg border">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-6 hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                <h2 className="text-lg">Game Settings</h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {isSettingsOpen ? "Hide Settings" : "Show Settings"}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-6 border-t">
              <SettingsPanel
                settings={settings}
                onSettingsChange={onSettingsChange}
              />
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};
