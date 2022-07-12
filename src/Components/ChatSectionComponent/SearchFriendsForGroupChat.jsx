import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { TailSpin } from 'react-loader-spinner'
import AllFriendsBeforeSearch from './AllFriendsBeforeSearch'
import AllFriendsAfterSearch from './AllFriendsAfterSearch'
import { motion } from "framer-motion"
function SearchFriendsForGroupChat({ setModalForFriends, RoomData, setGroupMembers }) {
    const [query, setQuery] = useState("")
    const [friends, setFriends] = useState([])
    const [friendsLoad, setFriendsload] = useState([])
    const [friendsLoader, setFriendsLoader] = useState(false)
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    useEffect(() => {
        const get_Friends_users_Details = async () => {
            try {
                const filter_Users = friendsLoad !== undefined && friendsLoad.filter((friend) => {
                    return friend.name.toLowerCase().includes(query.toLowerCase())
                })
                setFriends(filter_Users)
            } catch (err) {
            }
        }
        get_Friends_users_Details()
    }, [query])
    useEffect(() => {
        const get_Friends_users_Details = async () => {
            try {
                setFriendsLoader(true)
                const resData = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/group/friends/`, {
                    method: "POST",
                    body: JSON.stringify({
                        Id_to_fetch: UserInformationLoad?._id,
                        roomId: RoomData._id,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const resDataJson = await resData.json()
                if (resData.status === 200) {
                    setFriendsload(resDataJson.friendList)
                    setFriendsLoader(false)
                }
                else if (resData.status !== 200) {
                    setFriends([])
                    setFriendsLoader(false)
                }
            } catch (err) {
            }
        }
        get_Friends_users_Details()
    }, [])
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0, originX: 0, originY: 0 }}
                animate={{ opacity: 1, scale: 1, originX: 0, originY: 0 }}
                transition={{ duration: 0.2, type: "tween", rotate: 360 }}
                className="w-screen h-screen absolute z-[18]   flex justify-center" id="searchUserForGroup">
                <div className="wrap inner  md:w-[50%] w-[95%] py-4 mt-[1rem] mb-[1rem] overflow-hidden " id="searchFriendsforGroup">
                    <header className="foo flex justify-end w-full">
                        <button className="text-[1.5rem] px-[1rem] py-[.5rem] bg-red-700 text-white rounded-lg mb-2 -mt-[.5rem] mr-[.5rem] focus:outline-none"
                            onClick={() => {
                                setModalForFriends(false)
                            }}
                        >X</button>
                    </header>
                    <div className="search_fields  px-[1rem] mb-2 flex w-full">
                        <input type="text" placeholder="Search"
                            className="search_input focus:outline-none rounded-md w-full h-[2.7rem] indent-4 text-[1.3rem] font-serif tracking-wider"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                        />
                    </div>
                    <hr className="" />
                    <div className="userFriends h-full  overflow-y-auto px-[1rem]" id="add_group_friends">
                        {
                            query.length > 0 && (friends !== undefined && friends.map((item) => {
                                return (
                                    <AllFriendsAfterSearch item={item} setGroupMembers={setGroupMembers} RoomData={RoomData} setFriends={setFriends} />
                                )
                            }))
                        }
                        {
                            friendsLoader ? <Loader /> : (query.length === 0 && friendsLoad !== undefined && friendsLoad.map((item) => {
                                return (
                                    <AllFriendsBeforeSearch item={item} setGroupMembers={setGroupMembers} RoomData={RoomData} setFriends={setFriends} />
                                )
                            }))
                        }
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default SearchFriendsForGroupChat

function Loader() {
    return (
        <>
            <div className="loader_sp w-full h-full flex justify-center items-center">
                <TailSpin color="#F2EBE9" height={80} width={80} />
            </div>
        </>
    )
}