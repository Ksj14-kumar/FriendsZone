






function UnselectProfileImage(state = { value: "" }, action = {}) {

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


function UnselectBackgroundImage(state = { value: "" }, action = {}) {
    // console.log("backghround actions is", action)

    switch (action.type) {
        case "UNSELECT_BACKGROUND_IMAGE":
            return {
                ...state,
                value: action.payload
            }
        case "SELECT_BACKGROUND_NAME":
            return {
                ...state,
                value: action.payload
            }




        default:
            return state
    }

}


function UnselectPostImage(state = { value: "" }, action = {}) {
    // console.log("backghround actions is", action)

    switch (action.type) {
        case "UNSELECT_POST_IMAGE":
            return {
                ...state,
                value: action.payload
            }
        case "SELECTED_POST_IMAGE":
            return {
                ...state,
                value: action.payload
            }




        default:
            return state
    }

}


function checkUrlExitsProfile(state = { value: "" }, action = {}) {
    // console.log("backghround actions is", action)

    switch (action.type) {
        case "SetValueOfPreviewImageProfile":
            return {
             
                value: action.payload
            }
        default:
            return state
    }

}



function checkUrlExitsBg(state = { value: "" }, action = {}) {

    switch (action.type) {
        case "SetValueOfPreviewImageBg":
            return {
              
                value: action.payload
            }
        default:
            return state
    }

}





export { UnselectBackgroundImage, UnselectPostImage, checkUrlExitsProfile, checkUrlExitsBg }

export default UnselectProfileImage;