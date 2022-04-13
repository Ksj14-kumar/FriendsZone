import React, { useContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

import { Context } from '../App';
import UpdateProfile from './UpdateProfile';
import AdminNavbar from '../Components/AdminNavbar';
import { useSelector, useDispatch } from 'react-redux';

function Dashboard(props) {


    const dispatch = useDispatch()

    const users = useSelector((state) => {
        // console.log("dashobard user login data0", state)
        return state.UserStillLogin.user
    })



    const _id  = JSON.parse(localStorage.getItem("user_login"))

    // const { _id } = users ? users : { _id: "" }

    console.log("iuser id is ", _id)


    // //LOAD ALL THE posts for users

    // useEffect(() => {

    //     async function loadPosts() {
    //         const loadPostResponse = await fetch(`/blob/users/public/posts/${_id}`)
    //         const loadPostData = await loadPostResponse.json()

    //         console.log("load post data", loadPostData.data, loadPostResponse)
    //         // if (loadPostData.status === 200) {
    //             dispatch({
    //                 type: "LOAD_POSTS",
    //                 payload: loadPostData.data
    //             })

    //         // }


    //     }
    //     loadPosts()

    // }, [])





    // //===================LOAD THE USER INFORMATION FROM THE SERVER============


    // useEffect(() => {



    //     // const id = setInterval(() => {

    //     async function userInfoLoad() {
    //         const userInfo = await fetch("/blob/user/083525p7ljhwmxifts31/l66cbrsuytmj1wujuauz/nqoye5ozdqj89b4s4qoq/ua1iztaxjo4bbmzvd391/3mzqeygnoszlknp90h51/t28uf00khscofxgjwj20", {
    //             method: "GET",
    //             credentials: 'same-origin',
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Credentials": true,
    //                 "Authorization": "Bearer " + localStorage.getItem("uuid")

    //             }

    //         })
    //         const res = await userInfo.json()
    //         // console.log("userinformation load", res.message)

    //         if (userInfo.status === 200) {
    //             dispatch({ type: "USERINFO_LOAD", payload: res.message })
    //         }
    //     }
    //     userInfoLoad()

    //     // }, 1000);
    //     // return (()=>clearInterval(id))




    // }, [])






    // //=====================LOAD THE BACKGROUND IMAGES=============

    // useEffect(() => {

    //     // const id = setInterval(() => {

    //     async function BackgroundImage() {

    //         dispatch({ type: "LOADER", payload: true })
    //         // setLoader(true)

    //         const res1 = await fetch("/blob/bg/image/mwQgga2z5KfChXjuF1s0/r6dg0LqqWmCG4W5UQOTa/ftFhzft7YNwT6jb9EVoX/ogvnbpOcPnjgMatu3mtb/JSC2PQZQVlK19QXDbSl1", {
    //             method: "GET",
    //             credentials: 'same-origin',
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Credentials": true,
    //                 "Authorization": "Bearer " + localStorage.getItem("uuid")

    //             }

    //         })

    //         const data1 = await res1.json()
    //         // console.log("backgroung imagfe load ", res1)
    //         const parseValue1 = data1.parseData
    //         // console.log("background image data load", data1)

    //         if (res1.status === 200) {
    //             // setuploadImageDataFromServer(parseValue.resources)
    //             if (parseValue1.resources.length === 0) {
    //                 dispatch({ type: "LOADER", payload: false })
    //             }
    //             dispatch({ type: "uploadImageDataFromServerBackground", payload: parseValue1.resources })
    //             // setShowImage(parseValue.resources[0].url)
    //             dispatch({ type: "ShowImageBackground", payload: parseValue1.resources[0].url })


    //             // setLoader(false)
    //             dispatch({ type: "LOADER", payload: false })


    //         }

    //         else {
    //             // console.log("Image is not load")
    //         }
    //     }
    //     BackgroundImage()
    //     // }, 2000);

    //     // return () => clearInterval(id)

    // }, [])
    // // users.user




    // //====================LOAD PROFILE IMAGES=============

    // useEffect(() => {

    //     // const id = setInterval(() => {

    //     async function ProfileImages() {

    //         dispatch({ type: "LOADER", payload: true })
    //         // setLoader(true)

    //         const res = await fetch("/blob/profile/image/e9thhvkKqJpnTlYo1sQl/QVbghZqhoSr2Rt5qvNYJ/iKj3RoJojFWmcDo4wTlm/9Olk5vTenhdkjHrdYEWl", {
    //             method: "GET",
    //             credentials: 'same-origin',
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Credentials": true,
    //                 "Authorization": "Bearer " + localStorage.getItem("uuid")

    //             }

    //         })

    //         const data = await res.json()
    //         const parseValue = data.parseData

    //         if (res.status === 200) {
    //             // setuploadImageDataFromServer(parseValue.resources)
    //             if (parseValue.resources.length === 0) {
    //                 dispatch({ type: "LOADER", payload: false })
    //             }
    //             dispatch({ type: "uploadImageDataFromServer", payload: parseValue.resources })
    //             // setShowImage(parseValue.resources[0].url)
    //             dispatch({ type: "ShowImage", payload: parseValue.resources[0].url })


    //             // setLoader(false)
    //             dispatch({ type: "LOADER", payload: false })


    //         }

    //         else {
    //             dispatch({ type: "LOADER", payload: false })
    //             // console.log("Image is not load")
    //         }
    //     }
    //     ProfileImages()
    //     // }, 2000);

    //     // return () => clearInterval(id)

    // }, [])





    return (
        <div className='text-white'>
            {/* <Sidebar name={name} email={email} /> */}
            {/* <AdminNavbar/> */}
            <UpdateProfile />












        </div>




    )
}

export default Dashboard;