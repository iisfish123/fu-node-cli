const path = require('path')
const pkg = require(path.join(__dirname, '../package.json'))
const npa = require("npm-package-arg")

const getCurrVersion = () => {
  console.log('version:', pkg.version)
}

const getRemote = () => {
  let parsed
  try {
    parsed = npa('fu-node-cli@1.0.0')
  } catch (e) {

  }
  console.log(parsed)
}

module.exports = {
  getCurrVersion,
  getRemote
}
