import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import Tasks from './components/tasks'
import AddTask from './components/addtask'
import Footer from './components/footer'
import about from './components/about'

const App = () => {

  const [toggleform, settoggleform] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  // Fetching tasks from db
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  }

  // fetching a particular task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  }

  // getting tasks from db and update
  const getTasks = async () => {
    const dbtasks = await fetchTasks();
    setTasks(dbtasks);
  }

  // Adding a Task
  const addTaskfunc = async (task) => {

    // for normal setTask method

    /* const id = Math.floor(Math.random() * 2000) + 1;
    const newtask = { id, ...task };
    console.log(tasks);
    setTasks([...tasks, newtask]); */

    // for json-server

    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  }

  // Delete a Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = await { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(tasks.map((task) => (task.id === id) ? { ...task, reminder: data.reminder } : task));
  }

  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker" onAddClicked={() => settoggleform(!toggleform)} isFormShowing={toggleform} />
        <Route path='/' exact render={(props) => (
          <>
            {toggleform && (<AddTask onAdd={addTaskfunc} />)}
            {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : (<h3>No tasks to show</h3>)}
            <Footer />
          </>
        )} />
        <Route path='/about' component={about} />
      </div>
    </Router>
  );
}

export default App;