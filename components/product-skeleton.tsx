"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductSkeletonProps {
  index?: number
}

export function ProductSkeleton({ index = 0 }: ProductSkeletonProps) {
  return (
    <Card
      className="overflow-hidden border border-gray-200 animate-in fade-in-0 slide-in-from-bottom-4"
      style={{
        animationDelay: `${index * 100}ms`,
        animationDuration: "600ms",
        animationFillMode: "both",
      }}
    >
      <CardContent className="p-4">
        {/* Product Image Skeleton */}
        <div className="aspect-[4/3] mb-4">
          <Skeleton className="w-full h-full rounded-lg animate-pulse" />
        </div>

        {/* Brand Skeleton */}
        <div className="mb-2">
          <Skeleton className="h-6 w-20 animate-pulse" />
        </div>

        {/* Product Description Skeleton */}
        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-full animate-pulse" />
          <Skeleton className="h-4 w-3/4 animate-pulse" />
        </div>

        {/* Price Skeleton */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16 animate-pulse" />
            <Skeleton className="h-4 w-12 animate-pulse" />
            <Skeleton className="h-5 w-12 ml-auto animate-pulse" />
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Skeleton className="w-3 h-3 animate-pulse" />
            <Skeleton className="h-3 w-16 animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="w-3 h-3 animate-pulse" />
            <Skeleton className="h-3 w-12 animate-pulse" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-2">
          <Skeleton className="flex-1 h-10 animate-pulse" />
          <Skeleton className="w-10 h-10 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}
