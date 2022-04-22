import React from 'react'

function PostWhichUserSelectedText(state = [], action = {}) {

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