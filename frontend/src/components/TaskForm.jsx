import React, { use, useState } from 'react'

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) {
      {
        setErrorMessage('Title and description must not be empty')
      }
      return
    }
    const newTask = { title, description }
    addTask(newTask)
    setTitle('')
    setDescription('')
    setErrorMessage('')
  }
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div>
        <label>Title: </label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>Description: </label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Task description"
        />
        {errorMessage && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>
        )}
      </div>
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
