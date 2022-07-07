import React, { useEffect, useRef, useState } from 'react'
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import Button from "@material-tailwind/react/Button";
import Image from "@material-tailwind/react/Image";
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
// import emoji from '../../assets/emoji/animated-emoticons-2018-5.gif';
// import emoji2 from '../../assets/emoji/animated-emoticons-2018-25.gif';
// import emoji3 from '../../assets/emoji/animated-emoticons-2018-21.gif';
// import emoji4 from '../../assets/emoji/animated-emoticons-2018-41.gif';
// import emoji5 from '../../assets/emoji/animated-emoticons-2018-8.gif';
import { IoEarth } from 'react-icons/io5';
import { MdAddComment, MdDelete, MdLock, MdOutlineThumbUpAlt, MdVisibilityOff, MdVisibility, MdThumbUpAlt, MdBookmark, MdOutlineLink, MdCheck } from 'react-icons/md';
import { RiShareFill, RiThumbUpFill } from 'react-icons/ri';
import { FiChevronRight } from 'react-icons/fi';
import { FaUserAlt, FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import { BsThreeDotsVertical } from 'react-icons/bs';
import Comments from './Comments/Comments';
import { format } from 'timeago.js';
import { motion, AnimatePresence, isMotionValue } from "framer-motion"
import ReadMore from './ReadMore';
import { HiUsers } from "react-icons/hi"
import { FiChevronDown } from "react-icons/fi"
import { error } from '../../toastifyMessage/Toast';
import { success } from '../../toastifyMessage/Toast';
import profile from '../../assets/img/download.png'
import { NavLink, useLocation } from "react-router-dom"
// import { createPopper } from "@popperjs/core"
import { ThreeDots } from "react-loader-spinner"
import { BsArrowLeft } from "react-icons/bs"
import BookMarkApi from "../../AlLFetchApi/__functionApi"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from "axios"






function PostCard({ item, index, filterPost, socket, threeDot, setShowLikeUserModal, single, name, setAllPosts,bookMark }) {
    const [commentToggle, setCommentToggle] = useState(false)
    const [commentsLength, setCommentLength] = useState({ length: 0, post_id: "" })
    const [shareLength, setShareLength] = useState(0)
    const [showPopOver, setShowPopOver] = useState(false)
    const [postBlobURL, setPostBlobUrl] = useState("")
    const [visibilityView, setVisibilityViewEvents] = useState(false)
    const [loadingPost, setLoadingPost] = useState(false)
    const [loadingPostSecond, setLoadingPostSecond] = useState(false)
    const dispatch = useDispatch()
    const buttonRef = useRef()
    const location = useLocation()
    const deletePost = useRef()
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(null)
    // const [userIds, setUserId] = useState([])
    const [bookMarkMove, setMoveBookMark] = useState(null)
    // const [coOrdinate, setCordinate] = useState({ x: "", y: "" })
    const [bookMarkColor, steBookMarkColor] = useState(false)
    const [blobURL, setBlobUrl] = useState("")
    const [loadProfileImage, setLoadProfileImage] = useState(false)
    const DeletedPost = useRef()
    const postPopupModal = useRef(null)
    const ImageRef = useRef(null)
    const isMount = useRef(true)
    const isLikeCountMount = useRef(true)
    const isMountCommentLength = useRef(true)
    // const ShowImage = useSelector((state) => {
    //     return state.ShowImage.value
    // })
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    const OriginalProfileURL = useSelector((state) => {
        return state.OriginalProfileURL
    })
    const getPos = useSelector((state) => {
        // console.log({ state })
        return state.getPos
    })
    const { _id, fname, lname, googleId } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "", googleId: "" }
    function SetCommentSection(e, id) {
        if (id) {
            setCommentToggle(!commentToggle)
        }
    }
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^DELETE THE by specific id POST ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    async function DeletePostById(post_id, adminId) {
        try {
            setDeleteLoader(true)
            const DeletePostResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/delete/user/post/local/delete/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                },
                body: JSON.stringify({ post_id, userId: adminId })
            })
            const { message, data } = await DeletePostResponse.json()
            if (DeletePostResponse.status === 200) {
                // dispatch({ type: "LOAD_POSTS", payload: data })
                // const arrange = data.length > 0 && data.sort((a, b) => {
                //     return b.time - a.time
                // })
                setAllPosts(data)
                success({ message: message })
                setDeleteLoader(false)
            }
            else if (DeletePostResponse.status !== 200) {
                error({ message: message })
            }
        } catch (err) {
            console.warn(err)
        }
    }
    //================================================POST IS BOOKMARKED OR NOT====================
    useEffect(() => {
        // if (UserInformationLoad?.bookMarkPost) {
        const value = UserInformationLoad?.bookMarkPost?.length > 0 && UserInformationLoad.bookMarkPost.some((i) => {
            return i.post_id === item.post_id
        })
        if (value) {
            steBookMarkColor(value)
        }
        // }
    }, [item, UserInformationLoad])
    //realitime like system
    useEffect(() => {
        // if (isMount.current) {
        if (socket.connected) {
            socket.on("getLikeCount", (data) => {
                if (item.post_id === data.post_id) {
                    setLikeCount(data.likeCount)
                }
                // setLikeCount(data)
            })
        }
    }, [likeCount])
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Change the visibility^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    async function VisibilityChange(post_id, visibility) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/visibility/user/post/local/${post_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                },
                body: JSON.stringify({ visibility, uuid: localStorage.getItem("uuid") })
            })
            const data = await response.json()
            if (response.status === 200) {
                success({ message: "Visibility Changed Successfully" })
                // dispatch({ type: "LOAD_POSTS", payload: data.data })
                setAllPosts(data.data)
            } else if (response.status === 500) {
                error({ message: "Something went wrong" })
            }
        } catch (err) {
            console.warn(err)
        }
    }
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^>>>> SEND THE REACTION TO Specific I  ID<<<<<<<<<<^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    useEffect(() => {
        //load the like when user refresh the page and show user which post already liked
        setLike(item.liked.includes(googleId))
    }, [item.liked, _id, googleId])
    // ========================================================SET THE LIKE COUNT NUMBER ====================================
    useEffect(() => {
        setLikeCount(item.liked.length === 0 ? 0 : item.liked.length)
    }, [item.liked])
    //function which excute when current user liked it any post
    async function callLikeHnadler(userId, post_id, bgImageUrl, profileImage) {
        try {
            const result = await axios.put(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/like/${post_id}`, {
                likedBy: googleId,
                likeTo: userId,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            await axios({
                url: `${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/user/liked/post/${post_id}`,
                method: "PUT",
                data: JSON.stringify(
                    {
                        likedBy: googleId,
                        likeTo: userId,
                        liked: like,
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            if (socket.connected) {
                if (like) {
                    socket.emit("likePost", { post_id, likedBy: googleId, likeTo: userId, OriginalProfileURL })
                    socket?.emit("likeCount", { likeCount: likeCount - 1, post_id })
                }
                else {
                    socket?.emit("likeCount", { likeCount: likeCount + 1, post_id })
                }
            }
            else {
                like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
            }
        } catch (err) {
            like ? setLike(false) : setLike(true)
            like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
        }
    }
    // ===========================================ADDING THE BOOK MARK POST=================================
    async function addBookMarkPostFunction(item) {
        try {
            const data = await BookMarkApi.BookMarkApiForPost(`/blob/api/v1/bookmark/${_id}`, JSON.stringify({ ...item, bookMarkColor }))
            const res = await data.json()
            if (data.status === 200) {
                dispatch({ type: "BOOK_MARK_POST", payload: res.bookmark })
            }
            else if (data.status !== 200) {
            }
        }
        catch (err) {
            console.warn(err)
        }
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (postPopupModal.current && !postPopupModal.current.contains(event.target)) {
                setShowPopOver(false)
                setVisibilityViewEvents(false)
                setMoveBookMark(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [postPopupModal])
    useEffect(() => {
        if (item.image === "") {
            setLoadingPostSecond(false)
            setLoadingPost(false)
        }
    }, [item.image])
    useEffect(() => {
        document.getElementById("root").scrollTo(0, 0)
        if (location.path === "/") {
            window.scrollTo(0, 0)
        }
    }, [item])
    return (
        <>
            <div className={`post-card flex justify-around w-full mb-2 rounded-md ${bookMark?"w-[25rem] ":"md:w-[42rem]"}  drop-shadow-sm ${loadingPost && loadingPostSecond ? "mb-[3rem] w-screen md:w-full md:ml-[2rem] md:mr-[2rem] h-[30rem]" : ""}`}>
                <Card className={`post p-0   ${single === "single" && name ? " mds-editor28:rounded-t-none" : "rounded-xl"}     ${loadingPost && loadingPostSecond ? "bg-[#dedede]" : ""}`}>
                    <CardBody className={` ${loadingPost && loadingPostSecond ? " bg-[#dcdcdc]" : ""}`} >
                        <div className={`back_to_hone  flex mb-3 w-full items-center  ${single === "single" && name ? "flex mds-editor28:rounded-t-none" : "hidden"} ${loadingPost && loadingPostSecond ? "bg-[#]" : ""}`}>
                            <NavLink
                                to={"/"}
                            >
                                <p className='w-full  py-1 flex-[1] cursor-pointer'>
                                    <BsArrowLeft className='text-[2rem]' />
                                </p>
                            </NavLink>
                            <p className='flex justify-center flex-[11] tracking-wider text-[#2b2b2b] text-[1.5rem] select-none font-semibold'>
                                Collegezone
                            </p>
                        </div>
                        <hr className={`py-[2px] mb-2 ${single === "single" && name ? "flex" : "hidden"} `} />
                        <div className="flex justify-center relative">
                        </div>
                        <section className={`header-image-section post ${loadingPost && loadingPostSecond ? "flex w-full" : " md:rounded-lg  flex justify-between"} `} >
                            <NavLink to={`/profile/${item.userId}`}>
                                <main className={`flex  join-of-name-select-option post  ${loadingPost && loadingPostSecond ? " flex flex-[11] w-full bg-[#] animate-pulse" : ""} `}>
                                    <article className=' card-post-image-modal w-[3rem]  h-[3rem] rounded-full flex-shrink-0 po '>
                                        {
                                            item.profileImage ?
                                                (
                                                    <>
                                                        <LoadProfileImage url={item.profileImage} setLoadingPost={setLoadingPost} image={item.image} />
                                                    </>
                                                ) : <Image
                                                    src={profile}
                                                    rounded={true}
                                                    raised={false}
                                                    alt="Rounded Image"
                                                    className="w-full h-full"
                                                />
                                        }
                                    </article>
                                    <article className={`public-name-article ml-[.5rem]  post  w-full ${loadingPost && loadingPostSecond ? " mt-[3px]" : "-mt-[.4rem]"}`}>
                                        <article className={`text-black text-xl ${loadingPost && loadingPostSecond ? "bg-[#8f8f8f] h-[15px]  rounded-md" : ""}`}>
                                            {loadingPost && loadingPostSecond ? "" : (item.username ? item.username : "NA")}
                                        </article>
                                        <article className={`flex  ${loadingPost && loadingPostSecond ? "bg-[#8f8f8f] h-[15px] mt-2 mb-[3px] animate-pulse w-full rounded-md" : " "}`}>
                                            {loadingPost && loadingPostSecond ? "" : (format(item.createdAt))}
                                            {
                                                loadingPost && loadingPostSecond ? "" : (item.privacy === "public" ?
                                                    <IoEarth className='mt-[4px] ml-[.3rem]' /> :
                                                    item.privacy === "friends" ? <HiUsers className="mt-[4px] ml-[.3rem]" /> :
                                                        <MdLock className='mt-[4px] ml-[.3rem]' />)
                                            }
                                        </article>
                                    </article>
                                </main>
                            </NavLink>
                            {
                                (threeDot === true) ?
                                    (<>
                                        <section className=" flex justify-center align-middle" ref={deletePost}
                                        >
                                            {/* <button className=' focus:border-0 border-0 focus:outline-0 outline-none -mt-2 '>
                                                <BsThreeDotsVertical className='text-[1.5rem]' />
                                            </button> */}
                                            {loadingPost && loadingPostSecond ? "" : <button className=' focus:border-0 border-0 focus:outline-0 outline-none -mt-2 '
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowPopOver(true)
                                                }}
                                            >
                                                <BsThreeDotsVertical className='text-[1.5rem]' />
                                            </button>}
                                        </section>
                                        <AnimatePresence>
                                            {showPopOver && <motion.div ref={postPopupModal} className="popOverEffect bg-[#fff] absolute right-[4rem] top-[1.2rem] drop-shadow-lg w-[18rem]  px-1 py-4 border border-solid border-[#ececec] rounded-md z-[18]"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0, ease: "easeInOut", type: "tween" }}
                                                exit={{ opacity: 0, scale: 0 }}
                                            >
                                                <ul className="list-type-none gap-y-2">
                                                    {
                                                        item.userId === googleId ?
                                                            [
                                                                // { icon: <MdBookmark className="text-[1.8rem] text-[#999999]" />, name: "BookMark" },
                                                                { icon: <MdVisibility className="text-[1.8rem] text-[#999999]" />, name: "Visibility" },
                                                                { icon: <MdOutlineLink className="text-[1.8rem] text-[#999999]" />, name: "Copy link" },
                                                                { icon: <MdDelete className="text-[1.8rem] text-[#999999]" />, name: "Delete Post" }
                                                            ].map((i) => {
                                                                return (
                                                                    <>
                                                                        <CopyToClipboard text={i.name === "Copy link" && process.env.REACT_APP_API_FRONTEND + item.post_url}
                                                                            onCopy={(result) => {
                                                                                if (result) {
                                                                                    success({ message: "Link Copied Successfully", pos: "bottom-center" })
                                                                                }
                                                                            }}
                                                                        >
                                                                            <li className="post_related_api  py-2 cursor-pointer   rounded-md gap-x-1  pl-2  mb-1 hover:bg-[#cdcdcd92]"
                                                                                onClick={(e) => {
                                                                                    if (i.name === "Visibility") {
                                                                                        setVisibilityViewEvents(!visibilityView)
                                                                                    }
                                                                                    if (i.name === "Delete Post") {
                                                                                        DeletePostById(item.post_id, item.userId);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <div className={`wra flex items-center ${deleteLoader && "justify-center"}`}>
                                                                                    {i.name === "Delete Post" && deleteLoader ? <LoaderForPostOperation /> :
                                                                                        <>
                                                                                            <p className='text-[1.5rem] flex-1'>
                                                                                                {
                                                                                                    i.icon
                                                                                                }
                                                                                            </p>
                                                                                            <p className=" flex-[10] text-[#6a6a6a] font-sans tracking-wider text-[1.3rem] ml-1">
                                                                                                {i.name}
                                                                                            </p>
                                                                                        </>
                                                                                    }
                                                                                    {i.name === "Visibility" && <p className="flex-[1] text-[#6a6a6a] font-sans tracking-wider text-[1.3rem]">
                                                                                        {
                                                                                            !visibilityView ? (
                                                                                                <FiChevronRight className="text-[1.8rem] text-[#999999]" />
                                                                                            )
                                                                                                : (
                                                                                                    <FiChevronDown className="text-[1.8rem] text-[#999999]" />
                                                                                                )
                                                                                        }
                                                                                    </p>}
                                                                                </div>
                                                                            </li>
                                                                        </CopyToClipboard>
                                                                        {
                                                                            i.name === "Visibility" && visibilityView && <motion.ul className=" ml-8 mt-1">
                                                                                {
                                                                                    [
                                                                                        { icon: <FaUserAlt className="text-[1.3rem]" />, name: "private" },
                                                                                        {
                                                                                            icon: <HiUsers className="text-[1.3rem]" />,
                                                                                            name: "friends"
                                                                                        }, {
                                                                                            icon: <FaUsers className="text-[1.3rem]" />,
                                                                                            name: "public"
                                                                                        }
                                                                                    ].map((i) => {
                                                                                        return (
                                                                                            <>
                                                                                                <li className={`inner_list_items py-1 flex  pl-2 items-center hover:bg-[#9d9d9dc6] rounded-md mr-2 cursor-pointer ${item.privacy === i.name && "cursor-not-allowed"}`}
                                                                                                    onClick={(e) => {
                                                                                                        e.preventDefault()
                                                                                                        if (item.privacy === i.name) {
                                                                                                            return
                                                                                                        }
                                                                                                        else {
                                                                                                            VisibilityChange(item.post_id, i.name)
                                                                                                        }
                                                                                                    }}
                                                                                                >
                                                                                                    <div className="wrap flex flex-[11] items-center">
                                                                                                        <p className='flex-1'>
                                                                                                            {i.icon}
                                                                                                        </p>
                                                                                                        <p className="flex-[11] text-[1.4rem] text-[#6a6a6a] ml-2">{i.name}</p>
                                                                                                    </div>
                                                                                                    <div className="che flex-[1] mr-2">
                                                                                                        {
                                                                                                            i.name === item.privacy &&
                                                                                                            <p>
                                                                                                                <MdCheck className="text-[1.4rem] text-[#38ff31]" />
                                                                                                            </p>
                                                                                                        }
                                                                                                    </div>
                                                                                                </li>
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </motion.ul>
                                                                        }
                                                                    </>
                                                                )
                                                            }) : (
                                                                [
                                                                    { icon: <MdOutlineLink className="text-[1.8rem] text-[#999999]" />, name: "Copy link" },
                                                                    { icon: <MdBookmark className={`text-[1.8rem]  ${bookMarkColor ? "text-red-700" : "text-[#999999]"}`} />, name: "BookMark" },
                                                                ].map((i) => {
                                                                    return (
                                                                        <>
                                                                            <>
                                                                                <CopyToClipboard text={i.name === "Copy link" && process.env.REACT_APP_API_FRONTEND + item.post_url}
                                                                                    onCopy={(result) => {
                                                                                        if (result) {
                                                                                            success({ message: "Link Copied Successfully", pos: "bottom-center" })
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <li className="post_related_api  py-2 cursor-pointer   rounded-md gap-x-1  pl-2  mb-1 hover:bg-[#cdcdcd92] flex"
                                                                                        onClick={(e) => {
                                                                                            e.preventDefault()
                                                                                            if (i.name === "BookMark") {
                                                                                                setMoveBookMark(!bookMarkMove)
                                                                                                steBookMarkColor(!bookMarkColor)
                                                                                                addBookMarkPostFunction(item)
                                                                                                // dispatch({ type: "ADD_BookMark_Post", payload: item })
                                                                                            }
                                                                                        }}
                                                                                        key={index}
                                                                                        ref={ImageRef}
                                                                                    >
                                                                                        <AnimatePresence>
                                                                                            {
                                                                                                i.name === "BookMark" &&
                                                                                                <motion.p className={`text-[1.5rem] absolute top-[16.2px] left-[6px] rounded-full p-1 ${bookMarkMove ? "block bg-[#c2c2c2] text-red-700 z-[9999]" : "hidden bg-[#ffffff14]"}`}
                                                                                                    initial={{ opacity: 0, x: 0, y: 0 }}
                                                                                                    animate={bookMarkMove ? {
                                                                                                        opacity: [.2, .5, .6, .7, .9, 1],
                                                                                                        // x: [10, 40, 50, 80, 100, 150, 180, 200],
                                                                                                        // y: [-10, -40, -50, -80, -100, -150, -180, -200],
                                                                                                        // translateY: [-10, -40, -50, -80, -100,],
                                                                                                        // translateX: [10, 40, 50, 80, 100, 150, 180, 200, 250, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600],
                                                                                                        // transformPerspective: 1000,
                                                                                                        // translateX: coOrdinate.x,
                                                                                                        translateX: bookMarkMove ? 1000 : 0,
                                                                                                        // translateY: coOrdinate.y,
                                                                                                        translateY: bookMarkMove ? -370 : 0,
                                                                                                        rotate: 360,
                                                                                                    } : ""}
                                                                                                    transition={{ duration: 5, ease: "easeInOut", type: "tween", times: "2" }}
                                                                                                // exit={{ opacity: 0, x: 0, y: 0 }}
                                                                                                >
                                                                                                    {
                                                                                                        i.icon
                                                                                                    }
                                                                                                </motion.p>
                                                                                            }
                                                                                        </AnimatePresence>
                                                                                        <div className={`wra flex items-center`}>
                                                                                            <p className='text-[1.5rem] flex-1'>
                                                                                                {
                                                                                                    i.icon
                                                                                                }
                                                                                            </p>
                                                                                            <p className=" flex-[10] text-[#6a6a6a] font-sans tracking-wider text-[1.3rem] ml-1">
                                                                                                {i.name}
                                                                                            </p>
                                                                                        </div>
                                                                                    </li>
                                                                                </CopyToClipboard>
                                                                            </>
                                                                        </>
                                                                    )
                                                                })
                                                            )
                                                    }
                                                </ul>
                                            </motion.div>}
                                        </AnimatePresence>
                                    </>
                                    ) : (
                                        <>
                                            <section className={` flex align-middle  justify-center  ${loadingPost && loadingPostSecond ? "flex-[1]bg-red-300" : ""}`} ref={deletePost} >
                                                {loadingPost && loadingPostSecond ? "" : <button className=' focus:border-0 border-0 focus:outline-0 outline-none -mt-2 '
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowPopOver(true)
                                                    }}
                                                >
                                                    <BsThreeDotsVertical className='text-[1.5rem]' />
                                                </button>}
                                            </section>
                                            <AnimatePresence>
                                                {showPopOver && <motion.div ref={postPopupModal} className="popOverEffect bg-[#fff] absolute right-[4rem] top-[1.2rem] drop-shadow-lg w-[18rem]  px-1 py-4 border border-solid border-[#ececec] rounded-md z-[18]"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0, ease: "easeInOut", type: "tween" }}
                                                    exit={{ opacity: 0, scale: 0 }}
                                                >
                                                    <ul className="list-type-none gap-y-2">
                                                        {
                                                            item.userId === googleId ?
                                                                [
                                                                    // { icon: <MdBookmark className="text-[1.8rem] text-[#999999]" />, name: "BookMark" },
                                                                    { icon: <MdVisibility className="text-[1.8rem] text-[#999999]" />, name: "Visibility" },
                                                                    { icon: <MdOutlineLink className="text-[1.8rem] text-[#999999]" />, name: "Copy link" },
                                                                    { icon: <MdDelete className="text-[1.8rem] text-[#999999]" />, name: "Delete Post" }
                                                                ].map((i) => {
                                                                    return (
                                                                        <>
                                                                            <CopyToClipboard text={i.name === "Copy link" && process.env.REACT_APP_API_FRONTEND + item.post_url}
                                                                                onCopy={(result) => {
                                                                                    if (result) {
                                                                                        success({ message: "Link Copied Successfully", pos: "bottom-center" })
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <li className="post_related_api  py-2 cursor-pointer   rounded-md gap-x-1  pl-2  mb-1 hover:bg-[#cdcdcd92]"
                                                                                    onClick={(e) => {
                                                                                        if (i.name === "Visibility") {
                                                                                            setVisibilityViewEvents(!visibilityView)
                                                                                        }
                                                                                        if (i.name === "Delete Post") {
                                                                                            DeletePostById(item.post_id, item.userId);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <div className={`wra flex items-center ${deleteLoader && "justify-center"}`}>
                                                                                        {i.name === "Delete Post" && deleteLoader ? <LoaderForPostOperation /> :
                                                                                            <>
                                                                                                <p className='text-[1.5rem] flex-1'>
                                                                                                    {
                                                                                                        i.icon
                                                                                                    }
                                                                                                </p>
                                                                                                <p className=" flex-[10] text-[#6a6a6a] font-sans tracking-wider text-[1.3rem] ml-1">
                                                                                                    {i.name}
                                                                                                </p>
                                                                                            </>
                                                                                        }
                                                                                        {i.name === "Visibility" && <p className="flex-[1] text-[#6a6a6a] font-sans tracking-wider text-[1.3rem]">
                                                                                            {
                                                                                                !visibilityView ? (
                                                                                                    <FiChevronRight className="text-[1.8rem] text-[#999999]" />
                                                                                                )
                                                                                                    : (
                                                                                                        <FiChevronDown className="text-[1.8rem] text-[#999999]" />
                                                                                                    )
                                                                                            }
                                                                                        </p>}
                                                                                    </div>
                                                                                </li>
                                                                            </CopyToClipboard>
                                                                            {
                                                                                i.name === "Visibility" && visibilityView && <motion.ul className=" ml-8 mt-1">
                                                                                    {
                                                                                        [
                                                                                            { icon: <FaUserAlt className="text-[1.3rem]" />, name: "private" },
                                                                                            {
                                                                                                icon: <HiUsers className="text-[1.3rem]" />,
                                                                                                name: "friends"
                                                                                            }, {
                                                                                                icon: <FaUsers className="text-[1.3rem]" />,
                                                                                                name: "public"
                                                                                            }
                                                                                        ].map((i) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <li className={`inner_list_items py-1 flex  pl-2 items-center hover:bg-[#9d9d9dc6] rounded-md mr-2 cursor-pointer ${item.privacy === i.name && "cursor-not-allowed"}`}
                                                                                                        onClick={(e) => {
                                                                                                            e.preventDefault()
                                                                                                            if (item.privacy === i.name) {
                                                                                                                return
                                                                                                            }
                                                                                                            else {
                                                                                                                VisibilityChange(item.post_id, i.name)
                                                                                                            }
                                                                                                        }}
                                                                                                    >
                                                                                                        <div className="wrap flex flex-[11] items-center">
                                                                                                            <p className='flex-1'>
                                                                                                                {i.icon}
                                                                                                            </p>
                                                                                                            <p className="flex-[11] text-[1.4rem] text-[#6a6a6a] ml-2">{i.name}</p>
                                                                                                        </div>
                                                                                                        <div className="che flex-[1] mr-2">
                                                                                                            {
                                                                                                                i.name === item.privacy &&
                                                                                                                <p>
                                                                                                                    <MdCheck className="text-[1.4rem] text-[#38ff31]" />
                                                                                                                </p>
                                                                                                            }
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </motion.ul>
                                                                            }
                                                                        </>
                                                                    )
                                                                }) : (
                                                                    [
                                                                        { icon: <MdOutlineLink className="text-[1.8rem] text-[#999999]" />, name: "Copy link" },
                                                                        { icon: <MdBookmark className={`text-[1.8rem]  ${bookMarkColor ? "text-red-700" : "text-[#999999]"}`} />, name: "BookMark" },
                                                                    ].map((i) => {
                                                                        return (
                                                                            <>
                                                                                <>
                                                                                    <CopyToClipboard text={i.name === "Copy link" && process.env.REACT_APP_API_FRONTEND + item.post_url}
                                                                                        onCopy={(result) => {
                                                                                            if (result) {
                                                                                                success({ message: "Link Copied Successfully", pos: "bottom-center" })
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <li className="post_related_api  py-2 cursor-pointer   rounded-md gap-x-1  pl-2  mb-1 hover:bg-[#cdcdcd92] flex"
                                                                                            onClick={(e) => {
                                                                                                e.preventDefault()
                                                                                                if (i.name === "BookMark") {
                                                                                                    setMoveBookMark(!bookMarkMove)
                                                                                                    steBookMarkColor(!bookMarkColor)
                                                                                                    addBookMarkPostFunction(item)
                                                                                                    // dispatch({ type: "ADD_BookMark_Post", payload: item })
                                                                                                }
                                                                                            }}
                                                                                            key={index}
                                                                                            ref={ImageRef}
                                                                                        >
                                                                                            <AnimatePresence>
                                                                                                {
                                                                                                    i.name === "BookMark" &&
                                                                                                    <motion.p className={`text-[1.5rem] absolute top-[16.2px] left-[6px] rounded-full p-1 ${bookMarkMove ? "block bg-[#c2c2c2] text-red-700 z-[9999]" : "hidden bg-[#ffffff14]"}`}
                                                                                                        initial={{ opacity: 0, x: 0, y: 0 }}
                                                                                                        animate={bookMarkMove ? {
                                                                                                            opacity: [.2, .5, .6, .7, .9, 1],
                                                                                                            // x: [10, 40, 50, 80, 100, 150, 180, 200],
                                                                                                            // y: [-10, -40, -50, -80, -100, -150, -180, -200],
                                                                                                            // translateY: [-10, -40, -50, -80, -100,],
                                                                                                            // translateX: [10, 40, 50, 80, 100, 150, 180, 200, 250, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600],
                                                                                                            // transformPerspective: 1000,
                                                                                                            // translateX: coOrdinate.x,
                                                                                                            translateX: bookMarkMove ? 1000 : 0,
                                                                                                            // translateY: coOrdinate.y,
                                                                                                            translateY: bookMarkMove ? -370 : 0,
                                                                                                            rotate: 360,
                                                                                                        } : ""}
                                                                                                        transition={{ duration: 5, ease: "easeInOut", type: "tween", times: "2" }}
                                                                                                    // exit={{ opacity: 0, x: 0, y: 0 }}
                                                                                                    >
                                                                                                        {
                                                                                                            i.icon
                                                                                                        }
                                                                                                    </motion.p>
                                                                                                }
                                                                                            </AnimatePresence>
                                                                                            <div className={`wra flex items-center`}>
                                                                                                <p className='text-[1.5rem] flex-1'>
                                                                                                    {
                                                                                                        i.icon
                                                                                                    }
                                                                                                </p>
                                                                                                <p className=" flex-[10] text-[#6a6a6a] font-sans tracking-wider text-[1.3rem] ml-1">
                                                                                                    {i.name}
                                                                                                </p>
                                                                                            </div>
                                                                                        </li>
                                                                                    </CopyToClipboard>
                                                                                </>
                                                                            </>
                                                                        )
                                                                    })
                                                                )
                                                        }
                                                    </ul>
                                                </motion.div>}
                                            </AnimatePresence>
                                        </>
                                    )
                            }
                        </section>
                        <section className='text-caption ml-2  mt-[2rem]   px-[1rem]  text-[1.3rem] md:text-lg '
                        >
                            {
                                loadingPost && loadingPostSecond ? "" : <ReadMore children={item.text} className='cursor-pointer' />
                            }
                        </section>
                    </CardBody>
                    <section className={`image section   relative w-full   ${loadingPost && loadingPostSecond ? "mt-0 h-[15rem]" : "mt-[.8rem]"}`}>
                        {
                            item.fileType === "video" ?
                                (item.image ?
                                    // <iframe className="w-full h-full" src={mediaURL} frameBorder="1" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                    <LoadPostContentVideo url={item.image} setLoadingPostSecond={setLoadingPostSecond} />
                                    : "")
                                :
                                (item.image ?
                                    <LoadPostContentImage url={item.image} setLoadingPostSecond={setLoadingPostSecond} />
                                    : "")
                        }
                    </section>
                    <hr className={loadingPost && loadingPostSecond ? "" : "bg-grey-200 mt-[2px]"} />
                    <CardFooter className="like and dislike section flex justify-start py-0  mb-[.8rem] px-0">
                        <main className={`main_section flex  w-full  -mb-[8px] ${loadingPost && loadingPostSecond ? "bg-[#dedede]" : ""} `}>
                            <section className='like_love  flex-[10]  cursor-pointer'
                                onClick={() => {
                                    setShowLikeUserModal({ bool: true, reactUser: item.liked })
                                }}
                            >
                                <p className="text-[1.3rem] flex items-center w-full ">
                                    <div className="wrape text-[1.3rem] font-light  ml-[2px] md:ml-[2px] flex  items-center relative justify-between w-full">
                                        {loadingPost && loadingPostSecond ? (<div className="co thump rounded-[50px] p-[2.5px] bg-[#8f8f8f] ml-6 border border-solid border-[#efeded] cursor-pointer flex absolute z-[1] w-[2.5rem] mt-[30px] animate-pulse h-[2.5rem]">
                                        </div>) :
                                            <div className="thump rounded-[50px] p-[2.5px] bg-blue-500 ml-6 border border-solid border-[#efeded] cursor-pointer flex absolute z-[1]">
                                                <MdThumbUpAlt className='text-white' />
                                            </div>}
                                        {loadingPost && loadingPostSecond ? "" : <p className="like count ml-[4rem]">
                                            <span className='mr-[3px] '>
                                                {
                                                    formatnumber(likeCount)
                                                }
                                            </span>
                                        </p>}
                                    </div>
                                </p>
                            </section>
                            <div className="wraper_of_comment_and_share flex justify-around flex-[2]  md:mr-4 mr-3 md:pr-0">
                                {loadingPost && loadingPostSecond ? (
                                    <div className="bg-[#8f8f8f] w-[5rem] rounded-sm h-[2rem] animate-pulse mr-[8px]">
                                    </div>
                                ) : <section className="comments">
                                    <p className='text-[1.2rem] font-light cursor-pointer underline truncate'
                                        onClick={(e) => {
                                            SetCommentSection(e, item.post_id)
                                        }
                                        }
                                    >comments <span>{
                                        (commentsLength.length > 0 && commentsLength.post_id !== "") &&
                                        item.post_id === commentsLength.post_id && formatnumber(commentsLength.length)
                                    }
                                        </span></p>
                                </section>}
                                {loadingPost && loadingPostSecond ? (
                                    <div className="bg-[#8f8f8f] w-[5rem] rounded-sm h-[2rem] animate-pulse">
                                    </div>
                                ) : <section className="share  md:ml-[1rem]">
                                    <p className='text-[1.2rem] font-light cursor-pointer underline truncate mds-editor20:ml-[10px] before:
                                 '>share <span>{shareLength}</span></p>
                                </section>}
                            </div>
                        </main>
                    </CardFooter>
                    <hr className='mb-[.2rem]' />
                    <CardFooter className={`flex justify-between -mt-[1rem] mx-[0rem]mds-editor10:justify-center ${loadingPost && loadingPostSecond ? "bg-[#dedede]" : ""}`}>
                        <section className='mds-editor10:text-[.6rem]'
                            // data-for={item.post_id}
                            id="like"
                            data-tip="this is tooltips"
                        >
                            {loadingPost && loadingPostSecond ? (
                                <Button
                                    color="lightBlue"
                                    buttonType="link"
                                    size="regular"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="none"
                                    // bookMark
                                    className={`hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem] bg-[#a6a6a6] h-[2.5rem] animate-pulse ${bookMark?"px-[1rem] h-[2rem] text-[1.5rem]":""}`}
                                >
                                </Button>
                            ) : <Button
                                color="lightBlue"
                                buttonType="link"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="none"
                                className={`hover:bg-gray-100 text-gray-500   ${bookMark?"px-[1.3rem] h-[3rem] text-[1.5rem]":"text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem]"}`}
                                onClick={() => {
                                    callLikeHnadler(item.userId, item.post_id, item.image, item.profileImage)
                                    // setUserId([item.userId, item.post_id]);
                                    setLike(!like)
                                }}
                            >
                                {
                                    like ? <RiThumbUpFill className={` text-blue-600 ${bookMark?"text-[1.5rem]":"text-[2rem] md:text-[2rem]"}`} /> : <MdOutlineThumbUpAlt className="text-[2rem] md:text-[2rem] hover:text-blue-500" />
                                }
                            </Button>}
                        </section>
                        <section>
                            {loadingPost && loadingPostSecond ? (
                                <Button
                                    color="lightBlue"
                                    buttonType="link"
                                    size="regular"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="none"
                                    className="hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem] bg-[#a6a6a6] h-[2.5rem] animate-pulse"
                                >
                                </Button>
                            ) : <Button
                                color="lightBlue"
                                buttonType="link"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="none"
                                className={`hover:bg-gray-100 text-gray-500  ${bookMark?"px-[1.3rem] h-[3rem] text-[1.2rem]":"text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem]"}`}
                                onClick={
                                    (e) => {
                                        SetCommentSection(e, item.post_id)
                                    }
                                }
                            >
                                <MdAddComment className="text-[2rem]" />
                            </Button>}
                        </section>
                        <section>
                            {loadingPost && loadingPostSecond ? (
                                <Button
                                    color="lightBlue"
                                    buttonType="link"
                                    size="regular"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="none"
                                    className="hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem] bg-[#a6a6a6] h-[2.5rem] animate-pulse"
                                >
                                </Button>
                            ) : <Button
                                color="lightBlue"
                                buttonType="link"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="none"
                                className={`hover:bg-gray-100 text-gray-500  ${bookMark?"px-[1.3rem] h-[3rem] text-[1.5rem]":"text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem]"}`}
                                onClick={() => {
                                    callLikeHnadler(item.userId, item.post_id, "share")
                                }}
                            >
                                <RiShareFill className={`${bookMark?"text-[1.5rem]":"text-[2rem]"}`} />
                            </Button>}
                        </section>
                    </CardFooter>
                    <hr className='-mt-[.8rem]' />
                    {loadingPost && loadingPostSecond ? "" : <section className={`comment-section  mt-2 `}>
                        {
                            UserInformationLoad !== undefined &&
                            <Comments
                                commentToggle={commentToggle}
                                currentUserId={googleId ? googleId : null}
                                post_id={item.post_id ? item.post_id : null}
                                UserIdForPostComments={item.userId ? item.userId : null}
                                currentUserName={fname + " " + lname}
                                ImageUrl={OriginalProfileURL ? OriginalProfileURL : null}
                                setCommentLength={setCommentLength}
                                socket={socket}
                                setCommentToggle={setCommentToggle}
                                commentsLength={commentsLength}
                                setLike={setLike}
                                item={item}
                                setLikeCount={setLikeCount}
                            />
                        }
                    </section>}
                </Card>
            </div >
            {
                // VisibilityModal && <Model visible={VisibilityModal} visibilityHandle={visibleHandler} setPrivacyToServer={VisibilityChange} privacy={item.privacy} post_id={item.post_id} disabled={disabled} />
            }
            <Tooltips Tooltips placement="top" ref={buttonRef} className="ml-[5rem]" >
                <TooltipsContent className="flex justify-center md:justify-between  px-[5px] ">
                    {/* <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] sm:w-[3rem] sm:h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0'
                        onClick={emojiHandle}
                    >
                        <article className='setEmoji w-[3.5] h-[3.5]'>
                            <Image
                                src={emoji}
                                rounded={true}
                                className="w-2rem h-2rem bg-black-800"
                            />
                        </article>
                    </section>
                    <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0' >
                        <article className='setEmoji w-[3.5] h-[3.5]'>
                            <Image
                                src={emoji2}
                                rounded={true}
                                className="w-2rem h-2rem bg-black-800"
                            />
                        </article>
                    </section>
                    <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0' >
                        <article className='setEmoji w-[3.5] h-[3.5]'>
                            <Image
                                src="https://tenor.com/view/licking-lips-emoji-love-this-gif-23499819"
                                rounded={true}
                                className="w-2rem h-2rem bg-black-800"
                            />
                        </article>
                    </section>
                    <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0 ' >
                        <article className='setEmoji w-[3.5] h-[3.5]'>
                            <Image
                                src={emoji3}
                                rounded={true}
                                className="w-2rem h-2rem bg-black-800"
                            />
                        </article>
                    </section>
                    <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0' >
                        <article className='setEmoji w-[3.5] h-[3.5]'>
                            <Image
                                src={emoji4}
                                rounded={true}
                                className="w-2rem h-2rem bg-black-800"
                            />
                        </article>
                    </section>
                    <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0' >
                        <article className='setEmoji w-[3.5] h-[3.5]'>
                            <Image
                                src={emoji5}
                                rounded={true}
                                className="w-2rem h-2rem bg-black-800"
                            />
                        </article>
                    </section> */}
                </TooltipsContent>
            </Tooltips>
        </>
    )
}
export default PostCard = React.memo(PostCard)






function LoaderForPostOperation() {
    return (
        <>
            <ThreeDots color="#00BFFF" height={25} width={25} />
        </>
    )
}


function formatnumber(number) {
    var unitlist = ["", "K", "M", "G"];
    let sign = Math.sign(number);
    let unit = 0;
    while (Math.abs(number) > 1000) {
        unit = unit + 1;
        number = Math.floor(Math.abs(number) / 100) / 10;
    }
    return sign * Math.abs(number) + unitlist[unit]
}





function LoadProfileImage({ url, setLoadingPost, image }) {
    const [loaded, setLoaded] = useState(false)
    const [blobURL, setURL] = useState("")
    const isMount = useRef(true)
    useEffect(() => {
        const loadProfileImage1 = async () => {
            try {
                setLoaded(true)
                setLoadingPost(true)
                const res = await fetch(url)
                const blob = await res.blob()
                if (isMount.current) {
                    setURL(URL.createObjectURL(blob))
                    setLoaded(false)
                    setLoadingPost(false)
                }
            }
            catch (err) {
                setLoaded(false)
                setLoadingPost(false)
            }
        }
        loadProfileImage1()
        return () => {
            isMount.current = false
            setURL("")
            setLoaded(false)
            setLoadingPost(false)
        }
    }, [url])
    return (
        <>
            {loaded ? (
                <p className=' bg-[#8f8f8f] animate-pulse w-[3rem]  h-[3rem] rounded-full flex-shrink-0'>
                </p>
            ) : <Image
                src={blobURL}
                rounded={true}
                raised={false}
                alt=""
                className="w-full h-full rounded-full"
            />}
        </>
    )
}


function LoadPostContentVideo({ url, setLoadingPostSecond }) {
    const [blobData, setPostBlobUrl] = useState("")
    const [load, setLoad] = useState(false)
    const isMount = useRef(true)
    useEffect(() => {
        async function loadFiles() {
            try {
                setLoad(true)
                setLoadingPostSecond(true)
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/_user/posts/`, {
                    method: "GET",
                    headers: {
                        // "Content-Type":"application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                        "post": url
                    }
                })
                const blob = await res.blob()
                if (res.status === 200) {
                    // if (isMount.current) {
                    setPostBlobUrl(URL.createObjectURL(blob))
                    setLoad(false)
                    setLoadingPostSecond(false)
                    // }
                }
            }
            catch (err) {
                setLoad(false)
                setLoadingPostSecond(false)
                return
            }
        }
        loadFiles()
        // return () => {
        //     isMount.current = false
        // }
    }, [url])
    return (
        <>
            {
                load ? (
                    <>
                        <div className="inner bg-[#cbcbcb] w-full h-[25rem] animate-pulse">
                        </div>
                    </>
                ) : (
                    <>
                        <video controls>
                            <source src={blobData} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </>
                )
            }
        </>
    )
}


function LoadPostContentImage({ url, setLoadingPostSecond }) {
    const [blobData, setPostBlobUrl] = useState("")
    const [load, setLoad] = useState(false)
    const isMount = useRef(true)
    useEffect(() => {
        async function loadFiles() {
            try {
                setLoadingPostSecond(true)
                setLoad(true)
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/_user/posts/`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                        "post": url
                    }
                })
                const blob = await res.blob()
                if (res.status === 200) {
                    setPostBlobUrl(URL.createObjectURL(blob))
                    setLoadingPostSecond(false)
                    setLoad(false)
                }
            }
            catch (err) {
                setLoadingPostSecond(false)
                return
            }
        }
        loadFiles()
    }, [url])
    return (
        <>
            {
                load ? (
                    <>
                        <div className="inner bg-[#c9c8c8]  h-[25rem] w-full animate-pulse">
                        </div>
                    </>
                ) :
                    (
                        <>
                            <Image
                                src={blobData}
                                rounded={false}
                                raised={false}
                                className="w-full rounded-none"
                            />
                        </>
                    )
            }
        </>
    )
}
{/* <Popover placement="auto" ref={deletePost}>
<PopoverContainer>
    <PopoverHeader>
    </PopoverHeader>
    <PopoverBody>
        <div className="container1 flex flex-col justify-center -mt-3">
            <section className=" flex  justify-between cursor-pointer align-baseline hover:bg-red-700 hover:rounded-lg hover:text-white px-6 py-2"
                ref={DeletedPost}
                onClick={(e) => {
                    e.preventDefault();
                    DeletePostById(item.post_id, item.userId);
                }}
            >
                <MdDelete className='text-xl mt-[2px] mr-2' />
                <p className='cursor-pointer flex text-[1rem] '
                >
                    Delete Post
                </p>
            </section>
            <section
                className='px-6 py-2 hover:bg-red-800 hover:rounded-lg hover:text-white flex   cursor-pointer align-baseline '
                onClick={(e) => {
                    VisibilityChange(item.post_id, item.privacy);
                }}
            >
                {
                    item.privacy === "public" ?
                        <MdVisibility className='text-xl mt-[2px] mr-2' /> :
                        <MdVisibilityOff className='text-xl mt-[2px] mr-2' />
                }
                <p
                    className='cursor-pointer flex text-[1rem] '
                >Visibility</p>
            </section>
        </div>
    </PopoverBody>
</PopoverContainer>
</Popover> */}