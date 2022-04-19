import React, { useRef } from 'react'
import { MdMedicalServices } from 'react-icons/md';
import Image from '@material-tailwind/react/Image';
import img1 from '../../assets/img/team-2-800x800.jpg';
import Button from "@material-tailwind/react/Button";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import { MdLocationOn, MdSearch } from 'react-icons/md';
import { stepButtonClasses } from '@mui/material';
function LiveUser() {
    const buttonRef = useRef()

    
    async function openChatWindow() {


    }

    return (
        <section className="_live_user mt-4">

            <div className="outer relative mb-1  z-[2700] flex hover:bg-[#7b787843] rounded-lg px-1" ref={buttonRef}>
                <div className=' bg-[#00FF7F] rounded-full   w-[5px] h-[5px] absolute ml-[1.9rem] 1sm:w-[6px] 1sm:h-[6px]   outline outline-[1px] outline-offset-0 outline-[#b8b5b5]  animate-pulse '></div>
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
                        src={img1}
                        rounded={true}
                        className="w-full h-full"
                    />
                    {/* <Icon name={} size="sm" /> */}
                </Button>
                <p className='text-xl text-black mt-[2px] ml-[8px]'>Sanju Kumar</p>
            </div>


            <Tooltips placement="auto" ref={buttonRef} className="bg-white">
                <TooltipsContent>
                    <div className="user_info_container  flex text-black bg-white mds-editor3:text-sm">
                        <section className='
                 mds-editor3:w-[8rem] mds-editor7:items-center mds-editor7:flex
                mds-editor7:content-center  mds-editor3:h-[8rem]  w-[8rem] h-[8rem] mr-1'>
                            <Image src={img1}
                                className="mds-editor7:mt-[5rem]"

                            />

                        </section>
                        <section className="info mds-editor3:w-[8rem]
                w-[12rem] text-center  mds-editor3:text-[.8rem]">
                            <p className='text-xl font-bold'>Tony Sama</p>
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
            </Tooltips>
        </section>
    )
}

export default LiveUser