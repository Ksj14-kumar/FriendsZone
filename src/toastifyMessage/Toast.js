import { ToastContainer, toast } from 'react-toastify';
export async function success(props) {
    // window.alert("select files")
    const notify = () => toast.success(props.message, {
        position: props.pos?props.pos:"top-right",
        zIndex: 29000,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });
    notify()
    return (
        <div>
            <ToastContainer />
        </div>
    );
}
export function error(props) {
    const notify = () => toast.error(props.message, {
        position: props.pos?props.pos:"top-right",
        zIndex: 29000,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "toast-container",
    });
    notify()
    return (
        <div>
            <ToastContainer />
        </div>
    );
}