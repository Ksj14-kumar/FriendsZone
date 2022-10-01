import React, { useContext, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import Icon from "@material-tailwind/react/Icon";
import { ImGooglePlus3 } from 'react-icons/im';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useHistory } from 'react-router-dom'
import { Context } from '../App';
import LoginLoader from "../Loader/LoginLoader";
import { Error } from "./Toastify";
export default function Login({ socket }) {
  const { users, dispatch } = useContext(Context)
  const [loader, setLoader] = useState(false)
  const [togglePassword, setShowPassword] = useState(false)
  const history = useHistory()
  const [data, setData] = React.useState({
    email: "",
    password: ""
  })
  let name, value;
  function handle(e) {
    name = e.target.name
    value = e.target.value
    setData({ ...data, [name]: value })
  }
  function home() {
    history.push("/")
  }
  async function google() {
    window.open(`${process.env.REACT_APP_API_BACKENDURL}/all/google`, "_self")
  }
  function twitter() {
    window.open(`${process.env.REACT_APP_API_BACKENDURL}/all/twitter`, "_self")
  }
  function github() {
    window.open(`${process.env.REACT_APP_API_BACKENDURL}/all/github`, "_self")
  }
  function facebook() {
    window.open(`${process.env.REACT_APP_API_BACKENDURL}/all/facebook`, "_self")
  }
  async function submit() {
    const { email, password } = data
    if (!email || !password) {
      error({ message: "Please fill all the fields" })
    }
    else {
      setLoader(true)
      // ${process.env.REACT_APP_API_BACKENDURL}
      const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/login`, {
        method: "POST",
        "credentials": "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
        // redirect: "follow"
      })
      const status = response.status
      const serverData = await response.json()
      if (status === 200) {
        setLoader(false)
        localStorage.setItem("uuid", serverData.cookie)
        const { user } = serverData
        success({ message: serverData.message })
        dispatch({ type: "NAME", payload: user })
        localStorage.setItem("user", JSON.stringify(user))
        setTimeout(() => {
          dispatch({ type: "SET_USER", payload: { user: serverData.user } })
        }, 2000)
        socket?.emit("login", serverData.cookie)
      }
      else if (status !== 200) {
        error({ message: serverData.message })
        setLoader(false)
      }
      else if (status === 500) {
        setLoader(false)
        return Error({ message: "please, Check your internet connection!!!" })
      }
      else {
        setLoader(false)
        return Error({ message: "Opps,Something error Occured" + serverData.message })
      }
    }
  }
  return (
    <div className=" mx-auto  h-screen w-full flex flex-wrap">
      <div className="inner   mx-auto py-20 w-96">
        <Card>
          <CardHeader color="green" size="sm">
            <H5 color="white">Login</H5>
          </CardHeader>
          <CardBody>
            <div className="mb-8 px-4  ">
              <InputIcon
                type="email"
                color="lightBlue"
                placeholder="Email "
                iconName="email"
                name="email"
                value={data.email}
                onChange={handle}
                className="border-0 text-[1.5rem] font-serif tracking-wider bg-red-600"
              />
            </div>
            <div className="mb-4 px-4  flex items-center relative">
              <InputIcon
                type={togglePassword ? "text" : "password"}
                color="lightBlue"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handle}
                outline={false}
              />
              <div className="shoe_hide_password flex absolute right-[1rem]"
                onClick={() => {
                  setShowPassword(!togglePassword)
                }}
              >
                {togglePassword ? <BsEyeFill className="text-[1.6rem] font-serif" /> :
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
                block={false}
                ripple="dark"
                className={` `}
                disabled={loader ? true : false}
                onClick={submit}
              >
                {loader ?
                  <LoginLoader />
                  : "Get started"}
              </Button>
            </div>
            <div className="button-group  flex justify-evenly my-2">
              <Button
                color="red"
                buttonType="filled"
                size="regular"
                rounded={true}
                block={false}
                iconOnly={true}
                ripple="light"
                onClick={google}
              >
                <ImGooglePlus3 className="text-4xl text-white rounded-full focus:rounded-full " />
              </Button>
              <Button
                color="indigo"
                buttonType="filled"
                size="regular"
                rounded={true}
                block={false}
                iconOnly={true}
                ripple="light"
                onClick={facebook}
              >
                <FaFacebook className="text-4xl text-white rounded-full focus:rounded-full " />
              </Button>
              {/* <Button
                color="lightBlue"
                buttonType="filled"
                size="regular"
                rounded={true}
                block={false}
                iconOnly={true}
                ripple="light"
                onClick={twitter}
              >
                <AiFillTwitterCircle className="text-5xl text-white rounded-full focus:rounded-full " />
              </Button> */}
              {/* <Button
                color="blueGray"
                buttonType="filled"
                size="regular"
                rounded={true}
                block={false}
                iconOnly={true}
                ripple="light"
                onClick={github}
                className=""
              >
                <GoMarkGithub className="text-4xl text-dark  rounded-full focus:rounded-full" />
              </Button> */}
              <Button
                color="blueGray"
                buttonType="filled"
                size="regular"
                rounded={true}
                block={false}
                iconOnly={true}
                ripple="light"
                onClick={home}
              >
                <FiHome className="text-3xl text-white  rounded-full focus:rounded-full" />
              </Button>
            </div>
            <div className="footer-section  justify-between ">
              <div className="create-account flex  justify-between">
                <p className="m-0 p-0 font-serif text-lg italic mt-[3px]">if you are new </p>
                <NavLink exact to="/register" className="text-lg
              text-blue-800  font-semibold mb-4 underline decoration-blue-800 decoration-2 ">
                  Click here</NavLink>
              </div>
              <div className="fotget-passsword flex  justify-between">
                <p className="m-0 p-0 font-serif text-lg italic mt-[3px]">forget password ?</p>
                <NavLink exact to="/forget" className="text-lg
                            text-blue-800  font-semibold mb-4 underline decoration-blue-800 decoration-2 ">
                  Click here</NavLink>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}
//toastify message
async function success(props) {
  const notify = () => toast.success(props.message, {
    position: "top-center",
    autoClose: 1000,
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
