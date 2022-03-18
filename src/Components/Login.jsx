import React, { useContext } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import Icon from "@material-tailwind/react/Icon";

import { AiFillTwitterCircle } from 'react-icons/ai';
import { GoMarkGithub } from 'react-icons/go';
import { ImGooglePlus3 } from 'react-icons/im';
import { FaFacebook } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useHistory, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';

// import Header from './'
import { Context } from '../App';



export default function Login(props) {
  const [cookies, setCookie] = useCookies(['tokenId']);
  let [user, setUser] = React.useState(null)
  const { users, dispatch } = useContext(Context)

  // console.log("cookie", cookies)





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
    window.open("http://localhost:5000/google", "_self")
  }

  function twitter() {
    window.open("http://localhost:5000/twitter", "_self")
  }


  function github() {
    window.open("http://localhost:5000/github", "_self")
  }


  function facebook() {
    window.open("http://localhost:5000/facebook", "_self")


  }




  async function submit() {
    const { email, password } = data
    if (!email || !password) {
      error({ message: "Please fill all the fields" })

    }
    else {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        redirect: "follow"
      })


      const status = response.status

      const serverData = await response.json()
      console.log("servcer data", serverData)

      if (status === 200) {

        await success({ message: serverData.message })
        console.log(serverData)
        localStorage.setItem("token", serverData.cookie.tokenId)

        setTimeout(() => {
          dispatch({ type: 'USER', payload: {message:serverData.message, user:serverData.user} })
        }, 2000)





      }

      else {
        error({ message: serverData.message })
        return
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

            <div className="mb-8 px-4">
              <InputIcon
                type="email"
                color="lightBlue"
                placeholder="Email "
                iconName="email"
                name="email"
                value={data.email}
                onChange={handle}
                defaultValue=""

              />
            </div>

            <div className="mb-4 px-4">
              <InputIcon
                type="password"
                color="lightBlue"
                name="password"
                placeholder="Password"
                iconName="lock"
                value={data.password}
                onChange={handle}
                defaultValue=""
              />
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

                onClick={submit}
              >
                Get started
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
                <ImGooglePlus3 className="text-4xl text-white  " />
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
                <FaFacebook className="text-4xl text-white " />
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
                <AiFillTwitterCircle className="text-5xl text-white " />
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
                <GoMarkGithub className="text-4xl text-dark " />
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
                <FiHome className="text-3xl text-white " />
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
  console.log("success", props)
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


