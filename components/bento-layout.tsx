import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BentoBoxProps {
  children: ReactNode
  className?: string
  size: "sm" | "md" | "xl"
  accent: "purple" | "green" | "amber" | "slate"
}

const bentoBoxSizes = {
  sm: "md:col-span-1",
  md: "md:col-span-2",
  xl: "md:col-span-4",
}

const bentoBoxAccents = {
  purple: "border-purple-200 bg-purple-50",
  green: "border-emerald-200 bg-emerald-50",
  amber: "border-amber-200 bg-amber-50",
  slate: "border-slate-200 bg-slate-50",
}

export function BentoBox({ children, className, size, accent }: BentoBoxProps) {
  const sizeClass = bentoBoxSizes[size] || bentoBoxSizes.md
  const accentClass = bentoBoxAccents[accent] || bentoBoxAccents.slate

  return (
    <div
      className={cn(
        "border rounded-lg p-4 transition-all duration-200 hover:shadow-md",
        sizeClass,
        accentClass,
        className,
      )}
    >
      {children}
    </div>
  )
}

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>{children}</div>
}

