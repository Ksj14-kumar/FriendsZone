
// import img from '../../assets/img/team-2-800x800.jpg';

import FriendsCardInProfileCard from "./FriendsCardInProfileCard"

function Friends() {
  return (
    <div className=' '>
      {/* <header className='header bg-black text-center py-2 text-white '>
        hello

      </header> */}

      <div className="section md:px-2 md:py-3   relative flex flex-wrap justify-center gap-3 ">


        {/* CHILD ELEMENTS START FROM HERE */}
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />
        <FriendsCardInProfileCard />





      </div>






    </div>
  )
}

export default Friends