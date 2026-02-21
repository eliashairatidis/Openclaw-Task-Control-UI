interface TaskDetailProps {
  taskId: string
}

export function TaskDetail({ taskId }: TaskDetailProps) {
  return (
    <section>
      <h2>Task {taskId}</h2>
      <p>Status: In progress</p>
      <p>Latest event: Agent run started with branch bootstrap/openclaw-ui</p>
    </section>
  )
}
