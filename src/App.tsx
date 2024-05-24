import { useEffect, useState } from 'react';
import styles from './App.module.css'
import { fetchTaks, postNewTask, sendUpdateTaskStatus } from './infraestructure/TaksRepository';
import { TasksTable } from './components/tasks-table/TasksTable';
import { NewTask } from './components/new-task/NewTask';
import { Task } from './domain/model/Task';
import { Summary } from './components/summary/Summary';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchTaks().then((data) => setTasks(data));
  }, []);

  const handleNewTask = (task: Task) => {
    postNewTask(task);
  }
  const handleToggleTask = (task: Task) => {
    const updatedTask: Task = { ...task, status: task.status === 'DONE' ? 'TO-DO' : 'DONE' }
    sendUpdateTaskStatus(updatedTask);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tasks List</h1>
      {tasks.length ? <TasksTable tasks={tasks} toggleTask={handleToggleTask} /> : null}
      <NewTask newTaskEvent={handleNewTask} />
      <Summary list={tasks} />
    </div>);
}

export default App
