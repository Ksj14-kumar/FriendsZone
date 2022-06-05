import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from '@material-tailwind/react/Image';
import img from '../../assets/img/team-2-800x800.jpg';
import { NavLink } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
function SwiperSlideComponent({ conversation, user, active, setInfo }) {


    return (
        <>

            <NavLink to={`/messages?q=${conversation._id}`}>
                <section className="chat_users  w-[2.4rem] h-[2.2rem] flex items-center  rounded-full relative cursor-pointer flex-shrink-0 mr-3">
                    {
                        conversation?.url &&
                        <section className="image relative">

                            <Image
                                src={conversation?.url}
                                rounded={true}
                                raised={false}
                                alt=""
                                className="flex-shrink-0"

                            />
                            {/* <div className="time fixed w-[.9rem] h-[.9rem] bg-[#13f507] top-[32px] left-[23px] rounded-full border border-solid border-[#e3e0e0]">

</div> */}
                        </section>
                    }
                    <div className="live_dot w-[9px] h-[8px] bg-[#04e055] absolute top-[22px] rounded-[15px] animate-pulse "></div>

                </section>
            </NavLink>
        </>


    )
}

export default SwiperSlideComponent