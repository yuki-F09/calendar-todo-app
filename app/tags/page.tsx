
import { createClient } from "@/lib/supabase/server";
import { prisma } from '@/lib/prisma'
import TagForm from "./TagForm";
import TagIndex from "./TagIndex";


export default async function TagsPage (){
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const [tags] = user
      ? await Promise.all([
          prisma.tag.findMany({ where: { auth_id: user.id } })
        ])
      : [[], []]
  return (
      <div className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="tags-index-wrapper">
            <h1 className="text-3xl font-bold mb-8 text-center">タグ一覧</h1>
            <TagIndex tags={tags}/>
          </div>
          <div className="Tag-create-wrapper">
            <h1 className="text-lg font-semibold text-white my-3 text-center">タグ作成</h1>
            <div className="flex items-center justify-between w-full px-4 py-3 rounded-md bg-zinc-700 border border-zinc-600 hover:bg-zinc-600 transition cursor-pointer">

              <TagForm buttonLabel="作成"/>
            </div>

          </div>
        </div>
      </div>
    )
}