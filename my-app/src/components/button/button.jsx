import './button.css'

const Button = ({bgColor="red", text, width=101, style={}, ...props}) => {
    const combinedStyle = {
        ...style,
        width: `${width}px`,
    }

    return (
        <button
            className={`custom-btn ${bgColor}`}
            style={combinedStyle}
            {...props}>
            {text}
        </button>
    )
}

export default Button