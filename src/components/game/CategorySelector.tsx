import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  MessageSquare,
  Hash,
  UtensilsCrossed,
  BookOpen,
  Plane,
  Map,
  User,
  LayoutGrid,
  BookText,
  Clock,
  Users2,
  Palette,
  HelpCircle,
  SortAsc,
  Filter,
  Type,
  Check,
  X,
} from "lucide-react";
import type { LearningCategory } from "@/types/LearningCategory";
import { LEARNING_CATEGORIES } from "@/constants/categories";
import { getCategoryItemCount } from "@/constants/content";

const iconMap = {
  GraduationCap,
  MessageSquare,
  Hash,
  UtensilsCrossed,
  BookOpen,
  Plane,
  Map,
  User,
  LayoutGrid,
  BookText,
  Clock,
  Users2,
  Palette,
  HelpCircle,
  Type,
} as const;

type Difficulty = "all" | "beginner" | "intermediate" | "advanced";
type SortOption = "default" | "alphabetical" | "items";

interface CategorySelectorProps {
  onSelectCategories: (categories: LearningCategory[]) => void;
}

const difficultyColors = {
  beginner:
    "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-200 dark:border-green-800",
  intermediate:
    "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-800",
  advanced:
    "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 border-purple-200 dark:border-purple-800",
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelectCategories,
}) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const filteredAndSortedCategories = useMemo(() => {
    let categories = [...LEARNING_CATEGORIES];

    if (difficulty !== "all") {
      categories = categories.filter(
        (category) => category.difficulty === difficulty
      );
    }

    switch (sortOption) {
      case "alphabetical":
        return categories.sort((a, b) => a.title.localeCompare(b.title));
      case "items":
        return categories.sort(
          (a, b) => getCategoryItemCount(b.id) - getCategoryItemCount(a.id)
        );
      default:
        return categories;
    }
  }, [difficulty, sortOption]);

  const handleCategoryClick = (category: LearningCategory) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category.id)) {
        newSet.delete(category.id);
      } else {
        newSet.add(category.id);
      }
      return newSet;
    });
  };

  const handleClearSelection = () => {
    setSelectedCategories(new Set());
  };

  const handleStartLearning = () => {
    const selectedCategoryObjects = LEARNING_CATEGORIES.filter((category) =>
      selectedCategories.has(category.id)
    );
    onSelectCategories(selectedCategoryObjects);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Choose Categories
        </h2>
        <p className="text-muted-foreground">
          Select one or more categories to learn from
        </p>
      </div>

      <div className="flex flex-wrap gap-2 ">
        {/* Difficulty filters */}
        <div className="flex gap-2 items-center">
          <Filter className="w-4 h-4" />
          <Button
            variant={difficulty === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setDifficulty("all")}
          >
            All
          </Button>
          <Button
            variant={difficulty === "beginner" ? "default" : "outline"}
            size="sm"
            className={difficulty === "beginner" ? "bg-green-600" : ""}
            onClick={() => setDifficulty("beginner")}
          >
            Beginner
          </Button>
          <Button
            variant={difficulty === "intermediate" ? "default" : "outline"}
            size="sm"
            className={difficulty === "intermediate" ? "bg-blue-600" : ""}
            onClick={() => setDifficulty("intermediate")}
          >
            Intermediate
          </Button>
          <Button
            variant={difficulty === "advanced" ? "default" : "outline"}
            size="sm"
            className={difficulty === "advanced" ? "bg-purple-600" : ""}
            onClick={() => setDifficulty("advanced")}
          >
            Advanced
          </Button>
        </div>

        {/* Sort options */}
        <div className="flex gap-2 items-center">
          <SortAsc className="w-4 h-4" />
          <Button
            variant={sortOption === "default" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOption("default")}
          >
            Default
          </Button>
          <Button
            variant={sortOption === "alphabetical" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOption("alphabetical")}
          >
            A-Z
          </Button>
          <Button
            variant={sortOption === "items" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOption("items")}
          >
            Most Items
          </Button>
        </div>

        {/* Clear selection button - only show when categories are selected */}
        {selectedCategories.size > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearSelection}
            className="ml-auto border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground dark:border-destructive dark:text-destructive dark:hover:bg-destructive dark:hover:text-destructive-foreground transition-colors"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Selection
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAndSortedCategories.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          const itemCount = getCategoryItemCount(category.id);
          const isSelected = selectedCategories.has(category.id);

          return (
            <Card
              key={category.id}
              className={`p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-lg p-2 ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10"
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`w-6 h-6 ${
                        isSelected ? "text-primary-foreground" : "text-primary"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-lg text-foreground">
                        {category.title}
                      </h3>
                    </div>
                    <Badge
                      variant="secondary"
                      className={difficultyColors[category.difficulty]}
                    >
                      {category.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {category.description}
                  </p>
                  <div className="text-xs text-muted-foreground/80 flex">
                    <div>{itemCount} items</div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary inline-block ml-auto" />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Sticky button container */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border transition-all duration-300">
        <div className="container max-w-2xl mx-auto p-4">
          {selectedCategories.size > 0 ? (
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleStartLearning}
            >
              Start Game ({selectedCategories.size}{" "}
              {selectedCategories.size === 1 ? "category" : "categories"})
            </Button>
          ) : (
            <p className="text-center text-muted-foreground py-2">
              Select at least one category to begin practicing
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
