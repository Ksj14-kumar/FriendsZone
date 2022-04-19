import React, { useRef } from 'react'

import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import FooterButton from './FooterButton';
import { createPopper } from "@popperjs/core";
import ChatWindow from './chatSection/ChatWindow';

// <div className='bg-[#03A9F4] rounded-t-lg live_user 
// '>



function RightSidebar() {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "top-end"
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    // bg colors
    let bgColor;
    let color;
    color === "green"
        ? (bgColor = "bg-white")
        : (bgColor = "bg-" + color + "500");
    return (

        <>
            <div className="flex flex-wrap bg-[#03A9F4] rounded-t-lg live_user  ">
                <div className="w-full sm:w-6/12 md:w-4/12 px-4">
                    <div className="relative inline-flex align-middle w-full">
                        <button
                            className={
                                "text-white font-bold  text-sm px-5 py-1 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                            }
                            type="button"
                            ref={btnDropdownRef}
                            onClick={() => {
                                dropdownPopoverShow
                                    ? closeDropdownPopover()
                                    : openDropdownPopover();
                            }}
                        >

                            live
                        </button>
                        <div
                            ref={popoverDropdownRef}
                            className={
                                (dropdownPopoverShow ? "block " : "hidden ") +
                                (color === "red" ? "bg-white " : "") +
                                "text-base  float-left py-2 list-none text-left rounded mb-1 bg-white mds-editor3:ml-6 md:mr-0 mds-editor11:w-[18rem] mds-editor11:w-[20rem] mds-editor12:w-[22rem]"
                            }
                            // style={{ minWidth: "1rem" }}
                        >
                            <FooterButton bool={dropdownPopoverShow} />
                            


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RightSidebar
// </div>