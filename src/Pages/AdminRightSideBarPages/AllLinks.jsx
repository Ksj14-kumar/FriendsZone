import React from 'react'

import { useSelector } from 'react-redux'

function AllLinks(props) {
    const BookMark = useSelector((state) => {
        // console.log({ state })
        return state.BookMark
    })
    return (
        <>
            <div className={`music ${props.theme?"hover:bg-[#222222]":"hover:bg-[#e7e7e7]"} bg-[#e7e7e747] flex py-3 items-center cursor-pointer rounded-lg mb-2`}>
                <div className="wrap flex items-center flex-[10]">

                    <p className="bg-[#c4c4c4] rounded-full p-2 ml-2">
                        {/* <{props.icon} className="text-[2rem] mds-editor28:text-[1.5rem]" /> */}
                        {
                            props.icon
                        }
                    </p>
                    <p className={`text-[1.5rem]  font-serif tracking-wider ml-[1rem] mds-editor28:text-[1rem] ${props.theme?"text-[#ffffff]":"text-[#1b1a1a]"}`}>
                        {props.name}
                    </p>
                    {props.name === "BookMark" && <p className={`ml-2 flex items-center justify-center rounded-full p-1 text-[1.2rem] px-2 ${props.theme?"text-[#fff]":"text-[#000]"}  bg-[#ffd710] font-sans`}>
                        {BookMark.length}
                    </p>}
                </div>
                <div className="arrow flex-[2]">
                    <p className={`flex justify-end mr-1 ${props.theme?"text-[#dedede] hover:text-[#2e2e2e]":"text-[#555]"}`}>
                        {/* <MdArrowForwardIos className="text-[1.8rem] mds-editor28:text-[1.3rem]" /> */}
                        {props.arrow}
                    </p>
                </div>
            </div>


        </>
    )
}

export default AllLinks