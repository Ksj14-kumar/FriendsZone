import React from 'react'

import Photos from '../Components/UserPhotos/Photos'

function UserPhotos() {
    return (
        <div className="container2 md:ml-[17rem] mt-[0rem]  md:mr-[3rem] mx-[2rem]  h-full">
            <Photos />





        </div>
    )
}

export default UserPhotos = React.memo(UserPhotos)