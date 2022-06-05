import React from 'react'
import { NavLink } from 'react-router-dom';

function UnknowUser() {
    return (
        <div className='mt-[8rem]  flex justify-center items-center p-12 select-none'>
            <p className='text-[3rem] text-[#939393] font-medium '>
                Create, profile to communicate to each others
                <NavLink to="/update_profile">
                    <p className='m-2 text-[4rem] text-[#44ae0f] underline '>Click here</p>



                </NavLink>

            </p>


        </div>
    )
}

export default UnknowUser