import React from 'react'

function Modal(state = "", action = {}) {
    console.log("Model action", action)
    switch (action.type) {
        case "Model_Open":
            return action.payload

        default:
            return state
    }

}

export default Modal;