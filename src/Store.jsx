import { combineReducers, createStore } from 'redux';

import { ImageReducer } from './Redux/imageReducer/ImageReducer';
import UnselectProfileImage from './Redux/ProfielReducer/UnselectProfileImage';



const rootReducer = combineReducers({
    imageReducer: ImageReducer,
    UnselectProfileImage: UnselectProfileImage

})
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


