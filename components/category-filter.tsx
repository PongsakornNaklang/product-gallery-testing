"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategories } from "../hooks/use-categories"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { data: categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Loading categories..." />
        </SelectTrigger>
      </Select>
    )
  }

  return (
    <Select value={selectedCategory} onValueChange={onCategoryChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories?.map((category) => (
          <SelectItem key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
