import React from 'react'
import { BallTriangle, Rings, Oval, ThreeDots, Circles, RevolvingDot } from 'react-loader-spinner'
function CircleLoader({ color, height, width }) {
    return (
        <div className="con mt-[4px]">
            <Oval color={color ? color : "#F10086"} height={height ? height : 25} width={width ? width : 25} style={{ fontSize: "1rem" }} />
        </div>
    )
}

export default CircleLoader