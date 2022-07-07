import React, { useState } from 'react'
import photos from "../../assets/img/download.png"
import { MdCancel, MdSearch } from "react-icons/md"
import { motion } from "framer-motion"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Axios from "axios"
import CircleLoader from "../../Loader/CircleLoader"

function ForwardMessagesComponent({ setShowForwardComponent, takeWholeMessageForforward, setWholeMessage }) {
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [searchBarValue, setSearchBarValue] = useState([])
    const [query, setQuery] = useState("")
    const [selectUser, setSelectUsers] = useState([])
    const [checkBoxBool, setCheckBox] = useState(false)
    const [loader, setLoader] = useState(false)
    let controller;
    const { userFriends } = useSelector((state) => {
        return {
            userFriends: state.UserInformationLoad.value
        }
    })

    function handleChange(value) {

        if (!checkBoxBool && value) {
            setSelectUsers([...selectUser, { friendId: value, currentUserId: userFriends?.googleId }])
        } else if (checkBoxBool) {
            setSelectUsers(selectUser.filter(item => item.friendId !== value))
        }

    }








    useEffect(() => {
        if (query.length > 0) {
            const filterFriends = userFriends.friends !== undefined && userFriends.friends.length > 0 && userFriends.friends.filter(item => {
                return item.name.toLowerCase().includes(query.toLowerCase())
            })
            setSearchBarValue(filterFriends)
        }
    }, [query])


    async function forwardMessage() {
        if (selectUser.length > 0) {
            try {

                controller = new AbortController()
                setLoader(true)
                selectUser.forEach(async (item) => {
                    const res = await Axios({
                        url: `${process.env.REACT_APP_API_BACKENDURL}/api/v1/forwardMessage`,
                        method: "POST",
                        signal: controller.signal,
                        data: {
                            message: {
                                ...takeWholeMessageForforward,
                                senderId: userFriends.googleId,
                                forwarded: true
                            },

                            groupId: item
                        },
                        responseType: "json",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("uuid"),
                        }


                    })

                })
                setLoader(false)



            } catch (err) {

            }
        }
    }


    // console.log({ selectUser })

    return (

        <div className='absolute  w-full z-[19] bg-[#1111114d] md:h-[calc(100vh-8.8rem)] h-[calc(100vh-4.4rem)] px-[1rem] overflow-y-hidden'>

            <div className="formardCoponents relative top-[1%] bg-[#fff] w-full p-4 rounded-md drop-shadow-lg  ">

                <header className='text-[1.2rem] font-thin tracking-wider font-serif mb-1 flex items-center relative'>
                    {<p className="text-[1.3rem] font-medium flex-[9]">
                        forward message

                    </p>

                    }
                    {showSearchBar &&
                        <motion.div className="search_wrapper absolute w-[88%] mds-editor6:mr-[1rem]"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <input type="search" name="search" id="" className="py-1 focus:outline-none border border-solid border-[#d8d8d8]  rounded-md mb-1 pl-3 tracking-wider font-serif pr-12 w-[100%]" placeholder='Search...'
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                }}

                            />
                        </motion.div>}
                    <div className="cona flex items-center flex-[3] 
                    justify-end">


                        <motion.p className='search mr-4 relative z-[20] cursor-pointer'
                            onClick={() => {
                                setShowSearchBar(!showSearchBar)
                            }}


                        >
                            <MdSearch className="text-[2.1rem] text-[#727272] cursor-pointer" />

                        </motion.p>
                        <p className="bg-[#ccc]  rounded-full cursor-pointer hover:text-[#f91616] relative z-[19]  "
                            onClick={() => {
                                setShowSearchBar(false)
                                setShowForwardComponent(false)
                                setSelectUsers([])
                                setWholeMessage({})
                                controller?.abort()
                            }}
                        >
                            <MdCancel className='text-[2rem] text-[#565656] hover:text-[#f91616] transition-all delay-150' />
                        </p>
                    </div>
                </header>
                <hr className='bg-[#cccccc]' />
                <main className="body_friends_list mt-1 overflow-y-auto max-h-[32rem]" id="forwardMessageOverflowUserList">
                    {
                        query.length > 0 ?
                            (

                                searchBarValue.length > 0 ? searchBarValue.map((item, index) => {
                                    return (
                                        <>
                                            <FriendList key={index} item={item} setSelectUsers={setSelectUsers} handleChange={handleChange} setCheckBox={setCheckBox} checkBoxBool={checkBoxBool} />
                                        </>
                                    )
                                }) : <div className="no_user_found flex justify-center flex-wrap">
                                    <p className="text-[1.5rem] font-sans tracking-wider flex justify-center">
                                        no user found
                                    </p>
                                </div>



                            )
                            :
                            userFriends?.friends !== undefined && userFriends?.friends.map((item, index) => {
                                return (
                                    <>
                                        <FriendList key={index} item={item} setSelectUsers={setSelectUsers} handleChange={handleChange} setCheckBox={setCheckBox} checkBoxBool={checkBoxBool} />
                                    </>
                                )
                            })
                    }
                </main>
                <footer className="  flex justify-end py-[5px]">
                    <button className="btn w-[7rem] bg-[#037c1d] focus:outline-none  normal-case text-[1.3rem] hover:bg-[#091fcc] transition-all delay-150"
                        disabled={selectUser.length > 0 ? (loader ? true : false) : true}
                        onClick={() => {
                            forwardMessage()
                        }}
                    >
                        {
                            loader ? <CircleLoader color="#fff" /> :
                                "Send"
                        }
                    </button>
                </footer>
            </div>

        </div >
    )
}

export default ForwardMessagesComponent;

function FriendList({ item, handleChange, setCheckBox, checkBoxBool }) {





    return (
        <>
            <section className='py-1 rounded-md hover:bg-[#dfdfdf] mt-[4px] px-2'>
                <div className="wrapper_1 flex  items-center">
                    <div className="form-control flex-[0]"
                    >
                        <label className="label cursor-pointer">
                            <input type="checkbox" checked={checkBoxBool ? "checked" : ""} className="checkbox checkbox-primary md:checkbox-lg mds-editor6:checkbox-md"
                                defaultChecked={checkBoxBool}
                                onChange={() => {
                                    handleChange(item._id)
                                    setCheckBox(!checkBoxBool)
                                }}

                            />
                        </label>
                    </div>
                    <div className="image flex-[1] ml-4">
                        <div class="avatar">
                            <div class="w-[3rem] mds-editor6:w-[2.5rem] rounded-full">
                                {
                                    item.url ? (
                                        <img src={item.url} />
                                    ) : (
                                        <img src={photos} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="p text-[1.3rem] tracking-wider truncate flex-[4] font-serif mds-editor6:ml-2">{item.name ? item.name : ""}</div>

                </div>
            </section>
            <hr className='bg-[#b8b8b8] mt-[4px]' />

        </>
    )
}