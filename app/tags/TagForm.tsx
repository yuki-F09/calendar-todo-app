"use client"

import { Button } from "@/components/ui/button"
import { TagColor } from "@/lib/generated/prisma/enums"
import { Color_Labels, Color_Map } from "@/components/ui/tag"

type Tag = {
  id: number
  tag_name: string
  color: string
}

type Props = {
  tags?: Tag[]
  buttonLabel: string
}


export default function TagForm ({ tags, buttonLabel }: Props){
  const colorOptions = Object.values(TagColor)
  const formAction = ()=>{
    console.log("ddd")
  }
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="tag_name"
          placeholder="タグ名"
          className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>


      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-400">色を選択</p>
        <div className="flex gap-2 flex-wrap">
          {colorOptions.map((color) => (
            <label key={color} className="cursor-pointer" title={Color_Labels[color]}>
              <input type="radio" name="color" value={color} className="sr-only peer" />
              <span
                className={`block w-7 h-7 rounded-full ${Color_Map[color]} hover:opacity-70 transition peer-checked:ring-2 peer-checked:ring-white peer-checked:ring-offset-2 peer-checked:ring-offset-zinc-900`}
              />
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg">
        {buttonLabel}
      </Button>
    </form>

  )
}