'use client'
import { useState, useCallback, useOptimistic, startTransition } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { deleteTask, toggleIsCompleted } from './actions'
import { useRouter } from 'next/navigation'
import EditTaskForm from './EditTaskForm'
import { useNotification } from './NotificationContext'

type Tag = { id: number; tag_name: string; color: string }
type Task = { id: number; title: string; description: string | null; role_over: boolean; isCompleted: boolean; tags: Tag[] }

type Props = {
  tasks: Task[]
  tags: Tag[]
  date: string
}

function TaskItem({
  task,
  tags,
  date,
  onDelete,
}: {
  task: Task
  tags: Tag[]
  date: string
  onDelete: (id: number) => void
}) {
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const handleEditSuccess = useCallback(() => setIsEditing(false), [])

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="rounded-md bg-zinc-700 border border-zinc-600">
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 cursor-pointer hover:bg-zinc-600 transition rounded-md">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => toggleIsCompleted(task.id, e.target.checked, date)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className={`text-sm font-medium text-white ${task.isCompleted ? 'line-through text-zinc-400' : ''}`}>
            {task.title}
          </span>
        </div>
        {open ? (
          <ChevronUp className="size-4 text-zinc-400 shrink-0" />
        ) : (
          <ChevronDown className="size-4 text-zinc-400 shrink-0" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-3 px-4 pt-3 pb-4 border-t border-zinc-600">
        {task.description && (
          <p className="text-sm text-zinc-300 whitespace-pre-wrap">{task.description}</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">繰り越し機能</span>
          <span className={`text-xs font-medium ${task.role_over ? 'text-indigo-400' : 'text-zinc-500'}`}>
            {task.role_over ? 'オン' : 'オフ'}
          </span>
        </div>
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-2 py-0.5 rounded-full border"
                style={{ color: tag.color, borderColor: tag.color }}
              >
                {tag.tag_name}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Button variant="success" size="sm" onClick={() => setIsEditing((prev) => !prev)}>編集</Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>削除</Button>
        </div>
        {isEditing && (
          <div className="pt-2 border-t border-zinc-600">
            <EditTaskForm task={task} userTags={task.tags} tags={tags} date={date} onSuccess={handleEditSuccess} />
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function TaskIndex({ tasks, tags, date }: Props) {
  const router = useRouter()
  const { notify } = useNotification()
  const [optimisticTasks, removeOptimistic] = useOptimistic(
    tasks,
    (state: Task[], deletedId: number) => state.filter((t) => t.id !== deletedId)
  )

  const handleDelete = (taskId: number) => {
    startTransition(async () => {
      removeOptimistic(taskId)
      await deleteTask(taskId, date)
      notify('タスクを削除しました')
      router.refresh()
    })
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold text-white mb-3">タスク一覧</h2>
      {optimisticTasks.length === 0 ? (
        <p className="text-sm text-zinc-500">タスクがありません</p>
      ) : (
        <div className="flex flex-col gap-3">
          {optimisticTasks.map((task) => (
            <TaskItem key={task.id} task={task} tags={tags} date={date} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
