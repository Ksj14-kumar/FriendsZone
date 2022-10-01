import React from 'react'
import NewsSection from '../RightSideBar/NewsSection'
import RoundedSideBar from '../RightSideBar/RoundedSideBar'
function RightSide() {
    return (
        <>
            <div className="right_section bg-[#fffefe00] md:w-[27.5rem] md:fixed md:right-0 top-[3.7rem]  hidden h-screen  mds-editor22:flex md:flex-row-reverse md:justify-between">
                <aside className="right_side_bar bg-[#000000e9]   w-[3.5rem]  rounded-none h-full  ">
                    <div className="image mt-[2.5rem] mx-[2px] bg-[#717171a4] h-full rounded-lg pt-2 hover:transition-colors p-[2px] ">
                        <RoundedSideBar />
                    </div>
                </aside>
                <div className="left_side relative md:w-full bg-[#242424]" >
                    {/* <SliderNews/> */}
                    <NewsSection />
                    {/* <SliderNews />- */}
                </div>
            </div>
        </>
    )
}
export default RightSide;