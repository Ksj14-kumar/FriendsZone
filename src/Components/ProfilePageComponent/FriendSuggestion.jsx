import React from "react";
import img1 from '../../assets/img/team-1-800x800.jpg'
import FriendInsideSlider from "./FriendInsideSlider";
import { useSelector } from "react-redux"

export default function FriendSuggestion({ AllUser, FilterUser }) {
  const UserInformationLoad = useSelector((state) => {
    return state.UserInformationLoad.value
  })
  const windowWidth = window.innerWidth
  async function sendFriendRequest(Recieverfname, Recieverlname, RecieverId, RecieverUrl, connectMessage) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/sendfriendrequest`, {
        method: "POST",
        body: JSON.stringify({
          profileUrl: UserInformationLoad?.url,
          recieverName: Recieverfname + " " + Recieverlname,
          senderName: UserInformationLoad?.fname + " " + UserInformationLoad?.lname,
          userId: localStorage.getItem("uuid"),
          currentUser: UserInformationLoad?.googleId,
          anotherUserId: RecieverId,
          receiverUrl: RecieverUrl,
          senderUrl: UserInformationLoad?.url,
          connectMessage
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("uuid")}`
        }
      })
      const data = await res.json()
      if (res.status === 200) {
      }
      else if (res.status !== 200) {
      }
    } catch (err) {
    }
  }
  return (
    <>
      <main className="main_friend flex gap-x-2 w-full overflow-x-auto" id="friends_suggestion_slider">
        {
          (AllUser !== null || AllUser !== undefined) && AllUser.map((item, index) => {
            return (
              <>
                <div key={index}>
                  <FriendInsideSlider image={img1} item={item} FilterUser={FilterUser} sendFriendRequest={sendFriendRequest} />
                </div>
              </>
            )
          })
        }
      </main>
    </>
  );
}
