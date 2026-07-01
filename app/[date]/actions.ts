'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function createTask(_prevState: unknown, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const role_over = formData.get('role_over') === 'true'
  const tagIds = formData
    .getAll('tag_ids')
    .map(Number)
    .filter((id) => id > 0)

  await prisma.task.create({
    data: {
      title,
      description,
      role_over,
      auth_id: user.id,
      tags: tagIds.length > 0 ? { connect: tagIds.map((id) => ({ id })) } : undefined,
    },
  })

  return { success: true }
}
