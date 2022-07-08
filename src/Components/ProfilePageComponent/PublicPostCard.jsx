import React from 'react'
import PostCard from './PostCard';
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from 'react-spinkit'
import { Button } from "@material-tailwind/react"
import { useParams } from 'react-router-dom';



function PublicPostCard({ profilePost, socket, threeDot, setShowLikeUserModal, setAllPosts, allPosts, theme, length, setIncreament, increament }) {
  const checkParams = useParams()







  async function fetchData() {
    console.log("inifinity scroll fetch data")
    try {
      console.log(allPosts.length)
      // ${process.env.REACT_APP_API_BACKENDURL}
      const loadPostResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/post/${2}/${allPosts.length}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("uuid")
        }
      })
      const loadPostData = await loadPostResponse.json()
      console.log({ loadPostData })
      if (loadPostResponse.status === 200) {
        const value = loadPostData.data !== undefined && loadPostData.data.sort((a, b) => {
          return b.time - a.time
        })
        setAllPosts(prev => [...prev, ...value])
        // setLoadPostLength(loadPostData?.data.length)
      }
    } catch (err) {
      console.warn(err)
    }
  }



  function loadMorePost() {
    setIncreament(increament + 2)

  }





  return (
    <>

      {


        Object.keys(checkParams).length === 0 ?
          (allPosts.length > 0) && allPosts.map((item, index) => {
            return (<>
              <PostCard key={index} item={item} index={index} socket={socket} setShowLikeUserModal={setShowLikeUserModal} setAllPosts={setAllPosts} theme={theme} />

            </>
            )
          })
          :
          (profilePost.length > 0) && profilePost.map((item, index) => {
            return (<>
              <PostCard key={index} item={item} index={index} socket={socket} threeDot={threeDot} setShowLikeUserModal={setShowLikeUserModal} setAllPosts={setAllPosts} theme={theme} />
            </>
            )
          })
      }

      <div className={`infinite_scroll  text-center flex justify-center ${length === allPosts.length ? "hidden" : ""} w-full`}>
        <InfiniteScroll
          dataLength={length}
          next={loadMorePost}
          hasMore={true}
          loader={<Spinner name="three-bounce" />}
          className="md:ml-[8rem] ml-[0rem]"
          endMessage={
            <p>loeading end</p>
          }
        />
        {/* <Button className="text-[1.1rem] font-sans px-2 py-2" ref={buttonRef}>load more</Button> */}
      </div>
    </>
  )
}
export default PublicPostCard = React.memo(PublicPostCard)
