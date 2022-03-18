import { useLocation } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import NavbarInput from '@material-tailwind/react/NavbarInput';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import ProfilePicture from '../assets/img/team-1-800x800.jpg';



import { useContext, useEffect } from 'react';
import App, { Context } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import ImageShow from '../Components/ImageShow'
import ProfileLoader from '../Loader/ProfileLoader'

import axios from "axios";




import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
// import Button from "@material-tailwind/react/Button";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete, MdUploadFile } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'


import { useState } from 'react'

import team from '../assets/img/team-2-800x800.jpg';
import Progress from './ProgressBar';
import ProgressBar from './ProgressBar';



export default function AdminNavbar({ showSidebar, setShowSidebar }) {
    const [showModal, setShowModalCode] = useState(false);
    const [fileinput, setFileInput] = useState();
    const [previewImage, setPreviewImage] = useState()
    const [images, setImages] = useState([])
    const [showImage, setShowImage] = useState(null)
    const [progressStatus, setProgressStatus] = useState(0)
    const [imageValue, setImageValue] = useState("")
    const [progressMessage, setProgressMessage] = useState("")
    const [uploadImageDataFromServer, setuploadImageDataFromServer] = useState()

    const [loader, setLoader] = useState(false)
    const [uploadLoader, setUploadLoader] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)

    const [strategyImage, setStrategyImage] = useState("")
    const [deleteMessage, setDeleteMessage] = useState("")


    const dispatch = useDispatch()




    const location = useLocation().pathname;
    const context = useContext(Context)
    // console.log("context", context.users)
    // console.log("context user data", context.users.user)
    // console.log("context13", context)
    const UnselectProfileImage = useSelector((state) => {
        return state.UnselectProfileImage
    })

    console.log("delect profile images")

    console.log(UnselectProfileImage)






    const { _id, name, email, googleId, password, role, status, image } = context.users.user

    const message = context.users.message






    useEffect(() => {
        async function ProfileImages() {
            setLoader(true)

            const res = await fetch("/profile/image")

            const data = await res.json()
            console.log(data, "data is ")
            const parseValue = data.parseData
            console.log("user images from server")
            console.log(parseValue.resources)

            if (res.status === 200) {
                setuploadImageDataFromServer(parseValue.resources)
                setShowImage(parseValue.resources[0].url)

                setLoader(false)


            }
            else {
                console.log("Image is not load")
            }
        }
        ProfileImages()






    }, [])

    console.log("show image is", showImage)

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


    function fileInputSubmit(e) {

        if (!fileinput) {
            alert("please select a file")
            return
        }
        else {
            // setShowImage(previewImage)
            setUploadLoader(true)

            uploadImageFile(previewImage)


        }


    }





    async function uploadImageFile(base65EncodedImage) {
        let percentCompleted;

        try {
            const res = await axios({
                url: "/user/blob/image",
                data: JSON.stringify({ data: base65EncodedImage }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                onUploadProgress: (progressEvent) => {

                    percentCompleted = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))

                    // setProgressStatus(percentCompleted)
                }
            })


            if (res.status === 200) {
                // setPreviewImage(res.data.data.url)
                // setShowImage(res.data.data.url)
                console.log("image uploaded")
                console.log(res.data)
                // setuploadImageDataFromServer(res.data.data)
                setUploadLoader(false)
                setProgressStatus(percentCompleted)
                setProgressMessage(res.data.message)

                // setShowImage(res.data.data.url)

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
                url: "/delete/assest/",
                data: JSON.stringify({ uploadImageDataFromServer }),
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })


            console.log("delete response", res.data.message)



            if (res.status === 200) {
                console.log("image deleted")
                setDeleteMessage(res.data.message)
                // setShowImage(null)
                // setuploadImageDataFromServer({})
                // setProgressStatus(0)
                // setProgressMessage(res.data.message)
                setDeleteLoader(false)

                return

            }
            else {

            }

        } catch (err) {
            console.error(err)

        }


    }





    return (
        <>

            <nav className="bg-light-blue-500 md:ml-64 py-6 px-3">
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
                                onClick={() => setShowSidebar('-left-64')}
                            >
                                <Icon name="close" size="2xl" color="white" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center w-full">
                        <h4 className="uppercase text-white text-sm tracking-wider mt-1">
                            {location === '/'
                                ? "DASHBOARD"
                                : location.toUpperCase().replace('/', '')}
                        </h4>

                        <div className="flex ">

                            <NavbarInput placeholder="Search" className="bg-red-500 text-black" />




                            <div className="-mr-4 ml-6 ">
                                <Dropdown
                                    color="transparent"
                                    buttonText={
                                        <div className="w-11 rounded-full bg-[#000D6B]       h-11 text-center d-flex justify-center" style={{
                                            display: "flex", justifyContent: "center"
                                            
                                        }}

                                        >
                                            {/* strategyImage ? strategyImage :  */}
                                            {/* loader ? <ProfileLoader /> : name[0] */}
                                            <Image src={showImage ? showImage : <FaUserCircle />}
                                                rounded alt="img" style={{ width: "100%", height: "100%" }} />
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
                                        Change picture

                                    </DropdownItem>
                                    <DropdownItem color="lightBlue">
                                        Update Profile
                                    </DropdownItem>
                                    <DropdownItem color="lightBlue">
                                        Something Else
                                    </DropdownItem>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >


            {/* {showImage && <img src={showImage} className="profileImages" style={{ width: "100%", height: "30rem" }} alt="images" />} */}

            {/* {showImage ? <img src={showImage} className="profileImages" style={{ width: "100%", height: "30rem" }} alt="images" /> : <ProfileLoader />}


            <p>

                lor thiks is sahjsdfcjkhds

            </p>
            {loader} */}










            <Modal size="sm" active={showModal} toggler={() => setShowModalCode(false)}>
                <form onSubmit={fileInputSubmit} >

                    <ModalHeader toggler={() => setShowModalCode(false)}>
                        Profile Image
                    </ModalHeader>
                    <ModalBody>


                        {uploadLoader ? <ProfileLoader /> : progressMessage ? <ProgressBar text={progressMessage} bgColor="green" /> : UnselectProfileImage.value ? <ImageShow text={UnselectProfileImage.value} /> :


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
                                        setStrategyImage(UnselectProfileImage.value)

                                        dispatch({ type: "SET_UNSELECT_PROFILE_IMAGE", payload: { value: "" } })
                                    }}
                                >

                                    <label className="w-64 flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">


                                        <div className='' style={{ color: "red", fontSize: "2rem" }}>
                                            <MdDelete />
                                        </div>
                                        <span className="mt-2 text-base leading-normal" style={{ color: "#DA1212" }}>Remove Profile Photo</span>



                                    </label>



                                </div>)

                        }








                        {/* </p> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="red"
                            buttonType="link"
                            onClick={(e) => {
                                // e.preventDefault()

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
                            Upload Images
                        </Button>

                    </ModalFooter>
                </form>

            </Modal>

        </>
    );
}



async function success(props) {
    window.alert("select files")
    const notify = () => toast.success(props.message, {
        position: "top-center",
        zIndex: 9999,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });

    notify()
    return (
        <div>

            <ToastContainer />
        </div>
    );
}




function error(props) {

    const notify = () => toast.error(props.message, {
        position: "top-center",
        zIndex: 9999,

        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });

    notify()
    return (
        <div>

            <ToastContainer />
        </div>
    );
}






