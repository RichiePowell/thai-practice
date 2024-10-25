"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { GameSettings } from "@/types/GameSettings";
import { GAME_CONFIG } from "@/constants/config";

interface SettingsPanelProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="timer-toggle">Enable Timer</Label>
        <Switch
          id="timer-toggle"
          checked={settings.timerEnabled}
          onCheckedChange={(checked) =>
            onSettingsChange({ ...settings, timerEnabled: checked })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Timer Duration (seconds)</Label>
        <Slider
          disabled={!settings.timerEnabled}
          min={GAME_CONFIG.MIN_TIMER_DURATION}
          max={GAME_CONFIG.MAX_TIMER_DURATION}
          step={GAME_CONFIG.TIMER_STEP}
          value={[settings.timerDuration]}
          onValueChange={([value]) =>
            onSettingsChange({ ...settings, timerDuration: value })
          }
        />
        <div className="text-right text-sm text-gray-500">
          {settings.timerDuration} seconds
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="romanized-toggle">Show Romanized Text</Label>
        <Switch
          id="romanized-toggle"
          checked={settings.showRomanized}
          onCheckedChange={(checked) =>
            onSettingsChange({ ...settings, showRomanized: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="auto-speak-toggle">Auto-Play Thai Pronunciation</Label>
        <Switch
          id="auto-speak-toggle"
          checked={settings.autoSpeak}
          onCheckedChange={(checked) =>
            onSettingsChange({ ...settings, autoSpeak: checked })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Questions per Round</Label>
        <Slider
          min={GAME_CONFIG.MIN_QUESTIONS}
          max={GAME_CONFIG.MAX_QUESTIONS}
          step={GAME_CONFIG.QUESTIONS_STEP}
          value={[settings.questionsPerRound]}
          onValueChange={([value]) =>
            onSettingsChange({ ...settings, questionsPerRound: value })
          }
        />
        <div className="text-right text-sm text-gray-500">
          {settings.questionsPerRound} questions
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
