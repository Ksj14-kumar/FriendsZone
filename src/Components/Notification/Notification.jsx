import React from 'react'

import img1 from '../../assets/img/team-1-800x800.jpg';
import img2 from '../../assets/img/team-2-800x800.jpg'
import img3 from '../../assets/img/team-2-800x800.jpg'
import img4 from '../../assets/img/team-2-800x800.jpg'
import Image from "@material-tailwind/react/Image";








function Notification(props) {


    return (

        <>
            <ul className="notifications">
                <li className="links1 flex align-middle justify-between cursor-pointer mt-2">
                    <div className="left-side flex rounded-full w-[2.5rem] h-[2.5rem]">
                        <Image
                            src={img1}
                            rounded={true}
                            raised={false}
                            alt="Rounded Image"
                        />

                    </div>
                    <div className="right-side flex align-middle mt-2 ml-2 ">
                        <p className='font-bold mr-1'>Sanju Kumar</p> like your comment


                    </div>

                </li>
                <li className="links2 flex align-middle justify-between cursor-pointer mt-2">
                    <div className="left-side flex rounded-full w-[2.5rem] h-[2.5rem]">
                        <Image
                            src={img1}
                            rounded={true}
                            raised={false}
                            alt="Rounded Image"
                        />

                    </div>
                    <div className="right-side flex align-middle mt-2 ml-2 ">
                        <p className='font-bold mr-1'>Sanju Kumar</p> like your comment


                    </div>

                </li>
                <li className="links3 flex align-middle justify-between cursor-pointer mt-2">
                    <div className="left-side flex rounded-full w-[2.5rem] h-[2.5rem]">
                        <Image
                            src={img1}
                            rounded={true}
                            raised={false}
                            alt="Rounded Image"
                        />

                    </div>
                    <div className="right-side flex align-middle mt-2 ml-2 ">
                        <p className='font-bold mr-1'>Sanju Kumar</p> like your comment


                    </div>

                </li>
                <li className="links4 flex align-middle justify-between cursor-pointer mt-2">
                    <div className="left-side flex rounded-full w-[2.5rem] h-[2.5rem]">
                        <Image
                            src={img1}
                            rounded={true}
                            raised={false}
                            alt="Rounded Image"
                        />

                    </div>
                    <div className="right-side flex align-middle mt-2 ml-2 ">
                        <p className='font-bold mr-1'>Sanju Kumar</p> like your comment


                    </div>

                </li>
                <li className="links5">

                </li>
            </ul>


        </>






    )
}

export default Notification;