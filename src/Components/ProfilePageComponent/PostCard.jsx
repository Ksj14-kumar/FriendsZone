import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import Button from "@material-tailwind/react/Button";
import Image from "@material-tailwind/react/Image";
import Image1 from '../../assets/img/team-4-470x470.png';
import Avatar from '@mui/material/Avatar';
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import emoji from '../../assets/emoji/animated-emoticons-2018-5.gif';
import emoji2 from '../../assets/emoji/animated-emoticons-2018-25.gif';
import emoji3 from '../../assets/emoji/animated-emoticons-2018-21.gif';
import emoji4 from '../../assets/emoji/animated-emoticons-2018-41.gif';
import emoji5 from '../../assets/emoji/animated-emoticons-2018-8.gif';
import { IoEarth } from 'react-icons/io5';
import { MdAddComment, MdDelete, MdLock, MdOutlineThumbUpAlt, MdVisibilityOff, MdVisibility, MdThumbUpAlt, MdBookmark, MdOutlineLink, MdArrowForward, MdCheck } from 'react-icons/md';
import { RiShareFill, RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { FaUserAlt, FaUsers, FaHeart } from 'react-icons/fa';
import { IoMdHeart } from "react-icons/io"
import { HiUsers } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux'
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import { BsThreeDotsVertical } from 'react-icons/bs';
import ReadMoreReact from 'read-more-react';
import axios from 'axios';
import Comments from './Comments/Comments';
import OverlayLoader from '../../Loader/BackgrooundImageLoader';
import { format } from 'timeago.js';
import { Popover as PopoverReactSuite, Whisper } from 'rsuite';
import { motion, AnimatePresence } from "framer-motion"
import ReadMore from './ReadMore';
import { Error, Success } from '../Toastify';
import { error } from '../../toastifyMessage/Toast';
import { success } from '../../toastifyMessage/Toast';
import Model from './Model';
import profile from '../../assets/img/download.png'
import { NavLink } from "react-router-dom"
// import { createPopper } from "@popperjs/core"
import { Loader } from 'rsuite';
import { ThreeDots } from "react-loader-spinner"
import ReactTooltip from "react-tooltip"
import { BsArrowLeft } from "react-icons/bs"
import BookMarkApi from "../../AlLFetchApi/__functionApi"
import { CopyToClipboard } from 'react-copy-to-clipboard';






function PostCard({ item, index, filterPost, socket, threeDot, setShowLikeUserModal, single, name }) {

    const [emojiURL, setEmojiURL] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)
    const [commentsLength, setCommentLength] = useState({ length: 0, post_id: "" })
    const [shareLength, setShareLength] = useState(0)
    const [showPopOver, setShowPopOver] = useState(false)
    const [visibilityView, setVisibilityViewEvents] = useState(false)
    const dispatch = useDispatch()
    const buttonRef = useRef()
    const avatarGroup = useRef()
    const deletePost = useRef()
    const visibilityRef = useRef()
    const [PostIdForDelete, setPostIdForDelete] = useState()
    const [VisibilityModal, setVisibilityModal] = useState()
    const [disabled, setDisabled] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [like, setLike] = useState(false)

    const [likeCount, setLikeCount] = useState(null)
    const [userIds, setUserId] = useState([])
    const [bookMarkMove, setMoveBookMark] = useState(null)
    const [coOrdinate, setCordinate] = useState({ x: "", y: "" })
    const [bookMarkColor, steBookMarkColor] = useState(false)
    const [blobURL, setBlobUrl] = useState("")
    const [mediaURL, setMediaURL] = useState("")

    const DeletedPost = useRef()
    const componentMount = useRef(true)
    const postPopupModal = useRef(null)
    const ImageRef = useRef(null)
    const popOverEffectForEmoji = useRef(null)








    const ShowImage = useSelector((state) => {
        return state.ShowImage.value
    })
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
    function emojiHandle() {
        dispatch({ type: "ADD_EMOJI_URL", paylaod: emojiURL })
    }


    function SetCommentSection(e, id) {
        if (id) {
            setCommentToggle(!commentToggle)
        }
    }
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^DELETE THE by specific id POST ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    async function DeletePostById(post_id, adminId) {
        console.log("Delete post function")
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
                dispatch({ type: "LOAD_POSTS", payload: data })
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

    // ========================================================SET THE LIKE COUNT NUMBER ====================================

    useEffect(() => {
        setLikeCount(item.liked.length === 0 ? 0 : item.liked.length)
    }, [item])

    //================================================POST IS BOOKMARKED OR NOT====================
    useEffect(() => {
        const value = UserInformationLoad.bookMarkPost?.length > 0 && UserInformationLoad.bookMarkPost.some((i) => {
            console.log({ i })
            return i.post_id === item.post_id
        })
        if (value) {
            steBookMarkColor(value)
        }
        console.log({ value, item, UserInformationLoad })
    }, [item, UserInformationLoad])

    //realitime like system
    useEffect(() => {
        socket?.on("getLikeCount", (data) => {
            data.post_id === item.post_id && setLikeCount(data.likeCount)
            // setLikeCount(data)
        })
    }, [likeCount])


    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Change the visibility^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    async function VisibilityChange(post_id, visibility) {
        console.log("visibilty change function")

        try {
            setDisabled(true)
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
                dispatch({ type: "LOAD_POSTS", payload: data.data })
                setDisabled(false)
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
    }, [item.liked, _id])

    //function which excute when current user liked it any post
    async function callLikeHnadler(userId, post_id, bgImageUrl, profileImage) {
        console.log("like count function")
        try {

            const result = await axios.put(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/like/${post_id}`, {
                likedBy: googleId,
                likeTo: userId,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
            if (like) {
                socket?.emit("likeCount", { likeCount: likeCount - 1, post_id })
            }
            else {
                socket?.emit("likeCount", { likeCount: likeCount + 1, post_id })
            }
        } catch (err) {
            like ? setLike(false) : setLike(true)
            like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
        }
    }



    //visiblity handler
    async function visibleHandler(con) {
        console.log("visibility mode old")
        setVisibilityModal(false)
    }


    //load all the comment length regarding each post
    useEffect(() => {

        async function NumberOfComments() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/number/comment/length`, {
                    method: "POST",
                    body: JSON.stringify({ post_id: item.post_id }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const data = await response.json()
                // if (componentMount.current) {

                if (response.status === 200) {

                    setCommentLength({ length: data.data, post_id: data.post })
                }
                else if (response.status !== 200) {
                    setCommentLength({ length: 0, post_id: data.post })
                }
                // }
            } catch (error) {
                console.warn(error)
            }
        }
        NumberOfComments()
        // return () => {
        //     componentMount.current = false
        // }
    }, [item])


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
        console.log("popover effect")
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

        if (ImageRef.current) {
            console.log("hello")
            const { top, left, width, height } = ImageRef.current.getBoundingClientRect()
            const { x, y } = { y: top + height / 2, x: width + left / 2 }
            setCordinate({ x: x - getPos.x, y: y - getPos.y })
            console.log(Math.hypot(x - getPos.x, y - getPos.y))
        }
    }, [ImageRef, item])



    //convert original url into the blob url
    useEffect(async () => {
        try {
            const res = await fetch(item.profileImage)
            const blob = await res.blob()
            const blobURl = URL.createObjectURL(blob)
            setBlobUrl(blobURl)
        }
        catch (err) {
            console.warn(err)
        }
    }, [item])

    //convert the media post url into blob
    useEffect(async () => {
        const res = await fetch(item?.image)
        const blob = await res.blob()
        const blobURLForPOst = URL.createObjectURL(blob)
        setMediaURL(blobURLForPOst)


    }, [item])




    return (
        <>


            <div className="post-card flex justify-around w-full mb-2 rounded-md md:w-[42rem] drop-shadow-sm">
                <Card className="post p-0">
                    <CardBody >
                        <div className={`back_to_hone  flex mb-3 w-full items-center ${single === "single" && name ? "flex" : "hidden"}`}>
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
                        <section className='header-image-section post md:rounded-lg  flex justify-between' >
                            <NavLink to={`/profile/${item.userId}`}>
                                <main className='flex  join-of-name-select-option post '>
                                    <article className='
                              card-post-image-modal w-[3rem]  h-[3rem] rounded-full flex-shrink-0 pos
                              '
                                    >
                                        {
                                            item.profileImage ?
                                                <Image
                                                    src={blobURL}
                                                    rounded={true}
                                                    raised={false}
                                                    alt=""
                                                    className="w-full h-full rounded-full"
                                                /> : <Image
                                                    src={profile}
                                                    rounded={true}
                                                    raised={false}
                                                    alt="Rounded Image"
                                                    className="w-full h-full"
                                                />
                                        }
                                    </article>
                                    <article className=' public-name-article ml-[.5rem] -mt-[.4rem] post'>
                                        <article className='text-black text-xl'>
                                            {item.username ? item.username : "NA"}
                                        </article>
                                        <article className='flex'>
                                            {format(item.createdAt)}
                                            {
                                                item.privacy === "public" ?
                                                    <IoEarth className='mt-[4px] ml-[.3rem]' /> :
                                                    item.privacy === "friends" ? <HiUsers className="mt-[4px] ml-[.3rem]" /> :
                                                        <MdLock className='mt-[4px] ml-[.3rem]' />
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
                                            <button className=' focus:border-0 border-0 focus:outline-0 outline-none -mt-2 '>
                                                <BsThreeDotsVertical className='text-[1.5rem]' />
                                            </button>



                                        </section>

                                        <Popover placement="auto" ref={deletePost}>
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
                                                                setPostIdForDelete(item.post_id);
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
                                                                setVisibilityModal(true)

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
                                        </Popover>
                                    </>


                                    ) : (
                                        <>
                                            <section className=" flex justify-center align-middle " ref={deletePost} >
                                                <button className=' focus:border-0 border-0 focus:outline-0 outline-none -mt-2 '

                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowPopOver(true)
                                                    }}
                                                >
                                                    <BsThreeDotsVertical className='text-[1.5rem]' />
                                                </button>
                                            </section>

                                            <AnimatePresence>

                                                {showPopOver && <motion.div ref={postPopupModal} className="popOverEffect bg-[#fff] absolute right-[4rem] top-[1.2rem] drop-shadow-lg w-[18rem]  px-1 py-4 border border-solid border-[#ececec] rounded-md z-[18]"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
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
                                                                                            setPostIdForDelete(item.post_id);
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
                                                                                    {/* <NavLink to={`${i.name === "Copy link" ? `/user/single/post?post=${item.post_id}&&auther=${item.username}` : "#"}`} key={index}> */}
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
                                                                                        {/* </NavLink> */}
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
                            <ReadMore children={item.text} className='cursor-pointer' />

                        </section>
                    </CardBody>

                    {/* =============================== CARD FOOTER ================================================ */}



                    <section className='image section mt-[.8rem]   relative bg-red-600 w-full   '>
                        {
                            item.fileType === "video" ?
                                (item.image ?
                                    <iframe className="w-full h-full" src={mediaURL} frameBorder="1" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                    : "")
                                :
                                (item.image ?
                                    <Image
                                        src={mediaURL}
                                        rounded={false}
                                        raised={false}
                                        className="w-full rounded-none"
                                    />
                                    : "")
                        }
                    </section>
                    <hr className='bg-grey-200 mt-[2px]' />


                    <CardFooter className="like and dislike section flex justify-start py-0  mb-[.8rem] px-0">
                        <main className="main_section flex  w-full  -mb-[8px] ">

                            <section className='like_love  flex-[10]  cursor-pointer'
                                onClick={() => {
                                    setShowLikeUserModal({ bool: true, reactUser: item.liked })

                                }}
                            >
                                <p className="text-[1.3rem] flex items-center w-full ">
                                    <div className="wrape text-[1.3rem] font-light  ml-[2px] md:ml-[2px] flex  items-center relative justify-between w-full">

                                        <div className="thump rounded-[50px] p-[2.5px] bg-blue-500 ml-6 border border-solid border-[#efeded] cursor-pointer flex absolute z-[1]">
                                            <MdThumbUpAlt className='text-white' />
                                        </div>
                                        {/* <div className="thump rounded-[50px] p-[2px] bg-[#a60606] mr-1 border border-solid border-[#a10606] cursor-pointer ml-[17px] absolute">
                                            <FaHeart className='text-[#ff1f1f] w-full h-full' />

                                        </div> */}
                                        <p className="like count ml-[4rem]">

                                            <span className='mr-[3px] '>
                                                {
                                                    formatnumber(likeCount)
                                                }
                                            </span>
                                        </p>
                                    </div>
                                </p>
                            </section>
                            <div className="wraper_of_comment_and_share flex justify-around flex-[2]  md:mr-4 mr-3 md:pr-0">

                                <section className="comments">
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

                                </section>
                                <section className="share  md:ml-[1rem]">
                                    <p className='text-[1.2rem] font-light cursor-pointer underline truncate mds-editor20:ml-[10px]
                                 '>share <span>{shareLength}</span></p>

                                </section>
                            </div>

                        </main>

                    </CardFooter>







                    <hr className='mb-[.2rem]' />
                    {/* <ReactTooltip id={item.post_id} /> */}

                    <CardFooter className=" flex justify-between -mt-[1rem] mx-[0rem]mds-editor10:justify-center ">

                        <section className='mds-editor10:text-[.6rem]'
                            // data-for={item.post_id}
                            id="like"
                            data-tip="this is tooltips"
                        >
                            <Button
                                color="lightBlue"
                                buttonType="link"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="none"
                                className="hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem] "
                                onClick={() => {
                                    callLikeHnadler(item.userId, item.post_id, item.image, item.profileImage)
                                    setUserId([item.userId, item.post_id]);
                                    setLike(!like)
                                }}

                            >

                                {
                                    like ? <RiThumbUpFill className='text-[2rem] md:text-[2rem] text-blue-600' /> : <MdOutlineThumbUpAlt className="text-[2rem] md:text-[2rem] hover:text-blue-500" />
                                }

                            </Button>
                        </section>

                        <section>
                            <Button
                                color="lightBlue"
                                buttonType="link"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="none"
                                className="hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem]"
                                onClick={
                                    (e) => {
                                        SetCommentSection(e, item.post_id)
                                    }
                                }
                            >
                                <MdAddComment className="text-[2rem]" />


                            </Button>
                        </section>
                        <section>
                            <Button
                                color="lightBlue"
                                buttonType="link"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="none"
                                className="hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem]"
                                onClick={() => {
                                    callLikeHnadler(item.userId, item.post_id, "share")
                                }}
                            >
                                <RiShareFill className="text-[2rem]" />
                            </Button>
                        </section>
                    </CardFooter>








                    {/* =====================================================CARD FOOTER===================================================== */}
                    <hr className='-mt-[.8rem]' />
                    <section className="comment-section  mt-2">

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
                            />
                        }
                    </section>


                </Card>
            </div>


            {
                // VisibilityModal && <Model visible={VisibilityModal} visibilityHandle={visibleHandler} setPrivacyToServer={VisibilityChange} privacy={item.privacy} post_id={item.post_id} disabled={disabled} />
            }

            <Tooltips placement="top" ref={buttonRef} className="ml-[5rem]">
                <TooltipsContent className="flex justify-center md:justify-between  px-[5px] ">
                    <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] sm:w-[3rem] sm:h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0'
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
                    </section>
                </TooltipsContent>
            </Tooltips>


        </>
    )
}
export default PostCard






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