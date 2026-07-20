import TaskItem from './TaskItem.jsx'

const FILTERS = ['ALL', 'PENDING', 'DONE']

export default function TaskList({ tasks, loading, error, filter, onFilterChange, onToggleStatus, onEdit, onDelete }) {
  return (
    <>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {error && <div className="error">{error}</div>}
      {loading && <p className="muted">Loading tasks...</p>}
      {!loading && tasks.length === 0 && <p className="muted">No tasks yet.</p>}

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  )
}
