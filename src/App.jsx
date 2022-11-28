import React, { createContext, StrictMode, useEffect, useState, Suspense } from 'react'
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login';
import Email from './Components/Email';
import Header from './Components/Header'
import RightSidebar from './Components/RightSidebar';
import "@material-tailwind/react/tailwind.css";
import Dashboard from './Pages/Dashboard';
import ProfileCard from './Pages/ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import UpdateProfile from './Pages/UpdateProfile';
import Sidebar from './Components/Sidebar';
import UserPosts from './Pages/UserPosts';
import UserPhotos from './Pages/UserPhotos';
import io from "socket.io-client"
import UserLink from './Components/UserLink';
import Feed from './Pages/Feed';
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
import { AnimatePresence } from "framer-motion"
import VerifyEmail from './Pages/Verify';
// const Feed = React.lazy(() => require("./Pages/Feed"))
const object = {
    path: process.env.REACT_APP_PATH,
    withCredentials: true,
    auth: {
        token: localStorage.getItem("uuid")
    },
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    upgrade: false,
    reconnectionDelay: 1000,
}
export const Context = createContext()
function App() {
    const [userData, setUserData] = React.useState(null)
    const [socket, setSocket] = useState()
    const [showLikeUserModal, setShowLikeUserModal] = useState({ bool: false, reactUser: [] })
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const users = useSelector((state) => {
        return state.UserStillLogin
    })
    const { UserInformationLoad, theme } = useSelector((state) => {
        return {
            UserInformationLoad: state.UserInformationLoad.value,
            theme: state.Theme
        }
    })
    const getUserData = localStorage.getItem("uuid")
    const user = localStorage.getItem("user")
    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/all/google/success`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        // "Authorization": "Bearer " + localStorage.getItem("user_login"),
                    }
                })
                const status = response.status
                const data = await response.json()
                // console.log({ data })
                if (status === 200) {
                    setUserData(data.user)
                }
                else {
                    Error({ message: data.message })
                    history.push("/login")
                }
            }
            catch (err) {
            }
        }
        loadData()
    }, [history, userData])
    // //trigger when user login your account
    useEffect(() => {
        const isHttps = process.env.REACT_APP_API_BACKENDURL
        getUserData && setSocket(io(isHttps, object))
        socket?.on("connect_error", (err) => {
        })
    }, [])
    //add  new user info to the server by socket when user login
    useEffect(() => {
        socket?.emit("newUser", getUserData)
    }, [getUserData])
    return (
        // w-screen h-screen
        <StrictMode>
            <Context.Provider value={{ users, dispatch }}>
                <div className="root_wrapper flex">
                    <div className="left_section" >
                        {
                            (getUserData && user) || userData && <Sidebar socket={socket} theme={theme} />
                        }
                    </div>
                        <div className={`bg-cover app_class min-h-screen w-full  ${theme ? "bg-[#000000]" : `${getUserData ? "bg-[#e4e4e4]" : "homepage_se"}`}`}>
                            <AnimatePresence exitBeforeEnter initial={false}>
                                <Switch location={location} key={location.key}>
                                    <Route exact path="/"
                                    >
                                        {
                                            (getUserData && user) || userData ?
                                                <Feed socket={socket} setShowLikeUserModal={setShowLikeUserModal} showLikeUserModal={showLikeUserModal} />
                                                : <Header />
                                        }
                                    </Route>
                                    <Route exact path="/register">
                                        {
                                            (getUserData && user) || userData
                                                ?
                                                <Redirect to={"/"} /> :
                                                <Register />
                                        }
                                    </Route>
                                    <Route exact path="/login">
                                        {
                                            (getUserData && user) || userData
                                                //  &&
                                                ? <Redirect to={"/"} /> :
                                                <Login socket={socket} />
                                        }
                                    </Route>
                                    <Route exact path="/forget" component={Email} />
                                    <Route exact path="/dashboard">
                                        {
                                            (getUserData && user) || userData &&
                                            <Dashboard users={getUserData} socket={socket} />
                                            // : <Redirect to="/" />
                                        }
                                    </Route>
                                    <Route exact path='/profile/:username'>
                                        {
                                            <ProfileCard
                                                getUserData={getUserData}
                                                socket={socket}
                                                setShowLikeUserModal={setShowLikeUserModal}
                                                showLikeUserModal={showLikeUserModal} />
                                        }
                                    </Route>
                                    <Route exact path='/unknownuser'>
                                        {
                                            <UnknowUser getUserData={getUserData} socket={socket} />
                                        }
                                    </Route>
                                    <Route exact path="/update_profile">
                                        {
                                            <UpdateProfile getUserData={getUserData} socket={socket} theme={theme} />
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
                                        {
                                            <ChatSection user={UserInformationLoad?.googleId} socket={socket} theme={theme} />
                                        }
                                    </Route>
                                    <Route exact path="/all/notification/:id">
                                        {
                                            <AllNotification user={UserInformationLoad?.googleId} socket={socket} theme={theme} />
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
                                            <Setting socket={socket} theme={theme} />
                                        }
                                    </Route>
                                    <Route exact path="/blog/:name/bookmark">
                                        {
                                            <BookMark socket={socket} setShowLikeUserModal={setShowLikeUserModal} theme={theme} />
                                        }
                                    </Route>
                                    <Route exact path="/blog/:name/songs-accessbility">
                                        {
                                            <Music socket={socket} theme={theme} />
                                        }
                                    </Route>
                                    <Route exact path="/blog/:name/themeMode">
                                        {
                                            <ThemeMode socket={socket} />
                                        }
                                    </Route>
                                    <Route exact path="/blog/:name/news">
                                        {
                                            <News socket={socket} theme={theme} />
                                        }
                                    </Route>
                                    <Route exact path="/verify/:token">
                                        {
                                            // getUserData &&
                                            <VerifyEmail socket={socket} theme={theme} />
                                        }
                                    </Route>
                                </Switch>
                            </AnimatePresence>
                        </div >
                        {
                            (getUserData && user) &&
                            <abbr title="live User">
                                <div className="right_section  fixed md:top-[95%] top-[94.6%] right-[.5rem] md:w-[5rem] bg-[#6d369a7a] rounded-sm py-[.5rem] md:px-[1rem] px-[1rem] z-[999]">
                                    <RightSidebar socket={socket} currentId={UserInformationLoad?.googleId} />
                                </div>
                            </abbr>
                        }
                </div>
            </Context.Provider>
        </StrictMode>
    )
}
export default App;