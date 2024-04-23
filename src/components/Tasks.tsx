import { v4 as uuidv4 } from 'uuid';

import { Trash } from "phosphor-react";
import styles from './Tasks.module.css';
import { useEffect, useState } from "react";

interface TaskType {
  id: string;
  message: string;
  isDone: boolean;
}

interface TasksProps {
  addTaskCountChange: (newTask: TaskType) => void;
  onTaskCountChange: (count: number) => void;
  onDoneTaskCountChange: (doneCount: number) => void;
};

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

export function Tasks({ addTaskCountChange, onTaskCountChange, onDoneTaskCountChange }: TasksProps) {
  const [tasksList, setTasksList] = useState<TaskType[]>(tasks);

  useEffect(() => {
    onTaskCountChange(tasksList.length);
    const doneTaskCount = tasksList.filter(task => task.isDone).length;
    onDoneTaskCountChange(doneTaskCount);
  }, [tasksList]);

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

  function newTasksList(addTaskCountChange: TaskType) {
    setTasksList(prevTasks => [...prevTasks, addTaskCountChange])
    console.log('ok');
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