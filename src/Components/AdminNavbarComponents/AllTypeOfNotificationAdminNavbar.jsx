import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import Axios from 'axios'
import AllNoti from './AllNoti'
function AllTypeOfNotificationAdminNavbar({ AllNotification, setAllNotification,theme }) {
    useEffect(() => {
        async function changeReadReadNotification() {
            try {
                const value = await Axios({
                    url: `${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/_user/notifications/all/type`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                    }
                })
                setAllNotification(value.data.value?.sort((a, b) => {
                    return b.time - a.time
                }))
            }
            catch (err) {
            }
        }
        changeReadReadNotification()
    }, [])
    return (
        <motion.div className={`group_friends_modal_Notification drop-shadow-lg fixed ${theme?"bg-[#010101] border border-solid border-[#5e5e5e]":"bg-[#ffffff]"} md:w-[28rem] w-[26rem] mds-editor36:w-full mds-editor36:right-0 top-[4rem] md:top-[4rem] right-[2rem] rounded-md drop-shadow-xl p-4 px-0 pt-2 overflow-x-hidden z-[20] ${AllNotification?.length > 5 ? "max-h-[32rem]" : "rounded-md"} overflow-y-auto overflow-x-hidden`}
            initial={{ opacity: 0, y: -10 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            id="allNotification"
        >
            <header className={`py-2  w-full rounded-md px-1 text-[1.2rem] font-serif tracking-wider truncate mds-editor36:text-center md:pl-2 ${theme?"text-[#fff]":"text-[#000]"}`}>Notifications</header>
            <main className="body mt-2">
                {AllNotification?.map((notification, index) => {
                    return (
                        <>
                            <AllNoti notification={notification} key={index} theme={theme}/>
                        </>
                    )
                })
                }
            </main>
        </motion.div>
    )
}
export default AllTypeOfNotificationAdminNavbar = React.memo(AllTypeOfNotificationAdminNavbar);