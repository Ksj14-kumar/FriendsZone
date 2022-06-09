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

    console.log({ comment, activeComment })
    return (
        <div key={comment.uuid} className="comment flex ml-5  md:ml-[3rem] mt-5 mds-editor6:ml-[2.1rem] mds-editor6:text-[.9rem] flex-wrap">

            <div className={`comment-image-container flex  w-full items-center  ${comment.parentId !== null && "pl-[2rem] mds-editor33:pl-[.8rem]"}`}>
                <div className="innerImage w-[2.5rem] h-[2.5rem] rounded-full flex-shrink-0 mds-editor6:w-[1.8rem] mds-editor6:h-[1.8rem] mds-editor6:ml-0 flex md:ml-0 ml-6">


                    {
                        ImageUrl &&
                        <Image
                            // src={ImageUrl}
                            src={comment.ImageUrl}
                            rounded={true}
                            raised={false}
                            alt=""
                            className="w-full h-full flex-shrink-0"
                        />

                    }
                </div>

                {/* comment-content  flex ml-2 -mt-1 items-center */}
                <div className="flex w-full ml-2 items-center">
                    {/* comment-author text-[1.1rem] font-medium mds-editor28:text-[1.2rem] mds-editor6:text-[.9rem] */}
                    <div className="comment-author text-[1.1rem] font-medium mds-editor28:text-[1.2rem] mds-editor6:text-[.9rem]">{comment.username}</div>
                    <div className="ml-2 mt-[3px]">{comment.createdAt}</div>
                </div>
            </div>
            <div className="comment-right-part w-full mr-2 mds-editor6:text-[.9rem]">
                {!isEditing &&
                    <div className={`w-full overflow-hidden flex flex-wrap pl-[4rem] mds-editor33:pl-[1.5rem] mds-editor33:pr-[1.2rem]  ${comment.parentId !== null && "pl-[7rem] mds-editor33:pl-[1.3rem] mds-editor33:pr-[2rem]"}`}>

                        <div className="comment-text ml-2  font-sans w-full flex flex-wrap"
                            dangerouslySetInnerHTML={{ __html: convertToLink(comment.body) }}
                        ></div>
                    </div>
                }

                {isEditing && (

                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        comment
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment.uuid)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />

                )}
                <div className={` flex pl-[4rem] ${comment.parentId !== null && "pl-[7rem]"}`}>
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
                    <div className={`${comment.username !== null && "pl-[4rem] mds-editor33:pl-[1.3rem] mds-editor33:pr-[1rem]"}`}>

                        <CommentForm
                            submitLabel="Reply"
                            commentReplyName={comment.username}
                            handleSubmit={(text) => addComment(text, replyId)}
                        />
                    </div>
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
                                currentUserName={currentUserName}
                            />
                        ))}
                    </div>
                )}
            </div>


        </div >
    );
};

export default Comment;


const convertToLink = (text) => {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var text1 = text.replace(exp, "<a href='$1' class='text-blue-500 hover:underline' target='_blank'>$1</a>");
    var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    return text1.replace(exp2, '$1<a href="http://$2" class="text-blue-500 hover:underline">$2</a>');
}