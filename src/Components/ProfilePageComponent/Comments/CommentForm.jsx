import { useState, useRef, useEffect } from "react";
import Button from "@material-tailwind/react/Button";
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import Icon from "@material-tailwind/react/Icon";
import Picker from 'emoji-picker-react';
import { AiOutlineGif } from "react-icons/ai"
import { BiSticker } from "react-icons/bi"
import { Route, NavLink, Switch, BrowserRouter } from "react-router-dom";
import { GiphyFetch } from '@giphy/js-fetch-api'
import Image from "@material-tailwind/react/Image";
const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)
const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
    commentToggle,
    commentReplyName,
    comment,
    theme,
    backendComments,
    setCommentToggle
}) => {
    const [text, setText] = useState(initialText);
    const buttonRef = useRef()
    const textRef = useRef()
    const [renderComponent, setComponent] = useState(false)
    const [emojiContainer, setShowEmojicontenor] = useState(false)
    const isTextareaDisabled = text.length === 0;  // if text is empty, disable textarea
    const onSubmitHandler = (e) => {
        e.preventDefault()
        textRef.current.focus()
        if (text.length > 0) {
            handleSubmit({ value: text, type: "text" });
            setText("");
        }
    };
    const onEmojiClick = (event, emojiObject) => {
        event.preventDefault()
        setText((pre) => pre + emojiObject.emoji)
    };
    useEffect(() => {
        if (textRef.current) {
            textRef.current.style.height = "0px";
            textRef.current.style.height = textRef.current.scrollHeight + "px";
        }
    }, [text])
    useEffect(() => {
        commentReplyName && setText(`@${commentReplyName}\t`)
        // commentReplyName&&  textRef.current.focus()
    }, [commentReplyName])
    // useEffect(() => {
    //     textRef.current.focus()
    // }, [])
    function sendGiF(value) {
        handleSubmit(value)
        return
    }
    function sendStickers(value) {
        handleSubmit(value)
        return
    }
    return (
        <>
            <BrowserRouter>
                <div className={`md:mr-10 md:ml-[1rem] px-1 ${commentReplyName && "mt-2"}`} id="comment_area_section">
                    <div className="textArea"
                    // dangerouslySetInnerHTML={{ __html: text }}
                    >
                        <textarea
                            ref={textRef}
                            className={`resize-none border border-solid  focus:outline-none  w-full overflow-hidden p-4 rounded-lg text-[1.1rem] font-serif tracking-wider ${theme ? "bg-[#535353] text-[#fff] border-[#7c7c7c]" : "border-[#dad7d7]"}`}
                            placeholder="Write a comment..."
                            onChange={(e) => {
                                setText(e.target.value)
                                e.preventDefault()
                            }}
                            value={text}
                        >
                        </textarea>
                    </div>
                    <section className="bg-red-600  flex justify-end relative ">
                        <Button
                            color=""
                            buttonType=""
                            size="sm"
                            rounded={false}
                            block={false}
                            ripple="none"
                            // disabled={isTextareaDisabled}
                            className={`lowercase absolute -mt-8 p-0  scale-90 ${emojiContainer && "scale-105"}`}
                            iconOnly={true}
                            ref={buttonRef}
                            onClick={() => {
                                setShowEmojicontenor(!emojiContainer)
                            }}
                        >
                            <Icon name={<BsFillEmojiSmileFill className="text-[#ef703d] text-[1.5rem] mb-[8px]" />} />
                        </Button>
                    </section>
                    {emojiContainer && <section className={`emoji gif  ml-0 rounded-md drop-shadow-lg border border-solid ${theme ? "border-[#343434]" : "border-[#e5e5e5]"}`}>
                        <nav className="emoji navigation">
                            <ul className="list of all Stickers flex justify-around  rounded-md">
                                {
                                    [
                                        {
                                            name: "Emoji",
                                            icon: <BsFillEmojiSmileFill className={`text-[1.5rem]  mr-2 ${theme ? "text-[#eb9113]" : "text-[#eb9113]"}`} />
                                        },
                                        {
                                            name: "GIF",
                                            icon: <AiOutlineGif className="text-[1.8rem] text-[#ff1d1d] mr-2" />
                                        },
                                        {
                                            name: "Sticker",
                                            icon: <BiSticker className="text-[1.7rem] text-[#297cef] mr-2" />
                                        }
                                    ].map((i, index) => {
                                        return (
                                            <>
                                                <NavLink to={`${i.name === "Emoji" ? ("/emojiPicker/comment") : (i.name === "GIF" ? "/gif/comment" : (i.name === "Sticker" && "/sticker/comments"))}`}
                                                    activeStyle={{
                                                        borderBottom: "2px solid red",
                                                    }}
                                                    style={{
                                                        width: "100%"
                                                    }}
                                                    key={index}
                                                >
                                                    <div className="w-full"
                                                        key={index}
                                                    >
                                                        <li className={`text ${theme ? "bg-[#181818] text-[#fff]" : "bg-[#d3e2e2] text-[#181818]"} flex w-full py-1 justify-center text-[1.2rem] tracking-wider font-sans items-center rounded-md 
                                                        ${i.name === "Emoji" && "rounded-tr-none rounded-br-none"}
                                                        ${i.name === "GIF" && "rounded-none"}
                                                         ${i.name === "Sticker" && "rounded-tl-none rounded-bl-none"}
                                                         cursor-pointer
                                                         ${renderComponent && "rounded-b-none"}
                                                         }`}
                                                        >
                                                            {i.icon}
                                                            {i.name === "GIF" ? "" : i.name}
                                                        </li>
                                                    </div>
                                                </NavLink>
                                            </>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                        <hr className={theme ? "hidden py-[1px]" : "py-[1px]"} />
                        <main className=" flex flex-wrap" id="comment_emoji">
                            <Switch>
                                <Route exact path="/emojiPicker/comment">
                                    <EmojiComponent setComponent={setComponent} onEmojiClick={onEmojiClick} theme={theme} />
                                </Route>
                                <Route exact path="/gif/comment">
                                    <GifComponent setComponent={setComponent} sendGiF={sendGiF} commentReplyName={commentReplyName} setShowEmojicontenor={setShowEmojicontenor} theme={theme} />
                                </Route>
                                <Route exact path="/sticker/comments">
                                    <StickerComponent setComponent={setComponent} commentReplyName={commentReplyName} setShowEmojicontenor={setShowEmojicontenor} emojiContainer={emojiContainer} sendStickers={sendStickers} theme={theme} />
                                </Route>
                            </Switch>
                        </main>
                    </section>}
                    <section className="flex py-[5px] px-2">
                        <Button
                            color={isTextareaDisabled ? "gray" : "blue"}
                            buttonType="filled"
                            size="sm"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="none"
                            disabled={isTextareaDisabled}
                            className="normal-case  tracking-widest"
                            onClick={(e) => {
                                e.preventDefault()
                                onSubmitHandler(e)
                                if (submitLabel === "Comment") {
                                    // setCommentToggle(false)
                                }
                            }}
                        >
                            {submitLabel}
                        </Button>
                        {hasCancelButton && (
                            <Button
                                color={isTextareaDisabled ? "gray" : "blue"}
                                buttonType="link"
                                size="sm"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="none"
                                onClick={handleCancel}
                                // disabled={isTextareaDisabled}
                                className="ml-1 lowercase"
                            >
                                cancle
                            </Button>
                        )}
                    </section>
                    {/* <Tooltips placement="auto" ref={buttonRef}>
                        <TooltipsContent>
                            <Picker onEmojiClick={onEmojiClick}
                                disableSearchBar={true}
                                disableAutoFocus={true}
                                preload={true}
                                pickerStyle={{
                                    "nav": {
                                        "display": "none",
                                        "visibility": "hidden"
                                    }
                                }
                                } />
                        </TooltipsContent>
                    </Tooltips> */}
                </div>
            </BrowserRouter>
        </>
    );
};
export default CommentForm;
function EmojiComponent({ setComponent, onEmojiClick, theme }) {
    useEffect(() => {
        setComponent(true)
    }, [setComponent])
    return (
        <>
            <Picker onEmojiClick={onEmojiClick}
                disableSearchBar={true}
                disableAutoFocus={true}
                preload={false}
                pickerStyle={{
                    "nav": {
                        "display": "none",
                        "visibility": "hidden"
                    },
                    "width": "100%",
                    "borderTopLeftRadius": "0px",
                    "borderTopRightRadius": "0px",
                    "backgroundColor": theme ? "#060606" : "#fff",
                    ".emoji-scroll-wrapper": {
                        "backgroundColor": "#060606"
                    }
                    // "marginLeft":"5rem"
                }
                } />
        </>
    )
}
function GifComponent({ setComponent, commentReplyName, setShowEmojicontenor, sendGiF, theme }) {
    const [GifList, setGifList] = useState([])
    const [tranding, setTranding] = useState({ tranding: null, trandingList: [] })
    const [love, setLove] = useState([])
    const [family, setFamily] = useState([])
    const [loader, setLoader] = useState(false)
    const [BoolValue, setBoolValue] = useState({ t: false, love: false, family: false })
    const [showTranding, setShowTranding] = useState(false)
    const [showLoveGif, setShowLoveGif] = useState(false)
    const [showFamily, setShowFamily] = useState(false)
    // useEffect(() => {
    const fetchGifs = (offset) => gf.trending({ offset, limit: 10 })
    async function handleChange(value) {
        const Gif = await gf.search(value)
        setGifList(Gif.data)
    }
    useEffect(() => {
        setComponent(true)
    }, [setComponent])
    useEffect(() => {
        async function f1() {
            setLoader(true)
            const Gif = await gf.search("tranding")
            setTranding({ trandingList: Gif.data, tranding: true })
            setLoader(false)
        }
        f1()
    }, [])
    useEffect(() => {
        async function f1() {
            const Gif = await gf.search("love")
            setLove(Gif.data)
        }
        f1()
    }, [])
    useEffect(() => {
        async function f1() {
            const Gif = await gf.search("family")
            setFamily(Gif.data)
        }
        f1()
    }, [])
    return (
        <>
            <div className="wrapper_ flex flex-col overflow-y-auto w-full">
                <nav className={`navigation flex w-full justify-around  cursor-pointer ${theme ? "border-[#1b1b1b] border-b border-b-solid" : "border-[#d8d8d8]  border-b border-b-solid"}`}>
                    <div className={`tranding text-[1.2rem] ${theme ? "bg-[#040404] text-[#fff]" : "bg-[#f2f2f2] text-[#000000]"} w-full flex justify-center  tracking-wide py-1
                    ${BoolValue.t ? "border-b-[2px] border-b-solid border-b-[#0a28ef]" : ""}`}
                        onClick={() => {
                            // setTranding("tranding")
                            setShowTranding(!showTranding)
                            setShowLoveGif(false)
                            setShowFamily(false)
                            setBoolValue({ t: true, love: false, family: false })
                        }}
                    >Tranding</div>
                    <div className={`love tranding text-[1.2rem] ${theme ? "bg-[#040404] text-[#fff]" : "bg-[#f2f2f2] text-[#000000]"} w-full flex justify-center  tracking-wide py-1
                       ${theme ?
                            "border-l-[#282828] border-r-[#3d3d3d] border-r border-l" :
                            "border-l-[#dad8d8] border-r-[#dad8d8] border-r border-l"}
                    ${BoolValue.love ? "border-b-[2px] border-b-solid border-b-[#0a28ef]" : ""}
                    `}
                        onClick={() => {
                            // setTranding("tranding")
                            setShowLoveGif(!showLoveGif)
                            setShowFamily(false)
                            setShowTranding(false)
                            setBoolValue({ t: false, love: true, family: false })
                        }}
                    >Love</div>
                    <div className={`family tranding text-[1.2rem] ${theme ? "bg-[#040404] text-[#fff]" : "bg-[#f2f2f2] text-[#000000]"} w-full flex justify-center  tracking-wide py-1
                    ${BoolValue.family ? "border-b-[2px] border-b-solid border-b-[#0a28ef]" : ""} `}
                        onClick={() => {
                            // setTranding("tranding")
                            setShowFamily(!showFamily)
                            setShowTranding(false)
                            setShowLoveGif(false)
                            setBoolValue({ t: false, love: false, family: true })
                        }}
                    >Family</div>
                </nav>
                <div className="search__Field w-full px-2 py-1">
                    <input type="search" name="" id="" className={`py-1 w-full rounded-md font-serif text-[1rem] pl-3 drop-shadow-lg tracking-wider focus:outline-none mds-editor28:py-1 mds-editor28:text-[1rem] ${theme ? "bg-[#656565] text-white" : "bg-[#fff] text-black"}`} placeholder="Search Gif..."
                        onChange={(e) => {
                            handleChange(e.target.value)
                        }}
                    />
                </div>
                <div className="Gif_containe flex flex-wrap justify-center gap-x-2 gap-y-1 w-full  overflow-y-auto max-h-[21rem] md:max-h-[25rem] pt-1" id="comment_gif_container">
                    {
                        BoolValue.t ? loader ? "loading..." : (tranding.trandingList.length > 0 && tranding.trandingList.map((i, index) => {
                            return (
                                <>
                                    <div className="image flex w-[18rem] cursor-pointer" key={index}
                                        onClick={() => {
                                            sendGiF({ value: i.images.original.url, type: "gif" })
                                            // setSelectGif(i.images.original.url)
                                            if (!commentReplyName) {
                                                setShowEmojicontenor(false)
                                            }
                                        }}
                                    >
                                        <Image
                                            src={i.images.original.url}
                                            rounded={false}
                                            key={index}
                                            className="w-full"
                                        />
                                    </div>
                                </>
                            )
                        })) :
                            BoolValue.love ?
                                (
                                    love.length > 0 && love.map((i, index) => {
                                        return (
                                            <>
                                                <div className="image flex w-[18rem] cursor-pointer" key={index}
                                                    onClick={() => {
                                                        // setSelectGif(i.images.original.url)
                                                        sendGiF({ value: i.images.original.url, type: "gif" })
                                                        if (!commentReplyName) {
                                                            setShowEmojicontenor(false)
                                                        }
                                                    }}
                                                >
                                                    <Image
                                                        src={i.images.original.url}
                                                        rounded={false}
                                                        key={index}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </>
                                        )
                                    })
                                ) : (BoolValue.family ? (
                                    family.length > 0 && family.map((i, index) => {
                                        return (
                                            <>
                                                <div className="image flex w-[18rem] cursor-pointer" key={index}
                                                    onClick={() => {
                                                        // setSelectGif(i.images.original.url)
                                                        sendGiF({ value: i.images.original.url, type: "gif" })
                                                        if (!commentReplyName) {
                                                            setShowEmojicontenor(false)
                                                        }
                                                    }}
                                                >
                                                    <Image
                                                        src={i.images.original.url}
                                                        rounded={false}
                                                        key={index}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </>
                                        )
                                    })
                                ) :
                                    (
                                        (GifList.length > 0 && GifList.map((i, index) => {
                                            return (
                                                <>
                                                    <div className="image flex w-[18rem] cursor-pointer" key={index}
                                                        onClick={() => {
                                                            // setSelectGif(i.images.original.url)
                                                            sendGiF({ value: i.images.original.url, type: "gif" })
                                                            if (!commentReplyName) {
                                                                setShowEmojicontenor(false)
                                                            }
                                                        }}
                                                    >
                                                        <Image
                                                            src={i.images.original.url}
                                                            rounded={false}
                                                            key={index}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </>
                                            )
                                        }))
                                    ))
                    }
                </div>
            </div>
        </>
    )
}
function StickerComponent({ setComponent, commentReplyName, setShowEmojicontenor, emojiContainer, sendStickers }) {
    const [Stickers, setStickes] = useState([])
    async function handleChange(value) {
        const GIfStickers = await gf.search("Stickers")
        setStickes(GIfStickers.data)
    }
    useEffect(() => {
        async function f1() {
            setComponent(true)
            const GIfStickers = await gf.search("Sticker")
            setStickes(GIfStickers.data)
        }
        f1()
    }, [emojiContainer, setComponent, setStickes])
    return (
        <>
            <div className="sticker_component w-full flex flex-col">
                {/* <div className="input_con w-full px-1">
                    <input type="search" name="" id="" placeholder="Stickers...."
                        className="text-[1.2rem] font-serif py-1 pl-2 rounded-md focus:outline-none w-full"
                        onChange={(e) => {
                            handleChange(e.target.value)
                        }}
                    />
                </div> */}
                <div className="show_stickers flex flex-wrap justify-center gap-x-2 gap-y-1 w-full  overflow-y-auto max-h-[21rem] md:max-h-[25rem] pt-1" id="Sticker_scrollbar_comment">
                    {
                        Stickers.length > 0 && Stickers.map((i, index) => {
                            return (
                                <>
                                    <div className="image flex md:w-[14rem] cursor-pointer" key={index}
                                        onClick={() => {
                                            // setStickers(i.images.original.url)
                                            sendStickers({ value: i.images.original.url, type: "gif" })
                                            setShowEmojicontenor(false)
                                            if (!commentReplyName) {
                                            }
                                        }}
                                    >
                                        <Image
                                            src={i.images.original.url}
                                            rounded={false}
                                            key={index}
                                            className="w-full"
                                        />
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
function GifShowComponent({ i }) {
    return (
        <>
            {
                <div className="image flex w-[18rem]">
                    <Image
                        src={i.images.original.url}
                        rounded={false}
                        className="w-full"
                    />
                </div>
            }
        </>
    )
}
function TrandingGif() {
    const [tranding, setTranding] = useState([])
    useEffect(() => {
        async function f1() {
            const Gif = await gf.search("tranding")
            setTranding(Gif.data)
        }
        f1()
    }, [setTranding])
    return (
        <>
            {
                tranding.length > 0 && tranding.map((i, index) => {
                    return (
                        <>
                            <div className="image flex w-[18rem]" key={index}>
                                <Image
                                    src={i.images.original.url}
                                    rounded={false}
                                    className="w-full"
                                />
                            </div>
                        </>
                    )
                })
            }
            <p>tranding</p>
        </>
    )
}
function LoveGif() {
    const [love, setLove] = useState([])
    useEffect(() => {
        async function f1() {
            const Gif = await gf.search("tranding")
            setLove(Gif.data)
        }
        f1()
    }, [])
    return (
        <>
            {
                love.length > 0 && love.map((i, index) => {
                    return (
                        <>
                            <div className="image flex w-[18rem]" key={index}>
                                <Image
                                    src={i.images.original.url}
                                    rounded={false}
                                    className="w-full"
                                />
                            </div>
                        </>
                    )
                })
            }
            <p>love</p>
        </>
    )
}