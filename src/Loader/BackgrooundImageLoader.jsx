import React from 'react'
import { BallTriangle, Rings, Oval, ThreeDots } from 'react-loader-spinner'
function BackgrooundImageLoader({ text }) {
    return (
        <>
         <div className="loader" style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", position:'absolute', top:"50%" }}> 
            <Oval color="#2666CF" style={{ backgroundColor: "white" }} height={70} width={70} />
            <Oval color="#630606" height={80} width={80} />
     </div> 
            </>
    )
}

export default BackgrooundImageLoader