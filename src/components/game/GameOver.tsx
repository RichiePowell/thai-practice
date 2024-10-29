"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy } from "lucide-react";
import type { WrongAnswer } from "@/types/WrongAnswerType";
import { IncorrectAnswers } from "./IncorrectAnswers";

interface GameOverProps {
  score: number;
  totalQuestions: number;
  wrongAnswers: WrongAnswer[];
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
}

export const GameOver = ({
  score,
  totalQuestions,
  wrongAnswers,
  onPlayAgain,
  onReturnToMenu,
}: GameOverProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mt-6 space-y-4">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 dark:text-yellow-400" />
        <p className="text-xl font-bold text-foreground">Game Over!</p>
        <p className="text-lg text-foreground">
          Final Score: {score}/{totalQuestions}
        </p>
      </div>

      {wrongAnswers.length > 0 && (
        <IncorrectAnswers wrongAnswers={wrongAnswers} />
      )}

      <div className="space-y-2 pt-4">
        <Button
          onClick={onPlayAgain}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <RefreshCw className="w-4 h-4" />
          Play Again
        </Button>
        <Button
          onClick={onReturnToMenu}
          variant="outline"
          className="w-full border-2 hover:bg-accent/10 dark:border-primary/30 dark:hover:border-primary dark:hover:bg-primary/10 dark:hover:text-white"
        >
          Return to Menu
        </Button>
      </div>
    </div>
  );
};
