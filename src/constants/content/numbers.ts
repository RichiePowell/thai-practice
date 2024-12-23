import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const numbers: PhraseContent[] = [
  {
    id: "number-0",
    difficulty: "beginner",
    thai: "ศูนย์",
    romanized: "song",
    meaning: "0 (zero)",
  },
  {
    id: "number-1",
    difficulty: "beginner",
    thai: "หนึ่ง",
    romanized: "neung",
    meaning: "1 (one)",
  },
  {
    id: "number-2",
    difficulty: "beginner",
    thai: "สอง",
    romanized: "song",
    meaning: "2 (two)",
  },
  {
    id: "number-3",
    difficulty: "beginner",
    thai: "สาม",
    romanized: "saam",
    meaning: "3 (three)",
  },
  {
    id: "number-4",
    difficulty: "beginner",
    thai: "สี่",
    romanized: "see",
    meaning: "4 (four)",
  },
  {
    id: "number-5",
    difficulty: "beginner",
    thai: "ห้า",
    romanized: "haa",
    meaning: "5 (five)",
  },
  {
    id: "number-6",
    difficulty: "beginner",
    thai: "หก",
    romanized: "hok",
    meaning: "6 (six)",
  },
  {
    id: "number-7",
    difficulty: "beginner",
    thai: "เจ็ด",
    romanized: "jet",
    meaning: "7 (seven)",
  },
  {
    id: "number-8",
    difficulty: "beginner",
    thai: "แปด",
    romanized: "paet",
    meaning: "8 (eight)",
  },
  {
    id: "number-9",
    difficulty: "beginner",
    thai: "เก้า",
    romanized: "kao",
    meaning: "9 (nine)",
  },
  {
    id: "number-10",
    difficulty: "beginner",
    thai: "สิบ",
    romanized: "sip",
    meaning: "10 (ten)",
  },
  {
    id: "number-11",
    difficulty: "beginner",
    thai: "สิบเอ็ด",
    romanized: "sip-et",
    meaning: "11 (eleven)",
  },
  {
    id: "number-12",
    difficulty: "beginner",
    thai: "สิบสอง",
    romanized: "sip-song",
    meaning: "12 (twelve)",
  },
  {
    id: "number-13",
    difficulty: "beginner",
    thai: "สิบสาม",
    romanized: "sip-saam",
    meaning: "13 (thirteen)",
  },
  {
    id: "number-14",
    difficulty: "beginner",
    thai: "สิบสี่",
    romanized: "sip-see",
    meaning: "14 (fourteen)",
  },
  {
    id: "number-15",
    difficulty: "beginner",
    thai: "สิบห้า",
    romanized: "sip-haa",
    meaning: "15 (fifteen)",
  },
];

export const numbersContent: CategoryContent = {
  categoryId: "numbers",
  items: numbers,
  settings: {
    restrictAnswersToCategory: true,
  },
};
