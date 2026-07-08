import { z } from "zod"
import { TagColor } from "@/lib/generated/prisma/enums"

export const TagSchema = z.object({
  tag_name: z.string().min(1, { message: "タグ名は必須です" }).max(15, { message: "タグは15文字以内で入力してください" }),
  color: z.enum(TagColor, { message: "色を選択してください" }),
})
