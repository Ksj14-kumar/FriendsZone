import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from '../../assets/img/team-1-800x800.jpg'
import img2 from '../../assets/img/team-2-800x800.jpg'
import img3 from '../../assets/img/team-3-800x800.jpg'
import img4 from '../../assets/img/team-4-470x470.png'
import img5 from '../../assets/img/thomas.jpg'
import img6 from '../../assets/img/team-3-800x800.jpg'
import img7 from '../../assets/img/background-1920x1280.jpg'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import FriendInsideSlider from "./FriendInsideSlider";
import { useSelector } from "react-redux"


export default function FriendSuggestion({ AllUser, FilterUser }) {

  const UserInformationLoad = useSelector((state) => {
    return state.UserInformationLoad.value
  })
  const windowWidth = window.innerWidth




  async function sendFriendRequest(Recieverfname, Recieverlname, RecieverId, RecieverUrl, connectMessage) {
    try {

      const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/sendfriendrequest`, {
        method: "POST",
        body: JSON.stringify({
          profileUrl: UserInformationLoad?.url,
          recieverName: Recieverfname + " " + Recieverlname,
          senderName: UserInformationLoad?.fname + " " + UserInformationLoad?.lname,
          userId: localStorage.getItem("uuid"),
          currentUser: UserInformationLoad?.googleId,
          anotherUserId: RecieverId,
          receiverUrl: RecieverUrl,
          senderUrl: UserInformationLoad?.url,

          connectMessage
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("uuid")}`
        }
      })
      const data = await res.json()
      if (res.status === 200) {
        // setConnectMessage(true)
        // setUser(data)
      }
      else if (res.status !== 200) {
        console.log("error")
      }

    } catch (err) {
      console.log(err)

    }
  }
  return (
    <>
      <Swiper navigation={true}
        slidesPerView={windowWidth <= 372 ? 2 : 3}
        spaceBetween={windowWidth <= 372 ? 10 : -85}
        slidesPerGroup={windowWidth <= 372 ? 2 : 3}
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
          {
            (AllUser !== null || AllUser !== undefined) && AllUser.map((item, index) => {
              return (
                <>
                  <SwiperSlide key={index}>
                    <FriendInsideSlider image={img1} item={item} FilterUser={FilterUser} sendFriendRequest={sendFriendRequest} />
                  </SwiperSlide>

                </>
              )
            })
          }

          {/* // <SwiperSlide>
              //   <FriendInsideSlider image={img2} />
              // </SwiperSlide>
              // <SwiperSlide>
              //   <FriendInsideSlider image={img3} />
              // </SwiperSlide>
              // <SwiperSlide>
              //   <FriendInsideSlider image={img4} />
              // </SwiperSlide>
              // <SwiperSlide>
              //   <FriendInsideSlider image={img5} />
              // </SwiperSlide>
              // <SwiperSlide>
              //   <FriendInsideSlider image={img6} />
              // </SwiperSlide>
              // <SwiperSlide>
              //   <FriendInsideSlider image={img7} />
              // </SwiperSlide>
              // <SwiperSlide>
              //   <FriendInsideSlider image={img1} />
              // </SwiperSlide>
              // <SwiperSlide>
              //   <FriendInsideSlider image={img4} />
              // </SwiperSlide> */}
        </main>
      </Swiper>

    </>
  );
}
