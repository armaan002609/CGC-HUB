"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { createHighlight, deleteHighlight } from "./actions"
import { Upload, X, Image as ImageIcon, Video } from "lucide-react"

export function HighlightsManager({ initialHighlights }: { initialHighlights: any[] }) {
  const [highlights, setHighlights] = useState(initialHighlights)
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [tag, setTag] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClient()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title || !tag) return alert("Please fill all fields and select a file")

    setIsUploading(true)
    try {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `highlights/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      // Determine type
      const type = file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE'

      // Save to Database
      await createHighlight({ title, tag, type, url: publicUrl })

      // Update local state temporarily (it will refresh via revalidatePath anyway)
      setHighlights([{
        id: 'temp-' + Date.now(),
        title, tag, type, url: publicUrl, isActive: true, createdAt: new Date()
      }, ...highlights])

      // Reset form
      setFile(null)
      setTitle("")
      setTag("")
      
    } catch (err: any) {
      alert("Error uploading: " + err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this highlight?")) return
    
    // Optimistic delete
    setHighlights(highlights.filter(h => h.id !== id))
    try {
      await deleteHighlight(id)
    } catch (err: any) {
      alert("Failed to delete")
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      
      {/* Upload Form */}
      <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-brand/5 shadow-sm h-fit">
        <h2 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
          <Upload className="w-5 h-5 text-brand" />
          Add New Media
        </h2>
        
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Basketball Finals"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-surface-alt rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 ring-brand/20 transition-all border border-transparent focus:border-brand/30"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Tag / Category</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Sports"
              value={tag}
              onChange={e => setTag(e.target.value)}
              className="w-full bg-surface-alt rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 ring-brand/20 transition-all border border-transparent focus:border-brand/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">File (Image or Video)</label>
            <input 
              type="file" 
              required
              accept="image/*,video/*"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand/10 file:text-brand hover:file:bg-brand/20 cursor-pointer"
            />
          </div>

          <button 
            type="submit" 
            disabled={isUploading}
            className="w-full bg-brand hover:bg-brand-dark text-white rounded-full py-3 text-sm font-bold tracking-wider transition-colors disabled:opacity-50 mt-4"
          >
            {isUploading ? "UPLOADING..." : "UPLOAD & PUBLISH"}
          </button>
        </form>
      </div>

      {/* Gallery List */}
      <div className="lg:col-span-2">
        <h2 className="text-lg font-bold text-ink mb-6">Active Highlights</h2>
        
        {highlights.length === 0 ? (
          <div className="text-center py-12 bg-surface-alt/50 rounded-3xl border border-dashed border-black/10">
            <p className="text-muted text-sm">No highlights added yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map(h => (
              <div key={h.id} className="bg-white border border-brand/5 rounded-2xl overflow-hidden shadow-sm group">
                <div className="aspect-video relative bg-surface-alt">
                  {h.type === 'VIDEO' ? (
                    <video src={h.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={h.url} alt={h.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    {h.type === 'VIDEO' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                    {h.tag}
                  </div>
                  <button 
                    onClick={() => handleDelete(h.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                    title="Delete"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-ink truncate" title={h.title}>{h.title}</h3>
                  <p className="text-xs text-muted mt-1">
                    Added {new Date(h.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
