import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const advancedNumbers: PhraseContent[] = [
  {
    id: "number-2k",
    difficulty: "advanced",
    thai: "สองพัน",
    romanized: "song-phan",
    meaning: "2,000 (two thousand)",
  },
  {
    id: "number-10k",
    difficulty: "advanced",
    thai: "หนึ่งหมื่น",
    romanized: "neung-meun",
    meaning: "10,000 (ten thousand)",
  },
  {
    id: "number-25k",
    difficulty: "advanced",
    thai: "สองหมื่นห้าพัน",
    romanized: "song-meun-haa-phan",
    meaning: "25,000 (twenty-five thousand)",
  },
  {
    id: "number-50k",
    difficulty: "advanced",
    thai: "ห้าหมื่น",
    romanized: "haa-meun",
    meaning: "50,000 (fifty thousand)",
  },
  {
    id: "number-100k",
    difficulty: "advanced",
    thai: "หนึ่งแสน",
    romanized: "neung-saen",
    meaning: "100,000 (one hundred thousand)",
  },
  {
    id: "number-500k",
    difficulty: "advanced",
    thai: "ห้าแสน",
    romanized: "haa-saen",
    meaning: "500,000 (five hundred thousand)",
  },
  {
    id: "number-1m",
    difficulty: "advanced",
    thai: "หนึ่งล้าน",
    romanized: "neung-lan",
    meaning: "1,000,000 (one million)",
  },
  {
    id: "number-10m",
    difficulty: "advanced",
    thai: "สิบล้าน",
    romanized: "sip-lan",
    meaning: "10,000,000 (ten million)",
  },
  {
    id: "number-100m",
    difficulty: "advanced",
    thai: "หนึ่งร้อยล้าน",
    romanized: "neung-roi-lan",
    meaning: "100,000,000 (one hundred million)",
  },
  {
    id: "number-1b",
    difficulty: "advanced",
    thai: "หนึ่งพันล้าน",
    romanized: "neung-phan-lan",
    meaning: "1,000,000,000 (one billion)",
  },
];

export const advancedNumbersContent: CategoryContent = {
  categoryId: "advanced-numbers",
  items: advancedNumbers,
  settings: {
    restrictAnswersToCategory: true,
  },
};
