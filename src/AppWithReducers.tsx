 import React, {useReducer} from 'react';
// import './App.css';
// import {TaskType, Todolist} from './Todolist';
// import {v1} from 'uuid';
// import {AddItemForm} from './AddItemForm';
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
// import {Menu} from '@material-ui/icons';
// import {
//     addTodolistAC,
//     ChangeTodolistFilterAC,
//     ChangeTodolistTitleAC,
//     RemoveTodolistAC,
//     todolistsReducer
// } from "./state/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
//
// export type FilterValuesType = "all" | "active" | "completed";
//
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
//
// function AppWithReducers() {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ])
//
//     let [tasks, dispatchTasks] = useReducer(tasksReducer, {
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     });
//
//
//     function removeTask(id: string, todolistId: string) {
//         const action = removeTaskAC(id, todolistId)
//         dispatchTasks(action)
//
//     }
//
//     function addTask(title: string, todolistId: string) {
//         const action = addTaskAC(title, todolistId)
//         dispatchTasks(action)
//
//     }
//
//     function changeStatus(id: string, isDone: boolean, todolistId: string) {
//         const action = changeTaskStatusAC(id, isDone, todolistId)
//         dispatchTasks(action)
//
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
//         const action = changeTaskTitleAC(id, newTitle, todolistId)
//         dispatchTasks(action)
//     }
//
//     function changeFilter( value: FilterValuesType, todolistId: string) {
//         const action = ChangeTodolistFilterAC(todolistId, value)
//         dispatchToTodolists(action)
//     }
//
//     function removeTodolist(id: string) {
//         const action = RemoveTodolistAC(id)
//         dispatchToTodolists(action)
//         dispatchTasks(action)
//     }
//
//     function changeTodolistTitle(id: string, title: string) {
//         const action = ChangeTodolistTitleAC(id, title)
//         dispatchToTodolists(action)
//     }
//
//     function addTodolist(title: string) {
//         const action = addTodolistAC(title)
//         dispatchToTodolists(action)
//         dispatchTasks(action)
//     }
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: "20px"}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todolists.map(tl => {
//                             let allTodolistTasks = tasks[tl.id];
//                             let tasksForTodolist = allTodolistTasks;
//
//                             if (tl.filter === "active") {
//                                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
//                             }
//                             if (tl.filter === "completed") {
//                                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
//                             }
//
//                             return <Grid item>
//                                 <Paper style={{padding: "10px"}}>
//                                     <Todolist
//                                         key={tl.id}
//                                         id={tl.id}
//                                         title={tl.title}
//                                         tasks={tasksForTodolist}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeStatus}
//                                         filter={tl.filter}
//                                         removeTodolist={removeTodolist}
//                                         changeTaskTitle={changeTaskTitle}
//                                         changeTodolistTitle={changeTodolistTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducers;
