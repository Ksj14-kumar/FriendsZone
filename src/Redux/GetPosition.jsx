

function getPos(state = { x: "", y: "" }, action = {}) {
    switch (action.type) {

        case "POS_AdminNavBar":
            return action.payload


        default:
            return state
    }
}


export default getPos;