import { createClient } from '@/lib/supabase/server'
import TaskFormCollapsible from './TaskFormCollapsible'
import TaskIndex from './TaskIndex'
import { getCachedTags, getCachedTasks } from './queries'
import { NotificationProvider } from './NotificationContext'

type Props = {
  params: Promise<{ date: string }>
}

export default async function DatePage({ params }: Props) {
  const { date } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [tags, tasks] = user
    ? await Promise.all([
        getCachedTags(user.id),
        getCachedTasks(user.id, date),
      ])
    : [[], []]

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{date}</h1>

        <NotificationProvider>
          <div className="task-index-wrapper">
            <TaskIndex tasks={tasks} tags={tags} date={date} />
          </div>
          <div className="Task-create-wrapper">
            <h2 className="text-lg font-semibold text-white my-3">タスク作成</h2>
            <TaskFormCollapsible tags={tags} date={date} />
          </div>
        </NotificationProvider>
      </div>
    </main>
  )
}
