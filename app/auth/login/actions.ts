'use server'
import { createClient } from '@/lib/supabase/server'

type State = { message: string }

export async function signIn(_prevState: State, formData: FormData): Promise<State> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { message: error.message }
  return { message: 'ログインしました。' }
}
