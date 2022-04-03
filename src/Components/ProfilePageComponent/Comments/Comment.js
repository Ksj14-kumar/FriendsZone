import CommentForm from "./CommentForm";
import Button from "@material-tailwind/react/Button";
import UserPhoto from "../../../assets/img/download.png"
import Image from "@material-tailwind/react/Image";


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


  
    const isEditing =
        activeComment &&
        activeComment.uuid === comment.uuid &&
        activeComment.type === "editing";
    const isReplying =
        activeComment &&
        activeComment.uuid === comment.uuid &&
        activeComment.type === "replying";
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    // && !timePassed  delete time out
    const canDelete =
        currentUserId === comment.userId && replies.length === 0;
    const canReply = Boolean(currentUserId);
    // && !timePassed edit time out
    // UserIdForPostComments===currentId
    const canEdit = currentUserId === comment.userId;
    const replyId = parentId ? parentId : comment.uuid;
    // const createdAt = new Date(comment.createdAt).toLocaleDateString();
    return (
        <div key={comment.uuid} className="comment flex ml-5  md:ml-[5rem] mt-5 mds-editor6:ml-[1rem] mds-editor6:text-[.9rem]  mds-editor6:ml-0">
            <div className="comment-image-container w-[2.5rem] h-[2.5rem] rounded-full flex-shrink-0 mds-editor6:w-[1.8rem] mds-editor6:h-[1.8rem] mds-editor6:ml-0">
                {
                    ImageUrl &&
                    <Image
                    src={ImageUrl}
                    rounded={true}
                    raised={false}
                    alt="Rounded Image"
                />
                    
                }
            </div>
            <div className="comment-right-part  w-full mr-2 mds-editor6:text-[.9rem]">
                <div className="comment-content  flex ml-2 -mt-1 ">
                    <div className="comment-author  font-medium text-[1.1rem] mds-editor6:text-[.9rem]">{currentUserName}</div>
                    <div className="ml-2">{comment.createdAt}</div>
                </div>
                {!isEditing && <div className="comment-text ml-2  font-sans  ">{comment.body}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment.uuid)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
                <div className="comment-actions flex ml-[5rem]  mt-1 mds-editor6:ml-0">
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
                            className="comment-action mr-3"
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
                </div>
                {isReplying && (
                    <CommentForm
                        submitLabel="Reply"
                        handleSubmit={(text) => addComment(text, replyId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className="replies mt-3">
                        {replies.map((reply) => (
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
                                currentUserName={ currentUserName}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;