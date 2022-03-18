



export const ImageReducer = (state = [], action = {}) => {
    switch (action.type) {
        case "CHANGE_IMAGE":
            return [...state, action.payload]


        default:
            return state
    }

}


