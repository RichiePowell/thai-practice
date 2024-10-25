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
import { WrongAnswer } from "@/types/WrongAnswerType";

interface UseGameLogicParams {
  settings: GameSettings;
  onGameOver: (score: number, wrongAnswers: WrongAnswer[]) => void;
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
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const categoryContentRef = useRef(CATEGORY_CONTENT[category.id]);
  const { playSound } = useAudio();
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);

  const generateQuestion = useCallback(() => {
    const categoryContent = categoryContentRef.current;
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
  }, [settings.timerDuration, settings.timerEnabled]); // Removed dependencies that were causing the loop

  const handleTimeUp = useCallback(() => {
    if (!currentItem || feedback || !settings.timerEnabled) return;

    playSound("/sounds/error.mp3");

    setFeedback({
      correct: false,
      message:
        currentItem.type === "phrase"
          ? `Time's up! The answer was "${currentItem.thai}" (${currentItem.romanized})`
          : "Time's up!",
    });
    setCanProceed(true);
  }, [currentItem, feedback, settings.timerEnabled]);

  const handleAnswer = useCallback(
    (selected: ContentItem) => {
      if (feedback || !currentItem) return;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      const isCorrect = selected.id === currentItem.id;

      if (isCorrect) {
        setScore((prev) => prev + 1);
        playSound("/sounds/success.mp3");
        setFeedback({
          correct: true,
          message: "",
        });
        setTimeout(() => {
          const newTotal = totalQuestions + 1;
          if (newTotal >= settings.questionsPerRound) {
            onGameOver(score + 1, wrongAnswers);
          } else {
            setTotalQuestions(newTotal);
            generateQuestion();
          }
        }, 500);
      } else {
        playSound("/sounds/error.mp3");
        // Track wrong answer
        setWrongAnswers((prev) => [
          ...prev,
          {
            question: currentItem,
            playerAnswer: selected,
          },
        ]);

        if (currentItem.type === "phrase") {
          setFeedback({
            correct: false,
          message: `Incorrect. The answer was:`,
          answer: currentItem.meaning,
          });
        }
        setCanProceed(true);
      }
    },
    [
      currentItem,
      feedback,
      totalQuestions,
      settings.questionsPerRound,
      onGameOver,
      score,
      generateQuestion,
    ]
  );

  const handleNextQuestion = useCallback(() => {
    const newTotal = totalQuestions + 1;
    if (newTotal >= settings.questionsPerRound) {
      onGameOver(score, wrongAnswers); // Pass wrongAnswers here
    } else {
      setTotalQuestions(newTotal);
      generateQuestion();
    }
  }, [
    totalQuestions,
    settings.questionsPerRound,
    onGameOver,
    score,
    generateQuestion,
    wrongAnswers,
  ]);

  // Initialize game
  useEffect(() => {
    generateQuestion();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // Removed generateQuestion from deps array

  // Handle timer
  useEffect(() => {
    if (settings.timerEnabled && timeLeft > 0 && !feedback) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (settings.timerEnabled && timeLeft === 0 && !feedback) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, settings.timerEnabled, feedback, handleTimeUp]);

  return {
    currentItem,
    options,
    score,
    totalQuestions,
    feedback,
    timeLeft,
    canProceed,
    wrongAnswers,
    handleAnswer,
    handleNextQuestion,
  };
};

export default useGameLogic;
