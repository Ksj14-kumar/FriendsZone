
import React, { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import HomePage from "./HomePage";
import { MdOutlineManageAccounts } from 'react-icons/md'
import Icon from "@material-tailwind/react/Icon";
import { HiOutlineLogin } from 'react-icons/hi';

export default function Header(props) {
    const [openNavbar, setOpenNavbar] = useState(false);




    return (

        <>
            <Navbar color="lightBlue" navbar className="tracking-wider  font-serif w-screen fixed text-3xl ">
                <NavbarContainer>
                    <NavbarWrapper className="" >
                        <div className=" cursor-pointer  text-lg">


                            {/* NavbarBrand */}
                            <NavLink href="/">Blog</NavLink>

                        </div>
                        <NavbarToggler
                            color="white"
                            onClick={() => setOpenNavbar(!openNavbar)}
                            ripple="light"
                        />
                    </NavbarWrapper>

                    <NavbarCollapse className="" open={openNavbar}>
                        <Nav className="tracking-wider font-serif">



                            <NavLink href="/login" ripple="light" className="" size="xl">

                                <Icon name={<HiOutlineLogin />} size="xl" />


                                login</NavLink>

                            <NavLink href="/register" ripple="light" className="text-white" size="xl">

                                <Icon name={<MdOutlineManageAccounts />} size="5xl" />


                                Create Account</NavLink>






                        </Nav>
                    </NavbarCollapse>
                </NavbarContainer>
            </Navbar>
            <HomePage />

        </>

    );
}
