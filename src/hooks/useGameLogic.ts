"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { LearningCategory } from "@/types/LearningCategory";
import type { FeedbackType } from "@/types/FeedbackType";
import type { GameSettings } from "@/types/GameSettings";
import type { ContentItem } from "@/types/ContentTypes";
import { CATEGORY_CONTENT } from "@/constants/content";
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const categoryContentRef = useRef(CATEGORY_CONTENT[category.id]);
  const { playSound } = useAudio();
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);

  const [questionSet, setQuestionSet] = useState<ContentItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastQuestionRef = useRef<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const generateNewSet = useCallback(() => {
    const categoryContent = categoryContentRef.current;
    if (!categoryContent) return [];

    const allItems = [...categoryContent.items];

    // Shuffle all items to randomize order
    const shuffledItems = allItems.sort(() => Math.random() - 0.5);

    // Ensure no consecutive duplicates in the initial set
    for (let i = 1; i < shuffledItems.length; i++) {
      if (shuffledItems[i].id === shuffledItems[i - 1].id) {
        // Swap with a non-duplicate item
        const swapIndex = (i + 1) % shuffledItems.length;
        [shuffledItems[i], shuffledItems[swapIndex]] = [
          shuffledItems[swapIndex],
          shuffledItems[i],
        ];
      }
    }

    return shuffledItems;
  }, []);

  const setupQuestion = useCallback(
    (correct: ContentItem) => {
      const categoryContent = categoryContentRef.current;
      if (!categoryContent || !isInitialized) return; // Add initialization check

      const wrongOptions = categoryContent.items
        .filter((item) => item.id !== correct.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const allOptions = [...wrongOptions, correct].sort(
        () => Math.random() - 0.5
      );

      setCurrentItem(correct);
      setOptions(allOptions);
      setFeedback(null);
      setCanProceed(false);

      if (settings.timerEnabled) {
        setTimeLeft(settings.timerDuration);
      }
    },
    [settings.timerDuration, settings.timerEnabled, isInitialized]
  );

  const generateQuestion = useCallback(() => {
    if (!isInitialized) return; // Add initialization check

    if (currentIndex >= questionSet.length || questionSet.length === 0) {
      const newSet = generateNewSet();
      setQuestionSet(newSet);
      setCurrentIndex(0);

      if (newSet.length > 0) {
        setupQuestion(newSet[0]);
        lastQuestionRef.current = newSet[0].id;
      }
    } else {
      const nextQuestion = questionSet[currentIndex];

      if (nextQuestion.id === lastQuestionRef.current) {
        const alternateIndex = (currentIndex + 1) % questionSet.length;
        setCurrentIndex(alternateIndex);
        setupQuestion(questionSet[alternateIndex]);
        lastQuestionRef.current = questionSet[alternateIndex].id;
      } else {
        setupQuestion(nextQuestion);
        lastQuestionRef.current = nextQuestion.id;
        setCurrentIndex((prev) => prev + 1);
      }
    }
  }, [currentIndex, questionSet, generateNewSet, setupQuestion, isInitialized]);

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
  }, [currentItem, feedback, settings.timerEnabled, playSound]);

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
            setCurrentIndex((prev) => prev + 1);
            generateQuestion();
          }
        }, 500);
      } else {
        playSound("/sounds/error.mp3");
        setWrongAnswers((prev) => [
          ...prev,
          {
            question: currentItem,
            playerAnswer: selected,
          },
        ]);

        setFeedback({
          correct: false,
          message: `Incorrect. The answer was:`,
          answer: currentItem.meaning,
        });
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
      wrongAnswers,
      playSound,
    ]
  );

  const handleNextQuestion = useCallback(() => {
    const newTotal = totalQuestions + 1;
    if (newTotal >= settings.questionsPerRound) {
      onGameOver(score, wrongAnswers);
    } else {
      setTotalQuestions(newTotal);
      setCurrentIndex((prev) => prev + 1);
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

  useEffect(() => {
    const initialSet = generateNewSet();

    // Set up initial question directly without using setupQuestion
    if (initialSet.length > 0) {
      const firstQuestion = initialSet[0];
      const categoryContent = categoryContentRef.current;

      if (categoryContent) {
        const wrongOptions = categoryContent.items
          .filter((item) => item.id !== firstQuestion.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const allOptions = [...wrongOptions, firstQuestion].sort(
          () => Math.random() - 0.5
        );

        // Set all initial state synchronously
        setQuestionSet(initialSet);
        setCurrentIndex(0);
        setCurrentItem(firstQuestion);
        setOptions(allOptions);
        lastQuestionRef.current = firstQuestion.id;

        if (settings.timerEnabled) {
          setTimeLeft(settings.timerDuration);
        }
      }
    }

    // Mark as initialized only after everything is set up
    setIsInitialized(true);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
