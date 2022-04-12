import React from 'react'
import Pusher from 'pusher-js';
//subscriobe the all pusher channels
const pusher = new Pusher("55296f450b8497fbd4f6", {
    cluster: "ap2",
    // encrypted: true,
});
// Pusher.logToConsole = true;
function Channel() {

    const deletePost = pusher.subscribe("DeletePost");
    const updateComment = pusher.subscribe("updateComment");
    const channel = pusher.subscribe('channel');
    const userDetails = pusher.subscribe('userDetails');
    const AddPost = pusher.subscribe('AddPost');

    //send request to  the all pusher conenction when user login


    //this is used for subscribe the channel
    deletePost.bind('pusher:subscription_succeeded', function (members) {
           // console.log("after subscription succedd...", members)
        // alert('successfully subscribed!');
    });

    channel.bind('pusher:subscription_succeeded', function (members) {

    });
    updateComment.bind('pusher:subscription_succeeded', function (members) {

    });
    userDetails.bind('pusher:subscription_succeeded', function (members) {

    });
    AddPost.bind('pusher:subscription_succeeded', function (members) {

    });



    return (
        <>
        </>

    )
}

export default Channel;