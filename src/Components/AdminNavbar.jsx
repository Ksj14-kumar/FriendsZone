import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';
// import Dropdown from '@material-tailwind/react/Dropdown';
// import DropdownItem from '@material-tailwind/react/DropdownItem';
import userProfile from '../assets/img/download.png'
import { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageShow from './ImageShow'
import ProfileLoader from '../Loader/ProfileLoader';
import axios from "axios";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { MdDelete, MdNotifications } from 'react-icons/md'
import { FaUserFriends } from 'react-icons/fa'
import { BsMessenger } from 'react-icons/bs'
import { useState } from 'react'
import Badge from '@mui/material/Badge';
// import Notification from './Notification/Notification';
// import Popover from "@material-tailwind/react/Popover";
// import PopoverContainer from "@material-tailwind/react/PopoverContainer";
// import PopoverHeader from "@material-tailwind/react/PopoverHeader";
// import PopoverBody from "@material-tailwind/react/PopoverBody";
import { motion, AnimatePresence } from "framer-motion"
import { success, error } from '../toastifyMessage/Toast';
import SearchBarTable from '../SearchBarTable';
// import FriendsNoti from './Notification/FriendsNoti';
// import Messages from "./Notification/Messages";
import AdminRightSideBar from "./AdminRightSideBar"
import FriendsNotification from './AdminNavbarComponents/FriendsNotification';
import AllTypeOfNotificationAdminNavbar from './AdminNavbarComponents/AllTypeOfNotificationAdminNavbar';
import MessagesNotifications from './AdminNavbarComponents/MessagesNotifications';
import React from 'react';
import { useLocation } from 'react-router-dom';

const _id = localStorage.getItem("uuid")

function AdminNavbar({ showSidebar, setShowSidebar, socket }) {
    //ALLS  HOOKS
    const wrapperRef = useRef()
    const location = useLocation()
    const [showModal, setShowModalCode] = useState(false);
    const [showModalBackground, setShowModalCodeBackground] = useState(false);
    const [progressMessage, setProgressMessage] = useState("")
    const [showNotification, setShowNotification] = useState(false)
    const [uploadLoader, setUploadLoader] = useState(false)
    const [uploadLoaderBackground, setUploadLoaderBackground] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState("")
    const [disabledButton, setDisabledButton] = useState(false)
    const [disabledButtonBg, setDisabledButtonBg] = useState(false)
    const [userSearchHistory, setUserSearchHistory] = useState([])
    const [Length, SetNotificationLength] = useState(null)
    const [accecptMessageNotification, setUserMessageAfterAcceptRequest] = useState([])
    const [showRightSideBar, setShowRightSideBar] = useState(false)
    const notification = useRef(null)
    const messenger = useRef(null)
    const AllTypeNitification = useRef(null)
    const clickOutSideFriendsNoti = useRef(null)
    const friends = useRef(null)
    const ImageRef = useRef(null)
    const disableProfilePostButton = useRef(null)
    const [query, setQuery] = useState("")
    const [userData, setUserData] = useState([])
    const [popOver, setPopOverEffect] = useState(false)
    const [url, setUrl] = useState("")
    const [BgUrl, setBackgroundImageUrl] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [friendsRequest, setFriendsRequest] = useState([])
    const [expandSearch, setExpandSearch] = useState(false)
    const [messageAftetAcceptRequest, setMessageAfterRequestAccept] = useState([])
    const [acceptRequest, setAcceptRequest] = useState(false)
    const [receivedRequest, setReceivedRequest] = useState([])
    const [friendModalNotification, setFriendModalNotification] = useState(false)
    const [AllNotificationSet, setAllNotification] = useState([])
    const [messengerComponent, setMessengerComponent] = useState(false)
    const [messageNotification, setMessagesNotification] = useState([])
    const [arrivalMessageNotification, setArrivalMessageNotification] = useState([])
    const dispatch = useDispatch()
    // ==========================================ALL Reducer function==================================
    //UNSELECT THE PROFILR iMAGES
    const { uploadImageDataFromServer, showImage, uploadImageDataFromBackground, ShowImageBackground, LoaderRedux, checkUrlExitsBg, checkUrlExitsProfile, UserInformationLoad, UnreadMessageNotification, theme } = useSelector((state) => {
        return {
            showImage: state.ShowImage.value,
            uploadImageDataFromBackground: state.uploadImageDataFromBackground,
            ShowImageBackground: state.ShowImageBackground.value,
            LoaderRedux: state.LoaderRedux,
            checkUrlExitsBg: state.checkUrlExitsBg,
            checkUrlExitsProfile: state.checkUrlExitsProfile,
            UserInformationLoad: state.UserInformationLoad.value,
            UnreadMessageNotification: state.UnreadMessageNotification,
            uploadImageDataFromServer: state.uploadImageDataFrom,
            theme: state.Theme
        }
    })
    const { receiverrequest, AllNotification } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "", googleId: "", senderrequest: [], receiverrequest: [], AllNotification: [] }




    // useEffect(() => {
    //     async function LoadUnreadMessages() {
    //         try {
    //             const res = await axios({
    //                 method: "GET",
    //                 url: `${process.env.REACT_APP_API_BACKENDURL}/api/v1/load/all/unread/message/${UserInformationLoad?.googleId}`,
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": localStorage.getItem("uuid"),
    //                 }
    //             })
    //             console.log({ res })

    //         } catch (err) {

    //         }

    //     }

    //     LoadUnreadMessages()

    // }, [])


    useEffect(() => {
        const value1 = UserInformationLoad.message?.length ? UserInformationLoad.message : []
        setUserMessageAfterAcceptRequest(value1)
    }, [UserInformationLoad])


    useEffect(() => {
        setReceivedRequest(receiverrequest?.length === 0 ? [] : receiverrequest?.sort((a, b) => {
            return b.time - a.time
        }))
        setAllNotification(AllNotification?.length === 0 ? [] : AllNotification?.sort((a, b) => {
            return b.time - a.time
        }))
        if (UserInformationLoad.message?.length > 0 || UnreadMessageNotification?.length > 0) {
            const value1 = UserInformationLoad.message?.length ? UserInformationLoad.message : []
            const value2 = UnreadMessageNotification?.length ? UnreadMessageNotification : []

            if (arrivalMessageNotification.length === 0) {
                setMessagesNotification([...accecptMessageNotification, ...value2])
            }
            else {

                if (arrivalMessageNotification.length === 0) {
                    setMessagesNotification([...value2, ...accecptMessageNotification])
                }
                else {
                    setMessagesNotification([...accecptMessageNotification, ...arrivalMessageNotification])
                }


            }

        }
    }, [UserInformationLoad, accecptMessageNotification, arrivalMessageNotification])
    useEffect(() => {
        socket?.off("getNotificationAllType")?.on("getNotificationAllType", (data) => {
            AllNotificationSet !== undefined && setAllNotification([data, ...AllNotificationSet])
        }
        )
    }, [socket])

    //get the user messags Notificatio
    useEffect(() => {

        socket?.off("getMessageNotification")?.on("getMessageNotification", async (data) => {
            const isAlreadyUserExits = arrivalMessageNotification !== undefined && arrivalMessageNotification.length > 0 && arrivalMessageNotification?.some((v) => v?.anotherUserId === data?.anotherUserId)
            if (isAlreadyUserExits) {
                const value = arrivalMessageNotification.map((item) => {
                    if (location.search.split("=")[1] === undefined && location.search.split("=")[1] !== data.anotherUserId && location.pathname !== "/messages") {
                        if (item.anotherUserId === data.anotherUserId) {
                            return {
                                ...item,
                                messageLength: item.messageLength + 1
                            }
                        }
                        else {

                            return item
                        }
                    }

                })
                setArrivalMessageNotification(value)

            }
            else {
                if (location.search.split("=")[1] !== data.anotherUserId || location.search.split("=")[1] !== undefined || location.pathname !== "/messages") {
                    if (arrivalMessageNotification.length === 0) {
                        setArrivalMessageNotification([{ ...data, messageLength: 1 }])
                    }
                    else {
                        setArrivalMessageNotification([...arrivalMessageNotification, { ...data, messageLength: 1 }])

                    }


                }
            }
        }
        )
    }, [socket, arrivalMessageNotification])

    //profile image uploader
    function imageUploadHandler(e) {
        if (e.target.files[0].size > 36700160) {
            error({ message: "file size is too large ,less than 16MB" })
            return
        }
        else {
            const file = e.target.files[0]
            const URL = window.URL.createObjectURL(file)
            setUrl(URL)
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = function () {
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
            const URL = window.URL.createObjectURL(file)
            setBackgroundImageUrl(URL)
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = function () {
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
            const serverResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/blob/image/9fHtqOJumtxOzmTfLMFT/ETXsG3rHrnx2irUZmefU/njVzxxrEx84ZrUiERB0t/fxXRdJLMKIkzxucTbovy/sO9rLr3E0EuDpjYcawQD/`, {
                method: "POST",
                body: JSON.stringify({
                    data:
                        checkUrlExitsProfile.value,
                    url: url,
                    // url: previewImage,
                    uuid: _id
                }),
                headers: {
                    "Content-Type": "application/json",
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
                // const res = await fetch(data.url)
                // const blobURL = await res.blob()
                // const blob = URL.createObjectURL(blobURL)
                // dispatch({ type: "OriginalProfileURL", payload: data.url })
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
                    // url: previewImage,
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
                let backgroundURL;
                if (data.url) {
                    const res = await fetch(data.url)
                    const blob = await res.blob()
                    backgroundURL = URL.createObjectURL(blob)
                }
                else {
                    backgroundURL = ""
                }
                success({ message: message })
                //set the base64 url encode value none after submit profile image to server or clear input file field
                dispatch({ type: "SetValueOfPreviewImageBg", payload: "" })
                //dispatch the latest profile image url to the profile image component
                dispatch({ type: "ShowImageBackground", payload: backgroundURL })
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
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/delete/assest/`, {
                body: JSON.stringify({ uploadImageDataFromServer, uuid: _id }),
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),
                }
            })
            const responseData = await res.json()
            if (res.status === 200) {
                dispatch({ type: "ShowImage", payload: "" })
                setDisabledButton(false)
                success({ message: "Profile photo removed successfully" })
                //show the delete message send by server
                //show the toastify message after successfull delete
                //set the profile image url none afetr delete the profile photos
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
                return
            }
            // window.alert(res.data.message)
        }
        catch (err) {
            console.warn(err)
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
            const { message } = resData
            if (res.status === 200) {
                setDeleteLoader(false)
                setDisabledButtonBg(false)
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
            console.warn(err)
        }
    }
    //====================LOGOUT THE ACCOUNT=============================
    async function logout() {
        try {
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
        catch (err) {
            console.warn(err)
        }
    }
    // search the query from the server
    useEffect(() => {
        try {
            const search = async () => {
                const res = await axios.get(`${process.env.REACT_APP_API_BACKENDURL}/blob/search?q=${query}`, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                setUserData(res.data)  //notice that we can not use await keyword inside here
            }
            search()
        }
        catch (err) {
            console.warn(err)
        }
    }, [query])
    useEffect(() => {
        if (wrapperRef.current.contains(document.activeElement) === false) {
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
    async function DeleteFriendRequest(senderId) {
        try {
            setReceivedRequest(receiverrequest.filter(friend => friend._id !== senderId))
            await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/deletefriend/request`, {
                method: "DELETE",
                body: JSON.stringify({ senderId }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
        }
        catch (err) {
        }
    }
    //accecpt the friend request
    async function AcceptFriendRequest(senderId, name, url) {
        try {
            const acceptResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/acceptfriend/request`, {
                method: "POST",
                body: JSON.stringify({ senderId, name, url }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            const acceptResponseData = await acceptResponse.json()
            if (acceptResponse.status === 200) {
                const array = receivedRequest.filter(friend => { return friend._id !== senderId })
                setReceivedRequest(array)
                setAcceptRequest(true)
                setMessageAfterRequestAccept(acceptResponseData.Users)
                // success({ message: acceptResponseData.message })
                // setFriendsRequest(friendsRequest.filter(friend => friend._id !== senderId))
            }
            else if (acceptResponse.status !== 200) {
                // error({ message: acceptResponseData.message })
            }
        }
        catch (err) {
        }
    }
    useEffect(() => {
        async function loadHistory() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/history/user/history/fetch`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const resData = await res.json()
                const data = resData.data
                if (res.status === 200) {
                    // if (Aborted === false) {
                    setUserSearchHistory(data?.history)
                    // }
                }
                else if (res.status !== 200) {
                    //not load hisory
                }
            }
            catch (err) {
                // console.warn(err)
            }
        }
        loadHistory()
    }, [])
    async function deleteHistory(searchUserId) {
        try {
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
        catch (err) {
            console.warn(err)
        }
    }
    useEffect(() => {
        if (ImageRef.current) {
            const { top, left, width, height } = ImageRef.current.getBoundingClientRect()
            dispatch({ type: "POS_AdminNavBar", payload: { x: left + width / 2, y: top + height / 2 } })
        }
    }, [ImageRef])
    // ======================================CLICK OUTSIDE THE clickOutSideFriendsNotification==========
    useEffect(() => {
        function handleClickOutside(event) {
            if (clickOutSideFriendsNoti.current && !clickOutSideFriendsNoti.current.contains(event.target)) {
                setFriendModalNotification(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [clickOutSideFriendsNoti])
    // messengerComponent
    // ======================================CLICK OUTSIDE THE the messenger component==========
    useEffect(() => {
        function handleClickOutside(event) {
            if (messenger.current && !messenger.current.contains(event.target)) {
                setMessengerComponent(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [messenger])
    // ==============================================CLICK OUTSIDE OF ALL TYPE NOTIFICATIONS=======================
    useEffect(() => {
        function handleClickOutside(event) {
            if (AllTypeNitification.current && !AllTypeNitification.current.contains(event.target)) {
                setShowNotification(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [AllTypeNitification])


    console.log({ theme })
    return (
        <>
            <nav className={`${theme ? "bg-[#000000fc] drop-shadow-xl border-b border-b-solid border-b-[#212121]" : " bg-light-blue-500"}  py-2 px-3 fixed w-full z-[18] drop-shadow-lg`}>
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
                            <div className="left_side_search flex  flex-[8] md:justify-end justify-start items-center relative md:mr-[3rem]">
                                <motion.div className={`wrap_inout_search w-[38rem] mds-editor31:w-[25rem] mds-editor32:w-[3rem] rounded-full transition-all duration-300 ${expandSearch ? "mds-editor32:w-full" : "mds-editor32:w-[3rem]"}`}
                                >
                                    <SearchBarTable showSearch={showSearch} setShowSearch={setShowSearch} setQuery={setQuery} setPopOverEffect={setPopOverEffect} query={query} data={userData} userSearchHistory1={userSearchHistory} deleteHistory={deleteHistory} setExpandSearch={setExpandSearch} expandSearch={expandSearch} theme={theme} />
                                </motion.div>
                            </div>
                            <div className={`group_right_s flex flex-[2]   justify-end  ${expandSearch ? "mds-editor32:hidden" : "block"}`}>
                                <div className={`group_icons flex md:w-full w-[12rem]   justify-around items-center  gap-x-2`}>
                                    <section className={`friends  flex    
                                    relative     align-middle justify-center   flex-shrink-0 rounded-full px-[.5rem] py-[.5rem]  ${theme ? "bg-[#343434b8]" : "bg-[#fff]"}   ${friendModalNotification && " bg-[#bfbfbf]"}`}
                                        ref={clickOutSideFriendsNoti}
                                        onClick={() => {
                                            setFriendModalNotification(true)
                                        }}>
                                        <FaUserFriends className={`text-[2rem] self-center ${theme ? "text-[#fff]" : "text-[#270082]"} cursor-pointer mds-editor28:text-[1.7rem] ${friendModalNotification && "text-[#ef1e1e]"}`} />
                                        <article className='  absolute right-2 -top-2 mds-editor8:-top-[.5rem]  cursor-pointer'>
                                            {
                                                (receiverrequest !== undefined && receiverrequest.length > 0) &&
                                                <Badge badgeContent={receiverrequest.filter((item) => { return item.read === false }).length} color="error" max={20}>
                                                </Badge>
                                            }
                                        </article>
                                        <AnimatePresence>
                                            {friendModalNotification && <FriendsNotification
                                                receivedRequest={receivedRequest} AcceptFriendRequest={AcceptFriendRequest} DeleteFriendRequest={DeleteFriendRequest} messageAftetAcceptRequest={messageAftetAcceptRequest}
                                                __id__={UserInformationLoad?._id}
                                                setReceivedRequest={setReceivedRequest}
                                                theme={theme}
                                            />}
                                        </AnimatePresence>
                                    </section>
                                    <section className={`notification  flex  relative   align-middle flex-shrink-0 justify-center rounded-full px-[.5rem] py-[.5rem] ${theme ? "bg-[#343434b8]" : "bg-[#fff]"} ${showNotification ? "bg-[#bfbfbf] " : ""}`}
                                        onClick={() => setShowNotification(true)}
                                        ref={AllTypeNitification}
                                    >
                                        <MdNotifications className={`text-[2rem] self-center  ${theme ? "text-[#fff]" : "text-[#270082]"}  cursor-pointer mds-editor28:text-[1.7rem] ${showNotification && "text-[#ef1e1e]"}`} />
                                        <article className=' bg-red-500 absolute right-2 -top-2 mds-editor8:-top-[.5rem]  cursor-pointer'>
                                            {
                                                <Badge badgeContent={AllNotificationSet?.length && AllNotificationSet.filter((item) => {
                                                    return item.read === false
                                                }).length
                                                } color="error" max={20}>
                                                </Badge>
                                            }
                                        </article>
                                        <AnimatePresence>
                                            {
                                                showNotification &&
                                                <AllTypeOfNotificationAdminNavbar AllNotification={AllNotificationSet} setAllNotification={setAllNotification}
                                                theme={theme}
                                                    __id__={UserInformationLoad?._id}
                                                />
                                            }
                                        </AnimatePresence>
                                    </section>
                                    <section className={`
                                    messenger  flex  ${theme ? "bg-[#343434b8]" : "bg-[#fff]"}  relative px-[.7rem] py-[.7rem] rounded-full flex-shrink-0 bg-[#fff] ${messengerComponent && "bg-[#bfbfbf] "} `}
                                        ref={messenger}
                                        onClick={() => {
                                            setMessengerComponent(true)
                                        }}
                                    >
                                        <BsMessenger className={`text-[1.6rem] self-center cursor-pointer   ${theme ? `text-[#fff] ${messengerComponent && "text-[#ef1e1e]"}` : `text-[#270082] ${messengerComponent && "text-[#ef1e1e]"}`} mds-editor28:text-[1.3rem] ${messengerComponent && "text-[#ef1e1e]"}`} />
                                        <article className='absolute right-1 -top-2 mds-editor8:-top-[.5rem] cursor-pointer '>
                                            {
                                                // UnreadMessageNotification
                                                // UserInformationLoad?.message.length + UnreadMessageNotification[0]?.messageLength ? UserInformationLoad?.message.length + UnreadMessageNotification[0]?.messageLength : ""
                                                UserInformationLoad?.message &&
                                                <Badge badgeContent={messageNotification.filter((item => item?.read === false)).length} color="error" max={20} >
                                                </Badge>
                                            }
                                        </article>
                                        {messengerComponent &&
                                            // messageNotification
                                            // UserInformationLoad?.message
                                            <MessagesNotifications messageList={messageNotification} setMessengerComponent={setMessengerComponent} setUserMessageAfterAcceptRequest={setUserMessageAfterAcceptRequest}
                                                __id__={UserInformationLoad?._id}
                                                setArrivalMessageNotification={setArrivalMessageNotification}
                                                theme={theme}
                                            />
                                        }
                                    </section>
                                </div>
                                <div className=" flex  justify-center items-center  relative w-[4rem] h-[3rem] ">
                                    <div className={`img cursor-pointer flex-shrink-0 w-[3rem] h-full  md:mr-0 bg-[#d5d5d5]  border-solid border-[#f1f0f0] rounded-full ml-3 ${LoaderRedux && "animate-pulse"}`}
                                        onClick={() => {
                                            setShowRightSideBar(!showRightSideBar)
                                        }}
                                        ref={ImageRef}
                                    >
                                        {LoaderRedux ? "" : !showImage ?
                                            <Image src={userProfile}
                                                rounded alt="img"
                                                className="w-full h-full flex-shrink-0"
                                            />
                                            :
                                            <Image src={showImage}
                                                rounded alt="img" className="w-full h-full flex-shrink-0 " />}
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
            {
                UserInformationLoad !== null &&
                <AnimatePresence>
                    {
                        showRightSideBar &&
                        <AdminRightSideBar showRightSideBar={showRightSideBar}
                            setShowRightSideBar={setShowRightSideBar} logout={logout}
                        />
                    }
                </AnimatePresence>
            }
            {/* //  MAIN BODY OF DASHBOARD */}
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
            {/* <Popover placement="bottom" ref={notification}>
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
                    <PopoverHeader className="bg-red-200">{receivedRequest !== undefined && receivedRequest.length > 0 ? "Friends Notification" : "No Notification: "}</PopoverHeader>
                    <PopoverBody className=" px-0">
                        <div className="wrap w-full">
                            {
                                // friendsRequest
                                receivedRequest !== undefined &&
                                receivedRequest.length > 0 && (
                                    receivedRequest.map((item) => {
                                        console.log({ item })
                                        return (
                                            <>
                                                <FriendsNoti
                                                    SenderRequestId={item._id}
                                                    name={item.name}
                                                    url={item.url}
                                                    type={item.type}
                                                    acceptRequest={acceptRequest}
                                                    AcceptFriendRequest={AcceptFriendRequest}
                                                    setAcceptRequest={setAcceptRequest}
                                                    messageAftetAcceptRequest={messageAftetAcceptRequest}
                                                    DeleteFriendRequest={
                                                        DeleteFriendRequest
                                                    } />
                                            </>
                                        )
                                    }))
                            }
                            <section className='w-full bg-green-500 my-0'>
                                {
                                    // messageAftetAcceptRequest.length && messageAftetAcceptRequest.map((item) => {
                                    //     return (
                                    //         <>
                                    //             <MessageAfterFriendRequestAccept item={item} />
                                    //         </>
                                    //     )
                                    // })
                                    [1, 2, 3, 4].map((item) => {
                                        return (
                                            <>
                                                <MessageAfterFriendRequestAccept item={item} />
                                            </>
                                        )
                                    })
                                }
                            </section>
                        </div>
                    </PopoverBody>
                    <PopoverBody className="bg-blue-600">
                    </PopoverBody>
                </PopoverContainer>
            </Popover> */}
        </>
    );
}

export default AdminNavbar = React.memo(AdminNavbar)
