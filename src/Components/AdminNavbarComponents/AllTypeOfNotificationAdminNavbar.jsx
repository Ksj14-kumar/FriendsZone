import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Image from "@material-tailwind/react/Image"
import { NavLink } from "react-router-dom"
import Photos from "../../assets/img/download.png"
import { HiThumbUp } from "react-icons/hi"
import { FaCommentAlt } from "react-icons/fa"
import Axios from 'axios'
function AllTypeOfNotificationAdminNavbar({ AllNotification, setAllNotification }) {


    useEffect(() => {
        async function changeReadReadNotification() {
            console.log("changeReadReadNotification")
            try {
                const value = await Axios({
                    url: `${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/_user/notifications/all/type`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                    }
                })
                setAllNotification(value.data.value?.sort((a, b) => {
                    return b.time - a.time
                }))
            }
            catch (err) {

            }
        }
        changeReadReadNotification()
    }, [])
    return (
        <motion.div className={`group_friends_modal_Notification fixed bg-[#ffffff] md:w-[23rem] w-[26rem] mds-editor36:w-[20rem] mds-editor36:right-[.5rem] top-[4rem] md:top-[4rem] right-[2rem] rounded-md drop-shadow-xl p-4 px-0 pt-2 overflow-x-hidden z-[20] ${AllNotification.length > 5 ? "max-h-[27rem]" : "rounded-md"} overflow-y-auto overflow-x-hidden`}
            initial={{ opacity: 0, y: -10 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            id="allNotification"
        >
            <header className='py-2  w-full rounded-md px-1 text-[1.2rem] font-serif tracking-wider truncate'>Notifications</header>
            <hr className={`bg-[#e9e9e9] ${AllNotification?.length ? "hidden" : "flex"}`} />
            <main className="body mt-2">
                {AllNotification.map((notification, index) => {
                    return (
                        <>
                            <AllNoti notification={notification} key={index} />
                        </>
                    )
                })
                }
            </main>
        </motion.div>
    )
}

export default AllTypeOfNotificationAdminNavbar;


function AllNoti({ notification }) {
    const [blobPost, setPostImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [blobURL, setBlobUrl] = useState("")
    const [profileImageLoading, setProfileImageLoading] = useState(false)

    useEffect(() => {
        async function loadPostImage() {
            try {
                setLoading(true)
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/_user/posts/`, {
                    method: "GET",
                    headers: {
                        // "Content-Type":"application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                        "post": notification.postImagePath
                    }
                })
                const blob = await res.blob()
                if (res.status === 200) {
                    setLoading(false)
                    setPostImage(URL.createObjectURL(blob))
                }
                else if (res.status !== 200) {
                    setLoading(false)
                }
            }
            catch (err) {
            }
        }
        loadPostImage()
    }, [notification])


    useEffect(() => {
        async function loadProfileImage() {
            try {
                if (notification.userPorfile) {
                    setProfileImageLoading(true)
                    const res = await fetch(notification.userPorfile)
                    const blob = await res.blob()
                    setBlobUrl(URL.createObjectURL(blob))
                    setProfileImageLoading(false)
                }
            }
            catch (err) {
                // console.log(err)
            }
        }
        loadProfileImage()
    }, [notification])

    return (
        <>
            {
                notification.type === "like" ?
                    (
                        <>
                            <hr className="bg-[#dfdede]" />
                            <div className="like_wrapper flex justify-evenly mt-1 px-2 py-1">
                                <NavLink to={`/profile/${notification.userLikedId}`}>
                                    <div className="Image_wrapper flex-shrink-0 w-[2.6rem] h-[2.6rem]">
                                        {
                                            notification.userPorfile ?
                                                <Image
                                                    src={notification.userPorfile}
                                                    rounded={true}
                                                    className="rounded-full flex-shrink-0 w-[2.6rem] h-[2.6rem]"
                                                /> : <Image
                                                    src={Photos}
                                                    rounded={true}
                                                    className="rounded-full flex-shrink-0 w-[2.6rem] h-[2.6rem]"
                                                />
                                        }
                                    </div>
                                </NavLink>
                                <div className="message_wrapper w-full select-none ">
                                    <p className='text-[1.2rem]  font-semibold font-serif tracking-wider mds-editor36:text-[1rem]  flex justify-center  truncate'>{notification.name}</p>
                                    <p className="w-full text-[1rem] mds-editor36:text-[.9rem] font-serif tracking-wider flex justify-center  flex-[6] ">like your post</p>
                                </div>
                                <NavLink to={`${process.env.REACT_APP_API_BACKENDURL}/${notification.post_url}`}
                                    style={{
                                        display: "flex",
                                        marginRight: "10px"
                                    }}
                                >
                                    <div className="icon_wrapper flex justify-center items-center w-[3rem]">
                                        <HiThumbUp className="text-[2rem]  text-[#102de8]" />
                                    </div>
                                    <div className="post_image_  flex flex-shrink-0">
                                        {loading ?
                                            <>
                                                <div className="w-[2.9rem] h-[2.9rem] bg-[#dfdfdf] animate-pulse">
                                                </div>
                                            </> :
                                            <Image
                                                src={blobPost}
                                                rounded={false}
                                                className="flex-shrink-0 w-[2.9rem] h-[2.9rem]"
                                            />}
                                    </div>
                                </NavLink>
                            </div>
                            {/* <hr className="bg-[#dfdede]" /> */}
                        </>
                    ) :
                    (
                        notification.type === "comment" ?
                            (

                                <NavLink to={`${notification.post_url}`}>
                                    <hr className="bg-[#c5c3c3]" />

                                    <div className={`comment_wrapper mb-0 flex w-full mt-1  px-2 py-1 ${notification.read === false && "bg-[#d5d5d5]"}`}>
                                        <div className="container02 flex justify-between  w-full">
                                            <div className="image flex flex-[2]  flex-shrink-0">

                                                {notification.UserProfile ? <Image
                                                    src={notification.userPorfile}
                                                    rounded={true}
                                                    className="rounded-full flex-shrink-0 w-[2.6rem] h-[2.6rem]"
                                                /> :
                                                    <Image
                                                        src={Photos}
                                                        rounded={true}
                                                        className="rounded-full flex-shrink-0 w-[2.6rem] h-[2.6rem]"
                                                    />
                                                }
                                            </div>
                                            <p className={`md:flex items-center  flex-[6] flex-wrap px-2 justify-center ${notification.body ? "flex-col" : "flex"}`}>
                                                <span className="text-[1rem] font-serif tracking-wider md:flex  mr-2 font-semibold mds-editor36:text-[1rem] flex justify-center">{notification.name}</span>
                                                <p className="md:text-[1rem] text-[1rem]  mb-1 flex justify-center">
                                                    {notification.messageType === "text" ? (notification.body?.length > 20 ? notification.body.substring(0, 21) + "..." : notification.body) : (
                                                        notification.messageType === "gif" &&
                                                        <>
                                                            <Image
                                                                src={notification.body}
                                                                rounded={true}
                                                                className="rounded-md flex-shrink-0 w-full"
                                                            />
                                                        </>
                                                    )
                                                    }
                                                </p>
                                                <p className="text-[1rem] font-serif  tracking-wider break-all mds-editor36:text-[.9rem]">Comment your post</p>
                                            </p>
                                            <div className="icons_wrappe flex items-center flex-[2] justify-end mr-[3px]">

                                                <div className="icons flex items-center justify-center w-[2rem]">
                                                    <FaCommentAlt className="text-[1.5rem] text-[#0e1178] mr-[1px]" />
                                                </div>
                                                <div className="post_image_  flex-shrink-0 ">
                                                    {loading ?
                                                        <>
                                                            <div className="w-[2.9rem] h-[2.9rem] bg-[#dfdfdf] animate-pulse">
                                                            </div>
                                                        </> :
                                                        <Image
                                                            src={blobPost}
                                                            rounded={false}
                                                            className="flex-shrink-0 w-[2.9rem] h-[2.9rem]"
                                                        />}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* <hr className="bg-[#dfdede]" /> */}
                                </NavLink>

                            ) :
                            (
                                <NavLink to={`${notification.post_url}`}>
                                    <hr className="bg-[#dfdede]" />

                                    <div className={`comment_wrapper mb-0 flex w-full mt-1  px-2 py-1 ${notification.read === false && "bg-[#c5c3c3]"}`}>
                                        <div className="container02 flex justify-between  w-full">
                                            <div className="image flex flex-[2]  flex-shrink-0">

                                                {notification.UserProfile ? <Image
                                                    src={notification.userPorfile}
                                                    rounded={true}
                                                    className="rounded-full flex-shrink-0 w-[2.6rem] h-[2.6rem]"
                                                /> :
                                                    <Image
                                                        src={Photos}
                                                        rounded={true}
                                                        className="rounded-full flex-shrink-0 w-[2.6rem] h-[2.6rem]"
                                                    />
                                                }
                                            </div>
                                            <p className={`md:flex items-center  flex-[6] flex-wrap px-2 justify-center ${notification.body ? "flex-col" : "flex"}`}>
                                                <span className="text-[1rem] font-serif tracking-wider md:flex  mr-2 font-semibold mds-editor36:text-[1rem] flex justify-center">{notification.name}</span>
                                                <p className="md:text-[1rem] text-[1rem]  mb-1 flex justify-center">{notification.body?.length > 20 ? notification.body.substring(0, 21) + "..." : notification.body}</p>
                                                <p className="text-[1rem] font-serif  tracking-wider break-all mds-editor36:text-[.9rem]">reply your comment</p>
                                            </p>
                                            <div className="icons_wrappe flex items-center flex-[2] justify-end mr-[3px]">

                                                <div className="icons flex items-center justify-center w-[2rem]">
                                                    <FaCommentAlt className="text-[1.5rem] text-[#0e1178] mr-[1px]" />
                                                </div>
                                                <div className="post_image_  flex-shrink-0 ">
                                                    {loading ?
                                                        <>
                                                            <div className="w-[2.9rem] h-[2.9rem] bg-[#dfdfdf] animate-pulse">
                                                            </div>
                                                        </> :
                                                        <Image
                                                            src={blobPost}
                                                            rounded={false}
                                                            className="flex-shrink-0 w-[2.9rem] h-[2.9rem]"
                                                        />}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </NavLink>
                            )


                    )


            }

        </>
    )

}













//COMMENT

// UserProfile: "http://res.cloudinary.com/ddnazqja2/image/upload/v1656355088/62b76b70bc29175c979cd22f/profileImage/62b76b70bc29175c979cd22f.jpg"
// commentId: "3i5pq8hlc"
// commentParentId: null
// docIdCommentByUserId: "62b775a33f6edf08ce277a82"
// name: "Yashika Jain"
// notification_id: "xijrw6buukp82paj3zei"
// postId: "1fd8d36d-1b82-4668-a80a-22647374535f"
// postImagePath: "_user/_posts/_62bb59979690362946aedb02/1fd8d36d-1b82-4668-a80a-22647374535f_1656445516628.jpeg"
// post_url: "/user/single/post?post=1fd8d36d-1b82-4668-a80a-22647374535f&&auther=Raghav Rajput"
// read: false
// time: 1656487715664
// type: "comment


// reply comment
// UserProfile: "http://res.cloudinary.com/ddnazqja2/image/upload/v1656355088/62b76b70bc29175c979cd22f/profileImage/62b76b70bc29175c979cd22f.jpg"
// commentId: "dye0n0ok3"
// commentParentId: "twvqsvt4k"
// docIdCommentByUserId: "62b775a33f6edf08ce277a82"
// name: "Yashika Jain"
// notification_id: "stgsmcetoos4rdqsymhgu2"
// postId: "1fd8d36d-1b82-4668-a80a-22647374535f"
// postImagePath: "_user/_posts/_62bb59979690362946aedb02/1fd8d36d-1b82-4668-a80a-22647374535f_1656445516628.jpeg"
// post_url: "/user/single/post?post=1fd8d36d-1b82-4668-a80a-22647374535f&&auther=Raghav Rajput"
// read: false
// time: 1656487910149
// type: "reply"