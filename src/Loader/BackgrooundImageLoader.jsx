import React from 'react'
import { BallTriangle, Rings, Oval, ThreeDots } from 'react-loader-spinner'
function BackgrooundImageLoader() {
    return (
        <div className="loader" style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center" }}>

            {/* <Oval color="#2666CF" style={{ backgroundColor: "white" }} height={70} width={70} /> */}
            <Oval color="#DA1212" height={80} width={80} />
        </div>
    )
}

export default BackgrooundImageLoader