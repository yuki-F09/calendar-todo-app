'use client'
import { useActionState } from 'react'
import { signUp } from './actions'

const initialState = { message: '' }

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, initialState)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ margin: '20px 0' }}>新規登録</h1>
      <form
        action={formAction}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 320 }}
      >
        <div style={{ margin: '20px 0', width: '100%', textAlign: 'center' }}>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: 6, boxSizing: 'border-box', border: '2px solid #ccc' }}
          />
        </div>
        <div style={{ margin: '20px 0', width: '100%', textAlign: 'center' }}>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: 6, boxSizing: 'border-box', border: '2px solid #ccc' }}
          />
        </div>
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
      </form>
    </div>
  )
}
