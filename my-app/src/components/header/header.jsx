import {Link, NavLink} from 'react-router';
import './header.css'

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="header-title"><span>Marvel</span> information portal</Link>
            <div className="header-links">
                <NavLink
                    to="/"
                    className={({isActive}) =>
                        isActive ? "link link-active" : "link"
                    }
                >
                    Characters
                </NavLink>

                <div className="header-slash"> /</div>

                <NavLink
                    to="/comics"
                    className={({isActive}) =>
                        isActive ? "link link-active" : "link"
                    }
                >
                    Comics
                </NavLink>
            </div>
        </div>
    )
}

export default Header