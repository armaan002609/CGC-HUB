"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function VideoHighlight({ url, title, tag, isLarge }: { url: string, title: string, tag: string, isLarge: boolean }) {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const handleGlobalPlay = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail !== url && videoRef.current) {
        videoRef.current.pause()
      }
    }
    
    window.addEventListener('highlightVideoPlay', handleGlobalPlay)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return
          if (entry.isIntersecting) {
            videoRef.current.play().then(() => {
              window.dispatchEvent(new CustomEvent('highlightVideoPlay', { detail: url }))
            }).catch(() => {})
          } else {
            videoRef.current.pause()
          }
        })
      },
      { threshold: 0.6 } // Play when at least 60% visible
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('highlightVideoPlay', handleGlobalPlay)
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [url])

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative"
    >
      <video 
        ref={videoRef}
        src={url} 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 opacity-90 bg-black"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
      
      <div className="absolute bottom-4 left-4 right-16 text-white pointer-events-none">
        <span className="text-[10px] font-bold uppercase tracking-widest bg-brand/90 px-3 py-1 rounded-full mb-2 inline-block">
          {tag}
        </span>
        {isLarge && (
           <h3 className="text-lg sm:text-2xl font-bold font-display leading-tight drop-shadow-md">{title}</h3>
        )}
      </div>

      <button 
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-20 bg-black/40 hover:bg-black/80 backdrop-blur-md text-white p-2.5 rounded-full transition-all shadow-xl border border-white/20"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  )
}
