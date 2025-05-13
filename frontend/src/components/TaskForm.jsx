import React, { useState } from 'react'

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) {
      alert('Title and description cannot be empty!')
      return
    }
    const newTask = { title, description }
    addTask(newTask)
    setTitle('')
    setDescription('')
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
      </div>
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
