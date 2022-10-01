import React from 'react'
function BackgroundImage(state = { value: "" }, action = {}) {
    switch (action.type) {
        case "ADD_BACKGROUND_IMAGE":
            return {
                ...state,
                value: action.payload
            }
        case "REMOVE_BACKGROUND_IMAGE":
            return {
                ...state,
                value: action.payload
            }
        default:
            return state
    }
}
export default BackgroundImage;