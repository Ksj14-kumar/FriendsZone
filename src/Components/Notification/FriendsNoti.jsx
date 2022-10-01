import Button from '@material-tailwind/react/Button'
import Image from '@material-tailwind/react/Image'
import React from 'react'
import { NavLink } from 'react-router-dom'
function FriendsNoti({ SenderRequestId, name, AcceptFriendRequest, DeleteFriendRequest, url, messageAftetAcceptRequest, acceptRequest, setAcceptRequest }) {
    return (
        <section className={`flex flex-col hover:bg-[#cfcfcf71]  rounded-md py-[.5rem] transition-all duration-100 `}>
            {
                <>
                    <div className="image_group flex justify-around">
                        <div className="center flex justify-center items-center mr-[10px] ml-[6px] truncate">
                            <NavLink to={`/profile/${SenderRequestId}`}>
                                <p className='md:text-[1.2rem] font-bold tracking-wider cursor-pointer truncate'>{name}</p>
                            </NavLink>
                            <p className='md:text-[1rem] font-light ml-[.3rem] flex truncate tracking-wider font-serif'>want to connect with you</p>
                        </div>
                        <NavLink to={`/profile/${SenderRequestId}`}>
                            <div className="left md:w-[2.7rem] w-[2rem] md:h-[2.7rem] h-[2rem] cursor-pointer flex-shrink-0 mr-[8px] ">
                                <Image src={url}
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
                                AcceptFriendRequest(SenderRequestId, name, url)
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
                                DeleteFriendRequest(SenderRequestId)
                            }}
                        >
                            Cancle
                        </Button>
                    </div>
                </>
            }
        </section>
    )
}
export default FriendsNoti