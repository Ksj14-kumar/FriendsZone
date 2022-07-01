import React, { useState, useEffect } from 'react'
import Image from '@material-tailwind/react/Image';
import { MdLocationOn, MdSearch, MdLocalPhone } from 'react-icons/md';
import { IoIosVideocam } from 'react-icons/io';

import img from '../../../assets/img/team-2-800x800.jpg';
import Photo from "../../../assets/img/download.png"
function MessageChatHeader({ chatHeader, setVideoOverlay, q, RoomData, setRoomChatHeader, RoomChatHeader, groupMessageLoader, SingleChatLoader }) {
    const [bool, setBool] = useState(false)



    // console.log({ SingleChatLoader })
    return (
        <div>
            <header className={`top_header   top flex justify-between bg-[#d6d6d6]    drop-shadow-lg   mds-editor23:w-full w-full py-3 md:py-2 ${q.length === 9 ? "cursor-pointer" : ""}`}
                disabled={q.length === 9 ? true : false}

            >
                <div className="left_t flex flex-4 justify-around items-center  ml-[2rem]"
                    onClick={() => {
                        (q.length === 9 && !groupMessageLoader) &&
                            setRoomChatHeader(!RoomChatHeader)
                        // setBool(true)

                    }}
                >
                    <div className="top_left_header w-[2.8rem] h-[2.84rem] flex-shrink-0 cursor-pointer relative ">
                        {
                            q.length !== 9 ? (chatHeader.url ?
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

                        <div className="div bg-[#20fa08] h-[.7rem] w-[.7rem] rounded-full absolute top-[24px] right-0 animate-pulse"></div>
                    </div>

                    <div className="top_center_header ml-[1rem] cursor-pointer  flex flex-col ">

                        <p className='text-[1.2-rem] tracking-wider font-medium font-serif text-[#1a1919] truncate'>{

                            SingleChatLoader ? "" : (q.length !== 9 ? chatHeader !== undefined && chatHeader.fname + " " + chatHeader.lname : RoomData !== undefined ? RoomData.RoomName : "")

                        }
                            <br />

                            {
                                q.length === 9 &&
                                <small classNAme="text-[1.2rem] tracking-wider text-semibold">Room</small>

                            }

                        </p>
                    </div>
                </div>
                {
                    q &&
                    <div className="right_top_header  mr-[2rem]   flex justify-between  w-[10rem] px-2 items-center">
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

                    </div>
                }
            </header >


        </div >

    )
}

export default MessageChatHeader;

function ChangeURL({ url }) {
    const [blob, setBlob] = useState("")
    const [loader, setLoader] = useState(false)



    useEffect(() => {
        async function loadImage() {
            setLoader(true)
            const res = await fetch(url)
            const blobData = await res.blob()
            setBlob(URL.createObjectURL(blobData))
            setLoader(false)
        }
        loadImage()
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
