







const LikeRedux = (state = 0, action = {}) => {
    console.log("action is ", action)
    switch (action.type) {
        case 'LIKE':
            return state + 1;
        case 'DISLIKE':
            return state-1;
        default:
            return state;
    }
};



export default LikeRedux;