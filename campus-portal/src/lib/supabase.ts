import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This client should be used for client-side operations or 
// generic operations like Storage/Realtime where RLS allows anonymous access.
export const supabase = createClient(supabaseUrl, supabaseKey)
