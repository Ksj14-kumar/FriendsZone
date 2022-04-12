







const LikeRedux = (state = "", action = {}) => {
    console.log("like redux", action)

    switch (action.type) {
        case 'LIKE':
            return action.payload

        default:
            return state;
    }
};



export default LikeRedux;