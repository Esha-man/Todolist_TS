import React from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { Login } from "../features/Login/Login"

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
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
import { RequestStatusType } from "../app/app-reducer"
import { Routes, Route, BrowserRouter} from "react-router-dom"
import { PageNotFound } from "../features/PageNotFound/PageNotFound" 



function App() {
    const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    

    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>+<Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
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
                        <Route path={"/"} element={ <TodolistsList />} />
                        <Route path={"*"} element={ <PageNotFound />} />
                        </Routes>
                </Container>
                <ErrorSnackBar />
            </div>
            </BrowserRouter>
    )
}

export default App
