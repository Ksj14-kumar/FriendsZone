import React, { useEffect, useState } from 'react'
import RecentlyChatUser from './LeftSideChatSectionComponent/RecentlyChatUser';
function SimpleLeft({ converzationList, current, setChatHeader, socket }) {
    const [unreadMessage, setUnreadMessage] = useState([])
    useEffect(() => {
        let isMount= true
        const getUnreadMessages = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/load/all/unread/message/${localStorage.getItem("uuid")}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("uuid")
                    }
                })
                const data = await res.json()
                if (res.status === 200) {
                    if(isMount){
                        setUnreadMessage(data.empty)
                    }
                }
                else if (res.status !== 200) {
                }
            }
            catch (err) {
            }
        }
        getUnreadMessages()
        return ()=>{
            isMount=false
        }
    }, [])
    return (
        <>
            {
                converzationList.map((converzation, index) => {
                    return (
                        <>
                            <RecentlyChatUser key={index} user={converzation} currentUser={current} setChatHeader={setChatHeader} socket={socket} unreadMessage={unreadMessage} />
                        </>
                    )
                })
            }
        </>
    )
}

export default SimpleLeft = React.memo(SimpleLeft);