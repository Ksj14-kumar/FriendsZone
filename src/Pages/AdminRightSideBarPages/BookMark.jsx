import React from 'react'
import {  useSelector } from 'react-redux'
import PostCard from '../../Components/ProfilePageComponent/PostCard'

function BookMark({ socket, setShowLikeUserModal }) {


    
    const { BookMarkList, theme } = useSelector((state) => {
        return {
            BookMarkList: state.UserInformationLoad.value.bookMarkPost,
            theme:state.Theme
        }
    })

    return (
        <div className=' bookmark_page   h-[calc(100vh-3rem)] flex flex-wrap  md:ml-[16rem] pt-3 md:p-0 mt-[3rem] overflow-y-auto '>
            <div className=' h-[41rem] flex flex-wrap gap-x-2 gap-y-3   pt-[1rem]  justify-center md:ml-[5rem] md:mt-4'>
                {
                    BookMarkList?.length > 0 && BookMarkList.map((item, index) => {
                        console.log({ item })
                        return (
                            <>
                                <PostCard item={item} key={index} index={index} socket={socket} setShowLikeUserModal={setShowLikeUserModal} bookMark={true} theme={theme} />

                            </>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default BookMark = React.memo(BookMark)