import React from 'react'
import Image from '@material-tailwind/react/Image';
import img1 from '../../assets/img/team-2-800x800.jpg';
import img2 from '../../assets/img/team-2-800x800.jpg';
import img3 from '../../assets/img/team-3-800x800.jpg';
import img4 from '../../assets/img/team-4-470x470.png';
import img5 from '../../assets/img/team-1-800x800.jpg';
const imageArray = [img1, img2, img3, img4, img5]
function RoundedSideBar() {
    return (
        <>
            {
                imageArray !== undefined && imageArray.map((item, index) => {
                    return (
                        <Image src={item} key={index} className="rounded-[50px] cursor-pointer relative mb-[9px] transition-all hover:scale-[2] hover:-translate-x-4 z-[1000]" />
                    )
                })
            }
            {/* <Image src={img1} className="rounded-[50px] cursor-pointer relative mb-[9px] transition-all hover:scale-[2] hover:-translate-x-4 z-[1000]" />
            <Image src={img2} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" />
            <Image src={img3} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" />
            <Image src={img4} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" />
            <Image src={img5} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" />
            <Image src={img2} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" />
            <Image src={img3} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" />
            <Image src={img4} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" />
            <Image src={img3} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" />
            <Image src={img1} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" />
            <Image src={img5} className="rounded-[50px] cursor-pointer mb-[9px] relative transition-all hover:scale-[2] z-[1000] hover:-translate-x-4" /> */}
        </>
    )
}
export default RoundedSideBar