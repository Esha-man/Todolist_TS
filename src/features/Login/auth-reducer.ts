import { Dispatch } from 'redux'
import { changeAppErrorAC, changeAppStatusAC, AppActionsType } from '../../app/app-reducer'
import { authAPI, LoginParamsType } from "../../api/todolists-api"
import { handleServerAppError } from "../../utils/error-utils"


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
export const loginTC = (loginParams: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(changeAppStatusAC('loading'))
    authAPI.login(loginParams)
        // authAPI.login(loginModel)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                // dispatch(changeAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeAppErrorAC("Some error"))
            }
            dispatch(changeAppStatusAC('failed'))
        })
        .catch((error) => {
            dispatch(changeAppErrorAC(error.message))
            dispatch(changeAppStatusAC("failed"))
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(changeAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(changeAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(changeAppErrorAC(error.message))
            dispatch(changeAppStatusAC("failed"))
        })
 }
 

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType