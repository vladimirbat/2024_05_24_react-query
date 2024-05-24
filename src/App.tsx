import styles from './App.module.css';
import { NewTask } from './components/new-task/NewTask';
import { Summary } from './components/summary/Summary';
import { TasksTable } from './components/tasks-table/TasksTable';
import { Task } from './domain/model/Task';
import { postNewTask, sendUpdateTaskStatus } from './infraestructure/TaksRepository';
import { useTasksList } from './queries/useTasksList';
import { useToggleTaskMutation } from './queries/useToggleTaskMutation';

function App() {

  const { data: tasks, isError, isSuccess } = useTasksList()
  const { mutate } = useToggleTaskMutation();

  const handleToggleTask = (task: Task) => {
    const updatedTask: Task = { ...task, status: task.status === 'DONE' ? 'TO-DO' : 'DONE' }
    mutate(updatedTask);
  }

  // if (!tasks || tasks.length == 0) {
  if (!isSuccess) {
    return null;
  }
  if (isError) {
    return <div>Ops!!! Error</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tasks List</h1>
      <TasksTable toggleTask={handleToggleTask} />
      <NewTask />
      <Summary />
    </div>);
}

export default App
