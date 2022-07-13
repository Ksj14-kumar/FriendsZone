
let userInfo = { value: "" }
function UserInformationLoad(state = { value: "" }, action = {}) {

    switch (action.type) {
        case "USERINFO_LOAD":
            userInfo = action.payload
            return {
                // ...state,
                value: action.payload
            }
        default:
            return state
    }
}

export default UserInformationLoad