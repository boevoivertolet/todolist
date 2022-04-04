import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const todoListTiTle_1 = 'What to learn';
    const todoListTiTle_2 = 'What to buy';


    const tasks_1: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS/TS', isDone: false}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 1, title: 'milk', isDone: true},
        {id: 2, title: 'sugar', isDone: false},
        {id: 3, title: 'salt', isDone: false}
    ]


    return (


        < div
            className="App">
            < TodoList
                title={todoListTiTle_1}
                tasks={tasks_1}
            />
            < TodoList
                title={todoListTiTle_2}
                tasks={tasks_2}
            />

        </div>
    )
        ;
}

export default App;
