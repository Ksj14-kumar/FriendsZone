import { useState } from 'react';
import { NavLink, Link, useHistory, Redirect } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Icon from '@material-tailwind/react/Icon';


import { CgProfile } from 'react-icons/cg'
import { MdDeleteForever } from 'react-icons/md'
import { IoMdPhotos, IoMdSettings } from 'react-icons/io'
import { BsViewList } from 'react-icons/bs'


import { useDispatch, useSelector } from 'react-redux';

export default function Sidebar(props) {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const history = useHistory()

    const dispatch = useDispatch()
    const Name = useSelector((state) => {
        return state.Name
    })


    const UserInformationLoad = useSelector((state) => {

        return state.UserInformationLoad.value
    })


    const _id = localStorage.getItem("uuid")
    const Name1 = JSON.parse(localStorage.getItem("user"))





    // const { _id,name} = user ? user : { _id: "",name:"" } 



    async function deleteAccount(e) {
        // localStorage.removeItem("uuid")
        // localStorage.clear()
        e.preventDefault()

        // window.open("http://localhost:5000/logout", "_self")
        const _shouldWantTodelete = window.confirm("Are you sure you want to delete?")
        if (_shouldWantTodelete) {

            // ${process.env.REACT_APP_API_BACKENDURL}
            const res = await fetch(`/delete/account/${_id}`, {

                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`

                }
            })
            const responseFromServer = await res.json()

            const { message } = responseFromServer

            if (res.status === 200) {
                localStorage.clear()
                Redirect("/")
                window.open(process.env.REACT_APP_API_FRONTEND, "_self")
                history.push("/")


            }
            else {


            }
        }
        else {
        }
    }
    return (
        <>

            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                name={Name ? Name : Name1}
                socket={props.socket}
            />
            <div
                // w-64 sidebar width
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-[#fff] w-64 z-10 py-4 px-6 transition-all duration-300 mr-36  mt-[3.7rem] text-black`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative text-black" >
                    <NavLink

                        to=""
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block active text-black"
                    >

                        {/* props.name */}
                        {/* <H6 className="text-white"></H6> */}
                        <p
                            className='text-black text-xl font-serif font-bold leading-normal mt-0 mb-2'
                        >
                            {Name ? Name : Name1}

                        </p>
                    </NavLink>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none text-white">
                            <li className="rounded-lg mb-4 hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            
                            hover:ease-in-out">
                                <NavLink
                                    to="/profile"
                                    exact
                                    className="flex items-center gap-4 text-sm text-black font-medium px-4 py-3 rounded-lg hover:text-white"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md "
                                >
                                    <Icon name={<CgProfile />} size="2xl" />
                                    Profile
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            hover:text-white
                            hover:ease-in-out 
                            "
                            >
                                <NavLink
                                    to="/update_profile"
                                    className="flex items-center gap-4 text-sm text-black font-medium px-4 py-3 rounded-lg hover:text-white"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name={<IoMdSettings />} size="2xl" />
                                    {UserInformationLoad ? "Update Profile" : "Create Profile"}

                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            
                            hover:ease-in-out ">
                                <NavLink
                                    to="/user/posts"
                                    className="flex items-center gap-4 text-sm text-black font-medium px-4 py-3 rounded-lg hover:text-white"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md "
                                >
                                    <Icon name={<BsViewList />} size="2xl" />
                                    Posts
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-white hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            
                            
                            hover:ease-in-out">
                                <NavLink
                                    to="/user/photos"
                                    className="flex items-center gap-4 text-sm text-black font-medium px-4 py-3 rounded-lg hover:text-white"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md "
                                >
                                    <Icon name={<IoMdPhotos />} size="2xl" />
                                    Photos
                                </NavLink>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-black hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            hover:text-white
                            hover:ease-in-out ">
                                <a
                                    href="https://demos.creative-tim.com/material-tailwind-kit-react/#/login"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3 hover:text-white"
                                >
                                    <Icon name="fingerprint" size="2xl" />
                                    Login
                                </a>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-black hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            hover:text-white
                            hover:ease-in-out ">
                                <a
                                    href="https://demos.creative-tim.com/material-tailwind-kit-react/#/register"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3 hover:text-white"
                                >
                                    <Icon name="list_alt" size="2xl" />
                                    Register
                                </a>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-black selection:hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            hover:text-white
                            hover:ease-in-out">
                                <a
                                    href="https://demos.creative-tim.com/material-tailwind-kit-react/#/landing"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3 hover:text-white"
                                >
                                    <Icon name="web" size="2xl" />
                                    Landing Page
                                </a>
                            </li>



                            <li className="px-4 rounded-lg mb-2 text-red-800 font-bold hover:bg-red-700 transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            hover:text-white
                            hover:ease-in-out"
                                onClick={deleteAccount}
                            >
                                <Link
                                    to=""
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-medium py-3 hover:text-white"
                                >
                                    <Icon name={<MdDeleteForever />} size="2xl" />
                                    Delete Account
                                </Link>
                            </li>



                        </ul>

                        <ul className="flex-col min-w-full flex list-none absolute bottom-0">
                            {/* <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white mb-2">
                                <a
                                    href="https://material-tailwind.com/documentation/quick-start"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    <Icon name="description" size="2xl" />
                                    Documentation
                                </a>
                            </li> */}
                            {/* <li className="bg-gradient-to-tr from-purple-500 to-purple-700 px-4 rounded-lg text-white">
                                <a
                                    href="https://www.creative-tim.com/product/material-tailwind-dashboard-react"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-4 text-sm font-light py-3"
                                >
                                    Free Download
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
