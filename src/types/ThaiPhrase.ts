import { LearningCategoryId } from "./LearningCategory";

export type ThaiPhrase = {
  thai: string;
  romanized: string;
  meaning: string;
  category: LearningCategoryId;
};
