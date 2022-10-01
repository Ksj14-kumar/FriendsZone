import React, { useEffect, useState } from 'react'
import Photos from "../../assets/img/download.png"
import Image from '@material-tailwind/react/Image'
import Button from '@material-tailwind/react/Button'
import { FaFacebookMessenger, FaUserPlus } from "react-icons/fa"
import Icon from '@material-tailwind/react/Icon'
import {  HiThumbUp } from "react-icons/hi"
import { NavLink } from "react-router-dom"
import {TailSpin } from "react-loader-spinner"
import { useSelector } from 'react-redux'
function ReactUserList({ reactUser,theme,setReactUserLength }) {
    const [userInfo, setUserInfo] = useState({ name: "", image: "", isFriends: "" })
    const [loader, setLoader] = useState(false)
    const [connectMessage, setConnectMessage] = useState(false)
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    useEffect(() => {
        async function getUserReactDetails() {
            try {
                setLoader(true)
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/user/react/${reactUser}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                    }
                })
                const resData = await res.json()
                if (res.status === 200) {
                    setUserInfo(resData.details)
                    setLoader(false)
                }
                else if (res.status !== 200) {
                    setLoader(false)
                }
            }
            catch (err) {
                console.warn(err)
            }
        }
        getUserReactDetails()
    }, [reactUser])
    async function sendFriendRequest(Recieverfname, Recieverlname, RecieverId, RecieverUrl, connectMessage) {
        const sendFriendRequestResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/sendfriendrequest/`, {
            method: "POST",
            body: JSON.stringify({
                profileUrl: UserInformationLoad?.url,
                recieverName: Recieverfname + " " + Recieverlname,
                senderName: UserInformationLoad?.fname + " " + UserInformationLoad?.lname,
                userId: localStorage.getItem("uuid"),
                currentUser: UserInformationLoad?.googleId,
                anotherUserId: RecieverId,
                receiverUrl: RecieverUrl,
                senderUrl: UserInformationLoad?.url,
                connectMessage
            }
            ),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("uuid")}`
            }
        })
        const response = await sendFriendRequestResponse.json()
        if (sendFriendRequestResponse.status === 200) {
        }
        else if (sendFriendRequestResponse.status !== 200) {
        }
    }
    return (
        <>
            <div className={`wrapper_for_react_user flex w-full items-center gap-y-2 mb-3 px-2 py-1 rounded-md  ${theme?"hover:bg-[#2d2d2d]":"hover:bg-[#b8b8b8]"} {loader ? "hidden" : "flex"}`}>
                <NavLink to={`/profile/${reactUser}`}>
                    <div className="user_react_logo flex-[8] flex  items-center cursor-pointer">
                        <div className="image_wrappe  w-[3rem] h-[3rem] rounded-full relative flex-shrink-0">
                            {
                                userInfo.image ?
                                    <Image src={userInfo?.image && userInfo.image} className={`w-full h-full flex-shrink-0 rounded-full ${theme?"outline outline-1 outline-offset-1 outline-[#ffff]":""}`} rounded={true} /> :
                                    <Image src={Photos} className={`w-full h-full flex-shrink-0 rounded-full ${theme?"outline outline-1 outline-offset-1 outline-[#ffff]":""}`} rounded={true} />
                            }
                            <p className='absolute top-[1.5rem] text-[1rem] -right-[3px] rounded-full bg-blue-400 text-[#fff] p-1'>
                                <HiThumbUp />
                            </p>
                        </div>
                        <p className={`text-[1.3rem] tracking-wider ml-2 flex truncate ${theme?"text-[#fff]":"text-[#0a0a0a]"}`}>
                            {userInfo.name && userInfo.name}
                        </p>
                    </div>
                </NavLink>
                <div className={`add_friends  flex-[4] justify-end  ${loader ? "hidden" : "flex"}`}>
                    {
                        userInfo.isFriends === false ?
                            (
                                UserInformationLoad?.googleId !== reactUser ?
                                    (<div className="send_request">
                                        <Button
                                            color="purple"
                                            buttonType="filled"
                                            size="sm"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="light"
                                            className="normal-case tracking-wider font-light text-lg mds-editor28:py-1 mds-editor28:px-3"
                                            onClick={
                                                () => {
                                                    sendFriendRequest(userInfo.name.split(" ")[0], userInfo.name.split(" ")[1], reactUser, userInfo?.image, connectMessage)
                                                    setConnectMessage(!connectMessage)
                                                }
                                            }
                                        >
                                            <Icon name={<FaUserPlus className='text-[1.3rem]' />} className="mr-2" />
                                            {
                                                connectMessage ? "Request Sent" : "Connect"
                                            }
                                        </Button>
                                    </div>) :
                                    (
                                        <NavLink to={`${UserInformationLoad?.googleId !== reactUser ? `/messages?q=${reactUser}` : ""}`}>
                                            <Button
                                                color="lightBlue"
                                                buttonType="filled"
                                                size="sm"
                                                rounded={false}
                                                block={false}
                                                iconOnly={false}
                                                ripple="light"
                                                className="normal-case tracking-wider font-light text-lg mds-editor28:py-1 mds-editor28:px-3"
                                            >
                                                <Icon name={<FaFacebookMessenger />} className="mr-2" />
                                                Message
                                            </Button>
                                        </NavLink>
                                    )
                            ) :
                            (
                                <div className="message">
                                    <NavLink to={`${UserInformationLoad?.googleId !== reactUser ? `/messages?q=${reactUser}` : ""}`}>
                                        <Button
                                            color="lightBlue"
                                            buttonType="filled"
                                            size="sm"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="light"
                                            className="normal-case tracking-wider font-light text-lg mds-editor28:py-1 mds-editor28:px-3"
                                        >
                                            <Icon name={<FaFacebookMessenger />} className="mr-2" />
                                            Message
                                        </Button>
                                    </NavLink>
                                </div>
                            )
                    }
                </div >
            </div >
        </>
    )
}
export default ReactUserList;
function Loader() {
    return (
        <>
            <div className="loader_wrapper w-full h-full flex items-center justify-center">
                <TailSpin color="#bbb" width={45} height={45} />
            </div>
        </>
    )
}