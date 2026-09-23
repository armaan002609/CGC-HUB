import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "live" | "success" | "warning" | "info" | "sports" | "cultural" | "hackathons"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-ink text-surface hover:bg-ink/80",
    secondary: "border-transparent bg-surface-alt text-ink hover:bg-surface-alt/80",
    outline: "text-ink border-border",
    destructive: "border-transparent bg-status-live text-surface hover:bg-status-live/80",
    live: "border-transparent bg-status-live text-surface shadow-sm animate-pulse",
    success: "border-transparent bg-status-success text-surface",
    warning: "border-transparent bg-status-warning text-surface",
    info: "border-transparent bg-status-info text-surface",
    sports: "border-transparent bg-accent-sports text-surface",
    cultural: "border-transparent bg-accent-cultural text-surface",
    hackathons: "border-transparent bg-accent-hackathons text-surface",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
