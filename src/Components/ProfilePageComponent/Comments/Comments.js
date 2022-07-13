import { useState, useEffect, useRef } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useDispatch } from 'react-redux'
import Button from "@material-tailwind/react/Button";
import { BallTriangle } from 'react-loader-spinner'
import Axios from "axios"

import {
  // getComments as getCommentsApi,
  createComment as createCommentApi,
  // updateComment as updateCommentApi,
  // deleteComment as deleteCommentApi,
} from "./api";
import { AnimatePresence } from "framer-motion";

const Comments = ({ commentsUrl, commentToggle, currentUserId, ImageUrl, currentUserName, UserIdForPostComments, post_id, setCommentLength, socket, setCommentToggle, commentsLength, setLike, setLikeCount, item, theme }) => {


  const [Length, setLength] = useState(0)
  const [commentLoader, setCommentLoader] = useState(false)
  const isMount = useRef(true)
  const isMount1 = useState(true)
  const dispatch = useDispatch()
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  //load the all parent comments which having the parent id null
  const rootComments = backendComments.filter(
    (backendComment) => {
      return backendComment.parentId === null
    }
  ).sort((a, b) => b.createdAt - a.createdAt)
  const getReplies = (commentId) =>
    //here commentId is every unique comment id
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = async (value, parentId, replyParentId = "") => {


    //this is Old Method
    // const comment = await createCommentApi(text, parentId, UserIdForPostComments, currentUserId, currentUserName, ImageUrl, post_id)

    // return
    try {
      const comment = await createCommentApi(value, parentId, UserIdForPostComments, currentUserId, currentUserName, ImageUrl, post_id)
      if (socket?.connected) {
        socket.emit("sendNotificationAllType", { comment, commentBy: currentUserId, parentId, replyParentId })
        socket?.emit("sendComment", { comment: [comment, ...backendComments], post_id })
        socket?.emit("commentLength", { post_id, commentLength: [comment, ...backendComments,].length })

        socket?.off("getComments").on("getComments", (data) => {
          if (data.post_id === post_id) {
            setBackendComments(data.comment)
          }
        })

        await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/post/comment/save/`, {
          method: "POST",
          body: JSON.stringify({ comment, uuid: localStorage.getItem('uuid') }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
          }
        })

        // api/v1/user/comment/post/:postId
        await Axios({
          method: "PUT",
          url: `${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/user/comment/post/${post_id}`,
          data: JSON.stringify({ comment, commentBy: currentUserId, parentId, replyParentId }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
          }
        })
      }
      else {
        const SaveUserComment = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/post/comment/save/`, {
          method: "POST",
          body: JSON.stringify({ comment, uuid: localStorage.getItem('uuid') }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
          }
        })
        await Axios({
          method: "PUT",
          url: `${process.env.REACT_APP_API_BACKENDURL}/blob/api/v1/user/comment/post/${post_id}`,
          data: JSON.stringify({ comment, commentBy: currentUserId, parentId, replyParentId }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
          }
        })
        const SaveUserCommentJson = await SaveUserComment.json()
        if (SaveUserComment.status === 200) {
          setBackendComments([...backendComments, SaveUserCommentJson.data.comment]);
          setActiveComment(null);
        }
      }
    }
    catch (err) {
    }
  };





  //update the comment
  const updateComment = async (text, commentId) => {

    try {
      const updateResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/update/comment/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({ text: text.value, commentId, post_id }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("uuid")}`
        }
      })
      const updateResponseJson = await updateResponse.json()
      if (updateResponse.status === 200) {
        setBackendComments(updateResponseJson.data);
        setActiveComment(null);
      }
    }
    catch (err) {
    }

  };
  const deleteComment = async (commentId) => {
    try {
      if (window.confirm("Are you sure you want to remove comment?")) {
        const deleteResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/post/comment/delete/${commentId}`, {
          body: JSON.stringify({
            post_id: post_id,
          }),
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`,
          }
        })
        const DeleteResponseData = await deleteResponse.json()
        if (deleteResponse.status === 200) {
          setBackendComments(DeleteResponseData.data);
        }
      }
    }
    catch (err) {
    }
  }



  // ======================GET COMMENT LENGTH===================================
  useEffect(() => {
    let isMount = true
    if (isMount) {

      if (socket.connected) {
        socket.on("getCommentLength", (data) => {
          if (data.post_id === post_id) {
            setCommentLength({ length: data.commentLength, post_id: data.post_id })
          }
        })
      }
      else {
        setCommentLength({ length: backendComments.length, post_id: post_id })
      }
    }
    return () => {
      isMount = false
    }
  }, [socket, backendComments])


  useEffect(() => {
    //load the all comments from backend
    let isMount = true
    async function loadComment() {
      try {
        setCommentLoader(true)
        const commentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/root/load/all/comments/${post_id}/${UserIdForPostComments}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        })
        const commentData = await commentResponse.json()
        if (commentResponse.status === 200) {
          if (isMount) {
            if (post_id === commentData.post_id) {
              setLength(commentData.length)
              setBackendComments(commentData.data)
              setCommentLoader(false)
            }
          }
        }
        else if (commentResponse.status !== 200) {
          setCommentLoader(false)
        }
      }
      catch (err) {
      }
    }
    loadComment()
    return (() => {
      isMount = false
    })
  }, [post_id, UserIdForPostComments]);



  function loadMoreComment() {
    //load the all comments from backend
    async function loadComment() {
      try {
        const commentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/root/load/all/comments/${post_id}/${UserIdForPostComments}/${backendComments.length + 6}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`
          }
        })
        const commentData = await commentResponse.json()
        if (commentResponse.status === 200) {
          setBackendComments(commentData.data)
        }
      }
      catch (err) {
      }
    }
    loadComment()
  }

  useEffect(() => {

    let isMount = true
    async function NumberOfComments() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/number/comment/length`, {
          method: "POST",
          body: JSON.stringify({ post_id: post_id }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const data = await response.json()
        if (isMount) {

          // if (isMountCommentLength.current) {
          if (response.status === 200) {
            setCommentLength({ length: data.data, post_id: data.post })
            // setShareLength(0)
          }
          else if (response.status !== 200) {
            setCommentLength({ length: 0, post_id: data.post })
          }
        }
      } catch (error) {
      }
    }
    NumberOfComments()
    return () => {
      isMount = false
    }
  }, [post_id])



  return (
    <div className="comments">
      <CommentForm submitLabel="Comment" handleSubmit={addComment} commentToggle={commentToggle} backendComments={backendComments} setCommentToggle={setCommentToggle} theme={theme} />
      <div className={`comments-container mb-[1.5rem]   ${commentLoader && "w-full  mb-[2rem]"}`}>
        {/* commentLoader ? <CommentLodaer /> : */}
        <AnimatePresence>

          {commentToggle && rootComments.map((rootComment) => (
            < Comment
              key={rootComment.uuid}
              comment={rootComment}
              replies={getReplies(rootComment.uuid)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              currentUserId={currentUserId}
              ImageUrl={rootComment.ImageUrl}
              // ImageUrl={ImageUrl}
              currentUserName={currentUserName}
              theme={theme}
            />
          ))}
        </AnimatePresence >

      </div>





      <AnimatePresence >
        {
          commentToggle &&
          <div className="load_more_comment flex justify-start ">
            {(Length >= 2 && backendComments.length !== Length) &&
              <Button
                color="blueGray"
                buttonType="link"
                size="sm"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple=""
                className="lowercase ml-[5rem] font-bold text-base mb-3"
                onClick={() => {
                  loadMoreComment()
                }}
              >
                load more comment
              </Button>}
          </div>
        }
      </AnimatePresence >




    </div >
  );
};

export default Comments;



function CommentLodaer() {
  return (
    <>
      <BallTriangle color="#827397" height={80} width={80} />


    </>
  )
}