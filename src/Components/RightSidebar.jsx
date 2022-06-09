import React, { useRef, useEffect, useState } from 'react'

import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import FooterButton from './FooterButton';
import { createPopper } from "@popperjs/core";
import ChatWindow from './chatSection/ChatWindow';
import { BiWifi } from "react-icons/bi"
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion"

// <div className='bg-[#03A9F4] rounded-t-lg live_user 
// '>


// , setCurrentChat, currentChats
function RightSidebar({ socket, currentUser, currentId, setCurrentChat1, currentChats1 }) {
    const [friends, setFriendsLength] = useState(null)
    const [bottomUsers, ShowBottomUsers] = useState(false)
    const dispatch = useDispatch()
    const [onlineUser, setOnlineUser] = useState([])
    const componentMount = useRef(true)


    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })




    // useEffect(() => {
    //     setCurrentChat1(currentChats)

    // },[currentChats])
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "top-start"
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };



    useEffect(async () => {

        if (componentMount.current) {

            socket?.emit("login", localStorage.getItem("uuid"))
            socket?.on("onlineUsers", (data) => {
                setOnlineUser(data)
                // dispatch({ type: "onlineUsers", payload: value })

            })

            socket?.on("userExist", (data) => {
            })
        }

        return (() => { componentMount.current = false })


    }, [socket, UserInformationLoad])


    // console.log({ onlineUser, friends })
    // console.log({ currentChats })





    // bg colors
    let bgColor;
    let color;
    color === "green"
        ? (bgColor = "bg-white")
        : (bgColor = "bg-" + color + "500");
    return (
        // text-white md:text-[1.5rem] font-bold  text-sm px-5 py-1 rounded  outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150 flex
        <>
            {/* w-full sm:w-6/12 md:w-4/12 */}
            {/* <div className="flex flex-wrap rounded-sm live_user bg-red-600  "> */}
            {/* <div className=" px-4 "> */}
            <div className="relative  align-middle w-full"
                onClick={() => {
                    // dropdownPopoverShow
                    //     ? closeDropdownPopover()
                    //     : openDropdownPopover();
                    ShowBottomUsers(!bottomUsers)
                }}
            >
                <button
                    className="text-[1rem] md:text-[1.5rem] text-white focus:outline-none rounded-t-lg flex justify-around items-center"
                    type="button"
                    ref={btnDropdownRef}
                >
                    <BiWifi className="text-3xl text-[#FF008E]" />
                    <span className='text-[1rem] md:text-[1rem] text-bold  text-black bg-green-300 py-0 px-[6px] rounded-lg mt-[3px]  ml-[7px] '>{friends}</span>
                </button>
                <AnimatePresence>
                    {bottomUsers && (
                        <motion.div
                            // ref={popoverDropdownRef}
                            className={
                                (color === "red" ? "bg-white " : "") +
                                "text-base  float-left py-2 list-none text-left rounded mb-[5rem]  mds-editor3:ml-4 bg-[#fff] md:mr-[.2rem] mds-editor11:w-[20rem] mds-editor12:w-[22rem] max-h-[500px] overflow-y-auto -mt-[9rem] -ml-[15.7rem]  "
                            }

                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            exit={{ opacity: 0, x: 100 }}
                        >
                            <FooterButton bool={dropdownPopoverShow} online={onlineUser} currentId={UserInformationLoad?.googleId} socket={socket} setCurrentChat={setCurrentChat1} currentChats={currentChats1} setFriendsLength={setFriendsLength} />



                        </motion.div>
                    )}

                </AnimatePresence>

            </div>
            {/* </div> */}
            {/* </div> */}
        </>
    );
}

export default RightSidebar
// </div>