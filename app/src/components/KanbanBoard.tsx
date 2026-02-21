import { TaskCard } from '@/components/TaskCard'

interface Task {
  id: string
  title: string
  status: string
  assignee: string
}

interface KanbanBoardProps {
  tasks: Task[]
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  const statuses = ['todo', 'in_progress', 'done'] as const

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {statuses.map((status) => (
        <div key={status}>
          <h3 style={{ textTransform: 'capitalize' }}>{status.replace('_', ' ')}</h3>
          {tasks.filter((task) => task.status === status).map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      ))}
    </section>
  )
}
