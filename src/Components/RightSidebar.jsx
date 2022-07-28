import React, { useRef, useEffect, useState } from 'react'
import FooterButton from './FooterButton';
import { BiWifi } from "react-icons/bi"
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion"

function RightSidebar({ socket, currentUser, currentId }) {
    const [online, setOnlineUser] = useState([])
    const [bottomUsers, ShowBottomUsers] = useState(false)
    const dispatch = useDispatch()
    const [NumberOfFriendsOnline, setFriendsLength] = useState([])
    const [onlinefriends, setOnlineFriends] = useState([])
    const isMount = useRef(true)
    const componentMount = useRef(true)
    const { UserInformationLoad, onlineUsers, theme } = useSelector((state) => {
        return {
            onlineUsers: state.OnlineUsers,
            UserInformationLoad: state.UserInformationLoad.value,
            theme: state.Theme
        }
    })
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    useEffect(() => {
        async function loadFriends() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/friends/${currentId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const data = await res.json()
                if (res.status === 200) {
                    const value = data.friendList.filter(item => {
                        return onlineUsers.some(value => {
                            return item._id === value.adminId
                        })
                    })
                    setOnlineFriends(value)
                    setFriendsLength(value.length)
                }
                else if (res.status !== 200) {
                }
            } catch (err) {
            }
        }
        loadFriends()
    }, [currentId, onlineUsers])
    let bgColor;
    let color;
    color === "green"
        ? (bgColor = "bg-white")
        : (bgColor = "bg-" + color + "500");
    return (
        <>
            <div className="relative  align-middle w-full"
                onClick={() => {
                    ShowBottomUsers(!bottomUsers)
                }}
            >
                <button
                    className="text-[1rem] md:text-[1.5rem] text-white focus:outline-none rounded-t-lg flex justify-around items-center"
                    type="button"
                    ref={btnDropdownRef}
                >
                    <BiWifi className="text-3xl text-[#FF008E]" />
                    <span className='text-[1rem] md:text-[1rem] text-bold  text-[#000] bg-[#13f617] py-0 px-[6px] rounded-lg mt-[3px]  ml-[7px] '>{NumberOfFriendsOnline}</span>
                </button>
                <AnimatePresence>
                    {bottomUsers && (
                        <motion.div
                            className={
                                `text-base  float-left py-2 list-none text-left rounded mb-[5rem]  mds-editor3:ml-4 md:mr-[.2rem] mds-editor11:w-[20rem] mds-editor12:w-[22rem] max-h-[500px] overflow-y-auto -mt-[9rem] -ml-[15.7rem] ${theme?"bg-[#020202]":"bg-[#fff] "} `
                            }
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            exit={{ opacity: 0, x: 100 }}
                        >
                            <FooterButton bool={dropdownPopoverShow} onlinefriends={onlinefriends} currentId={UserInformationLoad?.googleId} socket={socket} NumberOfFriendsOnline={NumberOfFriendsOnline}
                                theme={theme}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default RightSidebar = React.memo(RightSidebar)