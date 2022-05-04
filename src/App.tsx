import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {FullInput} from './components/FullInput';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    });

const editTask  = (todoListId: string,taskId: string, newTitle: string) => {
    setTasks({...tasks, [todoListId]:tasks[todoListId].map(el => el.id === taskId ? {...el,title: newTitle} : el)});
}

const editTodoList = (todoListId: string, newTitle:string) => {
    setTodoLists(todoLists.map(el=>el.id === todoListId ? {...el, title: newTitle} : el))

}


    const addTodoList = (newTitle: string) => {
        let newID =v1()
        let newTodoList: TodolistType = {
            id: newID,
            title: newTitle,
            filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks,[newID]:[]})
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTodolist(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    }

    return (
        <div className="App">


        <FullInput callBack={addTodoList}/>


            {
                todoLists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return <Todolist
                        editTask={editTask}
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}

                        tasks={tasksForTodolist}

                        editTodoList ={editTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;

