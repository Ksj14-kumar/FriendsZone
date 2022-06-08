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
import ImageShow from './ImageShow'


import ProfileLoader from '../Loader/ProfileLoader';
import axios from "axios";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";


import { MdDelete, MdUploadFile, MdNotifications, MdError } from 'react-icons/md'
import { FaLessThanEqual, FaUserFriends } from 'react-icons/fa'
import { BsMessenger } from 'react-icons/bs'
import { useState } from 'react'
import img1 from '../assets/img/team-3-800x800.jpg';
import CircleLoader from '../Loader/CircleLoader';
import Badge from '@mui/material/Badge';
import Notification from './Notification/Notification';
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import { motion, AnimatePresence } from "framer-motion"


import { success, error } from '../toastifyMessage/Toast';
import SearchBarTable from '../SearchBarTable';
import FriendsNoti from './Notification/FriendsNoti';
import Messages from "./Notification/Messages";
import AdminRightSideBar from './AdminRightSideBar';

const _id = localStorage.getItem("uuid")
function useOnClickOutside(ref, handler, setImageValue, setImageValueBackground, dispatch, setProgressMessage, setDeleteMessage) {
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
    const [userSearchHistory, setUserSearchHistory] = useState([])
    const [Group, setGroupMessage] = useState([])
    const [Length, SetNotificationLength] = useState(null)
    const [showRightSideBar, setShowRightSideBar] = useState(false)
    const notification = useRef(null)
    const message = useRef(null)
    const friends = useRef(null)
    const messenger = useRef(null)
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
    const [friendsRequest, setFriendsRequest] = useState([])
    const [Noti, setNotification] = useState([])
    const [NotificationGroup, setNotificationGroup] = useState([])
    const [friendsMessage, setFriendsMessage] = useState(false)
    const [expandSearch, setExpandSearch] = useState(false)

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
        return state.Notification
    })
    const checkUrlExitsBg = useSelector((state) => {
        return state.checkUrlExitsBg
    })
    const checkUrlExitsProfile = useSelector((state) => {
        return state.checkUrlExitsProfile
    })



    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })

    const { fname, lname, college, city, country, position, stream, aboutMe, googleId, senderrequest, receiverrequest } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "", googleId: "", senderrequest: [], receiverrequest: [] }





    // console.log({UserInformationLoad})

    let formData;
    //profile image uploader
    function imageUploadHandler(e) {
        const file = e.target.files[0]
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
            setUploadLoader(true)
            // ${process.env.REACT_APP_API_BACKENDURL}
            const serverResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/blob/image/9fHtqOJumtxOzmTfLMFT/ETXsG3rHrnx2irUZmefU/njVzxxrEx84ZrUiERB0t/fxXRdJLMKIkzxucTbovy/sO9rLr3E0EuDpjYcawQD/`, {
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
            setUploadLoaderBackground(true)
            // ${process.env.REACT_APP_API_BACKENDURL}
            const serverResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/blob/image/bg/S6MjFqeb8HdJRGjkUs9W/QUCzIb1mKtMevddN24yB/YWYhtXwEEtUlHu0Nkhmq/eAQCSzpYo28SJxXCMV4d/yR3VTmMynJw6N3xlS530/WpsJsZKo4hGf18jaWmZL/`, {
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
            }
        }
    }
    //remove the profile photos
    async function RemoveProfilePhoto() {
        try {
            setDeleteLoader(true)
            setDisabledButton(true)
            // ${process.env.REACT_APP_API_BACKENDURL}
            const res = await axios({
                url: `${process.env.REACT_APP_API_BACKENDURL}/blob/delete/assest/`,
                data: JSON.stringify({ uploadImageDataFromServer, uuid: _id }),
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),
                }
            })
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
            // ${process.env.REACT_APP_API_BACKENDURL}
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/delete/assest/bg/`, {
                body: JSON.stringify({ uploadImageDataFromBackground, uuid: _id }),
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),
                }
            })
            const resData = await res.json()
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
        // socket?.emit("newUser", { data: localStorage.getItem("uuid") })
        socket?.emit("logout", socket?.id)
        // socket?.disconnect()
        // socket?.emit("disconnect", { uuid: localStorage.getItem("uuid") })

        localStorage.removeItem("uuid")
        localStorage.clear()
        // ${process.env.REACT_APP_API_BACKENDURL}
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // "Authorization": "Bearer " + localStorage.getItem("uuid")
            }
        })
        const url = await res.json()
        window.open(url.message, "_self")
        window.location.reload()
    }
    //search the query from the server
    useEffect(() => {
        const search = async () => {
            // ${process.env.REACT_APP_API_BACKENDURL}
            const res = await axios.get(`${process.env.REACT_APP_API_BACKENDURL}/blob/search?q=${query}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
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
        // if (window.innerWidth <= 369) {
        //     SearchFilter.current.children[0].classList.add("search-bar-mobile")
        //     notification.current.classList.add("search-msg")
        //     messenger.current?.classList.add("search-noti")
        //     if (showSearch === true) {
        //         notification.current.style.display = "none"
        //         messenger.current.style.display = "none"
        //         SearchFilter.current.children[0].classList.add("search-bar-mobile-animation")

        //         SearchFilter.current.children[0].style.width = "110%"
        //     }
        //     else if (showSearch === false) {
        //         SearchFilter.current.children[0].classList.add("search-bar-mobile-down")
        //         notification.current.style.display = "block"
        //         // messenger.current.style.display = "block"
        //         SearchFilter.current.style.width = "100%"
        //     }
        // }
    }, [showSearch])





    // useEffect(() => {

    //     socket?.on("getNotification", (data) => {
    //         setNotification(pre => [...pre, data])
    //         dispatch({ type: "Send_Notification", payload: Noti })
    //     })
    // }, [socket])



    //now accept and reject friendrequest

    // useEffect(() => {
    //     setNotificationGroup(UserInformationLoad.friends)
    // },[])

    useEffect(() => {
        setFriendsRequest(receiverrequest)
        // setNotificationGroup((pre)=>[...pre,receiverrequest])
    }, [receiverrequest])


    async function DeleteFriendRequest(senderId) {
        setFriendsRequest(friendsRequest.filter(friend => friend._id !== senderId))
        // setNotificationGroup(NotificationGroup.filter(friend => friend._id !== senderId))
        const deleteResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/deletefriend/request`, {
            method: "DELETE",
            body: JSON.stringify({ senderId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("uuid")

            }
        })
        const deleteResponseData = await deleteResponse.json()
        console.log({ deleteResponseData })
        if (deleteResponse.status === 200) {
            // success({ message: deleteResponseData.message })
        }
        else if (deleteResponse.status !== 200) {
            // error({ message: deleteResponseData.message })

        }


    }


    //accecpt the friend request
    async function AcceptFriendRequest(senderId, name) {

        const acceptResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/acceptfriend/request`, {
            method: "POST",
            body: JSON.stringify({ senderId, name }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("uuid")

            }
        })
        const acceptResponseData = await acceptResponse.json()
        console.log("accepy friends reqeust", acceptResponseData)
        if (acceptResponse.status === 200) {
            setFriendsMessage(true)
            // success({ message: acceptResponseData.message })
            setFriendsRequest(friendsRequest.filter(friend => friend._id !== senderId))

        }
        else if (acceptResponse.status !== 200) {
            // error({ message: acceptResponseData.message })

        }


    }

    useEffect(() => {

        async function loadHistory() {
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/history/user/history/fetch`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")

                }
            })

            const resData = await res.json()
            const data = resData.data
            console.log({ resData })

            if (res.status === 200) {
                setUserSearchHistory(data?.history)
            }
            else if (res.status !== 200) {
                console.log(data)
                //not load hisory
            }
        }
        loadHistory()

    }, [])



    async function deleteHistory(searchUserId) {
        const filterData = userSearchHistory.filter((item) => item.searchUserId !== searchUserId)
        setUserSearchHistory(filterData)
        const deleteHistory = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/history/delete/history`, {
            method: "DELETE",
            body: JSON.stringify(
                {
                    searchUserId
                }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("uuid")

            }
        })


    }


    // useEffect(() => {
    //     setGroupMessage([...friendsRequest, ...UserInformationLoad?.message])

    // }, [friendsRequest, UserInformationLoad])


    // console.log({friendsRequest})

    return (
        <>
            {/* md:ml-64 */}
            {/* bg-light-blue-500 */}
            {/* 10000 */}
            <nav className="bg-light-blue-500  py-2 px-3 fixed w-full z-[18] drop-shadow-lg">
                <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10 ">
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
                    <div className="flex  items-center w-full  justify-end ">
                        <div className="flex  relative  w-full justify-end  ">
                            {/* <div className={`searchFiled   align-baseline mt-[5px]  fixed 
                            md:right-[22rem] md:w-[38rem] 
                            mds-editor24:w-[33rem] mds-editor24:right-[18rem] 
                            mds-editor25:w-[26rem] mds-editor25:right-[18rem] 
                            mds-editor26:w-[20rem] mds-editor26:right-[18rem]
                             mds-editor27:w-[17rem] mds-editor27:right-[18rem] 
                             mds-editor28:w-[17.5rem] 
                               mds-editor29:left-[5rem]
                             mds-editor29:cursor-pointer 
                            ${showSearch ? "fixed w-[29rem] left-[2.7rem] top-[10px]" : "w-[2rem]"}
                            `}
                                ref={SearchFilter}
                            >
                                <SearchBarTable showSearch={showSearch} setShowSearch={setShowSearch} setQuery={setQuery} setPopOverEffect={setPopOverEffect} query={query} data={userData} userSearchHistory1={userSearchHistory} deleteHistory={deleteHistory} />
                            </div> */}

                            <div className="left_side_search flex  flex-[10] md:justify-end justify-start items-center relative">
                                {/* w-[38rem] */}
                                <motion.div className={`wrap_inout_search w-[38rem] mds-editor31:w-[25rem] mds-editor32:w-[3rem] rounded-full transition-all duration-300 ${expandSearch ? "mds-editor32:w-full" : ""}`}
                                >
                                    <SearchBarTable showSearch={showSearch} setShowSearch={setShowSearch} setQuery={setQuery} setPopOverEffect={setPopOverEffect} query={query} data={userData} userSearchHistory1={userSearchHistory} deleteHistory={deleteHistory} setExpandSearch={setExpandSearch} expandSearch={expandSearch} />

                                </motion.div>
                            </div>
                            {/* ml-auto */}
                            <div className={`group_right_s flex flex-[2]   justify-end  ${expandSearch ? "mds-editor32:hidden" : "block"}`}>

                                <div className={`group_icons flex `}>

                                    {/* //user friends group */}
                                    <section className='friends  flex  ml-[1rem] -mr-[1.5rem] cursor-pointer relative     align-middle mt-[4px] justify-center'
                                        ref={friends}
                                        onClick={() => { }}>
                                        <FaUserFriends className='text-[2rem] self-center text-[#270082]' />
                                        <article className='  absolute right-2 -top-2 mds-editor8:-top-3'>

                                            {
                                                (friendsRequest !== undefined && friendsRequest.length > 0) &&

                                                <Badge badgeContent={friendsRequest.length} showZero color="success" max={20}>

                                                </Badge>
                                            }

                                        </article>
                                    </section>



                                    {/* //userSerach the data from server */}
                                    <section className='notification  flex  ml-[3rem] cursor-pointer relative  align-middle mt-[4px] justify-center'
                                        onClick={() => setShowNotification(!showNotification)}
                                        ref={notification}>
                                        <MdNotifications className='text-[2rem] self-center text-[#270082]' />
                                        <article className=' bg-red-500 absolute right-2 -top-2 mds-editor8:-top-3'>
                                            {
                                                <Badge badgeContent={Length} showZero color="secondary" max={20}>

                                                </Badge>
                                            }

                                        </article>
                                    </section>
                                    <section className='messenger  flex ml-[1.8rem] cursor-pointer   relative mt-[3px]'
                                        ref={message}>
                                        <BsMessenger className='text-[1.6rem] self-center  text-[#270082]' />
                                        {/* -mt-[2.5rem] ml-[1.5rem] */}
                                        <article className='absolute right-1 -top-2 mds-editor8:-top-3 '>
                                            {
                                                UserInformationLoad?.message &&
                                                <Badge badgeContent={UserInformationLoad?.message.length} color="primary" max={20} >

                                                </Badge>
                                            }
                                        </article>
                                    </section>
                                </div>
                                <div className="mr-2 ml-6  relative ">
                                    <div className="img cursor-pointer flex-shrink-0 w-[2.5rem] h-[2.5rem] mr-3 md:mr-0"
                                        onClick={() => {
                                            setShowRightSideBar(!showRightSideBar)
                                        }}

                                    >
                                        {LoaderRedux ? "" : !showImage ?
                                            <Image src={userProfile}
                                                rounded alt="img"
                                                className="w-[2.5rem] h-[2.5rem] flex-shrink-0 mr-2"
                                            />
                                            :

                                            <Image src={showImage}
                                                rounded alt="img" className="w-[2.5rem] h-[2.5rem] flex-shrink-0 mr-2" />}
                                    </div>


                                    {/* <Dropdown
                                        color="transparent"
                                        buttonText={
                                            <div className={`w-11 bg-black rounded-full h-11 text-center d-flex justify-center object-cover ${LoaderRedux && "animate-pulse"}`} style={{
                                                display: "flex", justifyContent: "center"
                                            }}
                                            >
                                                {
                                                    // showImage
                                                    // <CircleLoader />
                                                    LoaderRedux ? "" : !showImage ? <Image src={userProfile}
                                                        rounded alt="img" style={{ width: "100%", height: "100%", backgroundSize: "cover" }} /> : <Image src={showImage}
                                                            rounded alt="img" style={{ width: "100%", height: "100%" }} />
                                                }
                                                <div className=' bg-[#00FF7F] rounded-full   w-[10px] h-[10px] absolute ml-[1.6rem] 1sm:w-[8px] 1sm:h-[8px] animate-ping animate-pulse '></div>
                                            </div>
                                        }
                                        rounded
                                        onClick={() => {
                                            setShowRightSideBar(!showRightSideBar)
                                        }}
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


                                    </Dropdown> */}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </nav >
            <AnimatePresence>
                {
                    showRightSideBar &&
                    <AdminRightSideBar showRightSideBar={showRightSideBar}
                        setShowRightSideBar={setShowRightSideBar}
                    />


                }
            </AnimatePresence>
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
                        <Notification userLiked={likedUserDatails} socket={socket} SetNotificationLength={SetNotificationLength} />
                    </PopoverBody>
                </PopoverContainer>
            </Popover>

            <Popover placement="bottom" ref={message}>
                <PopoverContainer>
                    <PopoverHeader>Messages</PopoverHeader>
                    <PopoverBody>

                        <Messages message={UserInformationLoad?.message} socket={socket} />
                    </PopoverBody>
                </PopoverContainer>
            </Popover>

            <Popover placement="bottom" ref={friends}>
                <PopoverContainer>
                    <PopoverHeader>{friendsRequest !== undefined && friendsRequest.length > 0 ? "Friends Notification" : "No Notification: "}</PopoverHeader>
                    <PopoverBody>
                        {
                            // friendsRequest


                            friendsRequest !== undefined &&

                            friendsRequest.length > 0 && (
                                friendsRequest.map((item) => {
                                    console.log({ item })
                                    return (
                                        <>
                                            <FriendsNoti
                                                currentUser={item._id}
                                                name={item.name}
                                                url={item.url}
                                                type={item.type}

                                                AcceptFriendRequest={AcceptFriendRequest}

                                                DeleteFriendRequest={
                                                    DeleteFriendRequest
                                                } />
                                        </>
                                    )

                                }))
                        }
                    </PopoverBody>
                </PopoverContainer>
            </Popover>
        </>
    );
}
