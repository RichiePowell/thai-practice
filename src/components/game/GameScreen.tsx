import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Timer, Volume2, Home } from "lucide-react";
import type { GameSettings } from "@/types/GameSettings";
import type { LearningCategory } from "@/types/LearningCategory";
import useGameLogic from "@/hooks/useGameLogic";
import ThaiCharacterDisplay from "./ThaiCharacterDisplay";

interface GameScreenProps {
  settings: GameSettings;
  category: LearningCategory;
  onGameOver: (score: number) => void;
  onReturnToMenu: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  settings,
  category,
  onGameOver,
  onReturnToMenu,
}) => {
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
    speechSynthesis.speak(utterance);
  };

  // Filter out any extra information that could give away answers
  const getSafeExtras = () => {
    if (!currentItem?.extra) return null;

    const safeExtras = { ...currentItem.extra };
    // Only show word examples and class before answer
    // Remove sound hints and other potential spoilers
    if (!feedback) {
      delete safeExtras.sound;
    }
    return safeExtras;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onReturnToMenu}
            className="rounded-full"
            title="Return to Menu"
          >
            <Home className="w-5 h-5" />
          </Button>
          <div className="text-sm text-gray-600">
            Score: {score}/{totalQuestions} (
            {totalQuestions < settings.questionsPerRound
              ? `Question ${totalQuestions + 1}/${settings.questionsPerRound}`
              : "Complete!"}
            )
          </div>
        </div>
        {settings.timerEnabled && !feedback && (
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            <span
              className={`font-mono ${timeLeft <= 3 ? "text-red-500" : ""}`}
            >
              {timeLeft}s
            </span>
          </div>
        )}
      </div>

      {currentItem && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              <ThaiCharacterDisplay
                character={currentItem.thai}
                size={`text-5xl ${feedback?.correct ? "text-green-600" : ""}`}
                className={`transition-all duration-300 ${
                  feedback?.correct ? "scale-110" : ""
                }`}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => speak(currentItem.thai)}
                className="rounded-full"
              >
                <Volume2 className="w-5 h-5" />
              </Button>
            </div>

            {settings.showRomanized && (
              <div className="text-lg text-gray-600 mt-2">
                {currentItem.romanized}
              </div>
            )}

            {getSafeExtras() && (
              <div className="text-sm text-gray-500 mt-4 space-y-1">
                {getSafeExtras()?.wordThai && (
                  <div className="flex items-center justify-center gap-2">
                    <ThaiCharacterDisplay
                      character={getSafeExtras()?.wordThai || ""}
                      size="text-lg"
                    />
                    <span>•</span>
                    <span>{getSafeExtras()?.wordMeaning}</span>
                  </div>
                )}
                {getSafeExtras()?.class && !feedback && (
                  <p>Consonant Class: {getSafeExtras()?.class}</p>
                )}
              </div>
            )}

            {/* Show additional information after answer */}
            {feedback && currentItem.extra?.sound && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Sound: {currentItem.extra.sound}
                </p>
                {currentItem.extra.class && (
                  <p className="text-sm text-gray-600">
                    Class: {currentItem.extra.class}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`p-4 h-auto text-left transition-all duration-300 ${
                  feedback?.correct && option.id === currentItem.id
                    ? "bg-green-500 hover:bg-green-600 scale-105"
                    : ""
                }`}
                variant="outline"
                disabled={!!feedback}
              >
                <span className="font-bold">{option.meaning}</span>
              </Button>
            ))}
          </div>

          {feedback && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg text-center ${
                  feedback.correct
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {feedback.correct ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                  {feedback.message}
                </div>
              </div>

              {canProceed && (
                <Button onClick={handleNextQuestion} className="w-full">
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
