import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';




type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilters: (filter: FilterValuesType) => void
    addTask: (title: string) => void//2
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, isDone: boolean) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}


const TodoList = (props: TodoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''
    const inputClasses = error ? 'error' : ''

    const [title, setTitle] = useState<string>('') //5

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            // 0, null, undefined, "", NaN, -0 -> false !!!!// [], {} -> true
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }//8

    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }

    }

    const onClickButtonChangeFilter = (filter: FilterValuesType): () => void => {
        return () => props.changeFilters(filter)
    }

    /* const onClickButtonFilterAll = (() => props.changeFilters('all'))
     const onClickButtonFilterActive = (() => props.changeFilters('active'))
     const onClickButtonFilterCompleted = (() => props.changeFilters('completed'))*/

    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        let tasksForRender;
        switch (filter) {
            case 'completed':
                tasksForRender = tasks.filter(t => t.isDone === true)
                break
            case 'active':
                tasksForRender = tasks.filter(t => t.isDone === false)
                break
            default:
                tasksForRender = tasks
        }
        return tasksForRender
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if(error)setError(false)

    }


    const tasksForRender: Array<TaskType> = getTasksForRender(props.tasks, props.filter)
    const tasksListItems = tasksForRender.length ?
        tasksForRender.map(t => {
            const removeTask = () =>
                props.removeTask(t.id)
            const taskClasses = t.isDone ? 'is-done' : ''
            const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
            return (
                <li key={t.id}>

                    <input type="checkbox"
                           onChange={onChangeChangeStatus}
                           checked={t.isDone}/>


                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={removeTask}>X</button>
                </li>
            )
        }) :
        <span>no tasks</span>


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
                        className={inputClasses}
                    />
                    <button onClick={onClickAddTask}>+</button>
                    {error && <div>ERROR</div>}
                    {/*//3*/}
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button
                        className={allBtnClasses}
                        onClick={onClickButtonChangeFilter('all')}>All
                    </button>
                    <button
                        className={activeBtnClasses}
                        onClick={onClickButtonChangeFilter('active')}>Active
                    </button>
                    <button
                        className={completedBtnClasses}
                        onClick={onClickButtonChangeFilter('completed')}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};


export default TodoList;

