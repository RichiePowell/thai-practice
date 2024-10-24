// src/constants/content/commonPhrases.ts
import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const phrases: PhraseContent[] = [
  // Greetings
  {
    id: "greeting-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "สวัสดี",
    romanized: "sawadee",
    meaning: "hello",
  },
  {
    id: "greeting-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "สวัสดีค่ะ",
    romanized: "sawadee ka",
    meaning: "hello (female speaking)",
  },
  {
    id: "greeting-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "สวัสดีครับ",
    romanized: "sawadee krap",
    meaning: "hello (male speaking)",
  },

  // Basic Responses
  {
    id: "basic-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "ขอบคุณ",
    romanized: "khop khun",
    meaning: "thank you",
  },
  {
    id: "basic-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "ไม่เป็นไร",
    romanized: "mai pen rai",
    meaning: "you're welcome/no worries",
  },
  {
    id: "basic-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "ใช่",
    romanized: "chai",
    meaning: "yes",
  },
  {
    id: "basic-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "ไม่",
    romanized: "mai",
    meaning: "no",
  },

  // Common Questions
  {
    id: "question-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "คุณชื่ออะไร",
    romanized: "khun chuu arai",
    meaning: "what is your name?",
  },
  {
    id: "question-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "สบายดีไหม",
    romanized: "sabai dee mai",
    meaning: "how are you?",
  },
  {
    id: "question-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "เท่าไหร่",
    romanized: "tao rai",
    meaning: "how much?",
  },

  // States and Feelings
  {
    id: "state-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "สบายดี",
    romanized: "sabai dee",
    meaning: "I'm fine",
  },
  {
    id: "state-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "หิว",
    romanized: "hiw",
    meaning: "hungry",
  },
  {
    id: "state-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "เหนื่อย",
    romanized: "neuy",
    meaning: "tired",
  },
  {
    id: "state-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "ร้อน",
    romanized: "ron",
    meaning: "hot (weather/feeling)",
  },

  // Communication
  {
    id: "comm-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "เข้าใจ",
    romanized: "kao jai",
    meaning: "understand",
  },
  {
    id: "comm-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "ไม่เข้าใจ",
    romanized: "mai kao jai",
    meaning: "don't understand",
  },
  {
    id: "comm-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "พูดช้าๆ",
    romanized: "pood cha cha",
    meaning: "speak slowly",
  },
  {
    id: "comm-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "พูดอีกครั้ง",
    romanized: "pood eek krang",
    meaning: "say it again",
  },

  // Courtesy
  {
    id: "courtesy-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "ขอโทษ",
    romanized: "kho thot",
    meaning: "sorry/excuse me",
  },
  {
    id: "courtesy-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "กรุณา",
    romanized: "ga-ru-na",
    meaning: "please",
  },

  // Common Responses
  {
    id: "response-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "ได้",
    romanized: "dai",
    meaning: "can/okay",
  },
  {
    id: "response-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "ไม่ได้",
    romanized: "mai dai",
    meaning: "cannot",
  },
  {
    id: "response-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "ดี",
    romanized: "dee",
    meaning: "good",
  },
  {
    id: "response-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "ไม่ดี",
    romanized: "mai dee",
    meaning: "not good",
  },
];

export const commonPhrasesContent: CategoryContent = {
  categoryId: "common-phrases",
  items: phrases,
};
