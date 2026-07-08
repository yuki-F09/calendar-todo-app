'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { TagSchema } from './schema'

export type TagActionState = {
  errors?: {
    tag_name?: string[]
    color?: string[]
  }
  success?: boolean
} | null

export async function createTag(_prevState: TagActionState, formData: FormData): Promise<TagActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const parsed = TagSchema.safeParse({
    tag_name: formData.get('tag_name'),
    color: formData.get('color'),
  })

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors }
  }

  await prisma.tag.create({
    data: {
      tag_name: parsed.data.tag_name,
      color: parsed.data.color,
      auth_id: user.id,
    },
  })
  revalidatePath('/tags')
  return { success: true }
}

export async function editTag(_prevState: TagActionState, formData: FormData): Promise<TagActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const parsed = TagSchema.safeParse({
    tag_name: formData.get('tag_name'),
    color: formData.get('color'),
  })

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors }
  }

  const id = Number(formData.get('id'))

  await prisma.tag.update({
    where: { id, auth_id: user.id },
    data: {
      tag_name: parsed.data.tag_name,
      color: parsed.data.color,
    },
  })
  revalidatePath('/tags')
  return { success: true }
}




export async function deleteTag(tagId: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  await prisma.tag.delete({ where: { id: tagId, auth_id: user.id } })
  revalidatePath("/tags")
}
