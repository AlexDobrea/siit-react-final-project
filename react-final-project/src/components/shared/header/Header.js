import React, { useContext } from 'react';
import logo from './logo.svg';
import { NavLink } from 'react-router-dom';

import './Header.css';
import UserContext from '../../auth/UserContext';

function Header() {
    const { user, setUser } = useContext(UserContext);

    function handleLogout(e) {
        e.preventDefault();

        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <nav className="app-header">
            <ul >
                <li><img className="logo-header" src={ logo } alt="logo"/></li>
                <li><NavLink exact to="/" activeClassName="active">Photos</ NavLink></li>
                <li><NavLink to="/videos" activeClassName="active">Videos</NavLink></li>
                <li className="app-header-auth">
                    { ( user  ? 
                        <>
                            <NavLink to="/addVideo" activeClassName="active"> Add video</NavLink>
                            <a href="/" onClick={ handleLogout }>
                                Logout { user }
                            </a>
                        </>
                    :
                        <>
                            <NavLink to="/login" activeClassName="active">Login</NavLink>
                            <NavLink to="/register" activeClassName="active">Register</NavLink>
                        </>
                    )}
                </li>
            </ul>

        </nav>
    )
}

export default Header;