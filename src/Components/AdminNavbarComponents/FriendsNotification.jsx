import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion"
import Axios from "axios"
import Photos from "../../assets/img/download.png"
import LoadFriendsNoti from './LoadFriendsNoti';
function FriendsNotification({ receivedRequest, AcceptFriendRequest, DeleteFriendRequest, messageAftetAcceptRequest, __id__, setReceivedRequest, theme }) {



    useEffect(() => {
        const updateStatus = async () => {
            const value = await Axios({
                url: `${process.env.REACT_APP_API_BACKENDURL}/blob//api/v1/_user/notifications/friends/type/${__id__}`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
                    "Content-Type": "application/json"
                }
            })
            setReceivedRequest(value.data.receiverrequest)
        }
        updateStatus()
    }, [])
    return (
        <motion.div className={`group_friends_modal_Notification fixed ${theme ? "bg-[#0b0b0b] border border-solid border-[#5e5e5e]" : "bg-[#ffffff]"} w-[27rem] mds-editor36:w-full  top-[4rem] right-[1rem] mds-editor36:right-0 rounded-md drop-shadow-xl p-4 px-2 pt-2 ${receivedRequest?.length > 5 ? "max-h-[27rem]" : "rounded-md"} overflow-x-hidden overflow-y-auto`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            id="friendsNoti"
        >
            <header className={`py-2  w-full rounded-md px-1 text-[1.2rem] font-serif tracking-wider truncate select-none mds-editor36:text-center ${theme ? "text-[#fff]" : "text-[#000]"}`}>Friend Notifications</header>
            <hr className={`mb-1  ${theme ? "bg-[#0f0f0f]" : "bg-[#ececec]"}`} />

            <main className="body">
                {
                    receivedRequest !== undefined ? receivedRequest.map((item, index) => {
                        return (
                            <>
                                <LoadFriendsNoti item={item} AcceptFriendRequest={AcceptFriendRequest} DeleteFriendRequest={DeleteFriendRequest} key={index} theme={theme} />
                            </>
                        )
                    }) :
                        <>
                            <p className={`text-center text-[1.3rem] tracking-wider font-serif ${theme ? "text-[#fff]" : "text-[#030303]"}`}>No, notifications</p>

                        </>
                }

                {
                    messageAftetAcceptRequest?.length > 0 && <p className={`flex cursor-pointer  rounded-md py-1 w-full ${theme ? "hover:bg-[#595959]" : "hover:bg-[#dadada]"}`}>
                        <NavLink to={`/profile/${messageAftetAcceptRequest[0].senderId}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: "1rem",
                            }}
                        >
                            {messageAftetAcceptRequest[0].url ? <Image src={messageAftetAcceptRequest[0].url}
                                rounded={true}
                                className={`md:w-[2.9rem] w-[2.7rem] md:h-[2.9rem] h-[2.7rem] ${theme ? "outline outline-2 outline-offset-2 outline-[#fff] outline-solid" : ""}`}
                            /> : <Image src={Photos}
                                rounded={true}
                                className={`md:w-[2.9rem] w-[2.7rem] md:h-[2.9rem] h-[2.7rem] ${theme ? "outline outline-2 outline-offset-2 outline-[#fff] outline-solid" : ""}`}
                            />}
                            <p className=' truncate md:text-[1.4rem] flex flex-wrap items-center ml-3'>
                                <p className={`text-[1.1rem] md:text-[1.4rem] font-semibold truncate ${theme ? "text-[#fff]" : "text-[#040404]"}`}>{messageAftetAcceptRequest[0].name}</p>
                                <p className={`ml-[7px] ${theme ? "text-[#fff]" : "text-[#060606]"}`}>and you, connected</p>
                            </p>
                        </NavLink>
                    </p>
                }

            </main>

        </motion.div>
    )
}

export default FriendsNotification = React.memo(FriendsNotification);
