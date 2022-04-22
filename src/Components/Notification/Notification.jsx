import React, { useEffect, useState } from 'react'
import img1 from '../../assets/img/team-1-800x800.jpg';
import img2 from '../../assets/img/team-2-800x800.jpg'
import img3 from '../../assets/img/team-2-800x800.jpg'
import img4 from '../../assets/img/team-2-800x800.jpg'
import Image from "@material-tailwind/react/Image"
import image from "../../assets/img/download.png"
import { useDispatch, useSelector, useStore } from 'react-redux';



function Notification({ userLiked, socket }) {
    const [notification, setNotification] = useState([])
    // console.log("use details fetch from server", userLiked)

    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    const { _id, fname, lname, googleId, college, city, country, position, stream, aboutMe } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "", googleId: "" }


    useEffect(() => {
        socket.on("getNotification", (data) => {
            // console.log({ data })
            setNotification(pre => [...pre, data])

        })
    }, [socket])

    useEffect(() => {
        // console.log("notification", notification)
        setNotification(userLiked)
    },[userLiked])


    // console.log("notification", notification)
    return (
        <>
            {
                notification.length > 0 ? notification.map((item, index) => {
                    return (
                        <>
                            {
                                (item.postImageURL && item.name) &&
                                <ul className="notifications" key={index}>
                                    <li className="links1 flex align-middle justify-between cursor-pointer mt-2">
                                        <div className="left-side flex rounded-full w-[2.5rem] h-[2.5rem]">
                                            <Image
                                                src={item.url ? item.url : image}
                                                rounded={true}
                                                raised={false}
                                                alt="Rounded Image"
                                            />
                                        </div>
                                        <div className="right-side flex align-middle mt-2 ml-2 ">
                                            {/* {
                                                item.likedBy === googleId ?
                                                    <>
                                                        <p className='font-bold mr-1'>you </p>  liked 
                                                    </>
                                                    : <>
                                                      
                                                    </>
                                            } */}

                                            <p className='font-bold mr-1'>{item.name}</p> like your post
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
                                </ul>
                            }
                        </>
                    )
                }) : "No Notification"
            }
        </>
    )
}
export default Notification;