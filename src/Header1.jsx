// import React, { useState } from "react";
// import Navbar from "@material-tailwind/react/Navbar";
// import NavbarContainer from "@material-tailwind/react/NavbarContainer";
// import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
// import NavbarBrand from "@material-tailwind/react/NavbarBrand";
// import NavbarToggler from "@material-tailwind/react/NavbarToggler";
// import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
// import Nav from "@material-tailwind/react/Nav";
// import NavLink from "@material-tailwind/react/NavLink";
// import Icon from "@material-tailwind/react/Icon";
// import NavItem from "@material-tailwind/react/NavItem";
// export default function Header1() {
//   const [openNavbar, setOpenNavbar] = useState(false);
//   return (
//     <Navbar color="lightBlue" navbar>
//         <NavbarContainer>
//             <NavbarWrapper>
//                 <NavbarBrand>Navbar</NavbarBrand>
//                 <NavbarToggler
//                     color="white"
//                     onClick={() => setOpenNavbar(!openNavbar)}
//                     ripple="light"
//                 />
//             </NavbarWrapper>
//             <NavbarCollapse open={openNavbar}>
//                 <Nav className="flex  md:flex-row ">
//                     <NavItem active="light" ripple="light">
//                         <Icon name="language" size="xl" />
//                         Discover
//                     </NavItem>
//                     <NavLink href="#navbar" ripple="light">
//                         <Icon name="account_circle" size="xl" />
//                         Profile
//                     </NavLink>
//                     <NavItem ripple="light">
//                         <Icon name="settings" size="xl" />
//                         Settings
//                     </NavItem>
//                 </Nav>
//             </NavbarCollapse>
//         </NavbarContainer>
//     </Navbar>
//   );
// }