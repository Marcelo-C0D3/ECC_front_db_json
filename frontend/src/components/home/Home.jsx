import React from 'react'
import Main from '../template/Main'
import Poster from './Poster'

export default props =>
    <Main icon="home" title="Início"
        subtitle="Seja mais Com Clipagem de alto nivel, Seja Premium! ">
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema para clippagem de Conteudo Digital!</p>
        <hr />
        <Poster/>
    </Main>