import React, { useState, useEffect } from 'react'

import item from "../Components/Api"
import image from "../assets/img/team-4-470x470.png"
import { useHistory, useLocation, Link, use } from 'react-router-dom'
import Image from "@material-tailwind/react/Image";
import { useDispatch } from 'react-redux';
function FilterUser({ item }) {
    const dispatch = useDispatch()


    return (
        <>

            <ul>
                {

                    item.length > 0 &&
                    item.map(item => {
                        return (
                            <>
                                <li className="links1 flex align-middle  cursor-pointer mt-2  mb-5  bg-red-600"

                                    onClick={
                                        () => {
                                            alert("helo")
                                            dispatch({ type: "query", payload: item.googleId })
                                            // setSearchQueary(item.googleId)
                                        }
                                    }





                                >
                                    {/* <Link to={"/profile?id=" + item.googleId} */}


                                  
                                        <div className="left-side ml-[15px] md:ml-[5px] flex rounded-full w-[1.6rem] h-[1.6rem] md:w-[2.5rem] md:h-[2.5rem]">
                                            <Image
                                                src={image}
                                                rounded={true}
                                                raised={false}
                                                alt="Rounded Image"
                                                className="flex-shrink-0"
                                            />
                                        </div>
                                        <div className="right-side flex align-middle  ml-[5px]  ">
                                            <p className='font-sans md:mr-1  ml-2 md:mt-0 md:text-[1.3rem] flex'>{item.fname + " " + item.lname}</p>


                                        </div>
                                    {/* </Link> */}

                                </li>

                            </>
                        )

                    })


                }
            </ul>



        </>

    )
}

export default FilterUser