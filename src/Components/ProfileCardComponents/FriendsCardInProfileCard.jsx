import React from 'react'
import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';

import img from '../../assets/img/team-2-800x800.jpg';
import img1 from '../../assets/img/team-1-800x800.jpg';
import img3 from '../../assets/img//team-3-800x800.jpg';
import img4 from '../../assets/img/team-4-470x470.png';
function FriendsCardInProfileCard() {
    return (
        <main className="combine flex-col w-[11rem] border p-1 border-[#0e0d0d20] shadow-lg  cursor-pointer">

            <section className=" left each_friends   w-full">

                <Image
                    src={img}
                    rounded={false}
                    className="rounded-none w-full" />
            </section>
            <section className='right  flex-col  items-center' >
                {/* <button className="px-3 w-full  py-[.1rem] my-1 rounded-sm  bg-blue-400 text-white focus:outline-none ">Connect</button> */}
                <p className='text-center text-lg'>Yashika Jain</p>

                <button className="px-3  py-0 w-full my-1 rounded-sm  bg-blue-400 text-white focus:outline-none ">Connect</button>
            </section>
        </main>


    )
}

export default FriendsCardInProfileCard