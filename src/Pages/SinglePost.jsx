import React from 'react'
import { useSearchParams, useLocation, useHistory, NavLink } from "react-router-dom"
import Query from "query-string"
import { useEffect, useState, useRef } from 'react'
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import Button from "@material-tailwind/react/Button";
import Image from "@material-tailwind/react/Image";
import Avatar from '@mui/material/Avatar';
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import emoji from '../assets/emoji/animated-emoticons-2018-10.gif';
import emoji2 from '../assets/emoji/animated-emoticons-2018-25.gif';
import emoji3 from '../assets/emoji/animated-emoticons-2018-21.gif';
import emoji4 from '../assets/emoji/animated-emoticons-2018-41.gif';
import emoji5 from '../assets/emoji/animated-emoticons-2018-8.gif';
import { IoEarth } from 'react-icons/io5';
import { MdAddComment, MdDelete, MdLock, MdOutlineThumbUpAlt, MdVisibilityOff, MdVisibility, MdThumbUpAlt, MdBookmark, MdOutlineLink, MdArrowForward, MdCheck } from 'react-icons/md';
import { RiShareFill, RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { FaUserAlt, FaUsers } from 'react-icons/fa';

import { HiUsers } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux'
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import { BsThreeDotsVertical } from 'react-icons/bs';
import ReadMoreReact from 'read-more-react';
import axios from 'axios';
import Comments from '../Components/ProfilePageComponent/Comments/Comment';
import OverlayLoader from '../Loader/BackgrooundImageLoader';
import { format } from 'timeago.js';
import { Popover as PopoverReactSuite, Whisper } from 'rsuite';
import { motion, AnimatePresence } from "framer-motion"
import ReadMore from '../Components/ProfilePageComponent/ReadMore';
// import { Error, Success } from '../Toastify';
// import { error } from '../toastifyMessage/Toast';
// import { success } from '../toastifyMessage/Toast';
// import Model from './Model';
import profile from '../assets/img/download.png'
import { createPopper } from "@popperjs/core"
import { Loader } from 'rsuite';
import { ThreeDots } from "react-loader-spinner"

function SinglePost() {
    const history = useHistory()
    const { auther, post } = Query.parse(window.location.search)
    const [userPostData, setPostData] = useState({})
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [commentLength, setCommentLength] = useState(0)
    const [commentUpdate, setCommentUpdate] = useState(0)
    const [showPopOver, setShowPopOver] = useState(false)
    const [visibilityView, setVisibilityViewEvents] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [commentToggle, setCommentToggle] = useState(false)

    const buttonRef = useRef(null)
    const deletePost = useRef(null)
    const postPopupModal = useRef(null)


    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value

    })
    const ShowImage = useSelector((state) => {
        // console.log("state is ", state)
        return state.ShowImage.value
    })
    const { _id, fname, lname, googleId } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "", googleId: "" }


    useEffect(() => {
        async function fetchData() {
            try {
                const joinAuther = auther.split(" ").join("-")
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/api/posts/single/${joinAuther}/${post}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                    }
                })
                const data = await res.json()
                console.log(data)
                if (res.status === 200) {
                    setPostData(data.data)
                    setLikeCount(data.data.liked.length)
                }
                else if (res.status === 401) {

                    history.push("/")
                }
                else if (res.status !== 500) {
                    alert(data.message)
                }
            } catch (err) {
                console.warn(err)
            }
        }
        auther !== "" && post !== "" && fetchData()
    }, [auther, post])

    useEffect(() => {
        async function getCommentLength() {
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/number/comment/length`, {
                method: "POST",
                body: JSON.stringify({ post_id: post }),

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                }

            })
            const data = await res.json()
            console.log({ data })
            if (res.status === 200) {
                setCommentLength(data.data > 0 ? data.data : 0)
            }
            else if (res.status !== 200) {
            }
        }
        getCommentLength()
    }, [commentUpdate, userPostData])


    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^>>>> SEND THE REACTION TO Specific I  ID<<<<<<<<<<^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    useEffect(() => {
        //load the like when user refresh the page and show user which post already liked
        Object.keys(userPostData).length > 0 &&
            setLike(userPostData.liked.includes(googleId))
    }, [userPostData])



    //function which excute when current user liked it any post
    async function callLikeHnadler(userId, post_id, bgImageUrl, profileImage) {
        try {
            //UNCOMMENT THIS FOR REALTIME LIKE SYSTEMe

            // socket.emit("like", {
            //     likedBy: googleId,
            //     likeTo: userId,
            //     post_id,
            //     bg: bgImageUrl,
            //     profile: profileImage,
            //     type: like

            // })
            const result = await axios.put(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/like/${post_id}`, {
                likedBy: googleId,
                likeTo: userId,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")

                }
            })
            like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
        } catch (err) {
            console.log("err is ", err)
            like ? setLike(false) : setLike(true)
            like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
        }
    }



    useEffect(() => {
        function handleClickOutside(event) {
            if (postPopupModal.current && !postPopupModal.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                // console.log("click outside the woindow")
                // setTextAreaValue("")
                // setUrlOfImageUpload("")
                // dispatch({ type: "UNSELECT_POST_IMAGE", payload: "" })
                setShowPopOver(false)
                setVisibilityViewEvents(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [postPopupModal])




    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^DELETE THE by specific id POST ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    async function DeletePostById(post_id, adminId) {
        try {
            //display post after filter data]
            // const { filterData, filterComments } = await filterPost(post_id)
            // console.log("filter data is ", filterData)
            // dispatch({ type: "LOAD_POSTS", payload: filterData })
            // dispatch({ type: "SET_TOTAL_COMMENT", payload: filterComments })
            // send request to the serve for delete the post by id
            // ${process.env.REACT_APP_API_BACKENDURL}
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
                // success({ message: message })
                setDeleteLoader(false)
            }
            else if (DeletePostResponse.status !== 200) {
                // error("not delete")
            }
        } catch (err) {
            console.warn(err)
        }

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Change the visibility^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    async function VisibilityChange(post_id, visibility) {

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
                // success({ message: "Visibility Changed Successfully" })
                // dispatch({ type: "LOAD_POSTS", payload: data.data })
                setDisabled(false)
            } else if (response.status === 500) {
                // error({ message: "Something went wrong" })
            }
        } catch (err) {
            console.warn(err)
        }
    }










    console.log({ userPostData })

    return (

        <>
            <div className="post_wrapper flex justify-center bg-red-500">

                <div className="post-card flex justify-around w-full mb-2 rounded-md md:w-[42rem] drop-shadow-sm mt-[6rem]">
                    <Card className="post p-0">

                        <CardBody >
                            <div className="flex justify-center relative">
                                {/* <H6 color="gray" >Create Post</H6> */}
                            </div>
                            <section className='header-image-section post md:rounded-lg  flex justify-between' >
                                <NavLink to={`/profile/${Object.keys(userPostData).length && userPostData?.userId}`}>

                                    <main className='flex  join-of-name-select-option post '>
                                        <article className='
                              card-post-image-modal w-[3rem]  h-[3rem] rounded-full flex-shrink-0 pos
                              '>
                                            {
                                                Object.keys(userPostData).length && userPostData?.profileImage ?
                                                    <Image
                                                        src={Object.keys(userPostData).length && userPostData?.profileImage}
                                                        rounded={true}
                                                        raised={false}
                                                        alt=""
                                                        className="w-full h-full"
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
                                                {Object.keys(userPostData).length > 0 && userPostData?.username ? Object.keys(userPostData).length && userPostData?.username : ""}
                                                {/* <p> Dunga Ram</p> */}
                                            </article>
                                            <article className='flex'>
                                                {/* {new Date(Date.now()).toDateString()} */}
                                                {
                                                    Object.keys(userPostData).length > 0 &&
                                                    format(userPostData?.createdAt)
                                                }
                                                {
                                                    Object.keys(userPostData).length && userPostData?.privacy === "public" ?
                                                        <IoEarth className='mt-[4px] ml-[.3rem]' /> :
                                                        Object.keys(userPostData).length && userPostData?.privacy === "friends" ? <HiUsers className="mt-[4px] ml-[.3rem]" /> : Object.keys(userPostData).length &&
                                                            <MdLock className='mt-[4px] ml-[.3rem]' />
                                                }
                                            </article>
                                        </article>
                                    </main>
                                </NavLink>

                                {/* Object.keys(userPostData).length &&userPostData?.userId === googleId */}
                                {(Object.keys(userPostData).length > 0 && (
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

                                                    {[
                                                        { icon: <MdBookmark className="text-[1.8rem] text-[#999999]" />, name: "BookMark" },
                                                        { icon: <MdOutlineLink className="text-[1.8rem] text-[#999999]" />, name: "Copy link" },

                                                    ].map((i) => {

                                                        return (
                                                            <>

                                                                <>

                                                                    <NavLink to={i.name === "Copy link" && `/user/single/post?post=${Object.keys(userPostData).length && userPostData?.post_id}&&auther=${Object.keys(userPostData).length && userPostData?.username}`}>

                                                                        {
                                                                            <li className="post_related_api  py-2 cursor-pointer   rounded-md gap-x-1  pl-2  mb-1 hover:bg-[#cdcdcd92]"
                                                                                onClick={(e) => {

                                                                                }}
                                                                            >
                                                                                <div className={`wra flex items-center ${deleteLoader && "justify-center"}`}>


                                                                                    {i.name === "Delete Post" && deleteLoader ? <LoaderForPostOperation /> :
                                                                                        <>
                                                                                            <div className={`del ${i.name !== "Delete Post" && userPostData.userId === googleId ? "flex" : "hidden"}`}>

                                                                                                <p className='text-[1.5rem] flex-1'>
                                                                                                    {
                                                                                                        i.icon
                                                                                                    }
                                                                                                </p>
                                                                                                <p className=" flex-[10] text-[#6a6a6a] font-sans tracking-wider text-[1.3rem] ml-1">
                                                                                                    {i.name}
                                                                                                </p>
                                                                                            </div>
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
                                                                            </li>}

                                                                    </NavLink>
                                                                </>
                                                                {i.name === "Visibility" && visibilityView && <motion.ul className=" ml-8 mt-1">
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
                                                                                    <li className={`inner_list_items py-1 flex  pl-2 items-center hover:bg-[#9d9d9dc6] rounded-md mr-2 cursor-pointer ${Object.keys(userPostData).length && userPostData?.privacy === i.name && "cursor-not-allowed"}`}

                                                                                        onClick={(e) => {
                                                                                            e.preventDefault()
                                                                                            if (Object.keys(userPostData).length && userPostData?.privacy === i.name) {
                                                                                                return
                                                                                            }
                                                                                            else {
                                                                                                VisibilityChange(userPostData?.post_id, i.name)
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
                                                                                                i.name === Object.keys(userPostData).length && userPostData?.privacy &&
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
                                                                </motion.ul>}

                                                            </>

                                                        )
                                                    })}


                                                </ul>

                                            </motion.div>}
                                        </AnimatePresence>
                                        {/* 
                                                     */}
                                    </>

                                ))
                                }
                            </section>
                            {/* <main className='  w-full mt-[2rem]'> */}
                            <section className='text-caption ml-2  mt-[2rem]   px-[1rem]  text-[1.3rem] md:text-lg '
                            >
                                {Object.keys(userPostData).length > 0 &&

                                    < ReadMore children={Object.keys(userPostData).length > 0 && userPostData?.text} className='cursor-pointer' />
                                }

                            </section>
                        </CardBody>
                        <section className='image section mt-[.8rem]   relative bg-red-600 w-full   '>
                            {
                                Object.keys(userPostData).length && userPostData?.fileType === "video" ?
                                    (Object.keys(userPostData).length && userPostData?.image ?
                                        <iframe className="w-full h-full" src={Object.keys(userPostData).length && userPostData?.image} frameBorder="1" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                        : "")
                                    :
                                    (Object.keys(userPostData).length && userPostData?.image ?
                                        <Image
                                            src={Object.keys(userPostData).length && userPostData?.image}
                                            rounded={false}
                                            raised={false}
                                            className="w-full rounded-none"
                                        />
                                        : "")
                            }
                        </section>
                        <hr className='bg-grey-200 mt-[2px]' />
                        <CardFooter className="like and dislike section flex justify-start py-0  mb-[.8rem] ">
                            <main className="main_section flex  w-full  -mb-[5px] ">

                                <section className='like_love mds-editor20:flex-[5] md:flex-[9]'>

                                    <p className="text-[1.3rem] font-light  ml-[2rem] md:ml-[4rem] flex  items-center">
                                        <div className="thump rounded-[50px] p-[2.5px] bg-blue-500 mr-1 border border-solid border-[#efeded] cursor-pointer"><MdThumbUpAlt className='text-white' /></div> <span className='mr-[3px]'>
                                            {
                                                likeCount
                                            }
                                        </span>
                                    </p>
                                </section>
                                <section className="comments mds-editor20:flex-[3] md:flex-[2]">
                                    <p className='text-[1.2rem] font-light cursor-pointer underline truncate'>comments <span>{commentLength}
                                    </span></p>

                                </section>
                                <section className="share mds-editor20:flex-[3] md:flex-[1] md:ml-[1rem]">
                                    <p className='text-[1.2rem] font-light cursor-pointer underline truncate mds-editor20:ml-[10px]
                                 '>share <span>{0}</span></p>

                                </section>

                            </main>

                        </CardFooter>
                        <hr className='mb-[.2rem]' />
                        <CardFooter className=" flex justify-between -mt-[1rem] mx-[0rem]mds-editor10:justify-center ">
                            <section className='mds-editor10:text-[.6rem]'>
                                <Button
                                    color="lightBlue"
                                    buttonType="link"
                                    size="regular"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="none"
                                    className="hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem] "
                                    ref={buttonRef}
                                    onClick={() => {
                                        Object.keys(userPostData).length > 0 && callLikeHnadler(userPostData.userId, userPostData.post_id, userPostData.image, userPostData.profileImage)
                                        // setUserId([Object.keys(userPostData).length && userPostData?.userId, Object.keys(userPostData).length && userPostData?.post_id]);
                                        Object.keys(userPostData).length > 0 && setLike(!like)
                                    }}
                                >
                                    {/* //load all the likes */}
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
                                            // SetCommentSection(e, Object.keys(userPostData).length &&userPostData?.post_id)
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
                                        // callLikeHnadler(Object.keys(userPostData).length &&userPostData?.userId, Object.keys(userPostData).length &&userPostData?.post_id, "share")
                                        // console.log(Object.keys(userPostData).length &&userPostData?.post_url)
                                    }}
                                >
                                    <RiShareFill className="text-[2rem]" />
                                </Button>
                            </section>
                        </CardFooter>
                        <hr className='-mt-[.8rem]' />
                        <section className="comment-section  mt-2">
                            {/* // {Object.keys(userPostData).length &&userPostData?.post_id} */}

                            {
                                // Object.keys(userPostData).length > 0 &&
                                // UserInformationLoad !== undefined &&
                                // <Comments
                                //     commentToggle={commentToggle}
                                //     currentUserId={googleId ? googleId : null}
                                //     UserIdForPostComments={userPostData.userId ? userPostData.userId : null}
                                //     post_id={userPostData.post_id ? userPostData.post_id : null}
                                //     currentUserName={fname + " " + lname}
                                //     ImageUrl={ShowImage ? ShowImage : null}
                                //     setCommentUpdate={setCommentUpdate}
                                // />
                            }
                        </section>
                    </Card>
                </div>


                {
                    // VisibilityModal && <Model visible={VisibilityModal} visibilityHandle={visibleHandler} setPrivacyToServer={VisibilityChange} privacy={Object.keys(userPostData).length &&userPostData?.privacy} post_id={Object.keys(userPostData).length &&userPostData?.post_id} disabled={disabled} />
                }
                {/* 
                <Tooltips placement="top" ref={buttonRef} className="ml-[5rem]">
                    <TooltipsContent className="flex justify-center md:justify-between  px-[5px] ">
                        <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] sm:w-[3rem] sm:h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0'
                            onClick={"emojiHandle"}
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
                </Tooltips> */}
            </div>

        </>
    )
}

export default SinglePost


function LoaderForPostOperation() {
    return (
        <>
            <ThreeDots color="#00BFFF" height={25} width={25} />

        </>
    )
}