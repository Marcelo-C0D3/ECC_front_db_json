import './Header.css'
import React from 'react'

export default props =>
    <header className="header flex-column">
        <h1 className="mt-3">
        <i className={`fa fa-${props.icon} mr-3`}></i> 
            {props.title}
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>