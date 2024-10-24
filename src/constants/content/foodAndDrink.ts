import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const foodAndDrink: PhraseContent[] = [
  {
    id: "food-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "ข้าว",
    romanized: "khao",
    meaning: "rice",
  },
  {
    id: "food-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "ผัก",
    romanized: "phak",
    meaning: "vegetable",
  },
  {
    id: "food-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "เนื้อ",
    romanized: "neuua",
    meaning: "meat",
  },
  {
    id: "food-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "ปลา",
    romanized: "bplaa",
    meaning: "fish",
  },
  {
    id: "food-5",
    type: "phrase",
    difficulty: "beginner",
    thai: "ผลไม้",
    romanized: "phon-ma-i",
    meaning: "fruit",
  },
  {
    id: "drink-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "น้ำ",
    romanized: "naam",
    meaning: "water",
  },
  {
    id: "drink-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "กาแฟ",
    romanized: "gaa-fae",
    meaning: "coffee",
  },
  {
    id: "drink-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "ชา",
    romanized: "chaa",
    meaning: "tea",
  },
  {
    id: "drink-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "น้ำผลไม้",
    romanized: "naam-phon-ma-i",
    meaning: "fruit juice",
  },
  {
    id: "drink-5",
    type: "phrase",
    difficulty: "beginner",
    thai: "นม",
    romanized: "nom",
    meaning: "milk",
  },
];

export const foodAndDrinkContent: CategoryContent = {
  categoryId: "food-drink",
  items: foodAndDrink,
};
