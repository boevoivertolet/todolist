import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {FullInput} from './components/Fullinput';


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskID: string) => void
    changeFilters: (todoListID: string, filter: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void//2
    filter: FilterValuesType
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    todoListID: string
    removeTodoList: (todoListID: string) => void
    addTaskHandler: (newTitle: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}


const TodoList = (props: TodoListPropsType) => {

    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''



    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListID)
    }


    const onClickButtonChangeFilter = (filter: FilterValuesType): () => void => {
        return () => props.changeFilters(props.todoListID, filter)
    }


    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        let tasksForRender;
        switch (filter) {
            case 'completed':
                tasksForRender = tasks.filter(t => t.isDone)
                break
            case 'active':
                tasksForRender = tasks.filter(t => t.isDone)
                break
            default:
                tasksForRender = tasks
        }
        return tasksForRender
    }


    const tasksForRender: Array<TaskType> = getTasksForRender(props.tasks, props.filter)
    const tasksListItems = tasksForRender.length ?
        tasksForRender.map(t => {
            const removeTask = () =>
                props.removeTask(props.todoListID, t.id)
            const taskClasses = t.isDone ? 'is-done' : ''
            const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked)
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
    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }

    return (
        <div>
            <div>
                <button onClick={removeTodoListHandler}>Х</button>
                <h3>{props.title}</h3>

                <FullInput callBack={addTaskHandler}/>

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

