import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    /*  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
          {id: v1(), title: 'What to learn', filter: 'all'},
          {id: v1(), title: 'What to buy', filter: 'all'}
      ])*/


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });
    /*const [tasks, setTasks] = useState<Array<TaskType>>([// state,setState
              {id: v1(), title: 'HTML', isDone: true},
              {id: v1(), title: 'CSS', isDone: false},
              {id: v1(), title: 'JS/TS', isDone: false},
          ])*/

    //BLL:


    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
        /*  setTasks(tasks.filter(t => t.id !== taskID))
          console.log(tasks)*/
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone: isDone} : el)})

        /*
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))*/
    }

    const addTask = (todoListID: string, title: string) => {
        setTasks({...tasks, [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]})
        //1
        /* const newTask: TaskType= {
             id: v1(),
             title, //это   title: title
             isDone: false

         }
         const copyTasks =[...tasks]
         copyTasks.push(newTask)
         setTasks(copyTasks)*/

    }
    const removeTodoList = (todoListID: string) => {
        setTodolists(todolists.filter(el=>el.id !== todoListID))
        delete tasks[todoListID]

    }


    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map((el) => el.id === todoListID ? {...el, filter: filter} : el))


    }


//UI:


    /*   let tasksForRender;
       switch (filter) {
           case 'completed':
               tasksForRender = tasks.filter(t => t.isDone === false)
               break
           case 'active':
               tasksForRender = tasks.filter(t => t.isDone === true)
               break
           default:
               tasksForRender = tasks
       }
 */

    return (
        < div
            className="App">

            {todolists.map((el) => {
                let tasksForRender;
                switch (el.filter) {
                    case 'completed':
                        tasksForRender = tasks[el.id].filter(t => t.isDone)
                        break
                    case 'active':
                        tasksForRender = tasks[el.id].filter(t => t.isDone)
                        break
                    default:
                        tasksForRender = tasks[el.id]
                }
                return (

                    < TodoList
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasks[el.id]}
                        filter={el.filter}

                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}
                        changeFilters={changeFilter}
                        addTask={addTask}//4
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    )
        ;
}

export default App;
    