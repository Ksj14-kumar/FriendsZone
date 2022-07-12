import React, { useState, useEffect, useRef } from 'react'
import Image from '@material-tailwind/react/Image';
import { useParams, useHistory, useLocation } from "react-router-dom"
import MessageChatHeader from '../Components/ChatSectionComponent/CenterChatSection/MessageChatHeader'
import MessageBox from '../Components/ChatSectionComponent/CenterChatSection/MessageBox'
import { IoIosSend } from "react-icons/io"
import { AiOutlineGif } from "react-icons/ai"
import { ImAttachment } from "react-icons/im"
import { MdImage } from "react-icons/md"
import { IoChatbubblesSharp } from "react-icons/io5"
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux"
import Instance from "../Config/Instance"
import { Puff } from 'react-loader-spinner'
import { error } from "../toastifyMessage/Toast"
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import OverlayEffexct from '../Components/ChatSectionComponent/OverlayEffexct'
import Photo from "../assets/img/download.png"
import { motion } from 'framer-motion'
import VideoOverlay from '../Components/ChatSectionComponent/VideoOverlay'
import Picker from "emoji-picker-react"
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import SelectMultipleImage from '../Components/ChatSectionComponent/SelectMultipleImage'
import ModalForGif from '../Components/ChatSectionComponent/ModalForGif'
import CreateRoom from '../Components/ChatSectionComponent/CreateRoom'
import RoomChatInfo from '../Components/ChatSectionComponent/RoomChatInfo'
import SearchFriendsForGroupChat from '../Components/ChatSectionComponent/SearchFriendsForGroupChat'
import GroupMessageBox from "../Components/ChatSectionComponent/GroupMessageBox"
import SimpleLeft from '../Components/ChatSectionComponent/SimpleLeft'
import { Error } from '../Components/Toastify';
import Axios from "axios"
import InternetDetection from '../Components/InternetDetection';







function ChatSection({ user, socket }) {
  const [bool, setBool] = useState(false)
  const [overlayObject, setOverlayObject] = useState({ url: "", type: "", bool: false })
  const [textMessage, setTextMessage] = useState('')
  const [currentChat, setcurrentChat] = useState([])
  const [arivalMessage, setArrivalMessages] = useState(null)
  const [converzationList, setConvertionUsersList] = useState([])
  const [chatHeader, setChatHeader] = useState([])
  const [fileType, setFileType] = useState("")
  const [loader, setLoader] = useState(false)
  const [uploadLoaderMessage, setUploadLoaderMessage] = useState("")
  const [err, setErr] = useState(false)
  const [TextMessageBase64, setTextMessageBase64] = useState("")
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [searchfriends, setSearchFriends] = useState([])
  const [searchBool, setSearchBool] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState("")
  const [btnGroup, setButtonGroup] = useState(false)
  const [videoOverlay, setVideoOverlay] = React.useState(false);
  const [callerDetails, setCallerDetails] = useState(null)
  const [sendMessageLoader, setSentMessageLoader] = useState("")
  const [unseenMessage, setUnseenMessage] = useState(0)
  const [footerModal, setFooterModal] = useState(false)
  const [messageLoader, setMessageLoader] = useState(false)
  const [messageId, setMessageId] = useState([])
  const [imageGroupURl, setImageGroupURl] = useState([])
  const [ImageSelector, setImageFileSelector] = useState(false)
  const [selectedGif, setSelectedGif] = useState([])
  const [docID, setID] = useState(null)
  const [stickerDrawer, setStickerDrawer] = useState(false)
  const [AllImages, setAllImages] = useState([])
  const [Modal, setModal] = useState(false)
  const [Rooms, setRooms] = useState([])
  const [RoomData, setRoomData] = useState([])
  const [RoomChatHeader, setRoomChatHeader] = useState(false)
  const [ModalForFriends, setModalForFriends] = useState(false)
  const [groupMembers, setGroupMembers] = useState([])
  const [groupMessages, setGroupMessages] = useState([])
  const [groupMessageLoader, setGroupMessageLoader] = useState(false)
  const [arrivalGroupMessages, setArrivalGroupMessages] = useState(null)
  const [imageSentLoader, setImageSentLoader] = useState(false)
  const [SingleChatLoader, setSingleUserChatLoader] = useState(false)
  const [blockUser, setBlokedUser] = useState(false)
  const [searchQuery, setQuery] = useState("")
  const history = useHistory()
  const params = useParams()
  const Video = useRef()
  const Files = useRef()
  const textarea = useRef()
  let timeout = undefined;
  const { search } = useLocation()
  const query = new URLSearchParams(search);
  const q = query.get("q")
  const liveFriends = useSelector((state) => {
    return state.OnlineUsers
  })
  const UserInformationLoad = useSelector((state) => {
    return state.UserInformationLoad.value
  })
  //now post message to api for Rooms
  useEffect(() => {
    async function GetAllRooms() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/rooms/getAllRooms`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
            "roomAdmin": UserInformationLoad?._id,
          }
        })
        const resData = await res.json()
        if (res.status === 200) {
          setRooms(resData)
        }
        else if (res.status !== 200) {
          setRooms([])
        }
      }
      catch (err) {
        console.warn(err)
      }
    }
    GetAllRooms()
  }, [])
  useEffect(() => {
    socket?.on('getMessage', (message) => {
      setArrivalMessages(message)
    })
    socket?.on('getGroupMessage', (message) => {
      setArrivalGroupMessages(message)
    })
    socket?.on("display", (data) => {
      setIsTyping(data.typing)
    })
  }, [textMessage])
  async function SelectImage(e) {
    const file = e.target.files[0]
    if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/gif" || file.type === "image/webp" || file.type === "image/svg+xml" || file.type === "video/mp4" || file.type === "video/webm" || file.type === "video/ogg") {
      if (file.size <= 35651584) {
        const ImageUrl = URL.createObjectURL(file)
        setTextMessage(ImageUrl)
        setFileType(file.type.split("/")[[0]])
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64 = reader.result;
          setTextMessageBase64(base64)
        }
      }
      else {
        error({ message: "file size is too large, select less than 35 MB", pos: "top-right" })
        return
      }
    }
    else {
      return
    }
  }
  //now check the user enter Room id is valid or not
  useEffect(() => {
    async function CheckRoomId() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/rooms/check`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
            "roomId": q,
          }
        })
        const resData = await res.json()
        if (res.status === 200) {
        }
        else if (res.status === 404) {
          history.push("/")
          return
        }
        else if (res.status !== 200) {
          history.push("/")
        }
      }
      catch (err) {
      }
    }
    q?.length === 9 && CheckRoomId()
  }, [q])
  //send message to the server
  async function SendMessage(e) {
    const MessageId = Math.floor(Math.random() * 1000000)
    if (textMessage.length === 0) {
      setErr(true)
    }
    setImageSentLoader(true)
    if (q?.length === 9) {
      const MessageGroupId = Math.floor(Math.random() * 100000000)
      const isMember = await groupMembers.some((member) => {
        return member._id === UserInformationLoad?._id
      })
      if (isMember) {
        try {
          if (textMessage) {
            socket.emit("sendGroupMessage", {
              receiverId: UserInformationLoad?.googleId,
              name: UserInformationLoad?.fname + " " + UserInformationLoad?.lname,
              userId: UserInformationLoad?._id,
              url: UserInformationLoad?.url,
              message: textMessage,
              messageId: MessageGroupId,
              roomId: q,
              time: Date.now(),
              type: "text",
            })
            const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/group/message/save`, {
              method: "POST",
              body: JSON.stringify({
                name: UserInformationLoad?.fname + " " + UserInformationLoad?.lname,
                userId: UserInformationLoad?._id,
                url: UserInformationLoad?.url,
                message: textMessage,
                messageId: MessageGroupId,
                roomId: q,
                time: Date.now(),
                type: "text",
              }),
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
                "Content-Type": "application/json",
              }
            })
            const data = await res.json()
            if (res.status === 200) {
              setGroupMessages(data.result.RoomMessages)
              setTextMessage("")
            }
            else if(res.status===455){
              error({message:"can't not send message, you blocked this user"})
            }
            else if (res.status !== 200) {
              error({ message: "not send", pos: "top-right" })
            }
          }
          else if (selectedGif.length > 0) {
            const value = currentChat !== undefined ? currentChat : ""
            try {
              selectedGif.forEach(async (gif) => {
                const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/group/message/save`, {
                  method: "POST",
                  body: JSON.stringify({
                    name: UserInformationLoad?.fname + " " + UserInformationLoad?.lname,
                    userId: UserInformationLoad?._id,
                    url: UserInformationLoad?.url,
                    message: gif.message,
                    messageId: MessageGroupId,
                    roomId: q,
                    time: Date.now(),
                    type: gif.type
                  }),
                  headers: {
                    "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
                    "Content-Type": "application/json",
                  }
                })
                const data = await res.json()
                if (res.status === 200) {
                  setGroupMessages(data.result.RoomMessages)
                }
                else if(res.status===455){
                  error({message:"can't not send message, you blocked this user"})
                }
                else if (res.status !== 200) {
                  error({ message: "not send", pos: "top-right" })
                }
              })
            }
            catch (err) {
              console.warn(err)
            }
          }
          else if (imageGroupURl.length > 0) {
            setImageSentLoader(true)
            imageGroupURl.forEach(async (img) => {
              const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/group/message/save`, {
                method: "POST",
                body: JSON.stringify({
                  name: UserInformationLoad?.fname + " " + UserInformationLoad?.lname,
                  userId: UserInformationLoad?._id,
                  url: UserInformationLoad?.url,
                  message: img.message,
                  messageId: MessageGroupId,
                  roomId: q,
                  time: Date.now(),
                  type: img.type
                }),
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
                  "Content-Type": "application/json",
                }
              })
              const data = await res.json()
              if (res.status === 200) {
                setImageSentLoader(false)
                setGroupMessages(data.result.RoomMessages)
              }
              else if(res.status===455){
                error({message:"can't not send message, you blocked this user"})
              }
              else if (res.status !== 200) {
                setImageSentLoader(false)
                error({ message: "not send", pos: "top-right" })
              }
            })
          }
        } catch (err) {
          console.warn(err)
        }
      }
      return
    }
    if (selectedGif.length > 0) {
      const value = currentChat !== undefined ? currentChat : ""
      selectedGif.forEach(async (gif) => {
        socket.emit("sendMessage", {
          ...gif,
          receiverId: q
        })
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/messages/send`, {
          method: "POST",
          body: JSON.stringify(
            {
              message: gif.message,
              friend_id: q,
              adminId: user,
              type: gif.type,
              messageID: gif.messageID,
              seen: false,
              time: gif.time
            }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        })
        const resData = await res.json()
        if (res.status === 200) {
          setcurrentChat([...resData.result.messages])
          setSelectedGif([])
        }
        else if (res.status !== 200) {
          setMessageId([...messageId, res.messageId])
          setSentMessageLoader("not")
          setUploadLoaderMessage(false)
        }
        else if(res.status===455){
          error({message:"can't not send message, you blocked this user"})
        }
      })
    }
    //send the group images to users
    if (imageGroupURl.length > 0) {
      const value = currentChat !== undefined ? currentChat : ""
      // setcurrentChat([...value, ...imageGroupURl])
      setImageSentLoader(true)
      imageGroupURl.forEach(async (item) => {
        try {
          socket.emit("sendMessage", {
            ...item,
            receiverId: q
          })
          const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/messages/send`, {
            method: "POST",
            body: JSON.stringify(
              {
                message: item.message,
                friend_id: item.senderId,
                adminId: user,
                type: item.type,
                messageID: item.messageID,
                seen: false,
                time: item.time,
                base: item.base64URl
              }),
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("uuid")}`
            }
          })
          const resData = await res.json()
          if (res.status === 200) {
            // setMessageId([...messageId, item.messageID])
            setcurrentChat([...resData.result.messages])
            setImageGroupURl([])
            setImageSentLoader(false)
          }
          else if(res.status===455){
            error({message:"can't not send message, you blocked this user"})
          }
          else if (res.status !== 200) {
            setMessageId([...messageId, res.messageId])
            setSentMessageLoader("not")
            setUploadLoaderMessage(false)
            setImageSentLoader(false)
            error({ message: "not send", pos: "top-right" })
          }
        }
        catch (err) {
          console.warn(err)
        }
      })
      setImageSentLoader(false)
    }
    //send the text messsage to the user
    if (textMessage.trim().length > 0) {
      try {
        socket.emit("sendMessage", {
          message: textMessage,
          senderId: user,
          receiverId: q,
          time: Date.now(),
          type: fileType,
          messageID: MessageId
        })
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/messages/send`, {
          method: "POST",
          body: JSON.stringify(
            {
              message: fileType === "image" ? (TextMessageBase64) : (fileType === "video" ? (TextMessageBase64) : (textMessage)),
              friend_id: q,
              adminId: user,
              time: Date.now(),
              type: fileType,
              messageID: MessageId,
              seen: false,
            }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        },
        )
        const resData = await res.json()
        if (res.status === 200) {
          setcurrentChat([...resData.result.messages])
          setSentMessageLoader("success")
          setTextMessageBase64("")
          setTextMessage("")
        }
        else if(res.status===455){
          error({message:"can't not send message, you blocked this user"})
        }
        else if (res.status === 500) {
          setMessageId([...messageId, resData.messageId])
          setUploadLoaderMessage(false)
          textMessage.includes("blob:http://") && (setTextMessageBase64("") || setTextMessage(""))
          error({ message: "not send", pos: "top-right" })
        }
        else if (res.status !== 200) {
          setMessageId([...messageId, resData.messageId])
          setSentMessageLoader("not")
          setUploadLoaderMessage(false)
          error({ message: "not send", pos: "top-right" })
        }
      }
      catch (err) {
        console.warn(err)
      }
    }
  }
  async function ChatMessageFunction(e) {
    setTextMessage(e.target.value)
    setFileType("text")
  }
  //getMessages
  useEffect(() => {
    async function getMessages() {
      try {
        setMessageLoader(true)
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/messages/get/${user}/${q}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        })
        const resData = await res.json()
        if (res.status === 200) {
          setMessageLoader(false)
          setID(resData._id)
          setcurrentChat(resData.messages)
          const FilterImagesMessagesOnly = resData.messages.filter(item => item.type === "image")
          setAllImages(FilterImagesMessagesOnly)
        }
        else if (res.status !== 200) {
          setMessageLoader(false)
          setcurrentChat([])
        }
      } catch (err) {
        console.warn(err)
      }
    }
    q.length > 9 && getMessages()
  }, [q, socket])
  //getallConversetaion recently chat
  useEffect(() => {
    async function getAllConversation() {
      try {
        setLoader(true)
        const resData = await Instance.get(`/api/v1/messages/getAllConversation/${user}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        })
        if (resData.status === 200) {
          setLoader(false)
          setConvertionUsersList(resData.data)
          setBlokedUser(resData.data[0].block)
        }
        else if (resData.status !== 200) {
          setLoader(false)
          setConvertionUsersList([])
        }
      }
      catch (err) {
      }
    }
    q.length > 9 && getAllConversation()
  }, [])
  // user, socket
  //getuser details
  useEffect(() => {
    async function get_Friends_users_Details() {
      try {
        setSingleUserChatLoader(true)
        const resData = await Instance.get(`/api/v1/users/${q}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        })
        if (resData.status === 200) {
          setChatHeader({ ...resData.data })
          setSingleUserChatLoader(false)
        }
        else if (resData.status !== 200) {
          setChatHeader({})
          setSingleUserChatLoader(false)
        }
      }
      catch (err) {
        console.warn(err)
      }
    }
    q?.length > 9 && get_Friends_users_Details()
  }, [q])
  useEffect(() => {
    arivalMessage && setcurrentChat([...currentChat, arivalMessage])
  }, [arivalMessage])
  function typingTimeout() {
    setTyping(false)
    socket.emit('typing', { id: q, typing: false })
  }
  //search friends for send message 
  async function SearchFriend(e) {
    try {
      setSearchInputValue(e.target.value)
      const resData = await Instance.post(`/api/v1/users/search/q?q=${e.target.value}`, {
        "limit": 10,
        id: user
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("uuid")}`
        }
      })
      if (resData.status === 200) {
        setSearchFriends(resData.data)
      }
      else if (resData.status !== 200) {
        setSearchFriends([])
      }
    } catch (err) {
      console.warn(err)
    }
  }
  useEffect(() => {
    socket?.on("sendRing", (data) => {
      setCallerDetails(data)
    })
  }, [videoOverlay])
  //now get the Rooms messages  from server
  useEffect(() => {
    async function getGroupMembers() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/messages/get/${q}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        })
        const resData = await res.json()
        if (res.status === 200) {
          setRoomData(resData)
          setGroupMembers(resData.RoomMembers)
        }
        else if (res.status !== 200) {
        }
      }
      catch (err) {
        console.warn(err)
      }
    }
    q?.length === 9 && getGroupMembers()
  }, [q])
  useEffect(() => {
    async function getRoomsMessages() {
      try {
        setGroupMessageLoader(true)
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/group/messages/get/${q}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        })
        const resData = await res.json()
        if (res.status === 200) {
          setGroupMessageLoader(false)
          setGroupMessages(resData.result)
        }
        else if (res.status !== 200) {
          setGroupMessageLoader(false)
        }
      }
      catch (err) {
        console.warn(err)
      }
    }
    q?.length === 9 && getRoomsMessages()
  }, [q])
  useEffect(() => {
    arrivalGroupMessages && setGroupMessages([...groupMessages, arrivalGroupMessages])
  }, [arrivalGroupMessages])
  useEffect(() => {
    if (textarea.current) {
      textarea.current.style.height = "0px";
      const scrollHeight = textarea.current.scrollHeight;
      textarea.current.style.height = scrollHeight + "px";
    }
  }, [textMessage])
  //search messages on the search field values
  useEffect(() => {
    const filterMessages = currentChat.filter((item) => {
      return item.message?.toLowerCase()?.includes(searchQuery.toLowerCase())
    })
  }, [searchQuery])
  //delete the message
  async function deleteMessage(value) {
    try {
      socket?.emit("deleteMessage", { value, friendId: q, currentId: user })
      setcurrentChat(currentChat.filter(item => item._id !== value._id))
      const res = await Axios({
        url: `${process.env.REACT_APP_API_BACKENDURL}/api/v1/delete/message`,
        method: "DELETE",
        data: { value, currentId: user, friendId: q },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("uuid")}`
        }
      })
    }
    catch (err) {
      error({ message: "Not Delete, try again", pos: "top-right" })
    }
  }
  //get delete message using socket
  useEffect(() => {
    socket?.on("deleteMessage", (data) => {
      setcurrentChat(currentChat.filter((item => item._id !== data.value._id)))
    })
  }, [socket, currentChat])
  //unblocked and block user 
  useEffect(() => {
    try {
      (async function () {
        const res = await Axios({
          url: `${process.env.REACT_APP_API_BACKENDURL}/api/v1/block/user`,
          method: "PUT",
          data: { currentId: user, friendId: q, blockUser },
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        })
      })()
    } catch (err) {
    }
  }, [blockUser])
  return (
    <>
      {
        Modal && <ModalForGif setSelectedGif={setSelectedGif} selectedGif={selectedGif} senderId={user} setModal={setModal} sendMessage={SendMessage} />
      }
      {
        bool &&
        <OverlayEffexct setBool={setBool} overlayObject={overlayObject} setOverlayObject={setOverlayObject} bool={bool} AllImages={AllImages} />
      }
      {
        callerDetails ? (<VideoOverlay videoOverlay={videoOverlay} setVideoOverlay={setVideoOverlay} socket={socket} anotherUserId={q} />) : videoOverlay && <VideoOverlay videoOverlay={videoOverlay} setVideoOverlay={setVideoOverlay} socket={socket} anotherUserId={q} />
      }
      {
        ImageSelector && <SelectMultipleImage setImageFileSelector={setImageFileSelector} setImageGroupURl={setImageGroupURl} imageGroupURl={imageGroupURl} senderId={user} SendMessage={SendMessage} imageSentLoader={imageSentLoader} />
      }
      {
        ModalForFriends && <SearchFriendsForGroupChat setModalForFriends={setModalForFriends} RoomData={RoomData} setGroupMembers={setGroupMembers} />
      }
      <InternetDetection/>
      <div className="top_container flex justify-center  mds-editor23:w-full mds-editor23:block" id='top_chat_container '>
        {/* ======================================LEFT SIDE OF CHAT SECTION=================================== */}
        {/* {liveFriends !== undefined && liveFriends.length > 0 && <aside id="live_top_users" className=" md:hidden mt-[4.2rem] flex w-full   fixed bg-[#d0d0d0] ">
          <ChatUSerSwiper liveFriends={liveFriends} />
        </aside>} */}
        {/* <hr className="block md:hidden" /> */}
        <div className={`'text-center md:mt-[5rem]     fixed   md:left-[18rem] mds-editor23:w-full md:w-[85rem]  flex h-full rounded-sm   flex-wrap  
        md:mr-[5rem]    justify-center z-[18] md:z-[0]`} id='chat_container'>
          <aside className="left_section md:flex-[3]  bg-[#dbdbdb] relative rounded-sm  md:block hidden" id="left_chat_section">
            <div className="top_search py-[1.2rem] px-[1rem] flex drop-shadow-sm">
              <input type="text" placeholder="Search" className="search_input  rounded-md py-[.7rem] outline-none focus:outline-none indent-4 tracking-wider font-serif w-full pr-[3.5rem]"
                onChange={
                  SearchFriend
                }
                onFocus={() => { setSearchBool(true) }}
              />
              <button className="search_icon absolute top-[19px] right-[27px] text-[1.5rem] focus:outline-none">
                <i className="fas fa-search text-[1.5rem] text-[#cacaca]"></i>
              </button>
            </div>
            <hr className="bg-[#dfdfdf]" />
            <div className="bottom_users  py-[.4rem] overflow-y-auto ">
              {
                (searchBool && searchInputValue.length > 0) ? (
                  <div className="live_user_from_search flex flex-col overflow-y-auto w-full overflow-x-hidden">
                    {
                      searchfriends.length > 0 ? searchfriends.map((user, index) => {
                        return (
                          <SearchFriendsForMessage userD={user}
                            setSearchBool={
                              setSearchBool
                            }
                          />
                        )
                      }) : <NoUserForMessageSend />
                    }
                  </div>
                )
                  :
                  (converzationList.length > 0 ? (
                    <SimpleLeft converzationList={converzationList} current={user} setChatHeader={setChatHeader} socket={socket} />
                  ) : (
                    <NoChat />
                  ))
              }
            </div>
          </aside>
          {/* ============================================== CENTER SECTION CHAT SECTION================ */}
          <aside className="chat_section_message_area md:flex-[7]  flex flex-col overflow-y-auto flex-1  relative  w-screen " id={`${q?.length === 9 && "chat_section_group"} `}>
            {
              RoomChatHeader && <RoomChatInfo setRoomChatHeader={setRoomChatHeader} RoomData={RoomData} setRoomData={setRoomData} setModalForFriends={setModalForFriends} groupMembers={groupMembers} setGroupMembers={setGroupMembers} />
            }
            {!RoomChatHeader && (
              <>
                <MessageChatHeader chatHeader={chatHeader} setVideoOverlay={setVideoOverlay} q={q} RoomData={RoomData} setRoomChatHeader={setRoomChatHeader} RoomChatHeader={RoomChatHeader} groupMessageLoader={groupMessageLoader} SingleChatLoader={SingleChatLoader} setQuery={setQuery} own={user} socket={socket}
                  setBlokedUser={setBlokedUser}
                  blockUser={blockUser}
                />
                <div className="center_message  flex-[8] overflow-y-auto w-full overflow-x-hidden bg-[#f5f5f5]" id="center_message" >
                  {
                    messageLoader ? <MessageLoader /> :
                      (q?.length === 24 && currentChat.length ?
                        <MessageBox
                          message={currentChat} own={user} upload={uploadLoaderMessage} friendId={q} socket={socket} setBool={setBool} setOverlayObject={setOverlayObject} isTyping={isTyping} sendMessageLoader={sendMessageLoader} textMessage={textMessage} messageId={messageId} docID={docID} deleteMessage={deleteMessage} /> : (q?.length === 9 && (
                            groupMessageLoader ? <MessageLoader /> :
                              groupMessages.length > 0 ?
                                <GroupMessageBox groupMessages={groupMessages} currentId={UserInformationLoad?._id} /> : <NoChatHere />
                          )
                        ))
                  }
                </div>
                {
                  btnGroup && <ButtonGroup setModal={setModal} setStickerDrawer={setStickerDrawer} setButtonGroup={setButtonGroup} />
                }
                <hr className="bg-[#c9c9c9] h-1" />
                {footerModal === false ? <footer className={`bottom_footer  flex-[1] px-4 flex  ${stickerDrawer ? "hidden" : "block"}`}>
                  <div className="wrap flex items-center w-full relative">
                    <div className="emoji_button  -ml-[.3rem] mds-editor6:-ml-[1rem]">
                      <button className="text-[1.5rem] px-2 ml-[0] focus:outline-none rounded-full hover:bg-[#cdcbcb] py-2 mds-editor6:py-2 mds-editor6:text-[1rem]"
                        disabled={blockUser ? true : messageLoader ? true : q ? false : true}
                        onClick={(e) => {
                          setFooterModal(true)
                        }}
                      >
                        <BsFillEmojiSmileFill className="text-[1.8rem] mds-editor6:text-[1.3rem] text-[#efad2a]" />
                      </button>
                    </div>
                    <textarea
                      ref={textarea}
                      className={`text-area  w-full indent-2 textarea textarea-bordered   text-lg font-serif tracking-wider   overflow-hidden resize-none`} placeholder="write message..."
                      disabled={blockUser ? true : messageLoader ? true : q ? false : true}
                      value={textMessage}
                      onChange={ChatMessageFunction}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          SendMessage()
                        }
                        if (e.key !== 13) {
                          setTyping(true)
                          socket.emit('typing', { id: q, typing: true })
                          clearTimeout(timeout)
                          timeout = setTimeout(typingTimeout, 3000)
                        }
                        else {
                          clearTimeout(timeout)
                          typingTimeout()
                          // SendMessage()
                        }
                      }}
                    ></textarea>
                    {
                      textMessage.length > 0 ? "" :
                        <div className="button_group flex absolute  right-[1.5rem]">
                          <button className="text-[1.5rem] px-2 focus:outline-none rounded-full hover:bg-[#cdcbcb] py-2"
                            disabled={blockUser ? true : messageLoader ? true : q ? false : true}
                            ref={Files}
                            onClick={() => {
                              setButtonGroup(!btnGroup)
                            }}
                          >
                            <ImAttachment className="text-[1.8rem] mds-editor6:text-[1.3rem]" />
                          </button>
                          <button className=" text-[1.5rem]  focus:outline-none px-2  rounded-full hover:bg-[#cdcbcb] "
                            disabled={blockUser ? true : messageLoader ? true : q ? false : true}
                            ref={Video}
                            onClick={() => {
                              setImageFileSelector(true)
                            }}
                          >
                            <label htmlFor="image" className="cursor-pointer">
                              <MdImage className="text-[1.8rem] cursor-pointer mds-editor6:text-[1.3rem]" />
                            </label>
                          </button>
                          <button className=" text-[1.5rem]  focus:outline-none p-2 rounded-full hover:bg-[#cdcbcb]"
                            disabled={blockUser ? true : messageLoader ? true : q ? false : true}
                            onClick={(e) => {
                              SendMessage(e)
                            }}
                          >
                            <IoIosSend className="text-[1.8rem] mds-editor6:text-[1.3rem]" />
                          </button>
                        </div>
                    }
                  </div>
                </footer> : <FooterModal setFooterModal={setFooterModal} setTextMessage={setTextMessage} textMessage={textMessage} SendMessage={SendMessage} ChatMessageFunction={ChatMessageFunction} setTyping={setTyping} timeout={timeout} id={q} typingTimeout={typingTimeout} socket={socket} />}
              </>
            )}
          </aside>
          {/* =======================================HIDE THE LIVE USER RIGHT SIDE CHAT SECTION================ */}
          <aside className="live_user_from md:flex-[3] border border-solid border-[#c6c6c6] rounded-r-md md:block hidden overflow-y-auto relative" id="live_users">
            <div className="wrapper_rooms bg-[#dfdfdf] relative  w-[19.5rem]">
              <CreateRoom q={q} setRooms={setRooms} Rooms={Rooms} setRoomChatHeader={setRoomChatHeader} />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default ChatSection = React.memo(ChatSection)






function NoUserLive() {
  return (
    <p className="text-[1.8rem] font-serif mt-[1rem] select-none text-[#adadad]">No, User Live</p>
  )
}


function NoChat() {
  return (
    <>
      <p className="text-[1.5rem] tracking-wider select-none text-[#adadad] justify-center flex">No Recently Chats</p>
    </>
  )
}










function ButtonGroup({ setModal, setStickerDrawer, setButtonGroup }) {
  const docFile = useRef()
  const Stickers = useRef()
  const Gif = useRef()
  return (
    <>
      <div className="btn_group  absolute  bottom-[5rem] right-[7rem] flex flex-col gap-y-1">
        <motion.button
          initial={{ x: -800 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.2, type: "tween" }}
          ref={Gif}
          className="focus:outline-none rounded-full w-[3.8rem] h-[3.8rem] bg-[#a68e03] text-center text-white border-2 border-solid flex justify-center items-center  border-white "
          onClick={() => {
            setModal(true)
            setButtonGroup(false)
          }}
        >
          <AiOutlineGif className="text-[2rem]" />
        </motion.button>
        <Tooltips placement="left" ref={docFile}>
          <TooltipsContent className="text-black">
            <p className="text-[1.2rem] font-serif tracking-wider">
              File
            </p>
          </TooltipsContent>
        </Tooltips>
        <Tooltips placement="left" ref={Gif}>
          <TooltipsContent className="text-black">
            <p className="text-[1.2rem] font-serif tracking-wider">
              GIF
            </p>
          </TooltipsContent>
        </Tooltips>
        <Tooltips placement="left" ref={Stickers}>
          <TooltipsContent className="text-black">
            <p className="text-[1.2rem] font-serif tracking-wider">
              Stickers
            </p>
          </TooltipsContent>
        </Tooltips>
      </div>
    </>
  )
}


function SearchFriendsForMessage({ userD, setSearchBool }) {
  return (
    <>
      <NavLink to={`/messages?q=${userD._id}`}
        activeStyle={{
          // backgroundColor: "#F32424",
        }}
        isActive={(match, location) => {
          return location.pathname === `/messages/${userD._id}`
        }}
      >
        <div className={`top   mb-[.2rem] py-[.2rem] `}
          onClick={(e) => {
            // setChatHeader(userD)
            setSearchBool(false)
          }}
        >
          <div className="inner_div mx-[.5rem] bg-[#b0afaf]  flex  items-center rounded-md py-[.1rem] cursor-pointer mb-[0rem] hover:bg-[#161D6F] hover:text-white">
            <section className="image  flex-shrink-0 flex flex-[3] items-center justify-center mx-auto cursor-pointer">
              <div className="image_inner w-[2.6rem] h-[2.6rem] flex rounded-full   ">
                {
                  userD.url ?
                    <Image src={userD.url} className="rounded-full flex-shrink-0 w-full h-full" rounded={true} />
                    :
                    <Image src={Photo} className="rounded-full flex-shrink-0 w-full h-full" rounded={true} />
                }
              </div>
            </section>
            <section className="name flex-[7] truncate flex justify-start">
              <p className="text-lg font-serif tracking-wider px-1 truncate">{
                userD.name.length > 16 ? userD.name.slice(0, 15) + "...." : userD.name
              }</p>
            </section>
            {/* <section className="message_number flex-[2]  mr-[.8rem] rounded-full flex items-center justify-center ">
              <p className="text-[#fff] text-lg  rounded-full bg-[#570A57] 
      px-[.7rem] py-[.1rem]" >5</p>
            </section> */}
          </div >
        </div>
      </NavLink>
    </>
  )
}


function NoUserForMessageSend() {
  return (
    <p className="text-[1.8rem] text-[#8e8a8a] font-serif tracking-wider select-none">
      no user found
    </p>
  )
}



function FooterModal({ setFooterModal, setTextMessage, textMessage, SendMessage, ChatMessageFunction, setTyping, timeout, id, typingTimeout, socket }) {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  function selectEmoji(event, emojiObject) {
    setChosenEmoji(emojiObject)
    if (textMessage) {
      setTextMessage(textMessage + emojiObject.emoji)
    }
    else {
      setTextMessage(emojiObject.emoji)
    }
  }
  return (
    <>
      <motion.div
        className="wrapper_footer">
        <footer className="bottom_footer  flex-[1] px-4 flex items-center">
          <div className="wrap flex items-center w-full relative">
            <div className="emoji_button  -ml-[.3rem] mds-editor6:-ml-[1rem]">
              <button className="text-[1.5rem] px-2 ml-[0] focus:outline-none rounded-full hover:bg-[#cdcbcb] py-2 mds-editor6:py-2 mds-editor6:text-[1rem]"
                onClick={(e) => {
                  setFooterModal(false)
                }}
              >
                <AiOutlineArrowLeft className="text-[1.8rem] mds-editor6:text-[1.3rem] text-[#101010]" />
              </button>
            </div>
            <textarea className="textarea textarea-bordered w-full indent-0  pr-[8.5rem] text-lg font-serif tracking-wider  resize-none min-h-[.8rem]" placeholder="write message..."
              value={textMessage}
              onChange={ChatMessageFunction}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  SendMessage()
                }
                if (e.key !== 13) {
                  setTyping(true)
                  socket.emit('typing', { id: id, typing: true })
                  clearTimeout(timeout)
                  timeout = setTimeout(typingTimeout, 3000)
                }
                else {
                  clearTimeout(timeout)
                  typingTimeout()
                  // SendMessage()
                }
              }}
            ></textarea>
            {/* <Error isError={err} text='need length longer than 0 for input' />
              {results && <TextList gifs={results} />} */}
            <div className="button_group flex absolute  right-[5px]">
              {/* Attacked the file to  */}
              <button className=" text-[1.5rem] px-2 focus:outline-none rounded-full hover:bg-[#cdcbcb] py-2"
                onClick={() => {
                  // setButtonGroup(!btnGroup)
                }}
              >
                <ImAttachment className="text-[1.8rem] mds-editor6:text-[1.3rem]" />
              </button>
              {/* Take the image from users camera */}
              <button className=" text-[1.5rem]  focus:outline-none px-2  rounded-full hover:bg-[#cdcbcb] cursor-pointer"
              >
                <label htmlFor="image" className="cursor-pointer">
                  <MdImage className="text-[1.8rem] cursor-pointer mds-editor6:text-[1.3rem]" />
                  <input type="file" name="" id="image" className="hidden"
                    accept="image/*, video/*"
                  // onChange={
                  //   SelectImage
                  // 
                  />
                </label>
              </button>
              {/* send the file to user  */}
              <button className=" text-[1.5rem]  focus:outline-none p-2 rounded-full hover:bg-[#cdcbcb]"
                onClick={(e) => {
                  SendMessage(e)
                }}
              >
                <IoIosSend className="text-[1.8rem] mds-editor6:text-[1.3rem]" />
              </button>
            </div>
          </div>
        </footer>
        <div className="emoji_section bg-green-500 flex justify-center">
          <Picker
            onEmojiClick={selectEmoji}
            pickerStyle={{
              // backgroundColor: 'red',
              width: '100%',
              marginTop: '.2rem',
              ".emoji-picker-react.emoji-categories": {
                backgroundColor: 'blue',
              }
            }} />
        </div>
      </motion.div>
    </>
  )
}


function MessageLoader() {
  return (<>
    <p className="w-full h-full  flex justify-center items-center">
      <Puff color="#827397" height={80} width={80} />
    </p>
  </>)
}


function NoChatHere({ q }) {
  return (
    <>
      <div className="conta flex justify-center items-center w-full h-full flex-col">
        <IoChatbubblesSharp className="text-[5rem] text-[#b4b1b1]" />
        <p className="text-[2rem] text-[#959393] select-none">{
          !q ? "No Chat Here, select user for conversation." : "Start conversation"
        }</p>
      </div>
    </>
  )
}
