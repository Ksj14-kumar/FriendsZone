import React from 'react'
import Image from '@material-tailwind/react/Image';
import { MdLocationOn, MdSearch, MdLocalPhone } from 'react-icons/md';
import { IoIosVideocam } from 'react-icons/io';

import img from '../../assets/img/team-2-800x800.jpg';

function ChatHeader({ info }) {
    const [videoOverlay, setVideoOverlay] = React.useState(false);



    console.log(videoOverlay)
    return (
        <header className="top flex justify-between bg-[#3f42f1] rounded-md rounded-b-none py-2  drop-shadow-lg  w-[43.3rem] mds-editor23:w-full">
            <div className="left_t flex flex-4 justify-around items-center  ml-[2rem] ">

                {
                    info?.url &&
                    <div className="top_left_header w-[2.5rem] h-[2.5rem] flex-shrink-0 cursor-pointer">


                        <Image
                            src={info?.url}
                            rounded={true}
                            raised={false}
                            alt="Rounded Image"
                        />

                    </div>
                }

                <div className="top_center_header ml-[1rem] cursor-pointer  flex flex-col ">

                    {
                        info?.fname &&
                        <>
                            <p className='text-[1rem] tracking-wider text-[#fff] '>{info?.fname + "" + info?.lname}</p>
                            <p className='text-[1rem] text-[#B4FF9F] tracking-wider'>typing...</p>
                        </>
                    }
                </div>
            </div>
            <div className="right_top_header  mr-[2rem]   flex justify-between">
                <div className="video mr-[15px] bg-[#cac8c800] flex items-center px-2 py-[2px] rounded-full cursor-pointer hover:bg-[#fff] transition-all delay-100 hover:text-black"
                    onClick={(e) => {
                        setVideoOverlay(!videoOverlay)

                    }}
                >
                    <IoIosVideocam className="video_icon text-[1.8rem] " />
                </div>
                <div className="audio mr-[15px] bg-[#dfdede08] flex items-center px-3 rounded-full hover:bg-[#fff]   cursor-pointer">
                    <MdLocalPhone className="audio_icon text-[1.5rem]" />
                </div>

            </div>
            {
                videoOverlay && <LiveVideo />
            }
        </header>
    )
}

export default ChatHeader;


function LiveVideo() {
    return (
        <div className="liver_video fixed w-full h-full bg-[#4a4949d6]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptate nesciunt quidem dolorem, sed iste quam? Dolores quis nisi soluta enim, voluptatem reiciendis illo. Libero ipsam soluta doloribus consectetur sequi veritatis architecto accusantium ab dolorum corrupti quam voluptate quisquam qui commodi nobis, adipisci blanditiis rem optio quae ex in, voluptates laborum. Aliquam modi reiciendis, dolorem numquam in quam, explicabo consequatur deserunt, fuga veritatis odit quisquam ex blanditiis suscipit minus recusandae nemo consectetur tempore consequuntur excepturi delectus nam illo? Eius vel, molestiae, eaque architecto inventore dolorum perferendis aspernatur, animi ea id eveniet laboriosam! Exercitationem voluptate provident ut, molestias delectus explicabo fugit quibusdam incidunt vel veritatis, soluta aliquam doloremque esse temporibus id? Illum inventore non incidunt ullam, doloremque in earum sapiente, maxime officiis repellat dolorem a ratione perspiciatis aperiam voluptatibus tenetur reiciendis aliquid provident. Distinctio eius id, corporis expedita placeat, neque in dolorum eveniet assumenda iure soluta explicabo necessitatibus dolores vero incidunt nam temporibus ut nesciunt, repudiandae dicta. Similique tempora odio quae, illo neque recusandae vero facilis ab. Perferendis, impedit est culpa esse illo deserunt rem. Exercitationem, totam sequi aspernatur tenetur sit illo numquam eius enim dignissimos? Dolorum veniam, laborum placeat modi molestiae suscipit cupiditate aut voluptatum maiores. Recusandae tempora voluptas ratione.

            </div>
    )
}