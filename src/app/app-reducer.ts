

const initialState: InitialStateType = {
  status: "idle",
  error: null,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
   switch (action.type) {
       case 'APP/SET-STATUS':
       return { ...state, status: action.status }
     case 'APP/SET-ERROR':
       return {...state, error: action.error}
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



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
}
  


export type AppActionsType = ErrorActionType | StatusActionType
type ErrorActionType = ReturnType<typeof changeAppErrorAC>
type StatusActionType = ReturnType<typeof changeAppStatusAC>

