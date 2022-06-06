const path = require('path')
const pckPath = path.join(__dirname, '../package.json')
const pkg = require(pckPath)

const getVersion = () => {
  console.log('version:', pkg.version)
}

module.exports = {
  getVersion
}
