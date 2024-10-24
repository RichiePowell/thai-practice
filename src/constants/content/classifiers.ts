import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const classifiers: PhraseContent[] = [
  {
    id: "classifier-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "คน",
    romanized: "khon",
    meaning: "people/person",
  },
  {
    id: "classifier-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "ตัว",
    romanized: "tua",
    meaning: "animals/things",
  },
  {
    id: "classifier-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "ลูก",
    romanized: "lûuk",
    meaning: "round objects",
  },
  {
    id: "classifier-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "ชิ้น",
    romanized: "chín",
    meaning: "flat objects",
  },
  {
    id: "classifier-5",
    type: "phrase",
    difficulty: "beginner",
    thai: "ห้อง",
    romanized: "hǒng",
    meaning: "rooms/buildings",
  },
  {
    id: "classifier-6",
    type: "phrase",
    difficulty: "beginner",
    thai: "เล่ม",
    romanized: "lêm",
    meaning: "books",
  },
  {
    id: "classifier-7",
    type: "phrase",
    difficulty: "beginner",
    thai: "คัน",
    romanized: "khan",
    meaning: "vehicles",
  },
  {
    id: "classifier-8",
    type: "phrase",
    difficulty: "beginner",
    thai: "ดอก",
    romanized: "dòk",
    meaning: "flowers",
  },
  {
    id: "classifier-9",
    type: "phrase",
    difficulty: "beginner",
    thai: "ใบ",
    romanized: "bai",
    meaning: "leaves/sheets",
  },
  {
    id: "classifier-10",
    type: "phrase",
    difficulty: "beginner",
    thai: "ด้าม",
    romanized: "dâam",
    meaning: "long/cylindrical objects",
  },
];

export const classifiersContent: CategoryContent = {
  categoryId: "classifiers",
  items: classifiers,
};
