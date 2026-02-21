import { type ReactNode } from 'react'

interface TaskModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function TaskModal({ isOpen, title, onClose, children }: TaskModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div style={{ border: '1px solid #aaa', borderRadius: 12, padding: 16, marginTop: 16, background: '#f8f8f8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{title}</h3>
        <button onClick={onClose} type="button">
          Close
        </button>
      </div>
      {children}
    </div>
  )
}
