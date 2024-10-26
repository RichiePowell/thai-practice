"use client";

import { useEffect, useState } from "react";
import { ThaiPhraseGame } from "@/components/game/ThaiPhraseGame";
import { GameSettings } from "@/types/GameSettings";
import { loadStoredSettings } from "@/lib/storage";

export default function Home() {
  const [initialSettings, setInitialSettings] = useState<GameSettings | null>(
    null
  );

  useEffect(() => {
    const stored = loadStoredSettings();
    setInitialSettings(stored.game);
  }, []);

  if (!initialSettings) {
    return null; // or a loading spinner
  }

  return (
    <main className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <ThaiPhraseGame initialSettings={initialSettings} />
    </main>
  );
}
