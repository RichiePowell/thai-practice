export type LearningCategoryId =
  | "thai-script"
  | "common-phrases"
  | "numbers"
  | "tones"
  | "food-drink"
  | "travel"
  | "directions"
  | "pronouns"
  | "classifiers";

export interface LearningCategory {
  id: LearningCategoryId;
  title: string;
  description: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}
