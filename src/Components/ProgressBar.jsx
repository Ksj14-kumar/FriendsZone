import React from "react";
import Progress from "@material-tailwind/react/Progress";
export default function ProgressBar(props) {
    return (
        <>
            <h3 style={{ color: "white", textAlign: "center", fontSize: "1rem", 
            marginBottom: ".5rem",
             backgroundColor:props.bgColor,
              borderRadius: "15px",
               padding: ".7rem 0rem",
                fontFamily: "sans-serif", 
                letterSpacing: "1px",
                 fontStretch: "condensed" ,
                 marginTop:".5rem"
                 }}><p>{props.text}</p></h3>
        </>
    );
}