import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";

import {TasksStateType} from "../AppWithRedux";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskID: string,
    todolistID: string

}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    id: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    id: string
    newTitle: string
    todolistId: string
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType


const InitialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}


export const tasksReducer = (state: TasksStateType = InitialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistID] = copyState[action.todolistID].filter(task =>
                task.id !== action.taskID)
            return copyState
        }
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: false};
            let copyState = {...state}
            copyState[action.todolistId] = [task, ...copyState[action.todolistId]]
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            console.log(state)
            // let copyState = {...state}
            // let oldTasks = copyState[action.todolistId]
            // state[action.todolistId] = oldTasks.map(task => task.id === action.id ?
            //     {...task, isDone: action.isDone} : task)
            //
            // return copyState
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map( task => task.id === action.id ?
                    {
                        ...task,
                        isDone: action.isDone
                    } : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            // let copyState = {...state}
            // let changedTask = copyState[action.todolistId]
            // state[action.todolistId] = changedTask.map(task => task.id === action.id ?
            //     {...task, title: action.newTitle} : task)
            // return copyState
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map( task => task.id === action.id ?
                    {
                        ...task,
                        title: action.newTitle
                    } : task)
            }
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = [];

            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id];


            return stateCopy
        }
        default:
            return state
    }

}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistID}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", id  , isDone,  todolistId }
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id, newTitle, todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}
