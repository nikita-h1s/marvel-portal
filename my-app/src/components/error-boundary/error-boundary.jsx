import {Component} from "react";
import ErrorMessage from "../error-message/error-message.jsx";

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({
            error: true,
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;