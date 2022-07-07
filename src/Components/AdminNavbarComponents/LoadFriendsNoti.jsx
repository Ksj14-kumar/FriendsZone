import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import React from 'react'
import { NavLink } from 'react-router-dom';
import Photos from "../../assets/img/download.png"


function LoadFriendsNoti({ item, AcceptFriendRequest, DeleteFriendRequest, theme }) {

    return (
        <>
            <section className={`flex flex-col  ${theme ? "hover:bg-[#424242]" : "hover:bg-[#cfcfcf71]"}  rounded-md py-[.5rem] transition-all duration-100 `}>
                <>
                    <div className="image_group flex justify-around">
                        <div className="center flex justify-center items-center mr-[10px] ml-[6px] truncate py-2">
                            <NavLink to={`/profile/${item._id}`}>
                                <p className={`md:text-[1.2rem] font-bold tracking-wider cursor-pointer truncate ${theme ? "text-[#fff]" : "text-[#0a0a0a]"}`}>{item.name}</p>
                            </NavLink>
                            <p className={`md:text-[1rem] font-light ml-[.3rem] flex truncate tracking-wider font-serif ${theme ? "text-[#fff]" : "text-[#020202]"}`}>want to connect with you</p>
                        </div>
                        <NavLink to={`/profile/${item._id}`}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div className="left md:w-[2.7rem] w-[2rem] md:h-[2.7rem] h-[2rem] cursor-pointer flex-shrink-0 mr-[8px]">
                                {
                                    item.url ? <Image src={item.url}
                                        rounded={true}
                                        className={`flex-shrink-0  md:w-[2.7rem] w-[2.7rem] md:h-[2.7rem] h-[2.7rem] ${theme ? "outline outline-2 outline-solid outline-offset-1 outline-[#e6e6e6]" : ""}`}
                                    /> :
                                        <Image src={Photos}
                                            rounded={true}
                                            className={`flex-shrink-0  md:w-[2.7rem] w-[2rem] md:h-[2.7rem] h-[2rem] ${theme ? "outline outline-2 outline-solid outline-offset-1 outline-[#e6e6e6]" : ""}`}
                                        />
                                }
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



export default LoadFriendsNoti = React.memo(LoadFriendsNoti)
