import React, { useRef } from 'react'
import { IoIosVideocam } from 'react-icons/io';
import Image from '@material-tailwind/react/Image';
import img1 from '../../assets/img/team-2-800x800.jpg';
import Button from "@material-tailwind/react/Button";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import { MdLocationOn, MdSearch, MdLocalPhone } from 'react-icons/md';
import { stepButtonClasses } from '@mui/material';

let str = "Sanju Kumar"
function LiveUser({ value }) {
    const buttonRef = useRef()


    async function openChatWindow() {


    }

    return (
        <section className="_live_user mt-4 ">

            <div className="outer relative mb-1  z-[11] flex hover:bg-[#7b787843] rounded-lg px-1" ref={buttonRef}>
                <div className=' bg-[#02a352] rounded-full   w-[8px] h-[8px] absolute ml-[1.9rem] 1sm:w-[6px] 1sm:h-[6px]   outline outline-[1px] outline-offset-0 outline-[#b8b5b5]  animate-pulse '></div>
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
                    <Image
                        src={value?.url}
                        rounded={true}
                        className="w-full h-full cursor-pointer"
                    />
                    {/* <Icon name={} size="sm" /> */}
                </Button>
                <p className='text-lg text-black mt-[2px] mr-[3px] ml-[5px] cursor-pointer'>{value.name.length > 16 ? value.name.slice(0, 15) + "..." : value.name}</p>

                <section className="video_group flex justify-around ml-auto mr-[5px] items-center">
                    <div className="video bg-[#9e9e9e56] hover:bg-[#4103eaf8] p-[4px] rounded-full transition-all duration-100 cursor-pointer text-black hover:text-white">
                        <IoIosVideocam className="video_icon md:text-[1.8rem] " />
                    </div>
                    <div className="audio ml-4 -mr-1 bg-[#9e9e9e56] hover:bg-[#2FA4FF] p-[4px] rounded-full transition-all duration-100 cursor-pointer text-black hover:text-white">
                        <MdLocalPhone className="audio_icon md:text-[1.5rem]" />
                    </div>
                </section>
            </div>


            {/* <Tooltips placement="left" ref={buttonRef} className="tippy_live bg-white z-[12]">
                <TooltipsContent>
                    <div className="user_info_container  flex text-black  mds-editor3:text-sm relative   ">
                        <section className='
                 mds-editor3:w-[8rem] mds-editor7:items-center mds-editor7:flex
                mds-editor7:content-center  mds-editor3:h-[8rem]  w-[5rem] h-[5rem] mr-1'>
                            <Image src={value?.url}
                                className="mds-editor7:mt-[2rem]"

                            />

                        </section>
                        <section className="info mds-editor3:w-[5rem]
                w-[8rem] text-center  mds-editor3:text-[.8rem]">
                            <p className='text-xl font-bold'>{value?.name}</p>
                            <article className='info_about flex gap-2  indent-2 mt-2 mds-editor7:flex-col'>
                                <section className='post'>
                                    <p className='text-lg font-semibold'>posts</p>
                                    <p>44</p>

                                </section>
                                <section className='friends'>
                                    <p className='text-lg font-semibold'>friends</p>
                                    <p>22</p>

                                </section>
                                <section className='status'>
                                    <p className='text-lg font-semibold'>status</p>
                                    <p>Single</p>

                                </section>

                            </article>
                            <article className='ml-[4px] mt-1'>
                                <section className='location flex'>
                                    <MdLocationOn className='mt-[2px] text-xl' />
                                    <p className='mt-[1px] ml-3'>
                                        Agra India

                                    </p>

                                </section>


                            </article>


                        </section>

                    </div>


                </TooltipsContent>
            </Tooltips> */}
        </section>
    )
}

export default LiveUser