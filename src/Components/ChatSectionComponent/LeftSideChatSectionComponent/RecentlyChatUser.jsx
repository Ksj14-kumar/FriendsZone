import React, { useEffect, useState } from 'react'
import Img from "../../../assets/img/team-3-800x800.jpg"
import Image from '@material-tailwind/react/Image'

import Instance from "../../../Config/Instance"
import Photo from "../../../assets/img/download.png"
import { NavLink, useParams, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { FaLaptopHouse } from 'react-icons/fa'








// setRoomChatHeader={setRoomChatHeader}
function RecentlyChatUser({ user, currentUser, setChatHeader, userId, unseenMessage, setRoomChatHeader, setModalForFriends }) {
    const [friendsDetails, setFriends_users_Details] = useState({})
    const [countUnreadMessage, setUnreedMessageCount] = useState(null)



    console.log({ user })

    useEffect(() => {
        const extract_Friends_users = user?.conversations.filter(conversation => {
            return conversation !== currentUser
        })


        async function get_Friends_users_Details() {
            try {
                const resData = await Instance.get(`/api/v1/users/${extract_Friends_users}`)
                // console.log({ resData: resData })

                if (resData.status === 200) {
                    setFriends_users_Details({ ...resData.data })
                }
                else if (resData.status !== 200) {
                    setFriends_users_Details({})
                }

            }


            catch (err) {
                console.warn(err)

            }

        }

        get_Friends_users_Details()


    }, [user])


    // useEffect(() => {
    //     async function getUnreadMessage() {
    //         try {
    //             const extract_Friends_users = user?.conversations.filter(conversation => {
    //                 return conversation !== currentUser
    //             })

    //             const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/message/unread/${extract_Friends_users}/${currentUser}`, {
    //                 method: "GET",

    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             })
    //             const resData = await res.json()
    //             if (res.status === 200) {
    //                 setUnreedMessageCount(resData.data)

    //             }
    //             else if (res.status !== 200) {

    //             }


    //         }
    //         catch (err) {
    //             console.warn(err)
    //         }

    //     }

    //     getUnreadMessage()


    // }, [userId])


    return (
        <>

            < ChatUserList userD={friendsDetails} user={user} setChatHeader={setChatHeader} countUnreadMessage={countUnreadMessage} unseenMessage={unseenMessage} setRoomChatHeader={setRoomChatHeader} />
        </>
    )
}

export default RecentlyChatUser;



function ChatUserList({ userD, setChatHeader, countUnreadMessage, unseenMessage, setRoomChatHeader, user }) {
    const params = useParams()
    const dispatch = useDispatch()

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


    return (

        // <NavLink to={`/messages?q=${userD.id}`}
        //     activeStyle={{
        //         backgroundColor: "#F32424",
        //     }}
        // >
        <div className={`top   mb-[.2rem] py-[.2rem] ${bool && "bg-[#f00606]"}`}
            onClick={(e) => {
                // setChatHeader(userD)
                // setRoomChatHeader(false)

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
                    <div className="circle w-[.8rem] h-[.8rem] rounded-full absolute bg-[#45ef0d] animate-pulse top-[19px] right-[9px]"></div>

                </section>
                <section className="name flex-[7] truncate flex justify-start">
                    <p className="text-lg font-serif tracking-wider px-1 truncate">{
                        (userD.fname !== undefined && userD.lname !== undefined) && fullName.length > 16 ? fullName.slice(0, 15) : fullName
                    }</p>
                </section>
                <section className="message_number flex-[2]  mr-[.8rem] rounded-full flex items-center justify-center ">


                    {
                        // q === userD.id ?
                        //     ""
                        //     :
                        //     countUnreadMessage === 0 ? "" :
                        //         <p className="text-[#fff] text-lg  rounded-full bg-[#570A57] 
                        // px-[.7rem] py-[.1rem]" >

                        //             {countUnreadMessage}
                        //         </p>


                    }

                </section>

            </div >
        </div >
        // </NavLink>

    )
}


function ChangeURL({ url }) {
    const [blob, setBlob] = useState("")
    const [loader, setLoader] = useState(false)



    useEffect(() => {
        async function loadImage() {
            setLoader(true)
            const res = await fetch(url)
            const blobData = await res.blob()
            setBlob(URL.createObjectURL(blobData))
            setLoader(false)
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
