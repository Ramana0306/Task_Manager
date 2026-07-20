import { useState } from 'react'
import { taskApi } from '../api.js'

export default function TaskForm({ token, existing, onSaved, onCancel }) {
  const [title, setTitle] = useState(existing?.title || '')
  const [description, setDescription] = useState(existing?.description || '')
  const [dueDate, setDueDate] = useState(existing?.dueDate || '')
  const [status, setStatus] = useState(existing?.status || 'PENDING')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = { title, description, dueDate: dueDate || null, status }
      if (existing) {
        await taskApi.update(token, existing.id, payload)
      } else {
        await taskApi.create(token, payload)
      }
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="row">
          <div>
            <label>Due date</label>
            <input type="date" value={dueDate || ''} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PENDING">PENDING</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="row">
          <button className="btn-primary" type="submit" disabled={saving}>
            {saving ? 'Saving...' : existing ? 'Update task' : 'Add task'}
          </button>
          {onCancel && (
            <button type="button" className="btn-ghost" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
