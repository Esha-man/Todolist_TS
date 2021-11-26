import { InitialStateType, appReducer, changeErrorAC, changeStatusAC} from "./app-reducer"

let startState: InitialStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
  }
})

test("error message should be added", () => {
  const endState = appReducer(startState, changeErrorAC("Some error!"))

 expect(endState.error).toBe("Some error!")
})
test("status should be added", () => {
  const endState = appReducer(startState, changeStatusAC("succeeded"))

 expect(endState.status).toBe("succeeded")
})