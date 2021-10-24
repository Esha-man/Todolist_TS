import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API',
    component: todolistAPI
}

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "de66d353-a705-4b5f-bcd1-8006ed2d9ab2"
    },
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((response) => {
                setState(response.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("ZZZZZZ!")
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "a8368bb6-1bf0-497c-b110-18060f3c5dd2"
        todolistAPI.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "8227420e-0784-4ece-91cd-a338f9d74f41"

        todolistAPI.updateTodolist(todolistId, "TODO")
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetOneTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const getTask = () => {
        todolistAPI.getOneTask(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={getTask}>get task</button>
        </div>
    </div>
}


export const CreateOneTask = () => {

    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const createTask = () => {

        todolistAPI.createOneTask(todolistId, taskTitle)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={"Task Title"} value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value)
                   }}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const DeleteOneTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>("8227420e-0784-4ece-91cd-a338f9d74f41")

    const deleteTask = () => {

        todolistAPI.deleteOneTask(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={"taskId"} value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}


/////////////-------------------- рабочий код без типизации----------------//////////////
// export const UpdateOneTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = "1e332fbd-4659-486c-9e18-21b6a202458c"
//         const taskId = "e650cd15-f871-48ca-987d-a68bd6c092f0"
//
//         todolistAPI.updateOneTask(todolistId, taskId, "Updated Task")
//             .then((response) => {
//                 setState(response.data)
//             })
//
//     }, [])
//     return <div> {JSON.stringify(state)}</div>
// }
/////////////-------------------- рабочий код без типизации конец----------------//////////////


///// ------------------------- не работает ----------------------//////////////
// export const UpdateOneTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [addedDate, setAddedDate] = useState<string>("")
//     const [deadline, setDeadline] = useState<string>("")
//     const [description, setDescription] = useState<string>("Description 1")
//     const [id, setId] = useState<string>("")
//     const [order, setOrder] = useState<number>(0)
//     const [priority, setPriority] = useState<number>(0)
//     const [startDate, setStartDate] = useState<string>("")
//     const [status, setStatus] = useState<number>(0)
//     const [title, setTitle] = useState<string>("111111")
//     const [todoList, setTodolist] = useState<string>("")
//     const [todoListId, setTodoListId] = useState<string>("")
//
//
//     const updateTask = () => {
//         todolistAPI.updateOneTask(todoListId, id, {
//             title: title,
//             description: description,
//             priority: priority,
//             startDate: startDate,
//             deadline: deadline,
//             status: status,
//
//         })
//             .then((response) => {
//                 setState(response.data)
//             })
//     }
//
//     return <div> {JSON.stringify(state)}
//         <div>
//             <input placeholder={"todolistId"} value={todoListId} onChange={(e) => {
//                 setTodoListId(e.currentTarget.value)
//             }}/>
//             <input placeholder={"taskTitle"} value={title} onChange={(e) => {
//                 setTitle(e.currentTarget.value)
//             }}/>
//             <input placeholder={"taskId"} value={id} onChange={(e) => {
//                 setId(e.currentTarget.value)
//             }}/>
//             <input placeholder={"status"} type="number" value={status} onChange={(e) => {
//                 setStatus(Number(e.currentTarget.value))
//             }}/>
//             <input placeholder={"priority"} type="number" value={priority} onChange={(e) => {
//                 setPriority(Number(e.currentTarget.value))
//             }}/>
//             <input placeholder={"taskDescription"} value={description} onChange={(e) => {
//                 setDescription(e.currentTarget.value)
//             }}/>
//             <button onClick={updateTask}>update task</button>
//         </div>
//     </div>
// }
    ///// ------------------------- не работает о что выше ----------------------//////////////

    export const UpdateOneTask = () => {
    const [state, setState] = useState<any>(null)
    const [addedDate, setAddedDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")
    const [description, setDescription] = useState<string>("Description 1")
    const [id, setId] = useState<string>("")
    const [order, setOrder] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [status, setStatus] = useState<number>(0)
    const [title, setTitle] = useState<string>("111111")
    const [todoList, setTodolist] = useState<string>("")
    const [todoListId, setTodoListId] = useState<string>("")


  const updateTask = () => {
              todolistAPI.updateOneTask(todoListId, id, title)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todoListId} onChange={(e) =>
            {setTodoListId(e.currentTarget.value)}}/>
            <input placeholder={"taskTitle"} value={title} onChange={(e) =>
            {setTitle(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={id} onChange={(e) =>
            {setId(e.currentTarget.value)}}/>
            <input placeholder={"status"} type="number" value={status} onChange={(e) =>
            {setStatus(Number(e.currentTarget.value))}}/>
            <input placeholder={"priority"} type="number" value={priority} onChange={(e) =>
            {setPriority(Number(e.currentTarget.value))}}/>
            <input placeholder={"taskDescription"} value={description} onChange={(e) =>
            {setDescription(e.currentTarget.value)}}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}
