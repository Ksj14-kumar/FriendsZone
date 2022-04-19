import React, { useRef, useState, useEffect } from 'react'
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { MdLocationOn, MdSearch } from 'react-icons/md';


import LiveUser from './chatSection/LiveUser';
function FooterButton({ bool }) {
    const targetDiv = useRef()
    const siblingDiv = useRef()
    const [cssClass, setClass] = useState(false)








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
            <main className="main border-2 border-solid border-gray-200 drop-shadow-sm">
                <header className="_top_chat_header  flex   items-center     py-1 justify-between ">
                    <section className="_left  "
                        ref={siblingDiv}
                    >

                        <p className='text-lg text-black ml-4 mds-editor7:text-sm'>Active</p>
                    </section>

                    <section className="_right relative  -px-4 mr-10 flex"
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
                            <input type="text" placeholder="Search..." id="search_friend_live" className='h-[2rem] focus:outline-none rounded-full indent-2 caret-[#d5309e] focus:border-1  w-full pr-[3.4rem] text-center focus:border-2 focus:border-solid focus:border-[#ffffff] '
                            // onFocus={
                            //     setClass(true)
                            // }
                            />

                            <Button
                                color=""
                                rounded={true}
                                size="sm"
                                className="fixed right-0  text-black   mr-[3rem] bg-[#ffffff]"
                                onClick={() => {
                                    setClass(!cssClass)
                                }}

                            >
                                <Icon name={<MdSearch className='text-[1.3rem] text-black' />} />


                            </Button>
                        </div>
                        <div>
                            {/* //add something */}
                        </div>


                    </section>

                </header>
                <hr />
                <LiveUser />
                <LiveUser />
                <LiveUser />
                <LiveUser />
                <LiveUser />
                <LiveUser />
                <LiveUser />


            </main>



        </>
    )
}

export default FooterButton