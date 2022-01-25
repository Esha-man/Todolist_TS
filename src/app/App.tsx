import React, { useEffect } from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { Login } from "../features/Login/Login"

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { ErrorSnackBar } from "../components/ErrorSnackBar/ErrorSnackBar"
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { RequestStatusType, initializeAppTC } from "./app-reducer"
import { Routes, Route } from "react-router-dom"
import { PageNotFound } from "../features/PageNotFound/PageNotFound"
import { CircularProgress } from '@mui/material';
import { logoutTC } from "../features/Login/auth-reducer"



function App() {
    const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
        </div>
    }

    const logoutFunc = () => {
        dispatch(logoutTC())
    }

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn ? <Button onClick={logoutFunc} color="inherit">Logout</Button> : <Button color="inherit">Login</Button>}
                </Toolbar>
                {
                    loadingStatus === 'loading' &&
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                }
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"login"} element={<Login />} />
                    <Route path={"/"} element={<TodolistsList />} />
                    <Route path={"*"} element={<PageNotFound />} />
                </Routes>
            </Container>
            <ErrorSnackBar />
        </div>

    )
}

export default App
