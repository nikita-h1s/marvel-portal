import './header.css'

const Header = () => {
    return (
        <div className="header">
            <h1 className="header-title"><span>Marvel</span> information portal</h1>
            <div className="header-links">
                <span><a href="#" className="link-characters">Characters</a></span>
                <div className="header-slash"> / </div>
                <a href="#" className="link-comics">Comics</a>
            </div>
        </div>
    )
}

export default Header