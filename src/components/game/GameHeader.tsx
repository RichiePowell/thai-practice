import React from "react";
import { Timer, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GameHeaderProps {
  score: number;
  totalQuestions: number;
  questionsPerRound: number;
  timeLeft?: number;
  timerEnabled?: boolean;
  onReturnToMenu: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  totalQuestions,
  questionsPerRound,
  timeLeft,
  timerEnabled,
}) => {
  const progressPercentage = (totalQuestions / questionsPerRound) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">
              {score}/{totalQuestions}
            </span>
          </div>

          {timerEnabled && typeof timeLeft === "number" && (
            <div className="flex items-center gap-1.5">
              <Timer className="w-4 h-4" />
              <span
                className={`font-mono text-sm font-medium ${
                  timeLeft <= 3 ? "text-red-500" : ""
                }`}
              >
                {timeLeft}s
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Progress value={progressPercentage} className="h-1.5 flex-1" />
        <span className="text-xs text-gray-500 min-w-[3rem] text-right">
          {totalQuestions + 1}/{questionsPerRound}
        </span>
      </div>
    </div>
  );
};

export default GameHeader;
