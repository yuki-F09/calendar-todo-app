'use client'
import { useState, useRef, useEffect, useActionState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EditTask, type TaskActionState } from './actions'
import { useNotification } from './NotificationContext'

type Tag = {
  id: number
  tag_name: string
  color: string
}

type Task = {
  id: number
  title: string
  description: string | null
  role_over: boolean
  tags: Tag[]
}

type Props = {
  task: Task
  tags: Tag[]
  date: string
  userTags?: Tag[]
  onSuccess?: () => void
}

export default function EditTaskForm({ task, tags, userTags = [], date, onSuccess }: Props) {
  const initialTagIds: (number | '')[] = userTags.length > 0 ? userTags.map((t) => t.id) : ['']
  const [selectedTagIds, setSelectedTagIds] = useState<(number | '')[]>(initialTagIds)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState<TaskActionState, FormData>(EditTask, null)
  const { notify } = useNotification()

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
      onSuccess?.()
      notify('タスクを編集しました')
    }
  }, [state, onSuccess, notify])

  const addTagSelect = () => setSelectedTagIds((prev) => [...prev, ''])

  const removeTagSelect = (index: number) =>
    setSelectedTagIds((prev) => prev.filter((_, i) => i !== index))

  const updateTagSelect = (index: number, value: number | '') =>
    setSelectedTagIds((prev) => prev.map((v, i) => (i === index ? value : v)))

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="id" value={task.id} />
      <input type="hidden" name="date" value={date} />

      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="title"
          defaultValue={task.title}
          placeholder="タスクのタイトル"
          className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>
        {state?.errors?.title && (
          <p className="text-sm text-red-400">{state.errors.title[0]}</p>
        )}
      <div className="flex flex-col gap-1">
        <textarea
          name="description"
          rows={3}
          defaultValue={task.description ?? ''}
          placeholder="タスクの詳細"
          className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-zinc-300 whitespace-nowrap">タスク実行日</label>
        <input
          type="date"
          name="new_date"
          defaultValue={date}
          className="flex-1 px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-zinc-300 whitespace-nowrap">タスクの繰り越し機能</label>
        <select
          name="role_over"
          defaultValue={String(task.role_over)}
          className="flex-1 px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        >
          <option value="false">オフにする</option>
          <option value="true">オンにする</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {selectedTagIds.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            {index === 0 && (
              <button
                type="button"
                onClick={addTagSelect}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition whitespace-nowrap"
              >
                <Plus className="size-3.5" />
                追加
              </button>
            )}
            {index > 0 && <span className="w-[2.75rem]" />}
            <select
              name="tag_ids"
              value={value}
              onChange={(e) =>
                updateTagSelect(index, e.target.value === '' ? '' : Number(e.target.value))
              }
              className="flex-1 px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            >
              <option value="">タグを選択</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.tag_name}
                </option>
              ))}
            </select>
            {selectedTagIds.length > 1 && (
              <button
                type="button"
                onClick={() => removeTagSelect(index)}
                className="text-zinc-500 hover:text-zinc-300 transition"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <Button type="submit" variant="success" size="lg">
        編集
      </Button>
    </form>
  )
}
