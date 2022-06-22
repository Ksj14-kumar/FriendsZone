import React, { useEffect, useState } from 'react'
import img1 from '../../assets/img/team-1-800x800.jpg';
import img2 from '../../assets/img/team-2-800x800.jpg'
import img3 from '../../assets/img/team-2-800x800.jpg'
import img4 from '../../assets/img/team-2-800x800.jpg'
import Image from "@material-tailwind/react/Image"
import Button from "@material-tailwind/react/Button";

import image from "../../assets/img/download.png"
import { useDispatch, useSelector, useStore } from 'react-redux';
import { NavLink } from 'react-router-dom';



function Notification({ userLiked, socket, SetNotificationLength }) {
    const [notification, setNotification] = useState([])
    const [length, setAllNotificationLength] = useState(0)
    // console.log("use details fetch from server", userLiked)

    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    const { _id, fname, lname, googleId, college, city, country, position, stream, aboutMe } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "", googleId: "" }

    useEffect(() => {
        // console.log("notification", notification)
        const AbortController1 = new AbortController()
        const Aborted = AbortController1.signal.aborted
        if (Aborted === false) {
            setNotification(userLiked)
        }
        return () => {
            AbortController1.abort()
        }
    }, [userLiked])


    useEffect(() => {
        const AbortController1 = new AbortController()
        const Aborted = AbortController1.signal.aborted
        async function loadNoti() {
            try {
                const loadNoti = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/notification/byId/${googleId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                    }
                })
                const resData = await loadNoti.json()
                // console.log({ resData })
                if (loadNoti.status === 200) {
                    if (Aborted === false) {

                        setAllNotificationLength(resData.data.length)
                        SetNotificationLength(resData.data.length)
                    }
                }
                else if (loadNoti.status !== 200) {

                }

            } catch (err) {
                console.warn(err)

            }


        }
        loadNoti()

        return () => {
            AbortController1.abort()
        }

    }, [userLiked])


    return (
        <>
            {
                notification?.length > 0 ? notification.map((item, index) => {
                    return (
                        <>
                            {
                                <div key={index}>
                                    {
                                        (item.postImageURL && item.name) &&
                                        <ul className="notifications" key={index}>
                                            <li className="links1 flex align-middle justify-between cursor-pointer mt-2 transition-all delay-100 ">
                                                <NavLink to={`/profile/${item.likedBy}`}>


                                                    <div className="left-side flex rounded-full w-[2.5rem] h-[2.5rem]">
                                                        <Image
                                                            src={item.url ? item.url : image}
                                                            rounded={true}
                                                            raised={false}
                                                            alt="Rounded Image"
                                                        />
                                                    </div>
                                                </NavLink>

                                                <div className="right-side flex align-middle mt-2 ml-2 ">


                                                    {
                                                        item.likedBy === googleId ?
                                                            <>
                                                                <p className='font-bold mr-1 truncate'>you</p> like your post
                                                            </>
                                                            :
                                                            <>
                                                                <p className='font-bold mr-1 truncate'>{item.name}</p> like your post
                                                            </>
                                                    }

                                                </div>


                                                <div className="post_image w-[2.5rem] h-[2.5rem] ml-[1rem]">
                                                    {
                                                        item.postImageURL &&
                                                        <Image src={item.postImageURL}
                                                            rounded={false}
                                                            className="w-full h-full rounded-none" />
                                                    }
                                                </div>

                                            </li>
                                        </ul>}
                                </div>

                            }
                        </>
                    )
                }) : "No Notification"
            }

            {length > 5 && <footer className="footer flex justify-center my-2">

                <Button
                    color="blueGray"
                    buttonType="link"
                    size="sm"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="dark"
                    className="normal"

                >
                    <NavLink to={`/all/notification/${googleId}`}>

                        see all notification
                    </NavLink>
                </Button>
            </footer>}

        </>
    )
}
export default Notification;