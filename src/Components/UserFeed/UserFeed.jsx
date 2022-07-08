import React, { useEffect, useState, useRef } from 'react'
import AddPost from '../ProfilePageComponent/AddPost'
import FriendSuggestion from '../ProfilePageComponent/FriendSuggestion'
import PublicPostCard from '../ProfilePageComponent/PublicPostCard'
import RightSide from './RightSide'
import { useDispatch, useSelector } from "react-redux"
import { HiArrowLeft } from "react-icons/hi"
import { NavLink, useParams, useRouteMatch } from "react-router-dom"
import ReactUserList from './ReactUserList'
import { BiWindowOpen } from 'react-icons/bi'


function UserFeed({ PostWhichUserSelectedImageORVideo, socket, threeDot, AllUser, FilterUser, setShowLikeUserModal, showLikeUserModal, theme }) {
    const params = useParams()
    const [Users, setAllUser] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const scroll = useRef(null)

    
    const [length, setLength] = useState(null)
    let initialPage = 0;
    const [increament, setIncreament] = useState(2)
    
    
    
    const _id = localStorage.getItem("uuid")
    const dispatch = useDispatch()

    const isMount = true
    const { path } = useRouteMatch()
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    useEffect(() => {
        socket?.off("get_posts")?.on("get_posts", (data) => {
            console.log(data)
            // setAllPosts((prev) => {
            //     return [...prev, data].sort((a, b) => {
            //         return b.time - a.time
            //     })
            // })
            setAllPosts(prev => [data, ...prev])
        })
    }, [socket])
    useEffect(() => {
        window.scrollTo(0, 0)
        document.getElementById("root").scrollTo(0, 0)
    }, [AddPost])
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
    }, [AllUser, UserInformationLoad?.friend])
    //==============================================public post card side effect===============================

    //LOAD ALL THE posts for users
    useEffect(() => {
        console.log("useEffect 1 for load the post")
        async function loadPosts() {
            try {
                const loadPostResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/post/${initialPage}/${increament}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const loadPostData = await loadPostResponse.json()
                console.log({ loadPostData })

                if (loadPostResponse.status === 200) {
                    
                    const Arrange = loadPostData.data.sort((a, b) => {
                        return b.time - a.time
                    })
                    setAllPosts(Arrange)
                    initialPage = initialPage + 2
                }
            } catch (err) {
            }
        }
        loadPosts()
    }, [increament])
    useEffect(() => {
        async function totalComment() {
            console.log("useEffect 2nd for load the comments")
            try {
                const totalCommentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/all/comment/user/${_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const totalCommentData = await totalCommentResponse.json()
                if (totalCommentResponse.status === 200) {
                    dispatch({ type: "SET_TOTAL_COMMENT", payload: totalCommentData.data })
                    dispatch({ type: "Get_All_Comments", payload: totalCommentData.data })
                }
            } catch (error) {
                // console.warn(error)
            }
        }
        totalComment()
    }, [])
    //load the all notification 
    useEffect(() => {
        console.log("useEffect 3rd for load all the notification")
        async function loadNotification() {
            try {
                const loadNotificationResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/notification/${_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const loadNotificationData = await loadNotificationResponse.json()
                if (loadNotificationResponse.status === 200) {
                    dispatch({ type: "Send_Notification", payload: loadNotificationData.data })
                }
            } catch (err) {
                // console.warn(err)
            }
        }
        loadNotification()
    }, [])
    //===================LOAD THE USER INFORMATION FROM THE SERVER============
    useEffect(() => {
        console.log("useEffect 4 load the userinfor mation")
        async function userInfoLoad() {
            try {
                const userInfo = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/083525p7ljhwmxifts31/l66cbrsuytmj1wujuauz/nqoye5ozdqj89b4s4qoq/ua1iztaxjo4bbmzvd391/3mzqeygnoszlknp90h51/t28uf00khscofxgjwj20/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const res = await userInfo.json()
                if (userInfo.status === 200) {
                    dispatch({ type: "USERINFO_LOAD", payload: res.message })
                    dispatch({ type: "BOOK_MARK_POST", payload: res.message.bookMarkPost })
                    // const blobRes = await fetch(res.message.url)
                    // const blobData = await blobRes.blob()
                    // const url = URL.createObjectURL(blobData)
                    // dispatch({ type: "LOADER", payload: false })
                    // dispatch({ type: "uploadImageDataFromServer", payload: url })
                    // // dispatch({ type: "ShowImage", payload: data.url })
                    // dispatch({ type: "OriginalProfileURL", payload: url })
                    // dispatch({ type: "ShowImage", payload: url })
                    // dispatch({ type: "LOADER", payload: false })
                }
                else if (userInfo.status !== 200) {
                    // dispatch({ type: "LOADER", payload: false })
                }
            } catch (err) {
                // console.warn(err)
            }
        }
        userInfoLoad()
    }, [])
    //=====================LOAD THE BACKGROUND IMAGE from the cloudinaryS=============
    useEffect(() => {
        console.log("useEffect 5th load bg image")
        async function BackgroundImage() {
            try {
                dispatch({ type: "LOADER", payload: true })
                const res1 = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/bg/image/mwQgga2z5KfChXjuF1s0/r6dg0LqqWmCG4W5UQOTa/ftFhzft7YNwT6jb9EVoX/ogvnbpOcPnjgMatu3mtb/JSC2PQZQVlK19QXDbSl1/`, {
                    method: "GET",
                    credentials: 'same-origin',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const data1 = await res1.json()
                if (res1.status === 200) {
                    let backgroundURL;
                    if (data1.url) {
                        const convertURL = await fetch(data1.url)
                        const blob = await convertURL.blob()
                        backgroundURL = URL.createObjectURL(blob)
                    }
                    else {
                        backgroundURL = ""
                    }
                    dispatch({ type: "LOADER", payload: false })
                    dispatch({ type: "uploadImageDataFromServerBackground", payload: data1 })
                    dispatch({ type: "ShowImageBackground", payload: backgroundURL })
                    dispatch({ type: "LOADER", payload: false })
                }
                else if (res1.status !== 404) {
                    return
                }
            } catch (err) {
                // console.warn(err)
            }
        }
        BackgroundImage()
    }, [])
    //====================LOAD PROFILE IMAGES fromc cloudinary=============
    useEffect(() => {
        console.log("now useEffect 6 load the profile image")
        console.log("profile Image execute with dispatch")
        async function ProfileImages() {
            let url;
            try {
                dispatch({ type: "LOADER", payload: true })
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/profile/image/e9thhvkKqJpnTlYo1sQl/QVbghZqhoSr2Rt5qvNYJ/iKj3RoJojFWmcDo4wTlm/9Olk5vTenhdkjHrdYEWl/`, {
                    method: "GET",
                    credentials: 'same-origin',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const data = await res.json()
                console.log("data", { data })
                if (res.status === 200) {
                    if (data.url !== false) {
                        const blobRes = await fetch(data.url)
                        const blobData = await blobRes.blob()
                        url = URL.createObjectURL(blobData)
                        dispatch({ type: "OriginalProfileURL", payload: data.url })
                    }
                    else {
                        url = ""
                        dispatch({ type: "OriginalProfileURL", payload: "" })
                    }
                    dispatch({ type: "LOADER", payload: false })
                    dispatch({ type: "uploadImageDataFromServer", payload: data })
                    dispatch({ type: "ShowImage", payload: url })
                    dispatch({ type: "LOADER", payload: false })
                }
                else {
                    dispatch({ type: "LOADER", payload: false })
                }
            } catch (err) {
                // console.warn(err)
            }
        }
        ProfileImages()
    }, [])
    useEffect(() => {
        console.log("load the post length useEffect 7")
        async function getAllPostDataLength() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/postlength`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const response = await res.json()
                if (res.status === 200) {
                    setLength(response.l)
                }
                else if (res.status !== 200) {
                    setLength(0)
                }
            }
            catch (err) {
                // console.log(err)
            }
        }
        getAllPostDataLength()
    }, [])

    //get all unread messages for the current user
    useEffect(() => {
        const getUnreadMessages = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/load/all/unread/message/${_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const data = await res.json()
                if (res.status === 200) {
                    dispatch({ type: "SET_UNREAD_MESSAGES", payload: data.empty })
                }
                else if (res.status !== 200) {
                    dispatch({ type: "SET_UNREAD_MESSAGES", payload: [] })
                }
            }
            catch (err) {
            }
        }
        getUnreadMessages()
    }, [])

    //get online users
    useEffect(() => {
        socket?.on("onlineUsers", (data) => {
            console.log("online users", data)
            dispatch({ type: "onlineUsers", payload: data })
        })
    }, [socket])


    console.log(increament)

    return (
        <>
            <div className={`_wrapper mt-[0rem] ${theme ? "bg-[#060606] drop-shadow-lg" : "bg-[#e4e4e4]"}`}>
                <div className={`profile_card-container flex`} id="feed">
                    <div className="wrapper_container w-full  lg:flex lg:justify-center  " ref={scroll}>
                        <div className="inne flex items-center flex-col  py-0  md:ml-[17rem] lg:ml-[0] mt-[3.8rem]  md:w-[52rem] w-full  ">
                            <div className="top_section  p-4 w-full mds-editor28:p-0 mds-editor28:my-[15px]">
                                {
                                    UserInformationLoad !== null ?
                                        Object.keys(params).length === 0 ? <AddPost socket={socket} setAllPosts={setAllPosts} theme={theme} /> : <></> : ""
                                }

                            </div>
                            <div className="center_section  p-2 pr-4  w-full overflow-hidden mds-editor28:p-0 mb-2">
                                {
                                    Object.keys(params).length === 0 ?
                                        <FriendSuggestion AllUser={Users} FilterUser={FilterUser} theme={theme} />
                                        : <></>
                                }
                            </div>
                            <div className="bottom_section  p-4 mds-editor28:p-[0px] ">

                                {
                                    UserInformationLoad !== null ?

                                        <PublicPostCard profilePost={PostWhichUserSelectedImageORVideo} socket={socket} threeDot={threeDot} setShowLikeUserModal={setShowLikeUserModal} setAllPosts={setAllPosts} allPosts={allPosts} theme={theme}
                                        setIncreament={setIncreament} increament={increament}
                                         length={length}  
                                        />
                                        :
                                        <KindlyCreateProfile theme={theme}   />
                                }
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


            {
                showLikeUserModal?.bool &&
                <div className="friends_like_modal  fixed  w-screen h-screen  z-[20] top-0 right-0 flex justify-center md:items-center ">
                    <div className={`inner_friends_wrapper md:fixed ${theme ? "bg-[#070707] border border-solid border-[#2e2e2e]" : "bg-[#fff]"} md:w-[69%] w-full  flex flex-col px-4 top-[2%] rounded-md drop-shadow-md`}>

                        <>
                            <header className={`flex items-center w-full  py-1 ${theme ? "bg-[#000000]" : "bg-[#ffffff]"}`}>
                                <div className="left_arrow flex flex-[1] justify-center cursor-pointer"
                                    onClick={() => {
                                        setShowLikeUserModal({ bool: false, reactUser: [] })
                                    }}
                                >
                                    <p className='flex'>
                                        <HiArrowLeft className={`text-[1.8rem] font-serif ${theme ? "text-[#fff]" : "text-[#000]"}`} />
                                    </p>
                                </div>
                                <div className="logo_name flex flex-[11] justify-center select-none">
                                    <p className={`text-[1.6rem] tracking-wider font-sans font-medium ${theme ? "text-[#f8f8f8]" : "text-[#040404]"}`}>

                                        CollegeZone

                                    </p>
                                </div>
                            </header>
                            <section className={`like_all_love flex justify-start py-1 border border-t ${theme ? "border-t-[#282828] border-b-[#282828]" : "border-t-[#8e8e8e] border-b-[#8e8e8e]"} border-l-0 border-r-0 border-solid w-full`}>
                                <div className="like_w flex items-center flex-[4]  justify-evenly  mds-editor28:flex-[12]">
                                    <NavLink to={path}
                                        activeStyle={{ borderBottom: "2px solid red" }}
                                    >
                                        <p className={`all cursor-pointer text-[1.2rem] tracking-wider py-1 ${theme ? "text-[#fff]" : "text-[#000]"}`}>
                                            All
                                            <span className={`ml-[5px] ${theme ? "text-[#ffff]" : "text-[#0a0a0a]"}`}>99+</span>
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
                                <div className="w flex-[8] mds-editor28:flex-0 ">

                                </div>

                            </section>
                            <footer className="all_react_users px-8 mds-editor28:px-3 py-1 w-full h-screen overflow-y-auto" id="user_react_list">
                                {
                                    showLikeUserModal.reactUser.length > 0 && showLikeUserModal.reactUser.map((item, index) => {
                                        return (
                                            <>
                                                <ReactUserList key={index} reactUser={item} theme=
                                                    {theme} />


                                            </>
                                        )
                                    })
                                }





                            </footer>

                        </>
                    </div>

                </div>
            }



        </>
    )
}

export default UserFeed = React.memo(UserFeed);






function RightSideComponents({ item }) {
    return (
        <>
            <div className="conat w-[25rem] bg-green-800 text-white  pr-[3.2rem] mb-[10rem]">
                <h1>{item}</h1>


                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam in necessitatibus eligendi nisi officiis quo odio tempore cupiditate nemo. Laboriosam esse molestiae voluptates dolorem voluptas id quis perspiciatis dignissimos eligendi excepturi. Minus itaque debitis enim exercitationem dolore nulla sit in harum quis distinctio porro soluta laborum adipisci laboriosam similique, corrupti autem tempora eaque facere consequatur neque! Porro modi quisquam ipsum, error, libero eius at, dolore qui perspiciatis voluptatibus ad tempora? Rerum impedit fugiat ex fuga optio. Ab laborum laboriosam officiis corrupti voluptatem ut necessitatibus eaque expedita porro delectus. Laborum architecto libero fugiat officiis! Neque at deserunt saepe cumque reiciendis itaque, et impedit esse dicta tempore vitae distinctio vel nostrum. Quia odit expedita recusandae iure voluptates sint eligendi exercitationem quas minus laborum unde sequi, possimus asperiores earum rem officia ducimus soluta at nulla nemo modi deleniti aspernatur maxime aliquid. Quasi ut vel, explicabo cum culpa eos! Est, fuga asperiores rerum itaque ex aspernatur repellendus quidem quis, repudiandae eaque laboriosam. Ullam fuga vero voluptates sequi rerum, voluptatum repellat vel nihil quo deleniti quos iste quis eaque, molestiae, qui dignissimos in magni magnam natus optio amet laborum. Tempora aliquam laboriosam architecto repellat perferendis officia debitis est harum dolorem ratione quibusdam, facilis quisquam excepturi?
            </div>


        </>

    )

}


function KindlyCreateProfile({ theme }) {
    return (
        <>
            <div className="por   flex flex-col justify-center items-center">
                <h1 className={`text-[1.5rem] font-semibold tracking-wider px-4 ${theme ? "text-[#fff]" : "text-[#000]"}`}>Create, profile to see other posts, like posts, comment and more</h1>
                <NavLink to={"/update_profile"} referrerPolicy="same-origin">
                    <p className='text-[1.8rem] font-serif tracking-wider text-[#1a57dc] ml-4 hover:underline transition-all'>
                        go to link

                    </p>
                </NavLink>
            </div>
        </>
    )
}