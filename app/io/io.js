let io = null

const setIo = io => {
	this.io = io;
}

const getIo = () => {
	return this.io;
}

module.exports = {
	setIo,
	getIo
}