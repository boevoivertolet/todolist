import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import {addTaskAc, removeTaskAC, todolistReducer} from './reducers/todolistReducer';
import {changeFilterAc, filterReducer} from './reducers/filterReducer';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

   /* let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);*/
    let [tasks, tasksDispatch] = useReducer(todolistReducer,[
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);


    function removeTask(id: string) {
        /*let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/

        tasksDispatch(removeTaskAC(id))
    }

    function addTask(title: string) {
       /* let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/
        tasksDispatch(addTaskAc(title))
    }

    /*let [filter, setFilter] = useState<FilterValuesType>("all");*/
    let [filter, filterDispatch] = useReducer(filterReducer,"all");
    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        /*setFilter(value);*/
        filterDispatch(changeFilterAc(value))
    }



    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask} />
        </div>
    );
}

export default App;
