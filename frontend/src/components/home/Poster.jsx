import './Poster.css'
import poster from '../../assets/imgs/poster.jpg'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="poster">
        <Link to="/" className="poster">
            <img src={poster} alt="poster" />
        </Link>
    </aside>