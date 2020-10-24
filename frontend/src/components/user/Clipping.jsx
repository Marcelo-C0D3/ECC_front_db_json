import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import Select from 'react-select'

const headerProps = {
    icon: 'item',
    title: 'Clipping Area',
    subtitle: 'Área destinada a clipagem do conteúdo obtido.'
}

const baseUrl = 'http://localhost:3030/items'

const initialState = {
    item: { audio: '', confidence: '' },
    description: null,
    list: [],
    listSearch: [],
    word: ''
}

export default class Clipping extends Component {

    state = { ...initialState }

    UNSAFE_componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }


    //Retorna estado inicial item
    clear() {
        this.setState({ item: initialState.item })
    }

    //Salva item
    save() {
        const item = this.state.item
        const method = item.id ? 'put' : 'post'
        const url = item.id ? `${baseUrl}/${item.id}` : baseUrl
        axios[method](url, item)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ item: initialState.item, list })
            })
    }

    //Atualiza lsita de itens
    getUpdatedList(item, add = true) {
        const list = this.state.list.filter(u => u.id !== item.id)
        if (add) list.unshift(item)
        return list
    }

    //Atualiza campo de items
    updateField(event) {
        let word = event.target.value
        this.setState({ word })
    }

    //nome do produto, a quantidade atual, quantidade mínima, o custo e o preço de revenda.
    getTesteList() {

        const list = this.state.list.filter(u => u.audio.toLowerCase().includes(`${this.state.word.toLowerCase()}`))
        this.setState({ listSearch: list })
    }

    renderTableSearch() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Audio</th>
                        <th>confidence</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderSearch()}
                </tbody>
                <thead>
                    <tr>
                    </tr>
                </thead>
            </table>
        )
    }

    renderSearch() {
        return this.state.listSearch.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.audio}</td>
                    <td>{item.confidence}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(item)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }


    renderForm() {
        return (
            <div>
                <div className="ml-3">
                    <label className="col-md-5" > <b>Busca :</b>
                        <input type="text" className="form-control"
                            name="busca"
                            value={this.state.word}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o que deseja clippar :D" />
                    </label>
                    <label className="col-3" >{this.selection()}</label>
                    <label className="col-3" >{this.selection()}</label>
                    {/* <label className="col-md-5">
                        aaaaaaaaaaaaaaaa
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value="Pedido">Radio</option>
                                <option value="Pedido">Anderson</option>
                                <option value="Pedido">Pedido</option>
                            </select>
                    </label> */}
                    <div className=" mt-4 mr-3 d-flex justify-content-end">
                        <div className="col-2 d-flex justify-content-end">
                            <button className="col-10 btn btn-primary ml-2"
                                onClick={e => this.getTesteList(e)}>
                                GO!
                                </button>
                            {/* <button className="col-10 btn btn-secondary ml-2"
                                onClick={e => this.saveTransc(e)}>
                                Salvar
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //renderiza a parte superior da tabela header.
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Audio</th>
                        <th>confidence</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
                <thead>
                    <tr>
                    </tr>
                </thead>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.audio}</td>
                    <td>{item.confidence}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(item)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    selection() {
        const options = [
            { value: 'Radio', label: 'Radio' },
            { value: 'som', label: 'Som' },
            { value: 'anuncio', label: 'anuncio' }
          ]
        return (
           <Select options={options} placeholder="Selecione um Filtro" isMulti className="basic-multi-select"
           classNamePrefix="select"></Select>     
        )
    }
    //renderização total parte userCrude.
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}

                {this.renderTableSearch()}

                {/* {this.renderTable()} */}
            </Main>
        )
    }
}