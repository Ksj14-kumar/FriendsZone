import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import {success} from "../toastifyMessage/Toast"

function Verify() {
    const params = useParams().token;
    const [loading, setLoading] = useState(false);
    const [Message, setMessage] = useState("")
    const history = useHistory()



    useEffect(() => {
        (async function () {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/verify/${params}`);
            const data = await response.json();
            if (response.status === 200) {
                success({ message: "Verified Successfully" })
                setTimeout(() => {
                    history("/login")
                }, 4000)
                setLoading(false)
                setMessage(data.message)
                console.log(data)
            }
            else if (response.status === 403) {
                setMessage(data.message)
                setLoading(false)
                console.log(data)
            }

            else if (response.status === 500) {
                setMessage(data.message)
                setLoading(false)


            }
            else {
                setMessage("Something went wrong")
                setLoading(false)

            }

        })()
    }, [params])
    return (
        <>
            <div className="check_user w-screen h-screen bg-[#ccc]">
                {
                    !loading ? <p className="text-[2.3rem] font-serif tracking-wider pt-4 text-[#9d9d9d] pl-6">Redirecting.............</p> :
                        <p className='text-[2rem] font-serif tracking-wider text-[#9d9d9d]'>{Message}</p>
                }

            </div>
        </>
    )
}

export default Verify