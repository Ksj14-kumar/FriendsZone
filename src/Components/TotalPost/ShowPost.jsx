import React, { useRef, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Image from "@material-tailwind/react/Image";
import { BsThreeDotsVertical, BsThreeDots } from 'react-icons/bs';
import Icon from "@material-tailwind/react/Icon";

import Tippy from '@tippyjs/react/headless';
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import Spinner from "react-spinkit"
import { success } from "../../toastifyMessage/Toast";
import { useDispatch } from "react-redux";


function ShowPost({ item }) {
    const buttonRef = useRef();
    const [deletLoader, setDeleteLoader] = useState(false);
    // console.table(item);

    const dispatch = useDispatch()







    //delete the post request to the server
    async function deletePost(post_id, user_id) {
        setDeleteLoader(true);
        const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/delete/user/post/local/${post_id}`, {
            method: "DELETE",
            body: JSON.stringify({
                id: user_id
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("user_login")}`
            }
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            dispatch({ type: "LOAD_POSTS", payload: data.data })
            // window.location.reload();
            success({ message: "successfull delete" })
            setDeleteLoader(false)
        }



    }

    return (
    <div className="each-post  mt-0    mds-editor6:w-full flex justify-center gap-y-2 md:ml-2 post-screen:mt-2   md:content-between
    md:mt-[5rem]
    
    ">
            <Card className=" w-[22rem] mds-editor3:w-[15rem] px-0 pb-0 cursor-pointer mds-editor6:w-full h-full md:mt-2 "
            onClick={()=>{
                console.log(window.location.href, window.location.href=`/post/${item.post_id}`)
                window.location.href=`/post/${item.post_id}`
            }}
            >


                <header className="flex justify-between -mt-2 relative">
                    <Paragraph className="text-white text-sm ml-[]1rem">{item.createdAt}</Paragraph>

                    <Button color="white" size="sm" ripple="light"
                        iconOnly={true}
                        className="rounded-full p-1absolute right-0 top-0"
                        ref={buttonRef}

                    >
                        <Icon name={

                            <BsThreeDots className=' text-[1.2rem] 
                                        hover:text-black
                                        text-black'
                            />
                        } size="sm" />

                    </Button>
                </header>


                <CardBody className="">
                    {/* <H6 color="gray" >Card Title</H6> */}
                    <Paragraph color="gray">

                        {
                            item.text &&
                            item.text
                        }
                    </Paragraph>
                </CardBody >
                {
                    item.image &&
                    <Image src={item.image}
                        className="flex-shrink-0 p-0 rounded-none h-full "

                    />
                }

          
            </Card>
            <Popover placement="left" ref={buttonRef} className="lowercase bg-white">
                <PopoverContainer className="bg-white">
                    <PopoverHeader>Operations</PopoverHeader>
                    <PopoverBody >
                        <Button
                            className=" border-0 bg-none lowercase h-[2rem] py-4"
                            size="sm"
                            block={true}
                            onClick={() => {
                                deletePost(item.post_id, item.userId)


                            }}

                        >
                            Delete
                        </Button>

                    </PopoverBody>
                </PopoverContainer>
            </Popover>


        </div>
    )
}

export default ShowPost