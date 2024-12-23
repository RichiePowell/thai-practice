import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const directionPhrases: PhraseContent[] = [
  {
    id: "direction-1",
    difficulty: "beginner",
    thai: "ไปทางไหน",
    romanized: "bpai taang nai",
    meaning: "Which way do I go?",
  },
  {
    id: "direction-2",
    difficulty: "beginner",
    thai: "ตรงไป",
    romanized: "tróng bpai",
    meaning: "Go straight",
  },
  {
    id: "direction-3",
    difficulty: "beginner",
    thai: "เลี้ยวซ้าย",
    romanized: "lío sái",
    meaning: "Turn left",
  },
  {
    id: "direction-4",
    difficulty: "beginner",
    thai: "เลี้ยวขวา",
    romanized: "lío kăa",
    meaning: "Turn right",
  },
  {
    id: "direction-5",
    difficulty: "beginner",
    thai: "อยู่ตรงนี้",
    romanized: "yùu tróng-ní",
    meaning: "It's right here",
  },
  {
    id: "direction-6",
    difficulty: "beginner",
    thai: "ไกลแค่ไหน",
    romanized: "gai kɛ̀ nai",
    meaning: "How far is it?",
  },
  {
    id: "direction-7",
    difficulty: "beginner",
    thai: "อยู่ใกล้ๆ",
    romanized: "yùu glai glai",
    meaning: "It's nearby",
  },
  {
    id: "direction-8",
    difficulty: "beginner",
    thai: "ไปจนสุดทาง",
    romanized: "bpai jon sùt taang",
    meaning: "Go all the way to the end",
  },
  {
    id: "direction-9",
    difficulty: "beginner",
    thai: "อยู่ตรงข้ามกัน",
    romanized: "yùu tróng kăam gan",
    meaning: "It's across from here",
  },
  {
    id: "direction-10",
    difficulty: "beginner",
    thai: "เดินไปตามถนน",
    romanized: "dern bpai tam tà-nǒn",
    meaning: "Walk down the street",
  },
];

export const directionContent: CategoryContent = {
  categoryId: "directions",
  items: directionPhrases,
};
