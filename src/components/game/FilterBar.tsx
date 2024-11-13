import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Difficulty = "all" | "beginner" | "intermediate" | "advanced";

interface FilterBarProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  selectedCount: number;
  onClearSelection: () => void;
  className?: string;
}

const FilterBar = ({
  difficulty,
  onDifficultyChange,
  selectedCount,
  onClearSelection,
  className,
}: FilterBarProps) => {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-2", className)}>
      {/* Filter buttons container */}
      <div className="flex items-center gap-2 flex-grow min-w-0 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        <div className="flex-none flex items-center gap-2">
          <Filter className="w-4 h-4 flex-none mr-2" />
          <Button
            variant={difficulty === "all" ? "default" : "outline"}
            size="sm"
            className="flex-none"
            onClick={() => onDifficultyChange("all")}
          >
            All
          </Button>
        </div>

        <div className="flex gap-2 flex-none">
          <Button
            variant={difficulty === "beginner" ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex-none whitespace-nowrap",
              difficulty === "beginner" && "bg-green-600 hover:bg-green-700"
            )}
            onClick={() => onDifficultyChange("beginner")}
          >
            Beginner
          </Button>

          <Button
            variant={difficulty === "intermediate" ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex-none whitespace-nowrap",
              difficulty === "intermediate" && "bg-blue-600 hover:bg-blue-700"
            )}
            onClick={() => onDifficultyChange("intermediate")}
          >
            Intermediate
          </Button>

          <Button
            variant={difficulty === "advanced" ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex-none whitespace-nowrap",
              difficulty === "advanced" && "bg-purple-600 hover:bg-purple-700"
            )}
            onClick={() => onDifficultyChange("advanced")}
          >
            Advanced
          </Button>
        </div>
      </div>

      {/* Clear selection button */}
      {selectedCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearSelection}
          className="sm:ml-auto border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground dark:border-destructive dark:text-destructive dark:hover:bg-destructive dark:hover:text-destructive-foreground transition-colors whitespace-nowrap"
        >
          <X className="w-4 h-4 mr-1" />
          Clear Selection
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
