import { authAPI } from "../api/todolists-api"
import { setIsLoggedInAC } from "../features/Login/auth-reducer"
import { Dispatch } from 'redux'
import { handleServerAppError } from "../utils/error-utils"


const initialState: InitialStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
   switch (action.type) {
       case 'APP/SET-STATUS':
       return { ...state, status: action.status }
     case 'APP/SET-ERROR':
       return {...state, error: action.error}
     case 'APP/SET-INITIALIZED':
       return {...state, isInitialized: action.isInitialized}
       default:
           return state
   }
}


export const changeAppStatusAC = (status: RequestStatusType) => {
  return {type: 'APP/SET-STATUS', status} as const
}
export const changeAppErrorAC = (error: string | null) => {
  return {type: 'APP/SET-ERROR', error} as const
}
export const setIsInitializedAC  = (isInitialized: boolean) => {
  return {type: 'APP/SET-INITIALIZED', isInitialized} as const
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(changeAppStatusAC("loading"))
  authAPI.me().then(res => {
    dispatch(setIsInitializedAC(true))
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(changeAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
  })
    .catch((error) => {
      dispatch(changeAppErrorAC(error.message))
      dispatch(changeAppStatusAC("failed"))
  })
}



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}
  


export type AppActionsType = ErrorActionType | StatusActionType | setIsInitializedType
type ErrorActionType = ReturnType<typeof changeAppErrorAC>
type StatusActionType = ReturnType<typeof changeAppStatusAC>
type setIsInitializedType = ReturnType<typeof setIsInitializedAC>

