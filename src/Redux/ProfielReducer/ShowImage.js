function ShowImage(state = { value: "" }, action = {}) {
    switch (action.type) {
        case "ShowImage":
            if (action.payload) {
                return {
                    value: action.payload
                }
            }
        default:
            return state
    }
}
function ShowImageBackground(state = { value: "" }, action = {}) {
    switch (action.type) {
        case "ShowImageBackground":
            return {
                value: action.payload
            }
        default:
            return state
    }
}
export { ShowImageBackground }
export default ShowImage