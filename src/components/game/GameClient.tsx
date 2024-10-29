"use client";

import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { GameSettings } from "@/types/GameSettings";
import type { LearningCategory } from "@/types/LearningCategory";
import { WrongAnswer } from "@/types/WrongAnswerType";
import { MainMenu } from "./MainMenu";
import { GameScreen } from "./GameScreen";
import { GameOver } from "./GameOver";
import { CategorySelector } from "./CategorySelector";
import { Logo } from "../ui/logo";
import { Button } from "../ui/button";
import { Home } from "lucide-react";

type GameState = "menu" | "category-select" | "playing" | "gameOver";

interface GameClientProps {
  initialSettings: GameSettings;
}

export const GameClient = ({ initialSettings }: GameClientProps) => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [settings, setSettings] = useState<GameSettings>(initialSettings);
  const [finalScore, setFinalScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<LearningCategory | null>(null);

  const handleGameOver = useCallback(
    (score: number, wrongAnswers: WrongAnswer[]) => {
      const uniqueWrongAnswers = wrongAnswers.filter(
        (answer, index, self) =>
          index === self.findIndex((a) => a.question.id === answer.question.id)
      );

      setFinalScore(score);
      setWrongAnswers(uniqueWrongAnswers);
      setGameState("gameOver");
    },
    []
  );

  const handleReturnToMenu = () => {
    setGameState("menu");
    setWrongAnswers([]);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg relative">
      {gameState !== "menu" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReturnToMenu}
          className="absolute top-4 left-4 h-8 w-8 rounded-full"
          title="Return to Menu"
        >
          <Home className="h-8 w-8" />
        </Button>
      )}
      {gameState !== "playing" && gameState !== "gameOver" && (
        <CardHeader>
          <Logo />
        </CardHeader>
      )}
      <CardContent className={gameState === "playing" ? "pt-6" : ""}>
        {gameState === "menu" && (
          <MainMenu
            onStartGame={() => setGameState("category-select")}
            settings={settings}
            onSettingsChange={setSettings}
          />
        )}

        {gameState === "category-select" && (
          <CategorySelector
            onSelect={(category) => {
              setSelectedCategory(category);
              setGameState("playing");
            }}
          />
        )}

        {gameState === "playing" && selectedCategory && (
          <GameScreen
            settings={settings}
            category={selectedCategory}
            onGameOver={handleGameOver}
            onReturnToMenu={handleReturnToMenu}
          />
        )}

        {gameState === "gameOver" && (
          <GameOver
            score={finalScore}
            totalQuestions={settings.questionsPerRound}
            wrongAnswers={wrongAnswers}
            onPlayAgain={() => setGameState("playing")}
            onReturnToMenu={handleReturnToMenu}
          />
        )}
      </CardContent>
    </Card>
  );
};
