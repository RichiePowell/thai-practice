// src/constants/content/index.ts
import { commonPhrasesContent } from "./commonPhrases";
import type { CategoryContent } from "@/types/ContentTypes";
import type { LearningCategoryId } from "@/types/LearningCategory";
import { thaiScriptContent } from "./thaiScript";
import { numbersContent } from "./numbers";
import { foodAndDrinkContent } from "./foodAndDrink";
import { pronounsContent } from "./pronouns";
import { travelContent } from "./travel";
import { directionContent } from "./directions";
import { classifiersContent } from "./classifiers";
import { thaiScriptAdvancedContent } from "./thaiScriptAdvanced";
import { thaiScriptIntermediateContent } from "./thaiScriptIntermediate";
import { timeAndCalendarContent } from "./timeAndCalendar";
import { familyAndRelationshipsContent } from "./familyAndRelationships";
import { colorsContent } from "./colors";
import { questionWordsContent } from "./questionWords";
import { commonWordsContent } from "./commonWords";
import { advancedNumbersContent } from "./advancedNumbers";
import { intermediateNumbersContent } from "./intermediateNumbers";

export const CATEGORY_CONTENT: Partial<
  Record<LearningCategoryId, CategoryContent>
> = {
  "common-words": commonWordsContent,
  "common-phrases": commonPhrasesContent,
  "thai-script": thaiScriptContent,
  "thai-script-intermediate": thaiScriptIntermediateContent,
  "thai-script-advanced": thaiScriptAdvancedContent,
  numbers: numbersContent,
  "intermediate-numbers": intermediateNumbersContent,
  "advanced-numbers": advancedNumbersContent,
  "food-drink": foodAndDrinkContent,
  travel: travelContent,
  pronouns: pronounsContent,
  directions: directionContent,
  classifiers: classifiersContent,
  "time-calendar": timeAndCalendarContent,
  "family-relationships": familyAndRelationshipsContent,
  colors: colorsContent,
  "question-words": questionWordsContent,
};

// Helper functions
export const isContentAvailable = (categoryId: LearningCategoryId): boolean => {
  return categoryId in CATEGORY_CONTENT;
};

export const getCategoryContent = (
  categoryId: LearningCategoryId
): CategoryContent | undefined => {
  return CATEGORY_CONTENT[categoryId];
};

export const getCategoryItemCount = (
  categoryId: LearningCategoryId
): number => {
  return CATEGORY_CONTENT[categoryId]?.items.length ?? 0;
};

// You might want to add these utility functions for the future:
export const getAvailableCategories = (): LearningCategoryId[] => {
  return Object.keys(CATEGORY_CONTENT) as LearningCategoryId[];
};

export const getTotalContentItems = (): number => {
  return Object.values(CATEGORY_CONTENT).reduce(
    (total, category) => total + (category?.items.length ?? 0),
    0
  );
};
