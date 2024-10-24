"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy } from "lucide-react";
import { MainMenu } from "./MainMenu";
import { GameScreen } from "./GameScreen";
import type { GameSettings } from "@/types/GameSettings";
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { Logo } from "../ui/logo";

type GameState = "menu" | "playing" | "gameOver";

export const ThaiPhraseGame = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setGameState("gameOver");
  };

  const handleStartGame = () => {
    setGameState("playing");
  };

  const handleReturnToMenu = () => {
    setGameState("menu");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <Logo />
      </CardHeader>
      <CardContent>
        {gameState === "menu" && (
          <MainMenu
            onStartGame={handleStartGame}
            settings={settings}
            onSettingsChange={setSettings}
          />
        )}

        {gameState === "playing" && (
          <GameScreen
            settings={settings}
            onGameOver={handleGameOver}
            onReturnToMenu={handleReturnToMenu}
          />
        )}

        {gameState === "gameOver" && (
          <div className="text-center space-y-4">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
            <p className="text-xl font-bold">Game Over!</p>
            <p className="text-lg">
              Final Score: {finalScore}/{settings.questionsPerRound}
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => setGameState("playing")}
                className="w-full flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Play Again
              </Button>
              <Button
                onClick={handleReturnToMenu}
                variant="outline"
                className="w-full"
              >
                Return to Menu
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
