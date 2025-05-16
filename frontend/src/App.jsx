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

  const updateTask = async (taskId, updatedTitle, updatedDescription) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
      })

      if (response.ok) {
        const updatedTask = await response.json()

        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        )
      } else {
        console.error('Error updating task')
      }
    } catch (error) {
      console.error('Network error updating task: ', error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
      } else {
        console.error('Error deleting task')
      }
    } catch (error) {
      console.error('Network error deleting task:', error)
    }
  }

  const toggleCompletion = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId)
    if (!taskToUpdate) return

    const updatedTask = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    }
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      })
      if (response.ok) {
        const updatedFromServer = await response.json()
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? updatedFromServer : task
          )
        )
      } else {
        console.error('Error updating task completion status')
      }
    } catch (error) {
      console.error('Network error toggling completion: ', error)
    }
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
