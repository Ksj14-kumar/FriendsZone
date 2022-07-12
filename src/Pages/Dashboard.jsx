import React from 'react'

import UpdateProfile from './UpdateProfile';

function Dashboard(props) {
    
    const _id = JSON.parse(localStorage.getItem("user_login"))
    return (
        <div className='text-white'>
            <UpdateProfile />
        </div>
    )
}

export default Dashboard;