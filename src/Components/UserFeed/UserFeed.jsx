import React, { useEffect, useState } from 'react'
import AddPost from '../ProfilePageComponent/AddPost'
import FriendSuggestion from '../ProfilePageComponent/FriendSuggestion'
import PublicPostCard from '../ProfilePageComponent/PublicPostCard'
import RightSide from './RightSide'
import { useSelector } from "react-redux"
import { HiArrowLeft } from "react-icons/hi"
import { NavLink, useParams, useRouteMatch } from "react-router-dom"
import ReactUserList from './ReactUserList'



function UserFeed({ PostWhichUserSelectedImageORVideo, socket, threeDot, AllUser, FilterUser, setShowLikeUserModal, showLikeUserModal }) {
    const params = useParams()
    const [Users, setAllUser] = useState([])
    // const [showLikeUserModal, setShowLikeUserModal] = useState({ bool: false, reactUser: [] })
    const { path } = useRouteMatch()
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })



    useEffect(() => {
        async function areFriends() {
            try {
                const WithoutFriends = AllUser !== undefined && AllUser.filter((item) => {
                    return !UserInformationLoad?.friends.some(value => {
                        return value._id === item.googleId
                    })
                })
                setAllUser(WithoutFriends)
            }
            catch (err) {
                console.warn(err)
            }
        }
        areFriends()
    }, [AllUser,UserInformationLoad?.friend])

    return (
        <>
            <div className="_wrapper mt-[0rem]   ">
                <div className="profile_card-container flex ">
                    <div className="wrapper_container w-full  lg:flex lg:justify-center">
                        <div className="inne flex items-center flex-col  py-0  md:ml-[17rem] lg:ml-[0] mt-[3.8rem]  md:w-[52rem] w-full">
                            <div className="top_section  p-4 w-full mds-editor28:p-0 mds-editor28:my-[15px]">
                                {Object.keys(params).length === 0 ? <AddPost socket={socket} /> : <></>}
                            </div>
                            <div className="center_section  p-2 pr-4  w-full overflow-hidden mds-editor28:p-0 mb-2">
                                {
                                    Object.keys(params).length === 0 ?
                                        <FriendSuggestion AllUser={Users} FilterUser={FilterUser} />
                                        : <></>
                                }
                            </div>
                            <div className="bottom_section  p-4 mds-editor28:p-[0px]">
                                <PublicPostCard profilePost={PostWhichUserSelectedImageORVideo} socket={socket} threeDot={threeDot} setShowLikeUserModal={setShowLikeUserModal} />
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
            {/* -mt-[50.3rem] */}


            {showLikeUserModal?.bool &&
                <div className="friends_like_modal  fixed  w-screen h-screen  z-[20] top-0 right-0 flex justify-center md:items-center ">
                    <div className="inner_friends_wrapper md:fixed bg-[#fff] md:w-[69%] w-full  flex flex-col px-4 top-[2%] rounded-md drop-shadow-md">

                        <>
                            <header className="flex items-center w-full bg-[#ffffff] py-1">
                                <div className="left_arrow flex flex-[1] justify-center cursor-pointer"
                                    onClick={() => {
                                        setShowLikeUserModal({ bool: false, reactUser: [] })
                                    }}
                                >
                                    <p className='flex'>
                                        <HiArrowLeft className='text-[1.8rem] font-serif' />
                                    </p>
                                </div>
                                <div className="logo_name flex flex-[11] justify-center select-none">
                                    <p className='text-[1.6rem] tracking-wider font-sans font-medium'>

                                        CollegeZone

                                    </p>
                                </div>
                            </header>
                            <section className="like_all_love flex justify-start py-1 border border-t border-l-0 border-r-0 border-solid w-full">
                                <div className="like_w flex items-center flex-[4]  justify-evenly  mds-editor28:flex-[12]">
                                    <NavLink to={path}
                                        activeStyle={{ borderBottom: "2px solid red" }}
                                    >
                                        <p className="all cursor-pointer text-[1.2rem] tracking-wider py-1">
                                            All
                                            <span className='ml-[5px]'>99+</span>
                                        </p>
                                    </NavLink>
                                    {/* <NavLink to={path + "liked"}
                                        activeStyle={{ borderBottom: "2px solid red" }}>
                                        <p className="like flex items-center cursor-pointer  py-1">
                                            <HiThumbUp className='text-[1.6rem] text-[#3041e1]' />
                                            <span className='ml-[5px]  text-[1.2rem]'>5+</span>
                                        </p>
                                    </NavLink> */}

                                    {/* <NavLink to={path + "loved"}
                                        activeStyle={{ borderBottom: "2px solid red" }}>
                                        <p className="love flex items-center cursor-pointer py-1">
                                            <HiHeart className='text-[1.8rem] text-[#f21814]' />
                                            <span className='ml-[5px] text-[1.2rem] '>+6</span>
                                        </p>
                                    </NavLink> */}
                                </div>
                                <div className="w flex-[8] mds-editor28:flex-0">

                                </div>

                            </section>
                            <footer className="all_react_users px-8 mds-editor28:px-3 py-1 w-full h-screen overflow-y-auto" id="user_react_list">
                                {
                                    showLikeUserModal.reactUser.length > 0 && showLikeUserModal.reactUser.map((item, index) => {
                                        return (
                                            <>
                                                <ReactUserList key={index} reactUser={item} />


                                            </>
                                        )
                                    })
                                }





                            </footer>

                        </>
                    </div>

                </div>}



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