import React, { useRef } from 'react'
import { IoIosVideocam } from 'react-icons/io';
import Image from '@material-tailwind/react/Image';
import Photos from '../../assets/img/download.png';
import Button from "@material-tailwind/react/Button";
import { MdLocalPhone } from 'react-icons/md';

function LiveUser({ value,theme }) {
    const buttonRef = useRef(null)
    async function openChatWindow() {
    }
    return (
        <section className="_live_user mt-4 ">
            <div className="outer relative mb-1  z-[11] flex hover:bg-[#7b787843] rounded-lg px-1 py-1" ref={buttonRef}>
                <div className=' bg-[#0bf37f] rounded-full   w-[8px] h-[8px] absolute ml-[1.9rem] 1sm:w-[6px] 1sm:h-[6px]   outline outline-[1px] outline-offset-0 outline-[#b8b5b5]  animate-pulse '></div>
                <Button
                    color="lightBlue"
                    buttonType="filled"
                    size="regular"
                    rounded={true}
                    block={false}
                    iconOnly={true}
                    ripple="light"
                    className="mx-[4px] border-2 border-solid border-red-bg"
                    onClick={() => {
                        openChatWindow()
                    }}
                >
                    {value?.url ? <Image
                        src={value?.url}
                        rounded={true}
                        className={`w-full h-full cursor-pointer ${theme?"outline outline-2 outline-offset-1 outline-[#7a7a7a] outline-solid":""}`}
                    /> :
                        <Image
                            src={Photos}
                            rounded={true}
                            className={`w-full h-full cursor-pointer ${theme?"outline outline-2 outline-offset-1 outline-[#fff]":""}`}
                        />}
                </Button>
                <p className={`text-lg  mt-[2px] mr-[3px] ml-[5px] cursor-pointer truncate ${theme?"text-[#fff]":"text-black"}`}>{value.name.length > 16 ? value.name.slice(0, 15) + "..." : value.name}</p>
                <section className="video_group flex justify-around ml-auto mr-[5px] items-center">
                    <div className="video bg-[#9e9e9e56] hover:bg-[#4103eaf8] p-[4px] rounded-full transition-all duration-100 cursor-pointer text-black hover:text-white">
                        <IoIosVideocam className="video_icon md:text-[1.8rem] " />
                    </div>
                    <div className="audio ml-4 -mr-1 bg-[#9e9e9e56] hover:bg-[#2FA4FF] p-[4px] rounded-full transition-all duration-100 cursor-pointer text-black hover:text-white">
                        <MdLocalPhone className="audio_icon md:text-[1.5rem]" />
                    </div>
                </section>
            </div>
        </section>
    )
}

export default LiveUser