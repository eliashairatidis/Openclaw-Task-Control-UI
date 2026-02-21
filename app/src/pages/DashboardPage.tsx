import { useState } from 'react'
import { KanbanBoard } from '@/components/KanbanBoard'
import { ModelPicker } from '@/components/ModelPicker'

const SAMPLE_TASKS = [
  { id: 'T-101', title: 'Enable GitHub sync', status: 'todo', assignee: 'Maya' },
  { id: 'T-102', title: 'Review agent policy', status: 'in_progress', assignee: 'Alex' },
  { id: 'T-103', title: 'Ship notification panel', status: 'done', assignee: 'Rina' },
]

export function DashboardPage() {
  const [model, setModel] = useState('gpt-5.2-codex')

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Live ops overview and execution queue.</p>
      <ModelPicker value={model} onChange={setModel} />
      <p>Current default model: {model}</p>
      <KanbanBoard tasks={SAMPLE_TASKS} />
    </div>
  )
}
