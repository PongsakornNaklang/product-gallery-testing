"use client"

import { useQuery } from "@tanstack/react-query"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("https://dummyjson.com/products/category-list")
      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }
      const categories: string[] = await response.json()
      return categories
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
