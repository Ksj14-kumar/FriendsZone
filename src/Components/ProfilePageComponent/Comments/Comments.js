import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useDispatch } from 'react-redux'


import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";

const Comments = ({ commentsUrl, currentUserId, ImageUrl, currentUserName, UserIdForPostComments, post_id }) => {

  

  const dispatch = useDispatch()


  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);


  //load the all parent comments which having the parent id null
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>

    //here commentId is every unique comment id
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = async (text, parentId) => {
    const comment = await createCommentApi(text, parentId, UserIdForPostComments, currentUserName, ImageUrl, post_id)
    console.log({ comment })
    const SaveUserComment = await fetch(`/blob/post/comment/save`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",

      }
    })
    const SaveUserCommentJson = await SaveUserComment.json()
    console.log({ SaveUserCommentJson })
    if (SaveUserComment.status === 200) {
      console.log("comment saved", SaveUserCommentJson.data )
      setBackendComments([...backendComments, SaveUserCommentJson.data]);
      setActiveComment(null);
    }
  };


  //update the comment
  const updateComment = async (text, commentId) => {

    const updateResponse = await fetch(`/blob/update/comment/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ text, commentId }),
      headers: {
        "Content-Type": "application/json",

      }
    })

    const updateResponseJson = await updateResponse.json()
    if (updateResponse.status === 200) {
      setBackendComments(updateResponseJson.data);
      setActiveComment(null);
    }
  };
  const deleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      const deleteResponse = await fetch(`/blob/post/comment/delete/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const DeleteResponseData = await deleteResponse.json()
      if (deleteResponse.status === 200) {

        setBackendComments(DeleteResponseData.data);

      }
    }
  }

  useEffect(() => {

    //load the all comments from backend
    async function loadComment() {
      const commentResponse = await fetch(`/blob/root/load/all/comments/${post_id}/${UserIdForPostComments}`)
      const commentData = await commentResponse.json()
      if (commentResponse.status === 200) {
        setBackendComments(commentData.data)
      }


    }
    loadComment()

    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });
  }, [post_id]);




  console.log({backendComments})
  //load all total comment of user
  useEffect(() => {
    async function totalComment() {
      const totalCommentResponse = await fetch(`/blob/all/comment/user/${UserIdForPostComments}`)
      const totalCommentData = await totalCommentResponse.json()
      if (totalCommentResponse.status === 200) {
        console.log({ totalCommentData })
        dispatch({ type: "SET_TOTAL_COMMENT", payload: totalCommentData.data })
      }
    }
    totalComment()



  }, [post_id] )






  return (
    <div className="comments">
      {/* <h3 className="comments-title">Comments</h3> */}
      {/* <div className="comment-form-title">Write comment</div> */}
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
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
            currentUserName={currentUserName}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;