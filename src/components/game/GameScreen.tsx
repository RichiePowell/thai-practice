import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import type { GameSettings } from "@/types/GameSettings";
import type { LearningCategory } from "@/types/LearningCategory";
import useGameLogic from "@/hooks/useGameLogic";
import ThaiCharacterDisplay from "./ThaiCharacterDisplay";
import GameHeader from "./GameHeader";
import { WrongAnswer } from "@/types/WrongAnswerType";
import { useSpeech } from "@/hooks/useSpeech";
import { ContentItem } from "@/types/ContentTypes";

interface GameScreenProps {
  settings: GameSettings;
  categories: LearningCategory[]; // Changed from single category to array
  onGameOver: (score: number, wrongAnswers: WrongAnswer[]) => void;
  onReturnToMenu: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  settings,
  categories,
  onGameOver,
  onReturnToMenu,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { speak, isSupported } = useSpeech({
    onPlayStateChange: setIsPlaying,
  });

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
    categories, // Pass all selected categories
  });

  useEffect(() => {
    if (settings.autoSpeak && currentItem && !feedback && isSupported) {
      speak(currentItem.thai, false);
    }
  }, [currentItem, settings.autoSpeak, feedback, isSupported, speak]);

  const getOptionStyles = (option: ContentItem) => {
    const baseStyles = `p-4 h-auto text-left transition-all duration-300
      border-2 relative overflow-hidden font-medium
      touch-none select-none
      -webkit-tap-highlight-color-transparent`;

    if (!feedback) {
      return `${baseStyles}
        dark:border-primary/30
        hover:border-primary dark:hover:border-primary
        hover:bg-primary/10 dark:hover:bg-primary/20
        hover:text-foreground dark:hover:text-foreground
        active:border-primary dark:active:border-primary`;
    }

    if (option.id === currentItem?.id) {
      return `${baseStyles}
        bg-emerald-500 dark:bg-emerald-600 
        hover:bg-emerald-500 dark:hover:bg-emerald-600 
        text-white dark:text-white
        scale-105 hover:text-white
        border-emerald-400 dark:border-emerald-500
        shadow-lg shadow-emerald-500/20 dark:shadow-emerald-500/40
        active:bg-emerald-500 dark:active:bg-emerald-600
        disabled:opacity-100 cursor-default`;
    }

    if (feedback && !feedback.correct && option.id === feedback.selectedId) {
      return `${baseStyles}
        bg-red-100 dark:bg-red-900
        hover:bg-red-100 hover:dark:bg-red-900
        border-red-500 dark:border-red-500
        text-black dark:text-white
        shadow-lg shadow-red-500/20 dark:shadow-red-500/40
        active:bg-red-500 dark:active:bg-red-500
        cursor-default`;
    }

    return `${baseStyles}
      border-primary/30 dark:border-primary/30
      bg-background dark:bg-background
      text-foreground/70 dark:text-foreground/70
      hover:text-foreground/90 dark:hover:text-foreground/90
      active:text-foreground/90 dark:active:text-foreground/90
      cursor-default`;
  };

  const getIconStyles = (option: ContentItem) => {
    const baseStyles = "w-5 h-5 shrink-0 ml-2";

    if (option.id === currentItem?.id) {
      return `${baseStyles} text-white`;
    }

    if (feedback && !feedback.correct && option.id === feedback.selectedId) {
      return `${baseStyles} dark:text-white`;
    }

    return baseStyles;
  };

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
          <div className="text-center py-12">
            <ThaiCharacterDisplay
              character={currentItem.thai}
              size="text-5xl"
              className={`transition-all duration-300 ${
                feedback?.correct
                  ? "text-emerald-500 dark:text-emerald-400"
                  : "text-foreground"
              }`}
              isPlaying={isPlaying}
              isSupported={isSupported}
            />

            {settings.showRomanized && (
              <div className="text-lg text-muted-foreground mt-2">
                {currentItem.romanized}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={(e) => {
                  (e.currentTarget as HTMLButtonElement).blur();
                  handleAnswer(option);
                }}
                className={getOptionStyles(option)}
                variant="outline"
                disabled={!!feedback}
              >
                <span className="flex items-center justify-between w-full">
                  <span className="font-bold">{option.meaning}</span>
                  {feedback && option.id === currentItem.id && (
                    <Check className={getIconStyles(option)} />
                  )}
                  {feedback &&
                    !feedback.correct &&
                    option.id === feedback.selectedId && (
                      <X className={getIconStyles(option)} />
                    )}
                </span>
              </Button>
            ))}
          </div>

          <div className="h-[44px] relative">
            <Button
              onClick={handleNextQuestion}
              className={`w-full bg-primary transition-all duration-300
                absolute top-0 left-0 right-0
                ${
                  canProceed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
            >
              Continue to next question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
