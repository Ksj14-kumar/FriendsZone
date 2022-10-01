import Image from '@material-tailwind/react/Image'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import img from "../assets/img/download.png"
function AllNotification() {
    const [loadData, setLoadData] = useState([])
    const params = useParams()
    useEffect(() => {
        async function loadNoti() {
            try {
                const loadNoti = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/notification/byId/${params.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("uuid")}`
                    }
                })
                const resData = await loadNoti.json()
                if (loadNoti.status === 200) {
                    setLoadData(resData.data)
                }
                else if (loadNoti.status !== 200) {
                }
            } catch (err) {
                console.warn(err)
            }
        }
        loadNoti()
    }, [params])
    return (
        <>
            <div className=" mt-[5rem] flex justify-center md:ml-64  mds-editor19:block">
                <div className="inner mds-editor19:full">
                    {
                        loadData ? (loadData.map((item) => {
                            return (
                                <>
                                    <div className="inner_container bg-[#fff] flex w-[26rem] py-[.5rem] justify-between items-center rounded-md px-2 drop-shadow-md mt-[8px] mb-[8px] mds-editor19:w-full flex-wrap"  >
                                        <NavLink to={`/profile/${item.likedBy}`}>
                                            <section className="left w-[3rem] h-[3rem] flex-shrink-0 cursor-pointer">
                                                {
                                                    item.url ?
                                                        <Image
                                                            src={item.url}
                                                            rounded={true}
                                                            raised={false}
                                                            alt="img"
                                                            className="h-full w-full"
                                                        /> : <Image
                                                            src={img}
                                                            rounded={true}
                                                            raised={false}
                                                            alt="img"
                                                            className="h-full w-full"
                                                        />
                                                }
                                            </section>
                                        </NavLink>
                                        <section className="center">
                                            <p className="text-lg tracking-wider truncate mds-editor30:text-[.2rem]"><strong className="truncate">{item.name}</strong>  like your post</p>
                                        </section>
                                        <section className="right w-[3rem] h-[3rem] flex-shrink-0 cursor-pointer rounded-none ">
                                            {
                                                item.postImageURL ?
                                                    <Image
                                                        src={item.postImageURL}
                                                        rounded={false}
                                                        raised={false}
                                                        alt="img"
                                                        className="rounded-none w-full h-full"
                                                    /> : ""
                                            }
                                        </section>
                                    </div>
                                </>
                            )
                        })) : ""
                    }
                </div>
            </div>
        </>
    )
}
export default AllNotification = React.memo(AllNotification)