'use server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type TagPriorityActionState = {
  success: boolean
  error?: string
  tagIds?: Record<number, number>
  submissionId?: number
} | null

export async function upsertTagPriorities(
  _prev: TagPriorityActionState,
  formData: FormData
): Promise<TagPriorityActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: '認証エラー' }

  const entries: { priority: number; tag_id: number }[] = []
  for (let i = 1; i <= 10; i++) {
    const value = formData.get(`tag_id_${i}`)
    if (value && value !== '') {
      entries.push({ priority: i, tag_id: Number(value) })
    }
  }

  await prisma.tagPriority.deleteMany({ where: { auth_id: user.id } })

  if (entries.length > 0) {
    await prisma.tagPriority.createMany({
      data: entries.map((e) => ({ priority: e.priority, tag_id: e.tag_id, auth_id: user.id })),
    })
  }

  revalidatePath('/taskSetting')
  return {
    success: true,
    tagIds: Object.fromEntries(entries.map((e) => [e.priority, e.tag_id])),
    submissionId: Date.now(),
  }
}
