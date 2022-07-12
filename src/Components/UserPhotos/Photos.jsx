import React, { useRef, useState, useEffect } from 'react'
import Image from "@material-tailwind/react/Image";
import Modal from './Modal';
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverBody from "@material-tailwind/react/PopoverBody";

function Photos({ assests }) {
    const [clickedImg, setClickedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const photosDeleteRef = useRef(null)
    const handleClick = (item, index) => {
        setCurrentIndex(index);
        setClickedImg(item);
    };
    const handelRotationRight = () => {
        const totalLength = assests.length;
        if (currentIndex + 1 <= totalLength) {
            setCurrentIndex(currentIndex + 1);
            const newUrl = assests[currentIndex + 1];
            setClickedImg(newUrl);
            return;
        }
        else {
            setCurrentIndex(0);
            const newUrl = assests[0];
            setClickedImg(newUrl);
            return;

        }

    };
    const handelRotationLeft = () => {
        const totalLength = assests.length;
        if (currentIndex >= 0&&currentIndex<=totalLength) {
            setCurrentIndex(currentIndex - 1);
            const newUrl = assests[currentIndex - 1];
            setClickedImg(newUrl);
            return;
        }
        
    };
    return (
        <>
            <header className='p-1  '>
                <main className="main photos image_group gap-3 flex flex-wrap  relative mt-0  justify-center rounded-md "
                    id="main"
                >
                    {
                        assests?.length > 0 && assests.map((item, index) => {
                            return (
                                <>
                                    <section className="border2 border-2 border-solid border-[#ada9a95d] shadow-lg relative rounded-xl "
                                        key={index}
                                    >
                                        <Image
                                            src={item}
                                            rounded={false}
                                            raised={false}
                                            alt=""
                                            className="rounded-none flex-shrink-0 object-cover object-center w-[16rem] outline 
                                    outline-1 outline-white cursor-pointer h-full"
                                            onClick={() =>
                                                handleClick(item, index)
                                            }
                                        />
                                        <Popover placement="auto" ref={photosDeleteRef}>
                                            <PopoverContainer>
                                                <PopoverBody>
                                                    <ul className='list-style-none mt-2'>
                                                        <li className="items1">
                                                            <button className='py-[.4rem] px-[2rem] mt-3 hover:bg-red-600 rounded-lg hover:text-white
                                                            focus:outline-none
                                                            '
                                                                onClick={(e) => {
                                                                    // deletePostById(e, item.id)
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
                                    </section>
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