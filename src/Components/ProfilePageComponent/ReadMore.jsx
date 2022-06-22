import React, { useEffect } from 'react'
import Linkify from 'react-linkify';


const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = React.useState(true);
    const textRef = React.useRef(null)
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };


    useEffect(() => {
        if (textRef.current) {
            // textRef.current?.children[0].classList.add("text-blue-500")
            // console.log()
        }

    }, [text])

    return (
        <div>

            <p className="text"
                ref={textRef}

            >
                <Linkify>
                    {isReadMore ? text !== undefined && text.slice(0, 150) : text}
                    {text !== undefined && text.length > 80 && <span onClick={toggleReadMore} className="read-or-hide">
                        {isReadMore ? <span className='text-[1.5rem] font-semibold'>...read more</span> : <span className='text-[1.5rem] font-semibold'>show less</span>}
                    </span>}
                </Linkify>
            </p>
        </div >
    );
};


export default ReadMore;
