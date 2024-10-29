"use client";

import React from "react";
import { Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThaiCharacterDisplay from "./ThaiCharacterDisplay";
import type { WrongAnswer } from "@/types/WrongAnswerType";

interface IncorrectAnswersProps {
  wrongAnswers: WrongAnswer[];
}

export const IncorrectAnswers = ({ wrongAnswers }: IncorrectAnswersProps) => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "th-TH";
    speechSynthesis.speak(utterance);
  };

  return (
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => speak(wrong.question.thai)}
                  className="h-8 w-8 rounded-full"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
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
  );
};
