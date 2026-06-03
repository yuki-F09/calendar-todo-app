
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}