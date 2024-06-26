import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import logo from './assets/logo.svg';
import { PlusCircle } from "phosphor-react";
import clipboard from './assets/Clipboard.svg';
import { Tasks } from './components/Tasks';
import { useState, useEffect } from 'react';

export interface TaskType {
  id: string;
  message: string;
  isDone: boolean;
}

function App() {
  const [taskCount, setTaskCount] = useState(0);
  const [doneTaskCount, setDoneTaskCount] = useState(0);
  const [inputValue, setinputValue] = useState('');
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const localTasks = localStorage.getItem('tasks');
    return (
      localTasks
        ?
        JSON.parse(localTasks)
        : [
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
        ]
    )
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(event.target.value);
  };

  const addTask = () => {
    if (inputValue === '') {
      return;
    }
    else {
      const newTask = {
        id: uuidv4(),
        message: inputValue,
        isDone: false
      };
      setTasks(oldTasks => [...oldTasks, newTask]);
      setinputValue('');
    }
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTaskCount(tasks.length);
    setDoneTaskCount(tasks.filter(task => task.isDone).length);
  }, [tasks]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.inputDiv}>
          <input className={styles.input} type="text" placeholder='Adicione uma nova tarefa' value={inputValue} onChange={handleInputChange} />
          <button onClick={addTask}>
            Criar
            <PlusCircle size={19} />
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          <section className={styles.infos}>
            <span className={styles.tasksInfos}>
              <span>
                Tarefas Criadas
              </span>
              <div className={styles.counter}>
                {taskCount}
              </div>
            </span>

            <span className={styles.tasksInfos}>
              <span>
                Concluidas
              </span>
              <div className={styles.counter}>
                {doneTaskCount}
              </div>
            </span>

          </section>

          <div className={taskCount ? '' : styles.line} />

          <section>
            {tasks.length === 0 ? (
              <div className={styles.noTasksMessage}>
                <img src={clipboard} alt="clipboard" />
                <p className={`${styles.message} ${styles.bold}`}>Você ainda não tem tarefas cadastradas</p>
                <p className={styles.message}>Crie tarefas e organize seus itens a fazer</p>
              </div>
            ) : (
              <Tasks tasks={tasks} setTasks={setTasks} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
