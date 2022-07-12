import React from 'react'
const Error = (props) => {
    if(!props.isError) {
        return null
    }
    return (
        <p className='error'>{props.text}</p>
    )
}

export default Error