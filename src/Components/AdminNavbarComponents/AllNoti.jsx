import Image from "@material-tailwind/react/Image"
import { NavLink } from "react-router-dom"
import Photos from "../../assets/img/download.png"
import { HiThumbUp } from "react-icons/hi"
import { FaCommentAlt } from "react-icons/fa"
import React, { useState, useEffect } from "react"
function AllNoti({ notification,theme }) {
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
                            <hr className={`${theme?"bg-[#060606] hidden":"bg-[#c5c3c3]"}`} />
                            <div className={`like_wrapper flex justify-evenly mt-1 px-2 py-1 ${theme?"hover:bg-[#626262]":"hover:bg-[#dbdbdb] "}`}>
                                <NavLink to={`/profile/${notification.userLikedId}`}>
                                    <div className="Image_wrapper flex-shrink-0 w-[2.6rem] h-[2.6rem]">
                                        {
                                            notification.userPorfile ?
                                                <Image
                                                    src={notification.userPorfile}
                                                    rounded={true}
                                                    className={`rounded-full flex-shrink-0 w-[2.6rem] max-h-[2.6rem] ${theme?"outline outline-2 outline-solid outline-offset-2 outline-[#fff]":""}`}
                                                /> : <Image
                                                    src={Photos}
                                                    rounded={true}
                                                    className={`rounded-full flex-shrink-0 w-[2.6rem] max-h-[2.6rem] ${theme?"outline outline-2 outline-solid outline-offset-1 outline-[#fff]":""}`}
                                                />
                                        }
                                    </div>
                                </NavLink>
                                <div className="message_wrapper w-full select-none ">
                                    <p className={`text-[1.2rem]  font-semibold font-serif tracking-wider mds-editor36:text-[1rem]  flex justify-center  truncate ${theme?"text-[#fff]":"text-[#000]"}`}>{notification.name}</p>
                                    <p className={`w-full text-[1rem] mds-editor36:text-[.9rem] font-serif tracking-wider flex justify-center  flex-[6] ${theme?"text-[#fff]":"text-[#020202]"}`}>like your post</p>
                                </div>
                                <NavLink to={`${process.env.REACT_APP_API_BACKENDURL}/${notification.post_url}`}
                                    style={{
                                        display: "flex",
                                        marginRight: "10px"
                                    }}
                                >
                                    <div className="icon_wrapper flex justify-center items-center w-[3rem]">
                                        <HiThumbUp className={`text-[2rem]   ${theme?"text-[#ffffff]":"text-[#102de8]"}`} />
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
                                                className="flex-shrink-0 w-[2.9rem] max-h-[2.9rem]"
                                            />}
                                    </div>
                                </NavLink>
                            </div>
                        </>
                    ) :
                    (
                        notification.type === "comment" ?
                            (
                                <NavLink to={`${notification.post_url}`}>
                                    <hr className={`${theme?"bg-[#000000] hidden":"bg-[#c5c3c3]"}`} />
                                    <div className={`comment_wrapper mb-0 flex w-full mt-1  px-2 py-1 ${notification.read === false && "bg-[#d5d5d5]"} ${theme?"hover:bg-[#2d2d2d]":"hover:bg-[#dbdbdb]"}`}>
                                        <div className="container02 flex justify-between  w-full">
                                            <div className="image flex flex-[2]  flex-shrink-0">
                                                {notification.UserProfile ? <Image
                                                    src={notification.userPorfile}
                                                    rounded={true}
                                                    className={`rounded-full flex-shrink-0 w-[2.6rem] max-h-[2.6rem]  ${theme?"outline outline-2 outline-solid outline-offset-2 outline-[#fff]":""}`}
                                                /> :
                                                    <Image
                                                        src={Photos}
                                                        rounded={true}
                                                        className={`rounded-full flex-shrink-0 w-[2.6rem] max-h-[2.6rem] ${theme?"outline outline-2 outline-solid outline-offset-2 outline-[#fff]":""}`}
                                                    />
                                                }
                                            </div>
                                            <p className={`md:flex items-center  flex-[6] flex-wrap px-2 justify-center ${notification.body ? "flex-col" : "flex"}`}>
                                                <span className={`text-[1rem] font-serif tracking-wider md:flex  mr-2 font-semibold mds-editor36:text-[1rem] flex justify-center ${theme?"text-[#fff]":"text-[#000]"}`}>{notification.name}</span>
                                                <p className={`md:text-[1rem] text-[1rem]  mb-1 flex justify-center ${theme?"text-[#fff]":"text-[#040404]"}`}>
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
                                                <p className={`text-[1rem] font-serif  tracking-wider break-all mds-editor36:text-[.9rem] ${theme?"text-[#fff]":"text-[#000]"}`}>Comment your post</p>
                                            </p>
                                            <div className="icons_wrappe flex items-center flex-[2] justify-end mr-[3px]">
                                                <div className="icons flex items-center justify-center w-[2rem]">
                                                    <FaCommentAlt className={`text-[1.5rem]  mr-[1px] ${theme?"text-[#ffffff]":"text-[#102de8]"}`} />
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
                                    <hr className={`${theme?"bg-[#000000] hidden":"bg-[#c5c3c3]"}`} />
                                    <div className={`comment_wrapper mb-0 flex w-full mt-1  px-2 py-1 ${notification.read === false && "bg-[#c5c3c3]"} ${theme?"hover:bg-[#2d2d2d]":"hover:bg-[#dbdbdb]"}`}>
                                        <div className="container02 flex justify-between  w-full">
                                            <div className="image flex flex-[2]  flex-shrink-0">
                                                {notification.UserProfile ? <Image
                                                    src={notification.userPorfile}
                                                    rounded={true}
                                                    className={`rounded-full flex-shrink-0 w-[2.6rem] max-h-[2.6rem] ${theme?"outline outline-2 outline-solid outline-offset-2 outline-[#fff]":""}`}
                                                /> :
                                                    <Image
                                                        src={Photos}
                                                        rounded={true}
                                                        className={`rounded-full flex-shrink-0 w-[2.6rem] max-h-[2.6rem] ${theme?"outline outline-2 outline-solid outline-offset-2 outline-[#fff]":""} `}
                                                    />
                                                }
                                            </div>
                                            <p className={`md:flex items-center  flex-[6] flex-wrap px-2  justify-center ${notification.body ? "flex-col" : "flex"}`}>
                                                <span className={`text-[1rem] font-serif tracking-wider md:flex  mr-2 font-semibold mds-editor36:text-[1rem] flex justify-center  ${theme?"text-[#fff]":"text-[#000]"}`}>{notification.name}</span>
                                                <p className={`md:text-[1rem] text-[1rem]  mb-1 flex justify-center ${theme?"text-[#fff]":"text-[#000000]"}`}>{notification.body?.length > 20 ? notification.body.substring(0, 21) + "..." : notification.body}</p>
                                                <p className={`text-[1rem] font-serif  tracking-wider break-all mds-editor36:text-[.9rem] ${theme?"text-[#fff]":"text-[#000]"}`}>reply your comment</p>
                                            </p>
                                            <div className="icons_wrappe flex items-center flex-[2] justify-end mr-[3px]">
                                                <div className="icons flex items-center justify-center w-[2rem]">
                                                    <FaCommentAlt className={`text-[1.5rem]  mr-[1px] ${theme?"text-[#ffffff]":"text-[#102de8]"}`} />
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
export default AllNoti = React.memo(AllNoti)