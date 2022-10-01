import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserFeed from '../Components/UserFeed/UserFeed'
import { motion } from "framer-motion"
function Feed({ socket, setShowLikeUserModal, showLikeUserModal }) {
    const dispatch = useDispatch()
    const [AllUser, setAllUser] = useState([])
    const [suggestionFriends, setSuggestionFriends] = useState([])
    const { UserInformationLoad, PostWhichUserSelectedImageORVideo, theme } = useSelector((state) => {
        return {
            UserInformationLoad: state.UserInformationLoad.value,
            PostWhichUserSelectedImageORVideo: state.PostWhichUserSelectedImageORVideo,
            theme: state.Theme
        }
    })
    useEffect(() => {
        socket?.emit("login", localStorage.getItem("uuid"))
        socket?.off("onlineUsers").on('onlineUsers', (data) => {
            dispatch({ type: "onlineUsers", payload: data })
        })
    }, [])
    useEffect(() => {
        let mount = true
        async function getAllUser() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/all/user`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                    }
                })
                const data = await res.json()
                if (res.status === 200) {
                    if (mount) {
                        setAllUser(data)
                    }
                }
                else if (res.status !== 200) {
                }
            }
            catch (err) {
            }
        }
        getAllUser()
        return () => {
            mount = false
        }
    }, [])
    useEffect(() => {
        let isMount = true
        async function isFriends() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/friends/${UserInformationLoad?.googleId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                    }
                })
                const data = await res.json()
                if (res.status === 200) {
                    const filterUsers = data.friendList !== null && AllUser.filter((item) => {
                        return data.friendList.some((value) => {
                            return value._id !== item.googleId && item.googleId !== UserInformationLoad?.googleId
                        })
                    })
                    if (isMount) {
                        setSuggestionFriends(filterUsers)
                    }
                }
                else if (res.status !== 200) {
                    return
                }
            } catch (err) {
            }
        }
        UserInformationLoad?.googleId && isFriends()
        return () => {
            isMount = false
        }
    }, [])
    const __loadInfo = useCallback(() => {
        async function userInfoLoad() {
            try {
                // setInfoLoader(true)
                const userInfo = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/083525p7ljhwmxifts31/l66cbrsuytmj1wujuauz/nqoye5ozdqj89b4s4qoq/ua1iztaxjo4bbmzvd391/3mzqeygnoszlknp90h51/t28uf00khscofxgjwj20/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const res = await userInfo.json()
                if (userInfo.status === 200) {
                    // if (isMount) {
                    dispatch({ type: "Theme", payload: res.message.theme })
                    dispatch({ type: "USERINFO_LOAD", payload: res.message })
                    dispatch({ type: "BOOK_MARK_POST", payload: res.message.bookMarkPost })
                    // setInfoLoader(false)
                    // }
                }
                else if (userInfo.status !== 200) {
                }
            } catch (err) {
            }
        }
        userInfoLoad()
    }, [])
    //===================LOAD THE USER INFORMATION FROM THE SERVER============
    useEffect(() => {
        __loadInfo()
    }, [])
    async function FilterUser(id) {
        setAllUser(AllUser.filter(user => user._id !== id))
    }
    return (
        <>
            {/* <motion.div className="animat"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ease: "easeInOut", delay: .1 }}
            > */}
            <UserFeed PostWhichUserSelectedImageORVideo={PostWhichUserSelectedImageORVideo} socket={socket} AllUser={suggestionFriends} FilterUser={FilterUser} showLikeUserModal={showLikeUserModal} setShowLikeUserModal={setShowLikeUserModal} theme={theme} />
            {/* </motion.div> */}
        </>
    )
}
export default Feed = React.memo(Feed)