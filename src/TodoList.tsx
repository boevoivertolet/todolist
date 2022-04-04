import React from 'react';
import {FilterValuesType} from "./App";




type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilters: (filter: FilterValuesType) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {
    const tasksListItems = props.tasks.map(t => {
        const removeTask = () =>
            props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask
                }>УНИЧТОЖИТЬ!!!11
                </button>
            </li>
        )
    })
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button onClick={()=> props.changeFilters('all')}>All</button>
                    <button onClick={()=> props.changeFilters('active')}>Active</button>
                    <button onClick={()=> props.changeFilters('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;