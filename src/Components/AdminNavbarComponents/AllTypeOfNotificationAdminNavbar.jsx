import { motion } from 'framer-motion'
import React, { useEffect } from 'react'

import Axios from 'axios'
import AllNoti from './AllNoti'
function AllTypeOfNotificationAdminNavbar({ AllNotification, setAllNotification,theme }) {




    useEffect(() => {
        async function changeReadReadNotification() {
            console.log("changeReadReadNotification")
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
        <motion.div className={`group_friends_modal_Notification fixed ${theme?"bg-[#010101]":"bg-[#ffffff]"} md:w-[28rem] w-[26rem] mds-editor36:w-full mds-editor36:right-0 top-[4rem] md:top-[4rem] right-[2rem] rounded-md drop-shadow-xl p-4 px-0 pt-2 overflow-x-hidden z-[20] ${AllNotification?.length > 5 ? "max-h-[32rem]" : "rounded-md"} overflow-y-auto overflow-x-hidden`}
            initial={{ opacity: 0, y: -10 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            id="allNotification"
        >
            <header className={`py-2  w-full rounded-md px-1 text-[1.2rem] font-serif tracking-wider truncate mds-editor36:text-center md:pl-2 ${theme?"text-[#fff]":"text-[#000]"}`}>Notifications</header>
            {/* <hr className={`bg-[#e9e9e9] ${AllNotification?.length ? "hidden" : "flex"}`} /> */}
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














//COMMENT

// UserProfile: "http://res.cloudinary.com/ddnazqja2/image/upload/v1656355088/62b76b70bc29175c979cd22f/profileImage/62b76b70bc29175c979cd22f.jpg"
// commentId: "3i5pq8hlc"
// commentParentId: null
// docIdCommentByUserId: "62b775a33f6edf08ce277a82"
// name: "Yashika Jain"
// notification_id: "xijrw6buukp82paj3zei"
// postId: "1fd8d36d-1b82-4668-a80a-22647374535f"
// postImagePath: "_user/_posts/_62bb59979690362946aedb02/1fd8d36d-1b82-4668-a80a-22647374535f_1656445516628.jpeg"
// post_url: "/user/single/post?post=1fd8d36d-1b82-4668-a80a-22647374535f&&auther=Raghav Rajput"
// read: false
// time: 1656487715664
// type: "comment


// reply comment
// UserProfile: "http://res.cloudinary.com/ddnazqja2/image/upload/v1656355088/62b76b70bc29175c979cd22f/profileImage/62b76b70bc29175c979cd22f.jpg"
// commentId: "dye0n0ok3"
// commentParentId: "twvqsvt4k"
// docIdCommentByUserId: "62b775a33f6edf08ce277a82"
// name: "Yashika Jain"
// notification_id: "stgsmcetoos4rdqsymhgu2"
// postId: "1fd8d36d-1b82-4668-a80a-22647374535f"
// postImagePath: "_user/_posts/_62bb59979690362946aedb02/1fd8d36d-1b82-4668-a80a-22647374535f_1656445516628.jpeg"
// post_url: "/user/single/post?post=1fd8d36d-1b82-4668-a80a-22647374535f&&auther=Raghav Rajput"
// read: false
// time: 1656487910149
// type: "reply"