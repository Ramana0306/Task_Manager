import { useEffect, useState } from 'react'
import { taskApi } from '../api.js'
import TaskForm from './TaskForm.jsx'
import TaskList from './TaskList.jsx'

export default function Dashboard({ auth, onLogout }) {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [editingTask, setEditingTask] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadTasks() {
    setLoading(true)
    setError('')
    try {
      const statusParam = filter === 'ALL' ? undefined : filter
      const data = await taskApi.list(auth.token, statusParam)
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  async function handleToggleStatus(task) {
    try {
      await taskApi.update(auth.token, task.id, {
        ...task,
        status: task.status === 'PENDING' ? 'DONE' : 'PENDING',
      })
      loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this task?')) return
    try {
      await taskApi.remove(auth.token, id)
      loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <div className="topbar">
        <div>
          <h1>Task Manager</h1>
          <p className="subtitle">
            Hi {auth.name} — {auth.email}
          </p>
        </div>
        <button className="btn-ghost" onClick={onLogout}>
          Logout
        </button>
      </div>

      <TaskForm
        token={auth.token}
        existing={editingTask}
        onSaved={() => {
          setEditingTask(null)
          loadTasks()
        }}
        onCancel={editingTask ? () => setEditingTask(null) : null}
      />

      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        filter={filter}
        onFilterChange={setFilter}
        onToggleStatus={handleToggleStatus}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  )
}
