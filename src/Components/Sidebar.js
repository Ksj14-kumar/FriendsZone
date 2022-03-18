import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';
import { RiLogoutBoxLine } from 'react-icons/ri'
import { useContext } from 'react';

import { Context } from '../App';

export default function Sidebar(props) {
    const [showSidebar, setShowSidebar] = useState('-left-64');

    console.log("sidebar props", props)

    const { users, dispatch } = useContext(Context)


    function logout() {
        localStorage.removeItem("token")
        
        window.open("http://localhost:5000/logout", "_self")
        dispatch({ type: 'USER', payload: null })
    }
    return (
        <>

            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                name={props.name}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300 mr-36`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative ">
                    <NavLink

                        to="/"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block active"
                    >
                        <H6 color="gray">{props.name}</H6>
                    </NavLink>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4 hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            
                            hover:ease-in-out">
                                <NavLink
                                    to="/"
                                    exact
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg hover:text-white"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md "
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Account
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
                                    to="/settings"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg hover:text-white"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="settings" size="2xl" />
                                    Settings
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            
                            hover:ease-in-out ">
                                <NavLink
                                    to="/tables"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg hover:text-white"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md "
                                >
                                    <Icon name="toc" size="2xl" />
                                    Tables
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700 hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            
                            hover:ease-in-out">
                                <NavLink
                                    to="/maps"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg hover:text-white"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md "
                                >
                                    <Icon name="map" size="2xl" />
                                    Maps
                                </NavLink>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-gray-700 hover:bg-[#2a97bb] transition duration-2000
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
                            <li className="px-4 rounded-lg mb-2 text-gray-700 hover:bg-[#2a97bb] transition duration-2000
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
                            <li className="px-4 rounded-lg mb-2 text-gray-700 hover:bg-[#2a97bb] transition duration-2000
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



                            <li className="px-4 rounded-lg mb-2 text-gray-700 hover:bg-[#2a97bb] transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            hover:text-white
                            hover:ease-in-out" onClick={logout} >
                                <Link
                                    to=""
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3 hover:text-white"
                                >
                                    <Icon name={<RiLogoutBoxLine />} size="2xl" />
                                    Logout
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
