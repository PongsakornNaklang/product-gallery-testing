"use client"

import { X, Plus, ShareIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "../contexts/wishlist-context"

export function WishlistPanel() {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist()

  return (
    <div className="hidden lg:block w-[280px] bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pt-6 space-y-3">
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10 space-y-0.5">
        <p className="text-xs text-neutral-800 uppercase">{wishlistCount} Gifts</p>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-800">Your wishlist</h2>
          <Button variant="outline" size="icon" className="size-8 rounded-full border-neutral-800 hover:bg-neutral-800 hover:text-white" >
            <ShareIcon className="size-[14px]" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 px-4">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-500 text-sm">Your wishlist is empty</p>
            <p className="text-neutral-400 text-xs mt-1">Add items by clicking the heart icon</p>
          </div>
        ) : (
          wishlistItems.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 group border-b border-neutral-200 pb-3"
              style={{
                borderBottomWidth: i === wishlistItems.length - 1 ? 0 : 1,
              }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-900 truncate">{item.brand || item.title}</h3>
                <p className="text-xs text-neutral-500 truncate">{item.title}</p>
                <p className="text-sm font-semibold text-neutral-900">${item.price.toFixed(2)}</p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="size-6 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                onClick={() => removeFromWishlist(item.id)}
              >
                <X className="w-4 h-4 text-neutral-400" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
