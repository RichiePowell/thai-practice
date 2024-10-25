import type { CategoryContent, PhraseContent } from "@/types/ContentTypes";

const timeAndCalendar: PhraseContent[] = [
  // Days of the Week
  {
    id: "day-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "วันจันทร์",
    romanized: "wan-jan",
    meaning: "Monday",
  },
  {
    id: "day-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "วันอังคาร",
    romanized: "wan-ang-khan",
    meaning: "Tuesday",
  },
  {
    id: "day-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "วันพุธ",
    romanized: "wan-phut",
    meaning: "Wednesday",
  },
  {
    id: "day-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "วันพฤหัสบดี",
    romanized: "wan-pha-rue-hat-sa-ba-dee",
    meaning: "Thursday",
  },
  {
    id: "day-5",
    type: "phrase",
    difficulty: "beginner",
    thai: "วันศุกร์",
    romanized: "wan-suk",
    meaning: "Friday",
  },
  {
    id: "day-6",
    type: "phrase",
    difficulty: "beginner",
    thai: "วันเสาร์",
    romanized: "wan-sao",
    meaning: "Saturday",
  },
  {
    id: "day-7",
    type: "phrase",
    difficulty: "beginner",
    thai: "วันอาทิตย์",
    romanized: "wan-aa-thit",
    meaning: "Sunday",
  },

  // Months
  {
    id: "month-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "มกราคม",
    romanized: "ma-ka-ra-khom",
    meaning: "January",
  },
  {
    id: "month-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "กุมภาพันธ์",
    romanized: "kum-pha-phan",
    meaning: "February",
  },
  {
    id: "month-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "มีนาคม",
    romanized: "mee-na-khom",
    meaning: "March",
  },

  // Time-related Words
  {
    id: "time-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "นาฬิกา",
    romanized: "na-li-ka",
    meaning: "o'clock",
  },
  {
    id: "time-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "นาที",
    romanized: "na-thee",
    meaning: "minute",
  },
  {
    id: "time-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "ชั่วโมง",
    romanized: "chua-mong",
    meaning: "hour",
  },

  // Time Expressions
  {
    id: "time-exp-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "เมื่อวาน",
    romanized: "muea-waan",
    meaning: "yesterday",
  },
  {
    id: "time-exp-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "วันนี้",
    romanized: "wan-nee",
    meaning: "today",
  },
  {
    id: "time-exp-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "พรุ่งนี้",
    romanized: "phrung-nee",
    meaning: "tomorrow",
  },
  {
    id: "time-exp-4",
    type: "phrase",
    difficulty: "intermediate",
    thai: "สัปดาห์หน้า",
    romanized: "sap-da-na",
    meaning: "next week",
  },
  {
    id: "time-exp-5",
    type: "phrase",
    difficulty: "intermediate",
    thai: "เดือนที่แล้ว",
    romanized: "duean-thi-laew",
    meaning: "last month",
  },

  // Common Time Questions
  {
    id: "time-q-1",
    type: "phrase",
    difficulty: "intermediate",
    thai: "กี่โมงแล้ว",
    romanized: "kee-mong-laew",
    meaning: "what time is it?",
  },
  {
    id: "time-q-2",
    type: "phrase",
    difficulty: "intermediate",
    thai: "วันไหน",
    romanized: "wan-nai",
    meaning: "which day?",
  },

  // Parts of Day
  {
    id: "day-part-1",
    type: "phrase",
    difficulty: "beginner",
    thai: "เช้า",
    romanized: "chao",
    meaning: "morning",
  },
  {
    id: "day-part-2",
    type: "phrase",
    difficulty: "beginner",
    thai: "บ่าย",
    romanized: "baai",
    meaning: "afternoon",
  },
  {
    id: "day-part-3",
    type: "phrase",
    difficulty: "beginner",
    thai: "เย็น",
    romanized: "yen",
    meaning: "evening",
  },
  {
    id: "day-part-4",
    type: "phrase",
    difficulty: "beginner",
    thai: "กลางคืน",
    romanized: "klaang-khuen",
    meaning: "night",
  },
];

export const timeAndCalendarContent: CategoryContent = {
  categoryId: "time-calendar",
  items: timeAndCalendar,
};
