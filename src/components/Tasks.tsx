import { v4 as uuidv4 } from 'uuid';

import trash from '../assets/trash.svg';
import styles from './Tasks.module.css';

export function Tasks() {
  const tasks = [
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

  return (
    <div>
      {tasks.map((task) => {
        return (
          <div className={styles.taskCard} key={task.id}>
            <div className={styles.taskInsideBox}>

              {task.isDone ? <input className={styles.checkbox} type='radio' checked /> : <input className={styles.checkbox} type='radio'/>}

              <h1 className={styles.taskMessage}>{task.message}</h1>
              
              <button>
                <img src={trash} alt="Remover" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}