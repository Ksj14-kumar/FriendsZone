import { useState, useEffect, useRef } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useDispatch } from 'react-redux'
import Button from "@material-tailwind/react/Button";
import { BallTriangle, Rings, Oval, ThreeDots, Circles, Puff, Bars } from 'react-loader-spinner'


import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";

const Comments = ({ commentsUrl, commentToggle, currentUserId, ImageUrl, currentUserName, UserIdForPostComments, post_id }) => {

  const [Length, setLength] = useState(0)
  const [commentLoader, setCommentLoader] = useState(false)
  const isMount = useRef(true)



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
    try {
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

    }
    catch (err) {
      console.warn(err)
    }

  };


  //update the comment
  const updateComment = async (text, commentId) => {

    try {
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

    }
    catch (err) {
      console.warn(err)
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
      console.warn(err)
    }


  }

  useEffect(() => {

    //load the all comments from backend
    async function loadComment() {
      try {
        setCommentLoader(true)

        const commentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/root/load/all/comments/${post_id}/${UserIdForPostComments}/${3}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`

          }
        })
        const commentData = await commentResponse.json()
        if (commentResponse.status === 200) {
          if (isMount.current) {

            setBackendComments(commentData.data)
            setLength(commentData.length)
            setCommentLoader(false)
          }

        }
        else if (commentResponse.status !== 200) {
          setCommentLoader(false)

        }

      }
      catch (err) {
        console.warn(err)
      }



    }
    loadComment()
    return (() => {
      isMount.current = false
    })

    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });
  }, [post_id]);




  //load all total comment of user
  useEffect(() => {
    async function totalComment() {
      try {
        setCommentLoader(true)
        const totalCommentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/all/comment/user/`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("uuid")}`

          }
        })
        const totalCommentData = await totalCommentResponse.json()
        if (totalCommentResponse.status === 200) {
          if (isMount.current) {
            setCommentLoader(false)
            dispatch({ type: "SET_TOTAL_COMMENT", payload: totalCommentData.data })
          }
        }

      }
      catch (err) {
        console.warn(err)

      }

    }
    totalComment()
    return (() => {
      isMount.current = false
    })


  }, [post_id])


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
        console.warn(err)
      }
    }
    loadComment()

  }




  return (
    <div className="comments">
      {/* <h3 className="comments-title">Comments</h3> */}
      {/* <div className="comment-form-title">Write comment</div> */}
      <CommentForm submitLabel="Comment" handleSubmit={addComment} commentToggle={commentToggle} backendComments={backendComments} />
      <div className={`comments-container mb-[1.5rem] ${commentLoader && "w-full flex justify-center items-center mb-[2rem]"}`}>

        {commentLoader ? <CommentLodaer /> : rootComments.map((rootComment) => (
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

          />
        ))}
      </div>


      <div className="load_more_comment flex justify-start ">


        {

          !commentLoader && (Length >= 2 && backendComments.length !== Length &&
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
            </Button>
          )




        }



      </div>
    </div>
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