import React from 'react'
import image from '../../../assets/img/download.png';
import Image from "@material-tailwind/react/Image";


//This is the markup for comment body

function Comment() {
    return (
        <>

            <div className="write-comment-section   boreder flex-wrap">
                <div className="name profile_image flex  align-middle ">
                    {/* //SECTION-1 */}

                    <section className='header-image-section ml-[.7rem] mt-[3px] '>
                        <article className='
                                    card-post-image-modal w-[3.3rem]  h-[3.3rem] 1sm:w-[2.6rem] 1sm:h-[2.6rem] rounded-full flex-shrink-0
                                
                                    '>
                            <Image
                                src={image}
                                // src={img3}
                                rounded={true}
                                raised={false}
                                alt="Rounded Image"
                                className="w-full h-full"
                            />
                        </article>
                    </section>
                    {/* section-2 */}
                    <section className='comment-image-section  w-full md:mr-[4rem] flex-wrap'>
                        <main className='flex  join-of-name-select-option bg-gray-300 rounded-lg ml-[8px] mb-[3px] pb-[.5rem] flex-wrap'>
                            <article className=' public-name-article ml-[.5rem] -mt-[.4rem]   h-full '>
                                {/* mt-[0px] */}
                                <article className='text-black md:text-xl mt-[3px] md:mt-[0] flex align-middle '>
                                    {/* <p> {(fname && lname) ? fname + " " + lname : "NA"}</p> */}
                                    <p className='font-bold'>Dunga Ram</p>  <p className='ml-2 text-sm 
                                                    mt-[.2rem] font-semibold
                                                    '>{new Date(Date.now().toLocaleString())}</p>
                                    {/* <article>{new Date(Date.now().toLocaleString())}</article> */}
                                </article>
                                <article className='comment-message'>
                                    {/* <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                                    {/* <p>{element.comment}</p> */}
                                </article>
                            </article>
                            {
                                // LikeReduxCounter === 0 ?

                                //     <Badge showZero badgeContent={LikeReduxCounter + 1} color="secondary"
                                //         anchorOrigin={{
                                //             vertical: 'bottom',
                                //             horizontal: 'right',
                                //         }}
                                //     >
                                //         {/* <AiTwotoneLike className='mt-[3.5rem]' /> */}
                                //     </Badge>
                                //     : ""
                            }
                        </main>
                        {/* SECTION-3 */}


                        {/* 
                         <section className='like and  reply  flex justify-evenly md:justify-center md:ml-[6rem] mb-[5px] pb-[8px]'>


                            <div className="like-section cursor-pointer sm:mr-[4rem] md:-ml-[8rem] "
                                onClick={(e) => {
                                    // setLikeValue(!likeValue)
                                    // setColorLikeButton(e)
                                    // likeCounterHandle(e)

                                    console.log("like")
                                }}
                                // ref={buttonRef
                                ref={likeButton}

                            >
                                <AiTwotoneLike className='text-black text-[1.5rem] md:text-[2rem]'


                                />

                            </div>


                            <div className="reply-section md:ml-[5rem] -ml-[5rem] cursor-pointer sm:ml-[5rem]"
                                onClick={() => {
                                    // console.log("reply")
                                    replyFocusOnInput()
                                    setToggleReply(
                                        // !toggleReply
                                        true
                                    )


                                }}
                            >
                                <MdOutlineQuickreply className='text-black text-[1.5rem] md:text-[2rem]
                                                ' />

                            </div>



                        </section>  */}

                        {/* //REPLY COMMENT SECTION */}








                        {/* // ALL REPLY LIST DATaA */}




                        <div className="replyContainer flex">

                            <section className='header-image-section ml-[.5rem] mt-[3px] md:ml-[4rem] '>
                                <article className='
                                card-post-image-modal w-[2.3rem]  h-[2.3rem] 1sm:w-[2.6rem] 1sm:h-[2.6rem] rounded-full flex-shrink-0
                            
                                '>
                                    <Image
                                        src={image}
                                        rounded={true}
                                        raised={false}
                                        alt="Rounded Image"
                                        className="w-full h-full"
                                    />
                                </article>
                            </section>
                            {/* section-2 */}
                            <section className='comment-image-section  w-full mr-[4rem] flex-wrap '>
                                <main className='flex  w-full join-of-name-select-option  rounded-lg ml-[8px] mb-[3px] pb-[.5rem] md:w-full
                                                                    mds-editor3:w-auto bg-gray-200'>

                                    <article className=' public-name-article ml-[.5rem] 
                                                        
                                                        -mt-[.4rem]   w-full h-full'>
                                        {/* mt-[0px] */}
                                        <article className='text-black text-sm mt-2 font-semibold'>
                                            {/* <p> {(fname && lname) ? fname + " " + lname : "NA"}</p> */}
                                            <p>Ram</p>
                                            {/* <article>{new Date(Date.now().toLocaleString())}</article> */}
                                        </article>
                                        <article className='comment-message'>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            {/* <p>{element.replyComment}</p> */}


                                        </article>
                                    </article>
                                    {
                                        // LikeReduxCounter === 0 ?

                                        //     <Badge showZero badgeContent={LikeReduxCounter + 1} color="secondary"
                                        //         anchorOrigin={{
                                        //             vertical: 'bottom',
                                        //             horizontal: 'right',
                                        //         }}
                                        //     >
                                        //         {/* <AiTwotoneLike className='mt-[3.5rem]' /> */}
                                        //     </Badge>
                                        //     : ""
                                    }





                                </main>



                                {/* SECTION-3 */}

                                {/* <section className='like and  reply  flex md:justify-center
                                                        justify-around  
                                                   

                                                          md:ml-[8rem] mb-[5px] pb-[8px]'>

                                    {/* LIKE BUTTON 

                                    <div className="like-section cursor-point
                                                            
                                                            er sm:mr-[4rem] md:-ml-[5rem] cursor-pointer"
                                        onClick={(e) => {
                                            // setLikeValue(!likeValue)
                                            // setColorLikeButton(e)
                                            // likeCounterHandle(e)

                                            console.log("like")
                                        }}
                                        // ref={buttonRef
                                        ref={likeButton}

                                    >
                                        <AiTwotoneLike className='text-black text-[1rem] md:text-[1.5rem] '


                                        />

                                    </div>

                                    {/* REPLY BUTTON 

                                    <div className="reply-section md:ml-[3rem] -ml-[5rem]  sm:ml-[5rem] cursor-pointer
                                                                        mds-editor3:ml-[1rem]
                                                                        "
                                        onClick={() => {
                                            // console.log("reply")
                                            replyFocusOnInput()
                                            setToggleReply(
                                                true
                                            )


                                        }}

                                        ref={replyButtonTarget}
                                    >
                                        <MdOutlineQuickreply className='text-black text-[1rem] md:text-[1.5rem]' />

                                    </div>



                                </section> */}
                            </section>


                        </div>


                        {/* // REPLY COMMENT TEXT AREA */}



                        {/* <div className="comment-reply flex md:ml-[3.5rem] ml-[0] mb-[.5rem]" >
                                <section className='header-image-section ml-[.3rem] flex  '>
                                    <article className='
                                    card-post-image-modal w-[2.5rem]  h-[2.5rem] rounded-full flex-shrink-0
                                    '>
                                        <Image
                                            src={ProfileImage}
                                            rounded={true}
                                            raised={false}
                                            alt="Rounded Image"
                                            className="w-full h-full"
                                        />
                                    </article>
                                </section>
                                <section className='input-field-section mt-[.3rem]  border flex align-middle justify-center w-full rounded-[50px] ml-[.5rem] my-[.2rem] mr-[1rem]
                                focus:border-none
                                     '>
                                    <input
                                        type="text"

                                        className="reply w-full h-full 
                                            rounded-[50px]
                                            indent-4
                                            bg-gray-300
                                            hover:border-none
                                            focus:border-none
                                            "
                                        // ref={replyFocus}
                                        id="mytextarea"
                                        name="replyComment"

                                        value={textReply.replyComment}
                                        onChange={(e) => {
                                            ReplyTextAreaValueHandler(e)
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                replyHandle(e)
                                            }
                                        }}

                                        placeholder="Reply .... "
                                    />

                                </section>
                            </div>
                         */}

                    </section>
                </div>

            </div >

        </>
    )
}

export default Comment