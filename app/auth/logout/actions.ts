"use server"

import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation"

export async function LogOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/auth/login");
}
// ログアウトしたことを示すメッセージをいれるかどうか