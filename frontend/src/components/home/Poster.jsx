import './Poster.css'
import poster from '../../assets/imgs/poster.jpg'
import React from 'react'

export default props =>
    <aside className="poster container-fluid">
            <img src={poster} alt="poster" />
    </aside>