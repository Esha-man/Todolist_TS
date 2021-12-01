import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux"
import { loginTC } from "./auth-reducer"
import { AppRootStateType } from '../../app/store';
import { Routes, Route, useNavigate } from "react-router-dom"
import { TodolistsList } from "../TodolistsList/TodolistsList"



// type FormikErrorType = {
//     email?: string
//     password?: string
//     rememberMe?: boolean
// }

export const Login = () => {
    const dispatch = useDispatch()


    // if (isLoggedIn) {
    //     <Routes>
    //         <Route path={"login"} element={<Login />} />
    //         <Route path={"/"} element={<TodolistsList />} />
    //         <Route path={"login"} element={<Navigate replace to={"/"} />} />
    //     </Routes>
    // }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: true,
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required email"),
            password: Yup.string().min(4).required("Password required"),
        })
    })

    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    if (isLoggedIn) navigate("/")

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={(e) => formik.handleSubmit(e)}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'} target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        {/* <TextField
                            label="Email"
                            margin="normal"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                        /> */}

                        <TextField
                            type="email"
                            label="Email"
                            {...formik.getFieldProps("email")}
                        />

                        {formik.touched.email && formik.errors.email ? <div style={{ color: "red", height: "30px" }}>{formik.errors.email}</div> : <div style={{ height: "30px" }}></div>}

                        <TextField
                            type="password"
                            label="Password"
                            {...formik.getFieldProps("password")}
                        />

                        {formik.touched.password && formik.errors.password ? <div style={{ color: "red", height: "30px" }}>{formik.errors.password}</div> : <div style={{ height: "30px" }}></div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                                name="rememberMe"
                            />}
                        />
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                        >
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
