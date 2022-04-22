
function GetAllComments(state = "", action = {}) {
    switch (action.type) {
        case "Get_All_Comments":
            return action.payload


        default:
            return state

    }


}

// SET_TOTAL_COMMENT

export function TotalComment(state = 0, action = {}) {
    switch (action.type) {
        case "SET_TOTAL_COMMENT":
            return action.payload.length


        default:
            return state

    }


}

export default GetAllComments;