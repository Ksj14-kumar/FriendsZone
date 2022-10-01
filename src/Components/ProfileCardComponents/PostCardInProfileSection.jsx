import React from 'react'
import Image from '@material-tailwind/react/Image'
import team from '../../assets/img/team-2-800x800.jpg'
import { RiThumbUpFill, RiShareFill } from 'react-icons/ri'
import { MdAccessTimeFilled, MdModeComment, MdLock } from 'react-icons/md'
import { GoGlobe } from 'react-icons/go';
const da = new Date(Date.now()).toUTCString().split(" ")
function PostCardInProfileSection() {
    return (
        <main className="content  m-1 flex">
            <section className="all_posts w-[18em] border-[1px] border-solid border-gray-100">
                <div className="header flex justify-between px-[5px]">
                    <article className='time flex  items-baseline relative text-[1.2rem]'>
                        <p className='text-[1.1rem] mx-1' >
                            <MdAccessTimeFilled />
                        </p>
                        {da[0] + da[1] + " " + da[2] + " " + da[3] + " "}
                        <p className='text-[1rem] mx-1 text-bold'>at</p>
                        {da[4].split(":")[0] + ":" + da[4].split(":")[1]}
                    </article>
                    <div className="privacy">
                        <MdLock />
                        <GoGlobe />
                    </div>
                </div>
                <article className="text p-2 bg-white shadow-sm text-">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, modi.
                </article>
                <article className='images mb-[2px]'>
                    <Image
                        src={team}
                        rounded={false}
                        className="rounded-none"
                    />
                </article>
                <hr className='border-1 border-gray-400 ' />
                <article className="like comment section flex justify-between overflow-hidden text-[1.2rem] ">
                    <section className="like text-[#4043f1] px-[1.7rem] my-[2px] rounded-sm hover:bg-blue-200 flex items-center content-center rounded-r-none ">
                        <RiThumbUpFill />
                        <p className='text-[.9rem] ml-[3px]'>89</p>
                    </section>
                    <section className="comment text-[#4043f1]  px-[2rem] my-[2px]  hover:bg-blue-200 py-[1px] flex items-center content-center rounded-none">
                        <MdModeComment />
                        <p className='text-[.9rem] ml-[3px]'>89</p>
                    </section>
                    <section className="share text-[#4043f1]  px-[2rem] my-[2px] rounded-sm hover:bg-blue-200 flex items-center content-center rounded-l-none">
                        <RiShareFill />
                        <p className='text-[.9rem] ml-[3px]'>89</p>
                    </section>
                </article>
                <hr className='border-1 border-gray-400 ' />
            </section>
        </main>
    )
}
export default PostCardInProfileSection