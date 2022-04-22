import { NavLink, Route, Router, useLocation, Switch, useHistory } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import NavbarInput from '@material-tailwind/react/NavbarInput';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import userProfile from '../assets/img/download.png'
import { useContext, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageShow from '../Components/ImageShow'
import ProfileLoader from '../Loader/ProfileLoader';
import axios from "axios";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
// import Button from "@material-tailwind/react/Button";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete, MdUploadFile, MdNotifications, MdError } from 'react-icons/md'
import { BsMessenger } from 'react-icons/bs'
import { useState } from 'react'
import ProgressBar from './ProgressBar';
import CircleLoader from '../Loader/CircleLoader';
import Badge from '@mui/material/Badge';
import Notification from './Notification/Notification';
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import SearchUserTable from './SearchUserTable';
import { RiTreasureMapLine } from 'react-icons/ri';
import Pusher from 'pusher-js';
import { Error, Success } from './Toastify';
import { success, error } from '../toastifyMessage/Toast';

const _id = localStorage.getItem("uuid")
function useOnClickOutside(ref, handler, setImageValue, setImageValueBackground, dispatch, setProgressMessage, setDeleteMessage) {
    console.log("use handler is 0", ref)
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    alert("click outside")
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                alert("click outside")
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}
export default function AdminNavbar({ showSidebar, setShowSidebar, socket }) {
    // , socket 
    // console.log("admin nvabr", { socket })


    //ALLS  HOOKS
    const wrapperRef = useRef()
    const history = useHistory()
    const [showModal, setShowModalCode] = useState(false);
    const [showModalBackground, setShowModalCodeBackground] = useState(false);
    const [fileinput, setFileInput] = useState();
    const [fileinputBackground, setFileInputBackground] = useState();
    const [previewImage, setPreviewImage] = useState()
    const [progressStatus, setProgressStatus] = useState(0)
    const [imageValue, setImageValue] = useState("")
    const [imageValueBackground, setImageValueBackground] = useState("")
    const [progressMessage, setProgressMessage] = useState("")
    const [progressMessageBackground, setProgressMessageBackground] = useState("")
    const [showNotification, setShowNotification] = useState(false)
    const [uploadLoader, setUploadLoader] = useState(false)
    const [uploadLoaderBackground, setUploadLoaderBackground] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState("")
    const [disabledButton, setDisabledButton] = useState(false)
    const [disabledButtonBg, setDisabledButtonBg] = useState(false)
    const notification = useRef(null)
    const messenger = useRef(null)
    const searchRef = useRef(null)
    const inputRef = useRef(null)
    const profileInput = useRef(null)
    const SearchFilter = useRef(null)
    const backgroundInput = useRef(null)
    const disableProfilePostButton = useRef(null)
    const [query, setQuery] = useState("")
    const [userData, setUserData] = useState([])
    const [popOver, setPopOverEffect] = useState(false)
    const [url, setUrl] = useState("")
    const [BgUrl, setBackgroundImageUrl] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [Noti, setNotification] = useState([])


    const dispatch = useDispatch()
    // useOnClickOutside(wrapperRef, setImageValue, setImageValueBackground, dispatch, setProgressMessage, setDeleteMessage)
    const location = useLocation().pathname;
    // ==========================================ALL Reducer function==================================
    //UNSELECT THE PROFILR iMAGES
    const UnselectProfileImage = useSelector((state) => {
        return state.UnselectProfileImage
    })
    // OPEN THE MODAL IN PROFILE CARD
    const OpenModal = useSelector((state) => {
        return state.Modal
    })
    const UnselectBackgroundImage = useSelector((state) => {
        return state.UnselectBackgroundImage
    })
    const uploadImageDataFromServer = useSelector((state) => {
        return state.uploadImageDataFrom
    })
    const showImage = useSelector((state) => {
        return state.ShowImage.value
    })
    const uploadImageDataFromBackground = useSelector((state) => {
        return state.uploadImageDataFromBackground
    })
    const ShowImageBackground = useSelector((state) => {
        return state.ShowImageBackground.value
    })
    const LoaderRedux = useSelector((state) => {
        return state.LoaderRedux
    })
    const likeRedux = useSelector((state) => {
        return state.likeRedux
    })
    const likedUserDatails = useSelector((state) => {
        // console.log("notification state is", state)
        return state.Notification
    })
    const checkUrlExitsBg = useSelector((state) => {
        return state.checkUrlExitsBg
    })
    const checkUrlExitsProfile = useSelector((state) => {
        return state.checkUrlExitsProfile
    })
    let formData;
    //profile image uploader
    function imageUploadHandler(e) {
        const file = e.target.files[0]
        // console.log(file)
        // if (file.type !== "image/jpeg" || file.type !== "image/png" || file.type !== "image/jpg") {
        //     error("Please upload a valid image")
        //     return
        // }
        if (e.target.files[0].size > 36700160) {
            error({ message: "file size is too large ,less than 16MB" })
            return
        }
        else {
            const file = e.target.files[0]
            // setFileInput(file)
            const nameOfImage = e.target.value.split("\\")[2]
            //create the image local url
            const URL = window.URL.createObjectURL(file)
            //set the url into state
            setUrl(URL)
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = function () {
                // setPreviewImage(reader.result)
                dispatch({ type: "SetValueOfPreviewImageProfile", payload: reader.result })
            }
        }
    }
    //BACKGROLUND IMAGES UPLOADER and set to the realtime database
    function imageUploadHandlerBackground(e) {
        const file = e.target.files[0]
        if (file.size >= 40000000) {
            error({ message: "file size is too large ,less than 16MB" })
            return
        }
        else {
            //create the image local url
            const URL = window.URL.createObjectURL(file)
            //set the url into state
            setBackgroundImageUrl(URL)
            // console.log(BgUrl)
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = function () {
                // setPreviewImage(reader.result)
                dispatch({ type: "SetValueOfPreviewImageBg", payload: reader.result })
            }
        }
    }
    //submit the profile image base64 url to the server
    async function fileInputSubmit(e) {
        e.preventDefault()
        if (!checkUrlExitsProfile.value) {
            // alert("Please select a profile image")
            error({ message: "please select a photo" })
            return
        }
        else {
            // setShowImage(previewImage)
            // console.log("base 64 url for the image is", checkUrlExitsProfile.value)
            setUploadLoader(true)
            const serverResponse = await fetch(`blob/user/blob/image/9fHtqOJumtxOzmTfLMFT/ETXsG3rHrnx2irUZmefU/njVzxxrEx84ZrUiERB0t/fxXRdJLMKIkzxucTbovy/sO9rLr3E0EuDpjYcawQD/`, {
                method: "POST",
                body: JSON.stringify({
                    data:
                        checkUrlExitsProfile.value,
                    url: url,
                    uuid: _id
                }),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "multipart/form-data",
                    // "Content-Type": "x-www-form-urlencoded",

                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                }
            })
            const ResponseData = await serverResponse.json()
            const { status } = serverResponse
            const { message, data } = ResponseData
            if (status === 200) {
                //show the message after successfull upload
                success({ message: message })
                //set the base64 url encode value none after submit profile image to server or clear input file field
                dispatch({ type: "SetValueOfPreviewImageProfile", payload: "" })
                //dispatch the latest profile image url to the profile image component
                dispatch({ type: "ShowImage", payload: data.url })
                //set the whole info regrading image from, server and dispatch to 
                dispatch({ type: "uploadImageDataFromServer", payload: data })
                setProgressMessage(message)
                setUploadLoader(false)
                setProgressMessage("")
                setDisabledButton(false)
            }
            else if (status === 403) {
                error({ message: message })
                setUploadLoader(false)
                setDisabledButton(false)

            }
            else if (status === 499) {
                error({ message: "not Upload please, Try again" })
                setUploadLoader(false)
                setDisabledButton(false)

            }
            else if (status === 400) {
                error({ message: "please select photo" })
                setUploadLoader(false)
                setDisabledButton(false)

            }
            else {
            }
        }
    }
    // upload the background image to the server
    async function fileInputSubmitBackground(e) {
        e.preventDefault()
        if (!checkUrlExitsBg.value) {
            // alert("Please select a  image")
            error({ message: "please select a  photo" })
            return
        }
        else {
            // setShowImage(previewImage)
            // console.log("base 64 url for the image is", checkUrlExitsBg.value)
            setUploadLoaderBackground(true)
            const serverResponse = await fetch(`blob/user/blob/image/bg/S6MjFqeb8HdJRGjkUs9W/QUCzIb1mKtMevddN24yB/YWYhtXwEEtUlHu0Nkhmq/eAQCSzpYo28SJxXCMV4d/yR3VTmMynJw6N3xlS530/WpsJsZKo4hGf18jaWmZL/`, {
                method: "POST",
                body: JSON.stringify({
                    data:
                        checkUrlExitsBg.value,
                    url: BgUrl,
                    uuid: _id
                }),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "multipart/form-data",
                    // "Content-Type": "x-www-form-urlencoded",
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                }
            })
            // console.log({ serverResponse })
            const ResponseData = await serverResponse.json()
            const { status } = serverResponse
            const { message, data } = ResponseData
            if (status === 200) {
                //show the message after successfull upload
                success({ message: message })
                //set the base64 url encode value none after submit profile image to server or clear input file field
                dispatch({ type: "SetValueOfPreviewImageBg", payload: "" })
                //dispatch the latest profile image url to the profile image component
                dispatch({ type: "ShowImageBackground", payload: data.url })
                //set the whole info regrading image from, server and dispatch to 
                dispatch({ type: "uploadImageDataFromServerBackground", payload: data })
                setProgressMessage(message)
                setUploadLoaderBackground(false)
                setProgressMessage("")
                setDisabledButtonBg(false)
            }
            else if (status === 403) {
                error({ message: message })
                setUploadLoaderBackground(false)
                setDisabledButtonBg(false)

            }
            else if (status === 499) {
                error({ message: "not Upload please, Try again" })
                setUploadLoaderBackground(false)
                setDisabledButtonBg(false)

            }
            else if (status === 400) {
                error({ message: "please select photo" })
                setUploadLoaderBackground(false)
                setDisabledButtonBg(false)

            }
            else if (status === 401) {
                setUploadLoaderBackground(false)

                error({ message: "not upload please, Try again" })
                setDisabledButtonBg(false)
                return
            }
            else {
                // console.log("helo")
            }
        }
    }
    //remove the profile photos
    async function RemoveProfilePhoto() {
        try {
            setDeleteLoader(true)
            setDisabledButton(true)
            const res = await axios({
                url: `blob/delete/assest/`,
                data: JSON.stringify({ uploadImageDataFromServer, uuid: _id }),
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),
                }
            })
            console.log("delete image response from server", res)
            // console.log({ res })
            if (res.status === 200) {
                setDisabledButton(false)
                //show the delete message send by server
                //show the toastify message after successfull delete
                success({ message: "Profile photo removed successfully" })
                //set the profile image url none afetr delete the profile photos
                dispatch({ type: "ShowImage", payload: "" })
                //set the ShowImage url none after delete the image because when user upload profile photo then excute ternary condition successful upload always active
                setProgressMessage("")
                setDeleteLoader(false)
                return
            }
            else if (res.status === 500) {
                setDisabledButton(false)
                error({ message: res.data.message })
                setDeleteLoader(false)
                return
            }

            else if (res.status === 401) {
                error({ message: "not upload please, Try again" })
                setDeleteLoader(false)
                setDisabledButton(false)

                return
            }
            else if (res.status !== 200) {
                error({ message: res.data.message })
                setDeleteLoader(false)
                setDisabledButton(false)

            }
            // window.alert(res.data.message)
        }
        catch (err) {
            console.error(err)
        }
    }
    //remove the backgrounf Photos
    async function RemoveBackgroundPhoto() {
        try {
            setDisabledButtonBg(true)
            setDeleteLoader(true)
            const res = await fetch(`blob/delete/assest/bg/`, {
                body: JSON.stringify({ uploadImageDataFromBackground, uuid: _id }),
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),
                }
            })
            // console.log({ res })
            const resData = await res.json()
            // console.log({ resData })
            const { message, data } = resData
            if (res.status === 200) {
                setDeleteLoader(false)
                setDisabledButtonBg(false)
                // setDeleteMessage(res.data.message)
                //show the toastify message after successfull delete
                success({ message: message })
                //set the profile image url none afetr delete the profile photos
                dispatch({ type: "ShowImageBackground", payload: "" })
                //set the ShowImage url none after delete the image because when user upload profile photo then excute ternary condition successful upload always active
                setProgressMessage("")
                return
            }
            else if (res.status === 401) {
                error({ message: message })
                setDisabledButtonBg(false)
                // window.alert(resData.message)
                setDeleteLoader(false)
                return
            }
            else if (res.status === 500) {
                setDisabledButtonBg(false)
                error({ message: message })
                // window.alert(resData.message)
                setDeleteLoader(false)
                return
            }
        } catch (err) {
            console.error(err)
        }
    }
    //====================LOGOUT THE ACCOUNT=============================
    async function logout() {
        localStorage.removeItem("uuid")
        localStorage.removeItem("user_login")
        localStorage.clear()
        const res = await fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // "Authorization": "Bearer " + localStorage.getItem("uuid")
            }
        })
        const url = await res.json()
        window.open(url.message, "_self")
    }
    //search the query from the server
    useEffect(() => {
        const search = async () => {
            const res = await axios.get(`/blob/search?q=${query}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            // console.log("user filer data from server", res.data)
            setUserData(res.data)  //notice that we can not use await keyword inside here
        }
        search()
    }, [query])
    useEffect(() => {
        if (wrapperRef.current.contains(document.activeElement) === false) {
            // profileInput.current.value = null
            setPreviewImage("")
            setImageValue("")
            dispatch({ type: "UNSELECT_PROFILE_IMAGE", payload: "" })
            dispatch({ type: "UNSELECT_BACKGROUND_IMAGE", payload: "" })
            dispatch({ type: "SetValueOfPreviewImageProfile", payload: "" })
            dispatch({ type: "SetValueOfPreviewImageBg", payload: "" })
            setProgressMessage("")
            setUploadLoader(false)
            setDisabledButton(false)
            setDeleteLoader(false)
            setDisabledButtonBg(false)
            setDisabledButton(false)
            setUploadLoaderBackground(false)
        }
    }, [showModal, showModalBackground])
    //now setup the serach bar when user search the query
    useEffect(() => {
        // console.log(window.innerWidth)
        if (window.innerWidth <= 482) {
            SearchFilter.current.children[0].classList.add("search-bar-mobile")
            notification.current.classList.add("search-msg")
            messenger.current.classList.add("search-noti")
            // console.log(SearchFilter.current.children[0])
            if (showSearch === true) {
                notification.current.style.display = "none"
                messenger.current.style.display = "none"
                SearchFilter.current.children[0].classList.add("search-bar-mobile-animation")

                // SearchFilter.current.children[0].style.width = "110%"
            }
            else if (showSearch === false) {
                SearchFilter.current.children[0].classList.add("search-bar-mobile-down")
                notification.current.style.display = "block"
                messenger.current.style.display = "block"
                SearchFilter.current.style.width = "100%"
            }
        }
    }, [showSearch])




    useEffect(() => {

        socket?.on("getNotification", (data) => {
            console.log("getNoti", data)
            setNotification(pre => [...pre, data])
            dispatch({ type: "Send_Notification", payload: Noti })
        })
    }, [socket])


    console.log({ Noti })



    socket?.on("he", (data) => {
        console.log("get notification", data)
        // dispatch({ type: "Get_Notification", payload: data })
    })


    return (
        <>
        {/* md:ml-64 */}
        {/* bg-light-blue-500 */}
            <nav className="bg-light-blue-500  py-2 px-3 fixed w-full z-[10000] drop-shadow-lg">
                <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                    <div className="md:hidden">
                        <Button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            iconOnly
                            rounded
                            ripple="light"
                            onClick={() => setShowSidebar('left-0')}
                        >
                            <Icon name="menu" size="2xl" color="white" />
                        </Button>
                        <div
                            className={`absolute top-2 md:hidden ${showSidebar === 'left-0' ? 'left-64' : '-left-64'
                                } z-50 transition-all duration-300`}
                        >
                            <Button
                                color="transparent"
                                buttonType="link"
                                size="lg"
                                iconOnly
                                rounded
                                ripple="light" 
                                className="mt-[2rem]"
                                onClick={() =>
                                    setShowSidebar('-left-64')}
                            >
                                <Icon name="close" size="2xl" color="white" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex  items-center w-full  justify-end">
                        <div className="flex ">
                            <div className="searchFiled relative  align-baseline mt-[5px]"
                                ref={SearchFilter}
                            >
                                <NavbarInput placeholder="Search"
                                    id="search"
                                    className="text-black "
                                    onFocus={() => {
                                        setShowSearch(true)
                                        setPopOverEffect(true)
                                    }}
                                    onBlur={() => {
                                        setShowSearch(false)
                                        setPopOverEffect(false)
                                    }}
                                    onChange={
                                        (e) => {
                                            setQuery(e.target.value)
                                        }
                                    }
                                />
                                {
                                    popOver && (
                                        query.length > 0 && <div className='searchArea absolute w-full rounded-lg 
                                    h-[15rem] z-10
                                    bg-white
                                    border-[1px]
                                    border-gray-300
                                    rounded-t-none
                                    
                                   overflow-auto
                                   '>
                                            <SearchUserTable data={userData} />
                                        </div>
                                    )
                                }
                            </div>
                            {/* //userSerach the data from server */}
                            <section className='notification  flex  ml-[3rem] cursor-pointer relative  align-middle
                            mt-[4px]
                           
                            justify-center'
                                onClick={() => setShowNotification(!showNotification)}
                                ref={notification}
                            >
                                <MdNotifications className='text-[2rem] self-center text-[#270082]' />
                                <article className=' bg-red-500 absolute right-2 -top-2 mds-editor8:-top-3'>
                                    <Badge badgeContent={likedUserDatails.length > 0 ? likedUserDatails.length : 0} showZero color="success" max={20}>
                                        {/* <MailIcon color="action" /> */}
                                        {/* 4 */}
                                    </Badge>
                                </article>
                            </section>
                            <section className='messenger  flex ml-[2rem] cursor-pointer  mb-1 relative'
                                ref={messenger}
                            >
                                <BsMessenger className='text-[1.6rem] self-center mt-2 text-[#270082]' />
                                <article className='absolute -mt-[2.5rem] ml-[1.5rem]'>
                                    <Badge badgeContent={2} color="success" max={20}>
                                        {/* <MailIcon color="action" /> */}
                                        {/* 4 */}
                                    </Badge>
                                </article>
                            </section>
                            <div className="-mr-4 ml-6  ">
                                <Dropdown
                                    color="transparent"
                                    buttonText={
                                        <div className="w-11 bg-black rounded-full        h-11 text-center d-flex justify-center object-cover" style={{
                                            display: "flex", justifyContent: "center"
                                        }}
                                        >
                                            {
                                                LoaderRedux ? <CircleLoader /> : !showImage ? <Image src={userProfile}
                                                    rounded alt="img" style={{ width: "100%", height: "100%", backgroundSize: "cover" }} /> : <Image src={showImage}
                                                        rounded alt="img" style={{ width: "100%", height: "100%" }} />
                                            }
                                            <div className=' bg-[#00FF7F] rounded-full   w-[10px] h-[10px] absolute ml-[1.6rem] 1sm:w-[8px] 1sm:h-[8px] animate-ping animate-pulse '></div>
                                        </div>
                                    }
                                    rounded
                                    style={{
                                        padding: 0,
                                        color: 'transparent',
                                    }}
                                >
                                    <DropdownItem color="lightBlue"
                                        onClick={(e) => setShowModalCode(true)}
                                    >
                                        Change Profile Picture
                                    </DropdownItem>
                                    <DropdownItem color="lightBlue"
                                        onClick={(e) => setShowModalCodeBackground(true)}
                                    >
                                        Change background Picture
                                    </DropdownItem>
                                    <DropdownItem color="lightBlue"
                                        onClick={(e) => logout()}
                                    >
                                        Logout
                                    </DropdownItem>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
            {/* //  MAIN BODY OF DASHBOARD */}
            {/* 
            <Route exact path="/update_profile">
            </Route> */}
            {/* ==============================profile image=================handler */}
            <Modal size="sm" active={showModal} className="z-[1000]" toggler={() => setShowModalCode(false)}>
                <div ref={wrapperRef} >
                    <form onSubmit={fileInputSubmit}  >
                        <ModalHeader toggler={() => setShowModalCode(false)}>
                            Profile Image
                        </ModalHeader>
                        <ModalBody>
                            {
                                uploadLoader ? (<ProfileLoader />)
                                    :
                                    (
                                        progressMessage === "Uploaded Successfully" ?
                                            (
                                                <div className="flex w-full  items-center justify-center bg-grey-lighter hover:bg-grey-lighter" >
                                                    <label className="w-64 flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
                                                    // style={{ backgroundColor: "red" }}
                                                    >
                                                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                            style={{ color: "green" }}
                                                        >
                                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                                        </svg>
                                                        <span className="mt-2 text-base leading-normal" style={{ color: "green" }}>Select Photo</span>
                                                        <input type='file' className="hidden" name="file"
                                                            onChange={imageUploadHandler}
                                                            accept="image/*"
                                                        />
                                                    </label>
                                                </div>
                                            )
                                            :
                                            (
                                                checkUrlExitsProfile.value ? <>
                                                    <Image src={checkUrlExitsProfile.value} />
                                                    <ImageShow />
                                                </> :
                                                    (
                                                        <div className="flex w-full  items-center justify-center bg-grey-lighter hover:bg-grey-lighter" >
                                                            <label className="w-64 flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
                                                            // style={{ backgroundColor: "red" }}
                                                            >
                                                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                                    style={{ color: "green" }}
                                                                >
                                                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                                                </svg>
                                                                <span className="mt-2 text-base leading-normal" style={{ color: "green" }}>Select Photo</span>
                                                                <input type='file' className="hidden" name="file"
                                                                    onChange={imageUploadHandler}
                                                                    accept="image/*"
                                                                />
                                                            </label>
                                                        </div>
                                                    )
                                            )
                                    )
                            }
                            {showImage &&
                                (deleteLoader ? <ProfileLoader /> : deleteMessage ?
                                    (<>
                                        <div className="flex w-full items-center justify-center bg-grey-lighter hover:bg-grey-lighter mt-6 "
                                            ripple={"light"}
                                            onClick={(e) => {
                                                // alert("helo")
                                                RemoveProfilePhoto()
                                                // setStrategyImage(UnselectProfileImage.value)
                                                dispatch({ type: "SET_UNSELECT_PROFILE_IMAGE", payload: { value: "" } })
                                            }}
                                        >
                                            <label className="w-64 flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                                                <div className='' style={{ color: "red", fontSize: "2rem" }}>
                                                    <MdDelete />
                                                </div>
                                                <span className="mt-2 text-base leading-normal" style={{ color: "#DA1212" }}>Remove Profile Photo</span>
                                            </label>
                                        </div>
                                    </>
                                    )
                                    :
                                    <div className="flex w-full items-center justify-center bg-grey-lighter hover:bg-grey-lighter mt-6 "
                                        ripple={"light"}
                                        onClick={(e) => {
                                            // alert("helo")
                                            RemoveProfilePhoto()
                                            // setStrategyImage(UnselectProfileImage.value)
                                            dispatch({ type: "SET_UNSELECT_PROFILE_IMAGE", payload: { value: "" } })
                                        }}
                                    >
                                        <label className="w-64 flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                                            <div className='' style={{ color: "red", fontSize: "2rem" }}>
                                                <MdDelete />
                                            </div>
                                            <span className="mt-2 text-base leading-normal" style={{ color: "#DA1212" }}>Remove Profile Photo</span>
                                        </label>
                                    </div>
                                )
                            }
                            {/* </p> */}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="red"
                                buttonType="link"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowModalCode(false)
                                }}
                                ripple="dark"
                            >
                                Close
                            </Button>
                            <Button
                                color="green"
                                // onClick={(e) => setShowModalCode(false)}
                                disabled={disabledButton ? true : false}
                                onClick={(e) => {
                                    e.preventDefault()
                                    fileInputSubmit(e)
                                    setShowModalCode(true)
                                    setDisabledButton(true)

                                }
                                }
                                ripple="light"
                            >
                                Upload
                            </Button>
                        </ModalFooter>
                    </form>
                </div>
            </Modal>
            {/* BACKGROUND SET IMAGE MODAL */}
            <Modal size="sm" active={showModalBackground} className="z-[1000]" toggler={() => setShowModalCodeBackground(false)}>
                {/* ref={wrapperRef} */}
                <form onSubmit={fileInputSubmitBackground} >
                    <ModalHeader toggler={() => setShowModalCodeBackground(false)}>
                        Background Image
                    </ModalHeader>
                    <ModalBody>
                        {
                            uploadLoaderBackground ? (<ProfileLoader />)
                                :
                                (
                                    progressMessage === "Uploaded Successfully" ?
                                        (
                                            <div className="flex w-full  items-center justify-center bg-grey-lighter hover:bg-grey-lighter" >
                                                <label className="w-64 flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
                                                // style={{ backgroundColor: "red" }}
                                                >
                                                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                        style={{ color: "green" }}
                                                    >
                                                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                                    </svg>
                                                    <span className="mt-2 text-base leading-normal" style={{ color: "green" }}>Select Photo</span>
                                                    <input type='file' className="hidden" name="file"
                                                        onChange={imageUploadHandlerBackground}
                                                        accept="image/*"
                                                    />
                                                </label>
                                            </div>
                                        )
                                        :
                                        (
                                            checkUrlExitsBg.value ? <>
                                                <Image src={checkUrlExitsBg.value} />
                                                <ImageShow />
                                            </> :
                                                (
                                                    <div className="flex w-full  items-center justify-center bg-grey-lighter hover:bg-grey-lighter" >
                                                        <label className="w-64 flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
                                                        // style={{ backgroundColor: "red" }}
                                                        >
                                                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                                style={{ color: "green" }}
                                                            >
                                                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                                            </svg>
                                                            <span className="mt-2 text-base leading-normal" style={{ color: "green" }}>Select Photo</span>
                                                            <input type='file' className="hidden" name="file"
                                                                onChange={imageUploadHandlerBackground}
                                                                accept="image/*"
                                                            />
                                                        </label>
                                                    </div>
                                                )
                                        )
                                )
                        }
                        {ShowImageBackground &&
                            (deleteLoader ? <ProfileLoader /> :
                                <div className="flex w-full items-center justify-center bg-grey-lighter hover:bg-grey-lighter mt-6 "
                                    ripple={"light"}
                                    onClick={(e) => {
                                        // alert("helo")
                                        RemoveBackgroundPhoto()
                                        // setStrategyImage(UnselectProfileImage.value)
                                        dispatch({ type: "SET_UNSELECT_PROFILE_IMAGE", payload: { value: "" } })
                                    }}
                                >
                                    <label className="w-64 flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                                        <div className='' style={{ color: "red", fontSize: "2rem" }}>
                                            <MdDelete />
                                        </div>
                                        <span className="mt-2 text-base leading-normal" style={{ color: "#DA1212" }}>Remove Background Picture</span>
                                    </label>
                                </div>
                            )
                        }
                        {/* </p> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="red"
                            buttonType="link"
                            onClick={(e) => {
                                e.preventDefault()
                                setShowModalCodeBackground(false)
                                setPreviewImage("")
                                setImageValue("")
                                dispatch({ type: "UNSELECT_PROFILE_IMAGE", payload: "" })
                                dispatch({ type: "UNSELECT_BACKGROUND_IMAGE", payload: "" })
                                setProgressMessage("")
                            }}
                            ripple="dark"
                        >
                            Close
                        </Button>
                        <Button
                            ref={disableProfilePostButton}
                            color="green"
                            onClick={(e) => {
                                e.preventDefault()
                                fileInputSubmitBackground(e)
                                setDisabledButtonBg(true)
                                setShowModalCodeBackground(true)
                            }
                            }
                            ripple="light"
                            disabled={disabledButtonBg ? true : false}
                        >
                            Upload
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
            {/* <ToastContainer /> */}
            {/* ==========================NOTIFICATION======================= */}
            <Popover placement="bottom" ref={notification}>
                <PopoverContainer>
                    <PopoverHeader>Notifications</PopoverHeader>
                    <PopoverBody>
                        <Notification userLiked={likedUserDatails} socket={socket} />
                    </PopoverBody>
                </PopoverContainer>
            </Popover>
        </>
    );
}
