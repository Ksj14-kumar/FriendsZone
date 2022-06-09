import { useState, useRef, useEffect } from "react";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";
import Input from "@material-tailwind/react/Input";
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import Icon from "@material-tailwind/react/Icon";
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
    commentToggle,
    commentReplyName,

    backendComments
}) => {
    const [text, setText] = useState(initialText);
    const buttonRef = useRef()
    const textRef = useRef()

    const [emojiModal, setEmojiModal] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);


    const isTextareaDisabled = text.length === 0;  // if text is empty, disable textarea



    const onSubmitHandler = (e) => {
        e.preventDefault()

        if (text.length > 0) {
            handleSubmit(text);
            setText("");

        }
    };


    const onEmojiClick = (event, emojiObject) => {
        event.preventDefault()

        setText((pre) => pre + emojiObject.emoji)
        setChosenEmoji(emojiObject);

    };



    useEffect(() => {
        if (textRef.current) {
            textRef.current.style.height = "0px";
            textRef.current.style.height = textRef.current.scrollHeight + "px";

        }
    }, [text])


    // console.log({ commentReplyId })

    useEffect(() => {
        commentReplyName && setText(`@${commentReplyName}\b`)

    }, [commentReplyName])

    return (

        <>
            <div className="md:mr-10 md:ml-[1rem] px-1" id="comment_area_section">

                {/* ${text?.length ? (text.includes("@") ? ("underline font-bold") : ("")) : ("")}` */}
                <div className="textArea"
                // dangerouslySetInnerHTML={{ __html: text }}
                >

                    <textarea
                        ref={textRef}
                        className={`resize-none border border-solid border-[#dad7d7] focus:outline-none  w-full overflow-hidden p-4 rounded-lg text-[1.1rem] font-serif tracking-wider`}
                        placeholder="Write a comment..."
                        onChange={(e) => {
                            setText(e.target.value)
                            e.preventDefault()
                        }}
                        value={text}
                    // dangerouslySetInnerHTML={{ __html: text }}
                    >
                    </textarea>
                </div>

                <section className="bg-red-600  flex justify-end relative ">

                    <Button
                        color=""
                        buttonType=""
                        size="sm"
                        rounded={false}
                        block={false}
                        ripple="none"
                        // disabled={isTextareaDisabled}
                        className="lowercase absolute -mt-8 p-0 "
                        iconOnly={true}
                        ref={buttonRef}

                    >
                        <Icon name={<BsFillEmojiSmileFill className="text-[#ef703d] text-[1.5rem] mb-[8px]" />} />
                    </Button>
                </section>

                <section className="flex py-[5px] px-2">

                    <Button
                        color={isTextareaDisabled ? "gray" : "blue"}
                        buttonType="filled"
                        size="sm"
                        rounded={false}
                        block={false}
                        iconOnly={false}


                        ripple="none"
                        disabled={isTextareaDisabled}

                        className="normal-case  tracking-widest"
                        onClick={(e) => {

                            e.preventDefault()
                            onSubmitHandler(e)
                        }}
                    >
                        {submitLabel}
                    </Button>
                    {hasCancelButton && (
                        // <button
                        //     type="button"
                        //     className="comment-form-button comment-form-cancel-button"
                        //     onClick={handleCancel}
                        // >
                        //     Cancel
                        // </button>


                        <Button
                            color={isTextareaDisabled ? "gray" : "blue"}
                            buttonType="link"
                            size="sm"
                            rounded={false}
                            block={false}
                            iconOnly={false}


                            ripple="none"
                            onClick={handleCancel}
                            // disabled={isTextareaDisabled}
                            className="ml-1 lowercase"
                        >
                            cancle
                        </Button>
                    )}
                </section>



                <Tooltips placement="auto" ref={buttonRef}>
                    <TooltipsContent>
                        <Picker onEmojiClick={onEmojiClick}

                            disableSearchBar={true}
                            disableAutoFocus={true}
                            preload={true}
                            pickerStyle={{
                                "nav": {
                                    "display": "none",
                                    "visibility": "hidden"
                                }
                            }
                            } />

                    </TooltipsContent>
                </Tooltips>
            </div>












        </>
    );
};

export default CommentForm;