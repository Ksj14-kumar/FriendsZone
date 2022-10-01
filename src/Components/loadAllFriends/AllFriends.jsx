import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import RightSide from '../UserFeed/RightSide'
import FriendsCard from './FriendsCard'
import Spinner from 'react-spinkit';
import InternetDetection from '../InternetDetection';
function AllFriends({ user, socket }) {
    const [loadFriends, setLoadFriends] = useState([])
    const [loader, setLoader] = useState(false)
    const { UserInformationLoad, theme } = useSelector((state) => {
        return {
            UserInformationLoad: state.UserInformationLoad.value,
            theme: state.Theme
        }
    })
    useEffect(() => {
        async function loadAllFriends() {
            setLoader(true)
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/history/load/friends/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                }
            })
            const resData = await res.json()
            if (res.status === 200) {
                setLoader(false)
                setLoadFriends(resData.data)
            }
            else if (res.status !== 200) {
                setLoader(false)
            }
        }
        loadAllFriends()
    }, [])
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
        <InternetDetection/>
            <div className={`text-center  mt-[4rem] flex justify-center py-2 mds-editor21:w-full min-h-screen ${theme ? "bg-[#090909]" : "bg-[#e4e4e4]"}`}>
                <div className="inner  text-center mx-auto  mds-editor21:w-full mds-editor7:px-2">
                    {
                        loader ? <Loader /> : (loadFriends.length > 0) ? loadFriends.map((item) => {
                            return (
                                <FriendsCard info={item} sendFriendRequest={sendFriendRequest} loader={loader} theme={theme} />
                            )
                        }) : (loadFriends.length === 0 && <ShowTextWhenNoUserExit />)
                    }
                </div>
                <RightSide />
            </div >
        </>
    )
}
export default AllFriends
function ShowTextWhenNoUserExit() {
    return (
        <>
            <p className='text-[4rem] text-[#a5a5a5c6] select-none italic '>
                No, User Found
            </p>
        </>
    )
}
function Loader() {
    return (
        <div className="conta bg-[#bbbabae1] animate-pulse flex justify-center items-center	 transition-all delay-100 w-screen -mt-[4.7rem] content-center " id="friendsLoader">
            <Spinner name="cube-grid" className='text-[2.5rem]' style={{ width: "8rem", height: "8rem" }} />
        </div>
    )
}