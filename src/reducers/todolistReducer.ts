import {TaskType} from '../Todolist';
import {v1} from 'uuid';


export const todolistReducer = (state: TaskType[], action: todolistReducerType) => {
    switch (action.type) {
        case'REMOVE-TASK': {

            return state.filter(el=>el.id!== action.payload.id)
        }
        case "ADD-TASK":{
            let newTask = { id: v1(), title: action.payload.title, isDone: false }
            return [newTask, ...state];
        }
        default: return state
    }
}

type todolistReducerType = removeTaskACType | addTaskAcType
type removeTaskACType = ReturnType<typeof removeTaskAC >


export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id}
    } as const
}
type addTaskAcType = ReturnType<typeof addTaskAc>

export const addTaskAc = (title: string) => {
    return{
        type: 'ADD-TASK',
        payload:{title}
    }as const

}