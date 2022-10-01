import React, { useEffect, useState } from 'react'
import Image from '@material-tailwind/react/Image'
import Instance from "../../../Config/Instance"
import Photo from "../../../assets/img/download.png"
import { NavLink, useParams, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
function RecentlyChatUser({ user, currentUser, setChatHeader, socket, unreadMessage }) {
    const [friendsDetails, setFriends_users_Details] = useState({})
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        const extract_Friends_users = user?.conversations.filter(conversation => {
            return conversation !== currentUser
        })
        async function get_Friends_users_Details() {
            try {
                setLoader(true)
                const resData = await Instance.get(`/api/v1/users/${extract_Friends_users}`)
                if (resData.status === 200) {
                    setLoader(false)
                    setFriends_users_Details({ ...resData.data })
                }
                else if (resData.status !== 200) {
                    setFriends_users_Details({})
                }
            }
            catch (err) {
            }
        }
        get_Friends_users_Details()
    }, [user])
    return (
        <>
            < ChatUserList userD={friendsDetails} user={user} setChatHeader={setChatHeader} loader={loader} unreadMessage={unreadMessage} socket={socket} currentUser={currentUser} />
        </>
    )
}
export default RecentlyChatUser = React.memo(RecentlyChatUser);
function ChatUserList({ userD, user, setChatHeader, loader, unreadMessage, socket, currentUser }) {
    const params = useParams()
    const dispatch = useDispatch()
    const [isOnline, setOnline] = useState({ friendId: "", status: false })
    const [bool, setBool] = useState(false)
    const fullName = userD?.fname + " " + userD?.lname
    const { search } = useLocation()
    const query = new URLSearchParams(search);
    const q = query.get("q") ? query.get("q") : null
    const history = useHistory()
    useEffect(() => {
        q === userD.id ? setBool(true) : setBool(false)
        q === userD.id && setChatHeader(userD)
        q === userD.id && dispatch({ type: "UserActive", payload: true })
    }, [q])
    useEffect(() => {
        socket?.emit("isUserOnline", { friendId: userD.id, currentUser: currentUser })
        socket?.on("isOnline", (data) => {
            setOnline(data)
        })
    }, [socket, userD])
    return (
        <NavLink to={`/messages?q=${userD.id}`}
            activeStyle={{
                backgroundColor: "#F32424",
            }}
        >
            <div className={`top   mb-[.2rem] py-[.2rem] ${bool && "bg-[#f00606]"}`}
                onClick={(e) => {
                    history.push(`/messages?q=${userD.id}`)
                }}
            >
                <div className="inner_div mx-[.5rem] bg-[#b0afaf]  flex  items-center rounded-md py-[.1rem] cursor-pointer mb-[0rem] hover:bg-[#161D6F] hover:text-white">
                    <section className="image  flex-shrink-0 flex flex-[3] items-center justify-center mx-auto cursor-pointer relative">
                        <div className="image_inner w-[2.6rem] h-[2.6rem] flex rounded-full   relative">
                            {
                                userD.url ?
                                    <ChangeURL url={userD.url} />
                                    :
                                    <Image src={Photo} className="rounded-full flex-shrink-0 w-full h-full" rounded={true} />
                            }
                        </div>
                        {isOnline.friendId === userD.id && isOnline.status && <div className="circle w-[.8rem] h-[.8rem] rounded-full absolute bg-[#45ef0d] animate-pulse top-[19px] right-[9px] border-[1px] border-solid border-[#ffff]"></div>}
                    </section>
                    <section className="name flex-[7] truncate flex justify-start">
                        <p className="text-lg font-serif tracking-wider px-1 truncate">{
                            (loader ? "" : (userD.fname !== undefined && userD.lname !== undefined) && fullName.length > 16 ? fullName.slice(0, 15) + "..." : fullName)
                        }</p>
                    </section>
                    <section className="message_number flex-[2]  mr-[.8rem] rounded-full flex items-center justify-center ">
                        {
                            unreadMessage?.length > 0 && unreadMessage.map(item => {
                                if (q !== item.anotherUserId) {
                                    if (userD.id === item.anotherUserId) {
                                        return (
                                            <>
                                                <p className="text-[#fff] text-lg  rounded-full bg-[#570A57] 
                                    px-[.7rem] py-[.1rem]" >
                                                    {item.messageLength}
                                                </p>
                                            </>
                                        )
                                    }
                                }
                            })
                        }
                    </section>
                </div >
            </div >
        </NavLink>
    )
}
function ChangeURL({ url }) {
    const [blob, setBlob] = useState("")
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        async function loadImage() {
            try {
                setLoader(true)
                const res = await fetch(url)
                const blobData = await res.blob()
                setBlob(URL.createObjectURL(blobData))
                setLoader(false)
            }
            catch (err) {
            }
        }
        loadImage()
    }, [url])
    return (
        <>
            {
                loader ? (
                    <div className="image_conta flex-shrink-0 w-full h-full bg-[#640303] animate-pulse rounded-full">
                    </div>
                ) : (
                    <Image src={blob} className="rounded-full flex-shrink-0 w-full h-full" rounded={true} />
                )
            }
        </>
    )
}
