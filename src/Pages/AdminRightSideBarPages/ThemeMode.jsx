import React, { useState } from 'react'
import { AiFillCaretRight, AiOutlineCaretDown } from "react-icons/ai"
import { BsFillSunFill } from "react-icons/bs"
import { MdDarkMode } from "react-icons/md"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@material-tailwind/react"
import { useDispatch } from 'react-redux'
function ThemeMode() {
    const [showMoreBackground, setMoreBackground] = useState(false)
    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()
    return (

        <div className='h-[calc(100vh-0rem)] pt-[4rem] overflow-y-auto pb-6 '>
            <div className="inne md:ml-[17rem] flex   ">

                <div className="blog_theme  border-solid border-[#dcdcdc] w-full rounded-md">
                    <div className="mode flex justify-end pr-[1rem] py-3">
                        <p className='text-[1.4rem] font-serif tracking-wider flex justify-end '>
                            <div className={`toogle_theme rounded-[50px] border-1 border-solid w-[9rem] py-1  flex justify-around relative cursor-pointer ${!toggle ? "bg-[#fff]" : "bg-[#000] border border-solid border-[#222222]"}`}
                                onClick={() => {
                                    setToggle(!toggle)
                                    dispatch({ type: "Theme", payload: !toggle })
                                }}
                            >
                                <section className='bg-[#e1e0e0] p-2 rounded-full flex justify-center items-center cursor-pointer'>
                                    <BsFillSunFill className='text-[2rem]  text-[#fff]' />

                                </section>
                                <section className='bg-[#010101] p-2 rounded-full flex justify-center items-center cursor-pointer'>
                                    <MdDarkMode className='text-[2rem] text-[#575757]' />

                                </section>
                                <motion.div className={`ball rounded-full p-[1.56rem] top-[1px] ${!toggle ? "bg-[#030303]" : "bg-[#ffffff]"} absolute border-[1px] border-solid border-[#fff] ${toggle ? "left-[9px]" : "left-[5.25rem]"}`}
                                

                                ></motion.div>

                            </div>
                        </p>
                    </div>
                    {/* <section className='outer_theme w-full'>
                        <header className="text-[1.4rem] font-serif tracking-wider w-full text-center py-2 text-[#fff] bg-[#0a6fdb]">
                            Color Customization
                        </header>
                        <main className="front ">
                            {[{ name: "Icon's Color:", id: 1 }, { name: "Font's Color:", id: 2 }].map(item => {
                                return (
                                    <>
                                        <Color name={item.name} id={item.id} />
                                    </>
                                )
                            })}

                            <div className="Background Color flex py-2 bg-[#eaeaea] pl-2 hover:bg-[#bdbdbd] items-center">
                                <p className='text-[1.6rem] font-serif tracking-wider'>Background Color's:</p>
                                <p className='text-[2.3rem]'
                                    onClick={() => {
                                        setMoreBackground(!showMoreBackground)
                                    }}
                                >
                                    {
                                        !showMoreBackground ? <AiFillCaretRight /> : <AiOutlineCaretDown />

                                    }

                                </p>


                            </div>

                            {
                                showMoreBackground &&
                                <motion.div className="wrap bg-[#fffefe] w-full pl-6 rounded-md py-2 pr-3"
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ ease: "easeInOut", duration: .5 }}
                                >

                                    {[{ name: "HomePage Background:", id: 3 },
                                    { name: "Setting Background:", id: 4 },
                                    { name: "BookMark Background:", id: 5 },
                                    { name: "News Background:", id: 6 }
                                    ].map(item => {
                                        return (
                                            <>
                                                < Color name={item.name} id={item.id} />


                                            </>
                                        )
                                    })}
                                </motion.div>
                            }


                            {
                                [
                                    { name: "RightSideBar Background:", id: 7 },
                                    { name: "LeftSideBar Background:", id: 8 }
                                ].map(item => {
                                    return (
                                        <>
                                            <Color name={item.name} id={item.id} />

                                        </>
                                    )
                                })
                            }


                        </main>



                    </section>
                    <hr className='bg-[#cfcfcf]' />
                    <section className="inner_theme">
                        <header className='text-[1.4rem] font-serif tracking-wider text-center py-2 bg-[#0939d7c5] text-[#fff]'>Chat Messenger Color's</header>
                        <main className="chat pb-3">
                            <div className="messenger_left_side_color flex py-2 bg-[#eaeaea] pl-2 hover:bg-[#bdbdbd]">
                                <p className='text-[1.4rem] tracking-wider mr-2'>LeftSide Color: </p>
                                <input type="color" name="" id="" />
                            </div>
                            <div className="Right_left_side_color flex py-2 bg-[#eaeaea] pl-2 hover:bg-[#bdbdbd]">
                                <p className='text-[1.4rem] tracking-wider mr-2'>RightSide Color: </p>
                                <input type="color" name="" id="" />
                            </div>
                            <div className="messenger_left_side_color flex py-2 bg-[#eaeaea] pl-2 hover:bg-[#bdbdbd]">
                                <p className='text-[1.4rem] tracking-wider mr-2'> Chat Backgound Color: </p>
                                <input type="color" name="" id="" />
                            </div>
                        </main>

                        <button className="btn btn-block focus:outline-none normal text-[1.4rem] tracking-wider">Submit</button>



                    </section> */}

                </div>

            </div>

        </div>
    )
}

export default ThemeMode = React.memo(ThemeMode)



function Color({ name, id }) {
    return (
        <>

            {/* ${id !== 1 && id !== 2 && id !== 7 && id !== 8 && "ml-[4rem]"} */}
            <div className={`icons flex py-2 bg-[#eaeaea] pl-2 hover:bg-[#bdbdbd] ${id == 3 && "rounded-t-md"} ${id === 6 && "rounded-b-md"}`}>
                <p className='text-[1.6rem] font-serif tracking-wider'>{name}</p>
                <input type="color" name="" id="" />
            </div>


        </>
    )
}