
import React, { useState } from "react";
import Navigations from "./HomePageNavigation";
import { IoMdClose } from "react-icons/io"
import { VscThreeBars } from "react-icons/vsc"
import { motion, AnimatePresence } from "framer-motion"
import { NavLink } from "react-router-dom";
import SVG from "../assets/styles/undraw_social_interaction_re_dyjh.svg"
export default function Header(props) {
    const [navigationToggle, setToggleNavigation] = useState(false);
    return (
        <>
            <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r  py-2 flex justify-between px-4 items-center relative  w-full drop-shadow-lg relative z-[17]" id="homepage">
                <div className="nav_bar_brand">
                    <p className="text-[2.2rem] tracking-wider font-serif select-none cursor-pointer text-[#e3e3e3]">CollegeZone</p>
                </div>
                <div className="navigation flex justify-evenly items-center"
                    onClick={() => {
                        setToggleNavigation(!navigationToggle)
                    }}
                >
                    {!navigationToggle ? <p className="p-3 bg-[#cbcbcb] rounded-full cursor-pointer drop-shadow-md">
                        <VscThreeBars className="text-[2.1rem] font-serif text-[#eb0a0a]" />
                    </p> :
                        <p className="p-3 drop-shadow-md bg-[#cbcbcb] rounded-full cursor-pointer">
                            <IoMdClose className="text-[2.1rem] font-serif text-[#eb0a0a]" />

                        </p>}
                </div>
                <AnimatePresence>

                    {
                        navigationToggle && <motion.div className="right absolute bg-gradient-to-l from-gray-200 via-gray-400 to-gray-600 w-[15rem] top-[4.6rem] right-0 drop-shadow-lg px-2 pt-1 min-h-[calc(100vh-0rem)]  z-[2]"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ "ease": "easeInOut", duration: .1 }}
                            exit={{ opacity: 0, x: 100 }}>
                            {Navigations.map((item, index) => {
                                return (
                                    <>
                                        <NavLink to={item.path} key={index}>
                                            <div className="nav flex  items-center bg-gradient-to-r from-indigo-300 to-purple-400 py-2 mb-1 px-2 rounded-md hover:bg-[#6f6f6f] transition-all  delay-100 cursor-pointer">
                                                <p className="text-[2.4rem] font-serif text-[#fff]">{item.icon}</p>
                                                <p className="text-[1.8rem] font-serif tracking-wider ml-3 text-[#fff]">{item.name}</p>

                                            </div>
                                        </NavLink>
                                    </>
                                )
                            })
                            }
                        </motion.div>
                    }
                </AnimatePresence>

            </div>

            <div className="share_pic_home flex justify-center">
                <img src={SVG} className="h-[calc(100vh-5rem)]"/>
            </div>
        </>
    );
}
