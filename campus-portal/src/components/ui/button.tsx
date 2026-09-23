import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "vivid"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    
    const variants = {
      default: "bg-[var(--color-foreground)] text-white hover:bg-[var(--color-foreground)]/90",
      secondary: "bg-surface-alt text-ink hover:bg-surface-alt/80",
      outline: "border-2 border-[var(--color-primary-light)] bg-transparent hover:bg-surface-alt hover:text-ink text-[var(--color-primary-dark)]",
      ghost: "hover:bg-surface-alt hover:text-ink text-muted",
      link: "text-brand underline-offset-4 hover:underline",
      destructive: "bg-status-live text-surface hover:bg-status-live/90",
      vivid: "bg-brand text-white hover:bg-brand-dark transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg",
    }

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 rounded-full px-4 text-xs",
      lg: "h-14 rounded-full px-10 text-base",
      icon: "h-11 w-11",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:shadow-sm",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
