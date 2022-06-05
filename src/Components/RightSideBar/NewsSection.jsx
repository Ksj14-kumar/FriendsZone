import Image from '@material-tailwind/react/Image'
import React from 'react'
import img from '../../assets/img/team-2-800x800.jpg';
function NewsSection() {
    return (
        <main className="main_container  relative cursor-pointer">
            <div className="image_container">
                {/* <Image
                    src={img}
                    rounded={false}
                    className="rounded-none"

                /> */}
            </div>
            <div className="info_container absolute bg-[#0000003c] w-full -mt-[13.2rem]">
                <header className="header flex justify-between px-3">
                    <div className="left"><p className='text-white text-[1.3rem]'>20/04/2022</p></div>
                    <div className="right">
                        <p className='text-white text-[1.3rem]'>By Sanju Kumar</p>

                    </div>
                </header>
                <article className='text-[#f9f9f9] text-[1.4rem] text-center mt-[8px]'>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, modi dolores numquam cupiditate tempore nobis. Reprehenderit asperiores vel dolorem voluptate.</p>
                </article>
            </div>
        </main>


    )
}

export default NewsSection