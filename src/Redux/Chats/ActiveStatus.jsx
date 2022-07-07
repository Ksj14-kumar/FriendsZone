


function ActiveStatus(state = { status: false, _id: null }, action = {}) {
    switch (action.typ) {
        case "UserActive":
            return action.payload
        default:
            return state
    }
}

export default ActiveStatus