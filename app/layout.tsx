import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WishlistProvider } from "../contexts/wishlist-context"
import { QueryProvider } from "../providers/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gaming Laptops Gallery",
  description: "Modern laptop gallery with wishlist functionality and infinite scroll",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
