const headerProps = {
	icon: 'upload',
	title: 'Upload',
	subtitle: 'Fase de pré-processamento de dados para clippagem.'
}

const baseUrl2 = 'http://localhost:3010'
const baseUrl = 'http://localhost:3030/items'

const initialState = {
	item: { file: '', audio: 'Press Go! to get transcription...', confidence: 'Press Go! to get confidence...', rotule: { name: '', description: '' } },
	rotule: { name: '', description: '' },
	list: [],
	selectedFile: null,
	isLoading: false, isGo: true, isSave: true
}

const options = [
	{ value: 'Radio', label: 'Radio' },
	{ value: 'som', label: 'Som' },
	{ value: 'anuncio', label: 'anuncio' }
]

module.exports = {initialState, options, headerProps, baseUrl, baseUrl2};