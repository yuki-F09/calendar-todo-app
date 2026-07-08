'use client'
import { Button } from '@/components/ui/button'
import { Color_Map } from '@/components/ui/tag'
import type { TagColor } from '@/lib/generated/prisma/enums'
import { deleteTag } from './actions'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import  TagForm  from "./TagForm"


type Tag = {
  id: number
  tag_name: string
  color: TagColor
}

type Props = {
  tags?: Tag[]
}

export function TagItem ({ tag }: { tag: Tag }) {
  const router = useRouter()
  // handleDeleteはこっちに書かないとtag１つずつの指定にならない tagsになる
    const handleDelete = async () => {
      await deleteTag(tag.id)
      router.refresh()
    }
    const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="rounded-md bg-zinc-800 border border-zinc-700">
      <div className="flex items-center gap-3 px-4 py-3">
        <span className={`flex-1 text-sm font-medium px-2 py-0.5 rounded text-white ${Color_Map[tag.color]}`}>
          {tag.tag_name}
        </span>
        <Button variant="success" size="sm" onClick={() => setIsEditing((prev) => !prev)}>編集</Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>削除</Button>
      </div>
      {isEditing && (
        <div className="px-4 pb-4 pt-2 border-t border-zinc-600">
          <TagForm tag={tag} buttonLabel='編集' />
        </div>
      )}
    </div>
  )
}

export default function TagIndex ({tags =[]}:Props){
  return (
    <>
    {tags.length === 0 ? (
      <p className="text-sm text-zinc-500">タグがありません</p>
    ) : (
      <div className="flex flex-col gap-3">
          {tags.map((tag) => (
            <TagItem key={tag.id} tag={tag} />
          ))}
        </div>
    )
    }
    </>
  )
}

