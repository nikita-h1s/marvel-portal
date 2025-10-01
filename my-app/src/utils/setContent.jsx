import Skeleton from "../components/skeleton/skeleton.jsx";
import Spinner from "../components/spinner/spinner.jsx";
import ErrorMessage from "../components/error-message/error-message.jsx";

const setContent = (process, Component, props) => {
    switch (process) {
        case "waiting":
            return <Skeleton/>;
        case "loading":
            return <Spinner/>;
        case "confirmed":
            return <Component {...props}/>;
        case "error":
            return <ErrorMessage/>;
        default:
            return new Error('Unexpected process state');
    }
}

export default setContent;