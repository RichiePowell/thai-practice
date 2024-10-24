"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Timer, Volume2, Home } from "lucide-react";
import type { GameSettings } from "@/types/GameSettings";
import type { LearningCategory } from "@/types/LearningCategory";
import type { ContentItem } from "@/types/ContentTypes";
import useGameLogic from "@/hooks/useGameLogic";

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

  return (
    <>
      <div className="flex justify-between items-center mb-4">
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
            Score: {score}/{totalQuestions}(
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
        <>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className="text-4xl mb-2">{currentItem.thai}</div>
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
              <div className="text-lg text-gray-600 mb-2">
                {currentItem.romanized}
              </div>
            )}
            {/* {currentItem.extra && (
              <div className="text-sm text-gray-500 mt-2">
                <p>
                  {currentItem.extra.wordThai} • {currentItem.extra.wordMeaning}
                </p>
                {currentItem.extra.class && (
                  <p className="mt-1">
                    Consonant Class: {currentItem.extra.class}
                  </p>
                )}
                {currentItem.extra.sound && (
                  <p className="mt-1">Sound: {currentItem.extra.sound}</p>
                )}
              </div>
            )} */}
            <p className="text-gray-600 mt-4">
              {category.id === "thai-script"
                ? "Match the consonant to its correct sound"
                : "Match the phrase to its correct meaning"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`p-4 h-auto text-left ${
                  feedback &&
                  option.id === currentItem.id &&
                  "bg-green-500 hover:bg-green-600"
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
                className={`mt-4 p-4 rounded-lg text-center ${
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
        </>
      )}
    </>
  );
};
