import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const classifiers: PhraseContent[] = [
  {
    id: "classifier-1",
    difficulty: "beginner",
    thai: "คน",
    romanized: "khon",
    meaning: "people/person",
  },
  {
    id: "classifier-2",
    difficulty: "beginner",
    thai: "ตัว",
    romanized: "tua",
    meaning: "animals/things",
  },
  {
    id: "classifier-3",
    difficulty: "beginner",
    thai: "ลูก",
    romanized: "lûuk",
    meaning: "round objects",
  },
  {
    id: "classifier-4",
    difficulty: "beginner",
    thai: "ชิ้น",
    romanized: "chín",
    meaning: "flat objects",
  },
  {
    id: "classifier-5",
    difficulty: "beginner",
    thai: "ห้อง",
    romanized: "hǒng",
    meaning: "rooms/buildings",
  },
  {
    id: "classifier-6",
    difficulty: "beginner",
    thai: "เล่ม",
    romanized: "lêm",
    meaning: "books",
  },
  {
    id: "classifier-7",
    difficulty: "beginner",
    thai: "คัน",
    romanized: "khan",
    meaning: "vehicles",
  },
  {
    id: "classifier-8",
    difficulty: "beginner",
    thai: "ดอก",
    romanized: "dòk",
    meaning: "flowers",
  },
  {
    id: "classifier-9",
    difficulty: "beginner",
    thai: "ใบ",
    romanized: "bai",
    meaning: "leaves/sheets",
  },
  {
    id: "classifier-10",
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
