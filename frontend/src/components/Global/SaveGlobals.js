const headerProps = {
	icon: 'save',
	title: 'Saves',
	subtitle: 'Área de visualização de resultados'
}

const baseUrl = 'http://localhost:3030/clipping'

const initialState = {
	list: []
}

module.exports = {initialState, headerProps, baseUrl};