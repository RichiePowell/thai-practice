"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { LearningCategory } from "@/types/LearningCategory";
import type { FeedbackType } from "@/types/FeedbackType";
import type { GameSettings } from "@/types/GameSettings";
import type { ContentItem } from "@/types/ContentTypes";
import { CATEGORY_CONTENT } from "@/constants/content";
import { HISTORY_LENGTH } from "@/constants/config";
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { useAudio } from "@/context/AudioContext";

const CORRECT_ANSWER_DELAY = 1500; // Time in ms before advancing to next question

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
  const { playSound } = useAudio(); // Add this line
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);
  const [options, setOptions] = useState<ContentItem[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [timeLeft, setTimeLeft] = useState(
    settings?.timerDuration ?? DEFAULT_SETTINGS.timerDuration
  );
  const [canProceed, setCanProceed] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const correctAnswerTimerRef = useRef<NodeJS.Timeout | null>(null);

  const generateQuestion = useCallback(() => {
    const categoryContent = CATEGORY_CONTENT[category.id];
    if (!categoryContent) return;

    const availableItems = categoryContent.items.filter(
      (item) => !questionHistory.includes(item.id)
    );

    const itemsToUse =
      availableItems.length > 0
        ? availableItems
        : categoryContent.items.filter((item) => item.id !== currentItem?.id);

    const randomIndex = Math.floor(Math.random() * itemsToUse.length);
    const correct = itemsToUse[randomIndex];

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

    playSound("/sounds/error.mp3"); // Also play error sound on time up
    setFeedback({
      correct: false,
      message: `Time's up! The answer was "${currentItem.meaning}"`,
    });
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

  const handleAnswer = (selected: ContentItem) => {
    if (feedback || !currentItem) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    if (correctAnswerTimerRef.current)
      clearTimeout(correctAnswerTimerRef.current);

    const isCorrect = selected.id === currentItem.id;

    if (isCorrect) {
      playSound("/sounds/success.mp3");
      setScore((prev) => prev + 1);
      setFeedback({
        correct: true,
        message: `Correct! "${currentItem.thai}" (${currentItem.romanized})`,
      });

      correctAnswerTimerRef.current = setTimeout(() => {
        handleNextQuestion();
      }, CORRECT_ANSWER_DELAY);
    } else {
      playSound("/sounds/error.mp3"); // Add error sound
      setFeedback({
        correct: false,
        message: `Incorrect. The answer was "${currentItem.meaning}"`,
      });
    }
    setCanProceed(true);
  };

  useEffect(() => {
    generateQuestion();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (correctAnswerTimerRef.current)
        clearTimeout(correctAnswerTimerRef.current);
    };
  }, []);

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
