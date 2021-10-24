import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "api-key": "de66d353-a705-4b5f-bcd1-8006ed2d9ab2"
    },
})

type TodolistApiType = {
    addedDate: string
    id: string
    order: number
    title: string
}

// type CreateTodolistsResponseType = {
//     resultCode: number
//     messages: string[]
//     fieldsError: string[]
//     data: {
//         item: TodolistApiType
//     }
// }
//
//
// type DeleteTodolistsResponseType = {
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
//     data: {}
// }
//
// type UpdateTodolistsResponseType = {
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
//     data: {
//         item: TodolistApiType
//     }
// }

export type ResponseType<D> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: D
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
type CreateTaskResponse = {
    data: {
        item: TaskType
    }
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type DeleteTaskResponse = {
    resultCode: number
    messages: string[]
    data: {}
}
// type UpdateTaskResponse = {
//     data: { item: TaskType }
//     resultCode: number
//     messages: string
// }

// type UpdateTaskModelType = {
//     title: string
//     description: string
//     completed: boolean
//     status: number
//     priority: number
//     startDate: string
//     deadline: string
// }

// type UpdateTaskType = {
//     data: { item: ItemType }
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }
type UpdateTaskType<T> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type ItemType = {
    deadline: string
    description: string
    priority: number
    startDate: string
    status: number
    title: string
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistApiType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, ResponseType<{ item: TodolistApiType }>>(`todo-lists`,
            {title: title},)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<{ title: string }, ResponseType<{ item: TodolistApiType }>>(`todo-lists/${todolistId}`,
            {title: title})
    },
    getOneTask(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createOneTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, CreateTaskResponse>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteOneTask(todolistId: string, taskId: string) {
        return instance.delete<DeleteTaskResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateOneTask(todoListId: string, taskId: string, title: string) {
        return instance.put<{ title: string }, UpdateTaskType<{ item: ItemType }>>(`todo-lists/${todoListId}/tasks/${taskId}`, {title})
    },
}
/////////////-------------------- НЕ рабочий код с типизацией----------------//////////////
// updateOneTask(todoListId: string, taskId: string, item: ItemType) {
//         return instance.put<{ item: ItemType }, UpdateTaskType<{ item: ItemType }>>(`todo-lists/${todoListId}/tasks/${taskId}`, {item})
//     },
// }

/////////////-------------------- рабочий код без типизации----------------//////////////
//     updateOneTask(todolistId: string, taskId: string, title: string) {
//         return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
//     },
// }