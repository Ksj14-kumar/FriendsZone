import React from 'react'
import { motion } from "framer-motion"
import { useEffect } from "react"
import Axios from "axios"

import MessageListNotification from "./MessageListNotification"
function MessagesNotifications({ messageList, setMessengerComponent, __id__, setUserMessageAfterAcceptRequest,setArrivalMessageNotification,theme }) {




    useEffect(() => {
        async function setUpdateStatus() {
            try {
                const result = await Axios({
                    url: `${process.env.REACT_APP_API_BACKENDURL}/api/v1/users/update_status/messageNoti/${__id__}`,
                    methods: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                    }
                })
                setUserMessageAfterAcceptRequest(result.data.data)
                console.log({ result })

            }
            catch (err) {

            }
        }
        setUpdateStatus()

    }, [])
    return (
        <motion.div className={`group_friends_modal_Notification fixed ${theme?"bg-[#000] border border-solid border-[#5a5a5a]":"bg-[#ffffff]"} w-[27rem] mds-editor36:w-full mds-editor36:right-0  top-[4rem] right-[1rem] rounded-md drop-shadow-xl p-4 px-2 pt-2 max-h-[32rem]  overflow-x-hidden overflow-y-auto md:z-[22]`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            id="MessagesNotication"
        >
            <header className={`py-2  w-full rounded-md px-1 text-[1.2rem] font-serif tracking-wider truncate select-none flex text-center ${theme?"text-[#fff] ":"text-[#000000]"}`}>Messages</header>
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
                                    <MessageListNotification item={item} key={index} setMessengerComponent={setMessengerComponent} setArrivalMessageNotification={setArrivalMessageNotification} 
                                    
                                    theme={theme}
                                    />
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
