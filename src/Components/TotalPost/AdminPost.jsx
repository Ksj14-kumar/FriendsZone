import React from 'react'
import ShowPost from './ShowPost'


function AdminPost({ GetAllPosts }) {
    return (
        <div className='User_posts'>
            <div className='User_posts_title'>


            </div>
            <div className="container1 bg-green-8000 md:ml-64 md:flex md:gap-1 md:flex-wrap">

                {
                    GetAllPosts.length > 0 && GetAllPosts.map((item, index) => {
                        return (
                            <>
                                <ShowPost item={item} key={index} />

                            </>

                        )
                    }

                    )
                }
            </div>

        </div>
    )
}

export default AdminPost