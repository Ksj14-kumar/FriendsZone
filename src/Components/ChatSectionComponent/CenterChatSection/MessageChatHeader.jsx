import React, { useState, useEffect, useRef } from 'react'
import Image from '@material-tailwind/react/Image';
import { MdLocalPhone, } from 'react-icons/md';
import { IoIosVideocam } from 'react-icons/io';
import { BsArrowLeft, BsThreeDotsVertical } from 'react-icons/bs';
import { IoSearchOutline } from "react-icons/io5"
import { BiBlock } from "react-icons/bi"
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi"
import Photo from "../../../assets/img/download.png"
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
function MessageChatHeader({ chatHeader, setVideoOverlay, q, RoomData, setRoomChatHeader, RoomChatHeader, groupMessageLoader, SingleChatLoader, setQuery, own, socket, setBlokedUser, blockUser, BlockUser }) {
    const history = useHistory()
    const HideThreeDotsComponent = useRef(null)
    const [isOnline, setOnline] = useState({ friendId: "", status: false })
    const [showThreeDotsComponent, setThreeDotsComponent] = useState(false)
    const [showHeaderSearchBar, setShowHeaderSearchBar] = useState(false)
    useEffect(() => {
        function HideThreeDotsComponent(e) {
            if (HideThreeDotsComponent.current && !HideThreeDotsComponent.current.contains(e.target)) {
                setThreeDotsComponent(false)
            }
        }
        document.addEventListener("click", HideThreeDotsComponent)
        return () => {
            document.removeEventListener("click", HideThreeDotsComponent)
        }
    }, [HideThreeDotsComponent])
    useEffect(() => {
        socket?.emit("isUserOnline", { friendId: q, currentUser: own })
        socket?.on("isOnline", (data) => {
            setOnline(data)
        })
    }, [socket, q])
    return (
        <div>
            {
                showHeaderSearchBar &&
                <motion.div className='header search bar absolute z-[22] flex w-full h-[4.2rem] bg-[#b7b6b6]'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="arrow flex-[1]  flex justify-center items-center cursor-pointer"
                        onClick={() => {
                            setShowHeaderSearchBar(false)
                        }}
                    >
                        <BsArrowLeft className='text-[2rem] text-[#171717]' />
                    </div>
                    <div className="input_field flex flex-[8]  py-3 px-2">
                        <input type="search" className='w-full focus:outline-none rounded-md px-3 font-serif tracking-wider text-[1.1rem]' placeholder='Search...' autoFocus
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                        />
                    </div>
                    <div className="up_down_arrow flex flex-[1]  items-center justify-center ">
                        <HiArrowSmUp className='text-[2.5rem] mr-3 cursor-pointer' />
                        <HiArrowSmDown className='text-[2.5rem] mr-2 cursor-pointer' />
                    </div>
                </motion.div>
            }
            <header className={`top_header   top flex justify-between bg-[#d6d6d6]    drop-shadow-lg   mds-editor23:w-full w-full py-3 relative md:py-2 ${q?.length === 9 ? "cursor-pointer" : ""}`}
                disabled={q?.length === 9 ? true : false}
            >
                {
                    // <AnimatePresence>
                    showThreeDotsComponent &&
                    <motion.div className="three_dots_components absolute top-[4.3rem] right-[2px] bg-[#fff] z-[19] w-[19rem] rounded-md p-3"
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        exit={{ opacity: 0 }}
                        ref={HideThreeDotsComponent}
                    >
                        <ThreeDotsComponents setShowHeaderSearchBar={setShowHeaderSearchBar} showHeaderSearchBar={showHeaderSearchBar} setThreeDotsComponent={setThreeDotsComponent} setBlokedUser={setBlokedUser} blockUser={blockUser} BlockUser={BlockUser} />
                    </motion.div>
                    // </AnimatePresence>
                }
                <div className="left_t flex flex-4 justify-around items-center  ml-[0rem]"
                    onClick={() => {
                        (q?.length === 9 && !groupMessageLoader) &&
                            setRoomChatHeader(!RoomChatHeader)
                    }}
                >
                    <div className="arrow_left ml-[5px] w-[3rem] cursor-pointer md:hidden flex"
                        onClick={() => {
                            history.push("/")
                        }}
                    >
                        <BsArrowLeft className='text-[2rem] text-[#171717]' />
                    </div>
                    <div className="top_left_header w-[2.8rem] h-[2.84rem] flex-shrink-0 cursor-pointer relative ">
                        {
                            q?.length !== 9 ? (chatHeader.url ?
                                <ChangeURL url={chatHeader.url} />
                                :
                                <Image
                                    src={Photo}
                                    rounded={true}
                                    raised={false}
                                    alt=""
                                />) : (RoomData.url ?
                                    <ChangeURL url={RoomData.url} />
                                    : (
                                        <Image
                                            src={Photo}
                                            rounded={true}
                                            raised={false}
                                            alt=""
                                            className="flex-shrink-0 w-full h-full"
                                        />
                                    ))
                        }
                        {isOnline.friendId === q && isOnline.status && <div className="div bg-[#20fa08] h-[.7rem] w-[.7rem] rounded-full absolute top-[24px] right-0 animate-pulse border-[1px] border-solid border-[#ffff]"></div>}
                    </div>
                    <div className="top_center_header ml-[1rem] cursor-pointer  flex flex-col ">
                        <p className='text-[1.2-rem] tracking-wider font-medium font-serif text-[#1a1919] truncate'>{
                            SingleChatLoader ? "" : (q?.length !== 9 ? chatHeader !== undefined && chatHeader?.fname + " " + chatHeader?.lname : RoomData !== undefined ? RoomData.RoomName : "")
                        }
                            <br />
                            {
                                q?.length === 9 &&
                                <small classNAme="text-[1.2rem] tracking-wider text-semibold">Room</small>
                            }
                        </p>
                    </div>
                </div>
                {
                    q &&
                    <div className="right_top_header  mr-[.2rem]   flex  w-[10rem] px-2 items-center flex-[5] justify-end md:gap-x-4 gap-x-2">
                        <div className="video bg-[#fff] w-[2.7rem] h-[2.7rem] rounded-full flex justify-center items-center cursor-pointer"
                            onClick={(e) => {
                                setVideoOverlay(true)
                            }}
                        >
                            <IoIosVideocam className="video_icon text-[1.8rem]  text-[#111363] hover:text-[#166a0b]" />
                        </div>
                        <div className="audio bg-[#fff] w-[2.7rem] h-[2.7rem] rounded-full flex justify-center items-center cursor-pointer hover:text-[#166a0b]">
                            <MdLocalPhone className="audio_icon text-[1.5rem] text-[#0f147c] hover:text-[#166a0b] " />
                        </div>
                        <div className="three_verticle_dots  flex justify-center items-center"
                            onClick={() => {
                                setThreeDotsComponent(!showThreeDotsComponent)
                            }}
                        >
                            <BsThreeDotsVertical className='text-[1.3rem]  cursor-pointer' />
                        </div>
                    </div>
                }
            </header >
        </div >
    )
}
export default MessageChatHeader = React.memo(MessageChatHeader);
function ChangeURL({ url }) {
    const [blob, setBlob] = useState("")
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        let isMount = true
        async function loadImage() {
            try {
                setLoader(true)
                const res = await fetch(url)
                const blobData = await res.blob()
                if (isMount) {
                    setBlob(URL.createObjectURL(blobData))
                    setLoader(false)
                }
            }
            catch (err) {
            }
        }
        loadImage()
        return () => {
            isMount = false
        }
    }, [url])
    return (
        <>
            {
                loader ? (
                    <div className="image_conta flex-shrink-0 w-full h-full bg-[#640303] animate-pulse rounded-full">
                    </div>
                ) : (
                    <Image
                        src={blob}
                        rounded={true}
                        raised={false}
                        alt=""
                        className="flex-shrink-0 w-full h-full"
                    />
                )
            }
        </>
    )
}
function ThreeDotsComponents({ setShowHeaderSearchBar, showHeaderSearchBar, setThreeDotsComponent, setBlokedUser, blockUser, BlockUser }) {
    return (
        <>
            {
                [{
                    iconName: <IoSearchOutline className='text-[1.3rem]' />,
                    text: "Search",
                    id: 1
                }, {
                    iconName: <BiBlock className={`text-[1.3rem] ${blockUser ? "text-[#22dd2c]" : "text-[#ca1212]"}`} />,
                    text: `${blockUser ? "Unblock" : "Block"}`,
                    id: 2,
                }
                ].map((item, index) => {
                    return (
                        <>
                            <section className='flex items-center  py-1 bg-r rounded-md hover:bg-[#c1c1c1] my-1 cursor-pointer drop-shadow-lg transition-all delay-100'
                                onClick={() => {
                                    if (item.id == 1) {
                                        setShowHeaderSearchBar(!showHeaderSearchBar)
                                        setThreeDotsComponent(false)
                                    }
                                    else if (item.id == 2) {
                                        setBlokedUser(!blockUser)
                                        BlockUser()
                                    }
                                }}
                            >
                                <p className='flex-[2] flex justify-center'>
                                    {
                                        item.iconName
                                    }
                                </p>
                                <p className='flex-[10] text-[1.2rem] tracking-wider font-serif'>
                                    {
                                        item.text
                                    }
                                </p>
                            </section>
                            <hr className='bg-[#c5c5c5]' />
                        </>
                    )
                })
            }
        </>
    )
}