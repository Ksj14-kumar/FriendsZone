import Image from '@material-tailwind/react/Image'
import React, { useRef, useEffect } from 'react'
import { format } from 'timeago.js'
import Photos from "../../assets/img/team-2-800x800.jpg"
import videojs from 'video.js';
import { motion } from "framer-motion"



function GroupMessageBox({ groupMessages, currentId }) {
    const ScrollToBottom = useRef()
    const changeLinkColor = useRef()


    useEffect(() => {
        ScrollToBottom.current?.scrollIntoView({ behavior: 'auto' })
    }, [groupMessages])

    useEffect(() => {
        if (changeLinkColor.current) {
            console.log(changeLinkColor.current.innerHTML)
            // changeLinkColor.current.style.color = "blue"

        }

    }, [])


    const randColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    }



    // console.log("text-["+randColor()+"]")
    console.log({ groupMessages })
    return (
        <>
            <div className="container_fro_group_messages  w-full overflow-y-auto z-[21]"

            >
                {
                    groupMessages !== undefined && groupMessages.map((items) => {
                        return (
                            <div className={`inner4 flex w-full    ${items.userId === currentId ? "justify-end" : "justify-start"} relative`}
                                ref={ScrollToBottom}
                            >
                                {items.userId !== currentId && <motion.div
                                    initial={{ opacity: 0, x: items.userId !== currentId && -200 }}
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
                                    className="contain  w-[2rem] flex  items-end ml-2 relative">

                                    <div className="imagr_logo_container  w-[4rem]  border rounded-[100%] border-solid border-[#dadada] border-r-0 border-t-0 border-l-0 -ml-[4px] mb-[4.5px] absolute"
                                    >
                                        <Image src={items?.url}
                                            className="w-[2rem] h-[2rem] ml-[7px] mb-[2px]"
                                            rounded={true}
                                        />


                                    </div>
                                </motion.div>}
                                <motion.div

                                    initial={{ opacity: 0, x: items.userId === currentId? 10 : -200 }}
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

                                    className={`_message_wrapper p-4 pb-1 pt-1 overflow-hidden flex flex-col flex-wrap mb-2 ${items ? "bg-[#e1e1e1]" : "bg-[#dadada]"} max-w-[95%] mt-2 ${items.userId === currentId ? "mr-2  rounded-lg rounded-br-none " : "rounded-lg rounded-bl-none ml-2"}`}>
                                    {/* text-[#239E79] */}
                                    <p className={`flex justify-end mb-1 text-[1.4rem] font-serif ${items.userId === currentId ? "text-[#FF0075]" : "text-[#239E79]"}`}>~{items?.name.toLowerCase()}</p>


                                    {
                                        items.type === "text" ?
                                            (<p className="text-[1.2rem] tracking-wide"
                                                ref={changeLinkColor}
                                                dangerouslySetInnerHTML={{ __html: convertToLink(items?.message) }}>
                                                {/* {items.message} */}
                                                {/* { convertToLink(items.message)} */}
                                            </p>) :
                                            (items.type === "image" ?
                                                (<Image src={items.message} className="mb-2 w-[24rem] cursor-pointer" />) :
                                                (items.type === "GIF" ? (<Image src={items.message} className="w-[24rem] mb-2" />) :
                                                    (items.type === "video" ? (
                                                        <video width="100%" height="100%" controls
                                                            className="cursor-pointer mb-2 w-[24rem] videojs videojs"
                                                        >
                                                            <source src={items.message} type="video/mp4" />
                                                        </video>
                                                    ) : (
                                                        items.type === "audio" && (
                                                            <audio controls className="cursor-pointer mb-2 w-[24rem]" />
                                                        )
                                                    )

                                                    )
                                                )
                                            )
                                    }

                                    <p className="text-[.8rem]  flex justify-end mt-1">{format(items.time)}</p>
                                </motion.div>


                            </div>
                        )
                    })
                }




            </div>
        </>
    )
}

export default GroupMessageBox

const convertToLink = (text) => {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var text1 = text.replace(exp, "<a href='$1' class='text-blue-500 hover:underline'  target='_blank'>$1</a>");
    var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    return text1.replace(exp2, '$1<a  href="http://$2" class="text-blue-500 hover:underline">$2</a>');
}