"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/navigation';
import { Hex_Color_Map } from '@/components/ui/tag';
import type { TagColor } from '@/lib/generated/prisma/enums';


type Tag = { id: number; tag_name: string; color: string }
type Task = { id: number; title: string; description: string | null; role_over: boolean; tags: Tag[]; date:string;}
type tagPriority = {id: number, priority: number, auth_id: string, tag_id: number }


type Props = {
  tasks: Task[]
  tagPriorities: tagPriority[]
}

export default function Calendar({tasks, tagPriorities} :Props) {
  const router = useRouter();
  const events = tasks.map(({ id, title, date, tags }) => {
    // 複数tagのときの順番に未対応 ??は左側がnullかundefinedで右を返す
    const priority = tagPriorities.find(tp => tp.tag_id === tags[0]?.id)?.priority ?? Infinity
    return{
    id: String(id),
    title,
    start: date,
    extendedProps: {priority},
    backgroundColor: tags[0] ? Hex_Color_Map[tags[0].color as TagColor] : "#4a4a4f ",
    borderColor: tags[0] ? Hex_Color_Map[tags[0].color as TagColor] : "#4a4a4f" ,
    }

  }
)                    

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      dateClick={(info) => router.push(`/${info.dateStr}`)}
      events={events}
       eventOrder={(a: unknown, b: unknown) => {                                                                   
    const pa = (a as { extendedProps: { priority: number } }).extendedProps.priority ?? Infinity
    const pb = (b as { extendedProps: { priority: number } }).extendedProps.priority ?? Infinity              
    return pa - pb                                                                                            
  }}    
    />
  )
}