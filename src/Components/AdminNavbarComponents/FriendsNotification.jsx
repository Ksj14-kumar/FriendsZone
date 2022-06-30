import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion"
function FriendsNotification({ receivedRequest, AcceptFriendRequest, DeleteFriendRequest, messageAftetAcceptRequest }) {


    return (
        <motion.div className={`group_friends_modal_Notification fixed bg-[#ffffff] w-[27rem] mds-editor36:w-[19rem]  top-[4rem] right-[1rem] rounded-md drop-shadow-xl p-4 px-2 pt-2 ${receivedRequest.length > 5 ? "max-h-[27rem]" : "rounded-md"} overflow-x-hidden overflow-y-auto`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            id="friendsNoti"
        >
            <header className='py-2  w-full rounded-md px-1 text-[1.2rem] font-serif tracking-wider truncate select-none'>Friend Notifications</header>
            <hr className='mb-1 bg-[#ececec]' />
            <main className="body">
                {
                    receivedRequest !== undefined ? receivedRequest.map((item) => {
                        return (
                            <>
                                <LoadFriendsNoti item={item} AcceptFriendRequest={AcceptFriendRequest} DeleteFriendRequest={DeleteFriendRequest} />
                            </>
                        )
                    }) :
                        <>
                            <p className='text-center text-[1.3rem] tracking-wider font-serif'>No, notifications</p>

                        </>
                }

                {
                    messageAftetAcceptRequest.length > 0 && <p className='flex cursor-pointer hover:bg-[#dadada] rounded-md py-1 w-full'>
                        <NavLink to={`/profile/${messageAftetAcceptRequest[0].senderId}`}>

                            <Image src={messageAftetAcceptRequest[0].url}
                                rounded={true}
                                className="md:w-[2.9rem] w-[2rem] md:h-[2.9rem] h-[2rem]"
                            />
                            <p className='ml-1 truncate md:text-[1.4rem] items-center'>
                                <span className='text-[1.1rem] md:text-[1.4rem] font-semibold'>{messageAftetAcceptRequest[0].name}</span> and you, connected
                            </p>
                        </NavLink>
                    </p>
                }

            </main>
            {/* <footer className="foo">
                This is footer

            </footer> */}
        </motion.div>
    )
}

export default FriendsNotification;

function LoadFriendsNoti({ item, AcceptFriendRequest, DeleteFriendRequest }) {
    console.log({ item })
    // console.log({ AcceptFriendRequest })
    return (
        <>
            <section className={`flex flex-col hover:bg-[#cfcfcf71]  rounded-md py-[.5rem] transition-all duration-100 `}>


                <>
                    <div className="image_group flex justify-around">
                        <div className="center flex justify-center items-center mr-[10px] ml-[6px] truncate">
                            <NavLink to={`/profile/${item._id}`}>
                                <p className='md:text-[1.2rem] font-bold tracking-wider cursor-pointer truncate'>{item.name}</p>
                            </NavLink>
                            <p className='md:text-[1rem] font-light ml-[.3rem] flex truncate tracking-wider font-serif'>want to connect with you</p>
                        </div>
                        <NavLink to={`/profile/${item._id}`}>
                            <div className="left md:w-[2.7rem] w-[2rem] md:h-[2.7rem] h-[2rem] cursor-pointer flex-shrink-0 mr-[8px] ">
                                <Image src={item.url}
                                    rounded={true}
                                />
                            </div>
                        </NavLink>
                    </div>
                    <div className="btn-group flex justify-center ">
                        <Button
                            color="deepPurple"
                            buttonType="link"
                            size="sm"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="dark"
                            onClick={(e) => {
                                e.preventDefault()
                                AcceptFriendRequest(item._id, item.name, item.url)
                                // setAcceptRequest(true)
                            }}
                        >
                            Accept
                        </Button>
                        <Button
                            color="red"
                            buttonType="link"
                            size="sm"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="dark"
                            onClick={(e) => {
                                e.preventDefault()
                                DeleteFriendRequest(item._id)
                            }}
                        >
                            Cancle
                        </Button>
                    </div>
                </>


            </section>





        </>
    )
}