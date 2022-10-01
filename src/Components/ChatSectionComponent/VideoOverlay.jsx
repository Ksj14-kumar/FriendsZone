import { motion } from "framer-motion"
import React, { useEffect, useState, useRef } from 'react';
import Peer from "simple-peer";
import {useSelector} from "react-redux"
function LiveVideo({ setVideoOverlay, socket,videoOverlay,anotherUserId }) {
    const [videoSource, setVideoSource] = useState("")
    const [stream, setStream] = useState(null)
    const [call, setCall] = useState(null)
    const [callAccepted, setCallAccepted] = useState(false)
    const [name, setName] = useState("")
    const [socketId, setSocketId] = useState(null)
    const [callEnded, setCallEnded] = useState(false)
    const myVideo = useRef(null)
    const userVideo = useRef(null)
    const connectionRef = useRef(null)
    const UserInformationLoad = useSelector((state) => {
        return state.UserInformationLoad.value
    })
    useEffect(() => {
        async function getVideo() {
            const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            setStream(currentStream)
            myVideo.current.srcObject = currentStream
            setSocketId(socket.id)            
            socket.emit("callUser", {from:UserInformationLoad?.fname+" "+UserInformationLoad?.lname,anotherUserId:anotherUserId, callingType:"video", isReceivedCall: true})
        }
        getVideo()
    }, [])
    function answerCall() {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", {
                signal: data,
                to: call.from
            })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })
        peer.signal(call.signal)
        connectionRef.current = peer
    }
    useEffect(()=>{
        function callUser(id) {
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream
            })
            peer.on("signal", (data) => {
                socket.emit("callUser", {
                    userToCall: id,
                    signalData: data,
                    from: socketId,
                    name
                })
            })
            peer.on("stream", (stream) => {
                userVideo.current.srcObject = stream
            })
            socket.on("callAccepted", (signal) => {
                setCallAccepted(true)
                peer.signal(signal)
            })
            connectionRef.current = peer
        }
        callUser()
    },[videoOverlay])
    function leaveCall() {
        setCallEnded(true)
        setCallAccepted(false)
        setCall(null)
        setVideoOverlay(false)
        connectionRef.current.close()
        connectionRef.current.destroy()
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: "tween" }}
            className="liver_video fixed w-full h-full bg-[#0a0a0ad5] z-[19]  flex flex-col">
            <div className="button  bg-[#bab9b9] rounded-full relative ml-auto  h-[3rem] flex justify-center items-center w-[3rem] mt-[1rem] mr-[2rem]"
                onClick={() => {
                    setVideoOverlay(false)
                }
                }
            >
                <button className="text-[1.8rem] text-white focus:outline-none ">X</button>
            </div>
            <main className="main_video bg-red-500 flex  mx-[.8rem] justify-between mt-[2px] h-screen">
                <section className="section_1 flex-[2]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi suscipit nulla voluptates, error velit aliquid sequi magni laudantium doloribus quae!
                </section>
                <section className="section_2 flex-[7] bg-green-500 ">
                    <div className="vides_cols grid  grid-rows-2 px-1 w-full bg-red-100">
                        {
                            stream && <video playsInline autoPlay id="user_1" className="w-full border  border-solid border-gray-600 h-[25rem] mb-[1rem] mt-[3px]"
                                ref={myVideo}
                            ></video>}
                        {
                            callAccepted && !callEnded &&
                            <video src="" id="user_2"
                                ref={userVideo}
                                className="w-full border   h-[24rem] border-solid border-gray-600"></video>
                        }
                    </div>
                </section>
                <section className="section_3 flex-[3] text-center">
                    <p className="text-[1.5rem] text-white font-seriftracking-wider py-1">Live Chats</p>
                </section>
            </main>
        </motion.div >
    )
}
export default LiveVideo;