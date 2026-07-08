"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/navigation';
import { Hex_Color_Map } from '@/components/ui/tag';
import type { TagColor } from '@/lib/generated/prisma/enums';



type Tag = { id: number; tag_name: string; color: string }
type Task = { id: number; title: string; description: string | null; role_over: boolean; tags: Tag[]; date:string; }

type Props = {
  tasks: Task[]
  tags: Tag[]
}

export default function Calendar({tags, tasks} :Props) {
  const router = useRouter();
  const events = tasks.map(({ id, title, date, tags }) => ({
    id: String(id),
    title,
    start: date,
    backgroundColor: tags[0] ? Hex_Color_Map[tags[0].color as TagColor] : "#4a4a4f ",
    borderColor: tags[0] ? Hex_Color_Map[tags[0].color as TagColor] : "#4a4a4f" ,
  }))                    

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      dateClick={(info) => router.push(`/${info.dateStr}`)}
      events={events}
    />
  )
}