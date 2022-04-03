import React, { createContext, useEffect, useState } from 'react'

import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Register from './Components/Register'

import Login from './Components/Login';
import Email from './Components/Email';
import Header from './Components/Header'
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

export const Context = createContext()





function App() {
    const [userData, setUserData] = React.useState(null)
    const history = useHistory()
    // const [users, dispatch] = React.useReducer(Reducer, Init)
    const [cookie, setCookie] = useCookies(['uuid'])
    const dispatch = useDispatch()

    const users = useSelector((state) => {
        return state.UserStillLogin
    })

    const { _id } = JSON.parse(localStorage.getItem("user_login")) ? JSON.parse(localStorage.getItem("user_login")) : { _id: "" }


    // const { _id } = users.user ? users.user : { _id: "" }

    const getUserData = JSON.parse(localStorage.getItem("user_login"))
    // const {_id}






    // console.log("dispatch user data", users)
    // console.log("localtorage user data", getUserData)
    // console.log("usercooklie", cookie)

    // localStorage.setItem("userInfo",users)
    // localStorage.setItem("uuid", JSON.stringify(cookie.uuid))

    // console.log("localstoragfe data")
    // console.log(localStorage.getItem("uuid"))






    //
    // LOAD THE LOFIN DATA FROM SERVER

    // useEffect(() => {
    //     const socket = io.connect("http://localhost:5000")

    //     socket.on("message",(msg)=>{
    //         console.log("msg",msg)
    //     })


    // },[])






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
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),

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
                localStorage.setItem("user_login", JSON.stringify(data.user))
                // console.log("user login data from google", JSON.stringify(data.user))

                // dispatch({ type: "SET_USER", payload: { user: data.user } })
                setUserData(data.user)


                // history.push("/dashboard")

            }
            else {
                error({ message: data.message })
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

            const res = await fetch(`/blob/profile/image/e9thhvkKqJpnTlYo1sQl/QVbghZqhoSr2Rt5qvNYJ/iKj3RoJojFWmcDo4wTlm/9Olk5vTenhdkjHrdYEWl/${_id}`, {
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
            const parseValue = data.parseData

            if (res.status === 200) {
                // setuploadImageDataFromServer(parseValue.resources)
                if (parseValue.resources.length === 0) {
                    dispatch({ type: "LOADER", payload: false })
                }
                dispatch({ type: "uploadImageDataFromServer", payload: parseValue.resources })
                // setShowImage(parseValue.resources[0].url)
                dispatch({ type: "ShowImage", payload: parseValue.resources[0].url })


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
        console.log("id is ", _id)





        async function BackgroundImage() {

            dispatch({ type: "LOADER", payload: true })
            // setLoader(true)

            const res1 = await fetch(`/blob/bg/image/mwQgga2z5KfChXjuF1s0/r6dg0LqqWmCG4W5UQOTa/ftFhzft7YNwT6jb9EVoX/ogvnbpOcPnjgMatu3mtb/JSC2PQZQVlK19QXDbSl1/${_id}`, {
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
            // console.log("backgroung imagfe load ", res1)
            const parseValue1 = data1.parseData
            console.log("background image data load", data1)

            if (res1.status === 200) {
                // setuploadImageDataFromServer(parseValue.resources)
                if (parseValue1.resources.length === 0) {
                    dispatch({ type: "LOADER", payload: false })
                }
                dispatch({ type: "uploadImageDataFromServerBackground", payload: parseValue1.resources })

                // setShowImage(parseValue.resources[0].url)
                dispatch({ type: "ShowImageBackground", payload: parseValue1.resources[0].url })
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



        // const id = setInterval(() => {

        async function userInfoLoad() {
            const userInfo = await fetch(`/blob/user/083525p7ljhwmxifts31/l66cbrsuytmj1wujuauz/nqoye5ozdqj89b4s4qoq/ua1iztaxjo4bbmzvd391/3mzqeygnoszlknp90h51/t28uf00khscofxgjwj20/${_id}`, {
                method: "GET",
                credentials: 'same-origin',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Authorization": "Bearer " + localStorage.getItem("uuid")

                }

            })
            const res = await userInfo.json()
            // console.log("userinformation load", res.message)

            if (userInfo.status === 200) {
                dispatch({ type: "USERINFO_LOAD", payload: res.message })
            }
        }
        userInfoLoad()

        // }, 1000);
        // return (()=>clearInterval(id))




    }, [])



    //LOAD ALL THE posts for users

    useEffect(() => {

        // const id = setInterval(() => {


        // /blob/users/public/posts/${_id}
        async function loadPosts() {
            const loadPostResponse = await fetch(`/blob/load/all/post/${_id}`)
            const loadPostData = await loadPostResponse.json()

            console.log("load post data", loadPostData.data, loadPostResponse)
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
            console.log("total comment data", totalCommentData.data)
            if (totalCommentResponse.status === 200) {
                console.log({ totalCommentData })
                dispatch({ type: "SET_TOTAL_COMMENT", payload: totalCommentData.data })
            }
        }
        totalComment()



    }, [])









    // console.log("user data", user)


    return (

        // w-screen h-screen
        <Context.Provider value={{ users, dispatch }}>
            <>

                {
                    (getUserData || userData) && <Sidebar />
                }

                <div className='bg-[#000B49]'>




                    <Switch Switch >

                        <Route exact path="/" >
                            {
                                (getUserData) ? <Redirect to="/dashboard" /> : <Header />

                            }



                            {/* <Dashboard /> */}

                        </Route>
                        <Route exact path="/register">
                            {
                                (getUserData) ? <Redirect to="/dashboard" /> : <Register />

                            }

                            {/* <Register /> */}
                        </Route>
                        <Route exact path="/login">

                            {(getUserData) ? <Redirect to="/dashboard" /> : <Login />}

                            {/* <Login /> */}

                        </Route>
                        <Route exact path="/forget" component={Email} />
                        <Route exact path="/dashboard">
                            {
                                (getUserData) ? <Dashboard users={getUserData} /> : <Redirect to="/login" />
                            }
                            {/* <Dashboard /> */}
                        </Route>


                        <Route exact path="/profile">
                            {
                                (getUserData) ? <ProfileCard getUserData={getUserData} /> : <Redirect to="/login" />
                            }
                            {/* <ProfileCard/> */}
                        </Route>


                        <Route exact path="/update_profile">
                            {
                                (getUserData) ? <UpdateProfile getUserData={getUserData} /> : <Redirect to="/login" />
                            }
                            {/* <UpdateProfile/> */}
                        </Route>


                        <Route exact path="/user/posts">
                            {
                                (getUserData) ? <UserPosts user={getUserData} /> : <Redirect to="/login" />
                            }

                        </Route>

                        <Route exact path="/user/photos">
                            {
                                (getUserData) ? <UserPhotos user={getUserData} /> : <Redirect to="/login" />
                            }

                        </Route>










                    </Switch>









                </div >
            </>
        </Context.Provider>

    )
}

export default App




//toastify message


async function success(props) {
    // console.log("success", props)
    const notify = () => toast.success(props.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });

    notify()
    return (
        <div>

            <ToastContainer />
        </div>
    );
}




function error(props) {
    // console.log("0fsdfsd", props)
    const notify = () => toast.error(props.message, {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });

    notify()
    return (
        <div>

            <ToastContainer />
        </div>
    );
}