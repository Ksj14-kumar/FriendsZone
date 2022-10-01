import React, { useState } from 'react'
function StickerComponent() {
    const [Stickers, setStickers] = useState([])
    const [inputValue, setSearchInputValue]= useState("")
    async function Getstickers() {
        const res = await fetch(`https://messenger.stipop.io/v1/search?userId=693598975&q=${inputValue}&lang=en&pageNumber=1&limit=10`, {
            headers: {
                "apikey": ""
            }
        })
        const data = await res.json()
        setStickers(data.body.stickerList)
    }
    return (
        <>
            <div className="w-full bg-green max-h-[25rem]">
                <input type="text" name="" id=""
                    onChange={(e) => {
                        setSearchInputValue(e.target.value)
                    }}
                />
                <button className="btn px-4 py-2 text-white bg-[#620101]"
                    onClick={(e) => {
                        Getstickers()
                    }}
                >Get</button>
                <div className="Sticker_group overflow-auto">
                    {
                        Stickers !== null && Stickers.map((item, index) => {
                            return (
                                <img src={item.stickerImg} alt="" key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default StickerComponent