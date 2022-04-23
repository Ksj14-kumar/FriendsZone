import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import React from 'react'
// import Radio from "@material-tailwind/react/Radio"

import { ToastContainer, toast } from 'react-toastify';
import Icon from '@material-tailwind/react/Icon';
import ProfileCreateLoader from '../Loader/ProfileCreateLoader';
import { useDispatch } from 'react-redux';



export default function SettingsForm() {
    const [loader, setLoader] = React.useState(false)

    const dispatch = useDispatch()


    const _id = localStorage.getItem("uuid")

    const [UserProfileInformationm, setUserProfileInformationm] = React.useState({
        username: "",
        fname: "",
        lname: "",
        gender: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        college: "",
        stream: "",
        degree: "",
        position: "",
        aboutMe: ""



    })



    let name, value;
    function InputHandleValue(e) {
        e.preventDefault()
        name = e.target.name
        value = e.target.value
        setUserProfileInformationm({ ...UserProfileInformationm, [name]: value })

    }

    async function SubmitInfo(e) {
        e.preventDefault()
        const { username, fname, lname, gender, address, city, country, postalCode, aboutMe, college, stream, degree, position } = UserProfileInformationm

        if (!username || !fname || !lname || !gender || !address || !city || !country || !postalCode || !aboutMe || !college || !stream || !degree || !position) {
            error({ message: "Please fill all the fields" })
            return

        }

        else {
            setLoader(true)
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/i/b/y9y5y0q3eztm3ibcd8z0/bum6ozd9m1sw4w9fbxea/amqvdkbe49sn4u3cvsvt/e5ce6ba3miamapdl7wyv/`, {
                method: "PUT",
                body: JSON.stringify({ UserProfileInformationm, uuid: _id }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),

                },


            })

            const resData = await res.json()
            if (res.status === 200) {
                dispatch({ type: "USERINFO_LOAD", payload: resData.data })
                success({ message: resData.message })
                setLoader(false)
                setUserProfileInformationm({
                    username: "",
                    fname: "",
                    lname: "",
                    gender: "",
                    city: "",
                    country: "",
                    address: "",
                    postalCode: "",
                    aboutMe: "",
                    stream: "",
                    college: "",
                    degree: "",
                    position: ""
                })
            }

            else {
                error({ message: resData.message })
                setLoader(false)
            }

        }


    }


    return (
        <Card>
            <CardHeader color="purple" contentPosition="none" className="overflow-hidden">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl ">User Details</h2>
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                    >
                        Details
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <h6 className="text-purple-800 text-sm mt-3 mb-6  uppercase underline">
                        User Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                name="username"
                                outline={true}
                                placeholder="Username"
                                value={UserProfileInformationm.username}

                                onChange={InputHandleValue}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <div className="form-check">
                                <div className='male flex'>
                                    <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="gender"
                                        id="flexRadioDefault10"
                                        value="Male"
                                        onChange={InputHandleValue}

                                    />
                                    <p className="text-[#D1D1D1]">Male</p>


                                </div>

                                <div className='female flex'>

                                    <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="gender" id="flexRadioDefault10"
                                        value="Female"
                                        onChange={InputHandleValue}

                                    />
                                    <p className="text-[#D1D1D1]" >Female</p>

                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                outline={true}
                                value={UserProfileInformationm.fname}

                                name="fname"


                                onChange={InputHandleValue}


                                placeholder="First Name"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                outline={true}
                                value={
                                    UserProfileInformationm.lname

                                }
                                name="lname"


                                onChange={InputHandleValue}


                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <h6 className="text-purple-800 text-sm my-6  uppercase underline">
                        Contact Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-12/12 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                outline={true}
                                value={
                                    UserProfileInformationm.address

                                }
                                name="address"


                                onChange={InputHandleValue}


                                placeholder="Address"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                outline={true}
                                value={
                                    UserProfileInformationm.city

                                }
                                name="city"


                                onChange={InputHandleValue}


                                placeholder="City"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                outline={true}
                                value={
                                    UserProfileInformationm.country

                                }
                                name="country"


                                onChange={InputHandleValue}


                                placeholder="Country"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                outline={true}
                                value={
                                    UserProfileInformationm.postalCode

                                }
                                name="postalCode"


                                onChange={InputHandleValue}


                                placeholder="Postal Code"
                            />
                        </div>
                    </div>

                    <h6 className="text-purple-800 text-sm my-6  uppercase underline">
                        Education
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-12/12 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                outline={true}
                                value={
                                    UserProfileInformationm.college

                                }

                                name="college"


                                onChange={InputHandleValue}


                                placeholder="College/University"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                outline={true}
                                value={
                                    UserProfileInformationm.stream

                                }
                                name="stream"



                                onChange={InputHandleValue}


                                placeholder="Stream"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                outline={true}
                                value={
                                    UserProfileInformationm.degree

                                }

                                name="degree"


                                onChange={InputHandleValue}


                                placeholder="Degree"
                            />
                        </div>

                    </div>


                    <h6 className="text-purple-800 text-sm my-6  uppercase underline">
                        Position
                    </h6>

                    <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
                        <Input
                            type="text"
                            color="purple"
                            outline={true}
                            value={
                                UserProfileInformationm.position

                            }

                            name="position"


                            onChange={InputHandleValue}


                            placeholder="Eg. Solution Manager/Student"
                        />
                    </div>



                    <h6 className="text-purple-800 text-sm my-6  uppercase underline">
                        About Me
                    </h6>
                    <div className="flex flex-wrap mt-10 font-light">
                        <Textarea color="purple" placeholder="About Me"
                            onChange={InputHandleValue}
                            value={
                                UserProfileInformationm.aboutMe

                            }
                            name="aboutMe"



                            outline={true} />
                    </div>



                    <div className='container mt-[2rem]'>

                        <Button
                            color="lightBlue"
                            buttonType="filled"
                            size="lg"
                            rounded={false}
                            block={true}
                            iconOnly={false}
                            ripple="light"
                            onClick={SubmitInfo}
                        >
                            {
                                loader ?
                                    <Icon name={<ProfileCreateLoader />} size="regular" /> :
                                    "Create Profile"
                            }
                        </Button>

                    </div>


                </form>
            </CardBody>
            <ToastContainer />
        </Card>
    );
}



function error(props) {
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



async function success(props) {
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