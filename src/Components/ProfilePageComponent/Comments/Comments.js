import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useDispatch } from 'react-redux'
import Button from "@material-tailwind/react/Button";


import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";

const Comments = ({ commentsUrl, commentToggle, currentUserId, ImageUrl, currentUserName, UserIdForPostComments, post_id }) => {

  const [Length, setLength] = useState(0)



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
    const comment = await createCommentApi(text, parentId, UserIdForPostComments, currentUserId, currentUserName, ImageUrl, post_id)
    const SaveUserComment = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/post/comment/save/`, {
      method: "POST",
      body: JSON.stringify({ comment, uuid: localStorage.getItem('uuid') }),
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
  };


  //update the comment
  const updateComment = async (text, commentId) => {

    const updateResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/update/comment/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ text, commentId, post_id }),
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
  };
  const deleteComment = async (commentId) => {
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

  useEffect(() => {

    //load the all comments from backend
    async function loadComment() {
      const commentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/root/load/all/comments/${post_id}/${UserIdForPostComments}/${4}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("uuid")}`

        }
      })
      const commentData = await commentResponse.json()
      if (commentResponse.status === 200) {
        setBackendComments(commentData.data)
        setLength(commentData.length)
      }


    }
    loadComment()

    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });
  }, [post_id]);




  //load all total comment of user
  useEffect(() => {
    async function totalComment() {
      const totalCommentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/all/comment/user/`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("uuid")}`

        }
      })
      const totalCommentData = await totalCommentResponse.json()
      if (totalCommentResponse.status === 200) {
        dispatch({ type: "SET_TOTAL_COMMENT", payload: totalCommentData.data })
      }
    }
    totalComment()



  }, [post_id])


  function loadMoreComment() {
    //load the all comments from backend
    async function loadComment() {
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
    loadComment()

  }




  return (
    <div className="comments">
      {/* <h3 className="comments-title">Comments</h3> */}
      {/* <div className="comment-form-title">Write comment</div> */}
      <CommentForm submitLabel="Write" handleSubmit={addComment} commentToggle={commentToggle} />
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
            // ImageUrl={ImageUrl}
            currentUserName={currentUserName}
          />
        ))}
      </div>


      <div className="load_more_comment flex justify-start ">


        {

          Length > 2 && (backendComments.length !== Length &&
            <Button
              color="blueGray"
              buttonType="link"
              size="sm"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple=""
              className="lowercase ml-[5rem] font-bold text-base"
              onClick={() => {
                loadMoreComment()
              }}
            >
              load more comment
            </Button>
          )




        }



      </div>
    </div>
  );
};

export default Comments;