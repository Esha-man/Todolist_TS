import { Dispatch } from 'redux'
import {changeAppErrorAC, changeAppStatusAC, AppActionsType} from '../../app/app-reducer'
import { authAPI, LoginParamsType } from "../../api/todolists-api"

const initialState = {
   isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'login/SET-IS-LOGGED-IN':
           return {...state, isLoggedIn: action.value}
       default:
           return state
   }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
   ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (loginModel: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(changeAppStatusAC('loading'))
  authAPI.login(loginModel)
  .then(res => {
      if (res.resultCode === 0) {
          dispatch(setIsLoggedInAC(true))
          // dispatch(changeAppStatusAC("succeeded"))
      } else {
          alert(res.messages[0])
      }
  })
  .catch((error) => {
      dispatch(changeAppErrorAC(error.message))
      dispatch(changeAppStatusAC("failed"))
})
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType