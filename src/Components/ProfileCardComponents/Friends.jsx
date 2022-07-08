
// import img from '../../assets/img/team-2-800x800.jpg';

import { useSelector } from "react-redux"
import { BrowserRouter, Link, NavLink, Redirect, Route, useParams, useRouteMatch } from "react-router-dom"
import ProfileCard from "../../Pages/ProfileCard"
import FriendsCardInProfileCard from "./FriendsCardInProfileCard"

function Friends({ info, loadUserProfileInfo, usernameId, _id, cancleFriendRequest, setAcceptMessage, friends,theme }) {

  const { path } = useRouteMatch()
  console.log(path)



  return (
    <div className=' '>
      {/* <header className='header bg-black text-center py-2 text-white '>
        hello

      </header> */}

      <div className="section md:px-2 md:py-3   relative flex flex-wrap justify-center gap-3 ">


        {/* CHILD ELEMENTS START FROM HERE */}


        {
          info?.friends !== undefined ? info.friends.map((item) => {
            const friendId = item.anotherUserId || item.currentUser

            return (
              <>

                <Link to={`/profile/${friendId}/`} >
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