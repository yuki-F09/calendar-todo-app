'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import type { TagColor } from "@/lib/genearated/prisma/enums"

export async function createTag(_prevState: unknown, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const tag_name = formData.get('tag_name') as string
  const color = formData.get('color') as TagColor
  await prisma.tag.create({
    data: {
      tag_name,
      color,
      auth_id: user.id,
    },
  })
  revalidatePath('/tags')
  return { success: true }
}