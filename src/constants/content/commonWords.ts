import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const words: PhraseContent[] = [
  // Greetings
  {
    id: "greeting-1",
    difficulty: "beginner",
    thai: "สวัสดี",
    romanized: "sawadee",
    meaning: "hello",
  },
  {
    id: "greeting-2",
    difficulty: "beginner",
    thai: "สวัสดีค่ะ",
    romanized: "sawadee ka",
    meaning: "hello (female speaking)",
  },
  {
    id: "greeting-3",
    difficulty: "beginner",
    thai: "สวัสดีครับ",
    romanized: "sawadee krap",
    meaning: "hello (male speaking)",
  },

  // Basic Responses
  {
    id: "basic-1",
    difficulty: "beginner",
    thai: "ขอบคุณ",
    romanized: "khop khun",
    meaning: "thank you",
  },
  {
    id: "basic-2",
    difficulty: "beginner",
    thai: "ใช่",
    romanized: "chai",
    meaning: "yes",
  },
  {
    id: "basic-3",
    difficulty: "beginner",
    thai: "ไม่",
    romanized: "mai",
    meaning: "no",
  },

  // Common Responses
  {
    id: "response-1",
    difficulty: "beginner",
    thai: "ดี",
    romanized: "dee",
    meaning: "good",
  },
  {
    id: "response-3",
    difficulty: "beginner",
    thai: "ได้",
    romanized: "dai",
    meaning: "can/okay",
  },

  // States and Feelings
  {
    id: "state-1",
    difficulty: "beginner",
    thai: "สบายดี",
    romanized: "sabai dee",
    meaning: "fine",
  },
  {
    id: "state-2",
    difficulty: "beginner",
    thai: "หิว",
    romanized: "hiw",
    meaning: "hungry",
  },
  {
    id: "state-3",
    difficulty: "beginner",
    thai: "เหนื่อย",
    romanized: "neuy",
    meaning: "tired",
  },
  {
    id: "state-4",
    difficulty: "beginner",
    thai: "ร้อน",
    romanized: "ron",
    meaning: "hot",
  },

  // Courtesy
  {
    id: "courtesy-1",
    difficulty: "beginner",
    thai: "ขอโทษ",
    romanized: "kho thot",
    meaning: "sorry",
  },
  {
    id: "courtesy-2",
    difficulty: "beginner",
    thai: "กรุณา",
    romanized: "ga-ru-na",
    meaning: "please",
  },

  // Communication
  {
    id: "comm-1",
    difficulty: "beginner",
    thai: "เข้าใจ",
    romanized: "kao jai",
    meaning: "understand",
  },
];

export const commonWordsContent: CategoryContent = {
  categoryId: "common-words",
  items: words,
};
