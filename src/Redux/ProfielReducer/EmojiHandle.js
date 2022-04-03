function EmojiHandle(state = "", action = {}) {
    // console.log("action of loader ", action)

    switch (action.type) {
        case "ADD_EMOJI_URL":
            return action.payload


        default:
            return state
    }

}

export default EmojiHandle;