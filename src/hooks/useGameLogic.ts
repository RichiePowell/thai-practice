"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { LearningCategory } from "@/types/LearningCategory";
import type { FeedbackType } from "@/types/FeedbackType";
import type { GameSettings } from "@/types/GameSettings";
import type { ContentItem } from "@/types/ContentTypes";
import { CATEGORY_CONTENT } from "@/constants/content";
import { HISTORY_LENGTH } from "@/constants/config";
import { DEFAULT_SETTINGS } from "@/constants/settings";

interface UseGameLogicParams {
  settings: GameSettings;
  onGameOver: (score: number) => void;
  category: LearningCategory;
}

const useGameLogic = ({
  settings = DEFAULT_SETTINGS,
  onGameOver,
  category,
}: UseGameLogicParams) => {
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);
  const [options, setOptions] = useState<ContentItem[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [timeLeft, setTimeLeft] = useState(
    settings?.timerDuration ?? DEFAULT_SETTINGS.timerDuration
  );
  const [canProceed, setCanProceed] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]); // Store IDs instead of objects
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateQuestion = useCallback(() => {
    const categoryContent = CATEGORY_CONTENT[category.id];
    if (!categoryContent) return;

    // Filter using IDs instead of objects
    const availableItems = categoryContent.items.filter(
      (item) => !questionHistory.includes(item.id)
    );

    const itemsToUse =
      availableItems.length > 0
        ? availableItems
        : categoryContent.items.filter((item) => item.id !== currentItem?.id);

    const randomIndex = Math.floor(Math.random() * itemsToUse.length);
    const correct = itemsToUse[randomIndex];

    // Update history with IDs
    setQuestionHistory((prev) => {
      const newHistory = [...prev, correct.id];
      return newHistory.slice(-HISTORY_LENGTH);
    });

    const wrongOptions = categoryContent.items
      .filter((item) => item.id !== correct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const allOptions = [...wrongOptions, correct].sort(
      () => 0.5 - Math.random()
    );

    setCurrentItem(correct);
    setOptions(allOptions);
    setFeedback(null);
    setCanProceed(false);

    if (settings.timerEnabled) {
      setTimeLeft(settings.timerDuration);
    }
  }, [
    category.id,
    currentItem?.id,
    questionHistory,
    settings.timerDuration,
    settings.timerEnabled,
  ]);

  const handleTimeUp = () => {
    if (!currentItem) return;

    setFeedback({
      correct: false,
      message:
        currentItem.type === "phrase"
          ? `Time's up! The answer was "${currentItem.thai}" (${currentItem.romanized})`
          : "Time's up!",
    });
    setCanProceed(true);
  };

  const handleAnswer = (selected: ContentItem) => {
    if (feedback || !currentItem) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    const isCorrect = selected.id === currentItem.id;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      if (currentItem.type === "phrase") {
        setFeedback({
          correct: true,
          message: `Correct! "${currentItem.thai}" (${currentItem.romanized})`,
        });
      } else {
        setFeedback({
          correct: true,
          message: "Correct!",
        });
      }
    } else {
      if (currentItem.type === "phrase") {
        setFeedback({
          correct: false,
          message: `Incorrect. The answer was "${currentItem.thai}" (${currentItem.romanized})`,
        });
      } else {
        setFeedback({
          correct: false,
          message: "Incorrect!",
        });
      }
    }
    setCanProceed(true);
  };

  const handleNextQuestion = () => {
    setTotalQuestions((prev) => prev + 1);
    if (totalQuestions + 1 >= settings.questionsPerRound) {
      onGameOver(score);
    } else {
      generateQuestion();
    }
  };

  // Initialize game
  useEffect(() => {
    generateQuestion();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []); // Empty dependency array for initialization only

  // Handle timer
  useEffect(() => {
    if (settings.timerEnabled && timeLeft > 0 && !feedback) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (
      settings.timerEnabled &&
      timeLeft === 0 &&
      !feedback &&
      currentItem
    ) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, settings.timerEnabled, feedback, currentItem]);

  return {
    currentPhrase: currentItem, // for backward compatibility
    currentItem,
    options,
    score,
    totalQuestions,
    feedback,
    timeLeft,
    canProceed,
    handleAnswer,
    handleNextQuestion,
  };
};

export default useGameLogic;
