import React, { useState } from 'react'
import Image from '@material-tailwind/react/Image'
import Spinner from "react-spinkit"
import { Audio, Bars, Circles, Oval, Grid, TailSpin } from 'react-loader-spinner'
import Photos from "../../assets/img/download.png"
import { BiCheck } from "react-icons/bi"
import Instance from '../../Config/Instance'

function AllFriendsAfterSearch({ item, setGroupMembers, RoomData, setFriends }) {
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("")




    async function AddfriendsInGroup(friendId) {
        try {
            setLoader(true)
            const resData = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/group/add/friend/${friendId}`, {
                method: "POST",
                body: JSON.stringify({ roomId: RoomData._id }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            const resDataJson = await resData.json()
            console.log({ resDataJson })
            if (resData.status === 200) {
                setGroupMembers(resDataJson.room.RoomMembers)
                setLoader(false)
                setMessage("success")


            }
            else if (resData.status !== 200) {
                setLoader(false)
                setFriends([])
            }
        } catch (err) {
            console.warn(err)
        }

    }
    return (
        <>
            <div className="friends_s flex items-center mt-[.2rem] bg-[#d6d5d523] h-[3rem] border border-solid border-[#cccbcb] rounded-md">
                <div className="image_with_name flex flex-[10] items-center">

                    <div className="Image w-[2.5rem] h-[2.5rem] rounded-full flex-shrink-0 ml-[1.5rem] mds-editor7:ml-[.5rem] cursor-pointer">
                        {item.url ?
                            <Image
                                src={item?.url}
                                rounded={true}
                                className="w-[2.5rem] h-[2.5rem] flex-shrink-0 mds-editor7:w-[2rem] mds-editor7:h-[2rem]"
                            />
                            : <Image
                                src={Photos}
                                rounded={true}
                                className="w-[2.5rem] h-[2.5rem] flex-shrink-0 mds-editor7:w-[2rem] mds-editor7:h-[2rem]"
                            />}
                    </div>
                    <p className="name_p text-[1.3rem] font-serif ml-[1rem] tracking-wider cursor-pointer truncate mds-editor7:text-[1rem] mds-editor7:ml-[.1rem]">
                        {item?.name}
                    </p>
                </div>
                <div className="button flex-[2] flex justify-center items-center">
                    <p className="underline text-[1.5rem]  text-white font-serif tracking-wider cursor-pointer mds-editor7:text-[.9rem]"
                        onClick={() => {
                            AddfriendsInGroup(item?._id)
                        }}
                    >

                        {loader ? <Loader /> : (message === "success" ? <BiCheck className="text-[2.5rem] mds-editor7:text-[1.8rem] text-[#7bf169]" /> : "Add")}
                    </p>


                </div>

            </div>

        </>
    )
}

export default AllFriendsAfterSearch
function Loader() {
    return (
        <>
            <div className="loader_sp w-full h-full flex justify-center items-center">
                {/* F2EBE9 */}
                {/* 00BFFF */}
                <TailSpin color="#F2EBE9" height={26} width={26} />
            </div>

        </>
    )
}