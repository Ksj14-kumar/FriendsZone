import React from 'react'
import Image from '@material-tailwind/react/Image'
import Icon from "@material-tailwind/react/Icon";

import img from '../../assets/img/team-2-800x800.jpg'
import { FaUserPlus } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import Button from '@material-tailwind/react/Button';
function FriendInsideSlider() {
    return (
        <>
            <div className="friends_suggests  bg-white flex flex-col w-[15rem] mds-editor13:w-[10rem] rounded-lg p-1  border-[#d0cfcf] border border-solid">
                <header className="image w-full h-full relative">
                    <Image src={img}
                        className="w-full h-full rounded-lg"


                    />
                    <Button
                        color=""
                        buttonType="filled"
                        size="regular"
                        rounded={true}
                        block={false}
                        iconOnly={true}
                        ripple="light"
                        className="absolute -top-1 -right-1 md:top-1 md:right-1"
                    >
                        <Icon name={<MdCancel  className='text-[1.8rem] md:text-[2.6rem] rounded-full  bg-[#05040400] text-[#fff]'/>} size="sm" />
                    </Button>
                </header>
                <div className="already_friends my-3">
                    <p className='text-[1.4rem] font-semibold '>Sanju Kumar</p>

                </div>
                <div className="friend_connect flex justify-center bg-white mt-1 mb-1 px-2">
                    <button
                        size="sm"
                        ripple="none"
                        className="px-[3rem]  py-[.5rem] mds-editor13:px-[2rem] mds-editor13:py-[.2rem] bg-[#002637] hover:bg-[#0d3b50] focus:outline-none rounded-lg"
                    ><p className="md:text-[1.3rem] text-white tracking-wider flex items-baseline "><FaUserPlus className='mr-[4px] text-[1.3rem]' />Connect</p></button>
                </div>
            </div>



        </>
    )
}

export default FriendInsideSlider