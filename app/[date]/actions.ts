'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { updateTag } from 'next/cache'
import { z } from 'zod'
import { TaskSchema } from './schema'

export type TaskActionState = {
  errors?: {
    title?: string[]
  }
  success?: boolean
} | null

export async function createTask(_prevState: TaskActionState, formData: FormData) {
  const parsed = TaskSchema.safeParse({
    title: formData.get('title'),
    date: formData.get('date'),
  })
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const description = (formData.get('description') as string) || null
  const role_over = formData.get('role_over') === 'true'
  const tagIds = formData
    .getAll('tag_ids')
    .map(Number)
    .filter((id) => id > 0)

  await prisma.task.create({
    data: {
      title: parsed.data.title,
      date: parsed.data.date,
      description,
      role_over,
      auth_id: user.id,
      tags: tagIds.length > 0 ? { connect: tagIds.map((id) => ({ id })) } : undefined,
    },
  })
  updateTag('tasks')
  return { success: true }
}

export async function EditTask(_prevState: unknown, formData: FormData) {
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
  const id = Number(formData.get('id'))
  const oldDate = formData.get('date') as string
  const newDate = formData.get('new_date') as string

  await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
      role_over,
      date: newDate,
      auth_id: user.id,
      tags: { set: tagIds.map((id) => ({ id })) },
    },
  })
  updateTag('tasks')
  return { success: true }
}

export async function toggleIsCompleted(taskId: number, isCompleted: boolean, date: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  await prisma.task.update({ where: { id: taskId, auth_id: user.id }, data: { isCompleted } })
  updateTag('tasks')
}

export async function deleteTask(taskId: number, date: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  await prisma.task.delete({ where: { id: taskId, auth_id: user.id } })
  updateTag('tasks')
}
