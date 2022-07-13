import React from 'react'
import { NavLink } from 'react-router-dom';
import InternetDetection from '../Components/InternetDetection';

function UnknowUser() {
    return (
        <>
            <InternetDetection />
            <div className=' flex justify-center  items-center select-none min-h-screen bg-[#e7e7e7]'>
                <p className='text-[3rem] text-center w-full text-[#939393]   font-medium flex justify-center flex-col '>
                    Create, profile to communicate to each others and getfull access.
                    <NavLink to="/update_profile">
                        <p className='m-2 text-[4rem] text-[#44ae0f] underline '>Click here</p>
                    </NavLink>
                </p>
            </div>
        </>
    )
}

export default UnknowUser