import React from 'react'
import { BallTriangle, Rings, Oval, ThreeDots } from 'react-loader-spinner'
function ProfileLoader() {
    return (
        <div className="loader" style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center" }}>
            <ThreeDots color="#2666CF" height={80} width={80} />
        </div>
    )
}
export default ProfileLoader