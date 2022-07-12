import React from 'react'
import { useSelector } from 'react-redux';
import AdminPost from '../Components/TotalPost/AdminPost';

function UserPosts() {
    const GetAllPosts = useSelector((state) => {
        return state.GetAllPosts
    })
    return (
        <div className="admin_posts">
            <AdminPost GetAllPosts={GetAllPosts} />
        </div>
    )
}

export default UserPosts= React.memo(UserPosts);