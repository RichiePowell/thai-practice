import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const questionWords: PhraseContent[] = [
  // Who
  {
    id: "who-1",
    difficulty: "beginner",
    thai: "ใคร",
    romanized: "khrai",
    meaning: "who",
  },
  {
    id: "who-2",
    difficulty: "beginner",
    thai: "ของใคร",
    romanized: "khɔ̌ɔng-khrai",
    meaning: "whose",
  },

  // What
  {
    id: "what-1",
    difficulty: "beginner",
    thai: "อะไร",
    romanized: "à-rai",
    meaning: "what",
  },
  {
    id: "what-2",
    difficulty: "beginner",
    thai: "ทำอะไร",
    romanized: "tham-à-rai",
    meaning: "what are you doing",
  },

  // Where
  {
    id: "where-1",
    difficulty: "beginner",
    thai: "ที่ไหน",
    romanized: "thîi-nǎi",
    meaning: "where",
  },
  {
    id: "where-2",
    difficulty: "beginner",
    thai: "ไปไหน",
    romanized: "bpai-nǎi",
    meaning: "where are you going",
  },

  // When
  {
    id: "when-1",
    difficulty: "beginner",
    thai: "เมื่อไหร่",
    romanized: "mʉ̂a-rài",
    meaning: "when",
  },
  {
    id: "when-2",
    difficulty: "beginner",
    thai: "กี่โมง",
    romanized: "gìi-moong",
    meaning: "what time",
  },

  // Why
  {
    id: "why-1",
    difficulty: "beginner",
    thai: "ทำไม",
    romanized: "tham-mai",
    meaning: "why",
  },
  {
    id: "why-2",
    difficulty: "beginner",
    thai: "เพราะอะไร",
    romanized: "prɔ́-à-rai",
    meaning: "for what reason",
  },

  // How
  {
    id: "how-1",
    difficulty: "beginner",
    thai: "อย่างไร",
    romanized: "yàang-rai",
    meaning: "how",
  },
  {
    id: "how-2",
    difficulty: "beginner",
    thai: "เท่าไหร่",
    romanized: "thâo-rài",
    meaning: "how much/many",
  },

  // Common Question Particle
  {
    id: "particle-1",
    difficulty: "beginner",
    thai: "ไหม",
    romanized: "mǎi",
    meaning: "yes/no question particle",
  },
  {
    id: "particle-2",
    difficulty: "beginner",
    thai: "หรือ",
    romanized: "rʉ̌ʉ",
    meaning: "or/question particle",
  },
];

export const questionWordsContent: CategoryContent = {
  categoryId: "question-words",
  items: questionWords,
};
