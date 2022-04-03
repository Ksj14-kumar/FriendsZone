import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Image from "@material-tailwind/react/Image";
import Image1 from '../../assets/img/team-4-470x470.png';
import Icon from "@material-tailwind/react/Icon";
import Label from "@material-tailwind/react/Label";

import { IoEarth } from 'react-icons/io5';
import { BiLike } from 'react-icons/bi';
import { MdAddComment, MdDelete, MdLock } from 'react-icons/md';
import { AiTwotoneLike } from 'react-icons/ai';
import { RiShareFill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ReadMoreReact from 'read-more-react';

import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";

import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import emoji from '../../assets/emoji/animated-emoticons-2018-5.gif';
import emoji1 from '../../assets/emoji/animated-emoticons-2018-12.gif';
import emoji2 from '../../assets/emoji/animated-emoticons-2018-25.gif';
import emoji3 from '../../assets/emoji/animated-emoticons-2018-21.gif';
import emoji4 from '../../assets/emoji/animated-emoticons-2018-41.gif';
import emoji5 from '../../assets/emoji/animated-emoticons-2018-8.gif';
import CommentSection from './CommentSection'



import { error, success } from '../../toastifyMessage/Toast'
// import {StyledComponent} from '@emotion/styled'


// MATERIAL UI
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Comments from "./Comments/Comments"

// import Comments from './CommentPractice/Comments';


const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, neque quaerat ducimus iste, quis ullam tempora facilis omnis fuga laboriosam sequi porro officia, consectetur perferendis et quod aliquid. Corporis ullam cumque molestiae. Ut eaque accusamus quibusdam odio necessitatibus incidunt dicta, nostrum iure saepe tempore nisi nihil corrupti doloremque natus eligendi!"







function PublicPostCard({ data }) {
  const [emojiURL, setEmojiURL] = useState("")
  const [commentToggle, setCommentToggle] = useState(false)
  const dispatch = useDispatch()
  const buttonRef = useRef()
  const avatarGroup = useRef()
  const deletePost = useRef()
  const [PostIdForDelete, setPostIdForDelete] = useState()
  const [postArray, setPostArray] = useState([])
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)



  const ShowImage = useSelector((state) => {
    console.log("state is ", state)
    return state.ShowImage.value
  })

  const EmojiHandleRedux = useSelector((state) => {
    // console.log("public profile url", state)
    return state.EmojiHandle
  })

  const lengthOfComments = useSelector((state) => {
    return state.GetAllComments.length
  })


  const PostWhichUserSelectedImageORVideo = useSelector((state) => {
    return state.PostWhichUserSelectedImageORVideo
  })

  console.log("user posts", PostWhichUserSelectedImageORVideo)


  const FileType = useSelector((state) => {
    console.log("state is for chanmge file type ", state)
    return state.FileType
  })



  const GetAllPosts = useSelector((state) => {
    // setPostArray(state.GetAllPosts)
    console.log("all state post from users", state)
    return state.GetAllPosts
  })



  console.log("all user public post", GetAllPosts)





  const UserInformationLoad = useSelector((state) => {
    // console.log("state in add post ", state)

    return state.UserInformationLoad.value
  })


  const { _id, fname, lname, college, city, country, position, stream, aboutMe } = UserInformationLoad !== null ? UserInformationLoad : { fname: "", lname: "", college: "", city: "", country: "", position: "", stream: "", aboutMe: "" }





  //ALL EMOJI URL GENERATED

  function EmojiURLHandle() {
    // const url = window.URL.createObjectURL(emoji1)
    // setEmojiURL(url)


  }
  EmojiURLHandle()


  function emojiHandle() {
    dispatch({ type: "ADD_EMOJI_URL", paylaod: emojiURL })

  }
  console.log("url", emojiURL)


  function SetCommentSection() {
    console.log(commentToggle, "commnet value")
    setCommentToggle(!commentToggle)
  }


  //load the post after delete and before delete
  useEffect(() => {
    setPostArray(GetAllPosts)

  }, [])





  //DELETE THE POST 

  async function DeletePostById(id, public_id) {
    // blob/delete/user/post/${id}
    const DeletePostResponse = await fetch(`/blob/delete/user/post/local/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ public_id })
    })

    const DeletePostResponseData = await DeletePostResponse.json()
    console.log(DeletePostResponse)
    console.log("delete post response data", DeletePostResponseData)
    if (DeletePostResponse.status === 200) {
      setPostArray(DeletePostResponseData.data)

      dispatch({ type: "LOAD_POSTS", payload: DeletePostResponseData.data })
    }




  }



  async function handleLikeCount() {
    if (like) {
      setLikeCount(likeCount++)
    }
    else {
      setLikeCount(likeCount--)
    }

  }





  console.log(likeCount)
  console.log(like)
  console.log("post id for delete", PostIdForDelete)

  return (

    <>
      {/* PostWhichUserSelectedImageORVideo.length > 0 */}
      {
        (GetAllPosts.length > 0) && (GetAllPosts).map((item) => {
          return (



            <>

              <div className="post-card flex justify-around post-screen:mt-[32rem] mt-[26rem] md:pl-48 md:mt-[18rem] relative sm-[25rem]  shadow-lg bg-red-800 lg:mt-[11rem] post">
                <Card className="post mx-[5.8rem] ml-[8rem] -mt-[9rem]">
                  {/* <CardHeader color="lightBlue" size="lg">
            <H5 color="white">Login</H5>
              </CardHeader> */}

                  <CardBody >
                    <div className="flex justify-center ">

                      {/* <H6 color="gray" >Create Post</H6> */}
                    </div>

                    <section className='header-image-section post rounded-lg  flex justify-between' >
                      <main className='flex  join-of-name-select-option post '>
                        <article className='
                                    card-post-image-modal w-[3rem]  h-[3rem] rounded-full flex-shrink-0 post
                                    

                                    '>

                          {/* ShowImage ? ShowImage : "" */}
                          <Image
                            src={ShowImage}
                            rounded={true}
                            raised={false}
                            alt="Rounded Image"
                            className="w-full h-full"
                          />


                        </article>



                        <article className=' public-name-article ml-[.5rem] -mt-[.4rem] post'>
                          <article className='text-black text-xl'>
                            {fname ? fname[0].toUpperCase() + fname.slice(1, fname.length).toLowerCase() : "NA"}
                            {/* <p> Dunga Ram</p> */}
                          </article>
                          <article className='flex'>
                            {/* {new Date(Date.now()).toDateString()} */}
                            {item.createdAt}
                            {
                              item.privacy === "public" ?
                                <IoEarth className='mt-[4px] ml-[.3rem]' /> : <MdLock className='mt-[4px] ml-[.3rem]' />
                            }
                          </article>




                        </article>




                      </main>
                      <section className=" flex justify-center align-middle" ref={deletePost}>
                        <button className=' focus:border-0 border-0 focus:outline-0 outline-none -mt-2 '>
                          <BsThreeDotsVertical className='text-[1.5rem]' />
                        </button>

                      </section>
                    </section>


                    {/* <main className='  w-full mt-[2rem]'> */}
                    <section className='text-caption ml-2  mt-[2rem]   px-[1rem] text-[1.3rem] md:text-lg '>


                      {console.log("readmore text for the pucloic ", item.text)}
                      <ReadMoreReact text={item.text?item.text:""}
                        min={80}
                        ideal={100}
                        max={200}
                        readMoreText={<p color="lightBlue" className="cursor-pointer  text-xl font-medium">Read more</p>}


                      />




                    </section>

                    {/* </main> */}




                  </CardBody>

                  <section className='image section mt-[.8rem]   relative w-full bg-red-600  '>
                    {
                      item.fileType === "video" ?
                        (item.image ?
                          <iframe className="w-full h-full" src={item.image} frameBorder="1" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          : "")
                        :
                        (item.image ?
                          <Image
                            src={item.image}
                            rounded={false}
                            raised={false}

                            className="w-full rounded-none"
                          />

                          : "")

                    }
                  </section>


                  {/* {item.image ?

                    <section className='image section mt-[.8rem]   relative w-full bg-red-600  '>
                      <Image
                        src={item.image}
                        rounded={false}
                        raised={false}

                        className="w-full rounded-none"
                      />

                    </section>
                    : ""} */}


                  {/* <hr /> */}

                  <CardFooter className="like and dislike section flex justify-start py-0  mb-[.8rem] ">

                    {/* <div class="flex">

                <div class="w-10 h-10 rounded-full border-2 border-white">
                  <img alt="..." src={Image1} class="rounded-full  max-w-full h-auto align-middle border-none undefined" />

                </div>
                <div class="w-10 h-10 rounded-full border-2 border-white -ml-4">
                  <img alt="..." src={Image1} class="rounded-full  max-w-full h-auto align-middle border-none undefined" />
                </div>


                <div class="w-10 h-10 rounded-full border-2 border-white -ml-4">

                  <img alt="..." src={Image1} class="rounded-full  max-w-full h-auto align-middle border-none undefined" />

                </div>

                <div class="w-10 h-10 rounded-full border-2 border-white -ml-4">
                  <img alt="..." src={Image1} class="rounded-full  max-w-full h-auto align-middle border-none undefined" />
                </div>
              </div> */}


                    <div className="group-react ml-[5.5rem] " >

                      <AvatarGroup max={3} spacing="medium" sx={{ width: 27, height: 27, }} inputProps={{ style: { fontSize: 40 } }} ref={avatarGroup} >
                        <Avatar alt="Remy Sharp" src={Image1} sx={{ width: 27, height: 27 }} />
                        <Avatar alt="Travis Howard" src={Image1} sx={{ width: 27, height: 27 }} />
                        <Avatar alt="Cindy Baker" src={Image1} sx={{ width: 27, height: 27 }} />
                        <Avatar alt="Agnes Walker" src={Image1} sx={{ width: 27, height: 27 }} />
                        <Avatar alt="Trevor Henderson" src={Image1} sx={{ width: 27, height: 27 }} />
                      </AvatarGroup>



                    </div>


                  </CardFooter>


                  <hr className='mb-[.2rem]' />
                  <CardFooter className=" flex justify-between -mt-[1rem] mx-[1rem]  ">
                    <section>

                      <Button
                        color="lightBlue"
                        buttonType="link"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="none"
                        className="hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem]"
                        ref={buttonRef}
                        onClick={() => {
                          handleLikeCount()
                          setLike(!like)
                        }}

                      >

                        {
                          !like ?
                            <BiLike className="" /> : <AiTwotoneLike className="text-blue-900" />

                        }
                        {/* {likeCount} */}


                      </Button>

                    </section>

                    <section>


                      <Button
                        color="lightBlue"
                        buttonType="link"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="none"
                        className="hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem]"
                        onClick={SetCommentSection}
                      >
                        <MdAddComment />
                        {/* <Label color="" className="text-[1.5rem]">{lengthOfComments}</Label> */}
                      </Button>

                    </section>

                    <section>

                      <Button
                        color="lightBlue"
                        buttonType="link"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="none"
                        className="hover:bg-gray-100 text-gray-500  text-[1.5rem] px-[2rem] md:px-[4rem] md:text-[2rem]"
                      >
                        <RiShareFill />
                      </Button>
                    </section>



                  </CardFooter>
                  <hr className='-mt-[.8rem]' />
                  <section className="comment-section  mt-2">
                    {/* // {item.post_id} */}

                    {
                      // commentToggle ? <CommentSection /> : ""
                      (commentToggle ? (UserInformationLoad ?
                        <Comments
                          commentsUrl="http://localhost:3004/comments"
                          currentUserId={item.userId?item.userId:null}
                          post_id={item.post_id?item.post_id:null}
                          UserIdForPostComments={item.userId?item.userId:null}
                          currentUserName={fname + " " + lname}
                          ImageUrl={ShowImage?ShowImage:null}

                        /> : error({ message: "Kindly, Create Profile" })) : "")
                    }









                  </section>


                </Card>
              </div>


              <Popover placement="left" ref={deletePost}>
                <PopoverContainer>
                  <PopoverHeader>
                    {/* <H6 className="text-center">Delete Post</H6> */}
                  </PopoverHeader>
                  <PopoverBody>

                    <section className='flex  justify-between cursor-pointer align-baseline hover:bg-red-700 hover:rounded-lg hover:text-white px-6 py-2 '



                      onClick={(e) => {
                        e.preventDefault();
                        DeletePostById(item.post_id, item.public_id);
                        setPostIdForDelete(item.post_id);
                        console.log(e.target.id)
                        // alert("hello")
                      }}

                    >
                      <MdDelete className='text-xl mt-[2px] mr-2' />

                      <p className='cursor-pointer flex text-[1rem] '

                      >
                        Delete Post
                      </p>
                    </section>
                  </PopoverBody>
                </PopoverContainer>
              </Popover>





              <Tooltips placement="top" ref={buttonRef} className="ml-[5rem]">
                <TooltipsContent className="flex justify-center md:justify-between  px-[5px] ">
                  <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] sm:w-[3rem] sm:h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0'
                    onClick={emojiHandle}
                  >

                    <article className='setEmoji w-[3.5] h-[3.5]'>

                      <Image
                        src={emoji}
                        rounded={true}
                        className="w-2rem h-2rem bg-black-800"

                      />
                    </article>
                  </section>

                  <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0' >

                    <article className='setEmoji w-[3.5] h-[3.5]'>

                      <Image
                        src={emoji2}
                        rounded={true}
                        className="w-2rem h-2rem bg-black-800"

                      />
                    </article>
                  </section>

                  <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0' >

                    <article className='setEmoji w-[3.5] h-[3.5]'>

                      <Image
                        src="https://tenor.com/view/licking-lips-emoji-love-this-gif-23499819"
                        rounded={true}
                        className="w-2rem h-2rem bg-black-800"

                      />
                    </article>
                  </section>


                  <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0 ' >

                    <article className='setEmoji w-[3.5] h-[3.5]'>

                      <Image
                        src={emoji3}
                        rounded={true}
                        className="w-2rem h-2rem bg-black-800"

                      />
                    </article>
                  </section>


                  <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0' >

                    <article className='setEmoji w-[3.5] h-[3.5]'>

                      <Image
                        src={emoji4}
                        rounded={true}
                        className="w-2rem h-2rem bg-black-800"

                      />
                    </article>
                  </section>


                  <section className='emoji-section rounded-[50px] text-black w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]   mx-[3px] outline outline-offest-1 outline-gray-100 cursor-pointer flex-shrink-0' >

                    <article className='setEmoji w-[3.5] h-[3.5]'>

                      <Image
                        src={emoji5}
                        rounded={true}
                        className="w-2rem h-2rem bg-black-800"

                      />
                    </article>
                  </section>



                </TooltipsContent>
              </Tooltips>
            </>
          )

        })
      }





    </>
  )
}




export default PublicPostCard