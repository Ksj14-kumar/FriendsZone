import React, { useState, useEffect } from 'react'
import Button from '@material-tailwind/react/Button'
import Image from '@material-tailwind/react/Image'
import img1 from '../../assets/img/download.png';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
function FriendsCard({ info, sendFriendRequest, loader,theme }) {
    const [connectMessage, setConnectMessage] = useState(false)
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    useEffect(() => {
        const bool = info.receiverrequest.some((item) => item._id === UserInformationLoad?.googleId)
        setConnectMessage(bool)
    }, [info])
    return (
        <>
            <div className={`conta   ${theme?"bg-[#1a1a1a]":"bg-[#fffcfc]"} flex justify-around align-baseline content-center w-[30rem] mds-editor21:w-full py-4 rounded-lg mb-[2rem] ${theme?"border border-solid border-[#3a3a3a]":"border border-solid border-[#b0b0b0]"}`}>
                <section className={`left_side w-[5rem] h-[5rem] mds-editor7:w-[3rem] mds-editor7:h-[3rem] flex-shrink-0 flex drop-shadow-lg cursor-pointer `}>
                    <NavLink to={`/profile/${info?.googleId}`}>
                        {info.url?<Image
                            src={info.url}
                            rounded={true}
                            raised={false}
                            alt=""
                            className="flex-shrink-0 flex"
                        />:<Image
                            src={img1}
                            rounded={true}
                            raised={false}
                            alt=""
                            className="flex-shrink-0 flex"
                        />}
                        {/* img1 */}
                    </NavLink>
                </section>
                <section className="center  flex align-middle content-center truncate">
                    <p className={`text-[1.8rem] mds-editor7:text-[1.4rem] mt-5 mds-editor7:mt-1 ${theme?"text-[#fff]":"text-[#010101]"}`}>{info.fname + " " + info.lname}</p>
                </section>
                <section className="right_side ">
                    <Button
                        color="purple"
                        buttonType="filled"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                        className={`capitalize mt-[1.5rem] text-[1rem] tracking-wider mds-editor7:text-[.8rem] mds-editor7:mt-[.5rem] ${theme?"text-[#f7f7f7]":"text-[#000]"}`}
                        onClick={() => {
                            sendFriendRequest(info.fname, info.lname, info.googleId, info.url, connectMessage)
                            setConnectMessage(!connectMessage)
                        }}
                    >
                        {
                            connectMessage ? "request sent" : "Connect"
                        }
                    </Button>
                </section>
            </div>
        </>
    )
}

export default FriendsCard