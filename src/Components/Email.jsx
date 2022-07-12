import React from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";

import { NavLink } from 'react-router-dom'
export default function Email() {
    return (
        <div className=" mx-auto relative  h-screen ">
            <div className="inner  mx-auto py-28 w-96">
                <Card>
                    <CardHeader color="green" size="sm">
                        <H5 color="white">Forget Password</H5>
                    </CardHeader>
                    <CardBody>
                        <div className="mb-8 px-4">
                            <InputIcon
                                type="email"
                                color="lightBlue"
                                placeholder="Email "
                                iconName="email"
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center">
                            <Button
                                color="lightBlue"
                                buttonType="filled"
                                size="lg"
                                ripple="dark"
                            >
                                Get Link
                            </Button>
                        </div>
                        <div className="footer-section flex justify-between ">
                            <p className="m-0 p-0 font-serif font-bold italic mt-[3px]">Go to home</p>
                            <NavLink exact to="/" className="text-lg
                            text-blue-800  font-semibold mb-4  "> Click here</NavLink>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}