import React, { useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion"
import { format } from "timeago.js"
import { MdWarning } from "react-icons/md"
import { BiErrorCircle } from "react-icons/bi"
import Image from '@material-tailwind/react/Image'
import Lottie from "react-lottie"
import TypingIndicator from "../../../assets/3759-typing.json"
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import Axios from "axios"
import { RiShareForwardFill } from "react-icons/ri"
import query from "query-string"
import { MdDelete } from "react-icons/md"
import ForwardMessagesComponent from '../ForwardMessagesComponent'
const defaultProps = {
    loop: true,
    autoplay: true,
    animationData: TypingIndicator
}

function MessageBox({ message, own, friendId, upload, socket, setBool, setOverlayObject, isTyping, sendMessageLoader, textMessage, messageId, docID, deleteMessage }) {
    const scrollRef = useRef(null)
    const query1 = query.parse(window.location.search)
    const [forwardComponent, setShowForwardComponent] = useState(false)
    const [takeWholeMessageForforward, setWholeMessage] = useState({})
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "auto" });
    }, [message, friendId]);
    useEffect(() => {
        async function Update() {
            //update messages when user open message box for partivular user
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/update/message/seen/status`, {
                    method: "POST",
                    body: JSON.stringify({
                        friendId: query1.q,
                        currentUser: own,
                        docId: docID
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
            } catch (err) {
            }
        }
        query1.q && Update()
    }, [message, friendId, own, docID])
    return (
        <>
            {
                forwardComponent && <ForwardMessagesComponent setShowForwardComponent={setShowForwardComponent} own={own} takeWholeMessageForforward={takeWholeMessageForforward} setWholeMessage={setWholeMessage} />
            }
            {
                message !== undefined ? message.map((text, index) => {
                    return (
                        <>
                            <div
                                className={`box  flex z-[21]  w-full ${text.senderId !== friendId ? "justify-end items-end" : "justify-start items-start"} flex-col`}
                                ref={scrollRef}
                                key={index}
                            >
                                <div className={`wrap flex items-center  w-[90%]   ${text.senderId !== friendId ? " justify-end items-end  " : "justify-end items-end flex-row-reverse"} ${own && "mr-[0rem] mb-2"}`}>
                                    <div className="forward bg-[#d3d3d391] p-2 md:p-[.25rem] rounded-full cursor-pointer hover:bg-[#989898] transition-all delay-150 hover:text-[#fff]"
                                        onClick={() => {
                                            setWholeMessage(text)
                                            setShowForwardComponent(true)
                                        }}
                                    >
                                        <RiShareForwardFill className="text-[1.2rem] md:text-[1.4rem] hover:text-[#fff]" />
                                    </div>
                                    <motion.div className={`left_message_box  overflow-hidden  max-w-[80%]  mt-[.8rem] $  ml-[.5rem] rounded-[13px]  p-2 ${text.senderId === friendId ? "friend_message" : "my_class_message"}  ${own && "mr-[.5rem] mb-2"}`}
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
                                        <div className="options  bg-[#005555] mb-1 flex justify-start rounded-md"
                                        >
                                            {text.forwarded && <p className='text-[1rem] text-[#fff] font-thin flex items-center tracking-wider italic  flex-[6]'>
                                                <RiShareForwardFill className="text-[1rem]  hover:text-[#fff] mr-1" />
                                                forwarded
                                            </p>}
                                        </div>
                                        {
                                            text.type === "text" ? (
                                                <p className="break-words  text-[#ffffff] font-serif text-lg ">{text.message}</p>
                                            ) : (
                                                text.type === "image" ? (
                                                    <SkeltonLoadingWhileMediaDownload text={text} setBool={setBool} setOverlayObject={setOverlayObject} friendId={friendId} currentId={own} />
                                                ) :
                                                    (
                                                        text.type === "video" ?
                                                            (
                                                                <>
                                                                    {
                                                                        // upload === false &&
                                                                        <>
                                                                            <MdWarning />
                                                                            <SkeltonVideoLoading text={text.message} friendId={friendId} currentId={own} />
                                                                        </>
                                                                    }
                                                                </>
                                                            ) : (
                                                                text.type === "audio" ?
                                                                    <SkeltonAudio text={text.message} friendId={friendId} currentId={own} />
                                                                    : text.type === "GIF" &&
                                                                    <Image src={text.message}
                                                                        rounded={false}
                                                                        className="cursor-pointer w-[24rem]"
                                                                    />
                                                            ))
                                            )
                                        }
                                        <section className="mt-2 text-right  text-lg text-white  flex justify-end items-center">
                                            <p className='mr-4'>
                                                {format(text.time)}
                                            </p>
                                            {text.senderId !== friendId && <p className='mr-1'>
                                                <MdDelete className='text-[1.7rem] text-[#e4e4e4] cursor-pointer'
                                                    onClick={() => {
                                                        deleteMessage(text)
                                                    }}
                                                />
                                            </p>}
                                        </section>
                                    </motion.div>
                                </div>
                            </div>
                        </>
                    )
                }) : <NoConversation />
            }
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


function SkeltonLoadingWhileMediaDownload({ text, setBool, setOverlayObject, friendId, currentId }) {
    const [loading, setLoading] = useState(false)
    const [blob, setBlob] = useState("")
    useEffect(() => {
        async function laodMediaFile() {
            try {
                setLoading(true)
                const response = await Axios({
                    url: `${process.env.REACT_APP_API_BACKENDURL}/api/v1/users/chats/single`,
                    method: "GET",
                    responseType: "blob",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                        filePath: text.message,
                        friendId: friendId,
                        roomId: "",
                        currentId: currentId,
                    }
                })
                const file = response.data
                const Url = URL.createObjectURL(file)
                setBlob(Url)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }
        laodMediaFile()
    }, [text])
    return (
        <>
            {
                loading ?
                    <div className="flex justify-center items-center bg-[#bfbfbf] w-[24rem] h-[27rem]">
                    </div> :
                    <Image src={blob}
                        rounded={false}
                        className="cursor-pointer w-[24rem]"
                        onClick={() => {
                            setBool(true)
                            setOverlayObject({
                                type: "image", url: blob, bool: true,
                                MessageId: text.messageID
                            })
                        }}
                    />
            }
        </>
    )
}

function SkeltonVideoLoading({ text, friendId, currentId }) {
    const [loading, setLoading] = useState(false)
    const [blob, setBlob] = useState("")
    useEffect(() => {
        async function laodMediaFile() {
            try {
                setLoading(true)
                const response = await Axios({
                    url: `${process.env.REACT_APP_API_BACKENDURL}/api/v1/users/chats/single`,
                    method: "GET",
                    responseType: "blob",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                        filePath: text,
                        friendId: friendId,
                        roomId: "",
                        currentId: currentId,
                    }
                })
                const file = response.data
                const Url = URL.createObjectURL(file)
                setBlob(Url)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }
        laodMediaFile()
    }, [text])
    return (
        <>
            {
                loading ?
                    <div className="flex justify-center items-center bg-[#bfbfbf] w-[24rem] h-[27rem]">
                    </div> :
                    <video width="100%" height="100%" controls
                        className="cursor-pointer -mr-[2rem] w-[24rem]"
                    >
                        <source src={blob} type="video/mp4" />
                    </video>
            }
        </>
    )
}


function SkeltonAudio({ text, friendId, currentId }) {
    const [loading, setLoading] = useState(false)
    const [blob, setBlob] = useState("")
    useEffect(() => {
        async function laodMediaFile() {
            try {
                setLoading(true)
                const response = await Axios({
                    url: `${process.env.REACT_APP_API_BACKENDURL}/api/v1/users/chats/single`,
                    method: "GET",
                    responseType: "blob",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                        filePath: text,
                        friendId: friendId,
                        roomId: "",
                        currentId: currentId,
                    }
                })
                const file = response.data
                const Url = URL.createObjectURL(file)
                setBlob(Url)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }
        laodMediaFile()
    }, [text])
    return (
        <>
            {
                loading ?
                    <div className="flex justify-center items-center bg-[#bfbfbf] w-[24rem] h-[27rem]">
                    </div> :
                    <audio controls className="cursor-pointer -mr-[2rem]" src={blob}>
                    </audio>
            }
        </>
    )
}