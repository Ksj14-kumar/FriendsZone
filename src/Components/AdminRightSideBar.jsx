import React, { useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion"
import { MdSettings, MdMusicNote, MdArrowForwardIos, MdAddAPhoto, MdInsertPhoto } from "react-icons/md"
import { AiOutlineLogout } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"
import { GiNewspaper } from "react-icons/gi"
import { BsFillBookmarkFill } from "react-icons/bs"
import AllLinks from '../Pages/AdminRightSideBarPages/AllLinks'
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
function AdminRightSideBar({ showRightSideBar, setShowRightSideBar, logout, setShowModalCode, setShowModalCodeBackground, id }) {
    const { UserInformationLoad, theme } = useSelector((state) => {
        return {
            UserInformationLoad: state.UserInformationLoad.value,
            theme: state.Theme
        }
    })
    const fullName = UserInformationLoad?.fname + " " + UserInformationLoad?.lname
    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.3, type: "tween",
                    ease: "easeInOut",
                }}
                exit={{ opacity: 0, x: 200 }}
                key={id}
                className={`fixed ${theme ? "bg-[#010101] border border-solid border-[#343434]" : "bg-[#fffefe]"} top-[3.4rem] drop-shadow-lg right-[0rem] z-[17] pt-4 w-[25rem] mds-editor28:w-[16rem] h-screen px-4`} id="adminRightSideBar"
            >
                <div className={`Con hidden ${theme ? "text-[#fff]" : "text-[#000]"}`}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, accusantium!
                </div>
                {
                    [
                        // {
                        //     icon: <MdSettings className="text-[2rem] mds-editor28:text-[1.5rem] " />,
                        //     name: "Setting",
                        //     arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />,
                        //     path:`/blog/${fullName}/settings
                        //     id: 1
                        // },
                        {
                            icon: <FaMoon className="text-[2rem] mds-editor28:text-[1.5rem]" />,
                            name: "Theme Mode",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />,
                            id: 2,
                            path: `/blog/${fullName}/themeMode`
                        },
                        // {
                        //     icon: <MdMusicNote className="text-[2rem] mds-editor28:text-[1.5rem]" />,
                        //     name: "Songs Accessbility",
                        //     arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />,
                        //     id: 3,
                        //     path:`/blog/${fullName}/songs-accessbility`
                        // },
                        {
                            icon: <GiNewspaper className="text-[2rem] mds-editor28:text-[1.5rem]" />,
                            name: "News",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />,
                            id: 4,
                            path: `/blog/${fullName}/news`
                        },
                        {
                            icon: <BsFillBookmarkFill className="text-[2rem] mds-editor28:text-[1.5rem]" />,
                            name: "BookMark",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />,
                            id: 5,
                            path: `/blog/${fullName}/bookmark`
                        }
                    ].map((i, index) => {
                        return (
                            <>
                                <div className={`linkes_containe ${UserInformationLoad ? "" : "hidden"}`}
                                    key={index}
                                >
                                    {/* `${i.id === 1 ? (`/blog/${fullName}/settings`) : (i.id === 2 ? (`/blog/${fullName}/themeMode`) : (i.id === 3 ? (`/blog/${fullName}/songs-accessbility`) : (i.id === 4 ? (`/blog/${fullName}/news`) : (i.id === 5 && `/blog/${fullName}/bookmark`))))} */}
                                    <NavLink to={i.path}
                                        activeClassName={`bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500`}
                                    >
                                        <AllLinks
                                            icon={i.icon}
                                            name={i.name}
                                            arrow={i.arrow}
                                            theme={theme}
                                            id={i.id}
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
                    [
                        {
                            id: 1,
                            name: "Profile Photo",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />,
                            icon: <MdAddAPhoto className="text-[2rem] mds-editor28:text-[1.5rem]" />
                        },
                        {
                            id: 2,
                            name: "Background Image",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />,
                            icon: <MdInsertPhoto className="text-[2rem] mds-editor28:text-[1.5rem]" />
                        },
                        {
                            id: 3,
                            name: "Logout",
                            arrow: <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />,
                            icon: <AiOutlineLogout className="text-[2rem] mds-editor28:text-[1.5rem]" />
                        }
                    ].map((item, index) => {
                        return (
                            <>
                                <div className={`music ${UserInformationLoad ? "" : `${item.id !== 3 ? "hidden" : ""}`} ${theme ? "hover:bg-[#222222]" : "hover:bg-[#e7e7e7]"} bg-[#e7e7e747] flex py-3 items-center cursor-pointer rounded-lg mb-2`}
                                    onClick={() => {
                                        if (item.id === 1) {
                                            setShowModalCode(true)
                                        }
                                        else if (item.id === 2) {
                                            setShowModalCodeBackground(true)
                                        }
                                        else if (item.id === 3) {
                                            logout()
                                        }
                                    }}
                                    key={index}
                                >
                                    <div className="wrap flex items-center flex-[10]">
                                        <p className="bg-[#c4c4c4] rounded-full p-2 ml-2">
                                            {
                                                item.icon
                                            }
                                        </p>
                                        <p className={`text-[1.5rem]  font-serif tracking-wider ml-[1rem] mds-editor28:text-[1rem] ${theme ? "text-[#ffffff]" : "text-[#1b1a1a]"}`}>
                                            {item.name}
                                        </p>
                                    </div>
                                    <div className="arrow flex-[2]">
                                        <p className={`flex justify-end mr-1 ${theme ? "text-[#dedede] hover:text-[#2e2e2e]" : "text-[#555]"}`}>
                                            {item.arrow}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </motion.div >
        </>
    )
}
export default AdminRightSideBar = React.memo(AdminRightSideBar)