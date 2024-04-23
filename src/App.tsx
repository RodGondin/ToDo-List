import { v4 as uuidv4 } from 'uuid';

import styles from './App.module.css';
import logo from './assets/logo.svg';
import { PlusCircle } from "phosphor-react";

import clipboard from './assets/Clipboard.svg';

import { Tasks } from './components/Tasks.jsx';
import { useState } from 'react';

function App() {
  const [taskCount, setTaskCount] = useState(0);
  const [doneTaskCount, setDoneTaskCount] = useState(0);
  const [inputValue, setinputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(event.target.value);
  };

  const handleTaskCountChange = (newCount: number) => {
    setTaskCount(newCount);
  };

  const handleDoneTaskCountChange = (newCount: number) => {
    setDoneTaskCount(newCount);
  };

  const addTaskCountChange = () => {
    const newTask = {
      id: uuidv4(),
      message: inputValue,
      isDone: false
    };

    setinputValue(''); // Limpa o input após adicionar a tarefa
    return newTask;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.inputDiv}>
          <input className={styles.input} type="text" placeholder='Adicione uma nova tarefa' value={inputValue} onChange={handleInputChange} />
          <button
            onClick={addTaskCountChange}
          >
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
            <div className={taskCount ? styles.hidden : styles.noTasksMessage}>
              <img src={clipboard} alt="clipboard" />
              <p className={`${styles.message} ${styles.bold}`}>Você ainda não tem tarefas cadastradas</p>
              <p className={styles.message}>Crie tarefas e organize seus itens a fazer</p>
            </div>

            <Tasks addTaskCountChange={addTaskCountChange} onTaskCountChange={handleTaskCountChange} onDoneTaskCountChange={handleDoneTaskCountChange} />

          </section>
        </div>
      </main>
    </div>
  );
}

export default App
