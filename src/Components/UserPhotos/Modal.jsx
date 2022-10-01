import React from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
const Modal = ({
    clickedImg,
    setClickedImg,
    handelRotationRight,
    handelRotationLeft
}) => {
    const handleClick = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setClickedImg(null);
        }
    };
    return (
        <>
            <div className="overlay dismiss  z-[19]" onClick={handleClick}>
                <img src={clickedImg} alt="bigger pic" />
                <span className="dismiss" onClick={handleClick}>
                    X
                </span>
                <div onClick={handelRotationLeft} className="overlay-arrows_left cursor-pointer">
                    <div className='bg-none'>
                        <AiOutlineArrowLeft className="h-5 w-5 bg-none text-white" />
                    </div>
                </div>
                <div onClick={handelRotationRight} className="overlay-arrows_right cursor-pointer ">
                    <div >
                        <AiOutlineArrowRight className="h-5 w-5 bg-none text-white" />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Modal