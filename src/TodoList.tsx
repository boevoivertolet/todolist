import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    editTodoList: (todoListId: string, newTitle: string) => void
    editTask: (todoListId: string, taskId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }
    const editTodoListHandler = (newTitle: string) => {
        props.editTodoList(props.id, newTitle)
    }
    const editTaskHandler = (tId: string, newTitle: string) => {
        props.editTask(props.id, tId, newTitle)
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={editTodoListHandler}/>
            <IconButton onClick={removeTodolist} aria-label="delete" size="small">
                <Delete fontSize="inherit"/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>

        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>

                        <Checkbox onChange={onChangeHandler}
                                  checked={t.isDone}
                        />

                        <EditableSpan title={t.title} callBack={(newTitle) => editTaskHandler(t.id, newTitle)}
                        />

                        <IconButton onClick={onClickHandler} aria-label="delete" size="small">
                            <Delete fontSize="inherit"/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>

            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}


