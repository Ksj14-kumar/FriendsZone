import React from 'react'
import Image from '@material-tailwind/react/Image';
import { HiWifi } from 'react-icons/hi';
import { NavLink } from "react-router-dom"
import Photo from "../../../assets/img/download.png"
function RightSideLiveUser({ friend }) {
    return (
        <>
            <NavLink to={`/messages?q=${friend._id}`}>
                <aside className="live flex items-center mt-[.3rem] bg-[#d6d6d6] cursor-pointer py-1">
                    <div className="image rounded-full flex-shrink-0 w-[2.3rem] h-[2.3rem] flex-[2] flex justify-center ml-[.8rem] ">{
                        friend.url ?
                            <Image src={friend?.url} className=" rounded-full flex-shrink-0 " rounded={true} /> :
                            <Image src={Photo} className=" rounded-full flex-shrink-0" rounded={true} />
                    }
                    </div>
                    <p className="text-lg font-serif tracking-wider flex-[6]">{friend?.name}</p>
                    <div className="icons flex-[4] flex justify-center   animate-ping ">
                        <p className="text-center ">
                            <HiWifi className="text-[1.5rem] text-[#23e058]" />
                        </p>
                    </div>
                </aside>
            </NavLink>
        </>
    )
}
export default RightSideLiveUser