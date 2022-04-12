import React, { useState, useEffect } from 'react'
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
// MATERIAL UI
function PublicPostCard({ data }) {
  const [filterPost, setFilterPost] = useState([])
  const { _id } = JSON.parse(localStorage.getItem("user_login")) ? JSON.parse(localStorage.getItem("user_login")) : { _id: "" }
  const dispatch = useDispatch()
  const GetAllPosts = useSelector((state) => {
    // console.log("all comment load here", state)
    // setPostArray(state.GetAllPosts)
    return state.GetAllPosts
  })
  const Notification = useSelector((state) => {
    // console.log("all comment load here", state)
    // setPostArray(state.GetAllPosts)
    return state.Notification
  })
  // GetAllComments
  const GetAllComments = useSelector((state) => {
    // setPostArray(state.GetAllPosts)
    return state.GetAllComments
  })
  //filter the data before delete
  function PostFilter(post_id) {
    //filter the posts
    const filterData = GetAllPosts.filter(post => {
      return post.post_id !== post_id
    })
    //filter the comments
    const filterComments = GetAllComments.filter(comment => {
      return comment.post_id !== post_id
    })
    //filter the notification
    const filterNotification = Notification.filter(notification => {
      return notification.post_id !== post_id
    })
    dispatch({ type: "Send_Notification", payload: filterNotification })
    return {
      filterData,
      filterComments
    }
  }
  //now load all the notification
  useEffect(async () => {
    const allNoti = await axios.get(`/blob/load/notification/${_id}`)
    console.log("all notification", allNoti)
    const { data } = allNoti.data
    dispatch({ type: "Send_Notification", payload: data })
  }, [])
  return (
    <React.StrictMode>
      {
        (GetAllPosts.length > 0) && (GetAllPosts).map((item, index) => {
          // console.log("item", item)
          return (
            <PostCard key={index} item={item} index={index} filterPost={PostFilter} />
          )
        })
      }
    </React.StrictMode>
  )
}
export default PublicPostCard