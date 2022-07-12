import React from 'react'
const TextList = (props) => {
    const items = props.gifs.map((itemData) => {
        return <Item url={itemData.url} />;
    });
    return <div className="text-container">{items}</div>;
};
const Item = (props) => {
    return (
        <div className="gif-item">
            <img src={props.url} />
        </div>
    );
};
export default TextList;