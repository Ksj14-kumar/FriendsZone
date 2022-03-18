import React, { createContext, useEffect } from 'react'

import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Register from './Components/Register'

import Login from './Components/Login';
import Email from './Components/Email';
import Header from './Components/Header'
// import HomePage from './components/HomePage.jsx';
import Header1 from './Header1'
// import Header1 from './components/Header1';
import "@material-tailwind/react/tailwind.css";
import Dashboard from './Components/Dashboard';
import HomePage from './Components/HomePage';
// import Header1 from './Header1';
import { Init, Reducer } from './Reducer/Reducer';
import { Toastify } from './Components/Toastify';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
export const Context = createContext()


function App() {
    const [user, setUser] = React.useState(null)
    const history = useHistory()
    const [users, dispatch] = React.useReducer(Reducer, Init)
    const [cookie, setCookie] = useCookies(['info'])

    console.log("dispatch data", users)
    console.log("setUser data", user)

    // localStorage.setItem("userInfo",users)
    localStorage.setItem("userInfo", JSON.stringify(user))

    console.log("localstoragfe data")
    // console.log(localStorage.getItem("userInfo"))


    React.useEffect(() => {

        async function loadData() {

            const response = await fetch("/google/success", {
                method: "GET",
                // credentials: "include",
                credentials: 'same-origin',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true

                }
            })

            console.log("response data0", response)
            const status = response.status
            console.log("cookie", cookie.info)
            const data = await response.json()
            console.log("user data from server", data.user)
            console.log(data)


            if (status === 200) {
                success({ message: data.message })


                dispatch({ type: "USER", payload: data })
                setUser(data)


                // history.push("/dashboard")

            }
            else {
                error({ message: data.message })
                history.push("/login")

            }

        }

        loadData()



    }, [])


    console.log("user data", user)


    return (

        // w-screen h-screen
        <div className='bg-[#000B49]'>

            {/* <Register /> */}

            {/* <Login /> */}

            {/* <Email /> */}

            {/* <Header /> */}


            {/* <Header1 /> */}





            <Context.Provider value={{ users, dispatch }}>



                <Switch Switch >

                    <Route exact path="/" >
                        {
                            users && localStorage.getItem("userInfo") ? <Redirect to="/dashboard" /> : <Header />

                        }
                        {/* <Header /> */}

                    </Route>
                    <Route exact path="/register">
                        {
                            users && localStorage.getItem("userInfo") ? <Redirect to="/dashboard" /> : <Register />

                        }

                        {/* <Register /> */}
                    </Route>
                    <Route exact path="/login">

                        {users && localStorage.getItem("userInfo") ? <Redirect to="/dashboard" /> : <Login />}

                        {/* <Login /> */}

                    </Route>
                    <Route exact path="/forget" component={Email} />
                    <Route exact path="/dashboard">
                        {
                            users && localStorage.getItem("userInfo") ? <Dashboard users={users} /> : <Redirect to="/login" />
                        }


                        {/* <Dashboard /> */}


                    </Route>


                </Switch>
            </Context.Provider>









        </div>
    )
}

export default App




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