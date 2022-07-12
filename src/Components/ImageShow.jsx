import React from 'react'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
function ImageShow(props) {
    const dispatch = useDispatch()
    return (
        <div className='imageShow absolute top-[2%] right-[2%]'>
                <Button
                    color="red"
                    buttonType="filled"
                    size="sm"
                    rounded={false}
                    block={false}
                    iconOnly={true}
                    ripple="light"
                    onClick={(e) => {
                        dispatch({ type: "SetValueOfPreviewImageProfile", payload: "" })
                        dispatch({ type: "SetValueOfPreviewImageBg", payload: "" })
                    }
                    }
                >
                    <Icon name={<ImCross />} size="sm" />
                </Button>
        </div>
    )
}


export default ImageShow