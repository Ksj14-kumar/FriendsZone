function GetAllPosts(state = [], action = {}) {
    switch (action.type) {
        case "LOAD_POSTS":
            const value = action.payload.sort((a, b) => {
                return b.time - a.time
            })
            return value

        default:
            return state
    }
}
export default GetAllPosts;