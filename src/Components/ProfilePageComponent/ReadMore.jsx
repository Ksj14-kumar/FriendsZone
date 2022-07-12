import React, { useEffect, useState } from 'react'
import Linkify from 'react-linkify';


const ReadMore = ({ children, theme }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = React.useState(true);
    const textRef = React.useRef(null)
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <div>
            <p className={`text  drop-shadow-lg ${theme ? "text-[#fff]" : "text-[#000]"}`}
                ref={textRef}
            >
                <Linkify>
                    {isReadMore ? text !== undefined && text.slice(0, 150) : text}
                    {text !== undefined && text.length > 80 && <span onClick={toggleReadMore} className="read-or-hide">
                        {isReadMore ? <span
                            className={`text-[1.5rem] font-semibold ${theme ? "text-[#fff]" : "text-[#000]"}`}>...read more</span> :
                            <span className={`text-[1.5rem] font-semibold ${theme ? "text-[#fff]" : "text-[#000]"}`}>show less</span>}
                    </span>}
                </Linkify>
            </p>
        </div >
    );
};



export default ReadMore;