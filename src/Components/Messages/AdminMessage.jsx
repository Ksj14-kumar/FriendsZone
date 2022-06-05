import React from 'react'
import { format } from "timeago.js"

function AdminMessage({ own, message, info }) {


    return (
        <div className={`wrapper  flex justify-${own ? "end" : "start"}  w-full  mt-[1rem] } mb-[0px]`}>






            <div className="left_user -mr-[50px] -ml-[4.2rem]   max-w-[30rem] ">



                {
                    message.text &&
                    <div className="container3 w-full ">


                        <div className={`left_user_text    rounded-md py-2 px-1 w-full break-all    text-white text-[1rem] tracking-wider indent-2 mb-2 ${!own ? "bg-[#b90267]  " : "bg-[#036cb3] "}`}  >

                            {message.text}


                            <p className='relative top-[6px] right-[4px] w-full flex justify-end mb-[4px]'>{format(message.time)}</p>

                        </div>
                    </div>
                }
            </div>


        </div>
    )
}

export default AdminMessage