
import {  Link, useRouteMatch } from "react-router-dom"
import FriendsCardInProfileCard from "./FriendsCardInProfileCard"

function Friends({ info, loadUserProfileInfo, usernameId, _id, cancleFriendRequest, setAcceptMessage, friends, theme }) {
  const { path } = useRouteMatch()
  return (
    <div className=' '>
      <div className="section md:px-2 md:py-3   relative flex flex-wrap justify-center gap-3 ">
        {
          info?.friends !== undefined ? info.friends.map((item) => {
            return (
              <>
                <Link to={`/profile/${item._id}/`} >
                  <FriendsCardInProfileCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.url}
                    usernameId={usernameId}
                    _id={_id}
                    setAcceptMessage={setAcceptMessage}
                    cancleFriendRequest={cancleFriendRequest}
                    theme={theme}
                    friendsId={item.anotherUserId || item.anotherUserId} />
                </Link>
              </>
            )
          }) : <NoFriends />
        }
      </div>
    </div >
  )
}

export default Friends


function NoFriends() {
  return (
    <>
      <div className="conta w-full h-full">
        <p className="text-[3rem] text-[#cbcbcb] text-center font-semibold " style={{ userSelect: "none" }}>
          your friend list is empty
        </p>
      </div>
    </>
  )
}