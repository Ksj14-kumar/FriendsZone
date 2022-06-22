

function OriginalURL(state = "", action = {}) {
    switch (action.type) {
        case "OriginalProfileURL":
            return action.payload;

        default:
            return state;
    }
}



export default OriginalURL;