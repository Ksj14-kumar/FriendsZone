

export const Init = null

export const Reducer = (state = Init, action) => {

    // console.log("initial; state", state)
    // console.log("initial action is", action)

    return action.type === 'USER' ? action.payload : state
}