import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    //BLL:
    const todoListTiTle = 'What to learn';
    const [tasks, setTasks] = useState<Array<TaskType>>([// state,setState
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS/TS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        console.log(tasks)
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
        console.log(filter)
    }


//UI:


    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        case "active":
            tasksForRender = tasks.filter(t => t.isDone === true)
            break
        default:
            tasksForRender = tasks
    }


    return (


        < div
            className="App">
            < TodoList
                title={todoListTiTle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilters={changeFilter}
            />

        </div>
    )
        ;
}

export default App;
