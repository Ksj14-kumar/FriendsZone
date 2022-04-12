import React from 'react'

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = React.useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 150) : text}
            {text.length > 80 && <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? <span className='text-[1.5rem] font-semibold'>...read more</span> : <span className='text-[1.5rem] font-semibold'>show less</span>}
            </span>}
        </p>
    );
};


export default ReadMore;
