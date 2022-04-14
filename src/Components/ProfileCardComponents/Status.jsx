import React, { useRef } from 'react'
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import { HiPencil } from 'react-icons/hi'
import Button from '@material-tailwind/react/Button';
import { BrowserRouter, NavLink, Redirect, useHistory, Route, Switch } from 'react-router-dom';
function Status({ fname, lname, country, city, stream, position, aboutMe, college }) {
    const buttonRef = useRef()
    const history = useHistory()
    return (
        <>
            <div className="text-center">

                {
                    (fname && lname && country && city && stream && position && aboutMe) ? "" :
                        <section>
                            {/* <Button
                                color="deepPurple"
                                buttonType="filled"
                                size="regular"
                                rounded={true}
                                block={false}
                                iconOnly={true}
                                ripple="light"
                                ref={buttonRef}
                                onClick={() => {
                                    history.push("/update_profile")
                                }}


                            >
                                <Icon name={<HiPencil className='text-[1.5rem]' />} size="sm" />
                            </Button> */}
                        </section>
                }
                <H5 color="gray">

                    {(fname && lname) ? fname + " " + lname : "NA"}

                </H5>
                <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
                    <Icon name="place" size="xl" />
                    {/* {city + "," + country ? city + "," + country : "NA"} */}
                    {
                        (city && country) ? city + ", " + country : "NA"

                    }
                </div>
                <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
                    <Icon name="work" size="xl" />

                    {(position && stream) ? position + "," + stream : "NA"}
                </div>
                <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                    <Icon name="account_balance" size="xl" />
                    {college ? college : "NA"}
                </div>
            </div>
            <CardBody>
                <div className="border-t border-lightBlue-200 text-center px-2 ">
                    <LeadText color="blueGray">
                        {aboutMe ? aboutMe : "NA"}
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
                        <Button color="purple" buttonType="link" ripple="dark">
                            Show more
                        </Button>
                    </a>
                </div>

            </CardFooter>



        </>
    )
}

export default Status