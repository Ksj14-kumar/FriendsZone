import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { MdSettings, MdMusicNote, MdArrowForwardIos } from "react-icons/md"
import { FaMoon } from "react-icons/fa"
import { GiNewspaper } from "react-icons/gi"

function AdminRightSideBar({ showRightSideBar, setShowRightSideBar, logout }) {
    const [bool, setBool] = useState(true)



    useEffect(() => {

    }, [bool])
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
                className="fixed bg-[#fffefe] top-[3.4rem] right-[0rem] z-[17] w-[25rem] mds-editor28:w-[16rem] h-screen px-4" id="adminRightSideBar">


                <div className="Con">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, accusantium!

                </div>


                {/* =============================USER SETTING========================== */}
                <div className="setting_privacy hover:bg-[#e7e7e7] bg-[#e7e7e747] flex py-3 items-center cursor-pointer rounded-lg mb-2">
                    <div className="wrap flex items-center flex-[10]">

                        <p className="bg-[#c4c4c4] rounded-full p-2 ml-2">
                            <MdSettings className="text-[2rem] mds-editor28:text-[1.5rem] " />
                        </p>
                        <p className="text-[1.5rem] mds-editor28:text-[1rem] text-[#1b1a1a] font-serif tracking-wider ml-[1rem]">
                            Setting
                        </p>
                    </div>
                    <div className="arrow flex-[2]">
                        <p className="flex justify-end mr-1">
                            <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />
                        </p>
                    </div>
                </div>




                {/* ======================================USER THEME MODE========================= */}
                <div className="change_theme_mode hover:bg-[#e7e7e7] bg-[#e7e7e747] flex py-3 items-center cursor-pointer rounded-lg mb-2">
                    <div className="wrap flex items-center flex-[10]">

                        <p className="bg-[#c4c4c4] rounded-full p-2 ml-2">
                            <FaMoon className="text-[2rem] mds-editor28:text-[1.5rem]" />
                        </p>
                        <p className="text-[1.5rem] text-[#1b1a1a] font-serif tracking-wider ml-[1rem] mds-editor28:text-[1rem]">
                            Theme Mode
                        </p>
                    </div>
                    <div className="arrow flex-[2]">
                        <p className="flex justify-end mr-1">
                            <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />
                        </p>
                    </div>
                </div>

                {/* ======================================User Music========================= */}

                <div className="music hover:bg-[#e7e7e7] bg-[#e7e7e747] flex py-3 items-center cursor-pointer rounded-lg mb-2">
                    <div className="wrap flex items-center flex-[10]">

                        <p className="bg-[#c4c4c4] rounded-full p-2 ml-2">
                            <MdMusicNote className="text-[2rem] mds-editor28:text-[1.5rem]" />
                        </p>
                        <p className="text-[1.5rem] text-[#1b1a1a] font-serif tracking-wider ml-[1rem] mds-editor28:text-[1rem]">
                            Songs Accessbility
                        </p>
                    </div>
                    <div className="arrow flex-[2]">
                        <p className="flex justify-end mr-1">
                            <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />
                        </p>
                    </div>
                </div>



                {/* ======================================User NEWS========================= */}

                <div className="music hover:bg-[#e7e7e7] bg-[#e7e7e747] flex py-3 items-center cursor-pointer rounded-lg mb-2">
                    <div className="wrap flex items-center flex-[10]">

                        <p className="bg-[#c4c4c4] rounded-full p-2 ml-2">
                            <GiNewspaper className="text-[2rem] mds-editor28:text-[1.5rem]" />
                        </p>
                        <p className="text-[1.5rem] text-[#1b1a1a] font-serif tracking-wider ml-[1rem] mds-editor28:text-[1rem]">
                            News
                        </p>
                    </div>
                    <div className="arrow flex-[2]">
                        <p className="flex justify-end mr-1">
                            <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" />
                        </p>
                    </div>
                </div>

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