import React, { useEffect, useRef } from 'react'
import { FaUserPlus } from "react-icons/fa"
import { RiShareForwardFill } from "react-icons/ri"
import { FiPlus } from "react-icons/fi"
import { HiUserGroup } from "react-icons/hi"
import { useSelector } from "react-redux"
function MiddleSection({ roomData, setModalForFriends }) {
    console.log({ RoomData: roomData })
    const AddButton = useRef(null)
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    useEffect(() => {
        if (AddButton.current) {
            const pos = AddButton.current.getBoundingClientRect()
            const l = pos.left
            const t = pos.top
        }
    }, [])
    return (
        <>
            <div className="add_participants  flex">
                <div className="name_gro flex flex-[8] justify-start items-center select-none">
                    <div className="icons ml-[1.5rem]">
                        <FaUserPlus className="text-[2rem] mds-editor7:text-[1.2rem]" />
                    </div>
                    <div className="text ml-[1rem]">
                        <p className="text-[1.4rem] tracking-wider font-serif mds-editor7:text-[.9rem] truncate">Add Participants</p>
                    </div>
                </div>
                <div className="right flex flex-[4] justify-end items-center pr-[.4rem]">
                    <>
                        <div className="share_code bg-[#0AA1DD] px-[1rem] rounded-md my-[.4rem] mr-[1rem] cursor-pointer mds-editor7:px-[.5rem]">
                            <RiShareForwardFill className="text-[2.2rem] text-white mds-editor7:text-[1.7rem]" />
                        </div>
                        <div ref={AddButton} className="add_participants  bg-[#0AA1DD] px-[1rem] rounded-md my-[.4rem] cursor-pointer mds-editor7:px-[.5rem]"
                            onClick={() => {
                                setModalForFriends(true)
                            }}
                        >
                            <FiPlus className="text-[2.2rem] text-white mds-editor7:text-[1.7rem]" />
                        </div>
                    </>
                </div>
            </div>
            <div className="all_participantss flex mt-[.7rem]">
                <div className="name_gro flex flex-[8] justify-start items-center select-none">
                    <div className="icons ml-[1.5rem]">
                        <HiUserGroup className="text-[2rem] mds-editor7:text-[1.2rem]" />
                    </div>
                    <div className="text ml-[1rem]">
                        <p className="text-[1.4rem] tracking-wider font-serif mds-editor7:text-[.9rem] truncate">Total Participants</p>
                    </div>
                </div>
                <div className="right flex flex-[4]  justify-end items-center pr-[.4rem]">
                    <div className="share_code bg-[#22e954] px-[1rem] rounded-md my-[.4rem] mr-[1rem] cursor-pointer">
                        {
                            roomData.RoomMembers !== undefined ?
                                <p className="text-[1.2rem] text-white">{roomData.RoomMembers.length}
                                </p> : <p className="text-[1.2rem] text-white">0
                                </p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiddleSection