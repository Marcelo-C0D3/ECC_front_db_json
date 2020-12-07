import React from 'react'
import Main from '../template/Main'
import Poster from './Poster'
import './Home.css'

export default props =>
    <Main icon="home" title="Home"
        subtitle="Seja mais Com Clipagem de alto nivel, Seja Premium! ">
        <div className= 'mainText display-4'>Bem Vindo!</div>
        <hr />
        <p className="mainText mb-0">Sistema para clippagem de Conteudo Digital!</p>
        <hr />
        <Poster/>
        <Poster/>
    </Main>