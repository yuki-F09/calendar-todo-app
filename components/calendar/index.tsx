"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/navigation';

export default function Calendar() {
  const router = useRouter();

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      dateClick={(info) => router.push(`/${info.dateStr}`)}
    />
  )
}