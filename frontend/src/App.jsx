import React, { use, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [nextId, setNextId] = useState(1)

  const addTask = ({ title, description }) => {
    const newTask = { id: nextId, title, description, completed: false }
    setTasks([...tasks, newTask])
    setNextId(nextId + 1)
  }

  const updateTask = (taskId, updatedTitle, updatedDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task
      )
    )
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
    </div>
  )
}

export default App
