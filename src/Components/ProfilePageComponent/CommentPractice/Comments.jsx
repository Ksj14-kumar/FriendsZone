import React, { useState, useEffect } from 'react'
import { getComments } from '../Comments/api';
import Comment from './Comment';

function Comments() {
    const [backendComment, setBackComments] = useState([])

    //NOW SHOW THE ALL ROOT COMMENT WHICH HAVING THE PARENTID=NULL

    const rootComments = backendComment.filter((item) => {
        return item.parentId === null
    })





    //1ST STEP LOAD THE ALL COMMENTS FROM API
    useEffect(() => {

        async function load() {
            setBackComments(await getComments())

        }
        load()



    }, [])

    console.log({ backendComment })
    console.log({ rootComments });
    return (
        <div className='comment'>
            <h1>Comments</h1>
            {/* <hr /> */}
            {
                rootComments.map((item) => {
                    return (
                        <div key={item.id}>
                            {item.body}
                            <Comment id={item.id} comment={item} />

                        </div>
                    )
                })
            }


        </div>
    )
}

export default Comments