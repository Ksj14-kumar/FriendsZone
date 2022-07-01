import React, { useRef, useState, useEffect } from 'react'
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { MdLocationOn, MdSearch } from 'react-icons/md';
import { motion } from "framer-motion"
import LiveUser from './chatSection/LiveUser';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
function FooterButton({ bool, onlinefriends, currentId, socket, NumberOfFriendsOnline }) {
    const dispatch = useDispatch()
    const targetDiv = useRef()
    const siblingDiv = useRef()
    const [cssClass, setClass] = useState(false)
    const [chats, setChats] = useState([])

    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })

    // console.log({chats, currentChats})



    useEffect(() => {
        if (cssClass === true) {
            targetDiv.current.style.width = "15rem"
            siblingDiv.current.style.display = "none"

        }
        else {
            targetDiv.current.style.width = "0rem"
            targetDiv.current.style.marginRight = "3.9rem"
            siblingDiv.current.style.display = "block"

        }



    }, [cssClass])


    //now get friends
    // useEffect(() => {
    //     async function loadFriends() {
    //         try {

    //             // console.log("call start")
    //             const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/friends/${currentId}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": "Bearer " + localStorage.getItem("uuid")


    //                 }

    //             })
    //             const data = await res.json()
    //             // console.log("userdata",{data})

    //             if (res.status === 200) {
    //                 // setFriends(data.friendList)
    //                 if (isMount.current) {

    //                     const value = data.friendList.filter(item => {
    //                         return online.some(value => {

    //                             return item._id === value.adminId
    //                         })
    //                     })
    //                     setFriends(value)
    //                     setFriendsLength(value.length)
    //                     dispatch({ type: "onlineUsers", payload: value })
    //                 }

    //             }
    //             else if (res.status !== 200) {
    //                 console.warn("err")

    //             }
    //         } catch (err) {
    //             console.warn(err)


    //         }
    //     }
    //     loadFriends()

    //     return (() => {
    //         isMount.current = false
    //     })

    // }, [online, currentId])







    async function handleClick(item) {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/conversation/${UserInformationLoad?.googleId}/${item._id}`)
            const resData = await res.json()
            console.log({ resData: resData.data })
            if (res.status === 200) {
                setChats(resData.data)
                // setCurrentChat(resData.data)
                dispatch({
                    type: "Chat", payload: resData.data
                })
            }
            else if (res.status !== 200) {
            }
        } catch (err) {
            console.warn(err)

        }

    }

    //HOW TO HANDLE USER NAME WHEN IT IS LARGE CHARACTER

    return (
        <>
            <motion.main className="main border-1 border-solid border-gray-200"
            >
                <header className="_top_chat_header  flex   items-center hover:cursor-pointer  py-1 justify-between ">
                    <section className="_left  "
                        ref={siblingDiv}
                    >
                        <p className='text-lg text-black ml-4 mds-editor7:text-sm font-serif tracking-wider'>Active</p>
                    </section>
                    <section className="_right relative  -px-4 mr-10 flex"
                        onFocus={() => {
                        }}
                    >
                        <div className="container_search flex  items-center relative  w-0"

                            ref={targetDiv}
                        >
                            <input type="text" placeholder="Search..." id="search_friend_live" className='h-[2rem] focus:outline-none rounded-full indent-2 caret-[#d5309e] focus:border-1  w-full pr-[2rem] text-center focus:border-2 focus:border-solid focus:border-[#ffffff] font-serif tracking-wider '
                            />
                            
                        </div>
                        <div>
                            {/* //add something */}
                        </div>
                    </section>
                </header>
                <hr />
                {
                    (onlinefriends !== undefined && onlinefriends.length > 0) ? onlinefriends.map((item, index) => {
                        return (
                            <>
                                <NavLink to={`/messages?q=${item._id}`}>
                                    <LiveUser value={item} />
                                    {/* </div> */}
                                </NavLink>
                            </>

                        )
                    }) : <NoUserLive />
                }



                <hr className='w-full h-[1px] bg-[#9d9d9d] mt-1' />
                {/* <footer className="_footer flex justify-between items-center bg-[#92929294] rounded-sm py-1 mt-1">
                    <p className='text-[1.5rem] text-black'>Group+</p>
                </footer> */}



            </motion.main>



        </>
    )
}

export default FooterButton;



function NoUserLive() {
    return (
        <>
            <p className="text-[2rem] text-black text-center py-2">No User Live</p>

        </>
    )
}