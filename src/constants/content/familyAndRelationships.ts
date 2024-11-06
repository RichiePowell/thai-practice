import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const familyAndRelationships: PhraseContent[] = [
  // Core Family Terms
  {
    id: "family-1",
    difficulty: "beginner",
    thai: "พ่อ",
    romanized: "phɔ̂ɔ",
    meaning: "father",
  },
  {
    id: "family-2",
    difficulty: "beginner",
    thai: "แม่",
    romanized: "mɛ̂ɛ",
    meaning: "mother",
  },
  {
    id: "family-3",
    difficulty: "beginner",
    thai: "ลูกชาย",
    romanized: "lûuk-chaai",
    meaning: "son",
  },
  {
    id: "family-4",
    difficulty: "beginner",
    thai: "ลูกสาว",
    romanized: "lûuk-sǎao",
    meaning: "daughter",
  },

  // Siblings
  {
    id: "family-5",
    difficulty: "beginner",
    thai: "พี่ชาย",
    romanized: "phîi-chaai",
    meaning: "older brother",
  },
  {
    id: "family-6",
    difficulty: "beginner",
    thai: "พี่สาว",
    romanized: "phîi-sǎao",
    meaning: "older sister",
  },
  {
    id: "family-7",
    difficulty: "beginner",
    thai: "น้องชาย",
    romanized: "nɔ́ɔng-chaai",
    meaning: "younger brother",
  },
  {
    id: "family-8",
    difficulty: "beginner",
    thai: "น้องสาว",
    romanized: "nɔ́ɔng-sǎao",
    meaning: "younger sister",
  },

  // Marriage Relations
  {
    id: "family-9",
    difficulty: "beginner",
    thai: "สามี",
    romanized: "sǎa-mii",
    meaning: "husband",
  },
  {
    id: "family-10",
    difficulty: "beginner",
    thai: "ภรรยา",
    romanized: "phan-ra-yaa",
    meaning: "wife",
  },
  {
    id: "family-11",
    difficulty: "beginner",
    thai: "แฟน",
    romanized: "fɛɛn",
    meaning: "partner/girlfriend/boyfriend",
  },

  // Basic Social Relationships
  {
    id: "relation-1",
    difficulty: "beginner",
    thai: "เพื่อน",
    romanized: "phûean",
    meaning: "friend",
  },
  {
    id: "relation-2",
    difficulty: "beginner",
    thai: "เพื่อนร่วมงาน",
    romanized: "phûean-rûam-ngaan",
    meaning: "colleague",
  },

  // Essential Respectful Terms
  {
    id: "respect-1",
    difficulty: "beginner",
    thai: "พี่",
    romanized: "phîi",
    meaning: "older person (respectful)",
  },
  {
    id: "respect-2",
    difficulty: "beginner",
    thai: "น้อง",
    romanized: "nɔ́ɔng",
    meaning: "younger person (respectful)",
  },

  // Basic Questions
  {
    id: "relation-q-1",
    difficulty: "beginner",
    thai: "มีพี่น้องไหม",
    romanized: "mii-phîi-nɔ́ɔng-mǎi",
    meaning: "do you have siblings?",
  },
  {
    id: "relation-q-2",
    difficulty: "beginner",
    thai: "แต่งงานหรือยัง",
    romanized: "tɛ̀ɛng-ngaan-rʉ̌ʉ-yang",
    meaning: "are you married?",
  },
];

export const familyAndRelationshipsContent: CategoryContent = {
  categoryId: "family-relationships",
  items: familyAndRelationships,
};
