import Image from '@material-tailwind/react/Image'
import React from 'react'
import img1 from '../../assets/img/team-3-800x800.jpg';
import ClosingLabel from "@material-tailwind/react/ClosingLabel";


function ChatWindow() {
    return (

        <>

{/* -left-7 */}
            <section className='relative cursor-pointer bg-green-400'>
                <article className='absolute -top-4  -right-[11.8rem] font-semibold text-xl bg-[#b43d22] hover:bg-[#525E75] rounded-full px-2  -mt-[1px] -pt-[2px] border-1 border-gray-400 border-solid z-[26000] text-white'>

                {/* <ClosingLabel color="lightBlue"></ClosingLabel> */}
                x
                </article>
            </section>
            <div className='text-sm px-6 py-1 bg-gray-500 cursor-pointer  z-[25000] rounded-sm flex justify-between content-center items-center '
            >
                <section className='w-[1.8rem] h-[1.8rem]'>

                    <Image
                        src={img1}
                        rounded={true}

                    />
                </section>
                <p className='ml-[10px]'>
                    ChatWindow
                </p>


            </div>
        </>
    )
}

export default ChatWindow