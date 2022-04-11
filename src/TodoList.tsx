import React, {useState} from 'react';
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilters: (filter: FilterValuesType) => void
    addTask: (title: string) => void//2

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("") //5
    const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")
    }//8


    const tasksListItems = props.tasks.map(t => {
        const removeTask = () =>
            props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask
                }>X
                </button>
            </li>
        )
    })
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title} /*//7*/
                        onChange={(e) => setTitle(e.currentTarget.value)}/*//6*/
                        //e.currentTarget -  это input
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                onClickAddTask()
                            }
                        }}

                    />
                    <button onClick={onClickAddTask}>+</button>
                    {/*//3*/}
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button onClick={() => props.changeFilters('all')}>All</button>
                    <button onClick={() => props.changeFilters('active')}>Active</button>
                    <button onClick={() => props.changeFilters('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;