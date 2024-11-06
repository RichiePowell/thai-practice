export type LearningCategoryId =
  | "thai-script"
  | "thai-script-intermediate"
  | "thai-script-advanced"
  | "common-phrases"
  | "numbers"
  | "tones"
  | "food-drink"
  | "travel"
  | "directions"
  | "pronouns"
  | "classifiers"
  | "time-calendar"
  | "family-relationships"
  | "colors"
  | "question-words"
  | "common-words";

export interface LearningCategory {
  id: LearningCategoryId;
  title: string;
  description: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}
