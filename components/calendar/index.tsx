"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/navigation';



type Tag = { id: number; tag_name: string; color: string }
type Task = { id: number; title: string; description: string | null; role_over: boolean; tags: Tag[]; date:string; }

type Props = {
  tasks: Task[]
  tags: Tag[]
}

export default function Calendar({tags, tasks} :Props) {
  const router = useRouter();
  const events = tasks.map(({ id, title, date }) => ({
    id: String(id),                                                                                           
    title,                                                                                                    
    start: date,                                                                                          
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