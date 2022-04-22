

export const Init = null

export const Reducer = (state = Init, action) => {



    return action.type === 'USER' ? action.payload : state
}