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
            <div className="_wrapper mt-[0rem]   ">

                {/* md:mr-[22rem] md:w-[81rem] md:ml-[0rem] */}
                <div className="profile_card-container flex ">
                    
                    <div className="wrapper_container w-full  lg:flex lg:justify-center">

                        <div className="inne flex items-center flex-col  py-0  md:ml-[17rem] lg:ml-[0] mt-[3.8rem]  md:w-[52rem] w-full">


                            <div className="top_section  p-4 w-full mds-editor28:p-0 mds-editor28:my-[15px]">

                                {Object.keys(params).length === 0 ? <AddPost socket={socket} /> : <></>}
                            </div>
                            <div className="center_section  p-2 pr-4  w-full overflow-hidden mds-editor28:p-0 mb-2">

                                {
                                    Object.keys(params).length === 0 ?
                                        <FriendSuggestion AllUser={AllUser} FilterUser={FilterUser} />

                                        : <></>
                                }


                            </div>
                            <div className="bottom_section  p-4 mds-editor28:p-[0px]">
                                <PublicPostCard data={PostWhichUserSelectedImageORVideo} socket={socket} threeDot={threeDot} />


                            </div>
                        </div>
                    </div>




                    {/* ADD SOME EXTRA RIGHT SIDE sCOMPONENT */}

                    {
                        Object.keys(params).length === 0 &&
                        <>
                            {/* <RightSideComponents />
                            <RightSideComponents /> */}
                        </>
                    }
                </div>

                <RightSide />
            </div>


        </>
    )
}

export default UserFeed;




function RightSideComponents() {
    return (
        <>
            <div className="conat w-[25rem] bg-green-800 text-white  pr-[3.2rem]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam in necessitatibus eligendi nisi officiis quo odio tempore cupiditate nemo. Laboriosam esse molestiae voluptates dolorem voluptas id quis perspiciatis dignissimos eligendi excepturi. Minus itaque debitis enim exercitationem dolore nulla sit in harum quis distinctio porro soluta laborum adipisci laboriosam similique, corrupti autem tempora eaque facere consequatur neque! Porro modi quisquam ipsum, error, libero eius at, dolore qui perspiciatis voluptatibus ad tempora? Rerum impedit fugiat ex fuga optio. Ab laborum laboriosam officiis corrupti voluptatem ut necessitatibus eaque expedita porro delectus. Laborum architecto libero fugiat officiis! Neque at deserunt saepe cumque reiciendis itaque, et impedit esse dicta tempore vitae distinctio vel nostrum. Quia odit expedita recusandae iure voluptates sint eligendi exercitationem quas minus laborum unde sequi, possimus asperiores earum rem officia ducimus soluta at nulla nemo modi deleniti aspernatur maxime aliquid. Quasi ut vel, explicabo cum culpa eos! Est, fuga asperiores rerum itaque ex aspernatur repellendus quidem quis, repudiandae eaque laboriosam. Ullam fuga vero voluptates sequi rerum, voluptatum repellat vel nihil quo deleniti quos iste quis eaque, molestiae, qui dignissimos in magni magnam natus optio amet laborum. Tempora aliquam laboriosam architecto repellat perferendis officia debitis est harum dolorem ratione quibusdam, facilis quisquam excepturi?
            </div>


        </>

    )

}