import { v4 as uuidv4 } from 'uuid';

import { Trash } from "phosphor-react";
import styles from './Tasks.module.css';

interface TaskType {
  id: string;
  message: string;
  isDone: boolean;
}

export function Tasks() {
  const tasks: TaskType[] = [
    {
      id: uuidv4(),
      message: 'Estudar React',
      isDone: false,
    },
    {
      id: uuidv4(),
      message: 'Tomar café',
      isDone: false,
    },
    {
      id: uuidv4(),
      message: 'Assistir serie',
      isDone: true,
    },
  ];

  function handleIsDoneTask(event: React.MouseEvent<HTMLInputElement>, taskId: string) {
    console.log(taskId);
    console.log(event);
    if (event.target.checked) {
      for (const task of tasks) {
        task.isDone = taskId;
      }
    }
  }

  return (
    <div>
      {tasks.map((task) => {
        return (
          <div className={styles.taskCard} key={task.id}>
            <div className={styles.taskInsideBox}>

              <input className={styles.checkbox} type='radio' onClick={(event) => handleIsDoneTask(event, task.id)} />

              <h1 className={styles.taskMessage}>{task.message}</h1>

              <button className={styles.trashButton}>
                <Trash size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}