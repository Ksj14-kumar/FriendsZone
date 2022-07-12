import React, { useEffect, useState, useRef } from 'react'
import AddPost from '../ProfilePageComponent/AddPost'
import FriendSuggestion from '../ProfilePageComponent/FriendSuggestion'
import PublicPostCard from '../ProfilePageComponent/PublicPostCard'
import RightSide from './RightSide'
import { useDispatch, useSelector } from "react-redux"
import { HiArrowLeft } from "react-icons/hi"
import { NavLink, useParams, useRouteMatch } from "react-router-dom"
import ReactUserList from './ReactUserList'
import InternetDetection from '../InternetDetection'
import { Plane } from "react-loader-spinner"





function UserFeed({ PostWhichUserSelectedImageORVideo, socket, threeDot, AllUser, FilterUser, setShowLikeUserModal, showLikeUserModal, theme }) {
    const params = useParams()
    const [Users, setAllUser] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const scroll = useRef(null)
    const [length, setLength] = useState(null)
    let initialPage = 0;
    const [increament, setIncreament] = useState(2)

    const [infoLoader, setInfoLoader] = useState(false)
    const [CommentsLoader, setCommentLoader] = useState(false)
    const [notificationLoader, setNotificationLoader] = useState(false)
    const [postLoader, setPostLoader] = useState(false)
    const [backgroundLoader, setBAckgroundLoader] = useState(false)
    const [profileLoader, setProfileLoader] = useState(false)
    const _id = localStorage.getItem("uuid")
    const dispatch = useDispatch()
    const loadingPostIsMount = useRef(true)
    const TotalCommentIsMount = useRef(true)
    const loadNotificationIsMount = useRef(true)
    const userInfoLoadisMount = useRef(true)
    const backgroundImageIsMount = useRef(true)
    const profileImageisMount = useRef(true)
    const postLengthisMount = useRef(true)
    const UnReadMessageIsMount = useRef(true)
    const { path } = useRouteMatch()
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    useEffect(() => {
        socket?.off("get_posts")?.on("get_posts", (data) => {
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
        async function loadPosts() {
            try {
                setPostLoader(true)
                const loadPostResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/post/${initialPage}/${increament}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const loadPostData = await loadPostResponse.json()
                if (loadPostResponse.status === 200) {

                    const Arrange = loadPostData.data.sort((a, b) => {
                        return b.time - a.time
                    })
                    // if (loadingPostIsMount.current) {
                    // setAllPosts((pre) => [...pre, ...Arrange])
                    setAllPosts(Arrange)
                    setPostLoader(false)
                    //set all posts into session storage
                    if (initialPage === 0) {
                        sessionStorage.setItem("_users_posts", JSON.stringify(Arrange))
                    }
                    else if (initialPage > 0) {
                        sessionStorage.removeItem("_users_posts")
                        sessionStorage.setItem("_users_posts", JSON.stringify(allPosts))
                    }
                    // }
                    initialPage = initialPage + 2
                }
            } catch (err) {
            }
        }
        loadPosts()
        return () => {
            loadingPostIsMount.current = false
        }
    }, [increament])
    useEffect(() => {
        async function totalComment() {
            try {
                setCommentLoader(true)
                const totalCommentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/all/comment/user/${_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const totalCommentData = await totalCommentResponse.json()
                if (totalCommentResponse.status === 200) {
                    setCommentLoader(false)
                    if (TotalCommentIsMount.current) {
                        dispatch({ type: "SET_TOTAL_COMMENT", payload: totalCommentData.data })
                        dispatch({ type: "Get_All_Comments", payload: totalCommentData.data })
                    }
                }
            } catch (error) {
            }
        }
        totalComment()
        return () => {
            TotalCommentIsMount.current = false
        }
    }, [])
    //load the all notification 
    useEffect(() => {
        async function loadNotification() {
            try {
                setNotificationLoader(true)
                const loadNotificationResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/notification/${_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const loadNotificationData = await loadNotificationResponse.json()
                if (loadNotificationResponse.status === 200) {
                    if (loadNotificationIsMount.current) {
                        setNotificationLoader(false)

                        dispatch({ type: "Send_Notification", payload: loadNotificationData.data })
                    }
                }
            } catch (err) {
            }
        }
        loadNotification()
        return () => {
            loadNotificationIsMount.current = false
        }
    }, [])
    //===================LOAD THE USER INFORMATION FROM THE SERVER============
    useEffect(() => {
        async function userInfoLoad() {
            try {
                setInfoLoader(true)
                const userInfo = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/083525p7ljhwmxifts31/l66cbrsuytmj1wujuauz/nqoye5ozdqj89b4s4qoq/ua1iztaxjo4bbmzvd391/3mzqeygnoszlknp90h51/t28uf00khscofxgjwj20/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const res = await userInfo.json()
                if (userInfo.status === 200) {
                    if (userInfoLoadisMount.current) {
                        setInfoLoader(false)
                        dispatch({ type: "Theme", payload: res.message.theme })
                        dispatch({ type: "USERINFO_LOAD", payload: res.message })
                        dispatch({ type: "BOOK_MARK_POST", payload: res.message.bookMarkPost })
                    }
                }
                else if (userInfo.status !== 200) {
                }
            } catch (err) {
            }
        }
        userInfoLoad()
        return () => {
            userInfoLoadisMount.current = false
        }
    }, [])
    //=====================LOAD THE BACKGROUND IMAGE from the cloudinaryS=============
    useEffect(() => {
        async function BackgroundImage() {
            try {
                setBAckgroundLoader(true)
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
                    if (backgroundImageIsMount.current) {
                        let backgroundURL;
                        if (data1.url) {
                            const convertURL = await fetch(data1.url)
                            const blob = await convertURL.blob()
                            backgroundURL = URL.createObjectURL(blob)
                        }
                        else {
                            backgroundURL = ""
                        }
                        setBAckgroundLoader(false)
                        dispatch({ type: "LOADER", payload: false })
                        dispatch({ type: "uploadImageDataFromServerBackground", payload: data1 })
                        dispatch({ type: "ShowImageBackground", payload: backgroundURL })
                        dispatch({ type: "LOADER", payload: false })
                    }
                }
                else if (res1.status !== 404) {
                    return
                }
            } catch (err) {
                // console.warn(err)
            }
        }
        BackgroundImage()
        return () => {
            backgroundImageIsMount.current = false
        }
    }, [])
    //====================LOAD PROFILE IMAGES fromc cloudinary=============
    useEffect(() => {
        async function ProfileImages() {
            let url;
            try {
                setProfileLoader(true)
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
                if (res.status === 200) {
                    if (profileImageisMount.current) {

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
                        setProfileLoader(false)
                        dispatch({ type: "LOADER", payload: false })
                        dispatch({ type: "uploadImageDataFromServer", payload: data })
                        dispatch({ type: "ShowImage", payload: url })
                        dispatch({ type: "LOADER", payload: false })
                    }
                }
                else {
                    dispatch({ type: "LOADER", payload: false })
                }
            } catch (err) {
            }
        }
        ProfileImages()
        return () => {
            profileImageisMount.current = false
        }
    }, [])
    useEffect(() => {
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
                if (postLengthisMount.current) {

                    if (res.status === 200) {
                        setLength(response.l)
                    }
                    else if (res.status !== 200) {
                        setLength(0)
                    }
                }
            }
            catch (err) {
            }
        }
        getAllPostDataLength()
        return () => {
            postLengthisMount.current = false
        }
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
                if (UnReadMessageIsMount.current) {

                    if (res.status === 200) {
                        dispatch({ type: "SET_UNREAD_MESSAGES", payload: data.empty })
                    }
                    else if (res.status !== 200) {
                        dispatch({ type: "SET_UNREAD_MESSAGES", payload: [] })
                    }
                }
            }
            catch (err) {
            }
        }
        getUnreadMessages()
        return () => {
            UnReadMessageIsMount.current = false
        }
    }, [])
    //get online users
    useEffect(() => {

        socket?.on("onlineUsers", (data) => {
            dispatch({ type: "onlineUsers", payload: data })
        })
    }, [socket])
    //set the all post into session storage
    return (
        <>
            {(infoLoader && CommentsLoader && profileLoader && backgroundLoader && postLoader && notificationLoader) ? <CoverPage /> : ""}
            <InternetDetection />
            <div className={`_wrapper mt-[0rem] min-h-screen  ${theme ? "bg-[#060606] drop-shadow-lg" : "bg-[#e4e4e4]"}`}>
                <div className={`profile_card-container flex min-h-screen`} id="feed">
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
                                        <KindlyCreateProfile theme={theme} />
                                }
                            </div>
                        </div>
                    </div>
                    {/* ADD SOME EXTRA RIGHT SIDE sCOMPONENT */}
                    {
                        Object.keys(params).length === 0 &&
                        <>
                        </>
                    }
                </div>
                <RightSide />
            </div>

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


function CoverPage() {
    return (
        <>
            <div className="cover_Page fixed w-screen h-[calc(100vh-0rem)] z-[18] flex justify-center items-center  
             bg-blue-100  bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-30 border border-gray-100
            ">
                <div className="cover_Wrapper flex w-full justify-center items-center">
                    <Plane ariaLabel="loading-indicator" />
                </div>
            </div>

        </>
    )
}