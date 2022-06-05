import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from "react-router-dom"
import { useParams, useHistory, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux'
import Image from '@material-tailwind/react/Image'


function CreateRoom({ q, setRooms, Rooms, setRoomChatHeader }) {
    const [RoomName, setRoomName] = useState("")
    const [RoomList, setRoomList] = useState([])
    const [createRoomLoader, setCreateRoomLoader] = useState(false)



    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })


    async function createRoomFunction(e) {
        e.preventDefault()

        if (RoomName.length > 0) {
            const checkRoomAlreadyExits = RoomList.find(room => room.RoomName === RoomName)
            if (checkRoomAlreadyExits) {
                return
            }
            else {
                setCreateRoomLoader(true)
                const RoomId = Math.floor(Math.random() * 1000000000)
                // setRoomList([...RoomList, { RoomId, RoomName, admin: UserInformationLoad._id + RoomId, type: room }])
                try {

                    const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/room/create`, {
                        method: "POST",
                        body: JSON.stringify({
                            RoomId, RoomName, adminId: UserInformationLoad._id,
                            googleId: UserInformationLoad.googleId,
                            RoomCreatedBy: UserInformationLoad._id + RoomId, RoomType: "room"
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("uuid")

                        }

                    })
                    const data = await res.json()
                    console.log({ data })
                    if (res.status === 200) {
                        setRoomName("")
                        setRoomList([...data.AllRooms])
                        setCreateRoomLoader(false)
                    }
                    else if (res.status === 400) {
                        alert("Room Already Exists")
                        setCreateRoomLoader(false)
                    }
                    else if (res.status === 500) {
                        alert("Room Already Exists")
                        setCreateRoomLoader(false)
                        setCreateRoomLoader(false)
                    }


                }
                catch (err) {
                    console.log(err)

                }
                setRoomName("")
            }
        }

    }

    useEffect(() => {


    }, [])

    useEffect(() => {
        if (Rooms.length > 0) {
            setRoomList(Rooms)
        }

    }, [Rooms])

    return (
        <>
            {/* w-[19.6rem] */}
            <div className="input_fields w-[19.5rem]  px-[1rem] py-[.8rem] overflow-hidden fixed  flex flex-col z-[16] flex-wrap ">
                <h1 className="text-xl font-serif tracking-wider w-[19.5rem] -mt-[1rem] p-[.85rem] -ml-[1rem] bg-[#d4d4d4]">Room<br />
                </h1>

                <div className="input_fields bg-[#d1d0d0] w-[19.5rem] -ml-[1rem] px-[.4rem] py-[.5rem]">

                    <input type="text" placeholder="Room Name" className="input_room w-[18.7rem]  h-[3.1rem] focus:outline-none indent-3 my-[.2rem] rounded-md font-serif text-[1.1rem] pr-3"

                        value={RoomName}
                        onChange={(e) => {
                            setRoomName(e.target.value)
                        }}
                    />
                </div>
                <motion.div
                    // ${RoomName.length > 0 ? "visible" : "hidden"}`
                    initial={{ opacity: 0, y: "-2rem" }}
                    animate={{ opacity: 1, y: "0rem" }}
                    transition={{ duration: .5 }}
                    className={`room_btn  w-[19.6rem] -ml-[1rem] px-[.4rem]  ${RoomName.length > 0 ? "visible" : "hidden"}`}>
                    <button className="btn btn-block tracking-wider mt-[.2rem] mb-[.4rem]"
                        disabled={createRoomLoader ? true : false}
                        onClick={(e) => {
                            createRoomFunction(e)

                        }}
                    >Add Room</button>
                </motion.div>
            </div>
            {/* D6D6D6 */}
            <div className={`rooms_list bg-[#D6D6D6] h-full  relative   ${RoomName.length > 0 ? "top-[11.2rem]" : "top-[8rem]"}`} id="room_center">
                {
                    RoomList.length > 0 && RoomList.map((item) => {
                        return (
                            <>
                                <NavLink to={`/messages?q=${item.RoomId}`}

                                >
                                    <div className={`rooms flex justify-start px-[.6rem] py-[.4rem] relative cursor-pointer ${q === item.RoomId ? "bg-[#de0000]" : ""}`}
                                        onClick={() => {
                                            setRoomChatHeader(false)
                                        }}
                                        key={item.RoomId}
                                    >


                                        <p className="text-[1.2rem] font-serif tracking-wider py-[.5rem]  bg-[#6c6c6c] w-full rounded-lg flex justify-start indent-3 text-[#fdfdfd] items-center">
                                            <Image src={item.url} className="w-[2.3rem] h-[2.3rem] flex-shrink-0 ml-[1rem]" rounded={true} />

                                            <p>
                                                {item.RoomName.length > 20 ? item.RoomName.slice(0, 17) + "..." : item.RoomName}
                                            </p>


                                        </p>
                                        {/* <span className="absolute top-[8px] right-[15px] bg-[#F32424]  rounded-full px-[.8rem] text-[1.2rem] text-white"></span> */}
                                    </div>
                                </NavLink>
                            </>

                        )
                    })
                }

            </div>


        </>
    )
}

export default CreateRoom