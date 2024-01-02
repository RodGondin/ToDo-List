import styles from './App.module.css';
import logo from './assets/logo.svg';
import plusIcon from './assets/plus-icon.svg';
// import clipboard from './assets/clipboard.svg';

import { Tasks } from './components/Tasks.jsx';

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.inputDiv}>
          <input className={styles.input} type="text" placeholder='Adicione uma nova tarefa' />
          <button>
            Criar
            <img src={plusIcon} alt="Criar" />
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
                0
              </div>
            </span>

            <span className={styles.tasksInfos}>
              <span>
                Concluidas
              </span>
              <div className={styles.counter}>
                0
              </div>
            </span>

          </section>
          <div className={styles.line}/>
          <section>
            {/* <div className={styles.noTasksMessage}>
              <img src={clipboard} alt="clipboard" />
              <p className={`${styles.message} ${styles.bold}`}>Você ainda não tem tarefas cadastradas</p>
              <p className={styles.message}>Crie tarefas e organize seus itens a fazer</p>
            </div> */}

            <Tasks/>

          </section>
        </div>
      </main>
    </div>
  );
}

export default App
