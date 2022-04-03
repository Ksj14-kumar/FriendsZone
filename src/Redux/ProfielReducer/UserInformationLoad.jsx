import React from 'react'

function UserInformationLoad(state = { value: "" }, action = {}) {
    // console.log("user action infor", action)

    switch (action.type) {
        case "USERINFO_LOAD":
            return {
                ...state,
                value: action.payload
            }


        default:
            return state
    }
}

export default UserInformationLoad