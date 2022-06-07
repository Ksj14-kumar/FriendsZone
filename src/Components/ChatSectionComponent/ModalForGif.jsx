import Image from '@material-tailwind/react/Image'
import React, { useEffect } from 'react'
import img from "../../assets/img/team-2-800x800.jpg"
import { MdSend } from "react-icons/md"
import { GiphyFetch } from '@giphy/js-fetch-api'





function ModalForGif({ setSelectedGif, selectedGif, senderId, setModal, sendMessage }) {
    const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)
    const [Giphy, setGiPhy] = React.useState([])
    const [selected_Gif_url, setSelected_Gif_URL] = React.useState([])





    async function handleSelect(url) {
        const object = {
            message: url,
            senderId: senderId,
            time: Date.now(),
            type: "GIF",
            messageID: Math.floor(Math.random() * 10000000000)

        }
        setSelected_Gif_URL([...selected_Gif_url, object])
    }


    useEffect(() => {
        setSelectedGif(selected_Gif_url)

    }, [selected_Gif_url])

    async function HandleSubmit() {
        setSelectedGif(selected_Gif_url)
        sendMessage()
        setModal(false)


    }

    // console.log(Giphy)
    console.log({ selected_Gif_url: selected_Gif_url })
    return (
        <>
            <div className="w-screen h-screen bg-[#0a0a0a3a] fixed z-[19] flex   justify-center ">


                <div className="w-[51rem]  mt-[2rem] bg-[#fff] text-black rounded-lg z-[17] p-3 mb-[0rem] overflow-y-auto  overflow-x-hidden" id="selected_Giphy_scroll">
                    <div className="search_input flex">
                        <div className="inpu flex-[10]">
                            <input type="text" name="" id="" className="w-full font-serif text-[1.3rem] border border-solid border-gray-300 rounded-md h-[3rem] focus:outline-none indent-2 tracking-wider" placeholder="Search..."
                                onChange={(e) => {
                                    giphy.search(e.target.value).then(res => {
                                        setGiPhy(res.data)
                                    })
                                }}
                            />
                        </div>
                        <div className="btn_container flex justify-center flex-[2]  ">
                            <button className="btn px-4 py-1 bg-white text-black text-[1.4rem] hover:text-white"
                                onClick={() => {
                                    setModal(false)
                                    setGiPhy([])
                                    setSelected_Gif_URL([])


                                }}
                            >X</button>
                        </div>


                    </div>

                    {selected_Gif_url.length > 0 && <div className="selected_Gif_image relative my-[.8rem]">
                        <p className="text-[1.5rem] text-[#080808] font-serif py-1 text-center underline">Selected Gif

                        </p>
                        {
                            selected_Gif_url.length
                        }
                        <div className="container12 flex flex-wrap gap-2 overflow-y-auto  max-h-[20rem]" id="selected_Gif">

                            {selected_Gif_url.length > 0 && selected_Gif_url.map(item => {
                                return (
                                    <>
                                        <div className="image_container w-[12rem] cursor-pointer">
                                            <Image
                                                src={item.message}
                                                rounded={false}
                                                className="h-full"
                                            />
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <p className="flex justify-end mt-[10px]">
                            <abbr title="Send">
                                <button className="btn relative normal-case"
                                    onClick={() => {
                                        HandleSubmit()
                                        setSelected_Gif_URL([])
                                    }}
                                >
                                    <MdSend className="text-[1.7rem]" />
                                </button>
                            </abbr>
                        </p>
                    </div>}

                    <div className="Gif_container grid md:grid-cols-3 grid-cols-2 mds-editor17:grid-cols-1 grid-row-2  md:grid-row-3 overflow-y-auto gap-[6px] mt-[8px] place-items-center" id="Search_scroll_bar_filter">
                        {
                            Giphy.length > 0 && Giphy.map((item, index) => {
                                return (
                                    <>
                                        <div className="image_container w-[16rem] cursor-pointer"
                                            onClick={() => {
                                                handleSelect(item.images.original.url)
                                            }}
                                        >
                                            <Image
                                                src={item.images.original.url}
                                                rounded={false}
                                                className="h-full"
                                            />
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>

                </div>
            </div>


        </>
    )
}

export default ModalForGif