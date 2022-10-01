import React, { useEffect, useState } from 'react'
import { BiWifi } from "react-icons/bi"
import { MdClose } from "react-icons/md"
import { BsWifiOff } from "react-icons/bs"
import { motion } from "framer-motion"
import { Offline, Online } from "react-detect-offline"
function InternetDetection({ status, setStatus, children }) {
    const [bool, setBool] = useState(false)
    return (
        <>
            <Offline>
            <motion.div className={`bg-gradient-to-r from-gray-700 via-gray-900 to-black fixed bottom-[1rem] left-4 z-[1500] h-[6.1rem] rounded-md drop-shadow-lg shadow-indigo-500/40 w-[26rem] p-1`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: "easeInOut" }}
            >
                <div className="wrapper_internet flex flex-col h-full">
                    {/* <div className="flex justify-end w-full">
                            <button className='h-[2.5rem] w-[2.5rem] rounded-full flex items-center justify-center p-1 focus:outline-none hover:bg-[#858585] transition-all delay-100'>
                                <MdClose className="text-[2.2rem] font-serif text-[#686868] hover:text-[#d5d4d4]" />
                            </button>
                        </div> */}
                    <div className="inn flex items-center h-full">
                        <div className="icons flex-[2] flex justify-center">
                            <p className='flex items-center justify-center rounded-full h-[3rem] w-[3rem]'>
                                <BsWifiOff className='text-[2.2rem] text-[#a90909]' />
                            </p>
                        </div>
                        <div className="text flex-[9] flex justify-center">
                            <p className='text-[1.5rem] tracking-wider font-serif w-full text-[#cecece]'>
                                you are offline
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
            </Offline>
            <Online>
                <motion.div className={`bg-gradient-to-r from-gray-700 via-gray-900 to-black fixed bottom-[1rem] left-4 z-[1500] h-[6.1rem] rounded-md drop-shadow-lg shadow-indigo-500/40 w-[26rem] p-1 ${"hidden"}`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ease: "easeInOut" }}
                >
                    <div className="wrapper_internet flex flex-col h-full">
                        <div className="flex justify-end w-full">
                            <button className='h-[2.5rem] w-[2.5rem] rounded-full flex items-center justify-center p-1 focus:outline-none hover:bg-[#858585] transition-all delay-100'
                                onClick={() => {
                                    setBool(true)
                                }}
                            >
                                <MdClose className="text-[2.2rem] font-serif text-[#686868] hover:text-[#d5d4d4]" />
                            </button>
                        </div>
                        <div className="inn flex items-center">
                            <div className="icons flex-[2] flex justify-center">
                                <p className='flex items-center justify-center rounded-full h-[3rem] w-[3rem]'>
                                    <BiWifi className='text-[2.2rem] text-[#0bc329]' />
                                </p>
                            </div>
                            <div className="text flex-[9] flex justify-center">
                                <p className='text-[1.5rem] tracking-wider font-serif w-full text-[#cecece]'>
                                    now, you are online
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Online>
        </>
    )
}
export default InternetDetection