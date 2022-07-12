
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperSlideComponent from './SwiperSlideComponent';
function ChatUSerSwiper({ conversation, user, active, setInfo, setActive, setCurrentChat, currentChat, liveFriends }) {
    return (
        <>
            <div className="chat_user bg-[#d0d0d0] w-full  h-[3rem] flex items-center px-1 py-2 overflow-x-auto scrollbar-hide" id="top_live_user_in_mobile">
                {
                    liveFriends !== undefined && liveFriends.length > 0 && liveFriends.map((c) => {
                        return (
                            <>
                                        <SwiperSlideComponent conversation={c} />
                            </>
                        )
                    })
                }
            </div>
        </>
    );
};


export default ChatUSerSwiper