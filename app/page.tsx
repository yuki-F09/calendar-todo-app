import Calendar from "@/components/calendar";

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  const [ tasks, tagPriorities ] = user
    ? await Promise.all([
        prisma.task.findMany({ where: { auth_id: user.sub, isCompleted: false }, include: { tags: true } }),
        prisma.tagPriority.findMany({where: {auth_id: user.sub}}),
      ])
    : [[], [], []]

  return (
    <>

      <div className="mt-10 mx-10">
        <Calendar tasks={tasks} tagPriorities={tagPriorities}/>
      </div>
    </>
  )
}
