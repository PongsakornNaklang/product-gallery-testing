"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

const budgetRanges = [
  { label: "Under $150", value: "0-150" },
  { label: "$150-300", value: "150-300" },
  { label: "$150-300", value: "150-300-alt" },
  { label: "$300-600", value: "300-600" },
  { label: "I Really Don't Know", value: "unknown" },
]

export function ProTip() {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)

  return (
    <Card className="border-none bg-transparent h-full shadow-none">
      <CardContent className="p-6 text-center flex flex-col justify-center h-full">
        <div className="mb-8">
          <p className="text-[#777777] mb-2 uppercase">Pro Tip</p>
          <h2 className="text-[40px] font-bold text-neutral-900">
            Choosing
            <br />your next
            <br />laptop
          </h2>
        </div>
        <span className="text-green-600 hover:text-green-700 cursor-pointer">
          <label className="font-bold cursor-pointer">Learn More</label>
          <ArrowRight className="inline-block ml-1 size-4" />
        </span>
      </CardContent>
    </Card>
  )
}
