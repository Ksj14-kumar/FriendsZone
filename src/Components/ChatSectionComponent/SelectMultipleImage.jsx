import Image from '@material-tailwind/react/Image'

import React, { useEffect} from 'react'
import { MdAdd, MdSend } from "react-icons/md"
import { success, error } from "../../toastifyMessage/Toast"

function SelectMultipleImage({ setImageFileSelector, setImageGroupURl, imageGroupURl, senderId, SendMessage, imageSentLoader }) {
    const [imagelocalUrl, setImageLocalUrl] = React.useState([])



    // {
    //     message: textMessage,
    //     senderId: user,
    //     time: Date.now(),
    //     type: fileType,
    //     messageID: MessageId,

    //   }



    function SelectFiles(e) {
        e.preventDefault()
        const Files = e.target.files[0]
        if (Files.type === "image/png" || Files.type === "image/jpeg" || Files.type === "image/jpg" || Files.type === "image/gif" || Files.type === "image/webp" || Files.type === "image/svg+xml" || Files.type === "video/mp4" || Files.type === "video/webm" || Files.type === "video/ogg" || Files.type === "audio/mp3" || Files.type === "audio/ogg" || Files.type === "audio/wav" || Files.type === "audio/mpeg") {
            if (Files.size <= 35651584) {
                const Url = URL.createObjectURL(Files)
                const reader = new FileReader();
                reader.readAsDataURL(Files)


                reader.onload = (e) => {
                    // setImagebase64Url(prev => [...prev, e.target.result])
                    // setBase64Url()
                    setImageLocalUrl(prev => [...prev, {
                        message: Url,
                        senderId: senderId,
                        time: Date.now(),
                        type: Files.type.split("/")[0],
                        messageID: Math.floor(Math.random() * 10000000000),
                        base64URl: e.target.result
                    }])
                }


            }
            else {
                error({ message: "file size is too large, select less than 52 MB", pos: "top-right" })
                return
            }
        }
    }


    function filterImages(item) {
        const filter = imagelocalUrl.filter(value => value !== item)
        setImageLocalUrl(filter)
    }

    useEffect(() => {
        setImageGroupURl([...imagelocalUrl])
    }, [imagelocalUrl])



    return (
        <>
            <div className="select-multiple-image absolute h-screen w-screen bg-[#4a4949] z-[22] overflow-x-hidden" id="imageSelectOverlay">
                <div className="_inner flex flex-col">
                    <div className="  text-white text-[2.2rem] flex justify-end">
                        <button
                            onClick={() => {
                                setImageFileSelector(false)
                            }}
                            className="btn mr-[2rem] mt-[.8rem] text-white text-lg"
                        >X</button>
                    </div>
                    <div className="_image_wrapper  mx-[1rem] md:mx-[8rem]  mds-editor8:h-[45rem] rounded overflow-hidden" id="outer_image_section">
                        <div className="file_upload rounded-md bg-[#570a5798] mx-[1rem] flex  flex-col  mt-[8px]  h-full  relative overflow-y-auto" id="image_select_scrollbar">
                            {/* overflow-x-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 */}
                            <div className="_image_wrapper  flex gap-x-1 gap-y-1 flex-wrap justify-center over">
                                {/* , 6, 6, 7, 8,6,7,8,9,34,2,4 */}
                                {imagelocalUrl.length > 0 && imagelocalUrl.map(item => {
                                    return (
                                        <div className="wrap  flex  flex-shrink-0 md:w-[24rem] md:h-[24rem] w-[18rem] h-[20rem] cursor-pointer relative">{
                                            item.type === "image" ? (<Image
                                                src={item.message}
                                                rounded={false}
                                                className="flex-shrink-0"
                                            />) :
                                                (item.type === "video" ?
                                                    <video className="flex-shrink-0" src={item.message} controls></video> :
                                                    (
                                                        item.type === "audio" && <audio className="flex-shrink-0" src={item.message} controls></audio>
                                                    )

                                                )
                                        }


                                            <button className="btn rounded-full fixed z-[16] text-[1.4rem] ml-[5px] bg-
                                        [#d60404a5] "
                                                onClick={(e) => {
                                                    filterImages(item)

                                                }}
                                            >X</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="inner_again flex flex-col justify-center items-center fixed top-[40%] left-[42%] ">
                            <abbr title="Add Photos">
                                {/* <label htmlFor="#fileSelect"> */}
                                <label htmlFor="fileSelect" className="btn text-[5rem] text-white bg-gray-500 flex justify-center items-center w-[6rem] h-[6rem] -pt-[2px] rounded shadow-md cursor-pointer p-0 mds-editor8:w-[4rem] mds-editor8:h-[4rem] mds-editor8:text-[4rem]" id="addImage">
                                    <MdAdd />
                                </label>
                                <input type="file" id="fileSelect" className="hidden"
                                    onChange={(e) => {
                                        SelectFiles(e)
                                    }}
                                />
                            </abbr>
                            {imagelocalUrl.length > 0 && <abbr title="Send">
                                <p className="btn text-[5rem] text-white flex justify-center items-center w-[15rem] h-[6rem] -pt-[2px] rounded shadow-md cursor-pointer p-0 mds-editor8:w-[4rem] mds-editor8:h-[4rem] mds-editor8:text-[4rem] mt-2" id="sendButton"
                                    onClick={() => {
                                        // setImageGroupURl(imagelocalUrl)
                                        SendMessage()
                                        setImageFileSelector(false)
                                        if (imageSentLoader) {
                                            if (imageSentLoader === false) {
                                            }
                                        }
                                    }}
                                >
                                    <MdSend />
                                </p>
                            </abbr>
                            }
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default SelectMultipleImage