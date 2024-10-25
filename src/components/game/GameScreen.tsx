import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { GameSettings } from "@/types/GameSettings";
import type { LearningCategory } from "@/types/LearningCategory";
import useGameLogic from "@/hooks/useGameLogic";
import ThaiCharacterDisplay from "./ThaiCharacterDisplay";
import GameHeader from "./GameHeader";
import { WrongAnswer } from "@/types/WrongAnswerType";

interface GameScreenProps {
  settings: GameSettings;
  category: LearningCategory;
  onGameOver: (score: number, wrongAnswers: WrongAnswer[]) => void;
  onReturnToMenu: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  settings,
  category,
  onGameOver,
  onReturnToMenu,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    currentItem,
    options,
    score,
    totalQuestions,
    feedback,
    timeLeft,
    canProceed,
    handleAnswer,
    handleNextQuestion,
  } = useGameLogic({
    settings,
    onGameOver,
    category,
  });

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "th-TH";
    setIsPlaying(true);

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    speechSynthesis.speak(utterance);
  };

  // Auto speak when question changes
  useEffect(() => {
    if (settings.autoSpeak && currentItem && !feedback) {
      speak(currentItem.thai);
    }
  }, [currentItem, settings.autoSpeak, feedback]);

  return (
    <div className="space-y-6">
      <GameHeader
        score={score}
        totalQuestions={totalQuestions}
        questionsPerRound={settings.questionsPerRound}
        timeLeft={timeLeft}
        timerEnabled={settings.timerEnabled}
        onReturnToMenu={onReturnToMenu}
      />

      {currentItem && (
        <div className="space-y-6">
          <div className="text-center">
            <ThaiCharacterDisplay
              character={currentItem.thai}
              size="text-5xl"
              className={`transition-all duration-300 ${
                feedback?.correct ? "text-green-500 dark:text-green-400" : ""
              }`}
              onSpeak={speak}
              isPlaying={isPlaying}
            />

            {settings.showRomanized && (
              <div className="text-lg text-muted-foreground mt-2">
                {currentItem.romanized}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`p-4 h-auto text-left transition-all duration-300
    border-2 dark:border-primary/30
    hover:border-primary dark:hover:border-primary
    hover:bg-primary/10 dark:hover:bg-primary/20
    hover:text-foreground dark:hover:text-foreground
    disabled:opacity-100
    ${
      feedback?.correct && option.id === currentItem.id
        ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white dark:text-white scale-105 border-green-400 dark:border-green-500 disabled:text-white dark:disabled:text-white"
        : "bg-card dark:text-white disabled:opacity-50"
    }`}
                variant="outline"
                disabled={!!feedback}
              >
                <span className="font-bold">{option.meaning}</span>
              </Button>
            ))}
          </div>

          {feedback && !feedback.correct && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg text-center bg-red-100/90 dark:bg-red-900/50 text-red-800 dark:text-red-200">
                <div className="flex items-center justify-center gap-2">
                  <X className="w-5 h-5" />
                  <span>
                    <span>{feedback.message}</span>
                    {feedback.answer && (
                      <span className="font-bold">{feedback.answer}</span>
                    )}
                  </span>
                </div>
              </div>

              {canProceed && (
                <Button
                  onClick={handleNextQuestion}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Continue to Next Question
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
