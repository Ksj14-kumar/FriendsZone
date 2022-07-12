import Image from '@material-tailwind/react/Image'
import React from 'react'
import Gif from "../../assets/Stickers/gif.gif"
function NoPost() {
    return (
        <div className='bg-[#3C5E66] w-full h-screen flex justify-center content-center '>
            <div className='text-white flex  text-2xl bg-[#3C5E66] mds-editor9:items-center mds-editor9:item-center mds-editor9:mt-[9rem] items-center flex-col '>
                <p className='mt-[2rem] md:text-4xl underline underline-offset-1 '>
                    No Post Here
                </p>
                <Image
                className="flex-shrink-0  mds-editor9:-px-4   "
                src={Gif}
                />
            </div>
        </div>
    )
}

export default NoPost