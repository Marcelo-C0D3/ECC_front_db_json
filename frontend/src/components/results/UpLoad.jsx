import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import './UpLoad.css'
import Upload from '../../assets/imgs/Upload.png'

const headerProps = {
	icon: 'item',
	title: 'Upload De Arquivos de Audio.',
	subtitle: 'Fase de pré-processamento de dados para clippagem.'
}

const baseUrl2 = 'http://localhost:3010'
const baseUrl = 'http://localhost:3030/items'

const initialState = {
	item: { audio: '', confidence: '' },
	list: [],
	selectedFile: null
}

export default class UpLoad extends Component {

	state = { ...initialState }

	UNSAFE_componentWillMount() {
		axios(baseUrl).then(resp => {
			this.setState({ list: resp.data })
		})
	}

	onFileChange = event => {
		// Update the state 
		this.setState({ selectedFile: event.target.files[0] });
	};

	// On file upload (click the upload button) 
	onFileUpload = () => {
		const item = this.state.item
		const selectedFile = this.state.selectedFile
		const list = this.state.list

		console.log(this.state.selectedFile);

		const formData = new FormData()
		formData.append("file", selectedFile)
		formData.append("type", selectedFile.type)

		const config = {
			headers: {
				"content-type": "multipart/form-data"
			}
		}
		axios
			.post(`${baseUrl2}/upload`, formData, config)
			.then(cb => {

				item.audio = cb.data.audio.transcription
				item.confidence = cb.data.audio.confidence

				this.setState({ item: initialState.item, list })
				console.log(cb)
			})
			.catch(error => { console.log(error) })
	};

	saveTransc() {

		const item = this.state.item
		const method = item.id ? 'put' : 'post'
		const url = item.id ? `${baseUrl}/${item.id}` : baseUrl
		axios[method](url, item)
			.then(resp => {
				const list = this.getUpdatedList(resp.data)
				this.setState({ item: initialState.item, list })
				console.log(resp)
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

	fileData = () => {

		if (this.state.selectedFile) {

			return (
				<div>
					<h2>Detalhes do Arquivo:</h2>
					<p> 
						<b>Nome do Arquivo: </b>{this.state.selectedFile.name} 
						<b className="ml-3">Tipo de arquivo: </b>{this.state.selectedFile.type} 
						<b className="ml-3">Ultima Modificação:</b>{" "} {this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Escolha antes de pressionar o botão GO!</h4>
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
						<input id="file-input" type="file" name="file" accept="audio/wav" onChange={this.onFileChange} />
					</div>
					<div className="d-flex justify-content-center" >Click the upload file .wav</div>

					<div className="mt-4">
						{this.fileData()}
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
				<div className="col-12 d-flex justify-content-end">
					<div className="col-13 d-flex justify-content-end">
						<button className="col-10 btn btn-primary"
							onClick={e => this.onFileUpload(e)}>
							GO!
                        </button>
						<button className="col-10 btn btn-secondary ml-2"
							onClick={e => this.saveTransc(e)}>
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
						<th>Audio</th>
						<th>confidence</th>
						<th>(UaU!)</th>
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
					<td>{item.id}</td>
					<td>{item.audio}</td>
					<td>{item.confidence}</td>
					<td>
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