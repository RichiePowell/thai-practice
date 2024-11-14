import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const intermediateNumbers: PhraseContent[] = [
  {
    id: "number-20",
    difficulty: "intermediate",
    thai: "ยี่สิบ",
    romanized: "yee-sip",
    meaning: "20 (twenty)",
  },
  {
    id: "number-25",
    difficulty: "intermediate",
    thai: "ยี่สิบห้า",
    romanized: "yee-sip-haa",
    meaning: "25 (twenty-five)",
  },
  {
    id: "number-30",
    difficulty: "intermediate",
    thai: "สามสิบ",
    romanized: "saam-sip",
    meaning: "30 (thirty)",
  },
  {
    id: "number-50",
    difficulty: "intermediate",
    thai: "ห้าสิบ",
    romanized: "haa-sip",
    meaning: "50 (fifty)",
  },
  {
    id: "number-75",
    difficulty: "intermediate",
    thai: "เจ็ดสิบห้า",
    romanized: "jet-sip-haa",
    meaning: "75 (seventy-five)",
  },
  {
    id: "number-100",
    difficulty: "intermediate",
    thai: "หนึ่งร้อย",
    romanized: "neung-roi",
    meaning: "100 (one hundred)",
  },
  {
    id: "number-150",
    difficulty: "intermediate",
    thai: "หนึ่งร้อยห้าสิบ",
    romanized: "neung-roi-haa-sip",
    meaning: "150 (one hundred fifty)",
  },
  {
    id: "number-200",
    difficulty: "intermediate",
    thai: "สองร้อย",
    romanized: "song-roi",
    meaning: "200 (two hundred)",
  },
  {
    id: "number-500",
    difficulty: "intermediate",
    thai: "ห้าร้อย",
    romanized: "haa-roi",
    meaning: "500 (five hundred)",
  },
  {
    id: "number-1k",
    difficulty: "intermediate",
    thai: "หนึ่งพัน",
    romanized: "neung-phan",
    meaning: "1,000 (one thousand)",
  },
];

export const intermediateNumbersContent: CategoryContent = {
  categoryId: "intermediate-numbers",
  items: intermediateNumbers,
  settings: {
    restrictAnswersToCategory: true,
  },
};
