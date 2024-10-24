"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Book,
  MessageSquare,
  Hash,
  Music,
  UtensilsCrossed,
  Plane,
  Map,
  Users,
  LayoutGrid,
} from "lucide-react";
import type { LearningCategory } from "@/types/LearningCategory";
import { LEARNING_CATEGORIES } from "@/constants/categories";
import { getCategoryItemCount } from "@/constants/content";

const iconMap = {
  Book,
  MessageSquare,
  Hash,
  Music,
  UtensilsCrossed,
  Plane,
  Map,
  Users,
  LayoutGrid,
};

interface CategorySelectorProps {
  onSelect: (category: LearningCategory) => void;
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 border-green-200",
  intermediate: "bg-blue-100 text-blue-800 border-blue-200",
  advanced: "bg-purple-100 text-purple-800 border-purple-200",
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelect,
}) => {
  if (LEARNING_CATEGORIES.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Coming Soon!</h2>
        <p className="text-gray-600">
          We're working on adding learning content.
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
        <p className="text-gray-600">Select what you'd like to learn today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEARNING_CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          const itemCount = getCategoryItemCount(category.id);

          return (
            <Card
              key={category.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary"
              onClick={() => onSelect(category)}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <Badge
                      variant="secondary"
                      className={difficultyColors[category.difficulty]}
                    >
                      {category.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {category.description}
                  </p>
                  <div className="text-xs text-gray-500">{itemCount} items</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
