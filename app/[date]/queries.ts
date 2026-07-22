import { cacheTag } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function getCachedTags(userId: string) {
  'use cache'
  cacheTag('tags')
  return prisma.tag.findMany({ where: { auth_id: userId } })
}

export async function getCachedTasks(userId: string, date: string) {
  'use cache'
  cacheTag('tasks')
  return prisma.task.findMany({ where: { auth_id: userId, date }, include: { tags: true } })
}
