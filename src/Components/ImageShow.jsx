import React from 'react'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
function ImageShow(props) {

    const dispatch = useDispatch()

    return (
        <div className='imageShow'>
            <h1 style={{ color: "white", fontSize: "1rem", textAlign: "center", backgroundColor: "green", borderRadius: "15px", padding: "1rem 2rem", display: "flex", justifyContent: "space-around" }}>

                <p style={{ marginRight: ".5rem" }}> {props.text}</p>
                <Button
                    color="red"
                    buttonType="filled"
                    size="sm"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    onClick={(e) => {
                        dispatch({ type: "UNSELECT_PROFILE_IMAGE", payload: "" })
                    }}

                >
                    <Icon name={<ImCross />} size="sm" />
                </Button>
            </h1>



        </div>
    )
}


export default ImageShow