import React from 'react'
import Button from "@material-tailwind/react/Button";
import { RiSendPlaneFill } from 'react-icons/ri';
import Icon from "@material-tailwind/react/Icon";
function ChatFoolter({ textMessage, setTextMessage, SentMessage, setTyping, socket, UserInformationLoad, currentChat }) {



console.log({currentChat})
    const receiverId = currentChat.members?.find(m => m != UserInformationLoad)


    return (
        // mb-[10px]
        <div className="input_field flex relative   rounded-md rounded-t-none w-full ">

            <div className="input w-full items-center drop-shadow-md border border-solid border-[#b4b3b3ee] rounded-md">

                <input type="text" name="" id="" className='w-full h-[2.7rem] rounded-md focus:outline-none outline-none indent-4 text-[1rem] pr-[3.8rem] bg-[#fff]'
                    onChange={(e) => {

                        setTextMessage(e.target.value)

                    }}

                    onKeyPress={(e) => {
                        if (e.which !== 13) {

                            setTyping(true)

                            // socket.current.emit('typing', { typing: true, receiverId, senderId: UserInformationLoad })




                        }
                        else {
                            setTyping(false)
                            // socket.current.emit('typing', { typing: false, receiverId, senderId: UserInformationLoad })

                        }

                        if (e.key === 'Enter') {
                            SentMessage()
                        }
                    }}

                    value={textMessage}




                />
            </div>
            <div className="button absolute right-1">

                <Button
                    color=""
                    buttonType="filled"
                    size="regular"
                    rounded={true}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    className="px-3 bg-[#d6d6d600] text-black"

                    onClick={() => {
                        SentMessage()
                    }}



                >
                    <Icon name={<RiSendPlaneFill className='text-[1.8rem] text-[#111]' />} size="sm" />
                </Button>
            </div>

        </div>
    )
}

export default ChatFoolter