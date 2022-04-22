import React, { useEffect } from 'react'
function Notification(state = [{}], action = {}) {
    switch (action.type) {
        case "Send_Notification":
            if (action.payload) {
                return [
                   
                    ...action.payload
                ]
            }
        default:
            return state
    }
}
export default Notification