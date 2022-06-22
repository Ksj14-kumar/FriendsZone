



function BookMarkPost(state = [], action = {}) {
    switch (action.type) {
        case "BOOK_MARK_POST":
            return action.payload

        default:
            return state
    }
}


export default BookMarkPost;