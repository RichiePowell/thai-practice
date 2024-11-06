import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const foodAndDrink: PhraseContent[] = [
  {
    id: "food-1",
    difficulty: "beginner",
    thai: "ข้าว",
    romanized: "khao",
    meaning: "rice",
  },
  {
    id: "food-2",
    difficulty: "beginner",
    thai: "ผัก",
    romanized: "phak",
    meaning: "vegetable",
  },
  {
    id: "food-3",
    difficulty: "beginner",
    thai: "เนื้อ",
    romanized: "neuua",
    meaning: "meat",
  },
  {
    id: "food-4",
    difficulty: "beginner",
    thai: "ปลา",
    romanized: "bplaa",
    meaning: "fish",
  },
  {
    id: "food-5",
    difficulty: "beginner",
    thai: "ผลไม้",
    romanized: "phon-ma-i",
    meaning: "fruit",
  },
  {
    id: "drink-1",
    difficulty: "beginner",
    thai: "น้ำ",
    romanized: "naam",
    meaning: "water",
  },
  {
    id: "drink-2",
    difficulty: "beginner",
    thai: "กาแฟ",
    romanized: "gaa-fae",
    meaning: "coffee",
  },
  {
    id: "drink-3",
    difficulty: "beginner",
    thai: "ชา",
    romanized: "chaa",
    meaning: "tea",
  },
  {
    id: "drink-4",
    difficulty: "beginner",
    thai: "น้ำผลไม้",
    romanized: "naam-phon-ma-i",
    meaning: "fruit juice",
  },
  {
    id: "drink-5",
    difficulty: "beginner",
    thai: "นม",
    romanized: "nom",
    meaning: "milk",
  },
  {
    id: "taste-1",
    difficulty: "beginner",
    thai: "เผ็ด",
    romanized: "phet",
    meaning: "spicy",
  },
];

export const foodAndDrinkContent: CategoryContent = {
  categoryId: "food-drink",
  items: foodAndDrink,
};
