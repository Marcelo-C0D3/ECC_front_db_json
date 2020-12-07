import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em casa! */}
            <Link to="/">
                <i className="fa fa-home mr-2"></i> Home
            </Link>
            <Link to="/UpLoad">
                <i className="fa fa-upload mr-2"></i> Upload
            </Link>
            <Link to="/Clipping">
                <i className="fa fa-search mr-2"></i> Clipping
            </Link>
            <Link to="/Save">
                <i className="fa fa-save mr-2"></i> Salvo
            </Link>
        </nav>
    </aside>