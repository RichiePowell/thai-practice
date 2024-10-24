import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const pronouns: PhraseContent[] = [
  {
    id: "pronoun-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "ฉัน",
    romanized: "chan",
    meaning: "I (formal)",
  },
  {
    id: "pronoun-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "ผม",
    romanized: "phom",
    meaning: "I (male speaker)",
  },
  {
    id: "pronoun-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "ดิฉัน",
    romanized: "di-chan",
    meaning: "I (female speaker)",
  },
  {
    id: "pronoun-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "เขา",
    romanized: "khao",
    meaning: "he/she/it",
  },
  {
    id: "pronoun-5",
    type: "phrase",
    difficulty: "beginner",
    thai: "พวกเรา",
    romanized: "phuak-rao",
    meaning: "we",
  },
  {
    id: "pronoun-6",
    type: "phrase",
    difficulty: "beginner",
    thai: "พวกคุณ",
    romanized: "phuak-khun",
    meaning: "you (plural)",
  },
  {
    id: "pronoun-7",
    type: "phrase",
    difficulty: "beginner",
    thai: "คุณ",
    romanized: "khun",
    meaning: "you (singular)",
  },
  {
    id: "pronoun-8",
    type: "phrase",
    difficulty: "beginner",
    thai: "พวกเขา",
    romanized: "phuak-khao",
    meaning: "they",
  },
];

export const pronounsContent: CategoryContent = {
  categoryId: "pronouns",
  items: pronouns,
};
