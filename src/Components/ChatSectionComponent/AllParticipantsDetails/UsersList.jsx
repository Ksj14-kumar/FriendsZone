import React, { useState } from 'react'
import Image from '@material-tailwind/react/Image'
import { NavLink } from 'react-router-dom'
import {  TailSpin } from 'react-loader-spinner'
import { success, error } from '../../../toastifyMessage/Toast'
function UsersList({ item, setGroupMembers, RoomData, MakeAdmin, setRoomChatHeader, makeAdminResLoader, isAdmin }) {
    const [KickOutUserLoader, setKickOutUser] = useState(false)
    function cancleAdmin() {
    }
    async function KickOutFromGroup(id) {
        const confirm = window.confirm("Are you sure you want to kick this user out of the group?")
        if (confirm) {
            try {
                setKickOutUser(true)
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/delete/user/group`, {
                    method: "DELETE",
                    body: JSON.stringify({
                        userId: id,
                        roomId: RoomData._id
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
                    }
                })
                const data = await res.json()
                if (res.status === 200) {
                    setGroupMembers(data.FetchUSerDetails.RoomMembers)
                    success({ message: "User kicked out successfully", pos: "top-right" })
                    setKickOutUser(false)
                }
                else if (res.status !== 200) {
                    error({ message: "try again", pos: "top-right" })
                    setKickOutUser(false)
                }
            } catch (err) {
                console.log(err)
            }
        }
        else {
            return
        }
    }
    return (
        <div className="active users flex items-center bg-[#dedcdc] mb-[.4rem]">
            <NavLink to={`/messages?q=${item.googleId}`}>
                <div className="gro flex ml-[.6rem] items-center flex-[8] "
                    onClick={() => {
                        setRoomChatHeader(false)
                    }}
                >
                    <div className="image_users flex-shrink-0 py-[.2rem]">
                        <Image src={item.url} className="flex-shrink-0 w-[2.4rem] h-[2.4rem] rounded-full cursor-pointer" />
                    </div>
                    <div className="name ml-[1.2rem] cursor-pointer">
                        <p className="text-[1.5rem] font-serif truncate">{item.name}</p>
                    </div>
                </div>
            </NavLink>
            <div className="remove_btn flex-[4] justify-end flex mr-[.4rem]">
                <p className={`text-[1.4rem] ${isAdmin ? "hover:underline" : ""} select-none  font-serif ${isAdmin ? "cursor-pointer" : "cursor-"} mr-[.8rem] ${RoomData.admin.includes(item._id) ? "text-[#0d4a0e]" : "text-[#1761ec]"}  `}
                    disabled={isAdmin ? false : true}
                    onClick={() => {
                        if (isAdmin) {
                            if (RoomData.admin.includes(item._id)) {
                                const confrim = window.confirm("Are you sure you want to remove admin rights from this user?")
                                if (confrim) {
                                    cancleAdmin()
                                }
                            }
                            else {
                                MakeAdmin(item._id)
                            }
                        }
                    }}
                >
                    {
                        makeAdminResLoader ? <Loader /> :
                            RoomData.admin.includes(item._id) ?
                                (
                                    <>
                                        <p className="">Admin</p>
                                    </>
                                )
                                : (
                                    <>
                                        <p className={`${isAdmin ? "block" : "hidden"}`}>make admin</p>
                                    </>
                                )
                    }
                </p>
                <p className={`text-[1.4rem] ${isAdmin ? "hover:underline" : "hover:underline"} text-red-600 font-serif cursor-pointer`}
                    onClick={
                        (e) => {
                            KickOutFromGroup(item._id)
                        }
                    }
                >
                    {
                        KickOutUserLoader ? <Loader /> : (RoomData.admin.includes(item._id) ? (isAdmin ?
                            (
                                <>
                                    <p className="">Exit Group</p>
                                </>
                            ) :
                            (
                                <>
                                    <p className={`${isAdmin ? "block" : "hidden"}`}>Exit Group</p>
                                </>
                            )
                        ) :
                            (isAdmin ?
                                <>
                                    <p className={` ${isAdmin ? "block" : "hidden"}`} >
                                        Kick Out
                                    </p>
                                </> : (
                                    <>
                                        <p className={``} >
                                            Exit Group
                                        </p>
                                    </>
                                )
                            )
                        )
                    }
                </p>
            </div>
        </div >
    )
}

export default UsersList

function Loader() {
    return (
        <>
            <div className="loader_sp w-full h-full flex justify-center items-center">
                <TailSpin color="#F2EBE9" height={35} width={35} />
            </div>
        </>
    )
}