"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

const budgetRanges = [
  { label: "Under $150", value: "0-150" },
  { label: "$150-300", value: "150-300" },
  { label: "$150-300", value: "150-300-alt" },
  { label: "$300-600", value: "300-600" },
  { label: "I Really Don't Know", value: "unknown" },
]

export function BudgetSelector() {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)

  return (
    <Card className="border-none bg-transparent h-full">
      <CardContent className="p-6 text-center flex flex-col justify-center h-full">
        <div className="mb-6">
          <h2 className="text-[32px] font-bold text-neutral-900 mb-2">
            Do you have
            <br />a budget?
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {budgetRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedBudget === range.value ? "default" : "outline"}
              className={`px-3 py-1 text-xs font-medium rounded-full ${selectedBudget === range.value
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-700 border-neutral-700 hover:bg-neutral-50"
                }`}
              onClick={() => setSelectedBudget(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
