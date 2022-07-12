import Photos from "../../assets/img/download.png"
import Team from "../../assets/img/team-1-800x800.jpg"
import Image from '@material-tailwind/react/Image'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { useDispatch } from "react-redux"
function MessageListNotification({ item, setMessengerComponent, setArrivalMessageNotification, theme }) {
    const dispatch = useDispatch()
    return (
        <>
            {
                item?.type === "friend" ?
                    (
                        <>
                            <div className={`friend_accept_message w-full overflow-hidden   py-2 rounded-md ${theme ? "hover:bg-[#343434]" : "hover:bg-[#eee]"} mb-1 mt-1 cursor-pointer`}
                                onClick={() => {
                                    setMessengerComponent(false)
                                    dispatch({ type: "SET_UNREAD_MESSAGES", payload: [] })
                                }}
                            >
                                <NavLink to={`/messages?q=${item._id}`}>
                                    <div className="__wrapper flex">
                                        <section className="_profile flex w-[2.7rem] h-[2.7rem] flex-shrink-0 flex-[2] rounded-full items-center justify-center">
                                            {
                                                item.url ? <Image
                                                    src={item.url}
                                                    rounded={true}
                                                    className={`w-[3rem] h-[3rem] flex-shrink-0 rounded-full ${theme ? " outline-solid outline-[#cacaca] outline-2 outline outline-offset-1":""}`}
                                                /> :
                                                    <Image
                                                        src={Photos}
                                                        rounded={true}
                                                        className={`w-[3rem] h-[3rem] flex-shrink-0 rounded-full ${theme ? " outline-solid outline-[#cacaca] outline-2 outline outline-offset-1":""} `}
                                                    />
                                            }
                                        </section>
                                        <section className="message_after_request flex flex-[10] items-center ml-1 flex-wrap overflow-hidden">
                                            <p className={`text-[1.4rem] font-serif font-medium tracking-wider truncate ${theme ? "text-[#fff]" : "text-[#0c0c0c]"}`}>{item.name}</p>
                                            <p className={`text-[1.2rem] font-serif tracking-wider ${theme ? "text-[#fff]" : "text-[#000]"}`}>
                                                and you, both are friends.</p>
                                        </section>
                                    </div>
                                </NavLink>
                            </div>
                            <hr className='bg-[#e3e1e1]' />
                        </>
                    ) :
                    (
                        <>
                            <div className="wrapper_con89 friend_accept_message w-full overflow-hidden   py-1 rounded-md hover:bg-[#eee] mb-1 mt-1 cursor-pointer"
                                onClick={() => {
                                    setMessengerComponent(false)
                                    setArrivalMessageNotification([])
                                    dispatch({ type: "SET_UNREAD_MESSAGES", payload: [] })
                                }}
                            >
                                <NavLink to={`/messages?q=${item.anotherUserId}`}>
                                    <div className="chat_messages_container12 flex">
                                        <section className="profile_image flex-shrink-0 flex items-center justify-center w-[3rem] h-[3rem] flex-[2] ">
                                            {item.url ? <Image
                                                src={item.url}
                                                rounded={true}
                                                className="w-[3rem] h-[3rem] flex-shrink-0 rounded-full"
                                            /> :
                                                <Image
                                                    src={Team}
                                                    rounded={true}
                                                    className="w-[3rem] h-[3rem] flex-shrink-0 rounded-full"
                                                />}
                                        </section>
                                        <section className="text_message894 flex flex-[10] flex-col w-full  pl-2">
                                            <p className='text-[1.4rem] font-medium tracking-wider font-serif  w-full truncate'>{item.name}</p>
                                            <div className="wrapper589 flex  w-full py-1 items-center justify-between">
                                                <p className='text-[1.1rem]  tracking-wider font-sans'>
                                                    send a new message
                                                </p>
                                                <section className="notification_number rounded-full w-[2.1rem] h-[2.1rem] bg-[#f00e0e] flex-shrink-0 mr-1 flex items-center justify-center">
                                                    <span className='font-mono text-[1.2rem] text-[#fff]'>{item.messageLength}
                                                    </span>                                            </section>
                                            </div>
                                        </section>
                                    </div>
                                </NavLink>
                            </div>
                            <hr className='bg-[#d2d2d2]' />
                        </>
                    )
            }
        </>
    )
}


export default MessageListNotification = React.memo(MessageListNotification)