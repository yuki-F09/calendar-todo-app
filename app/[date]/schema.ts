import { z } from "zod"

export const TaskSchema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です" }).max(15, { message: "タイトルは15文字以内で入力してください" }),
  date: z.string().min(1),
})
