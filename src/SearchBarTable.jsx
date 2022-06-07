import Image from '@material-tailwind/react/Image';
import React, { useState, useEffect, useRef } from 'react'
// import { MdOutlineCancel } from 'react-icons/bi';
import { MdSearch, MdOutlineCancel, MdHistory } from 'react-icons/md';
import { BrowserRouter, NavLink, Redirect, Route, useLocation } from 'react-router-dom';
import img1 from './assets/img/download.png';
import Header from './Components/Header';
import Button from "@material-tailwind/react/Button";






function useOutsideAlerter(ref, setHistory, setQuery) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                setHistory(false)
                setQuery("")

            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}





function SearchBarTable({ showSearch, setShowSearch, setPopOverEffect, setQuery, query, data, userSearchHistory1, deleteHistory }) {
    const [history, setHistory] = useState(false)
    const ref = useRef(null)



    useOutsideAlerter(ref, setHistory, setQuery)












    return (

        <>
            {/* <BrowserRouter> */}

            {/* 
            main absolute  -top-[4px] -right-[1.9rem] post-screen1:w-[35rem] 
             mds-editor14:w-[28rem] mds-editor15:w-[23rem] mds-editor16:w-[18rem] mds-editor17:w-[12rem] mds-editor18:w-[3rem] mds-editor18:h-[3rem] mds-editor18:rounded-full 
             4px-4 pt-[2px] drop-shadow-xl flex-shrink-0 */}

            <main className={``}
                onBlur={() => {
                    // setHistory(false)

                    setShowSearch(false)
                    // setPopOverEffect(false)


                }}
                ref={ref}



            // ref={SearchFilter}
            >
                {/* post-screen1:w-[35rem] mds-editor14:w-[28rem] mds-editor15:w-[22rem] mds-editor16:w-[18rem] mds-editor17:w-[14rem] w-[10rem] */}
                <div className="_top_search_bar flex   bg-[#fff] rounded-lg flex-col  mds-editor18:w-full   "
                >

                    <div className="search_container  w-full">

                        <MdSearch className={`absolute post-screen1:text-[1.5rem] mt-[6px] ml-[1rem] text-[#9d9c9c] mds-editor18:text-[2rem] mds-editor18:mt-[3px] mds-editor18:ml-[0] `} />
                        {/* ${userSearchHistory === false ? "" : "rounded-b-none  mds-editor18:hidden"} */}
                        <input type="search" className={`w-full h-[2.3rem] focus:outline-none rounded-lg indent-12  border-b-none rounded-b-lg `}
                            onFocus={() => {
                                if (window.innerWidth <= 463) {

                                    setShowSearch(false)
                                }
                                setHistory(true)



                            }}

                            onChange={
                                (e) => {
                                    setHistory(false)

                                    setQuery(e.target.value)
                                }
                            }

                        />
                    </div>

                    {/* //USER SEARTCH HISTORY  */}
                    {
                        history &&
                        (userSearchHistory1 !== undefined &&
                            userSearchHistory1.map((item) => {
                                return (
                                    <History name={item.name} url={item.url} id={item.searchUserId} deleteHistory={deleteHistory} />

                                )
                            })


                        )
                    }





                    {/* //user search data */}
                    {
                        query.length > 0 && (

                            data.map((item) => {
                                // ${userSearchHistory ? "flex" : "hidden"}
                                return (
                                    <>


                                        <NavLink
                                            to={`/profile/${item.googleId}`}
                                        >


                                            <div className={`first-letter:first-letter:search_history_data flex  justify-between transition-all hover:bg-[#d0d0d0b2] rounded-lg mx-1 mt-[2px] mb-[6px]  duration-75 cursor-pointer`}

                                            >
                                                <div className="wrap_image_name flex  flex-1 p-1 items-center">

                                                    <div className="image_containerrounded-[50px] flex-shrink-0">
                                                        {
                                                            item.url ?
                                                                <Image
                                                                    src={item.url}
                                                                    rounded={false}
                                                                    className="post-screen1:w-[2.5rem] post-screen1:h-[2.5rem] rounded-full mds-editor14:w-[2rem] mds-editor14:h-[2rem] mds-editor17:w-[1.8rem] mds-editor17:h-[1.8rem] flex-shrink-0"

                                                                /> : <Image
                                                                    src={img1}
                                                                    rounded={false}
                                                                    className="post-screen1:w-[2.5rem] post-screen1:h-[2.5rem] rounded-full mds-editor14:w-[2rem] mds-editor14:h-[2rem] mds-editor17:w-[1.8rem] mds-editor17:h-[1.8rem] flex-shrink-0"

                                                                />

                                                        }

                                                    </div>
                                                    <div className="name_container ml-4">
                                                        <p className='post-screen1:text-[1.2rem] mds-editor14:text-[1rem] mds-editor17:text-[1rem] flex truncate'>{item.fname + " " + item.lname}</p>
                                                    </div>
                                                </div>
                                                {/* <div className="remover_history  px-5 flex items-center">
                                                    <p>
                                                        <MdOutlineCancel className='text-[1.8rem] text-[#f11c1c] rounded-full' />
                                                    </p>
                                                </div> */}

                                            </div>
                                        </NavLink>





                                    </>)

                            })
                        )
                    }

                    {/* compoennt-2 */}
                    {
                        (query.length > 0 && data.length > 0) &&
                        <div className="load_more_friends text-center  flex justify-center">
                            <NavLink to={`/load/friends/`} >

                                <Button
                                    color="gray"
                                    buttonType="link"
                                    size="regular"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="dark"
                                    className="lowercase"
                                >
                                    load more friend
                                </Button>

                            </NavLink>
                        </div>
                    }


                </div>
            </main>


            {/* </BrowserRouter> */}





        </>
    )
}

export default SearchBarTable


function History({ name, url, id, deleteHistory }) {



    return (
        <div className={`first-letter:first-letter:search_history_data flex  justify-between transition-all hover:bg-[#d0d0d0b2] rounded-lg mx-1 mt-[2px] mb-[6px]  duration-75 cursor-pointer  relative z-[15]`}>
            <NavLink to={`/profile/${id}`}>
                <div className="wrap_image_name flex  flex-1 p-1 items-center ">


                    <div className="searchIcon ml-3 hover:text-[#a0a0a0]">
                        <MdHistory className='text-[2rem] text-[#b3b3b3]   mr-[1rem]' />
                    </div>

                    <div className="image_containerrounded-[50px] flex-shrink-0">
                        {

                            url ? <Image
                                src={url}
                                rounded={false}
                                className="post-screen1:w-[2.5rem] post-screen1:h-[2.5rem] rounded-full mds-editor14:w-[2rem] mds-editor14:h-[2rem] mds-editor17:w-[1.8rem] mds-editor17:h-[1.8rem] flex-shrink-0"

                            /> : <Image
                                src={img1}
                                rounded={false}
                                className="post-screen1:w-[2.5rem] post-screen1:h-[2.5rem] rounded-full mds-editor14:w-[2rem] mds-editor14:h-[2rem] mds-editor17:w-[1.8rem] mds-editor17:h-[1.8rem] flex-shrink-0"

                            />

                        }

                    </div>
                    <div className="name_container ml-4">
                        <p className='post-screen1:text-[1.2rem] mds-editor14:text-[1rem] mds-editor17:text-[1rem] flex truncate'>{name}</p>
                    </div>


                </div>
            </NavLink>


            <div className="remover_history  px-5 flex items-center"

            >
                <p
                    onClick={() => {
                        deleteHistory(id)

                    }}
                >
                    <MdOutlineCancel className='text-[1.8rem] text-[#f11c1c] rounded-full' />
                </p>
            </div>

        </div >


    )
}