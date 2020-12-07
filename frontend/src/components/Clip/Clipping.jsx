import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import Select from 'react-select'
import FullScreenDialog from '../dialogs/Dialog'
import {
    initialState,
    means,
    types,
    headerProps,
    baseUrlItem,
    baseUrlClip,
} from '../Global/ClippingGlobals'

export default class Clipping extends Component {

    state = { ...initialState }

    UNSAFE_componentWillMount() {
        axios(baseUrlItem).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    saveClip(item) {

        const list = this.state.searchItem.filter(z => {
            return z.id !== item.id
        })

        item.id = null

        axios.post(`${baseUrlClip}`, item).then(resp => {
            this.setState({ searchItem: list })
            console.log(resp)
        })


    }

    //Atualiza campo de items
    updateField(event) {
        let word = event.target.value
        this.setState({ word })
    }



    //nome do produto, a quantidade atual, quantidade mínima, o custo e o preço de revenda.
    getTesteList(word) {

        if (word !== "") {
            const lista = JSON.parse(JSON.stringify(this.state.list));
            const filtering = lista.filter(u => u.audio.toLowerCase().includes(`${word.toLowerCase()}`)).map(z => {
                z.audio = z.audio.replace(new RegExp(`${word}`, "gi"), `"${word}"`)
                z.words = word
                return z
            })
            this.setState({ searchItem: filtering })
        } else {

        }
    }

    renderTableSearch() {
        if (this.state.searchItem) {
            return (
                <table className="table mt-4">
                    <thead>
                        <tr className="flex-fill">
                            <th>ID</th>
                            <th>Word Clip</th>
                            <th>Name</th>
                            <th>Audio</th>
                            <th className="d-flex justify-content-end">View / Save</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSearch()}
                    </tbody>
                </table>
            )
        } else {
            return (
                <div className="mt-4 ml-4">
                    <h4>
                        Searching for phrases or words!
                    </h4>
                </div>
            )
        }
    }

    renderSearch() {
        return this.state.searchItem.map(item => {
            return (
                <tr key={item.id}>
                    <td >{item.id}</td>
                    <td >" {item.words} "</td>
                    <td >{item.rotule.name}</td>
                    <td >{item.file}</td>
                    <td className="d-flex justify-content-end">
                        <FullScreenDialog className="d-flex" {...item} />
                        <button className="ml-2 btn btn-warning"
                            onClick={() => this.saveClip(item)}>
                            <i className="fa fa-save"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderForm() {
        return (
            <div >
                <div className="ml-3">
                    <label className="col-md-7" >
                        <b>
                            <h2>
                                Search:
                            </h2>
                        </b>
                        <input type="text" className="form-control"
                            name="busca"
                            value={this.state.word}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o que deseja clippar :D" />
                    </label>
                </div>
                <div className="ml-3">
                    <label className="col-3">
                        Means of communication
						<Select options={means} placeholder="Selecione um Filtro" isMulti className="basic-multi-select" classNamePrefix="select" />
                    </label>
                    <label className="col-3">
                        Type
						<Select options={types} placeholder="Selecione um Filtro" isMulti className="basic-multi-select" classNamePrefix="select" />
                    </label>
                </div>
                <div className=" mt-4 mr-3 d-flex justify-content-end">
                    <button className="col-1 btn btn-primary mr-3"
                        onClick={() => this.getTesteList(this.state.word)}>
                        GO!
                        </button>
                </div>
            </div>
        )
    }

    //renderização total parte userCrude.
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTableSearch()}
            </Main>
        )
    }
}