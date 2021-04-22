import { useState } from 'react'
import Header from './components/header'
import Tasks from './components/tasks'

const App = () => {
  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        day: 'Apr 1st at 1:20pm',
        reminder: true,
      },
      {
        id: 2,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        day: 'Apr 2st at 5:40pm',
        reminder: false,
      },
      {
        id: 3,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        day: 'Apr 10st at 6:30am',
        reminder: true,
      }
    ]
  );

  // Delete a Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }


  return (
    <div className="container">
      <Header title="Task Tracker" />
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} />) : (<h2>No tasks to show</h2>)}
    </div>
  );
}

export default App;