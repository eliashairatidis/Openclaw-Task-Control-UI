import { useState } from 'react'
import { TaskModal } from '@/components/TaskModal'

interface WorkspacePageProps {
  workspaceId: string
}

export function WorkspacePage({ workspaceId }: WorkspacePageProps) {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <section>
      <h2>Workspace {workspaceId}</h2>
      <p>Environment controls, permissions, and task lanes.</p>
      <button type="button" onClick={() => setModalOpen(true)}>
        Quick create task
      </button>
      <TaskModal isOpen={isModalOpen} title="Create task" onClose={() => setModalOpen(false)}>
        <p>Task form placeholder with title, priority, and linked agent fields.</p>
      </TaskModal>
    </section>
  )
}
