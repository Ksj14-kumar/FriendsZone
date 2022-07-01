import React, { useEffect, useState } from 'react'
import PostCard from '../Components/ProfilePageComponent/PostCard'
import query from "query-string"
import Apis from "../AlLFetchApi/__functionApi"
import CardBody from '@material-tailwind/react/CardBody'
import Card from '@material-tailwind/react/Card'
import { ThreeCircles } from "react-loader-spinner"
import { HiArrowLeft } from "react-icons/hi"
import { NavLink, useRouteMatch } from "react-router-dom"
import RightSide from '../Components/UserFeed/RightSide'
import ReactUserList from "../Components/UserFeed/ReactUserList"

function UserSinglePost({ socket, setShowLikeUserModal, showLikeUserModal }) {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    const { path } = useRouteMatch()
    const params = query.parse(window.location.search)
    const name = params.auther
    console.log({ path })


    useEffect(() => {
        async function getPostDetails() {
            try {

                setLoading(true)
                const res = await Apis.CopyPostLinkApi({ auther: params.auther, post: params.post })
                // const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/_user/single/post/${params.post}/`, {
                //     method: "POST",
                //     body: JSON.stringify(params),

                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${localStorage.getItem('uuid')}`
                //     }
                // })
                if (res.status === 200) {
                    const data = await res.json()
                    setPost(data.data)
                    setLoading(false)
                }
                else if (res.status !== 200) {
                    setLoading(false)
                    console.log("something error occured")
                }
            }
            catch (err) {
                console.warn(err)
            }
        }
        params.auther && params.post && getPostDetails()
    }, [params.auther, params.post])


    return (
        <>

            <div className="single_post_container w-full  flex justify-center mt-[5rem] mds-editor28:absolute mds-editor28:-top-[70px] mds-editor28:z-[20]">
                {
                    !loading ? (post.length > 0 && post.map((item, index) => {
                        return (
                            <>
                                <PostCard key={index} item={item} index={index} socket={socket} setShowLikeUserModal={setShowLikeUserModal} single="single" name={name} />

                            </>
                        )
                    })) : (

                        <Card>
                            <CardBody>
                                <div className="loader flex justify-center items-center w-full h-full">
                                    <ThreeCircles color='#646FD4' width={80} height={80} />
                                </div>
                            </CardBody>
                        </Card>
                    )
                }
            </div>

            {showLikeUserModal.bool &&
                <div className="friends_like_modal absolute w-screen h-screen  z-[20] top-0 right-0 flex justify-center md:items-center">
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

            <RightSide />

        </>

    )
}

export default UserSinglePost