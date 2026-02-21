import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface WebSocketContextValue {
  socket: WebSocket | null
  isConnected: boolean
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined)

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:4000/ws'

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!token) {
      setSocket(null)
      setIsConnected(false)
      return
    }

    const ws = new WebSocket(`${WS_URL}?token=${encodeURIComponent(token)}`)

    ws.addEventListener('open', () => setIsConnected(true))
    ws.addEventListener('close', () => setIsConnected(false))
    ws.addEventListener('error', () => setIsConnected(false))

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [token])

  const value = useMemo(() => ({ socket, isConnected }), [socket, isConnected])

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>
}

export function useWebSocket() {
  const context = useContext(WebSocketContext)

  if (!context) {
    throw new Error('useWebSocket must be used inside WebSocketProvider')
  }

  return context
}
