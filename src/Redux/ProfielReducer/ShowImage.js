

import React from 'react'

function ShowImage(state = { value: "" }, action = {}) {



    switch (action.type) {
        case "ShowImage":
            return {
                value: action.payload
            }


        default:
            return state
    }

}

function ShowImageBackground(state = { value: "" }, action = {}) {

    // console.log("background images")



    switch (action.type) {
        case "ShowImageBackground":
            return {
                value: action.payload
            }


        default:
            return state
    }

}

export {ShowImageBackground}

export default ShowImage