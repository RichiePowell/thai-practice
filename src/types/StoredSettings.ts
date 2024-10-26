export interface StoredGameSettings {
  timerEnabled: boolean;
  timerDuration: number;
  showRomanized: boolean;
  questionsPerRound: number;
  autoSpeak: boolean;
}

export interface StoredSettings {
  game: StoredGameSettings;
  theme: "light" | "dark";
  sound: boolean;
}
