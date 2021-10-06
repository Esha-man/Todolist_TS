import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void

}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist is called")
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id]);

    let allTodolistTasks = tasks;
    // let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        allTodolistTasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        allTodolistTasks = tasks.filter(t => t.isDone === true);
    }

    const addItem = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [props.id]);

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addItem}/>
        <div>
            {
                allTodolistTasks.map(t => <Task
                        task={t}
                        todolistId={props.id}
                        key={t.id}
                    />
                )
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})

