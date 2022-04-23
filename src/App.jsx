import React, { createContext, useEffect, useState } from 'react'
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
        
            const response = await fetch(`/all/google/success`, {
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
        setSocket(io("http://localhost:5000"))

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
                    <div className="right_section  fixed top-[95%] right-[.5rem] md:w-[10rem] bg-blue-800 rounded-sm py-[.5rem] md:px-[1.5rem] px-[3rem]">

                        <RightSidebar socket={socket} />

                    </div>
                }
            </>
        </Context.Provider>
    )
}
export default App
