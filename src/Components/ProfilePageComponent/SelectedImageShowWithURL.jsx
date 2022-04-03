import React from 'react'
import Image from "@material-tailwind/react/Image";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
function SelectedImageShowWithURL(props) {
    const dispatch = useDispatch()

    console.log("props for video0", props)


    const FileType = useSelector((state) => {
        console.log("state is for chanmge file type ", state)
        return state.FileType
    })


    return (

        <div className="image-container w-full h-full relative">

            {
                FileType === "video" ?
                    <iframe className="w-full h-full" src={props.text ? props.text : "NA"} frameBorder="1" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    : <Image
                        src={props.text ? props.text : "NA"}
                        rounded={false}
                        raised={true}
                        alt="Rounded Raised Image"
                        className="rounded-sm"
                    />
            }
            {/* [13.8rem] left-[17.5rem] */}
            <Button
                className="cross-btn absolute top-[.5rem] left-[17.5rem] z-[1000]"
                color="gray"
                buttonType="outline"
                size="sm"
                rounded={true}
                block={false}
                iconOnly={true}
                ripple="light"

                onClick={() => {
                    dispatch({ type: "UNSELECT_POST_IMAGE", payload: "" })
                }}



            >
                <Icon name={<ImCross />} size="sm" />
            </Button>

        </div>


    )
}

export default SelectedImageShowWithURL