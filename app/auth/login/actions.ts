'use server'
import { createClient } from '@/lib/supabase/server'
import{ redirect } from "next/navigation"
import { supabaseAuthErrorCodeToJapaneseMessage } from '@/lib/supabase/translateAuthError'

type State = { message: string }

export async function signIn(_prevState: State, formData: FormData): Promise<State> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.log(error.message)


        return { message: supabaseAuthErrorCodeToJapaneseMessage[error.message] }


  }
    
  redirect("/")
}
