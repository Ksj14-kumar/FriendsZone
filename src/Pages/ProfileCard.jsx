import Card from '@material-tailwind/react/Card';

import Image from '@material-tailwind/react/Image';
import Button from '@material-tailwind/react/Button';
// import Image from "@material-tailwind/react/Image";
import { useDispatch, useSelector } from 'react-redux';
import { BiUserX } from 'react-icons/bi'
import { useEffect, useRef, useState } from 'react';

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import { BrowserRouter, NavLink, Redirect, Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import profile from '../assets/img/download.png'
import { FaUserPlus, FaFacebookMessenger } from 'react-icons/fa'

import Friends from '../Components/ProfileCardComponents/Friends'
import Photos1 from '../Components/ProfileCardComponents/Photos'
import Posts from '../Components/ProfileCardComponents/Posts'
import Status from '../Components/ProfileCardComponents/Status'
import Comments from '../Components/ProfileCardComponents/Comments'
import Icon from '@material-tailwind/react/Icon';
import UpdateProfile from './UpdateProfile';
import UserFeed from '../Components/UserFeed/UserFeed';
import RightSide from '../Components/UserFeed/RightSide';





export default function ProfileCard(props) {
    const [loadUserProfileInfo, setLoadUSerProfileInfo] = useState(false)

    const buttonRef = useRef()
    const dispatch = useDispatch()
    // const [query, setSearchQueary] = useState(null)
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const usernameId = useParams().username
    const [userInfo, setUserInfo] = useState({})
    const [connectMessage, setConnectMessage] = useState(null)
    const [AcceptMessage, setAcceptMessage] = useState(false)
    const [acceptorMessage, setAcceptorMessage] = useState(false)
    const [localProfileURL, setLocalProfileURL] = useState("")
    const [localBackgroundURL, setLocalBackgroundURL] = useState("")
    const Query = useSelector((state) => {
        return state.Query

    })
    const UserInformationLoad = useSelector((state) => {
        console.log(state)
        return state.UserInformationLoad.value
    })

    const BgImage = useSelector((state) => {
        return state.ShowImageBackground.value
    })


    // const DispatchProfileImage = useSelector((state) => {
    //     return state.ShowImage
    // })

    // const GetAllPosts = useSelector((state) => {
    //     return state.GetAllPosts
    // })
    // const TotalComment = useSelector((state) => {
    //     return state.TotalComment
    // })
    // const PostWhichUserSelectedImageORVideo = useSelector((state) => {
    //     return state.PostWhichUserSelectedImageORVideo
    // })
    const { fname, lname, googleId, url, friends } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "", googleId: "", url: "", senderrequest: [] }
    const { path } = useRouteMatch()

    useEffect(() => {
        params.set("id", Query)

    }, [Query, params])


    useEffect(() => {

        async function loadUserProfileData() {
            try {
                setLoadUSerProfileInfo(true)
                const getUserResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/finduserprofile/`, {
                    method: "POST",
                    body: JSON.stringify({ anotherUserId: usernameId }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                    }
                })
                const ResponseData = await getUserResponse.json()
                if (getUserResponse.status === 200) {
                    setUserInfo(ResponseData)
                    setLoadUSerProfileInfo(false)
                }
                else if (getUserResponse !== 200) {
                    setLoadUSerProfileInfo(false)
                }

            }
            catch (err) {
                console.warn(err)
            }

        }
        loadUserProfileData()
    }, [usernameId])




    //send the friends request to user

    // useEffect(() => {
    async function sendFriendRequest() {
        try {

            // props.socket?.emit("sendFriendRequest", { senderURL, senderName: fname + " " + lname, anotherUserId: usernameId, currentUser: googleId, receiverUrl: userInfo.ProfileURL })
            const sendFriendRequestResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/sendfriendrequest/`, {
                method: "POST",
                body: JSON.stringify({
                    profileUrl: url,
                    recieverName: userInfo.userGeneralInfo[0].fname + " " + userInfo.userGeneralInfo[0].lname,
                    senderName: fname + " " + lname,
                    userId: localStorage.getItem("uuid"),
                    currentUser: googleId,
                    anotherUserId: usernameId,
                    receiverUrl: userInfo.ProfileURL,
                    senderUrl: url,
                    connectMessage
                }
                ),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                }
            })

            // const sendFriendRequestResponseData = await sendFriendRequestResponse.json()
            if (sendFriendRequestResponse.status === 200) {
                // setConnectMessage(sendFriendRequestResponseData.message)
                // setAcceptMessage(true)
                // setaccepted(sendFriendRequestResponseData.accepted)
            }
        }
        catch (err) {
            console.warn(err)
        }

    }




    //when user load the page or refresh the page and check jis user ki profile dekh rha hai wo user send request array mai wxit krta bhi hai or nhi 
    useEffect(() => {
        const value = UserInformationLoad.senderrequest !== undefined && UserInformationLoad.senderrequest.some(item => item._id === usernameId)
        setConnectMessage(value)
    }, [usernameId, UserInformationLoad])



    useEffect(() => {
        setAcceptMessage((friends !== undefined) && (friends.some(item => item._id === usernameId
        )))
    }, [usernameId, friends])


    async function cancleFriendRequest() {
        try {
            const cancleFriendRequestResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/disconnect/friend`, {
                method: "POST",
                body: JSON.stringify({ senderId: usernameId }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`

                }
            })
            // const cancleFriendRequestResponseData = await cancleFriendRequestResponse.json()
            if (cancleFriendRequestResponse.status === 200) {
                setConnectMessage(false)
                setAcceptMessage(false)
                setLoadUSerProfileInfo(false)
            }

        }
        catch (err) {
            console.warn(err)

        }

    }
    useEffect(() => {
        setAcceptorMessage(UserInformationLoad.friends !== undefined && UserInformationLoad.friends.some(item => item._id === usernameId))
    }, [usernameId, UserInformationLoad])


    //sstore the user search hostory
    useEffect(() => {
        async function History() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/history/user/history`, {
                    method: "POST",
                    body: JSON.stringify({
                        adminId: googleId,
                        usernameId,
                        // name: userInfo?.userGeneralInfo[0].fname + " " + userInfo?.userGeneralInfo[0].lname,
                        // receiverUrl: userInfo?.ProfileURL

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`

                    }
                })
                // const data = await res.json()
                if (res.status === 200) {

                }
            }
            catch (err) {
                console.warn(err)
            }
        }
        History()
    }, [usernameId, googleId])

    useEffect(() => {
        async function f1() {
            if (userInfo?.BgURL) {
                const res = await fetch(userInfo.BgURL)
                const blob = await res.blob()
                const bgURL = URL.createObjectURL(blob)
                setLocalBackgroundURL(bgURL)
            }
            else {
                setLocalBackgroundURL("")
            }
        }
        f1()
    }, [usernameId, setLocalProfileURL, userInfo?.BgURL])

    useEffect(() => {
        async function f1() {
            if (userInfo?.ProfileURL) {
                const res1 = await fetch(userInfo.ProfileURL)
                const blobP = await res1.blob()
                const PURL = URL.createObjectURL(blobP)
                setLocalProfileURL(PURL)
            }
            else {
                setLocalProfileURL("")
            }
        }
        f1()

    }, [usernameId, setLocalProfileURL, userInfo?.ProfileURL])




    return (

        <>
            {/* <div className='con'> */}
            {/* <AdminNavbar /> */}
            <div className="make_two_section md:flex md:justify-between relative">

                <div className="profile_card-container  w-full">
                    <div className="profile_wrapper flex  flex-col items-center">

                        <section className="relative block h-[300px] md:h-[400px] w-[615px]">
                            <div className="bg-profile-background bg-cover bg-center absolute top-[3.7rem] w-full h-full flex flex-shrink-0  ">
                                {
                                    loadUserProfileInfo ? <div
                                        src={BgImage}
                                        className="w-full h-full rounded-t-none bg-[#b9b8b8b5] animate-pulse rounded-b-sm"
                                        rounded={false}
                                        raised={false}
                                    // alt="Image"


                                    ></div> :
                                        (userInfo.BgURL ? <Image
                                            // src={userInfo.BgURL}
                                            src={localBackgroundURL}
                                            className="w-full h-full rounded-t-none "
                                            rounded={false}
                                            raised={false}
                                            alt="Image"


                                        /> : "")
                                }




                            </div>
                        </section>
                        <div className=' card-container flex justify-center md:pl-[0] relative     md:w-[58rem]  md:mt-[6rem] mt-[17rem]  -mb-[6rem] '>


                            <Card className=" lg:-mt-[170px] md:-mt-[280px] -mt-[300px] 
                        md:ml-[8rem] md:mr-[6rem]  md-w-[71rem] mx-[2rem]  " >
                                <div className="flex flex-wrap justify-center relative md:flex-col">
                                    <div className="w-48 mds-editor2:w-40 px-4 -mt-24 relative outline-1 outline-red-600 rounded-full md:justify-center md:mx-auto">

                                        {userInfo.ProfileURL ?
                                            <Image
                                                // src={userInfo.ProfileURL}
                                                src={localProfileURL}
                                                rounded={true} raised={true} className="object-cover  outline-3 rounded-full outline-double outline-offset-1 outline-neutral-500 " />
                                            :
                                            <>
                                                <Image src={profile} rounded={true} raised={true} className="object-cover" />
                                            </>
                                        }

                                        {/* THISIS PROFILE CHANGE CAMERA */}

                                        <div className='
                            absolute 
                            top-[95px]
                            right-[21px]
                            cursor-pointer
                            '
                                            onClick={() => {
                                                dispatch({ type: "Model_Open", payload: true })
                                            }}
                                        >
                                            {/* <BsFillCameraFill className='text-[#000000] text-3xl md:text-4xl' /> */}
                                        </div>

                                    </div>

                                    <main className="buttons  flex  justify-center pl-0 
                                md:mt-0 mt-[1rem] items-center content-center flex-wrap gap-y-2">

                                        {/* ml-[7rem] */}
                                        <div className='md:mt-3   '>
                                            {
                                                googleId !== usernameId &&
                                                <Button
                                                    color="purple"
                                                    buttonType="filled"
                                                    size="regular"
                                                    rounded={false}
                                                    block={false}
                                                    iconOnly={false}
                                                    disabled={AcceptMessage === true ? true : false}
                                                    ripple="light"
                                                    className="normal-case tracking-wider font-light text-lg"
                                                    onClick={() => {

                                                        sendFriendRequest()
                                                        setConnectMessage(!connectMessage)


                                                    }}
                                                >
                                                    <Icon name={<FaUserPlus className='text-[1.3rem]' />} className="mr-2" />


                                                    {
                                                        AcceptMessage === true ? "Connected" : (connectMessage ? "request sent" : "Connect")
                                                    }
                                                </Button>
                                            }
                                        </div>
                                        <div className='  ml-[.3rem] md:ml-[1rem] flex md:mt-3'>
                                            {
                                                (AcceptMessage === true && acceptorMessage) &&
                                                (googleId !== usernameId &&
                                                    <>
                                                        {/* ${usernameId} */}
                                                        <NavLink to={
                                                            `/messages?q=${usernameId}`
                                                        }>
                                                            <Button
                                                                color="lightBlue"
                                                                buttonType="filled"
                                                                size="regular"
                                                                rounded={false}
                                                                block={false}
                                                                iconOnly={false}
                                                                ripple="light"
                                                                className="normal-case tracking-wider text-lg font-light"
                                                            >
                                                                <Icon name={<FaFacebookMessenger />} className="mr-2" />
                                                                Message
                                                            </Button>
                                                        </NavLink>

                                                        <Button
                                                            color="red"
                                                            buttonType="filled"
                                                            size="regular"
                                                            rounded={false}
                                                            block={false}
                                                            iconOnly={false}
                                                            ripple="light"
                                                            className="ml-2 normal-case tracking-wider text-lg font-light"
                                                            onClick={() => {
                                                                const bool = window.confirm("Are you sure want to Disconnect?")
                                                                if (bool) {

                                                                    cancleFriendRequest(true)
                                                                    setAcceptMessage(false)
                                                                }
                                                                else {

                                                                }
                                                            }}

                                                        >
                                                            <Icon name={<BiUserX className='text-[1.4rem]' />} className="mr-2" />
                                                            Disconnect
                                                        </Button>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </main>

                                    <div className="w-full flex justify-center py-2 lg:pt-4 pt-8 ">

                                    </div>


                                    <BrowserRouter>
                                        <div className="bottom flex-col relative flex-wrap md:w-[42rem] md:mx-auto w-full ">

                                            <div className="containe1 flex justify-around  w-full  rounded-lg border border-solid border-[#e6e3e39a]">

                                                <NavLink to={path}
                                                    activeStyle={{ borderBottom: "2px solid #E91E63" }}
                                                    className={(isActive) => isActive ? "active" : "inactive"}


                                                >

                                                    <div className="p-4 text-center  rounded-lg rounded-b-none   
                                             pb-1">
                                                        <span className=" text-gray-700 md:text-lg text-[1rem] font-semibold
                                                    
                                                    space-x-1">Status</span>
                                                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                                            🎭
                                                        </span>
                                                    </div>

                                                </NavLink>


                                                <NavLink to="/user/friends"
                                                    activeStyle={{ borderBottom: "2px solid #E91E63" }}

                                                >
                                                    <div className="p-4 text-center  rounded-lg rounded-b-none  pb-1 ">
                                                        <span className=" text-gray-700 md:text-lg text-[1rem] font-semibold space-x-1">Friends</span>
                                                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                                            {
                                                                Object.keys(userInfo).length > 0 && userInfo.userGeneralInfo[0].friends.length
                                                            }
                                                        </span>
                                                    </div>

                                                </NavLink>
                                                {/* <NavLink to="/user/comments">
                                        <div className="p-4 text-center">
                                            <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                                {TotalComment}
                                            </span>
                                            <span className="text-sm text-gray-700">Comments</span>
                                        </div>

                                    </NavLink> */}
                                                <NavLink to="/user/photos"
                                                    activeStyle={{ borderBottom: "2px solid #E91E63" }}
                                                >
                                                    <div className="p-4 text-center  rounded-lg rounded-b-none  pb-1 ">
                                                        <span className=" text-gray-700 md:text-lg text-[1rem] font-semibold space-x-1">Photos</span>
                                                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                                            22
                                                        </span>
                                                    </div>
                                                </NavLink>
                                                <NavLink to="/user/posts"
                                                    activeStyle={{ borderBottom: "2px solid #E91E63" }}
                                                >
                                                    <div className="p-4 text-center  rounded-lg rounded-b-none  pb-1 ">
                                                        <span className=" text-gray-700 md:text-lg text-[1rem] font-semibold space-x-1">Posts</span>
                                                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                                            {
                                                                Object.keys(userInfo).length > 0 && userInfo.getUserPost.length
                                                            }
                                                        </span>
                                                    </div>


                                                </NavLink>
                                            </div>

                                            <Switch>

                                                <div className={`section  mt-4  flex-auto  mds-editor8:w-full  border border-solid border-[#cccccc59] rounded-xl ${loadUserProfileInfo && "bg-[#c4c3c3ea] animate-pulse"}`} >

                                                    {/* fname={fname} lname={lname} country={country} city={city} stream={stream} position={position} aboutMe={aboutMe} college={college} */}
                                                    <Route exact path={path} >
                                                        <Status info={Object.keys(userInfo).length > 0 && userInfo.userGeneralInfo[0]} loadUserProfileInfo={loadUserProfileInfo} />
                                                    </Route>
                                                    <Route exact path="/user/friends">
                                                        {userInfo ? <Friends info={Object.keys(userInfo).length > 0 && userInfo.userGeneralInfo[0]} loadUserProfileInfo={loadUserProfileInfo} usernameId={usernameId} _id={googleId}
                                                            cancleFriendRequest={cancleFriendRequest}
                                                            setAcceptMessage={setAcceptMessage}
                                                            friends={friends}
                                                        /> : <Redirect to={path} />

                                                        }
                                                    </Route>
                                                    <Route exact path="/user/comments">
                                                        <Comments />
                                                    </Route>
                                                    <Route exact path="/user/photos">
                                                        <Photos1 />
                                                    </Route>
                                                    <Route exact path="/user/posts"  >

                                                        <Posts />
                                                    </Route>

                                                    <Route exact path="/update_profile"  >

                                                        <UpdateProfile />
                                                    </Route>
                                                </div>

                                            </Switch>
                                        </div>

                                    </BrowserRouter>
                                </div>

                            </Card>
                        </div>

                    </div>

                    <UserFeed PostWhichUserSelectedImageORVideo={Object.keys(userInfo).length > 0 && userInfo.getUserPost} socket={props.socket} threeDot={Object.keys(userInfo).length > 0 && userInfo.ShowDot} setShowLikeUserModal={props.setShowLikeUserModal} showLikeUserModal={props.showLikeUserModal} />








                    <Tooltips placement="top" ref={buttonRef}>
                        <TooltipsContent>Create Profile</TooltipsContent>
                    </Tooltips>

                </div>

                {/* //=================right section of profile page start====== */}
                <RightSide />

                {/* //=========================right sectioon end of right sidebar================== */}
            </div >

        </>





    );
}
