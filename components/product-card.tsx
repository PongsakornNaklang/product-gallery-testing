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
  isWalMart?: boolean
  isAmazon?: boolean
}

export function ProductCard({
  product,
  isWinner = false,
  isWalMart = false,
  isAmazon = false,
}: ProductCardProps) {
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
      {isWalMart && (
        <div className="absolute top-3 right-3 z-10">
          <img
            src="/store1.svg"
            alt="Logo"
            className="size-10 object-contain"
          />
        </div>
      )}
      {isAmazon && (
        <div className="absolute top-3 right-3 z-10">
          <img
            src="/store2.svg"
            alt="Logo"
            className="size-10 object-contain"
          />
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

        <div className="mb-3">
          <h3
            className="font-bold text-xl text-neutral-800"
            style={{
              lineHeight: "20px",
            }}
          >
            {product.brand || product.title}
          </h3>
        </div>

        <div className="mb-6">
          <p
            className="text-base text-neutral-500 line-clamp-2 leading-relaxed"
            style={{
              lineHeight: "20.8px",
            }}
          >
            {product.description}
          </p>
        </div>

        <div className="mb-3 border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-neutral-900">${discountedPrice.toFixed(2)}+</span>
            {hasDiscount && (
              <>
                {/* <span className="text-sm text-neutral-500 line-through">${product.price.toFixed(2)}</span> */}
                <Badge variant="outline" className="text-xs font-medium rounded-sm border-neutral-700">
                  {Math.round(product.discountPercentage)}% OFF
                </Badge>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <Truck className="size-4" />
            <span className="hidden lg:block">Free shipping</span>
          </div>
          <div className="flex items-center gap-1">
            <Gift className="size-4" />
            <span className="hidden lg:block">Free gift</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size={"sm"}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full text-base"
          >
            View Deal
            <ArrowUpRight className="size-6" strokeWidth={2} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full p-1 size-9 border-green-700 text-green-700 hover:bg-green-700 group"
            onClick={handleWishlistToggle}
          >
            {
              inWishlist ? (
                <Check className="size-4 text-green-700 group-hover:stroke-white" />
              ) : (
                <Heart className="size-4 text-green-700 group-hover:stroke-white group-hover:fill-white" />
              )
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
