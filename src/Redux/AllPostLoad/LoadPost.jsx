function GetAllPosts(state = [], action = {}) {
    console.log("user post comments action", action.payload)
    // console.log("user post comment state", state)
    switch (action.type) {
        case "LOAD_POSTS":
            return action.payload
       
        default:
            return state
    }
}
export default GetAllPosts;