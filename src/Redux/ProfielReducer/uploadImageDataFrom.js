import React from 'react'
function uploadImageDataFrom(state = "", action = {}) {
    switch (action.type) {
        case "uploadImageDataFromServer":
            return action.payload
        default:
            return state
    }
}
function uploadImageDataFromBackground(state = "", action = {}) {
    switch (action.type) {
        case "uploadImageDataFromServerBackground":
            return action.payload
        default:
            return state
    }
}
export { uploadImageDataFromBackground }
export default uploadImageDataFrom