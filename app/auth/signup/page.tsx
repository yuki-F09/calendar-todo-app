'use client'
import { useActionState } from 'react'
import { signUp } from './actions'
import { Button } from "@/components/ui/button"
import Link from "next/link"

const initialState = { message: '' }

export default function SignUpPage() {
  const [state, formAction,] = useActionState(signUp, initialState)

  return (
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">新規登録</h1>

          <form action={formAction} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-300">メールアドレス</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-300">パスワード</label>
              <input
                type="password"
                name="password"
                placeholder="8文字以上"
                className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-300">パスワード（確認）</label>
              <input
                type="password"
                placeholder="パスワードを再入力"
                name="confirmPassword"
                className="w-full px-4 py-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            {state.message && (
              <p aria-live="polite">
                {state.message}
              </p>
            )}



            <Button type="submit" variant={"secondary"} size={"lg"}>
              アカウントを作成する
            </Button>

          </form>

          <p className="mt-6 text-sm text-zinc-400">
            すでにアカウントをお持ちですか？
            <Button asChild size={"lg"}>
            <Link href="auth/login" >
              ログイン
            </Link>
            </Button>
        

          </p>
        </div>
      </main>
  )
}



/*
    {state.message && (
          <p aria-live="polite" style={{ margin: '20px 0', color: 'green', textAlign: 'center' }}>
            {state.message}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          style={{ margin: '20px 0', padding: '10px 32px', cursor: pending ? 'not-allowed' : 'pointer' }}
        >
          {pending ? '送信中...' : '登録する'}
        </button>

*/    