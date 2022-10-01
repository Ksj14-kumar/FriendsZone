const OnlineUsers = (state = [], action = {}) => {
    switch (action.type) {
        case "onlineUsers":
            return  action.payload
        default:
            return state
    }
}
export default OnlineUsers;