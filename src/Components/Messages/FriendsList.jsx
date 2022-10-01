import React, { useEffect, useState } from 'react'
import Image from '@material-tailwind/react/Image';
function FriendsList({ conversation, user, active, setInfo }) {
    const [userInfo, setUser] = useState("")
    useEffect(() => {
        const friends = conversation.members.find(friend => friend !== user)
        async function loadUserData() {
            const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/${friends}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("uuid"),
                }
            })
            const data = await response.json()
            if (response.status === 200) {
                setUser(data.user)
                setInfo(data.user)
            }
            else if (response.status !== 200) {
                return
            }
        }
        loadUserData()
    }, [conversation, user])
    return (
        <>
            {
                userInfo ?
                    <div className={`inner  flex justify-evenly items-center py-1 cursor-pointer  rounded-md mx-[.6rem] transition-all delay-100 mb-[.7rem] ${active ? "bg-[#012da6] hover:bg-[#002079]" : "bg-[#d7d7d7] hover:bg-[#c3c2c2]"} `} >
                        <div className="image w-[2.7rem] h-[2.7rem] flex-shrink-0 bg-[#f5f5f5] rounded-full">
                            <Image
                                src={userInfo?.url
                                }
                                rounded={true}
                                raised={false}
                                alt="Rounded Image"
                            />
                        </div>
                        <div className={`name text-[1.3rem] transition-all delay-100  -ml-[4px]  ${active ? "text-white" : "text-[#7d7c7c]"}`}>
                            {userInfo?.fname + " " + userInfo?.lname}
                        </div>
                    </div> : <BeforeLoadData />
            }
        </>
    )
}
export default FriendsList
function BeforeLoadData() {
    return (
        <>
            <div className="inner  flex justify-evenly items-center py-1 cursor-pointer hover:bg-[#d2d0d0] rounded-md mx-[.6rem] transition-all delay-100 mb-[.7rem]  bg-[#a7a6a6] animate-pulse" >
                <div className="image w-[2.7rem] h-[2.7rem] flex-shrink-0 bg-[#908f8fe8]">
                </div>
                <div className="name text-[1.3rem] text-[#7d7c7c] -ml-[4px]">
                </div>
            </div>
        </>
    )
}