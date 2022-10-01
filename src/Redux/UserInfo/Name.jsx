import React from 'react'
export default function Name(state = "", action = {}) {
    switch (action.type) {
        case "NAME":
            return action.payload
        default:
            return state
    }
}
