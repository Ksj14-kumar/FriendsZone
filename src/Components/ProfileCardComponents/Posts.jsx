import React from 'react'
import PostCardInProfileSection from './PostCardInProfileSection'
function Posts() {
  return (
    <div className='parent -mx-20 flex-wrap '>
      <header className="header_section_for_post">
      </header>
      <div className="container2 flex drop-shadow-lg gap-1 flex-wrap justify-center">
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
        <PostCardInProfileSection />
      </div>
    </div>
  )
}
export default Posts