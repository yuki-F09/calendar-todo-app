'use client'
import { useActionState } from 'react'
import { signIn } from './actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const initialState = { message: '' }

export default function LoginPage() {
  const [state, formAction,] = useActionState(signIn, initialState)

  return (

          <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">ログイン</h1>

          <form action={formAction} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-300">メールアドレス</label>
              <input
                type="email"
                placeholder="example@email.com"
                name="email"
                className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-300">パスワード</label>
              <input
                type="password"
                placeholder="8文字以上"
                name="password"
                className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
            {/*

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-300">パスワード（確認）</label>
              <input
                type="password"
                placeholder="パスワードを再入力"
                className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
            */
            }
            {state.message && (
              <p aria-live="polite">
                {state.message}
              </p>
            )}
            <Button type="submit" size={"lg"}>
              ログイン
            </Button>
          </form>
          <p className="mt-6 text-sm text-zinc-400">
            アカウントをお持ちでない場合
            <Button asChild size={"lg"} variant={"secondary"}>
            <Link href="/auth/signup" >
              新規登録
            </Link>
            </Button>
          </p>
        </div>
      </main>

  )
}
