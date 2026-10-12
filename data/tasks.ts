import { prisma } from "@/lib/prisma";

type Props = {
  userId: string,
  date: string
}

export async function getTasks({ userId, date }: Props) {
  const [tags, tasks] = await Promise.all([
        prisma.tag.findMany({ where: { auth_id: userId } }),
        prisma.task.findMany({
          where: { auth_id: userId, date },
          include: { tags: true },
        }),
      ])
    ;
  return {tasks, tags}
}
