"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ThaiPhrase } from "@/types/ThaiPhrase";
import type { FeedbackType } from "@/types/FeedbackType";
import type { GameSettings } from "@/types/GameSettings";
import { THAI_PHRASES } from "@/constants/phrases";
import { HISTORY_LENGTH } from "@/constants/config";

const useGameLogic = (
  settings: GameSettings,
  onGameOver: (score: number) => void
) => {
  const [currentPhrase, setCurrentPhrase] = useState<ThaiPhrase | null>(null);
  const [options, setOptions] = useState<ThaiPhrase[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [timeLeft, setTimeLeft] = useState(settings.timerDuration);
  const [canProceed, setCanProceed] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<ThaiPhrase[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateQuestion = useCallback(() => {
    const availablePhrases = THAI_PHRASES.filter(
      (phrase) => !questionHistory.includes(phrase)
    );

    const phrasesToUse =
      availablePhrases.length > 0
        ? availablePhrases
        : THAI_PHRASES.filter((phrase) => phrase !== currentPhrase);

    const randomIndex = Math.floor(Math.random() * phrasesToUse.length);
    const correct = phrasesToUse[randomIndex];

    setQuestionHistory((prev) => {
      const newHistory = [...prev, correct];
      return newHistory.slice(-HISTORY_LENGTH);
    });

    const wrongOptions = THAI_PHRASES.filter((phrase) => phrase !== correct)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const allOptions = [...wrongOptions, correct].sort(
      () => 0.5 - Math.random()
    );

    setCurrentPhrase(correct);
    setOptions(allOptions);
    setFeedback(null);
    setCanProceed(false);

    if (settings.timerEnabled) {
      setTimeLeft(settings.timerDuration);
    }
  }, [questionHistory, settings.timerDuration, settings.timerEnabled]);

  const handleTimeUp = () => {
    if (!currentPhrase) return;

    setFeedback({
      correct: false,
      message: `Time's up! The answer was "${currentPhrase.thai}" (${currentPhrase.romanized})`,
    });
    setCanProceed(true);
  };

  const handleAnswer = (selected: ThaiPhrase) => {
    if (feedback || !currentPhrase) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    if (selected === currentPhrase) {
      setScore((prev) => prev + 1);
      setFeedback({
        correct: true,
        message: `Correct! "${currentPhrase.thai}" (${currentPhrase.romanized})`,
      });
    } else {
      setFeedback({
        correct: false,
        message: `Incorrect. The answer was "${currentPhrase.thai}" (${currentPhrase.romanized})`,
      });
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
      currentPhrase
    ) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, settings.timerEnabled, feedback, currentPhrase]);

  return {
    currentPhrase,
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
