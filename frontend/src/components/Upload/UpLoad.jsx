import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import './UpLoad.css'
import Upload from '../../assets/imgs/Upload.png'
import Loader from 'react-loader-spinner'
import FullScreenDialog from '../dialogs/Dialog'
import Select from 'react-select'
import {
	initialState,
	headerProps,
	baseUrl,
	baseUrl2
} from '../Global/UploadGlobals'
import {
	means,
	types
} from '../Global/ClippingGlobals'

export default class UpLoad extends Component {

	state = { ...initialState }

	UNSAFE_componentWillMount() {
		axios(baseUrl).then(resp => {
			this.setState({ list: resp.data })
		})
	}

	onFileChange = event => {
		// Update the state 
		console.log(event.target.files[0])
		this.setState({ selectedFile: event.target.files[0], isGo: false });
	};

	// On file upload (click the upload button) 
	onFileUpload = () => {
		const item = { ...this.state.item }
		const selectedFile = this.state.selectedFile

		const formData = new FormData()
		formData.append("file", selectedFile)
		formData.append("type", selectedFile.type)
		const config = {
			headers: {
				"content-type": "multipart/form-data"
			}
		}
		this.setState({ isLoading: true, isGo: true })
		axios
			.post(`${baseUrl2}/upload`, formData, config)
			.then(cb => {

				item.audio = cb.data.audio.transcription
				item.confidence = cb.data.audio.confidence
				item.file = selectedFile.name
				// item.words = cb.data.audio.words
				this.setState({ item: item, isLoading: false, isSave: false })
				console.log(cb)
			})
			.catch(error => { console.log(error) })
	};

	saveTransc() {
		const item = { ...this.state.item }
		const rotule = { ...this.state.rotule }
		item.rotule = rotule

		const method = item.id ? 'put' : 'post'
		const url = item.id ? `${baseUrl}/${item.id}` : baseUrl

		this.setState({ isLoading: true })
		axios[method](url, item)
			.then(resp => {
				const list = this.getUpdatedList(resp.data)
				this.setState({ item: initialState.item, selectedFile: null, isLoading: false, isSave: true, list })
				console.log(resp)
			})
			.catch(err => {
				this.setState({ isLoading: false })
				console.log(err)
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

	updateField(event) {
		const rotule = { ...this.state.rotule }
		rotule[event.target.name] = event.target.value
		this.setState({ rotule })
	}


	fileData = () => {

		if (this.state.selectedFile) {

			return (
				<div>
					<div className="ml-3">
						<h2>Detalhes do Arquivo:</h2>
						<p>
							<b>Nome do Arquivo: </b>{this.state.selectedFile.name}
							<b className="ml-3">Tipo de arquivo: </b>{this.state.selectedFile.type}
							<b className="ml-3">Ultima Modificação:</b>
							{" "}
							{this.state.selectedFile.lastModifiedDate.toDateString()}
						</p>
					</div>
					<div className="d-flex form-group">
						<div className="col-3">
							<label>Nome*</label>
							<input type="text" className="form-control"
								name="name"
								value={this.state.rotule.name}
								onChange={e => this.updateField(e)}
								placeholder="Digite o nome" />
						</div>
						<div className="col-4 ml-1">
							<label>Description*</label>
							<input type="text" className="form-control"
								name="description"
								value={this.state.rotule.description}
								onChange={e => this.updateField(e)}
								placeholder="Digite a descrição" />
						</div>
						<div className="col-2">
							<label> Means </label>
							<Select options={means} placeholder="Add mean.." isMulti className="basic-multi-select" classNamePrefix="select" />
						</div>
						<div className="col-2">
							<label> Types </label>
							<Select options={types} placeholder="add type.." isMulti className="basic-multi-select" classNamePrefix="select" />
						</div>
					</div>
					<div className="d-flex mt-4 mb-3">
						<label className="col-md-7" > <b>Transcription :</b>
							<div className="container mt-2">
								{this.state.item.audio}
							</div>
						</label>
						<label className="col-md-5" > <b>Confidence : </b>
							<div className="container mt-2">
								{this.state.item.confidence}
							</div>
						</label>
					</div>
				</div>
			);
		} else {
			return (
				<div className="ml-3 d-flex justify-content-center">
					<br />
					<h4 >Escolha Seu arquivo! e GO!</h4>
				</div>
			);
		}
	};

	renderUpload() {
		return (
			<div>
				<div className="ml-3">
					<h1 className=" d-flex justify-content-center" >UP Seus arquivos!</h1>
					<div className="image-upload d-flex justify-content-center">
						<label htmlFor="file-input">
							<img src={Upload} alt="Upload" />
						</label>
						<input id="file-input" type="file" name="file" accept="audio/mpeg" onChange={this.onFileChange} />
					</div>
					<div className="d-flex justify-content-center" >Click the upload file .mp3</div>
				</div>
				<div className="mt-4 d-flex justify-content-center">
					{this.state.isLoading && (
						<Loader type="TailSpin" color="#00BFFF" height={160} width={160} />
					)}
				</div>
				<div className="mt-4">
					{this.fileData()}
				</div>
				<div className="col-12 d-flex justify-content-end">
					<div className="col-13 d-flex justify-content-end">
						<button className="col-10 btn btn-primary"
							onClick={e => this.onFileUpload(e)} disabled={this.state.isGo} >
							GO!
                        </button>
						<button className="col-10 btn btn-secondary ml-2"
							onClick={e => this.saveTransc(e)} disabled={this.state.isSave}>
							Salvar
                        </button>
					</div>
				</div>
			</div>
		)
	}

	renderTable() {
		return (
			<table className="table mt-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
						<th>Description</th>
						<th>Audio</th>
						<th className="d-flex justify-content-end mr-1" >View / Del</th>
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
					<td className="limitCells">{item.rotule.name}</td>
					<td className="limitCells">{item.rotule.description}</td>
					<td className="limitCells">{item.file}</td>
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
				{this.renderUpload()}
				{this.renderTable()}
			</Main>
		)
	}
}