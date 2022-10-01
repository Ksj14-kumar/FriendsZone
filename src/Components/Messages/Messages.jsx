import RightSide from '../UserFeed/RightSide';
import FriendsList from './FriendsList';
import { useRouteMatch, useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatFoolter from './ChatFoolter';
import AdminMessage from './AdminMessage';
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardHeader from "@material-tailwind/react/CardHeader";
import H5 from "@material-tailwind/react/Heading5";
function Messages({ user }) {
    const [textMessage, setTextMessage] = useState('');
    const [message, setMessage] = useState('');
    const [currentChat, setCurrentChat] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [active, setActive] = useState(false)
    const [Info, setInfo] = useState(null)
    const [conversations, setConversations] = useState([]);
    const [chatMessage, setChatMessage] = useState([])
    const [typing, setTyping] = useState(false)
    const [update, setUpdate] = useState(null)
    const scrollRef = useRef()
    const socket = useRef();
    const activeRef = useRef();
    const { path } = useRouteMatch()
    const params = useParams()
    const dispatch = useDispatch()
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    //reconnect to the socket
    useEffect(() => {
        socket.current = io("ws://localhost:5355");
        socket.current.on('typingIndi', (data) => {
        })
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                time: Date.now()
            })
        })
    }, [])
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) &&
            setChatMessage((pre) => [...pre, arrivalMessage])
    }, [arrivalMessage, currentChat])
    useEffect(() => {
        socket.current.emit("addNewMessageUser", UserInformationLoad?.googleId);
        socket.current.on("getOnlineUsers", (data) => {
        })
    }, [UserInformationLoad])
    async function SentMessage() {
        if (textMessage) {
            setTyping(false)
            const receiverId = currentChat?.members.find(m => m != UserInformationLoad?.googleId)
            socket.current.emit('typing', { typing: false, receiverId, senderId: UserInformationLoad?.googleId })
            socket.current.emit("sendMessage", {
                senderId: UserInformationLoad?.googleId,
                receiverId,
                text: textMessage
            })
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/chatmessages`, {
                    method: 'POST',
                    body: JSON.stringify({
                        text: textMessage,
                        conversationId: currentChat?._id,
                        senderId: UserInformationLoad?.googleId,
                        time: Date.now()
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                    }
                })
                const data = await response.json()
                if (response.status === 200) {
                    setTextMessage('')
                    setChatMessage([...chatMessage, data.message])
                }
                else if (response.status !== 200) {
                    return
                }
            } catch (err) {
            }
        }
    }
    useEffect(() => {
        async function fetchConversations() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/conversation/${UserInformationLoad?.googleId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                    }
                })
                const data = await res.json()
                if (res.status === 200) {
                    setConversations(data.data)
                }
                else if (res.status !== 200) {
                    return
                }
            } catch (err) {
            }
        }
        fetchConversations()
    }, [UserInformationLoad])
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/chatmessages/${currentChat?._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem("uuid"),
                    }
                })
                const data = await res.json()
                if (res.status === 200) {
                    setChatMessage(data.data)
                }
                else if (res.status !== 200) {
                    return
                }
            } catch (err) {
            }
        }
        load()
    }, [currentChat])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessage])
    return (
        <>
            <div className="top_container flex justify-center bg-blue-600 mds-editor23:w-full mds-editor23:block">
                <div className='text-center md:mt-[5rem] mt-[7rem]   fixed   md:left-[18rem] mds-editor23:w-full '
                >
                    <CardHeader color="cyan" size="sm" className="h-[4rem] md:-mt-[1rem] md:w-[64rem] mb-[.5rem] md:mb-[0rem] md:block hidden ">
                        <H5 color="white">Chats</H5>
                    </CardHeader>
                    <div className={`user_chat_on_top  h-[4rem] -mt-[2.8rem] md:-mt-[1rem] mb-[.5rem] md:mb-[0rem]  border border-solid border-[#d5d5d5]  md:hidden block bg-[#b1b1b1] rounded-md  `}>
                    </div>
                    <div className="container1   md:w-[64rem] md:mr-[10rem] flex  relative  justify-center  mb-[3rem] md:mt-[.8rem]" id='second_wrapper'
                    >
                        <aside className="left bg-[#ecebebf0] rounded-md border border-solid border-grey-500  drop-shadow-md    flex-col relative w-[20.7rem] md:block hidden ">
                            <section className="top pt-2 pb-6  fixed mds-editor23:w-full text-center w-full z-[999] bg-[#001D6E] text-[#fff] rounded-b-2xl rounded-t-sm ">
                                <div className="inner_search flex justify-center px-2 ">
                                    <p className='text-[1.2rem] tracking-wide font-medium underline cursor-pointer'>Recently Chats</p>
                                </div>
                            </section>
                            <hr className='h-[1px] bg-[#c6c5c5]' />
                            <section className="bottom mt-[11px] overflow-y-auto relative top-[3rem] w-full h-full bg-[#005555] pt-2 rounded-t-2xl " id='chatUser'>
                                {
                                    conversations.map((conversation, index) => {
                                        return (
                                            <div className={`friends_list   `}
                                                key={index}
                                                onClick={() => {
                                                    setCurrentChat(conversation)
                                                }}
                                            >
                                                <FriendsList conversation={conversation} user={UserInformationLoad?.googleId} key={index} active={active} setInfo={setInfo} />
                                            </div>
                                        )
                                    })
                                }
                            </section>
                        </aside>
                        <aside className="right_side   flex-1 border border-solid border-[#d8d7d7ba] rounded-md  md:w-[43.3rem] flex  flex-col justify-between relative w-[43.3rem] mds-editor23:w-full  " id="conversation">
                            <ChatHeader info={Info} />
                            {
                                currentChat ? (
                                    <>
                                        <div className="body flex flex-col overflow-y-auto  w-[43.3rem] mds-editor23:w-full   -mt-[0rem] " id='chat-box chat_box' >
                                            <p className='text-[1.4rem] tracking-wide w-full bg-[#c6c6c60e] text-[#101010ea] py-1 '>Start Conversation</p>
                                            <div className="chats" id='chats'>
                                                {
                                                    chatMessage
                                                    && chatMessage.map((chat, index) => {
                                                        return (
                                                            <div className="scrol" ref={scrollRef} key={index}>
                                                                <AdminMessage own={chat.senderId === UserInformationLoad?.googleId} message={chat} info={Info} setTyping={setTyping} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <footer className='  flex flex-col bg-[#ecebebf0] py-[.5rem] px-[.2rem] border-t border-t-solid border-[#b4b4b4] '>
                                            <ChatFoolter textMessage={textMessage} setTextMessage={setTextMessage} SentMessage={SentMessage} setTyping={setTyping} socket={socket} currentChat={currentChat} UserInformationLoad={UserInformationLoad?.googleId} />
                                        </footer>
                                    </>
                                ) : (
                                    <NoConversation />
                                )
                            }
                        </aside>
                    </div>
                    <RightSide />
                </div>
            </div>
        </>
    )
}
export default Messages
function NoConversation() {
    return (
        <>
            <p className='text-[2.1rem]   flex w-full text-[#b4b3b3] tracking-wide justify-center select-none '>
                No Conversation here, choose one
            </p>
        </>
    )
}