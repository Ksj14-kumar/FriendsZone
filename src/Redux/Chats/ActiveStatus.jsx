


function ActiveStatus(state = false, action = {}) {
    switch (action.typ) {
        case "UserActive":
            return action.payload


        default:
            return state
    }
}

export default ActiveStatus