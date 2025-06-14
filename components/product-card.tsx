"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Gift, Heart, CrownIcon, ArrowUpRight, Check } from "lucide-react"
import { useWishlist } from "../contexts/wishlist-context"
import type { Product } from "../types/product"

interface ProductCardProps {
  product: Product
  isWinner?: boolean
}

export function ProductCard({ product, isWinner = false }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const hasDiscount = product.discountPercentage > 0
  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Card className="relative overflow-hidden border border-neutral-200 rounded-2xl hover:border-neutral-700 transition-all duration-200">
      {isWinner && (
        <div className="absolute top-0 left-3 z-10">
          <Badge className="bg-[#FFAB0A] text-white text-xs font-medium p-[10px] rounded-t-none rounded-b-md">
            <CrownIcon className="size-4 mr-1 pr-1 border-r" fill="white" />
            Winner
          </Badge>
        </div>
      )}

      <CardContent className="p-4">
        <div className="mb-4 rounded-lg overflow-hidden h-[132px]">
          <img
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mb-2">
          <h3 className="font-semibold text-lg text-neutral-900">{product.brand}</h3>
        </div>

        <div className="mb-4">
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">{product.description}</p>
        </div>

        <div className="mb-3 border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-neutral-900">${discountedPrice.toFixed(2)}</span>
            {hasDiscount && (
              <>
                <span className="text-sm text-neutral-500 line-through">${product.price.toFixed(2)}</span>
                <Badge variant="outline" className="text-xs font-medium rounded-sm border-neutral-700">
                  {Math.round(product.discountPercentage)}% OFF
                </Badge>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3" fill="#737373" />
            <span>Free shipping</span>
          </div>
          <div className="flex items-center gap-1">
            <Gift className="w-3 h-3" fill="#737373" />
            <span>Free gift</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size={"sm"}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full"
          >
            View Deal
            <ArrowUpRight className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full p-1 size-9 border-green-700 text-green-700 hover:bg-transparent"
            onClick={handleWishlistToggle}
          >
            {
              inWishlist ? (
                <Check className="size-4 text-green-700" />
              ) : (
                <Heart className="size-4 text-green-700" />
              )
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
