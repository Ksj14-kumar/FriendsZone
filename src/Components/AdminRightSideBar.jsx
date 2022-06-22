import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { MdSettings, MdMusicNote, MdArrowForwardIos } from "react-icons/md"
import { FaMoon } from "react-icons/fa"
import { GiNewspaper } from "react-icons/gi"
import { BsFillBookmarkFill } from "react-icons/bs"
import AllLinks from '../Pages/AdminRightSideBarPages/AllLinks'
import { useSelector } from 'react-redux'
import {NavLink} from "react-router-dom"

function AdminRightSideBar({ showRightSideBar, setShowRightSideBar, logout }) {
    const [bool, setBool] = useState(true)
    const adminRightSideBar = useRef(null)
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })

    const fullName = UserInformationLoad?.fname + " " + UserInformationLoad.lname



    useEffect(() => {
        // postPopupModal.current.contains(event.target)
        async function handleHide(e) {
            if (adminRightSideBar.current && !adminRightSideBar.current.contains(e.target)) {
                setShowRightSideBar(false)
            }
        }
        document.addEventListener("mousedown", handleHide)
        return () => {
            document.removeEventListener("mousedown", handleHide)
        }
    }, [])




    return (
        <>
            <motion.div
                initial={{ opacity: 1, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.9, type: "tween",
                    ease: "easeInOut",
                }}
                exit={{ opacity: 0, x: 200 }}
                className="fixed bg-[#fffefe] top-[3.4rem] right-[0rem] z-[17] w-[25rem] mds-editor28:w-[16rem] h-screen px-4" id="adminRightSideBar"
                ref={adminRightSideBar}
            >


                <div className="Con">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, accusantium!

                </div>

                {
                    [
                        {
                            icon: <MdSettings className="text-[2rem] mds-editor28:text-[1.5rem] " />,
                            name: "Setting",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />
                        },
                        {
                            icon: <FaMoon className="text-[2rem] mds-editor28:text-[1.5rem]" />,
                            name: "Theme Mode",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />
                        },
                        {
                            icon: <MdMusicNote className="text-[2rem] mds-editor28:text-[1.5rem]" />,
                            name: "Songs Accessbility",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />
                        },
                        {
                            icon: <GiNewspaper className="text-[2rem] mds-editor28:text-[1.5rem]" />,
                            name: "News",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />
                        },

                        {
                            icon: <BsFillBookmarkFill className="text-[2rem] mds-editor28:text-[1.5rem]" />,
                            name: "BookMark",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />

                        }

                    ].map((i, index) => {
                        return (
                            <>
                                <div className="linkes_containe"
                                    key={index}

                                >
                                    <NavLink to={`${i.name === "Setting" ? (`/blog/${fullName}/settings`) : (i.name === "Theme Mode" ? (`/blog/${fullName}/themeMode`) : (i.name === "Songs Accessbility" ? (`/blog/${fullName}/songs-accessbility`) : (i.name === "News" ? (`/blog/${fullName}/news`) : (i.name === "BookMark" && `/blog/${fullName}/bookmark`))))}`}>

                                        <AllLinks
                                            icon={i.icon}
                                            name={i.name}
                                            arrow={i.arrow}

                                        />
                                    </NavLink>
                                </div>

                            </>
                        )
                    })
                }

                {
                    // ============================LOG OUT=====================
                }
                {
                    <p
                        className="text-bold font-serif text-[1.5rem]" onClick={() => {
                            logout()
                        }}
                    >
                        LogOut
                    </p>
                }
            </motion.div>

        </>
    )
}

export default AdminRightSideBar