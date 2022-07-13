import React from 'react'
import PostCard from './PostCard';
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from 'react-spinkit'
import { useParams } from 'react-router-dom';
function PublicPostCard({ profilePost, socket, threeDot, setShowLikeUserModal, setAllPosts, allPosts, theme, length, setIncreament, increament, UserInformationLoad }) {
  const checkParams = useParams()

  function loadMorePost() {
    setIncreament(increament + 2)
  }


  return (
    <>
      {
        Object.keys(checkParams).length === 0 ?
          (allPosts?.length > 0) && allPosts.map((item, index) => {
            return (<>
              <PostCard key={index} item={item} index={index} socket={socket} setShowLikeUserModal={setShowLikeUserModal} setAllPosts={setAllPosts} theme={theme} />
            </>
            )
          })
          :
          (profilePost?.length > 0) && profilePost.sort((a, b) => b.time - a.time).map((item, index) => {
            return (<>
              <PostCard key={index} item={item} index={index} socket={socket} threeDot={threeDot} setShowLikeUserModal={setShowLikeUserModal} setAllPosts={setAllPosts} theme={theme} />
            </>
            )
          })
      }
      {UserInformationLoad && <div className={`infinite_scroll  text-center flex justify-center ${length === allPosts?.length ? "hidden" : ""} w-full`}>
        <InfiniteScroll
          dataLength={500}
          next={loadMorePost}
          hasMore={true}
          loader={<Spinner name="three-bounce" />}
          className="md:ml-[8rem] ml-[0rem]"

        />
      </div>}
    </>
  )
}
export default PublicPostCard = React.memo(PublicPostCard)
