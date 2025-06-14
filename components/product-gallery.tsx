"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2Icon, Settings2Icon } from "lucide-react"
import { ProductCard } from "./product-card"
import { ProductSkeleton } from "./product-skeleton"
import { BudgetSelector } from "./budget-selector"
import { useProducts } from "../hooks/use-products"
import type { Product } from "../types/product"
import { ProTip } from "@/components/pro-tip"

export function ProductGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
  } = useProducts({
    category: selectedCategory,
  })

  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const allProducts: Product[] = data?.pages.flatMap((page) => page.products) ?? []

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  if (isLoading) {
    return (
      <div className="flex-1 bg-neutral-50">
        <div className="flex items-center justify-between max-w-[1640px] mx-auto p-12 lg:px-12 lg:py-12">
          <div className="flex flex-col items-center justify-center w-full lg:items-start">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2Icon className="size-5 text-white rounded-full" fill="#22c55e" />
              <span className="text-sm text-neutral-500">Last updated 1hr ago</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Product Gallery
              <br />
              <span className="text-3xl text-neutral-900">of Latest Items 2025</span>
            </h1>
          </div>
          <div className="hidden lg:block">
            <Button variant="outline" className="flex items-center gap-2 border-neutral-200 bg-transparent text-neutral-800 font-bold rounded-lg">
              <Settings2Icon className="size-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductSkeleton key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error instanceof Error ? error.message : "An error occurred"}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-neutral-50">
      <div className="flex items-center justify-between max-w-[1640px] mx-auto p-12 lg:px-12 lg:py-12">
        <div className="flex flex-col items-center justify-center w-full lg:items-start">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2Icon className="size-5 text-white rounded-full" fill="#22c55e" />
            <span className="text-sm text-neutral-500">Last updated 1hr ago</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Product Gallery</h1>
          <h1 className="text-3xl font-bold text-neutral-900">of Latest Items 2025</h1>
        </div>
        <div className="hidden lg:block">
          <Button variant="outline" className="flex items-center gap-2 border-neutral-200 bg-transparent text-neutral-800 font-bold rounded-lg">
            <Settings2Icon className="size-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isFetching && !isFetchingNextPage && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-30 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-neutral-600" />
              <p className="text-neutral-600 text-sm">Updating products...</p>
            </div>
          </div>
        )}

        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 mb-8 transition-opacity duration-200 ${isPlaceholderData ? "opacity-50" : "opacity-100"
            }`}
        >
          {allProducts.map((product, index) => {
            const isWinner = index === 0 || index === 4
            const isWalMart = index % 2 === 0
            if (index === 5) {
              return (
                <React.Fragment key={`budget-${index}`}>
                  <div className="col-span-1 hidden xl:block">
                    <BudgetSelector />
                  </div>
                  <div className="col-span-1 xl:hidden">
                    <ProTip />
                  </div>
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWinner={isWinner}
                    isWalMart={isWalMart}
                    isAmazon={!isWalMart}
                  />
                </React.Fragment>
              )
            }

            return <ProductCard
              key={product.id}
              product={product}
              isWinner={isWinner}
              isWalMart={isWalMart}
              isAmazon={!isWalMart}
            />
          })}
        </div>

        {isFetchingNextPage && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-neutral-600" />
            <p className="text-neutral-600">Loading more products...</p>
          </div>
        )}

        <div ref={loadMoreRef} className="h-10" />

        {hasNextPage && !isFetchingNextPage && (
          <div className="text-center">
            <Button variant="outline" className="px-8 py-3 text-lg" onClick={() => fetchNextPage()}>
              Show more
            </Button>
          </div>
        )}

        {!hasNextPage && allProducts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-neutral-500">You've seen all available products!</p>
          </div>
        )}

        {allProducts.length === 0 && !isLoading && !isFetching && (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-lg mb-2">No products found</p>
            <p className="text-neutral-400 text-sm">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
