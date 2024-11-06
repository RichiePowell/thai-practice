import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const colors: PhraseContent[] = [
  {
    id: "color-1",
    difficulty: "beginner",
    thai: "สีขาว",
    romanized: "sǐi-khǎao",
    meaning: "white",
  },
  {
    id: "color-2",
    difficulty: "beginner",
    thai: "สีดำ",
    romanized: "sǐi-dam",
    meaning: "black",
  },
  {
    id: "color-3",
    difficulty: "beginner",
    thai: "สีแดง",
    romanized: "sǐi-dɛɛng",
    meaning: "red",
  },
  {
    id: "color-4",
    difficulty: "beginner",
    thai: "สีเขียว",
    romanized: "sǐi-khǐaw",
    meaning: "green",
  },
  {
    id: "color-5",
    difficulty: "beginner",
    thai: "สีน้ำเงิน",
    romanized: "sǐi-nám-ngəən",
    meaning: "blue",
  },
  {
    id: "color-6",
    difficulty: "beginner",
    thai: "สีเหลือง",
    romanized: "sǐi-lʉ̌ang",
    meaning: "yellow",
  },
  {
    id: "color-7",
    difficulty: "beginner",
    thai: "สีส้ม",
    romanized: "sǐi-sôm",
    meaning: "orange",
  },
  {
    id: "color-8",
    difficulty: "beginner",
    thai: "สีชมพู",
    romanized: "sǐi-chom-phuu",
    meaning: "pink",
  },
  {
    id: "color-9",
    difficulty: "beginner",
    thai: "สีน้ำตาล",
    romanized: "sǐi-nám-taan",
    meaning: "brown",
  },
  {
    id: "color-10",
    difficulty: "beginner",
    thai: "สีเทา",
    romanized: "sǐi-thao",
    meaning: "gray",
  },
  {
    id: "color-q-1",
    difficulty: "beginner",
    thai: "สีอะไร",
    romanized: "sǐi-à-rai",
    meaning: "what color?",
  },
];

export const colorsContent: CategoryContent = {
  categoryId: "colors",
  items: colors,
};
