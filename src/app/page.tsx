import { Suspense } from "react";
import { GameClient } from "@/components/game/GameClient";
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { GameSkeleton } from "@/components/game/GameSkeleton";

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <Suspense fallback={<GameSkeleton />}>
        <GameClient initialSettings={DEFAULT_SETTINGS} />
      </Suspense>
    </main>
  );
}
