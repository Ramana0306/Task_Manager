export default function TaskItem({ task, onToggleStatus, onEdit, onDelete }) {
  return (
    <div className={`task ${task.status === 'DONE' ? 'done' : ''}`}>
      <div>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        {task.dueDate && <p className="muted">Due: {task.dueDate}</p>}
        <span className={`badge ${task.status}`}>{task.status}</span>
      </div>
      <div className="task-actions">
        <button className="btn-secondary" onClick={() => onToggleStatus(task)}>
          Mark {task.status === 'PENDING' ? 'Done' : 'Pending'}
        </button>
        <button className="btn-secondary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}
