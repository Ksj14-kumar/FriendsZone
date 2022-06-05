import React, { createContext, StrictMode, useEffect, useRef, useState } from 'react'
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
import { useCookies } from 'react-cookie';
import ProfileCard from './Pages/ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import UpdateProfile from './Pages/UpdateProfile';
import Sidebar from './Components/Sidebar';
import UserPosts from './Pages/UserPosts';
import UserPhotos from './Pages/UserPhotos';

import Channel from './SubscribeChannels/Channel';
import io from "socket.io-client"
import UserLink from './Components/UserLink';
import Feed from './Pages/Feed';
import AllFriends from './Components/loadAllFriends/AllFriends';
import Messages from './Components/Messages/Messages';
import UnknowUser from './Pages/UnknowUser';
import AllNotification from './Pages/AllNotification';
import ChatSection from "./Pages/ChatSection"



export const Context = createContext()


console.log(process.env.REACT_APP_API_BACKENDURL)


function App() {
    const [userData, setUserData] = React.useState(null)
    const [socket, setSocket] = useState()
    const history = useHistory()
    // const [users, dispatch] = React.useReducer(Reducer, Init)
    const [cookie, setCookie] = useCookies()
    const dispatch = useDispatch()
    const users = useSelector((state) => {
        return state.UserStillLogin
    })


    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })





    // console.log(typeof localStorage.getItem("uuid"))
    // console.log(localStorage.getItem("uuid"))

    const _id = localStorage.getItem("uuid")
    // const { _id } = users.user ? users.user : { _id: "" }
    const getUserData = localStorage.getItem("uuid")
    const user = localStorage.getItem("user")
    // const {_id}
    useEffect(() => {
        async function loadData() {
            // ${process.env.REACT_APP_API_BACKENDURL}

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
        loadData()
    }, [])












    //trigger when user login your account
    useEffect(() => {
        // process.env.REACT_APP_API_BACKENDURL
        setSocket(io("ws://localhost:5000"))

    }, [])

    //add  new user info to the server by socket when user login
    useEffect(() => {
        socket?.emit("newUser", getUserData)

    }, [socket, getUserData])














    return (
        // w-screen h-screen
        <StrictMode>
            <Context.Provider value={{ users, dispatch }}>

                <div className="left_section">

                    {
                        getUserData && <Channel />
                    }
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
                                    (getUserData && user) ? <Feed socket={socket} /> : <Header />
                                }
                            </Route>
                            <Route exact path="/register">
                                {
                                    (getUserData && user) ? <Redirect to="/" /> : <Register />
                                }
                            </Route>
                            <Route exact path="/login">
                                {(getUserData && user) ? <Redirect to="/" /> : <Login socket={socket} />}
                            </Route>
                            <Route exact path="/forget" component={Email} />
                            <Route exact path="/dashboard">
                                {
                                    (getUserData && user) ? <Dashboard users={getUserData} socket={socket} />
                                        : <Redirect to="/login" />
                                }
                            </Route>


                            <Route exact path='/profile/:username'>
                                {
                                    // (getUserData && user) ?
                                    <ProfileCard getUserData={getUserData} socket={socket} />
                                    // : <Redirect to="/login" />
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
                                    // (getUserData && user) ? 
                                    <UnknowUser getUserData={getUserData} socket={socket} />
                                    // : <Redirect to="/login" />
                                }
                            </Route>




                            <Route exact path="/update_profile">
                                {
                                    // (getUserData && user) ? 
                                    <UpdateProfile getUserData={getUserData} socket={socket} />
                                    // : <Redirect to="/login" />
                                }
                                {/* <UpdateProfile/> */}
                            </Route>
                            <Route exact path="/user/posts">
                                {
                                    (getUserData && user) ? <UserPosts user={getUserData} socket={socket} />
                                        : <Redirect to="/login" />
                                }
                            </Route>
                            <Route exact path="/user/photos">
                                {
                                    (getUserData && user) ? <UserPhotos user={getUserData} socket={socket} />
                                        : <Redirect to="/login" />
                                }
                            </Route>

                            {/* /user/links" */}

                            <Route exact path="/user/links">
                                {
                                    // (getUserData && user) ?
                                    <UserLink user={getUserData} socket={socket} />
                                    // : <Redirect to="/login" />
                                }
                            </Route>




                            <Route exact path="/load/friends/">
                                {
                                    // (getUserData && user) ?
                                    <AllFriends user={getUserData} socket={socket} />
                                    // : <Redirect to="/login" />
                                }
                            </Route>
                            {/* /all/notification/${googleId */}

                            <Route exact path="/messages">
                                {/* {
                                    (getUserData && user) ? <Messages user={UserInformationLoad?.googleId} socket={socket} />
                                        : <Redirect to="/login" />

                                } */}


                               { (getUserData && user) ? <ChatSection user={UserInformationLoad?.googleId} socket={socket} setSocket={setSocket} />
                                : <Redirect to="/login" />}
                                
                            </Route>


                            <Route exact path="/all/notification/:id">
                                {
                                    (getUserData && user) ?
                                        <AllNotification user={UserInformationLoad?.googleId} socket={socket} />
                                        : <Redirect to="/login" />
                                }
                            </Route>








                        </Switch>
                    </div >

                    {
                        (getUserData && user) &&
                        <abbr title="live User">
                            <div className="right_section  fixed top-[95%] right-[.5rem] md:w-[5rem] bg-[#6d369a7a] rounded-sm py-[.5rem] md:px-[1rem] px-[1rem]">

                                <RightSidebar socket={socket} />

                            </div>

                        </abbr>
                    }
                </>
            </Context.Provider>
        </StrictMode>
    )
}
export default App
