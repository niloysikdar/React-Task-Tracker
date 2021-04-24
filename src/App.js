import { useState, useEffect } from 'react'
import Header from './components/header'
import Tasks from './components/tasks'
import AddTask from './components/addtask'

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

  // getting tasks from db and update
  const getTasks = async () => {
    const dbtasks = await fetchTasks();
    setTasks(dbtasks);
  }

  // Adding a Task
  const addTaskfunc = (task) => {
    const id = Math.floor(Math.random() * 2000) + 1;
    const newtask = { id, ...task };
    console.log(tasks);
    setTasks([...tasks, newtask]);
    console.log(tasks);
  }

  // Delete a Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => (task.id === id) ? { ...task, reminder: !task.reminder } : task));
  }

  return (
    <div className="container">
      <Header title="Task Tracker" onAddClicked={() => settoggleform(!toggleform)} isFormShowing={toggleform} />
      {toggleform && (<AddTask onAdd={addTaskfunc} />)}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : (<h3>No tasks to show</h3>)}
    </div>
  );
}

export default App;