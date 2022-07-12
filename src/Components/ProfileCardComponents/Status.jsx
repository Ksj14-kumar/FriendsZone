import React, { useRef } from 'react'
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import { HiPencil } from 'react-icons/hi'
import Button from '@material-tailwind/react/Button';
import { BrowserRouter, NavLink, Redirect, useHistory, Route, Switch } from 'react-router-dom';

function Status({ info, loadUserProfileInfo, theme }) {
    const buttonRef = useRef()
    const history = useHistory()
    return (
        <>
            <div className="text-center ">
                {
                    (info.fname && info.lname && info.country && info.city && info.stream && info.position && info.aboutMe) ? "" :
                        <section>
                        </section>
                }
                <H5 className={`${theme ? "text-[#fff]" : "text-[#000]"}`}>
                    <p className={`${theme ? "text-[#fff]" : "text-[#000]"}`}>
                        {
                            (
                                loadUserProfileInfo ? "" :
                                    (info.fname && info.lname) ? info.fname + " " + info.lname : "")
                        }
                    </p>
                </H5>
                <div className={`mt-0 mb-2  flex items-center justify-center gap-2 ${theme ? "text-[#fff]" : "text-[#0a0a0a]"}`}>
                    {loadUserProfileInfo ? "" : (info.city && info.country) &&
                        <>
                            <Icon name="place" size="xl" />
                            {
                                (info.city && info.country) ? info.city + ", " + info.country : ""
                            }
                        </>
                    }
                </div>
                <div className={`mb-2 ${theme ? "text-[#fff]" : "text-[#040404]"} mt-10 flex items-center justify-center gap-2`}>
                    {
                        loadUserProfileInfo ? "" : (info.position && info.stream) &&
                            <>
                                <Icon name="work" size="xl" />
                                {(info.position && info.stream) ? info.position + "," + info.stream : ""}
                            </>
                    }
                </div>
                <div className={`mb-2 ${theme ? "text-[#fff]" : "text-[#000]"} flex items-center justify-center gap-2`}>
                    {
                        loadUserProfileInfo ? "" : info.college &&
                            <>
                                <Icon name="account_balance" size="xl" />
                                {info.college ? info.college : ""}
                            </>
                    }
                </div>
            </div>
            <CardBody>
                <div className={`border-t border-lightBlue-200 text-center px-2  ${theme?"text-[#fff]":"text-[#000]"}`}>
                    <LeadText className={`${theme?"text-[#fff]":"text-[#000]"}`}>
                        <p className={`${theme?"text-[#fff]":"text-[#000]"}`}>
                        {loadUserProfileInfo ? "" : (info.aboutMe ? info.aboutMe : "")}
                        </p>
                    </LeadText>
                </div>
            </CardBody>
            <CardFooter>
                <div className="w-full flex justify-center -mt-8">
                    <a
                        href="#pablo"
                        className="mt-5"
                        onClick={(e) => e.preventDefault()}
                    >
                        {
                            loadUserProfileInfo ? "" :
                                <Button color="purple" buttonType="link" ripple="dark">
                                    Show more
                                </Button>
                        }
                    </a>
                </div>
            </CardFooter>
        </>
    )
}

export default Status