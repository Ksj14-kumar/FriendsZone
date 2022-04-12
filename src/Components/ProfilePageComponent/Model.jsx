import React from 'react'
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { MdAddComment, MdDelete, MdLock, MdOutlineThumbUpAlt, MdVisibilityOff, MdVisibility } from 'react-icons/md';
import {BsFillCheckCircleFill} from 'react-icons/bs';

function Model({ visible, visibilityHandle }) {

    const [showModal, setShowModal] = React.useState(visible);
    return (
        <>


            <Modal size="sm" active={showModal} toggler={() => visibilityHandle(false)}>
                <ModalHeader toggler={() => visibilityHandle(false)}>
                    <p className='mr-[10rem]'>
                    Change 
                    </p>
                        
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal">
                        <ul >
                            <hr />
                            <li className=' flex justify-between text-[1.5rem] align-middle  hover:text-white  cursor-pointer hover:bg-blue-500 hover:rounded-lg hover:-py-[5px] hover:transition-all hover:ease-in-out hover:delay-100 hover:duration-75 '>
                            <div className="div left">
                                   
                                   </div>
                                   <div className="div flex center">
   
                                   <MdVisibilityOff  className='mt-2 mr-1'/>

                                Private
                                   </div>
                                   <div className="div right">
                                   <BsFillCheckCircleFill className='mt-2 mr-[5px] 
                                   text-green-500
                                   hover:text-green-800
                                   ' />
   
                                   </div>
                               
                            </li>
                            <hr />
                            <li 
                            className='flex justify-between text-[1.5rem] align-middle  hover:text-white  cursor-pointer hover:bg-blue-500 hover:rounded-lg hover:-py-[5px] hover:transition-all hover:ease-in-out hover:delay-100 hover:duration-75'
                            >
                                <div className="div left">
                                   
                                </div>
                                <div className="div flex center">

                                < MdVisibility className='mt-2 mr-1' />
                                Public
                                </div>
                                <div className="div right">
                                <BsFillCheckCircleFill className='mt-2 mr-[5px] 
                                text-green-500
                                hover:text-green-800
                                ' />

                                </div>

                                </li>
                                <hr />
                        </ul>

                    </p>
                </ModalBody>
                <ModalFooter>
                    {/* <Button */}
                    {/* //     color="red"
                    //     buttonType="link"
                    //     onClick={(e) => visibilityHandle(false)}
                    //     ripple="dark"
                    // >
                    //     Close
                    // </Button> */}

                    <Button
                        color="pink"
                        onClick={(e) => visibilityHandle(false)}
                        ripple="light"
                        block={true}
                    >
                        Save Changes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Model