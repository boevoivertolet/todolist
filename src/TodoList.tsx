import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
        const trimmedTitle = title.trim()
        if (trimmedTitle) { // 0, null, undefined, "", NaN, -0 -> false !!!!
            // [], {} -> true
            props.addTask(trimmedTitle)
        }

        setTitle("")
    }//8
    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }

    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
   /* const onClickButtonFilterAll = (() => props.changeFilters('all'))
    const onClickButtonFilterActive = (() => props.changeFilters('active'))
    const onClickButtonFilterCompleted = (() => props.changeFilters('completed'))*/
    const onClickButtonChangeFilter = (filter: FilterValuesType): () => void =>
    {
return() => props.changeFilters(filter)
    }

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
                        onChange={onChangeSetTitle}/*//6*/
                        //e.currentTarget -  это input
                        onKeyPress={onKeyPressSetTitle}

                    />
                    <button onClick={onClickAddTask}>+</button>
                    {/*//3*/}
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button onClick={onClickButtonChangeFilter("all")}>All</button>
                    <button onClick={onClickButtonChangeFilter("active")}>Active</button>
                    <button onClick={onClickButtonChangeFilter("completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;