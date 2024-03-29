import React, { useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import ClosingAlert from "@material-tailwind/react/ClosingAlert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginLoader from '../Loader/LoginLoader';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom'
export default function Register() {
    const [info, setinfo] = React.useState({ name: "", email: "", password: "", confirmPassword: "" })
    const [loader, setLoader] = useState(false)
    const [togglePassword, setShowPassword] = useState({ password: false, cPassword: false })
    let name, value
    function handleInput(e) {
        name = e.target.name
        value = e.target.value
        setinfo({ ...info, [name]: value })
    }
    async function submit(e) {
        const { name, email, password, confirmPassword } = info
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            error({ message: "Please fill all the fields" })
            return
        }
        else if (password !== confirmPassword) {
            error({ message: "Password and confirm password doesn't match" })
            return
        }
        else if (password.length < 8 || confirmPassword.length < 8) {
            error({ message: "Password must be atleast 8 characters" })
            return
        }
        else {
            function isEmailValid(email) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                return pattern.test(email)
            }
            if (!isEmailValid(email)) {
                error({ message: "Please enter a valid email" })
                return
            }
            else {
                setLoader(true)
                const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/register`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ name, email, password, confirmPassword }),
                })
                const status = response.status
                const data = await response.json()
                if (status == 200) {
                    setLoader(false)
                    success({ message: data.message })
                    setinfo({ name: "", email: "", password: "", confirmPassword: "" })
                    return
                }
                else if (status !== 200) {
                    error({ message: data.message })
                    setLoader(false)
                    return
                }
            }
        }
    }
    return (
        <>
            <div className=" mx-auto relative  h-screen w-full flex flex-wrap md:px-20">
                <div className="inner  mx-auto py-12 w-96">
                    <Card>
                        <CardHeader color="lightBlue" size="lg">
                            <H5 color="white">Create Account</H5>
                        </CardHeader>
                        <CardBody>
                            <div className="mt-4 mb-8 px-4">
                                <InputIcon
                                    type="text"
                                    color="lightBlue"
                                    name="name"
                                    placeholder="First Name"
                                    iconName="account_circle"
                                    value={info.name}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="mb-8 px-4">
                                <InputIcon
                                    type="email"
                                    color="lightBlue"
                                    placeholder="Email "
                                    iconName="email"
                                    name="email"
                                    value={info.email}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="mb-4 px-4 flex items-center relative">
                                <InputIcon
                                    type={togglePassword.password ? "text" : "password"}
                                    color="lightBlue"
                                    placeholder="password"
                                    name="password"
                                    value={info.password}
                                    onChange={handleInput}
                                />
                                <div className="shoe_hide_password flex absolute right-[1rem]"
                                    onClick={() => {
                                        setShowPassword({ password: !togglePassword.password, cPassword: togglePassword.cPassword })
                                    }}
                                >
                                    {togglePassword.password ? <BsEyeFill className="text-[1.6rem] font-serif" /> :
                                        <BsEyeSlashFill className="text-[1.6rem] font-serif" />}
                                </div>
                            </div>
                            <div className="mb-4 px-4 flex items-center relative">
                                <InputIcon
                                    type={togglePassword.cPassword ? "text" : "password"}
                                    color="lightBlue"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={info.confirmPassword}
                                    onChange={handleInput}
                                />
                                <div className="shoe_hide_password flex absolute right-[1rem]"
                                    onClick={() => {
                                        setShowPassword({ password: togglePassword.password, cPassword: !togglePassword.cPassword })
                                    }}
                                >
                                    {togglePassword.cPassword ? <BsEyeFill className="text-[1.6rem] font-serif" /> :
                                        <BsEyeSlashFill className="text-[1.6rem] font-serif" />}
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="flex justify-center">
                                <Button
                                    color="lightBlue"
                                    buttonType="filled"
                                    size="lg"
                                    ripple="dark"
                                    onClick={submit}
                                >
                                    {
                                        loader ?
                                            <LoginLoader />
                                            :
                                            "Register"
                                    }
                                </Button>
                            </div>
                            <div className="footer-section flex justify-between ">
                                <p className="pt-[1px] text-[1.2rem] font-serif tracking-wider ">Already have an Account</p>
                                <NavLink exact to="/login" className="text-lg
                            text-blue-800  font-semibold mb-3 underline decoration-blue-800 decoration-2  "> Click</NavLink>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}
//TOASTFY MESSAGES 
function success(props) {
    const notify = () => toast.success(props.message, {
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
