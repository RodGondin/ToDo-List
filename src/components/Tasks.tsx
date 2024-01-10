import { v4 as uuidv4 } from 'uuid';

import { Trash } from "phosphor-react";
import styles from './Tasks.module.css';
import { useState } from "react";

interface TaskType {
  id: string;
  message: string;
  isDone: boolean;
}

const tasks: TaskType[] = [
  {
    id: uuidv4(),
    message: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
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

export function Tasks() {
  const [tasksList, setTasksList] = useState<TaskType[]>(tasks);

  function handleIsDoneTask(isChecked: boolean, taskToChange: TaskType) {
    const updatedTasks = tasksList.map(task => {
      if (task.id === taskToChange.id) {
        return { ...task, isDone: isChecked };
      }

      return task;
    });

    setTasksList(updatedTasks);
  }

  function deleteToDo(taskToDelete: TaskType) {
    const tasksWithoutTheDeleted = tasksList.filter(task => {
      return task !== taskToDelete;
    })

    setTasksList(tasksWithoutTheDeleted);
  }

  return (
    <div>
      {tasksList.map((task) => {
        return (
          <div className={styles.taskCard} key={task.id}>
            <div className={styles.taskInsideBox}>

              <input
                className={styles.checkbox} type='checkbox'
                onChange={(event) => handleIsDoneTask(event.target.checked, task)}
                checked={task.isDone}
              />

              <h1 className={`${styles.taskMessage} ${task.isDone ? styles.taskMessageDone : ''}`}>{task.message}</h1>

              <button
                onClick={() => deleteToDo(task)}
                className={styles.trashButton}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}