import React, { useRef, useState, useEffect } from 'react'
import Image from "@material-tailwind/react/Image";
import CardHeader from "@material-tailwind/react/CardHeader";
import H5 from "@material-tailwind/react/Heading5";
import { BsThreeDotsVertical } from 'react-icons/bs';
import data from '../Api'
import Modal from './Modal';
// import "./index.css"


import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";










function Photos() {
    const [clickedImg, setClickedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const photosDeleteRef = useRef(null)
    const [PhotosApi, setPhotosApi] = useState([])

    const handleClick = (item, index) => {
        setCurrentIndex(index);
        setClickedImg(item.link);
    };


    const handelRotationRight = () => {
        const totalLength = data.length;
        if (currentIndex + 1 >= totalLength) {
            setCurrentIndex(0);
            const newUrl = data[0].link;
            setClickedImg(newUrl);
            return;
        }
        const newIndex = currentIndex + 1;
        const newUrl = data.filter((item) => {
            return data.indexOf(item) === newIndex;
        });
        const newItem = newUrl[0].link;
        setClickedImg(newItem);
        setCurrentIndex(newIndex);
    };

    const handelRotationLeft = () => {
        console.log("click")
        const totalLength = data.length;
        if (currentIndex === 0) {
            setCurrentIndex(totalLength - 1);
            const newUrl = data[totalLength - 1].link;
            setClickedImg(newUrl);
            return;
        }
        const newIndex = currentIndex - 1;
        const newUrl = data.filter((item) => {
            return data.indexOf(item) === newIndex;
        });
        const newItem = newUrl[0].link;
        setClickedImg(newItem);
        setCurrentIndex(newIndex);
    };

    function deletePostById(e, id) {
        console.log(id)

        const filterData = PhotosApi.filter((item) => {
            return item.id !== id
        })
        setPhotosApi(filterData)
    }





    //load the photos api
    useEffect(() => {
        setPhotosApi(data)

    }, [])






    return (

        <>
            <header className=' pt-[3rem]'>

                <CardHeader color=""


                    size="sm"
                    className="cursor-pointer header bg-[#118989] text-white py-4"
                >
                    <H5 color="white">Photos</H5>
                </CardHeader>
                {/* gap-3 flex flex-wrap pt-2 */}
                <main className="main photos image_group gap-3 flex flex-wrap mr-auto  pl-[2rem] -mt-[.5rem] pt-2 relative"
                    id="main"

                >
                    {
                        PhotosApi.length > 0 && PhotosApi.map((item, index) => {
                            return (

                                <>

                                    <Image
                                        src={item.link}
                                        rounded={false}
                                        raised={false}
                                        alt="Raised Image"
                                        className="rounded-none flex-shrink-0 object-cover object-center w-[18rem] outline 
                                    outline-1 outline-white cursor-pointer"
                                        onClick={() =>
                                            handleClick(item, index)
                                        }
                                    />
                                    <section className='relative'>



                                        <div className="wrapper-three-dots absolute top-1 right-0 px-[4px] rounded-lg py-[3px]
                                        hover:bg-[#312c2c30] cursor-pointer
                                        hover:text-black
                                        hover:outline-[#120d0d43]
                                        hover:outline-1
                                        hover:outline
                                        hover:outline-offset-1
                                        text-white

                                        mr-5
                                        "

                                            ref={photosDeleteRef}
                                            // data-tippy-content="hellow"

                                            onClick={() => {
                                                // alert("hello")

                                            }}

                                        >

                                            <BsThreeDotsVertical className=' text-[1.3rem] 
                                        hover:text-black
                                        text-black'
                                            />


                                        </div>

                                    </section>

                                    <Popover placement="auto" ref={photosDeleteRef}>
                                        <PopoverContainer>
                                            {/* <PopoverHeader className="lowercase font-medium text-[1.5rem] -pt-2">Delete</PopoverHeader> */}
                                            <PopoverBody>
                                                <ul className='list-style-none mt-2'>
                                                    <li className="items1">
                                                        <button className='py-[.4rem] px-[2rem] mt-3 hover:bg-red-600 rounded-lg hover:text-white
                                                            focus:outline-none
                                                            '
                                                            onClick={(e) => {
                                                                deletePostById(e, item.id)
                                                                // console.log("click", 46545)
                                                            }}

                                                        >
                                                            Delete

                                                        </button>
                                                    </li>
                                                    <li className="items2"></li>
                                                    <li className="items3"></li>
                                                    <li className="items4"></li>
                                                    <li className="items5"></li>
                                                </ul>

                                            </PopoverBody>
                                        </PopoverContainer>
                                    </Popover>


                                </>

                            )
                        })
                    }

                    <div>
                        {clickedImg && (
                            <Modal
                                clickedImg={clickedImg}
                                handelRotationRight={handelRotationRight}
                                setClickedImg={setClickedImg}
                                handelRotationLeft={handelRotationLeft}
                            />
                        )}
                    </div>

                </main>
            </header>

        </>




    )
}

export default Photos