import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import TaskFormCollapsible from './TaskFormCollapsible'
import TaskIndex from './TaskIndex'

type Props = {
  params: Promise<{ date: string }>
}

export default async function DatePage({ params }: Props) {
  const { date } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [tags, tasks] = user
    ? await Promise.all([
        prisma.tag.findMany({ where: { auth_id: user.id } }),
        prisma.task.findMany({ where: { auth_id: user.id }, include: { tags: true } }),
      ])
    : [[], []]

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{date}</h1>

        <div className="task-index-wrapper">
          <TaskIndex tasks={tasks} tags={tags} date={date} />
        </div>
        <div className="Task-create-wrapper">
          <h2 className="text-lg font-semibold text-white my-3">タスク作成</h2>
          <TaskFormCollapsible tags={tags} />
        </div>
      </div>
    </main>
  )
}
