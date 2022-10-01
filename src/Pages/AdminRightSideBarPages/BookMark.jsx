import React from 'react'
import { useSelector } from 'react-redux'
import InternetDetection from '../../Components/InternetDetection'
import PostCard from '../../Components/ProfilePageComponent/PostCard'
function BookMark({ socket, setShowLikeUserModal }) {
    const { BookMarkList, theme } = useSelector((state) => {
        return {
            BookMarkList: state.UserInformationLoad.value.bookMarkPost,
            theme: state.Theme
        }
    })
    return (
        <>
            <InternetDetection />
            <div className=' bookmark_page    flex flex-wrap  md:ml-[16rem] pt-3 md:p-0 mt-[3rem] justify-center '>
                <div className=' flex flex-wrap gap-x-2 gap-y-3   pt-[1rem]  justify-center md:ml-[5rem] md:mt-4 '>
                    {
                        BookMarkList?.length > 0 ? BookMarkList.map((item, index) => {
                            return (
                                <>
                                    <PostCard item={item} key={index} index={index} socket={socket} setShowLikeUserModal={setShowLikeUserModal} bookMark={true} theme={theme} />
                                </>
                            )
                        }) : <NoBookMark />
                    }
                </div>
            </div>
        </>
    )
}
export default BookMark = React.memo(BookMark)
function NoBookMark() {
    return (
        <>
            <p className='text-[1.2rem] font-serif select-none'>No, Book Mark
                Selected
            </p>
        </>
    )
}