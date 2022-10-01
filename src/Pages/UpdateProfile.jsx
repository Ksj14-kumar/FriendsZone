import React from 'react'
import AdminNavbar from '../Components/AdminNavbar';
import InternetDetection from '../Components/InternetDetection';
import SettingsForm from '../Components/SettingsForm';
function UpdateProfile({ theme }) {
    return (
        <>
            {/* <AdminNavbar /> */}
            <InternetDetection />
            <div className="container` md:ml-[20rem] pt-[6rem]  md:mr-[5rem] mx-[2rem]">
                <SettingsForm theme={theme} />
            </div>
        </>
    )
}
export default UpdateProfile = React.memo(UpdateProfile);