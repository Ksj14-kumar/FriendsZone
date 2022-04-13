import React, { useRef } from 'react'
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
function FooterButton({ bool }) {
    const buttonRef = useRef()







    async function openChatWindow() {


    }



    //HOW TO HANDLE USER NAME WHEN IT IS LARGE CHARACTER

    return (
        <>
            <main className="main">
                <header className="_top_chat_header  flex justify-around items-center   cursor-pointer bg-green-500">
                    <section className="_left">

                        <p className='text-lg text-black '>Active</p>
                    </section>

                    <section className="_right relative"
                        onFocus={() => {
                            // alert("hello world")
                        }}
                    >
                        {/* <div className="container_search">
                            <input placeholder='Search...' className='js-search bg-red-500' type="text" id="search_friend_live" />
                            <MdSearch className='text-lg text-black cursor-pointer absolute ml-1' />

                        </div> */}

                        <div className="container_search">
                            <input type="text" placeholder="Search..." id="search_friend_live" />
                            <div className="search_input_icon"></div>
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


                    <Tooltips placement="left" ref={buttonRef}>
                        <TooltipsContent>
                            <div className="user_info_container  flex">
                                <section className='bg-red-500 w-[8rem] h-[8rem] mr-1'>
                                    <Image src={img1}

                                    />

                                </section>
                                <section className="info  w-[12rem] text-center">
                                    <p className='text-xl font-bold'>Tony Sama</p>
                                    <article className='info_about flex gap-2  indent-2 mt-2'>
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