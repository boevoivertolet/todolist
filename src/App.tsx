import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    console.log(typeof v1())
    //BLL:
    const todoListTiTle = 'What to learn';
    const [tasks, setTasks] = useState<Array<TaskType>>([// state,setState
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS/TS', isDone: false},
    ])
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        console.log(tasks)
    }
    const changeTaskStatus = (taskID: string, isDone:boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone}: t))
    }


    const addTask = (title: string) => { //1
        /* const newTask: TaskType= {
             id: v1(),
             title, //это   title: title
             isDone: false

         }
         const copyTasks =[...tasks]
         copyTasks.push(newTask)
         setTasks(copyTasks)*/
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
   /* function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/


    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
        console.log(filter)
    }


//UI:


    /*  let tasksForRender;
      switch (filter) {
          case 'completed':
              tasksForRender = tasks.filter(t => t.isDone === false)
              break
          case 'active':
              tasksForRender = tasks.filter(t => t.isDone === true)
              break
          default:
              tasksForRender = tasks
      }*/


    return (


        < div
            className="App">
            < TodoList
                title={todoListTiTle}
                tasks={tasks}
                filter={filter}


                changeTaskStatus={changeTaskStatus}
                removeTask={removeTask}
                changeFilters={changeFilter}
                addTask={addTask}//4
            />

        </div>
    )
        ;
}

export default App;
    