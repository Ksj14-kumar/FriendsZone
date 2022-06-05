import React, { useState } from 'react'
import Image from '@material-tailwind/react/Image';
import { MdLocationOn, MdSearch, MdLocalPhone } from 'react-icons/md';
import { IoIosVideocam } from 'react-icons/io';

import img from '../../../assets/img/team-2-800x800.jpg';
import Photo from "../../../assets/img/download.png"
function MessageChatHeader({ chatHeader, setVideoOverlay, q, RoomData, setRoomChatHeader, RoomChatHeader, groupMessageLoader }) {
    const [bool, setBool] = useState(false)



    const fullName = chatHeader?.fname + "" + chatHeader?.lname

    return (
        <div>
            <header className={`top_header   top flex justify-between bg-[#d6d6d6]  py-2  drop-shadow-lg   mds-editor23:w-full w-full ${q.length === 9 ? "cursor-pointer" : ""}`}
                disabled={q.length === 9 ? true : false}

            >
                <div className="left_t flex flex-4 justify-around items-center  ml-[2rem]"
                    onClick={() => {
                        (q.length === 9 && !groupMessageLoader) &&
                            setRoomChatHeader(!RoomChatHeader)
                        // setBool(true)

                    }}
                >
                    <div className="top_left_header w-[2.5rem] h-[2.5rem] flex-shrink-0 cursor-pointer">
                        {
                            q.length !== 9 ? (chatHeader.url ?
                                <Image
                                    src={chatHeader.url}
                                    rounded={true}
                                    raised={false}
                                    alt=""
                                    className="flex-shrink-0 w-full h-full"
                                /> :
                                <Image
                                    src={Photo}
                                    rounded={true}
                                    raised={false}
                                    alt=""
                                />) : (RoomData.url ? <Image
                                    src={RoomData.url}
                                    rounded={true}
                                    raised={false}
                                    alt=""
                                    className="flex-shrink-0 w-full h-full"
                                /> : (
                                    <Image
                                        src={Photo}
                                        rounded={true}
                                        raised={false}
                                        alt=""
                                        className="flex-shrink-0 w-full h-full"
                                    />

                                ))
                        }

                    </div>

                    <div className="top_center_header ml-[1rem] cursor-pointer  flex flex-col ">

                        <p className='text-[1.2-rem] tracking-wider text-[#1a1919] truncate'>{

                            q.length !== 9 ? (fullName.length > 16 ? fullName.substring(0, 16) + "..." : fullName) : RoomData.RoomName

                        }
                            <br />
                            <small classNAme="text-[1.2rem] tracking-wider text-semibold">Room</small>
                        </p>
                    </div>
                </div>
                {
                    q && <div className="right_top_header  mr-[2rem]   flex justify-between">
                        <div className="video mr-[15px] bg-[#cac8c800] flex items-center px-2 py-[3px] rounded-full cursor-pointer hover:bg-[#fffefe] transition-all delay-100 hover:text-black"
                            onClick={(e) => {
                                setVideoOverlay(true)

                            }}
                        >
                            <IoIosVideocam className="video_icon text-[1.8rem]  text-black" />
                        </div>
                        <div className="audio mr-[15px] bg-[#dfdede08] flex items-center px-3 rounded-full hover:bg-[#ffffff]   cursor-pointer">
                            <MdLocalPhone className="audio_icon text-[1.5rem] text-black" />
                        </div>

                    </div>
                }
            </header>


        </div>

    )
}

export default MessageChatHeader
