import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import FriendInsideSlider from "./FriendInsideSlider";


export default function FriendSuggestion() {
  const windowWidth = window.innerWidth
  return (
    <>
      <Swiper navigation={true}
        slidesPerView={windowWidth <= 372 ? 2 : 3}
        spaceBetween={windowWidth <= 372 ? -50 : -85}
        slidesPerGroup={3}
        loop={false}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: false,
          type: '',

        }}

        modules={[Pagination, Navigation]}
        className="mySwiper"



      >
        <main className="main_friend flex gap-x-2">
          <SwiperSlide>
            <FriendInsideSlider />
          </SwiperSlide>
          <SwiperSlide>
            <FriendInsideSlider />
          </SwiperSlide>
          <SwiperSlide>
            <FriendInsideSlider />
          </SwiperSlide>
          <SwiperSlide>
            <FriendInsideSlider />
          </SwiperSlide>
          <SwiperSlide>
            <FriendInsideSlider />
          </SwiperSlide>
          <SwiperSlide>
            <FriendInsideSlider />
          </SwiperSlide>
          <SwiperSlide>
            <FriendInsideSlider />
          </SwiperSlide>
          <SwiperSlide>
            <FriendInsideSlider />
          </SwiperSlide>
          <SwiperSlide>
            <FriendInsideSlider />
          </SwiperSlide>
        </main>
      </Swiper>

    </>
  );
}
