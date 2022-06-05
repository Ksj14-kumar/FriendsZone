import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserFeed from '../Components/UserFeed/UserFeed'


function Feed({ socket }) {
    const dispatch = useDispatch()
    const [AllUser, setAllUser] = useState([])
    const [suggestionFriends, setSuggestionFriends] = useState([])
    // const [socket, setSocket] = useState()


    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    const PostWhichUserSelectedImageORVideo = useSelector((state) => {
        return state.PostWhichUserSelectedImageORVideo
    })






    //  //trigger when user login your account
    //  useEffect(() => {
    //     // process.env.REACT_APP_API_BACKENDURL
    //     setSocket(io("ws://localhost:5000"))

    // }, [])

    // console.log({socket})



    useEffect(() => {
        socket?.emit("login", localStorage.getItem("uuid"))
        socket?.on('onlineUsers', (data) => {

            dispatch({ type: "onlineUsers", payload: data })

        })

    }, [])

    useEffect(() => {
        async function getAllUser() {
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/all/user`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                }
            })
            const data = await res.json()
            if (res.status === 200) {
                setAllUser(data)

            }
            else if (res.status !== 200) {
                console.log("error")
            }

        }
        getAllUser()
    }, [])

    useEffect(() => {
        async function isFriends() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/friends/${UserInformationLoad?.googleId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                    }
                })
                const data = await res.json()
                // console.log("is friends", data)
                if (res.status === 200) {
                    const filterUsers = data.friendList !== null && AllUser.filter((item) => {
                        return data.friendList.some((value) => {
                            return value._id !== item.googleId && item.googleId !== UserInformationLoad?.googleId
                        })

                    })
                    // setAllUser({ filterUsers })
                    setSuggestionFriends(filterUsers)
                }
                else if (res.status !== 200) {
                    console.log("error")
                }

            } catch (err) {
                console.log(err)

            }
        }
        isFriends()

    }, [AllUser])


    async function FilterUser(id) {
        setAllUser(AllUser.filter(user => user._id !== id))

    }

    return (
        <UserFeed PostWhichUserSelectedImageORVideo={PostWhichUserSelectedImageORVideo} socket={socket} AllUser={suggestionFriends} FilterUser={FilterUser} />

    )
}

export default Feed