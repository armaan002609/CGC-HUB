"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Upload, X, Loader2, Image as ImageIcon, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

type HeroBanner = {
  id: string
  title: string | null
  url: string
  isActive: boolean
}

export function HeroManager({ initialBanners }: { initialBanners: HeroBanner[] }) {
  const [banners, setBanners] = useState(initialBanners)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [files, setFiles] = useState<File[]>([])
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
      setError(null)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) return

    setIsUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      let uploadedBanners: HeroBanner[] = []
      
      for (let i = 0; i < files.length; i++) {
        const currentFile = files[i]
        
        // 1. Upload to Supabase Storage
        const fileExt = currentFile.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
        const filePath = `hero/${fileName}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, currentFile)

        if (uploadError) throw uploadError

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)

        // 3. Save to Database via API
        const res = await fetch('/api/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title, // Apply same title to all
            url: publicUrl,
          })
        })

        if (!res.ok) throw new Error('Failed to save banner to database')
        
        const newBanner = await res.json()
        uploadedBanners.push(newBanner)
        
        // Update progress
        setUploadProgress(Math.round(((i + 1) / files.length) * 100))
      }
      
      setBanners([...uploadedBanners, ...banners])
      
      // Reset form
      setFiles([])
      setTitle("")
      setUploadProgress(0)
      router.refresh()

    } catch (err: any) {
      console.error(err)
      setError(err.message || 'An error occurred during upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return
    
    try {
      const res = await fetch(`/api/hero?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      
      setBanners(banners.filter(b => b.id !== id))
      router.refresh()
    } catch (err) {
      alert("Failed to delete banner")
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand/10">
        <h2 className="text-xl font-bold font-display text-brand mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-brand/70" />
          Upload New Banner
        </h2>
        
        <form onSubmit={handleUpload} className="space-y-4 max-w-2xl">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brand mb-1">Banner Title (Optional)</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-brand/20 focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder="e.g. Welcome to Campus Portal"
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-brand mb-1">Image Files</label>
             <input 
               type="file" 
               accept="image/*"
               multiple
               onChange={handleFileSelect}
               className="w-full px-4 py-2 rounded-lg border border-brand/20 bg-surface-alt/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand file:text-white hover:file:bg-brand-dark"
               required
             />
             {files.length > 0 && (
               <p className="text-xs text-brand/60 mt-2">{files.length} file(s) selected</p>
             )}
          </div>

          <button 
            type="submit" 
            disabled={files.length === 0 || isUploading}
            className="px-6 py-2.5 bg-brand text-white rounded-lg font-bold text-sm tracking-wide disabled:opacity-50 flex items-center gap-2 transition-colors hover:bg-brand-dark"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading ({uploadProgress}%)...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Banners
              </>
            )}
          </button>
        </form>
      </div>

      {/* Gallery */}
      <div>
        <h2 className="text-xl font-bold font-display text-brand mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-brand/70" />
          Active Banners
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted border-2 border-dashed border-brand/10 rounded-2xl bg-white/50">
              No banners uploaded yet. Upload one above!
            </div>
          ) : (
            banners.map(banner => (
              <div key={banner.id} className="group relative rounded-2xl overflow-hidden bg-black aspect-video border border-brand/10 shadow-sm">
                <Image 
                  src={banner.url} 
                  alt={banner.title || "Banner"} 
                  fill 
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="absolute bottom-4 left-4 right-12 text-white pointer-events-none">
                  {banner.title && <h3 className="font-bold text-lg leading-tight">{banner.title}</h3>}
                </div>

                <button 
                  onClick={() => handleDelete(banner.id)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="Delete Banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
