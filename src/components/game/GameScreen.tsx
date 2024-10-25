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
              size={`text-5xl ${feedback?.correct ? "text-green-600" : ""}`}
              className={`transition-all duration-300 ${
                feedback?.correct ? "scale-110" : ""
              }`}
              onSpeak={() => speak(currentItem.thai)}
              isPlaying={isPlaying}
            />

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
                      onSpeak={() => speak(getSafeExtras()?.wordThai || "")}
                      isPlaying={isPlaying}
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

          {feedback && !feedback.correct && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg text-center bg-red-100 text-red-800">
                <div className="flex items-center justify-center gap-2">
                  <X className="w-5 h-5" />
                  {feedback.message}{" "}
                  {feedback.answer && (
                    <span className="font-bold">{feedback.answer}</span>
                  )}
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
