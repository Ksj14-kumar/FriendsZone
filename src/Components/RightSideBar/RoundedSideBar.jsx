import React from 'react'
import Image from '@material-tailwind/react/Image';
import img from '../../assets/img/team-2-800x800.jpg';

function RoundedSideBar() {
    return (
        <>
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />
            <Image src={img} className="rounded-full cursor-pointer mb-[6px]" />

        </>
    )
}

export default RoundedSideBar