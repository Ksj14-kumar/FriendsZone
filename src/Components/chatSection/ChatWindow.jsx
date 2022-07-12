
import ActiveUser from './ActiveUser';
import React from 'react'
function ChatWindow() {
    return (
        <>
            <section className='relative cursor-pointer bg-green-400'>
                <article className='absolute -top-4  -right-[11.8rem] font-semibold text-xl bg-[#b43d22] hover:bg-[#525E75] rounded-full px-2  -mt-[1px] -pt-[2px] border-1 border-gray-400 border-solid z-[26000] text-white'>
                    x
                </article>
            </section>
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
        </>
    )
}

export default ChatWindow