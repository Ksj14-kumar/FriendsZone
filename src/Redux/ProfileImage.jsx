function ProfileImage(state = "", action = {}) {
    switch (action.type) {
        case "PROFILE_IMAGE_URL":
            return action.payload
        default:
            return state
    }
}
export default ProfileImage