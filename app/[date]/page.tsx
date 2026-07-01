import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import TaskForm from './TaskForm'

type Props = {
  params: Promise<{ date: string }>
}

export default async function DatePage({ params }: Props) {
  const { date } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()  

  const tags = user
    ? await prisma.tag.findMany({ where: { auth_id: user.id } })
    : []

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{date}</h1>
        <TaskForm tags={tags} />
      </div>
    </main>
  )
}