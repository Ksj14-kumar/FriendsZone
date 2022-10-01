function Theme(state = false, action = {}) {
    switch (action.type) {
        case "Theme":
            return action.payload
        default:
            return state
    }
}
export default Theme;