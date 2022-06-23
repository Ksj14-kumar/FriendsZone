import React, { createContext, StrictMode, useEffect, useState } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login';
import Email from './Components/Email';
import Header from './Components/Header'
import RightSidebar from './Components/RightSidebar';
// import HomePage from './components/HomePage.jsx';
// import Header1 from './components/Header1';
import "@material-tailwind/react/tailwind.css";
import Dashboard from './Pages/Dashboard';
// import Header1 from './Header1';
import ProfileCard from './Pages/ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import UpdateProfile from './Pages/UpdateProfile';
import Sidebar from './Components/Sidebar';
import UserPosts from './Pages/UserPosts';
import UserPhotos from './Pages/UserPhotos';


import io from "socket.io-client"
import UserLink from './Components/UserLink';
import Feed from './Pages/Feed';
// const Feed = React.lazy(() => import("./Pages/Feed"))
import AllFriends from './Components/loadAllFriends/AllFriends';

import UnknowUser from './Pages/UnknowUser';
import AllNotification from './Pages/AllNotification';
import ChatSection from "./Pages/ChatSection"
import Setting from "./Pages/AdminRightSideBarPages/Setting"
import BookMark from "./Pages/AdminRightSideBarPages/BookMark"
import News from "./Pages/AdminRightSideBarPages/News"
import ThemeMode from "./Pages/AdminRightSideBarPages/ThemeMode"
import Music from "./Pages/AdminRightSideBarPages/Music"
import UserSinglePost from './Pages/UserSinglePost';


export const Context = createContext()



function App() {
    const [userData, setUserData] = React.useState(null)
    const [socket, setSocket] = useState()
    const [online, setOnlineUser] = useState([])
    const [showLikeUserModal, setShowLikeUserModal] = useState({ bool: false, reactUser: [] })
    const history = useHistory()
    // const [users, dispatch] = React.useReducer(Reducer, Init)
    const dispatch = useDispatch()
    const users = useSelector((state) => {
        return state.UserStillLogin
    })
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })


    const getUserData = localStorage.getItem("uuid")
    const user = localStorage.getItem("user")
    useEffect(() => {
        async function loadData() {
            // ${process.env.REACT_APP_API_BACKENDURL}

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/all/google/success`, {
                    method: "GET",
                    // credentials: "include",
                    // credentials: 'include',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        // "Authorization": "Bearer " + localStorage.getItem("user_login"),
                    }
                })
                // console.log("google response data", response)
                const status = response.status
                // console.log("cookie", cookie.info)
                const data = await response.json()
                // console.log("google user login data ", data.user)
                // console.log(data)
                if (status === 200) {
                    // success({ message: data.message })
                    // localStorage.setItem("uuid", JSON.stringify(data.user))
                    // console.log("user login data from google", JSON.stringify(data.user))
                    // dispatch({ type: "SET_USER", payload: { user: data.user } })
                    setUserData(data.user)
                    // history.push("/dashboard")
                }
                else {
                    Error({ message: data.message })
                    // error({ message: data.message })
                    history.push("/login")
                }

            }
            catch (err) {
                console.warn(err)
            }

        }
        loadData()
    }, [history, userData])

    //trigger when user login your account
    useEffect(() => {
        // process.env.REACT_APP_API_BACKENDURL
        const isHttps = process.env.REACT_APP_API_BACKENDURL.includes("https")
        const value = isHttps ? process.env.REACT_APP_API_BACKENDURL.split("https")[1] : process.env.REACT_APP_API_BACKENDURL.split("http")[1]
        setSocket(io("ws" + value, {
            path: "/collegezone",
            "withCredentials": true,
            auth: {
                token: localStorage.getItem("uuid")
            },

        }))
        console.log(process.env.REACT_APP_API_BACKENDURL)


    }, [])

    //add  new user info to the server by socket when user login
    useEffect(() => {
        socket?.emit("newUser", getUserData)
        socket?.io.on("error", (err) => {
            alert("please connect to internet")
        })
        socket?.io.on("reconnect", (connect) => {
            console.log("reconnect successfull" + connect)
        })

    }, [socket, getUserData])


    useEffect(() => {
        socket?.off("onlineUsers").on("onlineUsers", (data) => {
            setOnlineUser(data)
        })

    }, [socket])


    return (
        // w-screen h-screen
        <StrictMode>
            <Context.Provider value={{ users, dispatch }}>

                <div className="left_section">


                    {
                        // \\userData
                        // (getUserData) && <Sidebar />
                        (getUserData && user) && <Sidebar socket={socket} />
                    }
                </div>
                <>
                    {/* 000B49 */}
                    <div className=' bg-cover app_class'>
                        <Switch >
                            <Route exact path="/" >
                                {
                                    (getUserData && user) ?
                                        <Feed socket={socket} setShowLikeUserModal={setShowLikeUserModal} showLikeUserModal={showLikeUserModal} />
                                        : <Header />
                                }
                            </Route>
                            <Route exact path="/register">
                                {
                                    (getUserData && user)
                                        // && ?
                                        ?
                                        <Redirect to={"/"} /> :
                                        <Register />
                                }
                            </Route>
                            <Route exact path="/login">
                                {
                                    (getUserData && user)
                                        //  &&
                                        ? <Redirect to={"/"} /> :
                                        <Login socket={socket} />

                                }
                            </Route>
                            <Route exact path="/forget" component={Email} />
                            <Route exact path="/dashboard">
                                {
                                    (getUserData && user) &&
                                    <Dashboard users={getUserData} socket={socket} />
                                    // : <Redirect to="/" />
                                }
                            </Route>
                            <Route exact path='/profile/:username'>
                                {
                                    <ProfileCard getUserData={getUserData} socket={socket} />
                                }
                            </Route>

                            {/* <Route exact path='/profile/:username/:name'>
                                {
                                    (getUserData && user) ? <ProfileCard getUserData={getUserData} socket={socket} />
                                        : <Redirect to="/login" />
                                }
                            </Route> */}


                            <Route exact path='/unknownuser'>
                                {
                                    <UnknowUser getUserData={getUserData} socket={socket} />
                                }
                            </Route>

                            <Route exact path="/update_profile">
                                {
                                    <UpdateProfile getUserData={getUserData} socket={socket} />
                                }
                            </Route>
                            <Route exact path="/user/posts">
                                {
                                    <UserPosts user={getUserData} socket={socket} />
                                }
                            </Route>
                            <Route exact path="/user/photos">
                                {
                                    <UserPhotos user={getUserData} socket={socket} />
                                }
                            </Route>


                            <Route exact path="/user/links">
                                {
                                    <UserLink user={getUserData} socket={socket} />
                                }
                            </Route>

                            <Route exact path="/load/friends/">
                                {
                                    <AllFriends user={getUserData} socket={socket} />
                                }
                            </Route>



                            <Route exact path="/messages">
                                {/* {
                                    (getUserData && user) ? <Messages user={UserInformationLoad?.googleId} socket={socket} />
                                        : <Redirect to="/login" />

                                } */}
                                {
                                    <ChatSection user={UserInformationLoad?.googleId} socket={socket} setSocket={setSocket} />
                                }
                            </Route>


                            <Route exact path="/all/notification/:id">
                                {
                                    <AllNotification user={UserInformationLoad?.googleId} socket={socket} />
                                }
                            </Route>


                            <Route exact path={`/user/single/post/`}>
                                {
                                    <UserSinglePost user={UserInformationLoad?.googleId} socket={socket} setShowLikeUserModal={setShowLikeUserModal} showLikeUserModal={showLikeUserModal} />
                                }
                            </Route>


                            {/* ==============================================RIGHTSIDE BAR PAGES===================================== */}
                            <Route exact path="/blog/:name/setting">
                                {
                                    <Setting socket={socket} />
                                }
                            </Route>

                            <Route exact path="/blog/:name/bookmark">
                                {
                                    <BookMark socket={socket} />
                                }
                            </Route>


                            <Route exact path="/blog/:name/songs-accessbility">
                                {
                                    <Music socket={socket} />
                                }
                            </Route>
                            <Route exact path="/blog/:name/themeMode">
                                {
                                    <ThemeMode socket={socket} />
                                }
                            </Route>

                            <Route exact path="/blog/:name/news">
                                {
                                    <News socket={socket} />
                                }
                            </Route>








                        </Switch>
                    </div >

                    {
                        (getUserData && user) &&
                        <abbr title="live User">
                            <div className="right_section  fixed md:top-[95%] top-[94.6%] right-[.5rem] md:w-[5rem] bg-[#6d369a7a] rounded-sm py-[.5rem] md:px-[1rem] px-[1rem]">

                                <RightSidebar socket={socket} online={online} />

                            </div>

                        </abbr>
                    }
                </>
            </Context.Provider>
        </StrictMode>
    )
}
export default App
