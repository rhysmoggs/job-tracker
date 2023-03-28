import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch ('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch (`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task function
  const addTask = async (task) => {
    // // create a new random id when a task is created (not relevant if using server that auto-creates an id)
    // const id = Math.floor(Math.random() * 1000) +1
    // // add the created id to the current task object passed in (task, day, reminder )
    // const newTask = { id, ...task }
    // // create an array
    // setTasks([...tasks, newTask])

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      // as we're adding - need to add headers as to specify content-type
      headers: {
        'Content-type': 'application/json'
      },
      // turn from js object into json string:
      body: JSON.stringify(task)
    })

    // data returned will be the new task added
    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task function
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
  
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    // get the task:
    const taskToToggle = await fetchTask(id)
    // create new task and put in variable
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch (`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        <Routes>
          <Route path='/' exact element={(
            <>
              {/* if showAddTask is true, show addTask component. Shorthand method of a ternary. Don't need else statement */}
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Do'}
            </>
          )} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
