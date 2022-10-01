import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function Success(props) {
    const notify = () => toast.success(props.message, {
        position: props.position ? props.position : "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: props.color ? props.color : "colored",
        transition: props.transition ? props.transition : "slide",
    });
    notify()
    return (
        <div>
        </div>
    );
}
export function Error(props) {
    const notify = () => toast.error(props.message, {
        position: props.position ? props.position : "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
        theme: props.color ? props.color : "colored",
        transition: props.transition ? props.transition : "slide",
        // style: {
        //     color: '#fff',
        //     background: '#f44336',
        //     fontSize: '1.5rem',
        //     fontWeight: 'bold',
        //     borderRadius: '5px',
        //     zIndex: '15000',
        // }
    });
    notify()
    return (
        <div>
            {/* <ToastContainer /> */}
        </div>
    );
}
