import React, { createContext, useEffect, useState } from 'react'
import { Switch, Route, Redirect, useHistory, NavLink, useLocation } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login';
import Email from './Components/Email';
import Header from './Components/Header'
import RightSidebar from './Components/RightSidebar';
// import HomePage from './components/HomePage.jsx';
import Header1 from './Header1'
// import Header1 from './components/Header1';
import "@material-tailwind/react/tailwind.css";
import Dashboard from './Pages/Dashboard';
import HomePage from './Components/HomePage';
// import Header1 from './Header1';
import { Init, Reducer } from './Reducer/Reducer';
import { Toastify } from './Components/Toastify';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import ProfileCard from './Pages/ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import UpdateProfile from './Pages/UpdateProfile';
import Sidebar from './Components/Sidebar';
import UserPosts from './Pages/UserPosts';
import UserPhotos from './Pages/UserPhotos';
import axios from 'axios';
import Channel from './SubscribeChannels/Channel';
import SinglePost from './Components/SinglePost';
import io from "socket.io-client"



export const Context = createContext()





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




    // console.log(typeof localStorage.getItem("uuid"))
    // console.log(localStorage.getItem("uuid"))

    const _id = localStorage.getItem("uuid")
    // const { _id } = users.user ? users.user : { _id: "" }
    const getUserData = localStorage.getItem("uuid")
    const user = localStorage.getItem("user")
    // const {_id}
    useEffect(() => {
        async function loadData() {
            const response = await fetch("/all/google/success", {
                method: "GET",
                credentials: "include",
                credentials: 'include',
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

    //====================LOAD PROFILE IMAGES=============
    useEffect(() => {
        // const id = setInterval(() => {
        async function ProfileImages() {
            dispatch({ type: "LOADER", payload: true })
            // setLoader(true)
            const res = await fetch(`/blob/profile/image/e9thhvkKqJpnTlYo1sQl/QVbghZqhoSr2Rt5qvNYJ/iKj3RoJojFWmcDo4wTlm/9Olk5vTenhdkjHrdYEWl/`, {
                method: "GET",
                credentials: 'same-origin',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            const data = await res.json()
            // console.log({ data })
            // const parseValue = data.parseData
            if (res.status === 200) {
                // setuploadImageDataFromServer(parseValue.resources)
                // if (parseValue.resources.length === 0) {
                // }
                dispatch({ type: "LOADER", payload: false })
                dispatch({ type: "uploadImageDataFromServer", payload: data })
                // setShowImage(parseValue.resources[0].url)
                dispatch({ type: "ShowImage", payload: data.url })
                // setLoader(false)
                dispatch({ type: "LOADER", payload: false })
            }
            else {
                dispatch({ type: "LOADER", payload: false })
                // console.log("Image is not load")
            }
        }
        ProfileImages()
        // }, 2000);
        // return () => clearInterval(id)
    }, [])

    //=====================LOAD THE BACKGROUND IMAGES=============
    useEffect(() => {
        // const id = setInterval(() => {
        // console.log("id is ", _id)
        async function BackgroundImage() {
            dispatch({ type: "LOADER", payload: true })
            // setLoader(true)
            const res1 = await fetch(`/blob/bg/image/mwQgga2z5KfChXjuF1s0/r6dg0LqqWmCG4W5UQOTa/ftFhzft7YNwT6jb9EVoX/ogvnbpOcPnjgMatu3mtb/JSC2PQZQVlK19QXDbSl1/`, {
                method: "GET",
                credentials: 'same-origin',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            const data1 = await res1.json()
            console.log({ data1 })
            if (res1.status === 200) {
                // setuploadImageDataFromServer(parseValue.resources)
                dispatch({ type: "LOADER", payload: false })
                dispatch({ type: "uploadImageDataFromServerBackground", payload: data1 })
                // setShowImage(parseValue.resources[0].url)
                dispatch({ type: "ShowImageBackground", payload: data1.url })
                // setLoader(false)
                dispatch({ type: "LOADER", payload: false })
            }
            else {
                // console.log("Image is not load")
            }
        }
        BackgroundImage()
    }, [])
    //===================LOAD THE USER INFORMATION FROM THE SERVER============
    useEffect(() => {

        async function userInfoLoad() {
            const userInfo = await fetch(`/blob/user/083525p7ljhwmxifts31/l66cbrsuytmj1wujuauz/nqoye5ozdqj89b4s4qoq/ua1iztaxjo4bbmzvd391/3mzqeygnoszlknp90h51/t28uf00khscofxgjwj20/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            const res = await userInfo.json()
            // console.log("userinformation load", res)
            if (userInfo.status === 200) {
                dispatch({ type: "USERINFO_LOAD", payload: res.message })
            }
        }
        userInfoLoad()

    }, [])
    //LOAD ALL THE posts for users
    useEffect(() => {
        // const id = setInterval(() => {
        // /blob/users/public/posts/${_id}
        async function loadPosts() {
            const loadPostResponse = await fetch(`/blob/load/all/post/`, {
                method: "GET",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            const loadPostData = await loadPostResponse.json()
            // console.log("load post data", loadPostData.data, loadPostResponse)
            if (loadPostResponse.status === 200) {
                dispatch({
                    type: "LOAD_POSTS",
                    payload: loadPostData.data
                })
            }
        }
        loadPosts()
        // }, 1000);
        // return (() => clearInterval(id))
    }, [])
    //load all the total comment for the post
    //load all total comment of user
    useEffect(() => {
        async function totalComment() {
            const totalCommentResponse = await fetch(`/blob/all/comment/user/${_id}`)
            const totalCommentData = await totalCommentResponse.json()
            // console.log("total comment data", totalCommentData.data)
            if (totalCommentResponse.status === 200) {
                // console.log({ totalCommentData })
                dispatch({ type: "SET_TOTAL_COMMENT", payload: totalCommentData.data })
                dispatch({ type: "Get_All_Comments", payload: totalCommentData.data })
            }
        }
        totalComment()
    }, [])


    //load the all notification 
    useEffect(() => {
        async function loadNotification() {
            const loadNotificationResponse = await fetch(`/blob/load/all/notification/${_id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            const loadNotificationData = await loadNotificationResponse.json()
            console.log("load notification data", loadNotificationData.data)
            if (loadNotificationResponse.status === 200) {
                dispatch({ type: "Send_Notification", payload: loadNotificationData.data })
            }
        }
        loadNotification()
    }, [])



    //trigger when user login your account
    useEffect(() => {
        // process.env.REACT_APP_API_BACKENDURL
        setSocket(io(process.env.REACT_APP_API_BACKENDURL))

    }, [])

    //add  new user info to the server by socket when user login
    useEffect(() => {
        socket?.emit("newUser", getUserData)
    }, [socket, getUserData])



    // socket?.on("newUser", (data) => {
    //     console.log("new user", data)
    // })

    // console.log({ socket })



    return (
        // w-screen h-screen
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
                    <Switch Switch >
                        <Route exact path="/" >
                            {
                                (getUserData && user) ? <Redirect to="/profile" /> : <Header />
                            }
                            {/* <Dashboard /> */}
                        </Route>
                        <Route exact path="/register">
                            {
                                (getUserData && user) ? <Redirect to="/profile" /> : <Register />
                            }
                            {/* <Register /> */}
                        </Route>
                        <Route exact path="/login">
                            {(getUserData && user) ? <Redirect to="/profile" /> : <Login />}
                            {/* <Login /> */}
                        </Route>
                        <Route exact path="/forget" component={Email} />
                        <Route exact path="/dashboard">
                            {
                                (getUserData && user) ? <Dashboard users={getUserData} socket={socket} /> : <Redirect to="/login" />
                            }
                            {/* <Dashboard /> */}
                        </Route>


                        <Route exact path={'/profile'}>
                            {
                                (getUserData && user) ? <ProfileCard getUserData={getUserData} socket={socket} /> : <Redirect to="/login" />
                            }
                            {/* <ProfileCard/> */}
                        </Route>

                         <Route exact path='/pr'>
                            {
                                (getUserData && user) ? <ProfileCard getUserData={getUserData} socket={socket} /> : <Redirect to="/login" />
                            }
                            {/* <ProfileCard/> */}
                        </Route>  

                        <Route exact path="/update_profile">
                            {
                                (getUserData && user) ? <UpdateProfile getUserData={getUserData} socket={socket} /> : <Redirect to="/login" />
                            }
                            {/* <UpdateProfile/> */}
                        </Route>
                        <Route exact path="/user/posts">
                            {
                                (getUserData && user) ? <UserPosts user={getUserData} socket={socket} /> : <Redirect to="/login" />
                            }
                        </Route>
                        <Route exact path="/user/photos">
                            {
                                (getUserData && user) ? <UserPhotos user={getUserData} socket={socket} /> : <Redirect to="/login" />
                            }
                        </Route>




                    </Switch>
                </div >

                {
                    (getUserData && user) &&
                    <div className="right_section  fixed top-[93%] right-[.5rem]">

                        <RightSidebar socket={socket} />

                    </div>
                }
            </>
        </Context.Provider>
    )
}
export default App
