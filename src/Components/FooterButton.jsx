import React, { useRef, useState, useEffect } from 'react'
import { MdMedicalServices } from 'react-icons/md';
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Image from '@material-tailwind/react/Image';
import img1 from '../assets/img/team-1-800x800.jpg';
import img2 from '../assets/img/team-2-800x800.jpg';
import img3 from '../assets/img/team-3-800x800.jpg';
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import { MdLocationOn, MdSearch } from 'react-icons/md';
import { stepButtonClasses } from '@mui/material';
function FooterButton({ bool }) {
    const buttonRef = useRef()
    const targetDiv = useRef()
    const siblingDiv = useRef()
    const [cssClass, setClass] = useState(false)







    async function openChatWindow() {


    }

    useEffect(() => {
        if (cssClass === true) {
            targetDiv.current.style.width = "15rem"
            siblingDiv.current.style.display = "none"

        }
        else {
            targetDiv.current.style.width = "0rem"
            targetDiv.current.style.marginRight = "3.9rem"
            siblingDiv.current.style.display = "block"

        }



    }, [cssClass])




    //HOW TO HANDLE USER NAME WHEN IT IS LARGE CHARACTER

    return (
        <>
            <main className="main border-2 border-solid border-gray-200">
                <header className="_top_chat_header  flex   items-center     py-1 justify-between ">
                    <section className="_left  "
                        ref={siblingDiv}
                    >

                        <p className='text-lg text-black ml-4 mds-editor7:text-sm'>Active</p>
                    </section>

                    <section className="_right relative  -px-4 mr-10 "
                        onFocus={() => {
                            // alert("hello world")
                        }}
                    >


                        <div className="container_search flex  items-center relative  w-0"

                            // onBlur={() => {
                            //     setClass(false)
                            // }}
                            ref={targetDiv}
                        >
                            <input type="text" placeholder="Search..." id="search_friend_live" className='h-[2rem] focus:outline-none rounded-full indent-2 caret-[#F10086] focus:border-1  w-full pr-[3.4rem] text-center focus:border-2 focus:border-solid focus:border-[#F10086] '
                            // onFocus={
                            //     setClass(true)
                            // }
                            />

                            <Button
                                color=""
                                rounded={true}
                                size="sm"
                                className="fixed right-0  text-black   mr-[3rem] bg-[#F10086]"
                                onClick={() => {
                                    setClass(!cssClass)
                                }}

                            >
                                <Icon name={<MdSearch className='text-[1.3rem] text-black' />} />


                            </Button>
                        </div>


                    </section>

                </header>
                <hr />
                
                <section className="_live_user mt-4">

                    <div className="outer relative mb-1  z-[2700] flex hover:bg-[#7b787843] rounded-lg px-1" ref={buttonRef}>
                        <div className=' bg-[#00FF7F] rounded-full   w-[8px] h-[8px] absolute ml-[1.9rem] 1sm:w-[6px] 1sm:h-[6px]   outline outline-[1px] outline-offset-0 outline-white '></div>
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
            </main>



        </>
    )
}

export default FooterButton