import './button.css'

const Button = ({
                    bgColor="red",
                    text, width=101,
                    style={},
                    className="",
                    ...props
}) => {
    const combinedStyle = {
        ...style,
        width: `${width}px`,
    }

    return (
        <button
            className={`custom-btn ${bgColor} ${className}`}
            style={combinedStyle}
            {...props}>
            {text}
        </button>
    )
}

export default Button