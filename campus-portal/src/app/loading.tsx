export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] p-8">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Sparkle Loader */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-brand/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-brand border-r-brand animate-spin"></div>
        </div>
        <p className="text-brand font-display font-bold tracking-widest uppercase text-xs animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}
