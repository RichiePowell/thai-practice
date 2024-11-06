import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const phrases: PhraseContent[] = [
  // Basic Responses
  {
    id: "basic-2",
    difficulty: "beginner",
    thai: "ไม่เป็นไร",
    romanized: "mai pen rai",
    meaning: "you're welcome/no worries",
  },
  {
    id: "response-2",
    difficulty: "beginner",
    thai: "ไม่ดี",
    romanized: "mai dee",
    meaning: "not good",
  },
  {
    id: "comm-2",
    difficulty: "beginner",
    thai: "ไม่เข้าใจ",
    romanized: "mai kao jai",
    meaning: "don't understand",
  },
  {
    id: "response-4",
    difficulty: "beginner",
    thai: "ไม่ได้",
    romanized: "mai dai",
    meaning: "cannot",
  },

  // Common Questions
  {
    id: "question-1",
    difficulty: "beginner",
    thai: "คุณชื่ออะไร",
    romanized: "khun chuu arai",
    meaning: "what is your name?",
  },
  {
    id: "question-2",
    difficulty: "beginner",
    thai: "สบายดีไหม",
    romanized: "sabai dee mai",
    meaning: "how are you?",
  },
  {
    id: "question-3",
    difficulty: "beginner",
    thai: "เท่าไหร่",
    romanized: "tao rai",
    meaning: "how much?",
  },

  // Communication
  {
    id: "comm-3",
    difficulty: "beginner",
    thai: "พูดช้าๆ",
    romanized: "pood cha cha",
    meaning: "speak slowly",
  },
  {
    id: "comm-4",
    difficulty: "beginner",
    thai: "พูดอีกครั้ง",
    romanized: "pood eek krang",
    meaning: "say it again",
  },

  // Courtesy Expressions
  {
    id: "courtesy-3",
    difficulty: "beginner",
    thai: "ขอโทษที่รบกวน",
    romanized: "kho thot tee rob guan",
    meaning: "sorry to bother you",
  },
  {
    id: "courtesy-4",
    difficulty: "beginner",
    thai: "ขอความกรุณา",
    romanized: "khor kwam ga-ru-na",
    meaning: "may I kindly ask",
  },
];

export const commonPhrasesContent: CategoryContent = {
  categoryId: "common-phrases",
  items: phrases,
};
