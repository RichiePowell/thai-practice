import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const travelPhrases: PhraseContent[] = [
  {
    id: "travel-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "สนามบิน",
    romanized: "sa-naam-bin",
    meaning: "airport",
  },
  {
    id: "travel-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "รถไฟ",
    romanized: "rot-fai",
    meaning: "train",
  },
  {
    id: "travel-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "รถบัส",
    romanized: "rot-bát",
    meaning: "bus",
  },
  {
    id: "travel-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "ท่าเรือ",
    romanized: "tháa-rua",
    meaning: "port/pier",
  },
  {
    id: "travel-5",
    type: "phrase",
    difficulty: "beginner",
    thai: "แผนที่",
    romanized: "phæ̂n-thîi",
    meaning: "map",
  },
  {
    id: "travel-6",
    type: "phrase",
    difficulty: "beginner",
    thai: "ตั๋ว",
    romanized: "dtua",
    meaning: "ticket",
  },
  {
    id: "travel-7",
    type: "phrase",
    difficulty: "beginner",
    thai: "โรงแรม",
    romanized: "rohng-rɛ̌ɛm",
    meaning: "hotel",
  },
  {
    id: "travel-8",
    type: "phrase",
    difficulty: "beginner",
    thai: "ร้านอาหาร",
    romanized: "rân-aa-hăan",
    meaning: "restaurant",
  },
  {
    id: "travel-9",
    type: "phrase",
    difficulty: "beginner",
    thai: "ทางด่วน",
    romanized: "tháaŋ-duan",
    meaning: "highway",
  },
  {
    id: "travel-10",
    type: "phrase",
    difficulty: "beginner",
    thai: "สถานที่ท่องเที่ยว",
    romanized: "sa-tháan-thîi-thoŋ-thîiao",
    meaning: "tourist attraction",
  },
];

export const travelContent: CategoryContent = {
  categoryId: "travel",
  items: travelPhrases,
};