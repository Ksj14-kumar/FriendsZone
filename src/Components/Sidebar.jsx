import { useState } from 'react';
import { NavLink, useHistory, Redirect, useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { CgProfile } from 'react-icons/cg'
import { MdDeleteForever } from 'react-icons/md'
import { IoMdSettings } from 'react-icons/io'
import { BsViewList } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
export default function Sidebar(props) {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const [routerId, setRouterId] = useState(null)
    const history = useHistory()
    const location = useLocation()
    const { UserInformationLoad, Name } = useSelector((state) => {
        return {
            UserInformationLoad: state.UserInformationLoad.value,
            Name: state.Name
        }
    })
    const { googleId } = UserInformationLoad !== null || UserInformationLoad !== undefined ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "", googleId: "" }
    const _id = localStorage.getItem("uuid")
    const Name1 = JSON.parse(localStorage.getItem("user"))
    async function deleteAccount(e) {
        e.preventDefault()
        const _shouldWantTodelete = window.confirm("Are you sure you want to delete?")
        if (_shouldWantTodelete) {
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/delete/account/${_id}`, {
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
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl ${props.theme ? "bg-[#040404] border-r border-r-solid border-r-[#232323]" : "bg-[#fff]"} w-64 z-[4] py-4 px-2 transition-all duration-300 mr-36  mt-[3.7rem] text-black`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative text-black " >
                    <NavLink
                        to=""
                        rel="noreferrer"
                        className={`text-center w-full inline-block active text-black ${props.theme ? "bg-[#262626] hover:bg-[#565656] py-3 rounded-md mt-0" : "mt-2"} `}
                    >
                        <p
                            className={`${props.theme ? "text-[#ffffff]  " : "text-black"} text-xl font-serif font-bold leading-normal mt-0 mb-2`}
                        >
                            {Name ? Name : Name1}
                        </p>
                    </NavLink>
                    <div className="flex flex-col  w-full">
                        <hr className="my-4 min-w-full " />
                        {
                            [
                                {
                                    id: 1,
                                    name: "Profile",
                                    icon: <CgProfile className='text-[2rem] mds-editor28:text-[1.5rem' />
                                },
                                {
                                    id: 2,
                                    name: `${UserInformationLoad ? "Update Profile" : "Create Profile"}`,
                                    icon: <IoMdSettings className='text-[2rem] mds-editor28:text-[1.5rem' />
                                },
                                // {
                                //     id: 3,
                                //     name: `Posts`,
                                //     icon: <BsViewList className='text-[2rem] mds-editor28:text-[1.5rem' />
                                // },
                                {
                                    id: 4,
                                    name: `Delete Account`,
                                    icon: <MdDeleteForever className='text-[2rem] mds-editor28:text-[1.5rem' />
                                },
                            ].map((item, index) => {
                                return (
                                    <>
                                        <NavLink to={`${item.id === 1 ? (UserInformationLoad?.googleId ? (`${`/profile/${UserInformationLoad?.googleId}`}`) : ("/unknownuser/")) : (item.id === 2 ? ("/update_profile") : (item.id === 3 && ("/user/posts")))}`}
                                            exact
                                            key={index}
                                        >
                                            <div className={`list_wraper bg-red-500 rounded-md mb-2 ${routerId === item.id && "bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500"} cursor-pointer ${item.id === 4 ? "bg-[#920303] hover:bg-[#da0404]" : `${props.theme?"bg-[#414141] hover:bg-[#7e7e7e]":"bg-[#e7e7e7] hover:bg-[#c7c7c7]"}`}} transition-all delay-100 `} key={index}
                                                onClick={() => {
                                                    setRouterId(item.id)
                                                    if (item.id === 4) {
                                                        deleteAccount()
                                                    }
                                                }}
                                            >
                                                <section className="lists flex items-center justify-center  py-2 rounded-md">
                                                    <p className={`flex flex-[2] justify-center ${item.id === 4 ? "text-[#fff]" : `${props.theme?"text-[#ededed]":""}`}`}>{item.icon}</p>
                                                    <p className={`text-[1.4rem] truncate  font-serif tracking-wider  mds-editor28:text-[1rem] flex-[6] ${item.id === 4 ? "text-[#fff] " : `${props.theme?"text-[#ededed]":""}`}`}>{item.name}</p>
                                                </section>
                                            </div>
                                        </NavLink>
                                    </>
                                )
                            })
                        }
                        {/* <ul className="flex-col min-w-full flex list-none text-white">
                            <li className={`rounded-lg mb-4 ${props.theme ? "bg-[#262626] hover:bg-[#565656]" : " hover:bg-[#2a97bb]"} transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            hover:ease-in-out`}>
                                {
                                    googleId ?
                                        <NavLink
                                            to={`/profile/${googleId}`}
                                            exact
                                            className={`flex items-center gap-4 text-sm ${props.theme ? "text-[#fff]" : "text-black"} font-medium px-4 py-3 rounded-lg hover:text-white`}
                                            activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md "
                                        >
                                            <Icon name={<CgProfile />} size="2xl" />
                                            Profile
                                        </NavLink> :
                                        <NavLink
                                            to={`/unknownuser/`}
                                            exact
                                            className={`flex items-center gap-4 text-sm ${props.theme ? "text-[#fff]" : "text-black"} font-medium px-4 py-3 rounded-lg hover:text-white`}
                                            activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md "
                                        >
                                            <Icon name={<CgProfile />} size="2xl" />
                                            Profile
                                        </NavLink>
                                }
                            </li>
                            <li className={`rounded-lg mb-2 ${props.theme ? "hover:bg-[#565656] bg-[#262626] " : "hover:bg-[#2a97bb] "} transition duration-2000
                            hover:shadow-lg
                            hover:transparent
                            hover:transition-all
                            hover:duration-2000
                            hover:text-white
                            hover:ease-in-out`}
                            >
                                <NavLink
                                    to="/update_profile"
                                    className={`flex items-center gap-4 text-[1.2rem] font-serif ${props.theme ? "text-[#fff]" : "text-black"} font-medium px-4 py-3 rounded-lg hover:text-white`}
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
                                <NavLink
                                    to="/user/links"
                                    className="flex items-center gap-4 text-sm text-black font-medium px-4 py-3 rounded-lg hover:text-white"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md "
                                >
                                    <Icon name={<IoMdPhotos />} size="2xl" />
                                    Simple Links
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
                        </ul> */}
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
