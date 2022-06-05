import React from 'react'
import { useParams } from 'react-router-dom'
import AddPost from '../ProfilePageComponent/AddPost'
import FriendSuggestion from '../ProfilePageComponent/FriendSuggestion'
import PublicPostCard from '../ProfilePageComponent/PublicPostCard'
import RightSide from './RightSide'


function UserFeed({ PostWhichUserSelectedImageORVideo, socket, threeDot, AllUser, FilterUser }) {
    const params = useParams()

    return (
        <>
            <div className="_wrapper mt-[4rem]   ">


                <div className="profile_card-container    md:mr-[22rem] md:w-[81rem] md:ml-[0rem] ">
                    <div className="add_post_card  ">

                        {
                            Object.keys(params).length === 0 ? <AddPost socket={socket} /> : <></>
                        }

                    </div>

                    <div className="friends_groups  text-center  flex justify-center mb-[2rem] relative -z-[0] ">
                        {
                            Object.keys(params).length === 0 ? <div className="container1  ml-[2rem] md:ml-[20rem] md:mr-[6rem] mr-[2.6rem] mds-editor8:ml-0 mds-editor8:mr-[-21px] mb-[1rem]">
                                <div className="swiper_container w-full h-full">
                                    <FriendSuggestion AllUser={AllUser} FilterUser={FilterUser} />

                                </div>

                            </div> : <></>
                        }

                    </div>

                    {/*========================== PUBLIC POST============== */}
                    <div className="public_post_card  -mt-[2rem]">

                        <PublicPostCard data={PostWhichUserSelectedImageORVideo} socket={socket} threeDot={threeDot} />
                    </div>

                </div>
                <RightSide />
            </div>


        </>
    )
}

export default UserFeed