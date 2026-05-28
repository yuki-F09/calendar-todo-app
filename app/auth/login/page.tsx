'use client'
import { useActionState } from 'react'
import { signIn } from './actions'

const initialState = { message: '' }

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ margin: '20px 0' }}>ログイン</h1>
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
          <p aria-live="polite" style={{ margin: '20px 0', textAlign: 'center' }}>
            {state.message}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          style={{ margin: '20px 0', padding: '10px 32px', cursor: pending ? 'not-allowed' : 'pointer' }}
        >
          {pending ? 'ログイン中...' : 'ログインする'}
        </button>
      </form>
    </div>
  )
}
