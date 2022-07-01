function UnreadMessageNotification(state = [], action = {}) {

    switch (action.type) {
        case "SET_UNREAD_MESSAGES":
            if (action.payload?.length > 0) {
                return action.payload
            }
        default:
            return state
    }
}



export default UnreadMessageNotification;