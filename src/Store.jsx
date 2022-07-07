import { combineReducers, createStore } from 'redux';
import { ImageReducer } from './Redux/imageReducer/ImageReducer';
import LikeRedux from './Redux/likeCounter/LikeRedux';
import BackgroundImage from './Redux/ProfielReducer/BackgroundImage';
import EmojiHandle from './Redux/ProfielReducer/EmojiHandle';
import LoaderRedux from './Redux/ProfielReducer/LoaderRedux';
import { PostWhichUserSelectedText, PostWhichUserSelectedImageORVideo } from './Redux/ProfielReducer/PostWhichUserSelected';
import ShowImage, { ShowImageBackground } from './Redux/ProfielReducer/ShowImage';
import UnselectProfileImage, { UnselectBackgroundImage, UnselectPostImage, checkUrlExitsBg, checkUrlExitsProfile } from './Redux/ProfielReducer/UnselectProfileImage';
import uploadImageDataFrom, { uploadImageDataFromBackground } from './Redux/ProfielReducer/uploadImageDataFrom';
import UserStillLogin from './Redux/ProfielReducer/UserExistence';
import UserInformationLoad from './Redux/ProfielReducer/UserInformationLoad';
import ModalOpen from './Redux/OpenModalForChangePicture/Modal'
import FileType from './Redux/OpenModalForChangePicture/FileType'
import GetAllComments, { TotalComment } from './Redux/AllComments/GetAllComments'
import GetAllPosts from "./Redux/AllPostLoad/LoadPost";
import Name from './Redux/UserInfo/Name';
import Notification from './Redux/Notification/Notification'
import OnlineUsers from "./Redux/onlineUsers/onlineUser"
import Query from "./Redux/query/Query";
import ActiveStatus from "./Redux/Chats/ActiveStatus";
import BookMark from "./Redux/BookMarkPosts"
import getPos from "./Redux/GetPosition"
import OriginalProfileURL from "./Redux/OriginalProfileUrl"
import UnreadMessageNotification from "./Redux/UnreadMessageNotification"
import Theme from "./Redux/Theme"

const rootReducer = combineReducers({
    imageReducer: ImageReducer,
    UnselectProfileImage: UnselectProfileImage,
    uploadImageDataFrom: uploadImageDataFrom,
    ShowImage: ShowImage,
    BackgroundImage: BackgroundImage,
    LoaderRedux: LoaderRedux,
    UserInformationLoad: UserInformationLoad,
    UnselectBackgroundImage: UnselectBackgroundImage,
    uploadImageDataFromBackground: uploadImageDataFromBackground,
    ShowImageBackground: ShowImageBackground,
    UnselectPostImage: UnselectPostImage,
    PostWhichUserSelectedText: PostWhichUserSelectedText,
    PostWhichUserSelectedImageORVideo: PostWhichUserSelectedImageORVideo,
    EmojiHandle: EmojiHandle,
    UserStillLogin: UserStillLogin,
    LikeRedux: LikeRedux,
    Modal: ModalOpen,
    GetAllComments: GetAllComments,
    GetAllPosts: GetAllPosts,
    FileType: FileType,
    TotalComment: TotalComment,
    Notification,
    checkUrlExitsBg,
    checkUrlExitsProfile,
    Name,
    Query,
    OnlineUsers,
    ActiveStatus,
    getPos,
    BookMark,
    OriginalProfileURL,
    UnreadMessageNotification,
    Theme



})
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
