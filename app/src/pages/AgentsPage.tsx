const AGENTS = [
  { id: 'agent-1', name: 'Planner', status: 'online' },
  { id: 'agent-2', name: 'Codegen', status: 'online' },
  { id: 'agent-3', name: 'QA', status: 'offline' },
]

export function AgentsPage() {
  return (
    <section>
      <h2>Agents</h2>
      <ul>
        {AGENTS.map((agent) => (
          <li key={agent.id}>
            {agent.name} ({agent.id}) — {agent.status}
          </li>
        ))}
      </ul>
    </section>
  )
}
