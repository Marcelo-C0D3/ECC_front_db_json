import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em casa! */}
            <Link to="/">
                <i className="fa fa-home"></i> Home
            </Link>
            <Link to="/UpLoad">
                <i className="fa fa-users"></i> Upload
            </Link>
            <Link to="/Clipping">
                <i className="fa fa-users"></i> Clipping
            </Link>
        </nav>
    </aside>