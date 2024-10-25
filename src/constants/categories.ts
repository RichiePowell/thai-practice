// src/constants/categories.ts
import { LearningCategory } from "@/types/LearningCategory";
import { isContentAvailable } from "./content/index";

const ALL_CATEGORIES: LearningCategory[] = [
  {
    id: "thai-script",
    title: "Thai Script",
    description:
      "Learn to read and write Thai consonants, vowels, and tone marks",
    icon: "Book",
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
    id: "thai-script-intermediate",
    title: "Intermediate Thai Script",
    description: "Learn complex consonants, vowel combinations, and tone rules",
    icon: "Book",
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
    id: "pronouns",
    title: "Pronouns & Polite Particles",
    description: "Master Thai personal pronouns and polite particles",
    icon: "Users",
    difficulty: "advanced",
  },
  {
    id: "classifiers",
    title: "Classifiers",
    description: "Learn Thai noun classifiers and their usage",
    icon: "LayoutGrid",
    difficulty: "advanced",
  },
  {
    id: "thai-script-advanced",
    title: "Advanced Thai Script",
    description:
      "Master rare characters, Sanskrit influences, and special symbols",
    icon: "Book",
    difficulty: "advanced",
  },
];

// Only export categories that have content
export const LEARNING_CATEGORIES = ALL_CATEGORIES.filter((category) =>
  isContentAvailable(category.id)
);
