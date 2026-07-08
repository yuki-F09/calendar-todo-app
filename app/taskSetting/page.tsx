import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import TagPriorityForm from './TagPriorityForm'

export default async function TaskSettingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [tags, tagPriorities] = user
    ? await Promise.all([
        prisma.tag.findMany({ where: { auth_id: user.id } }),
        prisma.tagPriority.findMany({ where: { auth_id: user.id } }),
      ])
    : [[], []]

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center text-white">タグの優先順位</h1>
        <p className="text-sm text-zinc-400 text-center mb-8">カレンダーで優先的に表示される順番</p>
        <TagPriorityForm tags={tags} tagPriorities={tagPriorities} />
      </div>
    </main>
  )
}
