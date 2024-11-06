// src/constants/content/thaiScriptAdvanced.ts
import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

// Rare consonants used in formal/literary Thai
const rareConsonants: PhraseContent[] = [
  {
    id: "consonant-zh",
    difficulty: "advanced",
    thai: "ฌ",
    romanized: "chɔɔ-chəə",
    meaning: "Tree consonant (CH sound)",
    extra: {
      wordThai: "ฌ เฌอ",
      wordMeaning: "tree (archaic)",
      class: "high-class",
      sound: "ch",
    },
  },
  {
    id: "consonant-dt",
    difficulty: "advanced",
    thai: "ฎ",
    romanized: "dɔɔ-chá-daa",
    meaning: "Headdress consonant (D sound)",
    extra: {
      wordThai: "ฎ ชฎา",
      wordMeaning: "headdress",
      class: "mid-class",
      sound: "d",
    },
  },
  {
    id: "consonant-th",
    difficulty: "advanced",
    thai: "ฐ",
    romanized: "thɔɔ-thǎan",
    meaning: "Base consonant (TH sound)",
    extra: {
      wordThai: "ฐ ฐาน",
      wordMeaning: "base/pedestal",
      class: "high-class",
      sound: "th",
    },
  },
];

// Complex vowel combinations used in formal/literary Thai
const complexVowels: PhraseContent[] = [
  {
    id: "vowel-oe-short",
    difficulty: "advanced",
    thai: "เ-ิ",
    romanized: "sara oe",
    meaning: "Short OE vowel sound",
    extra: {
      wordThai: "เกิด",
      wordMeaning: "to be born",
      sound: "short oe",
    },
  },
  {
    id: "vowel-ia-short",
    difficulty: "advanced",
    thai: "เ-ียะ",
    romanized: "sara ia",
    meaning: "Short IA vowel sound",
    extra: {
      wordThai: "เปี๊ยะ",
      wordMeaning: "pastry",
      sound: "short ia",
    },
  },
  {
    id: "vowel-oe-complex",
    difficulty: "advanced",
    thai: "เ-็อ",
    romanized: "sara oe",
    meaning: "Complex OE vowel sound",
    extra: {
      wordThai: "เล็กๆ",
      wordMeaning: "small (repetitive)",
      sound: "short oe",
    },
  },
];

// Sanskrit/Pali characters used in formal writing
const sanskritChars: PhraseContent[] = [
  {
    id: "sanskrit-ru",
    difficulty: "advanced",
    thai: "ฤ",
    romanized: "rɯ",
    meaning: "Sanskrit RU vowel",
    extra: {
      wordThai: "ฤดู",
      wordMeaning: "season",
      sound: "rʉ/ri/rɯ",
    },
  },
  {
    id: "sanskrit-lu",
    difficulty: "advanced",
    thai: "ฦ",
    romanized: "lɯ",
    meaning: "Sanskrit LU vowel",
    extra: {
      wordThai: "ฦๅ",
      wordMeaning: "archaic character",
      sound: "lʉ",
    },
  },
  {
    id: "sanskrit-om",
    difficulty: "advanced",
    thai: "ๆ",
    romanized: "máai-yammók",
    meaning: "Repetition mark",
    extra: {
      wordThai: "เล็กๆ",
      wordMeaning: "small (repetitive)",
      sound: "repeat previous word",
    },
  },
];

// Special characters and symbols
const specialChars: PhraseContent[] = [
  {
    id: "number-indicator",
    difficulty: "advanced",
    thai: "ฯ",
    romanized: "páiyaannói",
    meaning: "Abbreviation mark",
    extra: {
      wordThai: "มหาฯ",
      wordMeaning: "abbreviation marker",
      sound: "indicates abbreviation",
    },
  },
  {
    id: "leader",
    difficulty: "advanced",
    thai: "ฯลฯ",
    romanized: "páiyaanyái",
    meaning: "Et cetera mark",
    extra: {
      wordThai: "ฯลฯ",
      wordMeaning: "et cetera",
      sound: "indicates continuation",
    },
  },
];

export const thaiScriptAdvancedContent: CategoryContent = {
  categoryId: "thai-script-advanced",
  items: [
    ...rareConsonants,
    ...complexVowels,
    ...sanskritChars,
    ...specialChars,
  ],
};
