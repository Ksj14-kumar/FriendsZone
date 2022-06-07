import React, { useEffect, useState } from 'react'
import Image from '@material-tailwind/react/Image'
import Icon from "@material-tailwind/react/Icon";

import img from '../../assets/img/team-2-800x800.jpg'
import { FaUserPlus } from 'react-icons/fa';
import { MdCancel, MdCheck } from 'react-icons/md';
import { BiCheck } from 'react-icons/bi';
import Button from '@material-tailwind/react/Button';
import Photos from "../../assets/img/team-3-800x800.jpg"
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
function FriendInsideSlider({ image, item, FilterUser, sendFriendRequest }) {
    const [friends, setFriends] = useState([])
    const [connectMessage, setConnectMessage] = useState(false)



    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/friends/${item.googleId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`

                    }
                })
                const data = await res.json()
                if (res.status === 200) {
                    const UserHasSameFriends = data?.friendList.filter(value => {
                        return UserInformationLoad?.friends.some(i => {
                            return item._id !== i._id
                        })
                    })
                    setFriends(UserHasSameFriends)
                }
                else if (res.status !== 200) {
                    console.log("error")
                }

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [item])







    useEffect(() => {
        const bool = item?.receiverrequest.some((item) => item._id === UserInformationLoad?.googleId)
        setConnectMessage(bool)


    }, [item])
    return (
        <>
            <div className="friends_suggests  bg-white  flex flex-col w-[15rem] mds-editor13:w-[10rem] rounded-lg p-1  border-[#d0cfcf] border border-solid">

                <header className="image w-full h-full relative cursor-pointer"

                >
                    <NavLink to={`/profile/${item?.googleId}`}>
                        {item?.url ? <Image src={item?.url}
                            className="w-full md:min-h-[15rem] rounded-lg "
                        /> :
                            <Image src={Photos}
                                className="w-full md:min-h-[15rem] rounded-lg"
                            />
                        }
                    </NavLink>
                    <Button
                        color=""
                        buttonType="filled"
                        size="regular"
                        rounded={true}
                        block={false}
                        iconOnly={true}
                        ripple="light"
                        className="absolute -top-1 -right-1 md:top-1 md:right-1"
                        onClick={() => {
                            FilterUser(item?._id)
                        }}
                    >
                        <Icon name={<MdCancel className='text-[1.8rem] md:text-[2.6rem] rounded-full  bg-[#05040400] text-[#fff]' />} size="sm" />
                    </Button>
                </header>

                <div className="already_friends my-3">
                    <p className='text-[1.4rem] font-semibold truncate '>{item?.fname + " " + item?.lname}</p>

                </div>
                <div className={`friends_se  flex -mt-[8px] cursor-pointer py-1 rounded bg-[#c0c0c0] ${friends.length > 3 ? "justify-evenly" : ""}`}>
                    <div className="inner_wr flex -ml-[.8rem]">

                        {
                            friends !== undefined && friends.map((friend, index) => {
                                return (
                                    <>
                                        <div className="inner_friends w-[2rem] h-[2rem] ml-[1rem] -mr-[1.9rem]" key={index}>
                                            <Image src={friend.url}
                                                rounded={true}
                                                className="rounded-full w-full h-full"
                                            />
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    {friends?.length > 3 &&
                        <p className='text-lg font-sans font-semibold tracking-wider truncate  flex-[3] ml-[1.8rem]'>+{friends?.length - 3} more </p>
                    }
                </div>
                <div className="friend_connect flex justify-center bg-white mt-1 mb-1 px-2">


                    <button
                        size="sm"
                        // mds-editor13:py-[.5rem] 
                        ripple="none"
                        className="  w-full bg-[#002637] mds-editor13:py-[.5rem]  hover:bg-[#0d3b50] focus:outline-none rounded-lg flex text-white tracking-wider truncate items-center justify-center gap-x-1 py-[.6rem]"
                        onClick={() => {
                            setConnectMessage(!connectMessage)
                            sendFriendRequest(item.fname, item.lname, item.googleId, item.url, connectMessage)
                            // FilterUser(item._id)
                        }}
                    >


                        {
                            connectMessage ?
                                <>
                                    Request Sent
                                    <BiCheck className="text-[1.6rem] text-[#1cf105] ml-[3px]" />


                                </> :
                                <>
                                    <FaUserPlus className='text-[1.6rem]  text-[#fff] mr-[4px]' />
                                    Connect
                                </>
                        }


                    </button>

                </div>
            </div>



        </>
    )
}

export default FriendInsideSlider