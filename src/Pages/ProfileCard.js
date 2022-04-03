import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import Image from '@material-tailwind/react/Image';
import H5 from '@material-tailwind/react/Heading5';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import Button from '@material-tailwind/react/Button';
import ProfilePicture from '../assets/img/team-1-800x800.jpg';
// import Image from "@material-tailwind/react/Image";
import Thomas from '../assets/img/thomas.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillCameraFill } from 'react-icons/bs'
import { HiPencil } from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import AddPost from '../Components/ProfilePageComponent/AddPost';
import PublicPostCard from '../Components/ProfilePageComponent/PublicPostCard';
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import { Redirect, useHistory } from 'react-router-dom';
import profile from '../assets/img/download.png'





export default function ProfileCard(props) {
    // console.log(props.users)
    // const { name, email, } = props.users.user
    const buttonRef = useRef()
    const history = useHistory()
    const dispatch = useDispatch()


    const [profileImage, setProfileImage] = useState("")

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
    console.log("[profile card from redux", PostWhichUserSelectedImageORVideo)

    const { fname, lname, college, city, country, position, stream, aboutMe } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "" }















    return (

        <>

            {/* <div className='con'> */}

            {/* <AdminNavbar /> */}




            <section class="relative block h-[500px]   md:ml-[16rem]">
                <div class="bg-profile-background bg-cover bg-center absolute top-0 w-full h-full flex flex-shrink-0  ">

                    {
                        ShowImageBackground ? <Image
                            src={ShowImageBackground}
                            className="w-full h-full rounded-t-none"
                            rounded={false}
                            raised={false}
                            alt="Image"


                        /> : ""
                    }


                </div>
            </section>


            <div className=' card-container flex justify-around md:pl-48 relative   shadow-lg '>


                <Card className=" lg:-mt-[170px] md:-mt-[280px] -mt-[300px] 
                        md:ml-[8rem] md:mr-[6rem]  md-w-[71rem] mx-[2rem]  shadow-lg " >
                    <div className="flex flex-wrap justify-center ">
                        <div className="w-48  px-4 -mt-24 relative">

                            {DispatchProfileImage.value ?
                                <Image src={DispatchProfileImage.value} rounded={true} raised={true} className="object-cover" />

                                :
                                <>
                                    <Image src={profile} rounded={true} raised={true} className="object-cover" />
                                </>
                            }

                            {/* THISIS PROFILE CHANGE CAMERA */}

                            {/* <div className='
                            absolute 
                            top-[112px]
                            right-[21px]
                            cursor-pointer
                            '
                                onClick={() => {
                                    dispatch({ type: "Model_Open", payload: true })
                                }}
                            >
                                <BsFillCameraFill className='text-[#0E3EDA] text-3xl md:text-4xl' />
                            </div> */}

                        </div>

                        <div className='mt-3  ml-[10rem] '>
                            <Button
                                color="purple"
                                buttonType="filled"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                            >
                                Connect
                            </Button>
                        </div>
                        <div className="w-full flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="p-4 text-center">
                                <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                    22
                                </span>
                                <span className="text-sm text-gray-700">Friends</span>
                            </div>
                            <div className="p-4 text-center">
                                <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                    {TotalComment}
                                </span>
                                <span className="text-sm text-gray-700">Comments</span>
                            </div>
                            <div className="p-4 text-center">
                                <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                    10
                                </span>
                                <span className="text-sm text-gray-700">Photos</span>
                            </div>

                            <div className="p-4 text-center">
                                <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                    {GetAllPosts.length > 0 ? GetAllPosts.length : 0}
                                </span>
                                <span className="text-sm text-gray-700">Posts</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">

                        {
                            (fname && lname && country && city && stream && position && aboutMe) ? "" :
                                <section>
                                    <Button
                                        color="deepPurple"
                                        buttonType="filled"
                                        size="regular"
                                        rounded={true}
                                        block={false}
                                        iconOnly={true}
                                        ripple="light"
                                        ref={buttonRef}
                                        onClick={() => {
                                            history.push("/update_profile")
                                        }}


                                    >
                                        <Icon name={<HiPencil className='text-[1.5rem]' />} size="sm" />
                                    </Button>
                                </section>
                        }
                        <H5 color="gray">

                            {(fname && lname) ? fname + " " + lname : "NA"}

                        </H5>
                        <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
                            <Icon name="place" size="xl" />
                            {/* {city + "," + country ? city + "," + country : "NA"} */}
                            {
                                (city && country) ? city + ", " + country : "NA"

                            }
                        </div>
                        <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
                            <Icon name="work" size="xl" />

                            {(position && stream) ? position + "," + stream : "NA"}
                        </div>
                        <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                            <Icon name="account_balance" size="xl" />
                            {college ? college : "NA"}
                        </div>
                    </div>
                    <CardBody>
                        <div className="border-t border-lightBlue-200 text-center px-2 ">
                            <LeadText color="blueGray">
                                {aboutMe ? aboutMe : "NA"}
                            </LeadText>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="w-full flex justify-center -mt-8">
                            <a
                                href="#pablo"
                                className="mt-5"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Button color="purple" buttonType="link" ripple="dark">
                                    Show more
                                </Button>
                            </a>
                        </div>
                    </CardFooter>
                </Card>

            </div>
            <AddPost />

            {/*========================== PUBLIC POST============== */}

            <PublicPostCard data={PostWhichUserSelectedImageORVideo} />


            <Tooltips placement="top" ref={buttonRef}>
                <TooltipsContent>Create Profile</TooltipsContent>
            </Tooltips>
        </>





    );
}
