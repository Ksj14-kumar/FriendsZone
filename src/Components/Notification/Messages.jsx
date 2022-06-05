import Image from '@material-tailwind/react/Image'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Messages({ message, socket }) {
    return (
        <div className="container1">

            {
                message !== undefined && message.map((item, index) => {
                    return (

                        <>
                            <NavLink to={`/profile/${item.acceptorId}/`}  key={index}>

                                <section className='notification flex justify-between items-center content-center cursor-pointer' >
                                    <div className="left_images flex-shrink-0 bg-red-600">
                                        <Image
                                            src={item.url}
                                            rounded={true}
                                            className="w-[2.5rem] h-[2.5rem] flex-shrink-0 rounded-full"

                                        />


                                    </div>
                                    <div className="message flex ml-[10px]">
                                        <p className=' text-[1rem] '><span className='font-semibold'>{item.name}</span> <span>accept your friend request.</span></p>
                                    </div>
                                </section>
                            </NavLink>

                        </>

                    )


                })
            }
        </div>

    )
}

export default Messages