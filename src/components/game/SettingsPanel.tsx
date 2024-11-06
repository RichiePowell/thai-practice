"use client";

import React, { useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import type { GameSettings } from "@/types/GameSettings";
import { GAME_CONFIG } from "@/constants/config";
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { saveStoredSettings } from "@/lib/storage";

interface SettingsPanelProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
}) => {
  // Save settings whenever they change
  useEffect(() => {
    saveStoredSettings({ game: settings });
  }, [settings]);

  const handleResetSettings = () => {
    onSettingsChange({ ...DEFAULT_SETTINGS });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="timer-toggle" className="text-foreground">
          Enable Timer
        </Label>
        <Switch
          id="timer-toggle"
          checked={settings.timerEnabled}
          onCheckedChange={(checked) =>
            onSettingsChange({ ...settings, timerEnabled: checked })
          }
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Timer Duration (seconds)</Label>
        <Slider
          disabled={!settings.timerEnabled}
          min={GAME_CONFIG.MIN_TIMER_DURATION}
          max={GAME_CONFIG.MAX_TIMER_DURATION}
          step={GAME_CONFIG.TIMER_STEP}
          value={[settings.timerDuration]}
          onValueChange={([value]) =>
            onSettingsChange({ ...settings, timerDuration: value })
          }
          className="[&>[role=slider]]:bg-primary [&>[role=slider]]:border-primary"
        />
        <div className="text-right text-sm text-muted-foreground">
          {settings.timerDuration} seconds
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="romanized-toggle" className="text-foreground">
          Show Romanized Text
        </Label>
        <Switch
          id="romanized-toggle"
          checked={settings.showRomanized}
          onCheckedChange={(checked) =>
            onSettingsChange({ ...settings, showRomanized: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="auto-speak-toggle" className="text-foreground">
          Auto-Play Thai Pronunciation
        </Label>
        <Switch
          id="auto-speak-toggle"
          checked={settings.autoSpeak}
          onCheckedChange={(checked) =>
            onSettingsChange({ ...settings, autoSpeak: checked })
          }
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Questions per Round</Label>
        <Slider
          min={GAME_CONFIG.MIN_QUESTIONS}
          max={GAME_CONFIG.MAX_QUESTIONS}
          step={GAME_CONFIG.QUESTIONS_STEP}
          value={[settings.questionsPerRound]}
          onValueChange={([value]) =>
            onSettingsChange({ ...settings, questionsPerRound: value })
          }
          className="[&>[role=slider]]:bg-primary [&>[role=slider]]:border-primary"
        />
        <div className="text-right text-sm text-muted-foreground">
          {settings.questionsPerRound} questions
        </div>
      </div>

      <div className="border-t pt-4">
        <Button
          variant="outline"
          onClick={handleResetSettings}
          className="w-full border-dashed"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset to default settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
