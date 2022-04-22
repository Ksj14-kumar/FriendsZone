import Card from '@material-tailwind/react/Card';

import Image from '@material-tailwind/react/Image';

import Button from '@material-tailwind/react/Button';
import ProfilePicture from '../assets/img/team-1-800x800.jpg';
// import Image from "@material-tailwind/react/Image";
import Thomas from '../assets/img/thomas.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillCameraFill } from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import AddPost from '../Components/ProfilePageComponent/AddPost';
import PublicPostCard from '../Components/ProfilePageComponent/PublicPostCard';
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import { BrowserRouter, NavLink, Redirect, useHistory, Route, Switch, useLocation, useParams } from 'react-router-dom';
import profile from '../assets/img/download.png'
import { MdAirlineSeatIndividualSuite, MdMessage } from 'react-icons/md'
import { FaUserPlus, FaFacebookMessenger } from 'react-icons/fa'

import Friends from '../Components/ProfileCardComponents/Friends'
import Photos1 from '../Components/ProfileCardComponents/Photos'
import Posts from '../Components/ProfileCardComponents/Posts'
import Status from '../Components/ProfileCardComponents/Status'
import Comments from '../Components/ProfileCardComponents/Comments'
import Icon from '@material-tailwind/react/Icon';
import UpdateProfile from './UpdateProfile';
import RoundedSideBar from '../Components/RightSideBar/RoundedSideBar';
import SliderNews from '../Components/RightSideBar/SliderNews';
import NewsSection from '../Components/RightSideBar/NewsSection';
import FriendSuggestion from '../Components/ProfilePageComponent/FriendSuggestion'





export default function ProfileCard(props) {
    // console.log(props.users)
    const [value, setValue] = useState(null)
    const buttonRef = useRef()
    const dispatch = useDispatch()
    const [query, setSearchQueary] = useState(null)
    const { search } = useLocation();
    console.log(search)
    const params = new URLSearchParams(search);
    console.log(params.get("id"))
    const [profileImage, setProfileImage] = useState("")








    const Query = useSelector((state) => {
        console.log("state is ", state)
        return state.Query

    })

    const DispatchProfileImage = useSelector((state) => {
        return state.ShowImage
    })

    const GetAllPosts = useSelector((state) => {
        return state.GetAllPosts
    })
    const TotalComment = useSelector((state) => {
        return state.TotalComment
    })


    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    const ShowImageBackground = useSelector((state) => {
        return state.ShowImageBackground.value
    })




    const PostWhichUserSelectedImageORVideo = useSelector((state) => {
        return state.PostWhichUserSelectedImageORVideo
    })
    // console.log("[profile card from redux", PostWhichUserSelectedImageORVideo)

    const { fname, lname, college, city, country, position, stream, aboutMe } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "" }









    useEffect(() => {
        console.log(params.get("search"))
        params.set("id", Query)
        console.log(params.get("id"))

    }, [Query])





    return (

        <>

            {/* <div className='con'> */}

            {/* <AdminNavbar /> */}

            <div className="make_two_section md:flex md:justify-between relative">


                {/* md:ml-[.5rem] */}
                <div className="profile_card-container    md:mr-[22rem] md:w-[81rem] md:ml-[0rem] ">






                    <section className="relative block h-[300px] md:h-[400px]  md:ml-[16rem]">
                        <div className="bg-profile-background bg-cover bg-center absolute top-[3.7rem] w-full h-full flex flex-shrink-0  ">

                            {
                                ShowImageBackground ? <Image
                                    src={ShowImageBackground}
                                    className="w-full h-full rounded-t-none "
                                    rounded={false}
                                    raised={false}
                                    alt="Image"


                                /> : ""
                            }


                        </div>
                    </section>


                    <div className=' card-container flex justify-around md:pl-48 relative     md:w-[58rem] md:ml-[11.6rem] md:mt-[6rem] mt-[17rem] '>


                        <Card className=" lg:-mt-[170px] md:-mt-[280px] -mt-[300px] 
                        md:ml-[8rem] md:mr-[6rem]  md-w-[71rem] mx-[2rem]    " >
                            <div className="flex flex-wrap justify-center relative md:flex-col">
                                <div className="w-48 mds-editor2:w-40 px-4 -mt-24 relative outline-1 outline-red-600 rounded-full md:justify-center md:mx-auto">

                                    {DispatchProfileImage.value ?
                                        <Image src={DispatchProfileImage.value} rounded={true} raised={true} className="object-cover  outline-3 rounded-full outline-double outline-offset-1 outline-neutral-500 " />


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

                                <main className="buttons  flex  justify-center pl-0 ">

                                    {/* ml-[7rem] */}
                                    <div className='mt-3   '>
                                        <Button
                                            color="purple"
                                            buttonType="filled"
                                            size="regular"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="light"
                                        >
                                            <Icon name={<FaUserPlus />} className="mr-2" />
                                            Connect
                                        </Button>

                                    </div>
                                    <div className='mt-3  ml-[.3rem] md:ml-[1rem]'>
                                        <Button
                                            color="lightBlue"
                                            buttonType="filled"
                                            size="regular"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="light"
                                        >
                                            <Icon name={<FaFacebookMessenger />} className="mr-2" />
                                            Message
                                        </Button>

                                    </div>
                                </main>

                                <div className="w-full flex justify-center py-2 lg:pt-4 pt-8 ">

                                </div>


                                <BrowserRouter>
                                    <div className="bottom flex-col relative flex-wrap md:w-[42rem] md:mx-auto w-full ">

                                        <div className="containe1 flex justify-around  w-full  rounded-lg border border-solid border-[#e6e3e39a]">

                                            <NavLink to="/user/status"
                                                activeStyle={{ borderBottom: "2px solid #E91E63" }}
                                            //   className={(isActive)=>isActive?"active":"inactive"}
                                            >
                                                <div className="p-4 text-center  rounded-lg rounded-b-none   pb-1">
                                                    <span className=" text-gray-700 md:text-lg text-[1rem] font-semibold space-x-1">Status</span>
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
                                                        22
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
                                                            GetAllPosts?.length
                                                        }
                                                    </span>
                                                </div>


                                            </NavLink>
                                        </div>

                                        <Switch>

                                            <div className="section  mt-4  flex-auto  mds-editor8:w-full  border border-solid border-[#cccccc59] rounded-xl">

                                                <Route exact path="/user/status" >
                                                    <Status fname={fname} lname={lname} country={country} city={city} stream={stream} position={position} aboutMe={aboutMe} college={college} />
                                                </Route>
                                                <Route exact path="/user/friends">
                                                    <Friends />
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
                    <div className="add_post_card bg-black">

                        <AddPost />
                    </div>

                    <div className="friends_groups  text-center  flex justify-center mb-[2rem] ">
                        <div className="container1  ml-[2rem] md:ml-[20rem] md:mr-[6rem] mr-[2.6rem] mds-editor8:ml-0 mds-editor8:mr-0 mb-[1rem]">
                            <div className="swiper_container w-full h-full">
                                <FriendSuggestion />

                            </div>

                        </div>
                    </div>

                    {/*========================== PUBLIC POST============== */}
                    <div className="public_post_card  -mt-[2rem]">

                        <PublicPostCard data={PostWhichUserSelectedImageORVideo} socket={props.socket} />
                    </div>



                    <Tooltips placement="top" ref={buttonRef}>
                        <TooltipsContent>Create Profile</TooltipsContent>
                    </Tooltips>

                </div>

                {/* //=================right section of profile page start====== */}
                <div className="right_section bg-[#fffefe00] md:w-[27.5rem] md:fixed md:right-0 top-[3.7rem]  hidden h-screen  md:flex md:flex-row-reverse md:justify-between">
                    <aside className="right_side_bar bg-[#00000029]   w-[3rem]  rounded-[48px] h-full  ">
                        {/* md:h-20 md:w-20 */}
                        <div className="image mt-[2.5rem] mx-[2px] bg-[#6e6d6d5b] h-full rounded-lg pt-2 hover:transition-colors ">
                            <RoundedSideBar />
                        </div>
                    </aside>
                    <div className="left_side relative md:w-full" >
                        {/* <SliderNews/> */}
                        <NewsSection />
                        {/* <SliderNews />- */}
                    </div>
                </div>
                {/* //=========================right sectioon end of right sidebar================== */}
            </div>

        </>





    );
}




