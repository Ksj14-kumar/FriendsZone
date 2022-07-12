import React, { useEffect, useRef, useState } from 'react'
import Image from "@material-tailwind/react/Image";
import { useDispatch, useSelector } from 'react-redux'
import { AiTwotoneLike } from 'react-icons/ai';
import { MdOutlineQuickreply } from 'react-icons/md';
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipContents from "@material-tailwind/react/TooltipsContent";
import { MdSend } from "react-icons/md"
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import img1 from '../../assets/img/team-1-800x800.jpg';
import img2 from '../../assets/img/team-1-800x800.jpg';
import img3 from '../../assets/img/team-1-800x800.jpg';
function CommentSection() {
    // ALL STATE HANDLER
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    const ProfileImage = useSelector((state) => {
        return state.uploadImageDataFrom[0].url
    })
    const [testAreaValue, setTextAreaValue] = useState()
    const [likeValue, setLikeValue] = useState(false)
    const [toggleReply, setToggleReply] = useState(false)
    const [testValue, setTestValue] = useState({
        name: UserInformationLoad.fname ? UserInformationLoad.fname : "",
        time: new Date(Date.now()).toDateString().split(" ")[2] + " " + new Date(Date.now()).toDateString().split(" ")[1] + " " + new Date(Date.now()).toDateString().split(" ")[3],
        userId: UserInformationLoad.id ? UserInformationLoad.id : "",
        comment: "",
        profileImage: ProfileImage ? ProfileImage : "",
    }
    )
    const [textReply, setReplyText] = useState({
        name: UserInformationLoad.fname ? UserInformationLoad.fname : "",
        time: new Date(Date.now()).toLocaleString(),
        userId: UserInformationLoad.id ? UserInformationLoad.id : "",
        comment: "",
        profileImage: ProfileImage ? ProfileImage : "",
    })
    const [arrayUserComment, setArrayUserComment] = useState([])
    const [arrayReplyComment, setArrayReplyComment] = useState([])
    const likeButton = useRef()
    const buttonRef = useRef()
    const replyFocus = useRef(null)
    const replyButtonTarget = useRef(null)
    const arrayPost = [
        { name: "SANJU", comment: "Hii, Sanju", profileImage: img1 },
        { name: "Mohit Raj", comment: "Hii, Mohit", profileImage: img2 },
        { name: "Chitransh", comment: "Hii, Chitransh", profileImage: img2 },
    ]
    // ALL USE SELECTORE AND DISPATCHES
    const LikeReduxCounter = useSelector((state) => {
        return state.LikeRedux
    })
    const dispatch = useDispatch()
    //ALL HANDLE FUNCTIONS
    function setColorLikeButton(e) {
        if (likeValue) {
            likeButton.current.children[0].style.color = "blue"
            setLikeValue(false)
        }
        else {
            likeButton.current.children[0].style.color = "black"
            setLikeValue(true)
        }
    }
    function replyFocusOnInput(e) {
       
    }
    function likeCounterHandle(e) {
        if (likeValue) {
            dispatch({ type: "LIKE" })
        }
        else {
            dispatch({ type: "DISLIKE" })
        }
    }
    //USER COMMENT HANDLER
    function PostCommentHandler(e) {
        if (testValue.comment.length > 0) {
            setArrayUserComment([...arrayUserComment, testValue])
        }
    }
    function TextAreaValueHandler(e) {
    }
    let name
    let value
    function CommentHandler(e) {
        name = e.target.name
        value = e.target.value
        setTestValue({ ...testValue, [name]: value })
    }
    //REPLY HANDLE 
    function replyHandle(e) {
        if (textReply.replyComment.length > 0) {
            setArrayReplyComment([...arrayReplyComment, textReply])
        }
    }
    function ReplyTextAreaValueHandler(e) {
        name = e.target.name
        value = e.target.value
        setReplyText({ ...textReply, [name]: e.target.value })
    }
    ///ADD THE COMMENT INTO DATABASE
    useEffect(() => {
        async function PostComment() {
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/comment/posts`, {
                method: "POST",
                body: JSON.stringify(arrayUserComment),
                headers: {
                    "Content-Type": "application/json",
                }
            })
        }
    }, [arrayUserComment])
    return (
        <>
            <main className=''>
                <div className="write-comment-section   boreder flex-wrap">
                    <div className="name profile_image flex  align-middle ">
                        <section className='header-image-section ml-[.7rem] mt-[3px] '>
                            <article className='
                                    card-post-image-modal w-[3.3rem]  h-[3.3rem] 1sm:w-[2.6rem] 1sm:h-[2.6rem] rounded-full flex-shrink-0
                                    '>
                                <Image
                                    src={img3}
                                    rounded={true}
                                    raised={false}
                                    alt="Rounded Image"
                                    className="w-full h-full"
                                />
                            </article>
                        </section>
                        <section className='comment-image-section  w-full md:mr-[4rem] flex-wrap'>
                            <main className='flex  join-of-name-select-option bg-gray-300 rounded-lg ml-[8px] mb-[3px] pb-[.5rem] flex-wrap'>
                                <article className=' public-name-article ml-[.5rem] -mt-[.4rem]   h-full '>
                                    <article className='text-black md:text-xl mt-[3px] md:mt-[0] flex align-middle '>
                                        <p className='font-bold'>Dunga Ram</p>  <p className='ml-2 text-sm 
                                                    mt-[.2rem] font-semibold
                                                    '>{new Date(Date.now().toLocaleString())}</p>
                                    </article>
                                    <article className='comment-message'>
                                    </article>
                                </article>
                            </main>
                            <section className='like and  reply  flex justify-evenly md:justify-center md:ml-[6rem] mb-[5px] pb-[8px]'>
                                <div className="like-section cursor-pointer sm:mr-[4rem] md:-ml-[8rem] "
                                    onClick={(e) => {
                                        setLikeValue(!likeValue)
                                        setColorLikeButton(e)
                                        likeCounterHandle(e)
                                    }}
                                    ref={likeButton}
                                >
                                    <AiTwotoneLike className='text-black text-[1.5rem] md:text-[2rem]'
                                    />
                                </div>
                                <div className="reply-section md:ml-[5rem] -ml-[5rem] cursor-pointer sm:ml-[5rem]"
                                    onClick={() => {
                                        replyFocusOnInput()
                                        setToggleReply(
                                            // !toggleReply
                                            true
                                        )
                                    }}
                                >
                                    <MdOutlineQuickreply className='text-black text-[1.5rem] md:text-[2rem]
                                                ' />
                                </div>
                            </section>
                            <div className="replyContainer flex">
                                <section className='header-image-section ml-[.5rem] mt-[3px] md:ml-[4rem] '>
                                    <article className='
                                card-post-image-modal w-[2.3rem]  h-[2.3rem] 1sm:w-[2.6rem] 1sm:h-[2.6rem] rounded-full flex-shrink-0
                                '>
                                        <Image
                                            src={img1}
                                            rounded={true}
                                            raised={false}
                                            alt="Rounded Image"
                                            className="w-full h-full"
                                        />
                                    </article>
                                </section>
                                <section className='comment-image-section  w-full mr-[4rem] flex-wrap '>
                                    <main className='flex  w-full join-of-name-select-option  rounded-lg ml-[8px] mb-[3px] pb-[.5rem] md:w-full
                                                                    mds-editor3:w-auto bg-gray-200'>
                                        <article className=' public-name-article ml-[.5rem] 
                                                        -mt-[.4rem]   w-full h-full'>
                                            <article className='text-black text-sm mt-2 font-semibold'>
                                                <p>Ram</p>
                                            </article>
                                            <article className='comment-message'>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </article>
                                        </article>
                                    </main>
                                    <section className='like and  reply  flex md:justify-center
                                                        justify-around  
                                                          md:ml-[8rem] mb-[5px] pb-[8px]'>
                                        <div className="like-section cursor-point
                                                            er sm:mr-[4rem] md:-ml-[5rem] cursor-pointer"
                                            onClick={(e) => {
                                                setLikeValue(!likeValue)
                                                setColorLikeButton(e)
                                                likeCounterHandle(e)
                                            }}
                                            ref={likeButton}
                                        >
                                            <AiTwotoneLike className='text-black text-[1rem] md:text-[1.5rem] '
                                            />
                                        </div>
                                        <div className="reply-section md:ml-[3rem] -ml-[5rem]  sm:ml-[5rem] cursor-pointer
                                                                        mds-editor3:ml-[1rem]
                                                                        "
                                            onClick={() => {
                                                replyFocusOnInput()
                                                setToggleReply(
                                                    true
                                                )
                                            }}
                                            ref={replyButtonTarget}
                                        >
                                            <MdOutlineQuickreply className='text-black text-[1rem] md:text-[1.5rem]' />
                                        </div>
                                    </section>
                                </section>
                            </div>
                            {/* // REPLY COMMENT TEXT AREA */}
                            {
                                toggleReply &&
                                <div className="comment-reply flex md:ml-[3.5rem] ml-[0] mb-[.5rem]" >
                                    <section className='header-image-section ml-[.3rem] flex  '>
                                        <article className='
                                    card-post-image-modal w-[2.5rem]  h-[2.5rem] rounded-full flex-shrink-0
                                    '>
                                            <Image
                                                src={ProfileImage}
                                                rounded={true}
                                                raised={false}
                                                alt="Rounded Image"
                                                className="w-full h-full"
                                            />
                                        </article>
                                    </section>
                                    <section className='input-field-section mt-[.3rem]  border flex align-middle justify-center w-full rounded-[50px] ml-[.5rem] my-[.2rem] mr-[1rem]
                                focus:border-none
                                     '>
                                        <input
                                            type="text"
                                            className="reply w-full h-full 
                                            rounded-[50px]
                                            indent-4
                                            bg-gray-300
                                            hover:border-none
                                            focus:border-none
                                            "
                                            id="mytextarea"
                                            name="replyComment"
                                            value={textReply.replyComment}
                                            onChange={(e) => {
                                                ReplyTextAreaValueHandler(e)
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    replyHandle(e)
                                                }
                                            }}
                                            placeholder="Reply .... "
                                        />
                                    </section>
                                </div>
                            }
                        </section>
                    </div>
                </div >
                )
                {/* //THIS IS WRITE COMMENT SECTION  */}
                <div className="write-comment-section flex  align-middle  boreder ">
                    <section className='header-image-section ml-[.3rem] '>
                        <article className='
                                    card-post-image-modal w-[2.8rem]  h-[2.8rem] rounded-full flex-shrink-0
                                    '>
                            {
                                ProfileImage ?
                                    <Image
                                        src={ProfileImage}
                                        rounded={true}
                                        raised={false}
                                        alt="Rounded Image"
                                        className="w-full h-full"
                                    /> : ""
                            }
                        </article>
                    </section>
                    <section className='input-field-section mt-[.3rem]  border flex align-middle md:justify-center w-full rounded-[50px] ml-[.5rem] my-[.2rem] bg-gray-200
                focus:border-none
                '>
                        <input
                            type="text"
                            className="  w-full h-full 
                        rounded-[50px]
                        indent-4
                        bg-gray-200
                        hover:border-none
                        focus:border-none
                        border-none
                        "
                            id="mytextarea"
                            rows="1"
                            cols='1'
                            name="comment"
                            value={testValue.comment}
                            onChange={CommentHandler}
                            defaultValue=""
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    PostCommentHandler(e)
                                }
                            }}
                            placeholder="Write comment...."
                        />
                        <Button
                            color="gray"
                            buttonType="filled"
                            size="reguler"
                            rounded={true}
                            block={false}
                            iconOnly={true}
                            ripple=""
                            className="border-none absolute right-[37px] -mt-[2px] sm:mr-[1.8rem]   h-[2.4rem] ml-[18px]  bg-inherit hover:bg-inherit hover:shadow-none shadow-none md:-mr-[2.2rem] mdx-editor:mr-[4.5rem] mdx-editor1:mr-[0.5rem] mdx-editor2:mr-[2rem]   flex mds-editor2:-mr-[.8rem] mds-editor2:flex justify-end  mds-editor3:-mr-[2.5rem] mdx-editor5:mr-[5rem] focus:bg-none focus:border-0  hover:bg-none hover:border-none blur:border-none blur:bg-none  bg-none "
                            onClick={PostCommentHandler}
                        >
                            <Icon name={<MdSend className='text-black z-50 text-[1.5rem] md:text-[2rem]  ' />} size="sm" />
                        </Button>
                    </section>
                </div>
            </main >
            <Tooltips placement="top" ref={buttonRef}>
                <TooltipContents>Tooltip top</TooltipContents>
            </Tooltips>
        </>
    )
}

export default CommentSection