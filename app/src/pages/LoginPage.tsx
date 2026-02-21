import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface LoginPageProps {
  onSuccess?: () => void
}

export function LoginPage({ onSuccess }: LoginPageProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState('operator@openclaw.dev')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login('demo-token', { id: 'u-1', name: 'Demo Operator', email })
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
      <h2>Sign in</h2>
      <label>
        Email
        <input value={email} onChange={(event) => setEmail(event.target.value)} style={{ width: '100%' }} />
      </label>
      <button type="submit" style={{ marginTop: 12 }}>
        Login
      </button>
    </form>
  )
}
