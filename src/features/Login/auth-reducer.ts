import { Dispatch } from 'redux'
import { changeAppErrorAC, changeAppStatusAC, AppActionsType } from '../../app/app-reducer'
import { authAPI, LoginParamsType } from "../../api/todolists-api"


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
                dispatch(changeAppErrorAC("Some error"))
            }
            dispatch(changeAppStatusAC('failed'))
        })
        .catch((error) => {
            dispatch(changeAppErrorAC(error.message))
            dispatch(changeAppStatusAC("failed"))
        })
}
// export const loginTC = (LoginParams: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
//   dispatch(changeAppStatusAC('loading'))
//   authAPI.login(LoginParams)
// //   authAPI.login(loginModel)
//   .then(res => {
//       if (res.data.resultCode === 0) {
//           dispatch(setIsLoggedInAC(true))
//           // dispatch(changeAppStatusAC("succeeded"))
//       } else {
//           let err = res.data.fieldsErrors[0]
//         //   + " " + res.data.fieldsErrors[1]
//         dispatch(changeAppErrorAC(""))
//     }
//     dispatch(changeAppStatusAC('failed'))
//   })
//   .catch((error) => {
//       dispatch(changeAppErrorAC(error.message))
//       dispatch(changeAppStatusAC("failed"))
// })
// }



// export const loginTC = (email: string,
//     password: string,
//     rememberMe: boolean,
//     captcha: boolean) => (dispatch: Dispatch<ActionsType>) => {
//   dispatch(changeAppStatusAC('loading'))
//   authAPI.login(email,
//     password,
//     rememberMe,
//     captcha)
// //   authAPI.login(loginModel)
//   .then(res => {
//       if (res.data.resultCode === 0) {
//           dispatch(setIsLoggedInAC(true))
//           // dispatch(changeAppStatusAC("succeeded"))
//       } else {
//         dispatch(changeAppErrorAC('Some error occurred'))
//     }
//     dispatch(changeAppStatusAC('failed'))
//   })
//   .catch((error) => {
//       dispatch(changeAppErrorAC(error.message))
//       dispatch(changeAppStatusAC("failed"))
// })
// }

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType