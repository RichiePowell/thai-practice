// src/constants/content/thaiScript.ts
import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

// Basic consonants that form core vocabulary
const consonants: PhraseContent[] = [
  {
    id: "consonant-k",
    difficulty: "beginner",
    thai: "ก",
    romanized: "gɔɔ-gài",
    meaning: "Chicken consonant (K sound)",
    extra: {
      wordThai: "ก ไก่",
      wordMeaning: "chicken",
      class: "mid-class",
      sound: "k",
    },
  },
  {
    id: "consonant-n",
    difficulty: "beginner",
    thai: "น",
    romanized: "nɔɔ-nuu",
    meaning: "Mouse consonant (N sound)",
    extra: {
      wordThai: "น หนู",
      wordMeaning: "mouse",
      class: "low-class",
      sound: "n",
    },
  },
  {
    id: "consonant-m",
    difficulty: "beginner",
    thai: "ม",
    romanized: "mɔɔ-mǎa",
    meaning: "Horse consonant (M sound)",
    extra: {
      wordThai: "ม ม้า",
      wordMeaning: "horse",
      class: "low-class",
      sound: "m",
    },
  },
];

// Essential vowels for basic word formation
const vowels: PhraseContent[] = [
  {
    id: "vowel-a-short",
    difficulty: "beginner",
    thai: "ะ",
    romanized: "sara a",
    meaning: "Short A vowel",
    extra: {
      wordThai: "จะ",
      wordMeaning: "will",
      sound: "short a",
    },
  },
  {
    id: "vowel-a-long",
    difficulty: "beginner",
    thai: "า",
    romanized: "sara aa",
    meaning: "Long A vowel",
    extra: {
      wordThai: "มา",
      wordMeaning: "come",
      sound: "long aa",
    },
  },
  {
    id: "vowel-i",
    difficulty: "beginner",
    thai: "ิ",
    romanized: "sara i",
    meaning: "Short I vowel",
    extra: {
      wordThai: "มิ",
      wordMeaning: "not",
      sound: "short i",
    },
  },
];

// Simple tone marks for basic pronunciation
const simpleTones: PhraseContent[] = [
  {
    id: "tone-low",
    difficulty: "beginner",
    thai: "่",
    romanized: "mai eek",
    meaning: "Low tone mark",
    extra: {
      wordThai: "ม่า",
      wordMeaning: "mother (informal)",
      sound: "low tone",
    },
  },
];

export const thaiScriptContent: CategoryContent = {
  categoryId: "thai-script",
  items: [...consonants, ...vowels, ...simpleTones],
  settings: {
    restrictAnswersToCategory: true,
  },
};
