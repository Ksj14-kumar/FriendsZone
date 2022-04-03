import React from 'react'

function LoaderRedux(state = "", action = {}) {
    // console.log("action of loader ", action)

    switch (action.type) {
        case "LOADER":
            return action.payload


        default:
            return state
    }

}

export default LoaderRedux;