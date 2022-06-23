import CommentForm from "./CommentForm";
import Button from "@material-tailwind/react/Button";
import UserPhoto from "../../../assets/img/download.png"
import Image from "@material-tailwind/react/Image";
import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "timeago.js";
import { useEffect } from "react";



const Comment = ({
    comment,
    replies,
    setActiveComment,
    activeComment,
    updateComment,
    deleteComment,
    addComment,
    parentId = null,
    currentUserId,
    ImageUrl,
    currentUserName,
}) => {

    const [showReplies, setShowReplies] = useState(false)
    const [image, setImage] = useState(null);
    const [GifURL, setGifURL] = useState(null);




    const isEditing =
        activeComment &&
        activeComment.uuid === comment?.uuid &&
        activeComment.type === "editing";
    const isReplying =
        activeComment &&
        activeComment.uuid === comment?.uuid &&
        activeComment.type === "replying";
    // const fiveMinutes = 300000;
    // const timePassed = new Date() - new Date(comment?.createdAt) > fiveMinutes;
    // && !timePassed  delete time out
    const canDelete =
        currentUserId === comment?.userId && replies.length === 0;
    const canReply = Boolean(currentUserId);
    // && !timePassed edit time out
    // UserIdForPostComments===currentId
    const canEdit = currentUserId === comment?.userId;
    const replyId = parentId ? parentId : comment?.uuid;
    // const createdAt = new Date(comment.createdAt).toLocaleDateString();




    useEffect(() => {
        async function HandleAsyncchronous() {

            if (comment.ImageUrl) {
                const bres = await fetch(comment.ImageUrl)
                const blob = await bres.blob()
                const url = URL.createObjectURL(blob)
                setImage(url)
            }
        }
        // if (isMount.current) {

        // }
        // if (comment.ImageUrl) {

        // }
        // return () => {
        //     isMount.current = false
        // }
        HandleAsyncchronous()
    }, [comment?.ImageUrl])

    useEffect(() => {
        async function HandleAsyncchronous() {
            if (comment.type === "gif") {
                const res = await fetch(comment.body)
                const blob = await res.blob()
                const url = URL.createObjectURL(blob)
                setGifURL(url)
            }
        }
        HandleAsyncchronous()
    }, [comment])




    return (
        <motion.div key={comment?.uuid} className="comment flex   md:ml-[3rem]  mt-5   mds-editor6:ml-[0.1rem] mds-editor6:text-[.9rem] flex-wrap relative "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* bg-[#f2f2f2cc] */}
            <div className={`comment-image-container flex flex-col  w-full flex-wrap -center pl-2  py-1 rounded-md bg-[#eeeeee1d]  drop-shadow-sm ${comment.parentId !== null ? "pl-[2rem] mds-editor28:pl-[.4rem] mds-editor28:ml-[3.8rem] mds-editor35:pl-[8rem]" : " md:mr-2 mds-editor28:w-full mds-editor28:pl-[1.3rem] mds-editor35:pl-[3rem] "}`}>
                <div className="flex ">
                    <div className={`innerImage w-[2.5rem] h-[2.5rem] rounded-full flex-shrink-0 mds-editor28:w-[1.8rem]mds-editor28:h-[1.8rem] mds-editor6:ml-0 flex md:ml-0 relative`}>
                        {
                            ImageUrl ?
                                <Image
                                    // src={ImageUrl}
                                    // UserPhoto
                                    // src={comment?.ImageUrl}
                                    src={image}
                                    rounded={true}
                                    raised={false}
                                    alt=""
                                    className="w-full h-full flex-shrink-0"
                                /> : <Image
                                    src={UserPhoto}
                                    rounded={true}
                                    raised={false}
                                    alt=""
                                    className="w-full h-full flex-shrink-0"
                                />
                        }
                    </div>
                    <div className="comment-author text-[1.1rem] font-medium mds-editor28:text-[1.2rem] mds-editor6:text-[.9rem] ml-2">{comment.username}</div>
                </div>
                {/* comment-content  flex ml-2 -mt-1 items-center */}
                {/* ml-2 */}
                <div className="flex flex-col  justify-center  pl-[3rem] flex-wrap overflow-hidden w-full">
                    {/* comment-author text-[1.1rem] font-medium mds-editor28:text-[1.2rem] mds-editor6:text-[.9rem] */}
                    {!isEditing &&
                        <div className={`w-full overflow-hidden flex flex-wrap pl-[0rem] mds-editor33:pl-[.1rem] mds-editor33:pr-[1.5rem] break-all  ${comment.parentId !== null && "pl-[0rem] mds-editor33:pl-[1.3rem] mds-editor33:pr-[2rem]"}`}>
                            {comment.type === "text" ? <div className="comment-text ml-2  font-serif tracking-wider w-full flex flex-wrap break-all"
                                dangerouslySetInnerHTML={{ __html: convertToLink(comment.body) }}
                            ></div> : (
                                comment.type === "gif" &&
                                <div className={`${comment.parentId !== null && "pr-1"} w-full`}>

                                    <Image src={GifURL} className=" w-[15rem] mds-editor28:w-[10rem]"

                                    />
                                </div>
                            )
                            }
                        </div>
                    }
                </div>
            </div>
            {/* <div className="like_show relative">
                like

            </div> */}
            <div className="comment-right-part mt-2 w-full mr-2 mds-editor6:text-[.9rem]">
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        comment
                        initialText={comment?.body}
                        handleSubmit={(value) => {
                            // console.log({ text })
                            updateComment(value, comment.uuid)
                        }}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />

                )}

                <div className={` flex mt-1  items-center pl-[4rem] mds-editor35:pl-[6rem] ${comment.parentId !== null && "pl-[2rem] mds-editor35:pl-[11rem]"}`}>
                    <div className=" mt-[0px] truncate">{format(comment.createdAt)}</div>
                    {canReply && (
                        <div
                            className="comment-action  mr-3"
                            onClick={() =>
                                setActiveComment({ uuid: comment.uuid, type: "replying" })
                            }
                        >
                            <Button
                                color="blue"
                                buttonType="outline"
                                size="sm"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                                className="lowercase border-0"
                            >
                                Reply
                            </Button>

                        </div>
                    )}
                    {canEdit && (
                        <div
                            className={`comment-action mr-3 ${comment.type === "gif" && "hidden"}`}
                            onClick={() =>
                                setActiveComment({ uuid: comment.uuid, type: "editing" })
                            }
                        >
                            <Button
                                color="blue"
                                buttonType="outline"
                                size="sm"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                                className="lowercase border-0"

                            >

                                Edit
                            </Button>
                        </div>
                    )}
                    {canDelete && (
                        <div
                            className="comment-action"
                            onClick={() => deleteComment(comment.uuid)}
                        >
                            <Button
                                color="blue"
                                buttonType="outline"
                                size="sm"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                                className="lowercase border-0"

                            >
                                Delete
                            </Button>
                        </div>
                    )}
                    {
                        // canLike && <div
                        //     className="comment-action"
                        //     onClick={() => deleteComment(comment.uuid)}
                        // >
                        //     <Button
                        //         color="blue"
                        //         buttonType="outline"
                        //         size="sm"
                        //         rounded={false}
                        //         block={false}
                        //         iconOnly={false}
                        //         ripple="light"
                        //         className="lowercase border-0 tracking-wider font-sans"

                        //     >
                        //         like
                        //     </Button>
                        // </div>
                    }
                </div>
                {isReplying && (
                    <div className={`${comment.username !== null && "pl-[5.5rem]  mds-editor33:pl-[.5rem] mds-editor33:pr-[0rem] "}`}>

                        <CommentForm
                            submitLabel="Reply"
                            commentReplyName={comment.username}
                            handleSubmit={(value) => {
                                addComment(value, replyId)
                                // console.log({ text })
                            }}
                        />
                    </div>
                )}
                {

                    replies.length > 0 && (
                        (
                            showReplies
                                ?

                                <div className="replies mt-3">
                                    {replies.map((reply) => {
                                        return (


                                            <Comment
                                                comment={reply}
                                                key={reply.uuid}
                                                setActiveComment={setActiveComment}
                                                activeComment={activeComment}
                                                updateComment={updateComment}
                                                deleteComment={deleteComment}
                                                addComment={addComment}
                                                parentId={comment.uuid}
                                                replies={[]}
                                                currentUserId={currentUserId}
                                                ImageUrl={ImageUrl}
                                                currentUserName={currentUserName}
                                            />

                                        )
                                    }
                                    )}

                                </div> : (
                                    <Button
                                        color="#570A57"
                                        buttonType="link"
                                        size="sm"
                                        rounded={false}
                                        block={false}
                                        iconOnly={false}
                                        ripple=""
                                        className="lowercase ml-[5rem] font-bold text-base mb-3 text-[#570A57]"
                                        onClick={() => {
                                            setShowReplies(true)
                                        }}
                                    >
                                        show replies
                                    </Button>
                                )
                        )


                    )}

            </div>


        </motion.div >
    );
};

export default Comment;


const convertToLink = (text) => {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var text1 = text?.replace(exp, "<a href='$1' class='text-blue-500 hover:underline' target='_blank'>$1</a>");
    var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    return text1?.replace(exp2, '$1<a href="http://$2" class="text-blue-500 hover:underline">$2</a>');
}
