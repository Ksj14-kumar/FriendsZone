import React from 'react'
import Image from '@material-tailwind/react/Image';
import Photos from "../../assets/img/download.png"

function FriendsCardInProfileCard({ name, image, usernameId, _id, cancleFriendRequest, setAcceptMessage, friendsId, theme }) {
    return (
        <main className={`combine flex-col w-[15rem] drop-shadow-lg border p-1 ${theme ? "border-[#92929220]" : "border-[#0e0d0d20]"} shadow-lg  cursor-pointer rounded-md left each_friends bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600`}>
            <section className='w-full left each_friends'>
                {image ? <Image
                    src={image}
                    rounded={false}
                    className="rounded-none w-full" /> :
                    <Image
                        src={Photos}
                        rounded={false}
                        className="rounded-none w-full" />
                }
            </section>
            <section className='right  flex-col  items-center px-2 py-2' >
                <p className={`text-center text-lg bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 rounded-md py-2 font-serif tracking-wider ${theme ? "text-[#fff] truncate" : "text-[#000]"}`}>{name}</p>
            </section>
        </main >
    )
}
export default FriendsCardInProfileCard