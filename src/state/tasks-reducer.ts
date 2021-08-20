import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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



type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
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
            let copyState = {...state}
            // copyState[action.todolistId] = copyState[action.todolistId].find(t => t.id === action.id)

            let oldTasks = copyState[action.todolistId]
            let task = oldTasks.find(t => t.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return copyState
        }
        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            let newState = copyState[action.todolistId]
            const oldTitle = newState.find(el => el.id === action.id)
            if (oldTitle) {
                oldTitle.title = action.newTitle
            }

            return copyState
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = [];

            return stateCopy
        }case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
           delete stateCopy[action.id];


            return stateCopy
        }
        default:
            throw new Error("Bad action")
    }

}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistID}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", id, isDone, todolistId}
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id, newTitle, todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}
