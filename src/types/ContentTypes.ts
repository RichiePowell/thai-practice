import type { LearningCategoryId } from "./LearningCategory";

export interface BaseContent {
  id: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  type: "phrase";
  thai: string;
  romanized: string;
  meaning: string;
  extra?: {
    wordThai?: string;
    wordMeaning?: string;
    class?: "low-class" | "mid-class" | "high-class";
    sound?: string;
  };
}

export type PhraseContent = BaseContent;

export type ContentItem = PhraseContent;

export interface CategoryContent {
  categoryId: LearningCategoryId;
  items: ContentItem[];
}