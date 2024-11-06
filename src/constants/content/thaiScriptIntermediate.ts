import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const highClassConsonants: PhraseContent[] = [
  {
    id: "consonant-kh1",
    difficulty: "intermediate",
    thai: "ข",
    romanized: "khɔɔ-khài",
    meaning: "Egg consonant (KH sound)",
    extra: {
      wordThai: "ข ไข่",
      wordMeaning: "egg",
      class: "high-class",
      sound: "kh",
    },
  },
  {
    id: "consonant-ch",
    difficulty: "intermediate",
    thai: "ฉ",
    romanized: "chɔɔ-chìng",
    meaning: "Cymbals consonant (CH sound)",
    extra: {
      wordThai: "ฉ ฉิ่ง",
      wordMeaning: "cymbals",
      class: "high-class",
      sound: "ch",
    },
  },
  {
    id: "consonant-s1",
    difficulty: "intermediate",
    thai: "ส",
    romanized: "sɔɔ-sʉ̌a",
    meaning: "Tiger consonant (S sound)",
    extra: {
      wordThai: "ส เสือ",
      wordMeaning: "tiger",
      class: "high-class",
      sound: "s",
    },
  },
];

// Complex vowel combinations
const complexVowels: PhraseContent[] = [
  {
    id: "vowel-ae",
    difficulty: "intermediate",
    thai: "แ-ะ",
    romanized: "sara ae",
    meaning: "Short AE vowel sound",
    extra: {
      wordThai: "แพะ",
      wordMeaning: "goat",
      sound: "short ae",
    },
  },
  {
    id: "vowel-ae-long",
    difficulty: "intermediate",
    thai: "แ-",
    romanized: "sara ae",
    meaning: "Long AE vowel sound",
    extra: {
      wordThai: "แพ",
      wordMeaning: "raft",
      sound: "long ae",
    },
  },
  {
    id: "vowel-oo",
    difficulty: "intermediate",
    thai: "ื-อ",
    romanized: "sara ʉʉ",
    meaning: "Long UE vowel sound",
    extra: {
      wordThai: "มือ",
      wordMeaning: "hand",
      sound: "long ʉʉ",
    },
  },
];

// Tone marks with rules
const toneMarks: PhraseContent[] = [
  {
    id: "tone-falling",
    difficulty: "intermediate",
    thai: "้",
    romanized: "mai toh",
    meaning: "Falling tone mark",
    extra: {
      wordThai: "น้ำ",
      wordMeaning: "water",
      sound: "falling tone",
    },
  },
  {
    id: "tone-high",
    difficulty: "intermediate",
    thai: "๊",
    romanized: "mai tri",
    meaning: "High tone mark",
    extra: {
      wordThai: "ม๊าก",
      wordMeaning: "very (informal)",
      sound: "high tone",
    },
  },
  {
    id: "tone-rising",
    difficulty: "intermediate",
    thai: "๋",
    romanized: "mai chattawa",
    meaning: "Rising tone mark",
    extra: {
      wordThai: "เป๋า",
      wordMeaning: "wallet",
      sound: "rising tone",
    },
  },
];

export const thaiScriptIntermediateContent: CategoryContent = {
  categoryId: "thai-script-intermediate",
  items: [...highClassConsonants, ...complexVowels, ...toneMarks],
};
