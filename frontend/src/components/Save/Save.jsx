import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import FullScreenDialog from '../dialogs/Dialog'
import {
	initialState,
	headerProps,
	baseUrl,
} from '../Global/SaveGlobals'

export default class Save extends Component {

	state = { ...initialState }

	UNSAFE_componentWillMount() {
		axios(baseUrl).then(resp => {
			this.setState({ list: resp.data })
		})
	}

	remove(user) {
		axios.delete(`${baseUrl}/${user.id}`).then(resp => {
			const list = this.getUpdatedList(user, false)
			this.setState({ list })
		})
	}

	//Atualiza lsita de itens
	getUpdatedList(item, add = true) {
		const list = this.state.list.filter(u => u.id !== item.id)
		if (add) list.unshift(item)
		return list
	}


	renderTable() {
		return (
			<table className="table mt-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>Word Clip</th>
						<th>Name</th>
						<th>Audio</th>
						<th className="d-flex justify-content-end mr-1 ">View / el</th>
					</tr>
				</thead>
				<tbody>
					{this.renderRows()}
				</tbody>
			</table>
		)
	}

	renderRows() {
		return this.state.list.map(item => {
			return (
				<tr key={item.id}>
					<td >{item.id}</td>
					<td >" {item.words} "</td>
					<td >{item.rotule.name}</td>
					<td >{item.file}</td>
					<td className="d-flex justify-content-end">
						<FullScreenDialog className="d-flex" {...item} />
						<button className="btn btn-danger ml-2"
							onClick={() => this.remove(item)}>
							<i className="fa fa-trash"></i>
						</button>
					</td>
				</tr>
			)
		})
	}

	//renderização total parte userCrude.
	render() {
		return (
			<Main {...headerProps}>
				{this.renderTable()}
			</Main>
		)
	}
}