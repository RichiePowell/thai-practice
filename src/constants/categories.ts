// src/constants/categories.ts
import { LearningCategory } from "@/types/LearningCategory";
import { isContentAvailable } from "./content/index";

// Group categories by difficulty
const BEGINNER_CATEGORIES: LearningCategory[] = [
  {
    id: "thai-script",
    title: "Thai Script",
    description:
      "Learn to read and write Thai consonants, vowels, and tone marks",
    icon: "GraduationCap",
    difficulty: "beginner",
  },
  {
    id: "common-phrases",
    title: "Common Phrases",
    description: "Essential everyday expressions and greetings",
    icon: "MessageSquare",
    difficulty: "beginner",
  },
  {
    id: "numbers",
    title: "Numbers & Counting",
    description: "Learn numbers, counting, and basic math terms",
    icon: "Hash",
    difficulty: "beginner",
  },
  {
    id: "food-drink",
    title: "Food & Drink",
    description: "Common dishes, ingredients, and ordering phrases",
    icon: "UtensilsCrossed",
    difficulty: "beginner",
  },
  {
    id: "time-calendar",
    title: "Time & Calendar",
    description: "Learn to tell time and express dates in Thai",
    icon: "Clock",
    difficulty: "beginner",
  },
  {
    id: "colors",
    title: "Colors",
    description: "Learn common colors and basic descriptive terms",
    icon: "Palette",
    difficulty: "beginner",
  },
  {
    id: "question-words",
    title: "Question Words",
    description: "Master the essential words for asking questions in Thai",
    icon: "HelpCircle",
    difficulty: "beginner",
  },
];

const INTERMEDIATE_CATEGORIES: LearningCategory[] = [
  {
    id: "thai-script-intermediate",
    title: "Intermediate Thai Script",
    description: "Learn complex consonants, vowel combinations, and tone rules",
    icon: "BookOpen",
    difficulty: "intermediate",
  },
  {
    id: "travel",
    title: "Travel & Transport",
    description: "Navigate Thailand with essential travel vocabulary",
    icon: "Plane",
    difficulty: "intermediate",
  },
  {
    id: "directions",
    title: "Directions",
    description: "Learn to give and receive directions in Thai",
    icon: "Map",
    difficulty: "intermediate",
  },
  {
    id: "family-relationships",
    title: "Family & Relationships",
    description: "Learn family member names and relationship terms",
    icon: "Users2",
    difficulty: "intermediate",
  },
];

const ADVANCED_CATEGORIES: LearningCategory[] = [
  {
    id: "thai-script-advanced",
    title: "Advanced Thai Script",
    description:
      "Master rare characters, Sanskrit influences, and special symbols",
    icon: "BookText",
    difficulty: "advanced",
  },
  {
    id: "pronouns",
    title: "Pronouns & Polite Particles",
    description: "Master Thai personal pronouns and polite particles",
    icon: "User",
    difficulty: "advanced",
  },
  {
    id: "classifiers",
    title: "Classifiers",
    description: "Learn Thai noun classifiers and their usage",
    icon: "LayoutGrid",
    difficulty: "advanced",
  },
];

const ALL_CATEGORIES = [
  ...BEGINNER_CATEGORIES,
  ...INTERMEDIATE_CATEGORIES,
  ...ADVANCED_CATEGORIES,
];

// Only export categories that have content
export const LEARNING_CATEGORIES = ALL_CATEGORIES.filter((category) =>
  isContentAvailable(category.id)
);

export { BEGINNER_CATEGORIES, INTERMEDIATE_CATEGORIES, ADVANCED_CATEGORIES };
