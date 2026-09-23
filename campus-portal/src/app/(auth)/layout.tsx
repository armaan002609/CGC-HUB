import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Branding Panel (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-[45%] p-4">
        <div className="w-full h-full bg-brand rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between text-white p-12">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-10 w-fit">
            <Sparkles className="w-8 h-8 text-white" fill="currentColor" />
            <span className="text-2xl font-bold tracking-tight font-display text-white">CampusPortal</span>
          </Link>

          {/* Graphic/Illustration Placeholder */}
          <div className="absolute inset-0 z-0">
            {/* We reuse the hero graphic style here */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero.jpg" alt="Decorative background" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/80 to-transparent"></div>
          </div>

          {/* Quote/Testimonial */}
          <div className="relative z-10 max-w-md">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-display font-medium leading-snug mb-4">
              "CampusPortal has completely unified how we organize, track, and participate in events. It's the central nervous system of our university."
            </h2>
            <p className="font-bold opacity-80 uppercase tracking-widest text-xs">
              Student Council President
            </p>
          </div>
          
        </div>
      </div>

      {/* Right Content Panel */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative bg-[var(--color-background)]">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <Link href="/" className="absolute top-8 left-8 flex lg:hidden items-center gap-2 text-brand">
          <Sparkles className="w-6 h-6" fill="currentColor" />
          <span className="text-xl font-bold tracking-tight font-display">CampusPortal</span>
        </Link>

        {children}
      </div>
    </div>
  )
}
