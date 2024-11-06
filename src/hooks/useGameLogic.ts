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
  categories: LearningCategory[]; // Changed from single category to array
}

const useGameLogic = ({
  settings = DEFAULT_SETTINGS,
  onGameOver,
  categories,
}: UseGameLogicParams) => {
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);
  const [currentCategory, setCurrentCategory] =
    useState<LearningCategory | null>(null);
  const [options, setOptions] = useState<ContentItem[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [timeLeft, setTimeLeft] = useState(
    settings?.timerDuration ?? DEFAULT_SETTINGS.timerDuration
  );
  const [canProceed, setCanProceed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { playSound } = useAudio();
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);

  // Combined items from all selected categories
  const allItemsRef = useRef<ContentItem[]>([]);
  const [questionSet, setQuestionSet] = useState<ContentItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastQuestionRef = useRef<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize combined items from all categories
  useEffect(() => {
    const items: ContentItem[] = [];
    const categoryContentMap = new Map<string, ContentItem[]>();

    categories.forEach((category) => {
      const content = CATEGORY_CONTENT[category.id];
      if (content) {
        categoryContentMap.set(category.id, content.items);
        items.push(...content.items);
      }
    });

    allItemsRef.current = items;
    setIsInitialized(true);
  }, [categories]);

  const generateNewSet = useCallback(() => {
    if (allItemsRef.current.length === 0) return [];

    // Shuffle all items
    const shuffledItems = [...allItemsRef.current].sort(
      () => Math.random() - 0.5
    );

    // Ensure no consecutive duplicates
    for (let i = 1; i < shuffledItems.length; i++) {
      if (shuffledItems[i].id === shuffledItems[i - 1].id) {
        const swapIndex = (i + 1) % shuffledItems.length;
        [shuffledItems[i], shuffledItems[swapIndex]] = [
          shuffledItems[swapIndex],
          shuffledItems[i],
        ];
      }
    }

    return shuffledItems;
  }, []);

  const findCategoryForItem = useCallback(
    (item: ContentItem): LearningCategory | null => {
      for (const category of categories) {
        const categoryContent = CATEGORY_CONTENT[category.id];
        if (
          categoryContent &&
          categoryContent.items.some((i) => i.id === item.id)
        ) {
          return category;
        }
      }
      return null;
    },
    [categories]
  );

  const setupQuestion = useCallback(
    (correct: ContentItem) => {
      if (!isInitialized || allItemsRef.current.length === 0) return;

      // Find which category this item belongs to
      const category = findCategoryForItem(correct);
      setCurrentCategory(category);

      let wrongAnswerPool: ContentItem[] = [];

      if (category) {
        const categoryContent = CATEGORY_CONTENT[category.id];

        if (categoryContent?.settings?.restrictAnswersToCategory) {
          // If this category is restricted, only use answers from this category
          wrongAnswerPool = categoryContent.items.filter(
            (item) => item.id !== correct.id
          );
        } else {
          // For unrestricted categories, we need to:
          // 1. Exclude the current item
          // 2. Only include items from the same category or other unrestricted categories
          wrongAnswerPool = allItemsRef.current.filter((item) => {
            // Skip the current item
            if (item.id === correct.id) return false;

            // Find the category of this potential answer
            const itemCategory = findCategoryForItem(item);
            if (!itemCategory) return false; // If we can't find the category, exclude it

            const itemCategoryContent = CATEGORY_CONTENT[itemCategory.id];

            // If the item's category is restricted, exclude it
            if (itemCategoryContent?.settings?.restrictAnswersToCategory) {
              return false;
            }

            // Include items from same category or other unrestricted categories
            return true;
          });
        }
      }

      // Ensure we have enough wrong answers
      if (wrongAnswerPool.length < 3) {
        console.warn(
          "Not enough wrong answers in pool:",
          wrongAnswerPool.length
        );
        // Fallback to same category items if pool is too small
        const categoryContent = CATEGORY_CONTENT[category?.id ?? ""];
        if (categoryContent) {
          wrongAnswerPool = categoryContent.items.filter(
            (item) => item.id !== correct.id
          );
        }
      }

      const wrongOptions = wrongAnswerPool
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
    [
      settings.timerDuration,
      settings.timerEnabled,
      isInitialized,
      findCategoryForItem,
    ]
  );

  const generateQuestion = useCallback(() => {
    if (!isInitialized) return;

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

    playSound("error");

    setFeedback({
      correct: false,
      message: `Time's up! The answer was:`,
      answer: currentItem.meaning,
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
        playSound("success");
        setFeedback({
          correct: true,
          selectedId: selected.id,
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
        playSound("error");
        setWrongAnswers((prev) => [
          ...prev,
          {
            question: currentItem,
            playerAnswer: selected,
          },
        ]);

        setFeedback({
          correct: false,
          selectedId: selected.id,
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

  // Initial setup
  useEffect(() => {
    const initialSet = generateNewSet();

    if (initialSet.length > 0) {
      const firstQuestion = initialSet[0];
      const category = findCategoryForItem(firstQuestion);

      const wrongOptions = allItemsRef.current
        .filter((item) => item.id !== firstQuestion.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const allOptions = [...wrongOptions, firstQuestion].sort(
        () => Math.random() - 0.5
      );

      setQuestionSet(initialSet);
      setCurrentIndex(0);
      setCurrentItem(firstQuestion);
      setCurrentCategory(category);
      setOptions(allOptions);
      lastQuestionRef.current = firstQuestion.id;

      if (settings.timerEnabled) {
        setTimeLeft(settings.timerDuration);
      }
    }

    setIsInitialized(true);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [
    settings.timerEnabled,
    settings.timerDuration,
    generateNewSet,
    findCategoryForItem,
  ]);

  // Timer logic
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
    currentCategory,
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
