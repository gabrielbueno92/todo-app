import React, { useState } from 'react'

function TaskList({ tasks, updateTask, deleteTask, toggleCompletion }) {
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedDescription, setUpdatedDescription] = useState('')

  const handleEdit = (task) => {
    setEditingTaskId(task.id)
    setUpdatedTitle(task.title)
    setUpdatedDescription(task.description)
  }

  const handleUpdate = (taskId) => {
    if (!updatedTitle || !updatedDescription) {
      alert('Title and description cannot be empty!')
      return
    }
    updateTask(taskId, updatedTitle, updatedDescription)
    setEditingTaskId(null)
    setUpdatedTitle('')
    setUpdatedDescription('')
  }

  return (
    <div>
      <h2>Task List</h2>

      {tasks.length === 0 ? (
        <p>You don't have tasks at the moment</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="task"
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
                <button onClick={() => handleUpdate(task.id)}>Save</button>
              </>
            ) : (
              <>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => toggleCompletion(task.id)}>
                  {task.completed ? 'Mark Incomplete' : 'Mark Completed'}
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default TaskList
