"use client";

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
} as const;

type Difficulty = "all" | "beginner" | "intermediate" | "advanced";
type SortOption = "default" | "alphabetical" | "items";

interface CategorySelectorProps {
  onSelect: (category: LearningCategory) => void;
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
  onSelect,
}) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const filteredAndSortedCategories = useMemo(() => {
    let categories = [...LEARNING_CATEGORIES];

    // Filter by difficulty
    if (difficulty !== "all") {
      categories = categories.filter(
        (category) => category.difficulty === difficulty
      );
    }

    // Sort categories
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

  if (LEARNING_CATEGORIES.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Coming Soon!</h2>
        <p className="text-muted-foreground">
          We&apos;re working on adding learning content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Choose a Category
        </h2>
        <p className="text-muted-foreground">
          Select what you&apos;d like to learn today
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
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
        <div className="flex gap-2 items-center ml-4">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAndSortedCategories.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          const itemCount = getCategoryItemCount(category.id);

          return (
            <Card
              key={category.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border hover:border-primary bg-card"
              onClick={() => onSelect(category)}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  {Icon && <Icon className="w-6 h-6 text-primary" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-foreground">
                      {category.title}
                    </h3>
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
                  <div className="text-xs text-muted-foreground/80">
                    {itemCount} items
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
