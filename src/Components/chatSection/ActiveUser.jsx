import React from 'react'
import Image from '@material-tailwind/react/Image'
import img1 from '../../assets/img/team-3-800x800.jpg';
function ActiveUser() {
    return (
        <div className='text-sm px-6 py-1 bg-gray-500  z-[25000] rounded-sm flex justify-between content-center items-center cursor-pointer '
        >
            <section className='w-[1.8rem] h-[1.8rem]'>
                <Image
                    src={img1}
                    rounded={true}
                />
            </section>
            <p className='ml-[10px]'>
                ChatWindow
            </p>
        </div>
    )
}

export default ActiveUser