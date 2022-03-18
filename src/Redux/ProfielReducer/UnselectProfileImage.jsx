






function UnselectProfileImage(state = { value: "" }, action = {}) {
    console.log("action is ", action)

    switch (action.type) {
        case "UNSELECT_PROFILE_IMAGE":
            return {
                ...state,
                value: action.payload
            }
        case "SELECT_IMAGE_NAME":
            return {
                ...state,
                value: action.payload
            }


        default:
            return state
    }

}

export default UnselectProfileImage;