import type {TagColor} from "@/lib/generated/prisma/enums"

export const Color_Map: Record<TagColor, string>= {
    BLUE: "bg-blue-600",
    PURPLE: "bg-violet-600",
    GREEN: "bg-emerald-600",
    ORANGE: "bg-amber-600",
    RED: "bg-rose-600",
    LIGHT_BLUE: "bg-blue-400",
    LIGHT_PURPLE: "bg-violet-400",
    LIGHT_GREEN: "bg-emerald-400",
    LIGHT_ORANGE: "bg-amber-400",
    LIGHT_RED: "bg-rose-400",
}
export const Color_Labels: Record<TagColor, string> = {
    BLUE: "青",
    PURPLE: "紫",
    GREEN: "緑",
    ORANGE: "オレンジ",
    RED: "赤",
    LIGHT_BLUE: "水色",
    LIGHT_PURPLE: "薄紫",
    LIGHT_GREEN: "黄緑",
    LIGHT_ORANGE: "黄色",
    LIGHT_RED: "ピンク",
  }


type Props = {
  color: TagColor
  tag_name: string
}

export const Tag = ({color, tag_name}:Props) => {
  return (
    <div className="flex flex-wrap gap-2 p-4">
        <button
          className={`${Color_Map[color]} text-white text-sm font-medium px-3 py-1 rounded-full`}>
            {tag_name}
        </button>
    </div>
  )
}
