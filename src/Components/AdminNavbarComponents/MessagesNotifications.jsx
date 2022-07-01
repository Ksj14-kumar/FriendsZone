import React from 'react'
import { motion } from "framer-motion"
import Photos from "../../assets/img/download.png"
import Team from "../../assets/img/team-1-800x800.jpg"
import Image from '@material-tailwind/react/Image'
import { NavLink } from 'react-router-dom'
function MessagesNotifications({ messageList, setMessengerComponent }) {
    return (
        <motion.div className={`group_friends_modal_Notification fixed bg-[#ffffff] w-[27rem] mds-editor36:w-full mds-editor36:right-0  top-[4rem] right-[1rem] rounded-md drop-shadow-xl p-4 px-2 pt-2 max-h-[32rem]  overflow-x-hidden overflow-y-auto md:z-[22]`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            id="MessagesNotication"
        >
            <header className='py-2  w-full rounded-md px-1 text-[1.2rem] font-serif tracking-wider truncate select-none flex text-center'>Messages</header>
            <hr className='mb-1 bg-[#ececec]' />
            <main className="body p-0">
                {
                    // messageList !== undefined && messageList.length > 0 &&
                    messageList !== undefined && messageList.length > 0 && messageList.map((item, index) => {
                        return (
                            <>
                                <div className="con"
                                    onClick={() => {
                                        setMessengerComponent(false)
                                    }}
                                >
                                    <MessageListNotification item={item} key={index} setMessengerComponent={setMessengerComponent} />
                                </div>
                            </>
                        )
                    })
                }

            </main>
        </motion.div>
    )
}

export default MessagesNotifications


function MessageListNotification({ item, setMessengerComponent }) {
    console.log({ item })
    return (
        <>
            {/* here two condition 
            1) type friend,
            2) chat messages  */}
            {
                item.type === "friend" ?
                    (
                        <>
                            <div className="friend_accept_message w-full overflow-hidden   py-2 rounded-md hover:bg-[#eee] mb-1 mt-1 cursor-pointer"
                                onClick={() => {
                                    setMessengerComponent(false)
                                }}
                            >
                                <NavLink to={`/messages?q=${item._id}`}>

                                    <div className="__wrapper flex">
                                        <section className="_profile flex w-[2.7rem] h-[2.7rem] flex-shrink-0 flex-[2] rounded-full items-center justify-center">
                                            {
                                                item.url ? <Image
                                                    src={item.url}
                                                    rounded={true}
                                                    className="w-[3rem] h-[3rem] flex-shrink-0 rounded-full"
                                                /> :
                                                    <Image
                                                        src={Photos}
                                                        rounded={true}
                                                        className="w-[3rem] h-[3rem] flex-shrink-0 rounded-full"
                                                    />
                                            }
                                        </section>
                                        <section className="message_after_request flex flex-[10] items-center ml-1 flex-wrap overflow-hidden">
                                            <p className='text-[1.4rem] font-serif font-medium tracking-wider truncate'>{item.name}</p>
                                            <p className='text-[1.2rem] font-serif tracking-wider'>
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