import { changeAppErrorAC, changeAppStatusAC, AppActionsType} from '../app/app-reducer';
import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolists-api';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
   if (data.messages.length) {
       dispatch(changeAppErrorAC(data.messages[0]))
   } else {
       dispatch(changeAppErrorAC('Some error occurred'))
   }
   dispatch(changeAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
   dispatch(changeAppErrorAC(error.message))
   dispatch(changeAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>