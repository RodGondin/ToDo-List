import { Trash } from "phosphor-react";
import styles from './Tasks.module.css';
import { TaskType } from '../App';

interface TasksProps {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export function Tasks({ tasks, setTasks }: TasksProps) {
  const handleIsDoneTask = (isChecked: boolean, taskToChange: TaskType) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskToChange.id) {
        return { ...task, isDone: isChecked };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteToDo = (taskToDelete: TaskType) => {
    const tasksWithoutTheDeleted = tasks.filter(task => task.id !== taskToDelete.id);
    setTasks(tasksWithoutTheDeleted);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div className={styles.taskCard} key={task.id}>
          <div className={styles.taskInsideBox}>
            <input
              className={styles.checkbox} type='checkbox'
              onChange={(event) => handleIsDoneTask(event.target.checked, task)}
              checked={task.isDone}
            />
            <h1 className={`${styles.taskMessage} ${task.isDone ? styles.taskMessageDone : ''}`}>{task.message}</h1>
            <button onClick={() => deleteToDo(task)} className={styles.trashButton}>
              <Trash size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
