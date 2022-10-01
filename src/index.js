import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App"
import "./index.css"
import { ToastContainer } from 'react-toastify';
import 'tippy.js/dist/border.css';
import "@material-tailwind/react/tailwind.css";
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css';
import { store } from './Store';
import 'video.js/dist/video-js.css';
import { Provider } from 'react-redux'
ReactDOM.render(
    <>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </Provider>
    </>,
    document.getElementById("root")
)