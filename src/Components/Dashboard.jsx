import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';

import { Context } from '../App';


function Dashboard(props) {
    console.log("dashboard props", props)
    const { users, dispatch } = useContext(Context)
    console.log("users data", props.users.message)
    console.log("name", props.users.name)
    console.log("email", props.users.email)
    console.log("users data", props.users.message)
    const { name, email } = props.users.user || props.users

    console.log("1st login", props.users)
    console.log("context0", users)



    console.log(name, email)




    // if (users) {

    return (
        <div className='text-white'>
            <Sidebar name={name} email={email} />
        </div>
    )
    // }
    // else {
    //     return (
    //         <Redirect to="/" />
    //     )
    // }

}



export default Dashboard;