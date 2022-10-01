import React from 'react'
import Photos from '../UserPhotos/Photos';
function Photos1({assests}) {
  return (
    <>
      <div className="container1  flex flex-wrap justify-center">
        <Photos assests={assests}/>
      </div>
    </>
  )
}
export default Photos1