"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import type { ProductsResponse } from "../types/product"

const ITEMS_PER_PAGE = 11

interface UseProductsParams {
  category?: string
}

export function useProducts({ category }: UseProductsParams = {}) {
  return useInfiniteQuery({
    queryKey: ["products", category],
    queryFn: async ({ pageParam = 0 }) => {
      let url = `https://dummyjson.com/products`

      if (category && category !== "all") {
        url = `https://dummyjson.com/products/category/${category}`
      }

      url += `?limit=${ITEMS_PER_PAGE}&skip=${pageParam * ITEMS_PER_PAGE}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data: ProductsResponse = await response.json()
      return data
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * ITEMS_PER_PAGE
      return totalFetched < lastPage.total ? allPages.length : undefined
    },
    initialPageParam: 0,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    // Add placeholderData to keep previous data while loading new data
    placeholderData: (previousData) => previousData,
  })
}
