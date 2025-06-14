import { Navbar } from "../components/navbar"
import { WishlistPanel } from "../components/wishlist-panel"
import { ProductGallery } from "../components/product-gallery"

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="flex">
        <WishlistPanel />
        <ProductGallery />
      </div>
    </div>
  )
}
