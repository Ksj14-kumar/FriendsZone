import React, { useEffect } from 'react'
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Button from "@material-tailwind/react/Button";
import Image from "@material-tailwind/react/Image";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import ProfileLoader from '../../Loader/ProfileLoader';
import DefaultProfile from "../../assets/img/download.png"

import Icon from "@material-tailwind/react/Icon";
import ProgressBar from '../ProgressBar';
import SelectedImageShowWithURL from './SelectedImageShowWithURL';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { MdAddToPhotos, MdRssFeed } from 'react-icons/md';
import { RiVideoAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import { error, success } from "../../toastifyMessage/Toast"
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import { ThreeDots } from "react-loader-spinner"
import { IoVideocam } from 'react-icons/io5';


function useOutsideAlerter(ref, setTextAreaValue, dispatch, setUrlOfImageUpload, setPostLoader) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                // console.log("click outside the woindow")
                // setTextAreaValue("")
                // setUrlOfImageUpload("")
                // dispatch({ type: "UNSELECT_POST_IMAGE", payload: "" })
                setPostLoader(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setPostLoader]);
}
function AddPost({ setAllPosts, socket,theme }) {
    //all state start
    const wrapperref = React.useRef()
    const [showModal, setShowModalCode] = React.useState(false);
    const [showModalVideo, setShowModalCodeVideo] = React.useState(false);
    const [showModalPhoto, setShowModalCodePhoto] = React.useState(false);
    const [showModalText, setShowModalCodeText] = React.useState(false);
    const [emojiModal, setEmojiModal] = React.useState(false);
    const [textareaValue, setTextAreaValue] = React.useState("")
    const [ImageUrl, setUrlOfImageUpload] = React.useState("")
    const [PrivateOrPublic, setPrivateOrPublic] = React.useState("public")
    const [userPost, setPost] = React.useState("")
    const [ImageAsUrl, setImageAsUrl] = React.useState("")
    const [fileType, setFileType] = React.useState(null);
    const [SelectedFile, setFile] = React.useState(null);
    const [groupDisable, setDisabledGroup] = React.useState(false);
    const [videoDisable, setDisabledVideo] = React.useState(false);
    const [photosDisable, setDisabledPhotos] = React.useState(false);
    const [textDisable, setDisabledText] = React.useState(false);
    const [postLoader, setPostLoader] = React.useState(false)
    const photosRef = React.useRef()
    const videoRef = React.useRef()
    const rssRef = React.useRef()
    const textRef = React.useRef()
    const inputFileRef = React.useRef()
    const VideoModelRef = React.useRef()
    //all reducer start from here
    const dispatch = useDispatch()

    const DispatchProfileImage = useSelector((state) => {
        return state.ShowImage.value
    })
    useOutsideAlerter(wrapperref, setTextAreaValue, dispatch, setUrlOfImageUpload, setPostLoader)
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    const UnselectPostImage = useSelector((state) => {
        return state.UnselectPostImage.value
    })


    const loader = useSelector((state) => {
        return state.LoaderRedux
    })

    const OriginalProfileURL = useSelector((state) => {
        return state.OriginalProfileURL
    })
    // OriginalProfileURL
    // const {_id}= UserStillLogin
    const _id = localStorage.getItem("uuid")
    const { fname, lname } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "" }
    const name = `What is your in mind Today ? ${fname ? fname.toLowerCase() : "NA"}`
    const name1 = `Say Something About your post if.  👀   ${fname ? fname.toLowerCase() : "NA"}`
    const name2 = `Say Something About your video if.   ${fname ? fname.toLowerCase() : "NA"}`

    let signal;
    let controller = new AbortController()
    signal = controller.signal
    //Hndle funtion start from here
    // ====================================================selected mixed post=======================
    function SelectImage(e) {
        const file = e.target.files[0]
        // console.log("user selected post", file)
        if (file.size < 104857600) {
            // set the size limit to 16MB
            if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/*" || file.type === "video/*" || file.type === "video/mp4") {
                if (file.type === "video/mp4") {
                    dispatch({ type: "SELECT_POST_VIDEO", payload: "video" })
                    setFileType("video")
                    const createImageURL = URL.createObjectURL(file)
                    // console.log("createImageURL", createImageURL)
                    setImageAsUrl(createImageURL)
                    setUrlOfImageUpload(createImageURL)
                    dispatch({ type: "SELECTED_POST_IMAGE", payload: createImageURL })
                    const reader = new FileReader();
                    reader.readAsDataURL(file)
                    reader.onloadend = function () {
                        setPost(reader.result)
                    }
                }
                else {
                    dispatch({ type: "SELECT_POST_VIDEO", payload: "image" })
                    setFileType("image")
                    const createImageURL = URL.createObjectURL(file)
                    // console.log("createImageURL", createImageURL)
                    setImageAsUrl(createImageURL)
                    setUrlOfImageUpload(createImageURL)
                    dispatch({ type: "SELECTED_POST_IMAGE", payload: createImageURL })
                    const reader = new FileReader();
                    reader.readAsDataURL(file)
                    reader.onloadend = function () {
                        setPost(reader.result)
                    }
                    return
                }
            }
            else {
                setFile(inputFileRef.current.value)
                error({ message: "please select only video or Image" })
                inputFileRef.current.value = ""
                setTextAreaValue("")
                setFile(inputFileRef.current.value)
                setTextAreaValue("")
                return
            }
        }
        else {
            setFile(inputFileRef.current.value)
            error({ message: "file size is too large" })
            inputFileRef.current.value = ""
            setTextAreaValue("")
            setFile(inputFileRef.current.value)
            return
        }
    }
    //==========================================select video==========================
    function SelectVideo(e) {
        const file = e.target.files[0]
        if (file.size < 104857600) {
            // set the size limit to 16MB
            if (file.type === "video/*" || file.type === "video/mp4") {
                dispatch({ type: "SELECT_POST_VIDEO", payload: "video" })
                setFileType("video")
                setFile(videoRef.current.value)
                const createImageURL = URL.createObjectURL(file)
                // console.log("createImageURL", createImageURL)
                setImageAsUrl(createImageURL)
                setUrlOfImageUpload(createImageURL)
                dispatch({ type: "SELECTED_POST_IMAGE", payload: createImageURL })
                const reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onloadend = function () {
                    setPost(reader.result)
                }
                return
            }
            else {
                // console.log("video", videoRef.current.value)
                setTextAreaValue("")
                videoRef.current.value = ""
                error({ message: "please select only video" })
                setFile(videoRef.current.value)
                // console.log("video2", videoRef.current.value)
                return
                // alert("please seletc only video")
            }
        }
        else {
            // console.log("video", videoRef.current.value)
            error({ message: "file size is too large" })
            videoRef.current.value = ""
            setTextAreaValue("")
            // console.log("video2", videoRef.current.value)
            setFile(videoRef.current.value)
        }
    }
    // ======================================SELECTE THE PHOTOS POST===============================
    function SelectPhotos(e) {
        const file = e.target.files[0]
        // console.log("user selected post", file)
        if (file.size < 104857600) {
            // set the size limit to 16MB
            if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/*") {
                dispatch({ type: "SELECT_POST_VIDEO", payload: "image" })
                setFileType("image")
                setFile(photosRef.current.value)
                const createImageURL = URL.createObjectURL(file)
                // console.log("createImageURL", createImageURL)
                setImageAsUrl(createImageURL)
                setUrlOfImageUpload(createImageURL)
                dispatch({ type: "SELECTED_POST_IMAGE", payload: createImageURL })
                const reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onloadend = function () {
                    setPost(reader.result)
                }
                return
            }
            else {
                setFile(photosRef.current.value)
                error({ message: "please select only image" })
                photosRef.current.value = ""
                setTextAreaValue("")
                setFile(photosRef.current.value)
                return
            }
        }
        else {
            error({ message: "file size is too large" })
            photosRef.current.value = ""
            setTextAreaValue("")
            setFile(photosRef.current.value)
        }
    }
    // ============================================SELECT THE TEXT FOR POST======================
    function SelectTextHandle(e) {
        setTextAreaValue(e.target.value)
    }
    //tempary files
    const uploadLoaderBackground = false
    const progressMessageBackground = ""
    const onEmojiClick = (event, emojiObject) => {
        setTextAreaValue((pre) => pre + emojiObject.emoji)
    };
    //Upload the post---------------------------------------To the server-------------
    async function SubmitPost(e) {
        if (!textareaValue && !UnselectPostImage) {

            return
        }
        else {

            setDisabledGroup(true)
            setDisabledPhotos(true)
            setDisabledText(true)
            setDisabledVideo(true)
            setPostLoader(true)
            setDisabledGroup(true)
            // /api/v1/_user/single/post/
            // local/url/
            const SaveUserPostIntoDb = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/_user/single/post/`, {
                method: "POST",
                signal: signal,
                body: JSON.stringify({
                    text: textareaValue,
                    // image: ImageAsUrl,
                    image: userPost,
                    privacy: PrivateOrPublic,
                    post_id: uuidv4(),
                    fileType: fileType,
                    name: fname + " " + lname,
                    // userProfileImageUrl: DispatchProfileImage,
                    userProfileImageUrl: OriginalProfileURL,
                    // likes_count: 100,
                    time: Date.now(),
                    uuid: _id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                }
            })
            // const { status, data } = SaveUserPostIntoDb
            const SaveUserPostIntoDbJson = await SaveUserPostIntoDb.json()
            // setTextAreaValue("")
            // const SaveUserPostIntoDbJson = await SaveUserPostIntoDb.json()
            if (SaveUserPostIntoDb.status === 200) {
                success({ message: "posted successfully" })
                setDisabledGroup(false)
                setDisabledPhotos(false)
                setDisabledText(false)
                setDisabledVideo(false)
                setPostLoader(false)

                dispatch({ type: "UNSELECT_POST_IMAGE", payload: "" })
                setTextAreaValue("")
                setFileType("")
                setTextAreaValue("")
                setPost("")

                //==========================================SEND ALL POSTS USING REDUX =================
                // dispatch({
                //     type: "LOAD_POSTS",
                //     payload: SaveUserPostIntoDbJson.data
                // })

                //SEND POST USING SOCKET.IO 
                // if (socket.connected) {
                //     // SaveUserPostIntoDbJson.data

                //     socket?.emit("Send_Posts", SaveUserPostIntoDbJson.data)
                // }
                // else {
                setAllPosts((prev) => {

                    return prev ? [SaveUserPostIntoDbJson.data, ...prev] : [SaveUserPostIntoDbJson.data]
                })
                // }


                // window.location.reload()


            }

            else if (SaveUserPostIntoDb.status === 500) {
                error({ message: SaveUserPostIntoDbJson.message })
                setDisabledGroup(false)
                setDisabledPhotos(false)
                setDisabledText(false)
                setDisabledVideo(false)
                setPostLoader(false)
                setPost("")
            }
            else if (SaveUserPostIntoDb.status !== 200 && SaveUserPostIntoDb.status !== 500) {
                setPost("")
                // Error({ message: "This Post is Already exit.." })

                // inputFileRef.current.value = ""
                // videoRef.current.value = ""
                // textRef.current.value = ""
                // photosRef.current.value = ""
                // setTextAreaValue("")
                // setPostLoader(false)
                // setFile(inputFileRef.current.value)
                // setFile(photosRef.current.value)
                // setFile(videoRef.current.value)
                // setFile(textRef.current.value)
                setDisabledGroup(false)
                setDisabledPhotos(false)

                setDisabledText(false)
                setDisabledVideo(false)
                setTextAreaValue("")
                setFileType("")
            }
        }
    }
    function GetPrivatORPublic(e) {
        setPrivateOrPublic(e.target.value)
    }
    //clear the content of each model when user click outside of the model
    useEffect(() => {
        if ((VideoModelRef.current.contains(document.activeElement) === false) || (photosRef.current.contains(document.activeElement) === false)
            || (textRef.current.contains(document.activeElement) === false) || (wrapperref.current.contains(document.activeElement) === false)
        ) {

            setDisabledGroup(false)
            setDisabledPhotos(false)
            setDisabledText(false)
            setDisabledVideo(false)
            // alert("click")
            // profileInput.current.value = null
            dispatch({ type: "SELECTED_POST_IMAGE", payload: "" })
            dispatch({ type: "UNSELECT_POST_IMAGE", payload: "" })
            setTextAreaValue("")
            setPostLoader(false)
            //abort the request
            controller.abort()

        }
    }, [showModalPhoto, showModal, showModalVideo, showModalText, dispatch])
    //============================================MODAL FOR Photos===================
    return (
        <>
            <div className="post-card flex justify-around relative">
                {/* ===================POST CARD PAGE ========================*/}
                <Card className={`inner-post-card  shadow-lg h-[12rem] ${theme?"bg-[#272727] drop-shadow-lg":"bg-[#fff]"}`}>

                    <CardBody>
                        <div className="flex justify-center ">
                            <H6 color={`${theme?"white":"gray"}`} >Create Post</H6>
                        </div>
                        <div className="inner-body  flex mds-editor7:-ml-[.5rem] ">
                            {/* d9d9d9 */}
                            <div className={`card-post-image bg-[#d9d9d9]  w-[4rem] h-[4rem] rounded-full flex-shrink-0 mds-editor7:w-[3rem] mds-editor7:h-[3rem] ${loader ? "animate-pulse" : ""}`}>
                                {

                                    DispatchProfileImage !== "" ? <Image
                                        src={DispatchProfileImage}
                                        rounded={true}
                                        raised={false}
                                        alt=""
                                        className={`w-full h-full ${theme?"outline outline-1 outline-offset-2 outline-[#fcfbfb] outline-solid":""}`}
                                    /> : <Image
                                        src={DefaultProfile}
                                        rounded={true}
                                        raised={false}
                                        alt=""
                                        className={`w-full h-full ${theme?"outline outline-1 outline-offset-2 outline-[#fcfbfb] outline-solid":""}`}
                                    />
                                }
                            </div>
                            <div className="post-text-container  ml-[1rem]    mr-[3rem] relative flex w-full flex-wrap items-stretch  mb-3 mds-editor7:mb-2">
                                <button type="button"
                                    className=" py-4  
                                 Gray-600     border shadow 
                                outline-none   w-full pl-10
                                indent-5 rounded-[15px]
                                px-[10rem]
                                indent-none
                                cursor-pointer
                                caret-transparent	
                                hover:outline-none
                                text-gray-400
                                flex-shrink-0
                                mds-editor7:px-[5rem]
                                mds-editor7:py-3
                                focus:outline-none
                                
                                "
                                    onClick={(e) => {
                                        if (UserInformationLoad) {
                                            setShowModalCode(true)
                                        }
                                        else {
                                            error({ message: "Kindly, Create Profile" })
                                            // alert("please create profile")
                                        }
                                    }
                                    }
                                >Today?</button>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="   flex justify-around -mt-[2rem]   pb-[2rem] " role="group">
                        <div className="photos ">
                            <Button color="#ECECEC" size="regular" 
                            className={`px-[2.5rem] md:px-[3.5rem] border-none   ${theme?"bg-[#122d92]":"bg-[#151D3B]"} text-2xl
                            mds-editor7:px-[2rem]
                            mds-editor7:py-2                            mds-editor7:text-xl
                            mds-editor7:mt-[.8rem]`}
                                onClick={(e) => setShowModalCodePhoto(true)}
                                ripple="light"
                                ref={photosRef}
                            >
                                <MdAddToPhotos />
                            </Button>
                        </div>
                        <Tooltips placement="top" ref={photosRef}>
                            <TooltipsContent className="text-black">Upload Photos
                            </TooltipsContent>
                        </Tooltips>
                        <div className="video">
                            <Button color="" size="regular" 
                            className={`px-[2.5rem] md:px-[3.5rem]   text-2xl ${theme?"bg-[#122d92]":"bg-[#151D3B]"}
                            mds-editor7:px-[2rem]
                            mds-editor7:py-2                            mds-editor7:text-xl
                            mds-editor7:mt-[.8rem]`}
                                ripple="light"
                                onClick={(e) => setShowModalCodeVideo(true)}
                                ref={videoRef}
                            >
                                {/* <Icon name={} ripple={true} /> */}
                                <RiVideoAddFill />
                            </Button>
                        </div>
                        <Tooltips placement="top" ref={videoRef}>
                            <TooltipsContent className="text-black">Upload Video</TooltipsContent>
                        </Tooltips>
                        <div className="feeling">
                            <Button color="" size="regular" 
                            className={`px-[2.5rem] md:px-[3.5rem] ${theme?"bg-[#122d92]":"bg-[#151D3B]"}   text-2xl
                            mds-editor7:px-[2rem]
                            mds-editor7:py-2                            mds-editor7:text-xl
                            mds-editor7:mt-[.8rem]`}
                            ripple="light"
                                onClick={(e) => setShowModalCodeText(true)}
                                ref={rssRef}
                            >
                                {/* <Icon name={<MdRssFeed />} ripple={true} /> */}
                                <MdRssFeed />
                            </Button>
                        </div>
                        <Tooltips placement="top" ref={rssRef}>
                            <TooltipsContent className="text-black">Post Somethink</TooltipsContent>
                        </Tooltips>
                    </CardFooter>
                </Card>
            </div>
            {/* ================MODAL FOR POST PHotos and Video ================== */}
            <div className="con "
            >
                <Modal size="lg" active={showModal} toggler={(e) => {
                    setShowModalCode(false)
                }
                }
                >
                    <div className="contain divide-y-2 divide-[#ccc] md:w-[30rem] " ref={wrapperref} >
                        <div className="modal-header ">
                            <ModalHeader toggler={(e) => {
                                setShowModalCode(false)
                            }} >
                                New Post
                            </ModalHeader>
                        </div>
                        {/* w-[21rem] */}
                        <div className="modal-body w-[21rem] md:w-full ">
                            <ModalBody >
                                <p className="text-base leading-relaxed text-gray-600 font-normal
                            mt-5
                            ">
                                    <section className='header-image-section '>
                                        <main className='flex  join-of-name-select-option '>
                                            <article className='
                                    card-post-image-modal w-[3rem]  h-[3rem] rounded-full flex-shrink-0
                                    
                                    '>


                                                {DispatchProfileImage !== "" ? <Image
                                                    src={DispatchProfileImage}
                                                    rounded={true}
                                                    raised={false}
                                                    alt=""
                                                    className="w-full h-full"
                                                /> : <Image
                                                    src={DefaultProfile}
                                                    rounded={true}
                                                    raised={false}
                                                    alt=""
                                                    className="w-full h-full"
                                                />}
                                            </article>
                                            <article className=' public-name-article ml-[.5rem] -mt-[.4rem]'>
                                                <article className='text-black text-xl'>
                                                    <p> {(fname && lname) ? fname + " " + lname : "NA"}</p>
                                                </article>
                                                <select name="private-public" id="private-public" className='border bg-[#ccc] text-[#0F0E0E] px-[.8rem] border-none rounded-[5px]'
                                                    onChange={GetPrivatORPublic}
                                                >
                                                    <option value="public"
                                                        className=''
                                                    // onChange={GetPrivatORPublic}
                                                    >Public</option>
                                                    <option value="private"
                                                    //    onChange={GetPrivatORPublic}
                                                    >Private</option>
                                                    <option value="friends"
                                                    //    onChange={GetPrivatORPublic}
                                                    >Friends</option>
                                                </select>
                                            </article>
                                        </main>
                                    </section>
                                    <section className='input-field-section mt-[1rem]
                                    relative w-full
                                
                                '>
                                        <textarea
                                            className="
                                        post-textarea
                                            form-control
                                            block
                                            w-full
                                            h-[9rem]
                                            px-3
                                            py-1.5
                                            
                                            border-none
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border  border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            text-lg
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none
                                            resize-none"
                                            id="mytextarea"
                                            rows="3"
                                            cols='2'
                                            value={textareaValue}
                                            onChange={(e) => {
                                                setTextAreaValue(e.target.value)
                                            }}
                                            // value={chosenEmoji ? chosenEmoji.emoji : ""}
                                            placeholder={name}
                                        >
                                        </textarea>
                                        <Button
                                            color=""
                                            buttonType="filled"
                                            size="regular"
                                            rounded={true}
                                            block={false}
                                            iconOnly={true}
                                            ripple="light"
                                            className="absolute -mt-[2rem] ml-auto w-[1.7rem] h-[1.7rem] mb-[1.5rem] border-none text-2xl"
                                            onClick={(e) => {
                                                setEmojiModal(true)
                                            }}
                                        >
                                            <Icon name={<BsFillEmojiSmileFill
                                                className="text-[#E45826] text-[1.5rem]"
                                            />} size="sm" />
                                        </Button>
                                    </section>
                                    {/* UnselectPostImage */}
                                    <section className='image-section mt-[1rem] overflow-auto mb-[1rem] pr-[.5rem] '>
                                        <article className=' h-[10rem] border border-gray-300 rounded-lg flex '>
                                            {uploadLoaderBackground ? <ProfileLoader /> : progressMessageBackground === "Uploaded Successfully" ? <ProgressBar text={progressMessageBackground} bgColor="green" /> : UnselectPostImage ? <SelectedImageShowWithURL text={UnselectPostImage} /> :
                                                <div className="flex w-full  items-center justify-center bg-grey-lighter hover:bg-grey-lighter " >
                                                    <label className="  flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white h-full w-full flex justify-center"
                                                    // style={{ backgroundColor: "red" }}
                                                    >
                                                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                            style={{ color: "green" }}
                                                        >
                                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                                        </svg>
                                                        <span className="mt-2 text-base leading-normal" style={{ color: "green" }}>Select Photo/Video</span>
                                                        <input type='file' className="hidden" name="file"
                                                            accept='image/*,video/*'
                                                            ref={inputFileRef}
                                                            onChange={(e) => {
                                                                // setInputValue(e.target.value)
                                                                SelectImage(e)
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            }
                                        </article>
                                    </section>
                                </p>
                            </ModalBody>
                        </div>
                        <div className="modal-footer">
                            <ModalFooter >
                                <div className="btn-group mt-2 flex justify-center">
                                    {/* <Button
                                        color="red"
                                        buttonType="link"
                                        onClick={(e) => setShowModalCode(false)}
                                        ripple="dark"
                                    >
                                        Close
                                    </Button> */}
                                    {postLoader ? <Button
                                        color="green"

                                        disabled={groupDisable ? true : false}
                                        onClick={(e) => {
                                            SubmitPost()

                                        }}
                                        ripple="light"
                                        block={true}
                                    >
                                        <LoaderForPost />
                                    </Button> : <Button
                                        color="green"

                                        disabled={groupDisable ? true : false}
                                        onClick={(e) => {
                                            SubmitPost()

                                            // setShowModalCode(false)
                                        }}
                                        ripple="light"
                                        block={true}
                                    >
                                        Post
                                    </Button>}
                                </div>
                            </ModalFooter>
                        </div>
                    </div>
                </Modal>
            </div>
            {/* =======================MODAL FOR THE VIDEO=========================== */}
            <Modal size="lg" className="" active={showModalVideo} toggler={() => {
                setShowModalCodeVideo(false)
            }}>
                <div className="modalHeader -mb-[1rem] -mt-[1rem]  md:w-[30rem] " ref={VideoModelRef}>
                    <ModalHeader className="" toggler={() => setShowModalCodeVideo(false)}>
                        Video
                    </ModalHeader>
                </div>
                <hr />
                <div className="modal-body w-[21rem] md:w-full ">
                    <ModalBody >
                        <p className="text-base leading-relaxed text-gray-600 font-normal
                            mt-5
                            ">
                            <section className='header-image-section '>
                                <main className='flex  join-of-name-select-option '>
                                    <article className='
                                    card-post-image-modal w-[3rem]  h-[3rem] rounded-full flex-shrink-0
                                    
                                    '>
                                        {DispatchProfileImage !== "" ? <Image
                                            src={DispatchProfileImage}
                                            rounded={true}
                                            raised={false}
                                            alt=""
                                            className="w-full h-full"
                                        /> : <Image
                                            src={DefaultProfile}
                                            rounded={true}
                                            raised={false}
                                            alt=""
                                            className="w-full h-full"
                                        />}
                                    </article>
                                    <article className=' public-name-article ml-[.5rem] -mt-[.4rem]'>
                                        <article className='text-black text-xl'>
                                            <p> {(fname && lname) ? fname + " " + lname : "NA"}</p>
                                        </article>
                                        <select name="private-public" id="private-public" className='border bg-[#ccc] text-[#0F0E0E] px-[.8rem] border-none rounded-[5px]'
                                            onChange={GetPrivatORPublic}
                                        >
                                            <option value="public"
                                                className=''
                                            // onChange={GetPrivatORPublic}
                                            >Public</option>
                                            <option value="private"
                                            //    onChange={GetPrivatORPublic}
                                            >Private</option>
                                            <option value="friends"
                                            //    onChange={GetPrivatORPublic}
                                            >Friends</option>
                                        </select>
                                    </article>
                                </main>
                            </section>
                            <section className='input-field-section mt-[1rem]
                                    relative 
                                
                                '>
                                <textarea
                                    className="
                                        post-textarea
                                            form-control
                                            block
                                            w-full
                                            h-[9rem]
                                            px-3
                                            py-1.5
                                            
                                            border-none
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border  border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            text-lg
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none
                                            resize-none"
                                    id="mytextarea"
                                    rows="3"
                                    cols='2'
                                    value={textareaValue}
                                    onChange={(e) => {
                                        setTextAreaValue(e.target.value)
                                    }}
                                    // value={chosenEmoji ? chosenEmoji.emoji : ""}
                                    placeholder={name2}
                                >
                                </textarea>
                                <Button
                                    color=""
                                    buttonType="filled"
                                    size="regular"
                                    rounded={true}
                                    block={false}
                                    iconOnly={true}
                                    ripple="light"
                                    className="absolute -mt-[2rem] ml-auto w-[1.7rem] h-[1.7rem] mb-[1.5rem] border-none text-2xl"
                                    onClick={(e) => {
                                        setEmojiModal(true)
                                    }}
                                >
                                    <Icon name={<BsFillEmojiSmileFill
                                        className="text-[#E45826] text-[1.5rem]"
                                    />} size="sm" />
                                </Button>
                            </section>
                            {/* UnselectPostImage */}
                            <section className='image-section mt-[1rem] overflow-auto mb-[1rem] pr-[.5rem] '>
                                <article className=' h-[10rem] border border-gray-300 rounded-lg flex '>
                                    {uploadLoaderBackground ? <ProfileLoader /> : progressMessageBackground === "Uploaded Successfully" ? <ProgressBar text={progressMessageBackground} bgColor="green" /> : UnselectPostImage ? <SelectedImageShowWithURL text={UnselectPostImage} /> :
                                        <div className="flex w-full  items-center justify-center bg-grey-lighter hover:bg-grey-lighter " >
                                            <label className="  flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white h-full w-full flex justify-center"
                                            // style={{ backgroundColor: "red" }}
                                            >
                                                <IoVideocam className='text-[3.5rem] font-semibold text-[#1f680b]' />
                                                <span className="mt-2 text-base leading-normal" style={{ color: "green" }}>Video</span>
                                                <input type='file' className="hidden" name="file"
                                                    accept='video/*'
                                                    ref={videoRef}
                                                    onChange={(e) => {
                                                        // setInputValue(e.target.value)
                                                        SelectVideo(e)
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    }
                                </article>
                            </section>
                        </p>
                    </ModalBody>
                </div>
                <footer className="">
                    <ModalFooter >
                        <div className="btn-group flex justify-center  w-full">
                            {postLoader ? <Button
                                color="green"
                                disabled={videoDisable ? true : false}
                                onClick={(e) => {
                                    e.preventDefault()
                                    SubmitPost()
                                    // setShowModalCodeVideo(false)
                                }}
                                ripple="light"
                                block={true}
                            >
                                <LoaderForPost />
                            </Button> : <Button
                                color="green"
                                disabled={videoDisable ? true : false}
                                onClick={(e) => {
                                    e.preventDefault()
                                    SubmitPost()
                                    // setShowModalCodeVideo(false)
                                }}
                                ripple="light"
                                block={true}
                            >
                                Post
                            </Button>}
                        </div>
                    </ModalFooter>
                </footer>
            </Modal>
            {/* ================================MODAL FOR PHOTOS======================= */}
            <Modal size="lg" className="" active={showModalPhoto} toggler={() => {
                setShowModalCodePhoto(false)
            }}>
                <div className="modalHeader -mb-[1rem] -mt-[1rem]  md:w-[30rem] ">
                    <ModalHeader className="" toggler={() => setShowModalCodePhoto(false)}>
                        Photos
                    </ModalHeader>
                </div>
                <hr />
                <div className="modal-body w-[21rem] md:w-full ">
                    <ModalBody >
                        <p className="text-base leading-relaxed text-gray-600 font-normal
                            mt-5
                            ">
                            <section className='header-image-section '>
                                <main className='flex  join-of-name-select-option '>
                                    <article className='
                                    card-post-image-modal w-[3rem]  h-[3rem] rounded-full flex-shrink-0
                                    
                                    '>
                                        {DispatchProfileImage !== "" ? <Image
                                            src={DispatchProfileImage}
                                            rounded={true}
                                            raised={false}
                                            alt=""
                                            className="w-full h-full"
                                        /> : <Image
                                            src={DefaultProfile}
                                            rounded={true}
                                            raised={false}
                                            alt=""
                                            className="w-full h-full"
                                        />}
                                    </article>
                                    <article className=' public-name-article ml-[.5rem] -mt-[.4rem]'>
                                        <article className='text-black text-xl'>
                                            <p> {(fname && lname) ? fname + " " + lname : "NA"}</p>
                                        </article>
                                        <select name="private-public" id="private-public" className='border bg-[#ccc] text-[#0F0E0E] px-[.8rem] border-none rounded-[5px]'
                                            onChange={GetPrivatORPublic}
                                        >
                                            <option value="public"
                                                className=''
                                            // onChange={GetPrivatORPublic}
                                            >Public</option>
                                            <option value="private"
                                            //    onChange={GetPrivatORPublic}
                                            >Private</option>
                                            <option value="friends"
                                            //    onChange={GetPrivatORPublic}
                                            >Friends</option>
                                        </select>
                                    </article>
                                </main>
                            </section>
                            <section className='input-field-section mt-[1rem]
                                    relative 
                                
                                '>
                                <textarea
                                    className="
                                        post-textarea
                                            form-control
                                            block
                                            w-full
                                            h-[9rem]
                                            px-3
                                            py-1.5
                                            
                                            border-none
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border  border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            text-lg
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none
                                            resize-none"
                                    id="mytextarea"
                                    rows="3"
                                    cols='2'
                                    value={textareaValue}
                                    onChange={(e) => {
                                        setTextAreaValue(e.target.value)
                                    }}
                                    // value={chosenEmoji ? chosenEmoji.emoji : ""}
                                    placeholder={name1}
                                >
                                </textarea>
                                <Button
                                    color=""
                                    buttonType="filled"
                                    size="regular"
                                    rounded={true}
                                    block={false}
                                    iconOnly={true}
                                    ripple="light"
                                    className="absolute -mt-[2rem] ml-auto w-[1.7rem] h-[1.7rem] mb-[1.5rem] border-none text-2xl"
                                    onClick={(e) => {
                                        setEmojiModal(true)
                                    }}
                                >
                                    <Icon name={<BsFillEmojiSmileFill
                                        className="text-[#E45826] text-[1.5rem]"
                                    />} size="sm" />
                                </Button>
                            </section>
                            {/* UnselectPostImage */}
                            <section className='image-section mt-[1rem] overflow-auto mb-[1rem] pr-[.5rem] '>
                                <article className=' h-[10rem] border border-gray-300 rounded-lg flex '>
                                    {uploadLoaderBackground ? <ProfileLoader /> : progressMessageBackground === "Uploaded Successfully" ? <ProgressBar text={progressMessageBackground} bgColor="green" /> : UnselectPostImage ? <SelectedImageShowWithURL text={UnselectPostImage} /> :
                                        <div className="flex w-full  items-center justify-center bg-grey-lighter hover:bg-grey-lighter " >
                                            <label className="  flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white h-full w-full flex justify-center"
                                            // style={{ backgroundColor: "red" }}
                                            >
                                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                    style={{ color: "green" }}
                                                >
                                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                                </svg>
                                                <span className="mt-2 text-base leading-normal" style={{ color: "green" }}>Select Post Photo</span>
                                                <input type='file' className="hidden" name="file"
                                                    accept='image/*'
                                                    ref={photosRef}
                                                    onChange={(e) => {
                                                        // setInputValue(e.target.value)
                                                        SelectPhotos(e)
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    }
                                </article>
                            </section>
                        </p>
                    </ModalBody>
                </div>
                <footer className="">
                    <ModalFooter >
                        <div className="btn-group flex justify-center  w-full">
                            {postLoader ? <Button
                                color="green"
                                disabled={photosDisable ? true : false}
                                onClick={(e) => {
                                    e.preventDefault()
                                    SubmitPost()
                                    // setShowModalCodeVideo(false)
                                }}
                                ripple="light"
                                block={true}
                            >
                                <LoaderForPost />
                            </Button> : <Button
                                color="green"
                                disabled={photosDisable ? true : false}
                                onClick={(e) => {
                                    e.preventDefault()
                                    SubmitPost()
                                    // setShowModalCodeVideo(false)
                                }}
                                ripple="light"
                                block={true}
                            >
                                Post
                            </Button>}
                        </div>
                    </ModalFooter>
                </footer>
            </Modal>
            {/* =========================ADD SOME TEXT================== */}
            <Modal size="lg" className="" active={showModalText} toggler={() => {
                setShowModalCodeText(false)
            }}>
                <div className="modalHeader -mb-[1rem] -mt-[1rem]  md:w-[30rem] ">
                    <ModalHeader className="" toggler={() => setShowModalCodeText(false)}>
                        Text
                    </ModalHeader>
                </div>
                <hr />
                <div className="modal-body w-[21rem] md:w-full ">
                    <ModalBody >
                        <p className="text-base leading-relaxed text-gray-600 font-normal
                            mt-5
                            ">
                            <section className='header-image-section '>
                                <main className='flex  join-of-name-select-option '>
                                    <article className='
                                    card-post-image-modal w-[3rem]  h-[3rem] rounded-full flex-shrink-0
                                    
                                    '>
                                        {DispatchProfileImage !== "" ? <Image
                                            src={DispatchProfileImage}
                                            rounded={true}
                                            raised={false}
                                            alt=""
                                            className="w-full h-full"
                                        /> : <Image
                                            src={DefaultProfile}
                                            rounded={true}
                                            raised={false}
                                            alt=""
                                            className="w-full h-full"
                                        />}
                                    </article>
                                    <article className=' public-name-article ml-[.5rem] -mt-[.4rem]'>
                                        <article className='text-black text-xl'>
                                            <p> {(fname && lname) ? fname + " " + lname : "NA"}</p>
                                        </article>
                                        <select name="private-public" id="private-public" className='border bg-[#ccc] text-[#0F0E0E] px-[.8rem] border-none rounded-[5px]'
                                            onChange={GetPrivatORPublic}
                                        >
                                            <option value="public"
                                                className=''
                                            // onChange={GetPrivatORPublic}
                                            >Public</option>
                                            <option value="private"
                                            //    onChange={GetPrivatORPublic}
                                            >Private</option>

                                            <option value="friends"
                                            //    onChange={GetPrivatORPublic}
                                            >Friends</option>
                                        </select>
                                    </article>
                                </main>
                            </section>
                            <section className='input-field-section mt-[1rem]
                                    relative 
                                
                                '>
                                <textarea
                                    className="
                                        post-textarea
                                            form-control
                                            block
                                            w-full
                                            h-[9rem]
                                            px-3
                                            py-1.5
                                            
                                            border-none
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border  border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            text-lg
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none
                                            resize-none"
                                    id="mytextarea"
                                    rows="3"
                                    cols='2'
                                    value={textareaValue}
                                    onChange={(e) => {
                                        SelectTextHandle(e)
                                    }}
                                    // value={chosenEmoji ? chosenEmoji.emoji : ""}
                                    placeholder={name}
                                >
                                </textarea>
                                <Button
                                    color=""
                                    buttonType="filled"
                                    size="regular"
                                    rounded={true}
                                    block={false}
                                    iconOnly={true}
                                    ripple="light"
                                    className="absolute -mt-[2rem] ml-auto w-[1.7rem] h-[1.7rem] mb-[1.5rem] border-none text-2xl"
                                    onClick={(e) => {
                                        setEmojiModal(true)
                                    }}
                                >
                                    <Icon name={<BsFillEmojiSmileFill
                                        className="text-[#E45826] text-[1.5rem]"
                                    />} size="sm" />
                                </Button>
                            </section>
                        </p>
                    </ModalBody>
                </div>
                <footer className="">
                    <ModalFooter >
                        <div className="btn-group flex justify-center  w-full">
                            {postLoader ? <Button
                                color="green"
                                disabled={textDisable ? true : false}
                                onClick={(e) => {
                                    e.preventDefault()
                                    SubmitPost()
                                    // setShowModalCodeVideo(false)
                                }}
                                ripple="light"
                                block={true}
                            >
                                <LoaderForPost />
                            </Button> : <Button
                                color="green"
                                disabled={textDisable ? true : false}
                                onClick={(e) => {
                                    e.preventDefault()
                                    SubmitPost()
                                    // setShowModalCodeVideo(false)
                                }}
                                ripple="light"
                                block={true}
                            >
                                Post
                            </Button>}
                        </div>
                    </ModalFooter>
                </footer>
            </Modal>
            {/* <ToastContainer /> */}
            <Modal size="regular" active={emojiModal} toggler={() => setEmojiModal(false)} className="z-[1000] mt-[22rem]">
                <div className="con" ref={wrapperref}>
                    <ModalHeader toggler={() => setEmojiModal(false)}>
                        {/* Modal Title */}
                    </ModalHeader>
                    <ModalBody>
                        <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} />
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </div>
            </Modal>
            {/* =============================================All Button tooltips============================ */}
        </>
    )
}
export default AddPost




function LoaderForPost() {
    return (

        <>
            <ThreeDots color="#001D6E" height={22} width={22} />

        </>
    )
}