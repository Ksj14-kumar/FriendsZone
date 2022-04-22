import React, { useEffect, useRef, useState } from 'react'
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
import { MdAddComment, MdDelete, MdLock, MdOutlineThumbUpAlt, MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { RiShareFill, RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri';
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
import Pusher from 'pusher-js';
import ReadMore from './ReadMore';
import { Error, Success } from '../Toastify';
import { error } from '../../toastifyMessage/Toast';
import { success } from '../../toastifyMessage/Toast';
import Model from './Model';
import profile from '../../assets/img/download.png'

// Pusher.logToConsole = true;



function PostCard({ item, index, filterPost, socket }) {
    // console.log("user detail with likes", item)
    const [emojiURL, setEmojiURL] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)
    const dispatch = useDispatch()
    const buttonRef = useRef()
    const avatarGroup = useRef()
    const deletePost = useRef()
    const visibilityRef = useRef()
    const [PostIdForDelete, setPostIdForDelete] = useState()
    const [VisibilityModal, setVisibilityModal] = useState()
    const [like, setLike] = useState(false)

    const [likeCount, setLikeCount] = useState(item.liked === null ? 0 : item.liked.length)
    const [userIds, setUserId] = useState([])
    const [readMore, setReadMore] = useState(false);
    const DeletedPost = useRef()
    const ShowImage = useSelector((state) => {
        // console.log("state is ", state)
        return state.ShowImage.value
    })
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    const { _id, fname, lname, googleId, college, city, country, position, stream, aboutMe } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "", googleId: "" }
    function emojiHandle() {
        dispatch({ type: "ADD_EMOJI_URL", paylaod: emojiURL })
    }

    function SetCommentSection(e, id) {
        // console.log(commentToggle, "commnet value")
        if (id) {
            setCommentToggle(!commentToggle)
        }
    }
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^DELETE THE by specific id POST ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    async function DeletePostById(post_id, adminId) {
        //display post after filter data
        const { filterData, filterComments } = filterPost(post_id)
        // console.log("filter data is ", filterData)
        dispatch({ type: "LOAD_POSTS", payload: filterData })
        dispatch({ type: "SET_TOTAL_COMMENT", payload: filterComments })
        // send request to the serve for delete the post by id
        const DeletePostResponse = await fetch(`/blob/delete/user/post/local/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("uuid")
            },
            body: JSON.stringify({ post_id, userId: adminId })
        })

        const { message, data } = await DeletePostResponse.json()



        if (DeletePostResponse.status === 200) {
            success({ message: message })

            //intialize the pusher connection
            // var pusher = new Pusher(process.env.REACT_APP_API_KEY, {
            //     cluster: process.env.REACT_APP_API_CLUSTER,
            //     // encrypted: true,
            // });
            // const LikedPost = pusher.subscribe("DeleteNotiByPost");
            // //this is used for subscribe the channel
            // LikedPost.bind('pusher:subscription_succeeded', function (members) {
            //     // alert('successfully subscribed!');
            // });
            // //get the instance response from server
            // LikedPost.bind("DeleteNotiMessage", (data) => {
            //     console.log("Delete post data.......", data)
            //     dispatch({ type: "Send_Notification", payload: data.allNotiAfterDelete })
            // })

        }
        else if (DeletePostResponse.status !== 200) {
            error("not delete")
        }
    }



    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Change the visibility^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    async function VisibilityChange(post_id, visibility) {
        // console.log("post_id", post_id)
        // console.log("visibility", visibility)
        const response = await fetch(`/blob/visibility/user/post/local/${post_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("uuid")
            },
            body: JSON.stringify({ visibility, uuid: localStorage.getItem("uuid") })
        })
        const data = await response.json()
        console.log("data is ", data)
        if (response.status === 200) {
            success({ message: "Visibility Changed Successfully" })
            dispatch({ type: "LOAD_POSTS", payload: data.data })
        } else if (response.status === 500) {
            error({ message: "Something went wrong" })


        }



    }









    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^>>>> SEND THE REACTION TO Specific I  ID<<<<<<<<<<^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    useEffect(() => {
        //load the like when user refresh the page and show user which post already liked
        setLike(item.liked.includes(googleId))
    }, [item.liked, _id])
    //function which excute when current user liked it any post
    async function callLikeHnadler(userId, post_id, bgImageUrl, profileImage) {
        try {
            console.log("userId", userId)
            console.log("post_id", post_id)
            console.log("goodle id", googleId)


            const result = await axios.put(`/blob/user/like/${post_id}`, {
                likedBy: googleId,
                likeTo: userId,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")

                }
            })
            // console.log({ result })

            //connect to socket
            // //intialize the pusher connection
            // var pusher = new Pusher(process.env.REACT_APP_API_KEY, {
            //     cluster: process.env.REACT_APP_API_CLUSTER,
            //     // encrypted: true,
            // });
            // const LikedPost = pusher.subscribe("LikePost");
            // //this is used for subscribe the channel
            // LikedPost.bind('pusher:subscription_succeeded', function (members) {
            //     // alert('successfully subscribed!');
            // });
            // //get the instance response from server
            // LikedPost.bind("LikePostMessage", (data) => {
            //     console.log("liked poost data.......", data)
            //     dispatch({ type: "Send_Notification", payload: data.allNoti })
            // })

            socket.emit("like", {
                likedBy: googleId,
                likeTo: userId,
                post_id,
                bg: bgImageUrl,
                profile: profileImage,
                type: like

            })
            like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
        } catch (err) {
            like ? setLike(false) : setLike(true)
            like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
        }
    }



    //visiblity handler
    async function visibleHandler(con) {
        setVisibilityModal(false)
    }

    console.log({ VisibilityModal })

    return (
        <>
            {/* post-screen:mt-[32rem] mt-[26rem] md:pl-48 md:mt-[18rem] relative sm-[25rem] */}
            <div className="post-card flex justify-around md:pl-[25rem] md:pr-[10.4rem] md:mb-[5rem] -mb-[3rem]    lg:mt-[11rem] post  w-full ">
                <Card className="post   -mt-[9rem] p-0">
                    {/* <CardHeader color="lightBlue" size="lg">
      <H5 color="white">Login</H5>
        </CardHeader> */}
                    <CardBody >
                        <div className="flex justify-center ">
                            {/* <H6 color="gray" >Create Post</H6> */}
                        </div>
                        <section className='header-image-section post rounded-lg  flex justify-between' >
                            <main className='flex  join-of-name-select-option post '>
                                <article className='
                              card-post-image-modal w-[3rem]  h-[3rem] rounded-full flex-shrink-0 pos
                              '>
                                    {
                                        item.profileImage ?
                                            <Image
                                                src={item.profileImage}
                                                rounded={true}
                                                raised={false}
                                                alt="Rounded Image"
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
                                        {item.username ? item.username : "NA"}
                                        {/* <p> Dunga Ram</p> */}
                                    </article>
                                    <article className='flex'>
                                        {/* {new Date(Date.now()).toDateString()} */}
                                        {item.createdAt}
                                        {
                                            item.privacy === "public" ?
                                                <IoEarth className='mt-[4px] ml-[.3rem]' /> : <MdLock className='mt-[4px] ml-[.3rem]' />
                                        }
                                    </article>
                                </article>
                            </main>
                            {
                                item.userId === googleId &&
                                <section className=" flex justify-center align-middle" ref={deletePost}

                                >
                                    <button className=' focus:border-0 border-0 focus:outline-0 outline-none -mt-2 '>
                                        <BsThreeDotsVertical className='text-[1.5rem]' />
                                    </button>
                                </section>
                            }
                        </section>
                        {/* <main className='  w-full mt-[2rem]'> */}
                        <section className='text-caption ml-2  mt-[2rem]   px-[1rem]  text-[1.3rem] md:text-lg '>
                            {/* {
                                item.text
                            } */}
                            {/* {readMore && item.text.slice(0, 150)}
                            <a className="read-more-link" onClick={() => { setReadMore(!readMore) }}><h2>{readMore ? 'Read Less << ' : 'Read More >> '}</h2></a> */}
                            <ReadMore children={item.text} />
                            {/* {console.log("readmore text for the pucloic ", item.text)} */}
                            {/* <ReadMoreReact text={item.text}
                                min={80}
                                ideal={100}
                                max={200}
                                readMoreText={<p color="lightBlue" className="cursor-pointer  text-xl font-medium">Read more</p>}
                            /> */}
                        </section>
                    </CardBody>
                    <section className='image section mt-[.8rem]   relative w-full bg-red-600    '>
                        {
                            item.fileType === "video" ?
                                (item.image ?
                                    <iframe className="w-full h-full" src={item.image} frameBorder="1" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                    : "")
                                :
                                (item.image ?
                                    <Image
                                        src={item.image}
                                        rounded={false}
                                        raised={false}
                                        className="w-full rounded-none"
                                    />
                                    : "")
                        }
                    </section>
                    <CardFooter className="like and dislike section flex justify-start py-0  mb-[.8rem] ">
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
                                // ref={buttonRef}
                                onClick={() => {
                                    callLikeHnadler(item.userId, item.post_id, item.image, item.profileImage)
                                    setUserId([item.userId, item.post_id]);
                                    setLike(!like)
                                }}
                            >
                                {/* //load all the likes */}
                                {
                                    like ? <RiThumbUpFill className='text-[1.5rem] md:text-[2rem] text-blue-600' /> : <MdOutlineThumbUpAlt className="text-[1.5rem] md:text-[2rem] text-red-500" />
                                }
                                <small className="text-[1.1rem]">
                                    {
                                        likeCount
                                    }
                                </small>
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
                                <MdAddComment />
                                {/* <span className='md:text-[1.2rem] md:mb-[5px] text-[.9rem] mb-[4px] text-medium'>{}</span> */}

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
                                    console.log(item.post_url)
                                }}
                            >
                                <RiShareFill />
                            </Button>
                        </section>
                    </CardFooter>
                    <hr className='-mt-[.8rem]' />
                    <section className="comment-section  mt-2">
                        {/* // {item.post_id} */}
                        {
                            // commentToggle ? <CommentSection /> : ""
                            (commentToggle ? (UserInformationLoad ?
                                <Comments
                                    commentsUrl="http://localhost:3004/comments"
                                    // currentUserId={item.userId ? item.userId : null}
                                    commentToggle={commentToggle}
                                    currentUserId={googleId ? googleId : null}
                                    post_id={item.post_id ? item.post_id : null}
                                    UserIdForPostComments={item.userId ? item.userId : null}
                                    currentUserName={fname + " " + lname}
                                    ImageUrl={ShowImage ? ShowImage : null}
                                /> : Error({ message: "Kindly, Create Profile" })) : "")
                        }
                    </section>
                </Card>
            </div>


            <Popover placement="auto" ref={deletePost}>
                <PopoverContainer>
                    <PopoverHeader>
                        {/* <H6 className="text-center">Delete Post</H6> */}
                    </PopoverHeader>
                    <PopoverBody>
                        <div className="container1 flex flex-col justify-center -mt-3">
                            <section className=" flex  justify-between cursor-pointer align-baseline hover:bg-red-700 hover:rounded-lg hover:text-white px-6 py-2"
                                ref={DeletedPost}
                                onClick={(e) => {
                                    e.preventDefault();

                                    DeletePostById(item.post_id, item.userId);
                                    setPostIdForDelete(item.post_id);
                                    // console.log(e.target.id)
                                    // alert("hello")
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
                                    // VisibilityChange(item.post_id, item.privacy);
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




            {
                VisibilityModal && <Model visible={VisibilityModal} visibilityHandle={visibleHandler} setPrivacyToServer={VisibilityChange} privacy={item.privacy} post_id={item.post_id} />
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