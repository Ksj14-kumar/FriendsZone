function Query(state = "", action = []) {
    switch (action.type) {
        case "query":
            return action.payload
        default:
            return state
    }
}
export default Query