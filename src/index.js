import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App"
import "./index.css"
import { ToastContainer, toast } from 'react-toastify';

// import "./index1.css"
import "@material-tailwind/react/tailwind.css";
import { BrowserRouter } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.min.css';
import { store } from './Store';

import { useDispatch, useSelector, Provider } from 'react-redux'




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