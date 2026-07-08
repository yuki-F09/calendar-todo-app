import Calendar from "@/components/calendar";

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [tags, tasks, tagPrioritys] = user
    ? await Promise.all([
        prisma.tag.findMany({ where: { auth_id: user.id } }),
        prisma.task.findMany({ where: { auth_id: user.id }, include: { tags: true } }),
        prisma.tagPriority.findMany({where: {auth_id: user.id}}),
      ])
    : [[], []]

  return (
    <>

      <div className="mt-10 mx-10">
        <Calendar tasks={tasks} tags={tags}/>
      </div>
    </>
  )
}
