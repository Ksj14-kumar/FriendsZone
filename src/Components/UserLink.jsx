import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch, useHistory, useLocation, useParams, useRouteMatch, Redirect } from 'react-router-dom'
import ProfileCard from '../Pages/ProfileCard'
import GeeyMenuButton from './ChatSectionComponent/GeeyMenuButton'



import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

function UserLink({ item }) {
    const [bool, setBool] = useState(false)
    const { path, url } = useRouteMatch()
    const history = useHistory()
    console.log(url)
    const q = new URLSearchParams(useLocation().search).get("name")



    // console.log(item)

    return (
        <div className='mt-[20rem]  relative h-[15rem] bg-white'>
            hhgkjhj

            {/* <div className={`gooey_menu absolute  -translate-y-[50%] z-[200] left-[20rem]  -translate-x-[50%] flex ${bool && "gooey"}`}>
                <div className="div1 bg-[#060606] w-[6rem] h-[6rem]  rounded-full absolute mr-2 left-[30%]">

                </div>
                <div className="div2 bg-[#010101] mr-[7rem] w-[6rem] h-[6rem] absolute  rounded-full left-[70%]"></div>
            </div>
            <br />

            <button className="bg-green-500 text-xl px-[3rem] mt-[2rem]"
                onClick={() => {
                    setBool(!bool)

                }}
            >
                Click
            </button> */}


            <SwipeableTemporaryDrawer />



        </div >
    )
}

export default UserLink







function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" ||
                event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

                hello
            </List>
            <Divider />

        </Box>
    );

    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, aut? Delectus nam explicabo quis vel doloribus, culpa quibusdam fugit? Quae.

            <Button onClick={toggleDrawer("bottom", true)}>open</Button>
            <SwipeableDrawer
                anchor="bottom"
                open={state["bottom"]}
                onClose={toggleDrawer("bottom", false)}
                onOpen={toggleDrawer("bottom", true)}
            >
                {list("bottom")}
            </SwipeableDrawer>
        </div>
    );
}
