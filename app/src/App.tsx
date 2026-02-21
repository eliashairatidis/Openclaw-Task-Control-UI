import './App.css'
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { WebSocketProvider, useWebSocket } from '@/contexts/WebSocketContext'
import { AgentsPage } from '@/pages/AgentsPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { TaskDetail } from '@/pages/TaskDetail'
import { WorkspacePage } from '@/pages/WorkspacePage'

function AppLayout() {
  const { isAuthenticated, logout } = useAuth()
  const { isConnected } = useWebSocket()

  return (
    <Layout
      title="Openclaw Task Control"
      navigation={
        <nav>
          <Link to="/dashboard">Dashboard</Link> | <Link to="/workspaces/ws-alpha">Workspace</Link> |{' '}
          <Link to="/tasks/T-101">Task</Link> | <Link to="/agents">Agents</Link>
          {isAuthenticated ? (
            <>
              {' '}
              |{' '}
              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : null}
          <span style={{ marginLeft: 12, fontSize: 12 }}>WS: {isConnected ? 'connected' : 'disconnected'}</span>
        </nav>
      }
    >
      <Outlet />
    </Layout>
  )
}

function RequireAuth() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />
}

function LoginRoute() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <LoginPage onSuccess={() => navigate('/dashboard')} />
}

function WorkspaceRoute() {
  const { workspaceId = '' } = useParams()
  return <WorkspacePage workspaceId={workspaceId} />
}

function TaskDetailRoute() {
  const { taskId = '' } = useParams()
  return <TaskDetail taskId={taskId} />
}

function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/workspaces/:workspaceId" element={<WorkspaceRoute />} />
              <Route path="/tasks/:taskId" element={<TaskDetailRoute />} />
              <Route path="/agents" element={<AgentsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </WebSocketProvider>
    </AuthProvider>
  )
}

export default App
