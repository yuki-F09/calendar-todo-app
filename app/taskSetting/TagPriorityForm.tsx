'use client'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { upsertTagPriorities, type TagPriorityActionState } from './actions'

type Tag = { id: number; tag_name: string }
type TagPriority = { priority: number; tag_id: number }

type Props = {
  tags: Tag[]
  tagPriorities: TagPriority[]
}

const PRIORITY_COUNT = 8

export default function TagPriorityForm({ tags, tagPriorities }: Props) {
  const [state, formAction] = useActionState<TagPriorityActionState, FormData>(
    upsertTagPriorities,
    null
  )

  const getTagIdByPriority = (priority: number) =>
    tagPriorities.find((p) => p.priority === priority)?.tag_id ?? ''

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {Array.from({ length: PRIORITY_COUNT }, (_, i) => i + 1).map((priority) => (
        <div key={priority} className="flex items-center gap-4">
          <span className="w-6 text-center text-sm font-medium text-zinc-300">{priority}</span>
          <select
            key={`${priority}-${state?.submissionId ?? 0}`}
            name={`tag_id_${priority}`}
            defaultValue={getTagIdByPriority(priority) || (state?.tagIds?.[priority]?.toString() ?? '')}
            className="flex-1 px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          >
            <option value="">選択なし</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.tag_name}
              </option>
            ))}
          </select>
        </div>
      ))}
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-400">保存しました</p>}
      <Button type="submit" variant="default" size="lg">
        決定
      </Button>
    </form>
  )
}

