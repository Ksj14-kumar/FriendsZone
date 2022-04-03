import { NavLink, Route, Router, useLocation, Switch, useHistory } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import NavbarInput from '@material-tailwind/react/NavbarInput';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import userProfile from '../assets/img/download.png'
import { useContext, useEffect, useRef } from 'react';
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
import { MdDelete, MdUploadFile, MdNotifications } from 'react-icons/md'
import { BsMessenger } from 'react-icons/bs'
import { useState } from 'react'
import ProgressBar from './ProgressBar';
import CircleLoader from '../Loader/CircleLoader';
import { error, success } from '../toastifyMessage/Toast'
import Badge from '@mui/material/Badge';
import Notification from './Notification/Notification';
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";



const { _id } = JSON.parse(localStorage.getItem("user_login")) ? JSON.parse(localStorage.getItem("user_login")) : { _id: "" }




function useOutsideAlerter(ref, setImageValue, dispatch, setProgressMessage, setImageValueBackground, setDeleteMessage) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");

                // console.log("click outside the woindow")
                setImageValue("")
                setProgressMessage("")
                setDeleteMessage("")
                setImageValueBackground("")
                dispatch({ type: "UNSELECT_POST_IMAGE", payload: "" })
                dispatch({ type: "UNSELECT_PROFILE_IMAGE", payload: "" })
                dispatch({ type: "UNSELECT_BACKGROUND_IMAGE", payload: "" })
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}















export default function AdminNavbar({ showSidebar, setShowSidebar }) {

    //ALLS  HOOKS
    const wrapperRef = useRef()
    const history = useHistory()
    const [showModal, setShowModalCode] = useState(false);
    const [showModalBackground, setShowModalCodeBackground] = useState(false);
    const [fileinput, setFileInput] = useState();
    const [fileinputBackground, setFileInputBackground] = useState();
    const [previewImage, setPreviewImage] = useState()
    const [previewImageBackground, setPreviewImageBackground] = useState()
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
    const notification = useRef(null)




    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef, setImageValue, setImageValueBackground, dispatch, setProgressMessage, setDeleteMessage)
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











    function imageUploadHandler(e) {

        const file = e.target.files[0]
        setFileInput(file)
        const nameOfImage = e.target.value.split("\\")[2]
        //SET THE IMAGE NAME USING REDUCER
        setImageValue(UnselectProfileImage.value)
        dispatch({ type: "SELECT_IMAGE_NAME", payload: nameOfImage })
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            setPreviewImage(reader.result)
        }
    }


    //BACKGROLUND IMAGES UPLOADER
    function imageUploadHandlerBackground(e) {
        const file = e.target.files[0]
        setFileInputBackground(file)
        const nameOfImage = e.target.value.split("\\")[2]
        //SET THE IMAGE NAME USING REDUCER
        setImageValueBackground(UnselectProfileImage.value)
        dispatch({ type: "UNSELECT_BACKGROUND_IMAGE", payload: nameOfImage })

        //load the image as base64 ultra safe
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            // set the image base64 value
            setPreviewImageBackground(reader.result)
        }

    }


    function fileInputSubmit(e) {
        e.preventDefault()
        if (!fileinput) {
            alert("Please select a profile image")
            return
        }
        else {
            // setShowImage(previewImage)
            setUploadLoader(true)
            uploadImageFile(previewImage)
        }
    }

    //BACKGROUND UPLOADER
    function fileInputSubmitBackground(e) {
        e.preventDefault()
        if (!fileinputBackground) {
            alert("Please select a profile image")
            return
        }
        else {
            // setShowImage(previewImage)
            setUploadLoaderBackground(true)
            uploadImageFileBackground(previewImageBackground)
            console.log("fileinputBackground", previewImageBackground)
        }
    }





    async function uploadImageFile(base65EncodedImage) {
        let percentCompleted;
        try {
            const res = await axios({
                url: `blob/user/blob/image/9fHtqOJumtxOzmTfLMFT/ETXsG3rHrnx2irUZmefU/njVzxxrEx84ZrUiERB0t/fxXRdJLMKIkzxucTbovy/sO9rLr3E0EuDpjYcawQD/${_id}`,
                data: JSON.stringify({ data: base65EncodedImage }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),
                },
                onUploadProgress: (progressEvent) => {
                    percentCompleted = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                }
            })
            // console.log("upload image response", res)
            // console.log("upload image response", res.data.message)
            if (res.status === 200) {
                setUploadLoader(false)
                setProgressStatus(percentCompleted)
                setProgressMessage(res.data.message)
                history.push(location)
                return
            }
            else {
                error({ message: res.data.message })
                alert(res.data.message)
            }
        } catch (err) {
            console.error(err)
        }
    }


    //BACKGROUND IMAGE UPLOADER


    async function uploadImageFileBackground(base65EncodedImage) {
        let percentCompleted;
        // console.log("base65EncodedImage", base65EncodedImage)
        const backgroudImageUrl = URL.createObjectURL(fileInputSubmitBackground)
        console.log("background image url", backgroudImageUrl)
        dispatch({ type: "ShowImageBackground", payload: backgroudImageUrl })
        console.log("ShowImageBackground", fileInputSubmitBackground)
        console.log("backgorund image url", backgroudImageUrl)

        try {
            const res = await axios({
                url: `blob/user/blob/image/bg/S6MjFqeb8HdJRGjkUs9W/QUCzIb1mKtMevddN24yB/YWYhtXwEEtUlHu0Nkhmq/eAQCSzpYo28SJxXCMV4d/yR3VTmMynJw6N3xlS530/WpsJsZKo4hGf18jaWmZL/${_id}`,
                data: JSON.stringify({ data: base65EncodedImage }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("uuid"),
                },
                onUploadProgress: (progressEvent) => {
                    percentCompleted = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                }
            })
            if (res.status === 200) {





                setUploadLoaderBackground(false)
                setProgressStatus(percentCompleted)
                setProgressMessageBackground(res.data.message)
                history.push(location)
                return

            }
            else {

            }

        } catch (err) {
            console.error(err)

        }

    }



    async function RemoveProfilePhoto() {
        try {
            setDeleteLoader(true)
            const res = uploadImageDataFromServer && await axios({
                url: "blob/delete/assest/",
                data: JSON.stringify({ uploadImageDataFromServer }),
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),
                }
            })
            if (res.status === 200) {
                setDeleteMessage(res.data.message)
                setDeleteLoader(false)
                return
            }
            else {
                window.alert(res.data.message)
                return
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function RemoveBackgroundPhoto() {
        try {
            setDeleteLoader(true)

            const res = uploadImageDataFromBackground.length > 0 && await fetch("blob/delete/assest/bg", {
                body: JSON.stringify({ uploadImageDataFromBackground }),
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),
                }
            })

            const resData = await res.json()
            if (res.status === 200) {
                setDeleteMessage(resData.message)
                setDeleteLoader(false)
                return

            }
            else if (res.status === 401) {
                error({ message: resData.message })
                window.alert(resData.message)
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




    return (
        <>

            <nav className="bg-light-blue-500 md:ml-64 py-2 px-3">
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
                                onClick={() =>
                                    setShowSidebar('-left-64')}
                            >
                                <Icon name="close" size="2xl" color="white" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex  items-center w-full  justify-end">
                        <div className="flex">

                            <NavbarInput placeholder="Search" className="bg-red-500 text-black " />


                            <section className='notification  flex  ml-[3rem] cursor-pointer '
                                onClick={() => setShowNotification(!showNotification)}
                                ref={notification}
                            >
                                <MdNotifications className='text-[2rem] self-center -mt-1 text-[#270082]' />
                                <div className=' bg-[#D82148] rounded-full mt-[3px]   w-[10px] h-[10px] absolute ml-[1rem] 1sm:w-[8px] 1sm:h-[8px]  animate-ping '>

                                </div>
                            </section>





                            <section className='messenger  flex ml-[2rem] cursor-pointer'>
                                <BsMessenger className='text-[1.6rem] self-center -mt-1 text-[#270082]' />
                                <article className='-mt-[8px]'>

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












            <Modal size="sm" active={showModal} className="z-[1000]" toggler={() => setShowModalCode(false)}>
                <div ref={wrapperRef}>


                    <form onSubmit={fileInputSubmit}  >

                        <ModalHeader toggler={() => setShowModalCode(false)}>
                            Profile Image
                        </ModalHeader>
                        <ModalBody>


                            {uploadLoader ? <ProfileLoader /> : progressMessage === "Uploaded Successfully" ? <ProgressBar text={progressMessage} bgColor="green" /> : UnselectProfileImage.value ? <ImageShow text={UnselectProfileImage.value} /> :


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
                                        />
                                    </label>
                                </div>



                            }



                            {showImage &&

                                (deleteLoader ? <ProfileLoader /> : deleteMessage ? <ProgressBar text={deleteMessage} bgColor="red" /> :




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
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (!fileinput) {

                                        setShowModalCode(false)
                                    }
                                    else {
                                        setShowModalCode(true)
                                    }
                                    fileInputSubmit(e)
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
                <form onSubmit={fileInputSubmitBackground} ref={wrapperRef} >

                    <ModalHeader toggler={() => setShowModalCodeBackground(false)}>
                        Background Image
                    </ModalHeader>
                    <ModalBody>
                        {uploadLoaderBackground ? <ProfileLoader /> : progressMessageBackground === "Uploaded Successfully" ? <ProgressBar text={progressMessageBackground} bgColor="green" /> : UnselectBackgroundImage.value ? <ImageShow text={UnselectBackgroundImage.value} /> :


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
                                    />
                                </label>
                            </div>
                        }
                        {ShowImageBackground &&

                            (deleteLoader ? <ProfileLoader /> : deleteMessage ? <ProgressBar text={deleteMessage} bgColor="red" /> :
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

                            }}
                            ripple="dark"
                        >
                            Close
                        </Button>

                        <Button
                            color="green"
                            // onClick={(e) => setShowModalCodeBackground(false)}
                            onClick={(e) => {
                                e.preventDefault()
                                if (!fileinputBackground) {

                                    setShowModalCodeBackground(false)
                                }
                                else {
                                    setShowModalCodeBackground(true)
                                }
                                fileInputSubmitBackground(e)
                            }
                            }
                            ripple="light"
                        >
                            Upload
                        </Button>

                    </ModalFooter>
                </form>

            </Modal>

            <ToastContainer />



            {/* ==========================NOTIFICATION======================= */}

            <Popover placement="bottom" ref={notification}>
                <PopoverContainer>
                    <PopoverHeader>Notifications</PopoverHeader>
                    <PopoverBody>

                        <Notification/>




                    </PopoverBody>
                </PopoverContainer>
            </Popover>

        </>
    );
}









