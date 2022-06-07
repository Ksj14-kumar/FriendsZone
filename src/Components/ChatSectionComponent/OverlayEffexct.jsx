import Image from '@material-tailwind/react/Image'
import React, { useState } from 'react'
// import Photo from "../../"
import { motion } from "framer-motion"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";

// import required modules
import { Navigation } from "swiper";

const Photo = "https://images.pexels.com/photos/3727177/pexels-photo-3727177.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"

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
                                // setOverlayObject( {bool: false} )
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




                            {/* <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                {
                                    AllImages.map((image, index) => {

                                        return (
                                            <>
                                                <div className="conats" keys={index}>

                                                    {image.messageID === overlayObject.MessageId &&

                                                        <SwiperSlide>
                                                            <Image
                                                                src={image.message}
                                                                rounded={false}
                                                                className={` cursor-pointer  flex-shrink-0 h-full w-full`}
                                                            />
                                                        </SwiperSlide>
                                                    }

                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </Swiper> */}

                        </div>

                    </div>


                </motion.div>}
        </>
    )
}

export default OverlayEffexct