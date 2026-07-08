'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import TaskForm from './TaskForm'

type Tag = {
  id: number
  tag_name: string
  color: string
}

type Props = {
  tags: Tag[]
  date: string
}

export default function TaskFormCollapsible({ tags, date }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-md mx-auto">
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-md bg-zinc-700 border border-zinc-600 hover:bg-zinc-600 transition cursor-pointer">
        <span className="text-sm font-medium text-zinc-300">タスクを追加</span>
        {open ? (
          <ChevronUp className="size-4 text-zinc-400" />
        ) : (
          <ChevronDown className="size-4 text-zinc-400" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <TaskForm tags={tags} date={date} buttonLabel='作成' />
      </CollapsibleContent>
    </Collapsible>
  )
}
