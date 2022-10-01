import Image from '@material-tailwind/react/Image'
import React, { useState } from 'react'
import { motion } from "framer-motion"
import "swiper/css";
import "swiper/css/navigation";
function OverlayEffexct({ setBool, overlayObject, setOverlayObject, AllImages }) {
    const [overlayBool, setOverlayBool] = useState(false)
    return (
        <>
            {
                overlayObject?.url &&
                <motion.div
                    initial={{ opacity: 0, y: overlayBool ? 100 : -100, y: -100 }}
                    animate={{ opacity: 1, y: overlayBool ? 200 : 0, y: 0 }}
                    transition={{ type: "tween", stiffness: 100, damping: 10 }}
                    className="overlay_effect fixed w-screen h-screen z-[19] bg-[#030202d6] ">
                    <p className=" flex justify-end ">
                        <button className="text-white px-4 py-2 rounded-full mr-[2rem] mt-[.8rem] text-[2rem] focus:outline-none "
                            onClick={() => {
                                setOverlayBool(false)
                                setBool(false)
                            }}
                        >
                            X
                        </button>
                    </p>
                    <div className="wrapper_container flex justify-center items-center h-full w-full ">
                        <div className="image md:h-[45rem] md:w-[34rem] md:-mt-[10rem] -mt-[18rem]">
                            {overlayObject.type === "image" && (
                                <Image
                                    src={overlayObject.url}
                                    rounded={false}
                                    className={` cursor-pointer  flex-shrink-0 h-full w-full`}
                                />
                            )}
                        </div>
                    </div>
                </motion.div>}
        </>
    )
}
export default OverlayEffexct