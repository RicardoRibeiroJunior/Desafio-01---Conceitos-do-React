import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return;//se o título estiver vazio não será executado nada.

    //objeto que receberá a nova task e que depois será inserido estado de tasks.
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    //pega os dados do array existente (spread operator), adiciona a nova tarefa atraves da função
    //setTasks
    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle('');//reseta o input

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newTasks = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(newTasks);

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    //Filtra todos as task que não tem o id informado e guarda em uma nova variável
    const filteredTask = tasks.filter(task => task.id != id);

    //seta as taks filtradas no estado de taks.
    setTasks(filteredTask);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}