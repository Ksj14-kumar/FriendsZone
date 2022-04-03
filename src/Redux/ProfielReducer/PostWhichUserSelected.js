import React from 'react'

function PostWhichUserSelectedText(state = [], action = {}) {
    // console.log("user selected Text", action)

    switch (action.type) {
        case "POST_WHICH_USER_SELECTED_TEXT":
            return [
                ...state,
                ...action.payload
            ]

        

        default:
            return state
    }

}


function PostWhichUserSelectedImageORVideo(state = [], action = {}) {
    // console.log("user Images acxtion", action)

    switch (action.type) {


        case "POST_WHICH_USER_SELECTED_IMAGE":
            return [
                ...state,
                ...action.payload
            ]

        default:
            return state
    }

}

export { PostWhichUserSelectedText, PostWhichUserSelectedImageORVideo }