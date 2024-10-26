import { StoredSettings } from "@/types/StoredSettings";
import { DEFAULT_SETTINGS } from "@/constants/settings";

const STORAGE_KEY = "thai-game-settings";

export const loadStoredSettings = (): StoredSettings => {
  if (typeof window === "undefined") {
    return {
      game: DEFAULT_SETTINGS,
      theme: "light",
      sound: true,
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      game: DEFAULT_SETTINGS,
      theme: "light",
      sound: true,
    };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return {
      game: DEFAULT_SETTINGS,
      theme: "light",
      sound: true,
    };
  }
};

export const saveStoredSettings = (settings: Partial<StoredSettings>) => {
  if (typeof window === "undefined") return;

  const current = loadStoredSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
