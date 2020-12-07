const headerProps = {
    icon: 'search',
    title: 'Clipping',
    subtitle: 'Área destinada a clipagem do conteúdo obtido.'
}

const baseUrlItem = 'http://localhost:3030/items'
const baseUrlClip = 'http://localhost:3030/clipping'

const initialState = {
    item: { file: '', audio: '', confidence: '', rotule: { name: '', description: '' }, words: '' },
    searchItem: null,
    list: [],
    word: ''
}

const means = [
	{ value: 'Radio', label: 'radio' },
	{ value: 'Tv', label: 'tv' },
    { value: 'Instagram', label: 'instagram' },
    { value: 'Youtube', label: 'youtube' }
]
const types = [
	{ value: 'podcast', label: 'podcast' },
	{ value: 'palestra', label: 'palestra' },
    { value: 'anuncio', label: 'anuncio' },
    { value: 'gravação', label: 'gravação' }
]

module.exports = {initialState, headerProps, baseUrlItem, baseUrlClip, means, types};