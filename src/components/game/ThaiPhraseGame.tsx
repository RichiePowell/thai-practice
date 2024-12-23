import React, { useCallback, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, X, Home } from "lucide-react";
import { MainMenu } from "./MainMenu";
import { GameScreen } from "./GameScreen";
import type { GameSettings } from "@/types/GameSettings";
import { Logo } from "../ui/logo";
import { LearningCategory } from "@/types/LearningCategory";
import { CategorySelector } from "./CategorySelector";
import { ContentItem } from "@/types/ContentTypes";
import ThaiCharacterDisplay from "./ThaiCharacterDisplay";
import { useAudio } from "@/context/AudioContext";

type GameState = "menu" | "category-select" | "playing" | "gameOver";

interface WrongAnswer {
  question: ContentItem;
  playerAnswer: ContentItem;
}

interface ThaiPhraseGameProps {
  initialSettings: GameSettings;
}

export const ThaiPhraseGame = ({ initialSettings }: ThaiPhraseGameProps) => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [settings, setSettings] = useState<GameSettings>(initialSettings);
  const [finalScore, setFinalScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    LearningCategory[]
  >([]);
  const { playSound } = useAudio();

  const handleGameOver = useCallback(
    (score: number, wrongAnswers: WrongAnswer[]) => {
      // Calculate percentage
      const percentage = (score / settings.questionsPerRound) * 100;

      // Play appropriate sound based on performance
      if (percentage >= 80) {
        playSound("complete");
      } else if (percentage <= 40) {
        playSound("failure");
      }

      const uniqueWrongAnswers = wrongAnswers.filter(
        (answer, index, self) =>
          index === self.findIndex((a) => a.question.id === answer.question.id)
      );

      setFinalScore(score);
      setWrongAnswers(uniqueWrongAnswers);
      setGameState("gameOver");
    },
    [settings.questionsPerRound, playSound]
  );

  const handleReturnToMenu = () => {
    setGameState("menu");
    setWrongAnswers([]);
    setSelectedCategories([]);
  };

  const HomeButton = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleReturnToMenu}
      className="absolute top-4 left-4 h-8 w-8 rounded-full"
      title="Return to Menu"
    >
      <Home className="h-8 w-8" />
    </Button>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg relative">
      {gameState !== "menu" && <HomeButton />}
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
            onSelectCategories={(categories) => {
              setSelectedCategories(categories);
              setGameState("playing");
            }}
          />
        )}

        {gameState === "playing" && selectedCategories.length > 0 && (
          <GameScreen
            settings={settings}
            categories={selectedCategories}
            onGameOver={handleGameOver}
            onReturnToMenu={handleReturnToMenu}
          />
        )}

        {gameState === "gameOver" && (
          <div className="space-y-6 pt-6 mt-6">
            <div className="text-center space-y-4">
              <Trophy className="w-16 h-16 mx-auto text-yellow-500 dark:text-yellow-400" />
              <p className="text-xl font-bold text-foreground">Game Over!</p>
              <p className="text-lg text-foreground">
                Final Score: {finalScore}/{settings.questionsPerRound}
              </p>
            </div>

            {wrongAnswers.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Incorrect answers:
                </h3>
                <div className="space-y-4">
                  {wrongAnswers.map((wrong) => (
                    <div
                      key={wrong.question.id}
                      className="bg-white dark:bg-card rounded-lg p-4 space-y-2 border-2 border-border"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ThaiCharacterDisplay
                            character={wrong.question.thai}
                            size="text-2xl"
                          />
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {wrong.question.romanized}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          Correct: {wrong.question.meaning}
                        </span>
                        <X className="w-4 h-4 text-muted-foreground/50" />
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          You chose: {wrong.playerAnswer.meaning}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 pt-4">
              <Button
                onClick={() => setGameState("playing")}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <RefreshCw className="w-4 h-4" />
                Play again with same categories
              </Button>
              <Button
                onClick={() => setGameState("category-select")}
                variant="outline"
                className="w-full border-2 hover:bg-accent/10 dark:border-primary/30 dark:hover:border-primary dark:hover:bg-primary/10 dark:hover:text-white"
              >
                Choose different categories
              </Button>
              <Button
                onClick={handleReturnToMenu}
                variant="outline"
                className="w-full border-2 hover:bg-accent/10 dark:border-primary/30 dark:hover:border-primary dark:hover:bg-primary/10 dark:hover:text-white"
              >
                Return to menu
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThaiPhraseGame;
