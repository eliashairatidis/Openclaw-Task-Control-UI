interface TaskCardProps {
  id: string
  title: string
  status: string
  assignee: string
}

export function TaskCard({ id, title, status, assignee }: TaskCardProps) {
  return (
    <article style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, marginBottom: 8 }}>
      <strong>{title}</strong>
      <p style={{ margin: '4px 0' }}>ID: {id}</p>
      <p style={{ margin: '4px 0' }}>Status: {status}</p>
      <p style={{ margin: '4px 0' }}>Assignee: {assignee}</p>
    </article>
  )
}
