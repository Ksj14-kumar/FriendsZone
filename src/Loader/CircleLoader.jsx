import React from 'react'
import { BallTriangle, Rings, Oval, ThreeDots, Circles, RevolvingDot } from 'react-loader-spinner'
function CircleLoader({ color }) {
    return (
        <div className="con mt-[4px]">

            <Oval color={color ? color : "#F10086"} height={25} width={25} style={{ fontSize: "1rem" }} />
        </div>
    )
}

export default CircleLoader