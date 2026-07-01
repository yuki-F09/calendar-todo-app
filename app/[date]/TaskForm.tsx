'use client'
import { useState, useRef, useEffect, useActionState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createTask } from './actions'

type Tag = {
  id: number
  tag_name: string
  color: string
}

type Props = {
  tags: Tag[]
}

export default function TaskForm({ tags }: Props) {
  const [selectedTagIds, setSelectedTagIds] = useState<(number | '')[]>([''])
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(createTask, null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
      setSelectedTagIds([''])
    }
  }, [state])

  const addTagSelect = () => setSelectedTagIds((prev) => [...prev, ''])

  const removeTagSelect = (index: number) =>
    setSelectedTagIds((prev) => prev.filter((_, i) => i !== index))

  const updateTagSelect = (index: number, value: number | '') =>
    setSelectedTagIds((prev) => prev.map((v, i) => (i === index ? value : v)))

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-300">タイトル</label>
        <input
          type="text"
          name="title"
          placeholder="タスクのタイトル"
          className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-300">詳細</label>
        <textarea
          name="description"
          rows={3}
          placeholder="タスクの詳細"
          className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-300">タスクの繰り越し機能</label>
        <select
          name="role_over"
          defaultValue="false"
          className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        >
          <option value="false">オフにする</option>
          <option value="true">オンにする</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-300">タグ</label>
          <button
            type="button"
            onClick={addTagSelect}
            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition"
          >
            <Plus className="size-3.5" />
            追加
          </button>
        </div>

        {selectedTagIds.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
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

      <Button type="submit" size="lg">
        作成
      </Button>
    </form>
  )
}
