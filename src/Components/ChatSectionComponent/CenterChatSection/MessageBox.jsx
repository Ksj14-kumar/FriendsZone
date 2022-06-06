import React, { useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion"
import { format } from "timeago.js"
import Instance from "../../../Config/Instance"
import { MdWarning } from "react-icons/md"
import { BiErrorCircle } from "react-icons/bi"
import Image from '@material-tailwind/react/Image'
import Lottie from "react-lottie"
import TypingIndicator from "../../../assets/3759-typing.json"
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import { useSelector } from "react-redux"

const defaultProps = {
    loop: true,
    autoplay: true,
    animationData: TypingIndicator
}

function MessageBox({ message, own, friendId, upload, socket, setBool, setOverlayObject, isTyping, sendMessageLoader, textMessage, messageId, docID }) {
    const scrollRef = useRef(null)
    const IsActive = useSelector(state => {
        return state.ActiveStatus
    })







    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "auto" });

    }, [message, friendId]);
    // console.log(messageId)




    // useEffect(() => {
    //     const extract_Friends_users = user?.conversations.filter(conversation => {
    //         return conversation !== own
    //     })


    //     async function get_Friends_users_Details() {
    //         try {
    //             const resData = await Instance.get(`/api/v1/users/${extract_Friends_users}`)
    //             // console.log({ resData: resData })

    //             if (resData.status === 200) {
    //                 setFriends_users_Details({ ...resData.data })
    //             }
    //             else if (resData.status !== 200) {
    //                 setFriends_users_Details({})
    //             }

    //         }


    //         catch (err) {
    //             console.warn(err)

    //         }

    //     }

    //     get_Friends_users_Details()


    // }, [user, own, message, friendId]);














    useEffect(() => {
        async function Update() {
            try {

                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/update/message/seen/status`, {
                    method: "POST",
                    body: JSON.stringify({
                        friendId: friendId,
                        currentUser: own,
                        docId: docID
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })

                const UpdateResponse = await res.json()
                console.log(UpdateResponse)
                if (res.status === 200) {
                    // setBool(false)
                }
                else if (res.status !== 200) {
                    // setBool(true)
                }
            } catch (err) {
                console.warn(err)
            }
        }
        IsActive === true && Update()

    }, [message, friendId, own, docID])
    return (
        <>

            {

                message !== undefined ? message.map((text, index) => {
                    // console.log(text)

                    return (

                        <>

                            <div

                                className={`box  flex  w-full ${text.senderId !== friendId ? "justify-end items-end" : "justify-start items-start"} flex-col`}
                                ref={scrollRef}
                                key={text.messageID}


                            >
                                <div className={`wrap flex items-center  w-[90%]   ${text.senderId !== friendId ? "justify-end items-end" : "justify-start items-start"} ${own && "mr-[0rem] mb-2"}`}>

                                    {/* {
                                        text.messageID === messageId &&
                                        <NotUpload />
                                    } */}
                                    {

                                        messageId.includes(text.messageID) && <NotUpload />
                                    }
                                    <motion.div className={`left_message_box cursor-pointer overflow-hidden max-w-[80%]  mt-[.8rem] ${text.senderId === friendId ? "bg-[#2E0249] rounded-[13px]  rounded-bl-[0]" : "bg-[#005555] rounded-[13px]  rounded-br-[0]"}  ml-[.5rem]  p-2   ${own && "mr-[.5rem] mb-2"}`}


                                        initial={{ opacity: 0, x: text.senderId !== friendId ? 10 : -200 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            x: 0,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeInOut",
                                            type: "tween"
                                        }}

                                    >

                                        {

                                            text.type === "text" ? (
                                                <p className="break-words  text-white font-serif text-lg">{text.message}</p>
                                            ) : (
                                                text.type === "image" ? (
                                                    <Image src={text.message}
                                                        rounded={false}
                                                        className="cursor-pointer w-[24rem]"
                                                        onClick={() => {
                                                            setBool(true)
                                                            setOverlayObject({
                                                                type: "image", url: text.message, bool: true,
                                                                MessageId: text.messageID
                                                            })

                                                        }}


                                                    />
                                                ) :
                                                    (
                                                        text.type === "video" ?
                                                            (
                                                                <>
                                                                    {upload === false && <MdWarning />}

                                                                    <video width="100%" height="100%" controls
                                                                        className="cursor-pointer -mr-[2rem] w-[24rem]"
                                                                    // onClick={() => {

                                                                    //     setBool(true)
                                                                    //     setOverlayObject({ type: "video", url: text.message, bool: true })

                                                                    // }}
                                                                    >
                                                                        <source src={text.message} type="video/mp4" />
                                                                    </video>

                                                                </>
                                                            ) : (
                                                                text.type === "audio" ?
                                                                    <audio controls className="cursor-pointer -mr-[2rem]" src={text.message}>
                                                                    </audio>
                                                                    : text.type === "GIF" &&
                                                                    <Image src={text.message}
                                                                        rounded={false}
                                                                        className="cursor-pointer w-[24rem]"
                                                                    // onClick={() => {
                                                                    //     setBool(true)
                                                                    //     setOverlayObject({
                                                                    //         type: "image", url: text.message, bool: true,
                                                                    //         MessageId: text.messageID
                                                                    //     })

                                                                    // }}


                                                                    />

                                                            ))
                                            )

                                        }
                                        <p className="mt-2 text-right  text-lg text-white">{format(text.time)}
                                        </p>
                                    </motion.div>
                                </div>



                            </div>


                        </>
                    )
                }) : <NoConversation />
            }
            {/* {!textMessage.includes("blob") && <NotUpload />} */}

            {
                isTyping && <div className="flex justify-start text-white  mt-2 w-[5rem] h-[3.8rem]">

                    <Lottie
                        options={defaultProps}
                        className=""
                    />
                </div>
            }



        </>

    )
}

export default MessageBox;



function NoConversation() {
    return (
        <>
            <p className='text-[2.1rem]   flex w-full text-[#b4b3b3] tracking-wide justify-center select-none items-center '>
                Start new Conversation
            </p>


        </>
    )
}


function NotUpload() {
    const uploadFile = useRef(null)
    return (
        <>
            <p className="text-[1.5rem] bg " >
                <BiErrorCircle className="text-[1.8rem] text-[#fff] bg-[#ec0505] rounded-full" ref={uploadFile} />

            </p>
            <Tooltips placement="top" ref={uploadFile}>
                <TooltipsContent className="text-black">not upload, try again</TooltipsContent>
            </Tooltips>




        </>
    )
}