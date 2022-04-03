

function FileType(state = "", action = {}) {

    switch (action.type) {
        case "SELECT_POST_VIDEO":
            return action.payload



        default:
            return state
    }

}

export default FileType;