"use client";
import Link from "next/link"
import { ChevronDown, Search, Sparkles, User, LogOut, Shield, Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

const NAV_ITEMS = [
  {
    title: "Sports",
    panel1Title: "By Category",
    panel2Title: "By Department",
    card1: { title: "Live Now", desc: "Watch and monitor mission-critical tournament workflows.", color: "bg-[#38A169]", href: "/sports/live", requiresLive: true },
    altCard1: { title: "Schedule", desc: "Check out the upcoming matches and track the season.", color: "bg-[#3182CE]", href: "/sports/schedule" },
    card2: { title: "Ledger", desc: "Build, run, and monitor university-wide historical records.", color: "bg-[#6B46C1]", href: "/sports/ledger" }
  },
  {
    title: "Cultural",
    panel1Title: "Festivals",
    panel2Title: "Clubs & Socs",
    card1: { title: "Upcoming", desc: "Experience music, art, and dance from around the globe.", color: "bg-[#D53F8C]", href: "/cultural" },
    card2: { title: "Gallery", desc: "View highlights and memories from past events.", color: "bg-[#ED8936]", href: "/cultural/gallery" }
  },
  {
    title: "Hackathons",
    panel1Title: "Competitions",
    panel2Title: "Resources",
    card1: { title: "Register", desc: "Join our massive weekend events and build the future.", color: "bg-[#319795]", href: "/hackathons" },
    card2: { title: "Showcase", desc: "Explore winning projects and open source contributions.", color: "bg-[#3182CE]", href: "/hackathons/showcase" }
  },
  {
    title: "Discover",
    panel1Title: "Explore All",
    panel2Title: "Quick Links",
    card1: { title: "Calendar", desc: "View the unified schedule across all campus activities.", color: "bg-[#DD6B20]", href: "#" },
    card2: { title: "Leaderboards", desc: "See which departments are leading in points this year.", color: "bg-[#E53E3E]", href: "#" }
  }
];

export function Navbar({ dbRole }: { dbRole?: string }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  
  // Toggle this boolean to simulate live sports being active or inactive
  const hasLiveSports = false;

  return (
    <nav className="bg-[var(--color-background)] sticky top-0 z-50 pt-2 pb-2">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-[1450px]">
        
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-brand">
            <Sparkles className="w-8 h-8" fill="currentColor" />
            <span className="text-2xl font-bold tracking-tight font-display">CampusPortal</span>
          </Link>
          
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-brand font-medium text-[15px]">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.card1?.href) || pathname.startsWith(item.card2?.href || '');
              
              return (
                <div key={item.title} className="group relative">
                  <button className={`flex items-center gap-1 py-6 transition-opacity ${isActive ? 'text-[#6B46C1] font-bold' : 'hover:opacity-80'}`}>
                    {item.title}
                    <ChevronDown className="w-3 h-3 opacity-50 transition-transform group-hover:rotate-180" strokeWidth={3} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-[20%] mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out translate-y-4 group-hover:translate-y-0 z-50">
                    <div className="flex gap-4 p-2 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-white">
                      
                      {/* Single Panel for clean functional links */}
                      <div className="bg-[#B794F4] p-6 rounded-3xl w-[500px] shadow-sm">
                        <p className="text-[10px] font-black tracking-[0.2em] text-[#2D1A5C]/50 mb-4 uppercase">{item.panel1Title}</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          
                          {/* Sub-card 1 */}
                          {(() => {
                            const displayCard = (item.card1?.requiresLive && !hasLiveSports && item.altCard1) 
                              ? item.altCard1 
                              : item.card1;
                              
                            return displayCard && (
                              <Link href={displayCard.href} className={`block ${displayCard.color} text-white p-5 rounded-2xl hover:scale-105 transition-transform origin-bottom-left shadow-md`}>
                                <h4 className="text-lg font-display font-black mb-1">{displayCard.title}</h4>
                                <p className="text-xs font-medium opacity-90 mb-4 leading-relaxed">{displayCard.desc}</p>
                              </Link>
                            )
                          })()}

                          {/* Sub-card 2 */}
                          {item.card2 && (
                            <Link href={item.card2.href} className={`block ${item.card2.color} text-white p-5 rounded-2xl hover:scale-105 transition-transform origin-bottom-left shadow-md`}>
                              <h4 className="text-lg font-display font-black mb-1">{item.card2.title}</h4>
                              <p className="text-xs font-medium opacity-90 mb-4 leading-relaxed">{item.card2.desc}</p>
                            </Link>
                          )}

                        </div>
                        <div className="flex gap-3">
                          <button className="bg-[#6B46C1] hover:bg-[#553C9A] rounded-full px-5 py-2 font-bold text-[10px] tracking-wider text-white transition-colors uppercase">View All {item.title}</button>
                          <button className="bg-transparent border border-white text-white hover:bg-white hover:text-[#6B46C1] rounded-full px-5 py-2 font-bold text-[10px] tracking-wider transition-colors uppercase">Learn More</button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Auth & CTA */}
        <div className="flex items-center gap-3 sm:gap-6 font-medium text-brand text-[15px]">
          {loading ? (
            <div className="w-8 h-8 rounded-full border-2 border-brand/20 border-t-brand animate-spin" />
          ) : session ? (
            <div className="group relative">
              <button className="flex items-center gap-2 hover:bg-surface-alt px-3 py-1.5 rounded-full transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">
                  {session.user?.user_metadata?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                </div>
                <span className="hidden sm:block text-sm font-bold">{session.user?.user_metadata?.name || session.user?.email?.split('@')[0]}</span>
                <ChevronDown className="w-3 h-3 opacity-50" strokeWidth={3} />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out translate-y-2 group-hover:translate-y-0 z-50 w-48">
                <div className="bg-white rounded-2xl shadow-xl border border-black/5 p-2 flex flex-col gap-1">
                  <div className="px-3 py-2 border-b border-black/5 mb-1">
                    <p className="text-xs text-muted truncate">{session.user?.email}</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-surface-alt rounded-xl transition-colors font-medium">
                    <User className="w-4 h-4 opacity-70" />
                    Profile
                  </Link>
                  {(dbRole === "ADMIN" || session.user?.user_metadata?.role === "ADMIN") && (
                    <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-brand hover:bg-surface-alt rounded-xl transition-colors font-bold">
                      <Shield className="w-4 h-4 opacity-70" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-bold w-full text-left"
                  >
                    <LogOut className="w-4 h-4 opacity-70" />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:opacity-80 transition-opacity hidden sm:block">
                Log in
              </Link>
              <Link href="/signup" className="hover:opacity-80 transition-opacity hidden sm:block">
                Sign up
              </Link>
            </>
          )}

          <button className="hidden sm:flex w-9 h-9 rounded-full bg-brand/10 items-center justify-center text-brand hover:bg-brand/20 transition-colors">
            <Search className="w-4 h-4" strokeWidth={3} />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-brand hover:bg-brand/5 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.title} className="flex flex-col gap-2">
                  <div className="font-bold text-brand text-lg">{item.title}</div>
                  <div className="pl-4 flex flex-col gap-3">
                    {item.card1 && (
                      <Link 
                        href={item.card1.href} 
                        className="text-muted hover:text-brand font-medium text-sm flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.card1.title}
                      </Link>
                    )}
                    {item.card2 && (
                      <Link 
                        href={item.card2.href} 
                        className="text-muted hover:text-brand font-medium text-sm flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.card2.title}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              
              {!session && !loading && (
                <div className="pt-4 mt-2 border-t border-black/5 flex flex-col gap-3">
                  <Link 
                    href="/login" 
                    className="bg-surface-alt text-brand hover:bg-black/5 rounded-xl px-4 py-3 font-bold text-sm text-center transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-brand text-white hover:bg-brand-dark rounded-xl px-4 py-3 font-bold text-sm text-center transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {session && !loading && (
                <div className="pt-4 mt-2 border-t border-black/5 flex flex-col gap-3">
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-2 bg-surface-alt text-ink hover:bg-black/5 rounded-xl px-4 py-3 font-bold text-sm transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 opacity-70" />
                    Profile
                  </Link>
                  {(dbRole === "ADMIN" || session.user?.user_metadata?.role === "ADMIN") && (
                    <Link 
                      href="/admin" 
                      className="flex items-center gap-2 bg-surface-alt text-brand hover:bg-black/5 rounded-xl px-4 py-3 font-bold text-sm transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Shield className="w-4 h-4 opacity-70" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 bg-[#e53e3e]/10 text-red-600 hover:bg-[#e53e3e]/20 rounded-xl px-4 py-3 font-bold text-sm transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 opacity-70" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
