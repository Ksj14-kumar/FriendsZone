import Image from '@material-tailwind/react/Image'
import React, { useState, useEffect } from 'react'
import Photos from "../../assets/img/download.png"
import { MdCameraAlt, MdDelete } from "react-icons/md"
import { FaUserPlus } from "react-icons/fa"
import { RiShareForwardFill } from "react-icons/ri"
import { FiPlus } from "react-icons/fi"
import { HiUserGroup } from "react-icons/hi"
import { BiArrowBack } from "react-icons/bi"
import UsersList from './AllParticipantsDetails/UsersList'
import MiddleSection from './AllParticipantsDetails/MiddleSection'
import { success, error } from '../../toastifyMessage/Toast'
import { Success, Error } from "../../Components/Toastify"
import { Audio, Bars, Circles, Oval, Grid, TailSpin } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from "framer-motion"


function RoomChatInfo({ setRoomChatHeader, RoomData, setRoomData, setModalForFriends, groupMembers, setGroupMembers }) {
    const [base64URL, setBase64Url] = useState("")
    const [groupImage, setImage] = useState({})
    const [makeAdminResLoader, setMakeAdminRes] = useState(false)
    const [RoomImage, setRoomImage] = useState("")
    const [imageLoader, setImageLoader] = useState(false)
    const [FileType, setFileType] = useState("")



    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })

    const isAdmin = RoomData.admin?.includes(UserInformationLoad._id)

    function selectFile(e) {

        const file = e.target.files[0]
        // console.log(file)
        if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {

            const Url = URL.createObjectURL(file)
            // console.log(Url)
            setFileType(file.type)
            const reader = new FileReader()
            setBase64Url(Url)
            reader.onloadend = () => {
                // console.log(reader.result)
                // setBase64Url(reader.result)
            }
        }
        else {
            error({ message: "please select image in JPG, PNG, JPEG", pos: "top-right" })
            return
        }
    }



    useEffect(() => {
        async function setGroupImages() {
            try {
                setImageLoader(true)
                const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/group/image/`, {
                    method: "POST",
                    body: JSON.stringify({
                        base: base64URL,
                        roomId: RoomData._id,
                        FileType

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`,

                    }
                })
                const data = await response.json()
                console.log({ data })
                if (response.status === 200) {
                    setRoomImage(data.room)
                    setImageLoader(false)
                    // setGroupMembers(data.data.groupMembers)
                    // setImage(data.room)
                    // setRoomData(data.room)
                }
                else if (response.status === 500) {
                    setImageLoader(false)
                    error({ message: "try again", pos: "top-right" })

                }
                else if (response.status === 400) {
                    error({ message: data.message })
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        base64URL.length > 0 && setGroupImages()
    }, [base64URL])



    useEffect(() => {
        setRoomImage(RoomData.RoomImage)
    }, [RoomData])





    async function MakeAdmin(id) {

        try {
            setMakeAdminRes(true)
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/group/makeAdmin/${id}`, {
                method: "PUT",
                body: JSON.stringify({ roomId: RoomData._id }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
                }
            })
            const data = await res.json()
            console.log({ data })
            if (res.status === 200) {
                setMakeAdminRes(false)
                setRoomData(data.FetchUSerDetails)

            }
            else if (res.status !== 200) {
                setMakeAdminRes(false)


            }

        }
        catch (err) {
            console.log(err)

        }


    }





    return (
        <>
            <AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, scale: 0, originX: -1, originY: -1 }}
                    animate={{ opacity: 1, scale: 1, originX: 0, originY: 0 }}
                    transition={{ duration: 0.3, type: "tween" }}
                    exit={{ opacity: 0, scale: 0, originX: -1, originY: -1 }}
                    className="bg-[#bdbcbc] h-screen flex flex-col relative">
                    <button className="btn bg-[#cbcbcb] ml-1 mt-1 fixed px-[1rem] z-[16] focus:outline-none text-white"
                        onClick={() => {
                            setRoomChatHeader(false)
                        }}
                    >
                        <BiArrowBack className="text-[2rem] text-white hover:text-white" />
                    </button>
                    <section className="top_section bg-[#005555] w-full  flex justify-center min-h-[12rem] relative">
                        <div className="image flex justify-center items-center flex-shrink-0 rounded-full relative w-[11rem] h-[11rem] mt-2">

                            {
                                imageLoader ? <Loader /> : ((RoomImage !== undefined) ?
                                    <Image src={RoomImage} rounded={true} className="w-[11rem] h-[11rem] flex-shrink-0 rounded-full" /> :
                                    <Image src={Photos} rounded={true} className="w-[11rem] h-[11rem] flex-shrink-0 rounded-full" />)
                            }

                            {RoomData.admin.includes(UserInformationLoad?._id) && <div className="camera absolute right-[1rem] top-[8.6rem] cursor-pointer">
                                <label htmlFor="group_image" className="cursor-pointer">
                                    {/* <button className=""> */}
                                    <MdCameraAlt className="text-[3.2rem] text-[#B20600]" />
                                    {/* </button> */}

                                </label>
                            </div>}
                            <input type="file" name="" id="group_image" className="hidden" accept="image/*"
                                disabled={imageLoader ? true : false}
                                onChange={(e) => {
                                    selectFile(e)
                                }}
                            />
                        </div>
                        <hr />
                    </section>
                    <section className="middle_section  min-h-[7rem] w-full bg-[#fff]">
                        <MiddleSection roomData={RoomData} setModalForFriends={setModalForFriends} />
                    </section>
                    <hr />
                    <section className="bottom_section bg-[#ececec] h-full ">
                        <h1 className="text-[1.3rem] text-black text-center font-serif font-semibold tracking-wider ">All Users</h1>
                        <div className="group_users gap-y-1 ">
                            {
                                groupMembers !== undefined && groupMembers.map(item => {

                                    return (
                                        <>
                                            <UsersList item={item} setGroupMembers={setGroupMembers} RoomId={RoomData._id}
                                                RoomData={RoomData} MakeAdmin={MakeAdmin} setRoomChatHeader={setRoomChatHeader} makeAdminResLoader={makeAdminResLoader}
                                                isAdmin={isAdmin}
                                            />
                                        </>


                                    )
                                })
                            }
                        </div>
                    </section>


                </motion.div>
            </AnimatePresence>

        </>
    )
}

export default RoomChatInfo;

function Loader() {
    return (
        <>
            <div className="loader_sp w-full h-full flex justify-center items-center">
                {/* F2EBE9 */}
                {/* 00BFFF */}
                <TailSpin color="#F2EBE9" height={80} width={80} />
            </div>

        </>
    )
}