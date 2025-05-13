import React, { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [nextId, setNextId] = useState(1)

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error))
  }, [])

  const createTask = async ({ title, description }) => {
    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })

      if (response.ok) {
        const newTask = await response.json()
        setTasks((prevTasks) => [...prevTasks, newTask])
      } else {
        console.error('Failed to create task')
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
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
      <TaskForm addTask={createTask} />
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
