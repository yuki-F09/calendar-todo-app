'use client'
import { createContext, useContext, useState, useCallback, useRef } from 'react'

type NotificationContextType = {
  notify: (msg: string) => void
}

const NotificationContext = createContext<NotificationContextType>({ notify: () => {} })

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const notify = useCallback((msg: string) => {
    setMessage(msg)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setMessage(null), 3000)
  }, [])

  return (
    <NotificationContext.Provider value={{ notify }}>
      {message && (
        <div className="mb-4 px-4 py-2.5 text-green-500 text-sm text-center">
          {message}
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
